import "server-only";

import { createClient } from "@supabase/supabase-js";
import { PLAYERS } from "@/config/players";
import type {
  ActivityLog,
  ActivityLogRow,
  CharacterClass,
  NewActivityLogRow,
  PlayerProfile,
  PlayerProfileRow,
} from "@/types/domain";

function getSupabaseEnv() {
  return {
    url: process.env.SUPABASE_URL,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  };
}

export function isSupabaseConfigured() {
  const env = getSupabaseEnv();

  return Boolean(env.url && env.serviceRoleKey);
}

function createSupabaseServerClient() {
  const env = getSupabaseEnv();

  if (!env.url || !env.serviceRoleKey) {
    throw new Error("Brak konfiguracji Supabase po stronie serwera.");
  }

  return createClient(env.url, env.serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function mapActivityLogRow(row: ActivityLogRow): ActivityLog {
  const fallbackClass =
    PLAYERS.find((player) => player.id === row.player_key)?.characterClass ??
    "bard";

  return {
    id: row.id,
    playerId: row.player_key,
    classKey: row.class_key ?? fallbackClass,
    activityKey: row.activity_key,
    quantity: Number(row.quantity),
    points: row.points,
    durationBucket: row.duration_bucket ?? undefined,
    occurredOn: row.occurred_on,
    note: row.note ?? undefined,
  };
}

function getDefaultPlayerProfiles(): PlayerProfile[] {
  return PLAYERS.map((player) => ({
    playerKey: player.id,
    classKey: player.characterClass,
    classLocked: false,
  }));
}

function mergeWithDefaultProfiles(rows: PlayerProfileRow[]) {
  const profileMap = new Map(
    rows.map((row) => [
      row.player_key,
      {
        classKey: row.class_key,
        classLocked: row.class_locked ?? false,
      },
    ]),
  );

  return PLAYERS.map((player) => ({
    playerKey: player.id,
    classKey: profileMap.get(player.id)?.classKey ?? player.characterClass,
    classLocked: profileMap.get(player.id)?.classLocked ?? false,
  }));
}

export async function fetchActivityLogs() {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("activity_logs")
    .select(
      "id, player_key, class_key, activity_key, quantity, points, duration_bucket, occurred_on, note, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(50);

  if (error && error.message.includes("class_key")) {
    const fallback = await supabase
      .from("activity_logs")
      .select(
        "id, player_key, activity_key, quantity, points, duration_bucket, occurred_on, note, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(50);

    if (fallback.error) {
      throw new Error(
        `Nie udało się pobrać wpisów aktywności: ${fallback.error.message}`,
      );
    }

    return ((fallback.data ?? []) as ActivityLogRow[]).map(mapActivityLogRow);
  }

  if (error) {
    throw new Error(`Nie udało się pobrać wpisów aktywności: ${error.message}`);
  }

  return ((data ?? []) as ActivityLogRow[]).map(mapActivityLogRow);
}

export async function getPlayerProfiles() {
  if (!isSupabaseConfigured()) {
    return getDefaultPlayerProfiles();
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("player_profiles")
    .select("player_key, class_key, class_locked, updated_at");

  if (error && error.message.includes("class_locked")) {
    const fallback = await supabase
      .from("player_profiles")
      .select("player_key, class_key, updated_at");

    if (fallback.error) {
      throw new Error(`Nie udało się pobrać klas załogi: ${fallback.error.message}`);
    }

    return mergeWithDefaultProfiles(
      ((fallback.data ?? []) as PlayerProfileRow[]).map((row) => ({
        ...row,
        class_locked: true,
      })),
    );
  }

  if (error) {
    throw new Error(`Nie udało się pobrać klas załogi: ${error.message}`);
  }

  return mergeWithDefaultProfiles((data ?? []) as PlayerProfileRow[]);
}

export async function upsertPlayerClass(
  playerKey: string,
  classKey: CharacterClass,
) {
  const supabase = createSupabaseServerClient();
  const { data: existingProfile, error: selectError } = await supabase
    .from("player_profiles")
    .select("class_locked")
    .eq("player_key", playerKey)
    .maybeSingle();

  if (selectError && selectError.message.includes("class_locked")) {
    throw new Error("Klasa została już wybrana i nie można jej zmienić.");
  }

  if (selectError) {
    throw new Error(`Nie udało się sprawdzić klasy: ${selectError.message}`);
  }

  if (existingProfile?.class_locked) {
    throw new Error("Klasa została już wybrana i nie można jej zmienić.");
  }

  const { error } = await supabase.from("player_profiles").upsert({
    player_key: playerKey,
    class_key: classKey,
    class_locked: true,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    throw new Error(`Nie udało się zapisać klasy: ${error.message}`);
  }
}

export async function insertActivityLog(activityLog: NewActivityLogRow) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("activity_logs").insert(activityLog);

  if (error) {
    throw new Error(`Nie udało się zapisać aktywności: ${error.message}`);
  }
}
