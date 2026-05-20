"use server";

import { revalidatePath } from "next/cache";
import { ACTIVITIES, getDurationBucket } from "@/config/activities";
import { SELECTABLE_CHARACTER_CLASSES } from "@/config/classes";
import { PLAYERS } from "@/config/players";
import { calculatePoints } from "@/lib/scoring";
import {
  getPlayerProfiles,
  insertActivityLog,
  isSupabaseConfigured,
  upsertPlayerClass,
} from "@/lib/supabase/server";
import type { CharacterClass, DurationBucketKey } from "@/types/domain";

export type ActivityActionState = {
  ok: boolean;
  message: string;
};

export type PlayerClassActionState = ActivityActionState;

const initialErrorState: ActivityActionState = {
  ok: false,
  message: "",
};

function getString(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

function hasValidWriteCode(writeCode: string) {
  return Boolean(process.env.TEAM_WRITE_CODE) && writeCode === process.env.TEAM_WRITE_CODE;
}

function isSelectableClass(classKey: string): classKey is CharacterClass {
  return SELECTABLE_CHARACTER_CLASSES.some((characterClass) => {
    return characterClass.key === classKey;
  });
}

export async function addActivity(
  previousState: ActivityActionState = initialErrorState,
  formData: FormData,
): Promise<ActivityActionState> {
  void previousState;

  if (!process.env.TEAM_WRITE_CODE) {
    return {
      ok: false,
      message: "Brak konfiguracji TEAM_WRITE_CODE po stronie serwera.",
    };
  }

  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      message: "Brak konfiguracji Supabase po stronie serwera.",
    };
  }

  const writeCode = getString(formData, "writeCode");

  if (!hasValidWriteCode(writeCode)) {
    return {
      ok: false,
      message: "Kod drużyny jest nieprawidłowy.",
    };
  }

  const playerKey = getString(formData, "playerKey");
  const activityKey = getString(formData, "activityKey");
  const durationBucket = getString(formData, "durationBucket");
  const note = getString(formData, "note");

  if (!PLAYERS.some((player) => player.id === playerKey)) {
    return {
      ok: false,
      message: "Wybierz osobę z załogi.",
    };
  }

  if (!ACTIVITIES.some((activity) => activity.key === activityKey)) {
    return {
      ok: false,
      message: "Wybierz aktywność z listy.",
    };
  }

  const bucket = getDurationBucket(durationBucket);

  if (!bucket) {
    return {
      ok: false,
      message: "Wybierz czas aktywności.",
    };
  }

  if (note.length > 280) {
    return {
      ok: false,
      message: "Notatka może mieć maksymalnie 280 znaków.",
    };
  }

  let classKey: CharacterClass;

  try {
    const profiles = await getPlayerProfiles();
    classKey =
      profiles.find((profile) => profile.playerKey === playerKey)?.classKey ??
      PLAYERS.find((player) => player.id === playerKey)?.characterClass ??
      "bard";
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Nie udało się pobrać klasy postaci.",
    };
  }

  const points = calculatePoints({
    activityKey,
    durationBucket: bucket.key,
    playerKey,
    classKey,
  });

  try {
    await insertActivityLog({
      player_key: playerKey,
      class_key: classKey,
      activity_key: activityKey,
      quantity: bucket.quantity,
      points,
      duration_bucket: bucket.key as DurationBucketKey,
      note: note || null,
    });
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Nie udało się zapisać aktywności.",
    };
  }

  revalidatePath("/");

  return {
    ok: true,
    message: "Aktywność dodana do wspólnej wyprawy.",
  };
}

export async function updatePlayerClass(
  previousState: PlayerClassActionState = initialErrorState,
  formData: FormData,
): Promise<PlayerClassActionState> {
  void previousState;

  if (!process.env.TEAM_WRITE_CODE) {
    return {
      ok: false,
      message: "Brak konfiguracji TEAM_WRITE_CODE po stronie serwera.",
    };
  }

  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      message: "Brak konfiguracji Supabase po stronie serwera.",
    };
  }

  const writeCode = getString(formData, "writeCode");

  if (!hasValidWriteCode(writeCode)) {
    return {
      ok: false,
      message: "Kod drużyny jest nieprawidłowy.",
    };
  }

  const playerKey = getString(formData, "playerKey");
  const classKey = getString(formData, "classKey");

  if (!PLAYERS.some((player) => player.id === playerKey)) {
    return {
      ok: false,
      message: "Wybierz osobę z załogi.",
    };
  }

  if (!isSelectableClass(classKey)) {
    return {
      ok: false,
      message: "Wybierz klasę z listy.",
    };
  }

  try {
    await upsertPlayerClass(playerKey, classKey);
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Nie udało się zapisać klasy.",
    };
  }

  revalidatePath("/");

  return {
    ok: true,
    message: "Klasa zapisana.",
  };
}
