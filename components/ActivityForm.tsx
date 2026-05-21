"use client";

import { useActionState, useMemo, useState } from "react";
import { addActivity, type ActivityActionState } from "@/app/actions";
import { DURATION_BUCKETS } from "@/config/activities";
import { calculatePointBreakdown } from "@/lib/scoring";
import type {
  ActivityDefinition,
  DurationBucketKey,
  Player,
} from "@/types/domain";

type ActivityFormProps = {
  players: Player[];
  activities: ActivityDefinition[];
  isSupabaseConfigured: boolean;
};

const initialState: ActivityActionState = {
  ok: false,
  message: "",
};

function SubmitButton() {
  return (
    <button
      className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground sm:w-auto sm:py-2"
      type="submit"
    >
      Dodaj wpis
    </button>
  );
}

export function ActivityForm({
  players,
  activities,
  isSupabaseConfigured,
}: ActivityFormProps) {
  const [state, formAction] = useActionState(addActivity, initialState);
  const [playerKey, setPlayerKey] = useState(players[0]?.id ?? "");
  const [activityKey, setActivityKey] = useState(activities[0]?.key ?? "");
  const [durationBucket, setDurationBucket] =
    useState<DurationBucketKey>("normal");

  const selectedPlayer = players.find((player) => player.id === playerKey);
  const availableActivities = useMemo(() => {
    const filteredActivities = activities.filter((activity) => {
      return selectedPlayer?.isPrenatalFriendly || !activity.prenatalOnly;
    });

    return [...filteredActivities].sort((first, second) => {
      if (first.prenatalFriendly === second.prenatalFriendly) {
        return 0;
      }

      return first.prenatalFriendly ? -1 : 1;
    });
  }, [activities, selectedPlayer]);

  const selectedActivity = availableActivities.find(
    (activity) => activity.key === activityKey,
  ) ?? availableActivities[0];

  const pointPreview =
    selectedActivity
      ? calculatePointBreakdown({
          activityKey: selectedActivity.key,
          classKey: selectedPlayer?.characterClass,
          durationBucket,
          playerKey,
        })
      : null;
  const previewPoints = pointPreview?.points ?? 0;
  const bonusLabels = [
    pointPreview?.bonuses.prenatalSafe ? "tryb bezpieczny" : null,
    pointPreview?.bonuses.classBonus ? "bonus klasy" : null,
  ].filter((label): label is string => Boolean(label));
  const showComfortWarning =
    Boolean(selectedPlayer?.isPrenatalFriendly) &&
    Boolean(selectedActivity?.intense);

  return (
    <section className="w-full max-w-full overflow-hidden rounded-xl border border-border/80 bg-card/80 p-4 text-card-foreground shadow-lg shadow-black/15 sm:p-5">
      <div className="mb-4 min-w-0">
        <h2 className="text-xl font-semibold tracking-tight">Dodaj aktywność</h2>
        <p className="break-words text-sm text-muted-foreground">
          Wpis trafi do wspólnego dziennika załogi.
        </p>
      </div>

      <p className="mb-4 break-words rounded-lg border border-border/70 bg-muted p-3 text-sm text-muted-foreground">
        Wybieraj tylko aktywności komfortowe i zgodne z zaleceniami lekarza lub
        fizjo. Punkty są mniej ważne niż człowiek.
      </p>

      {!isSupabaseConfigured ? (
        <p className="mb-4 break-words rounded-lg border border-accent/40 bg-muted p-3 text-sm text-muted-foreground">
          Brakuje konfiguracji Supabase. Dashboard działa, ale zapis aktywności
          wymaga zmiennych środowiskowych.
        </p>
      ) : null}

      <form action={formAction} className="grid min-w-0 gap-4">
        <label className="grid min-w-0 gap-2 text-sm">
          <span className="text-muted-foreground">Członek załogi</span>
          <select
            className="w-full max-w-full rounded-lg border border-border bg-background px-3 py-3 text-foreground sm:py-2"
            name="playerKey"
            onChange={(event) => setPlayerKey(event.target.value)}
            value={playerKey}
          >
            {players.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </select>
        </label>

        <label className="grid min-w-0 gap-2 text-sm">
          <span className="text-muted-foreground">Aktywność</span>
          <select
            className="w-full max-w-full rounded-lg border border-border bg-background px-3 py-3 text-foreground sm:py-2"
            name="activityKey"
            onChange={(event) => setActivityKey(event.target.value)}
            value={selectedActivity?.key ?? ""}
          >
            {availableActivities.map((activity) => (
              <option key={activity.key} value={activity.key}>
                {activity.label}
                {activity.prenatalFriendly ? " - spokojna opcja" : ""}
              </option>
            ))}
          </select>
          {showComfortWarning ? (
            <span className="max-w-full break-words rounded-full border border-amber-300/50 bg-amber-300/10 px-3 py-1 text-xs font-medium text-amber-100">
              ⚠️ tylko jeśli to dla Ciebie komfortowe
            </span>
          ) : null}
        </label>

        <label className="grid min-w-0 gap-2 text-sm">
          <span className="text-muted-foreground">Czas</span>
          <select
            className="w-full max-w-full rounded-lg border border-border bg-background px-3 py-3 text-foreground sm:py-2"
            name="durationBucket"
            onChange={(event) =>
              setDurationBucket(event.target.value as DurationBucketKey)
            }
            value={durationBucket}
          >
            {DURATION_BUCKETS.map((bucket) => (
              <option key={bucket.key} value={bucket.key}>
                {bucket.label} - {bucket.rangeLabel}
              </option>
            ))}
          </select>
        </label>

        <label className="grid min-w-0 gap-2 text-sm">
          <span className="text-muted-foreground">Notatka</span>
          <textarea
            className="min-h-24 w-full max-w-full rounded-lg border border-border bg-background px-3 py-3 text-foreground sm:min-h-20 sm:py-2"
            maxLength={280}
            name="note"
            placeholder="Opcjonalnie"
          />
        </label>

        <div className="flex min-w-0 flex-col gap-3 rounded-lg border border-border/70 bg-muted p-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="grid min-w-0 gap-2">
            <span className="break-words text-muted-foreground">
              Podgląd wkładu:{" "}
              <strong className="text-foreground">{previewPoints} pkt</strong>
            </span>
            {bonusLabels.length > 0 ? (
              <div className="flex min-w-0 flex-wrap gap-2">
                {bonusLabels.map((label) => (
                  <span
                    className="max-w-full break-words rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-xs text-accent"
                    key={label}
                  >
                    {label}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
          <SubmitButton />
        </div>

        {state.message ? (
          <p
            className={
              state.ok
                ? "break-words text-sm text-accent"
                : "break-words text-sm text-destructive"
            }
          >
            {state.message}
          </p>
        ) : null}
      </form>
    </section>
  );
}
