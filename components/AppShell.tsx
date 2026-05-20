import { ActivityFeed, type ActivityFeedItem } from "@/components/ActivityFeed";
import { ActivityForm } from "@/components/ActivityForm";
import { PlayerCard } from "@/components/PlayerCard";
import { ProgressBar } from "@/components/ProgressBar";
import { ACTIVITIES, DURATION_BUCKETS } from "@/config/activities";
import { GAME_CONFIG } from "@/config/game";
import {
  calculateProgressPercent,
  calculateTeamPoints,
} from "@/lib/progress";
import type { ActivityLog, Player } from "@/types/domain";

type AppShellProps = {
  players: Player[];
  activityLogs: ActivityLog[];
  isSupabaseConfigured: boolean;
};

export function AppShell({
  players,
  activityLogs,
  isSupabaseConfigured,
}: AppShellProps) {
  const totalPoints = calculateTeamPoints(activityLogs);
  const progressPercent = calculateProgressPercent(
    totalPoints,
    GAME_CONFIG.targetPoints,
  );

  const playerPoints = new Map<string, number>();

  for (const player of players) {
    playerPoints.set(player.id, 0);
  }

  for (const log of activityLogs) {
    playerPoints.set(
      log.playerId,
      (playerPoints.get(log.playerId) ?? 0) + log.points,
    );
  }

  const playerNames = new Map(
    players.map((player) => [player.id, player.name]),
  );
  const activityLabels = new Map(
    ACTIVITIES.map((activity) => [activity.key, activity.label]),
  );
  const durationBucketLabels = new Map(
    DURATION_BUCKETS.map((bucket) => [
      bucket.key,
      `${bucket.label} (${bucket.rangeLabel})`,
    ]),
  );

  const recentActivities: ActivityFeedItem[] = [...activityLogs]
    .sort((first, second) => second.occurredOn.localeCompare(first.occurredOn))
    .map((log) => ({
      id: log.id,
      playerName: playerNames.get(log.playerId) ?? "Nieznany członek załogi",
      activityLabel: activityLabels.get(log.activityKey) ?? log.activityKey,
      durationLabel: log.durationBucket
        ? durationBucketLabels.get(log.durationBucket)
        : undefined,
      quantity: log.quantity,
      points: log.points,
      occurredOn: log.occurredOn,
      note: log.note,
    }));

  return (
    <main className="min-h-screen bg-transparent px-4 py-6 text-foreground sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <section className="flex flex-col gap-4 rounded-xl border border-border/70 bg-card/45 p-5 shadow-2xl shadow-black/20 backdrop-blur sm:p-6">
          <p className="text-sm font-medium uppercase tracking-wide text-accent">
            Dashboard wyprawy
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Wyprawa po Złote Gacie Kąpielowe
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Każdy wpis dokłada coś do wspólnej drogi nad jezioro.
          </p>
        </section>

        <ProgressBar
          currentPoints={totalPoints}
          milestones={GAME_CONFIG.milestones}
          targetPoints={GAME_CONFIG.targetPoints}
          progressPercent={progressPercent}
        />

        <ActivityForm
          activities={ACTIVITIES}
          isSupabaseConfigured={isSupabaseConfigured}
          players={players}
        />

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)]">
          <ActivityFeed activities={recentActivities} />

          <section className="flex flex-col gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Załoga</h2>
              <p className="text-sm text-muted-foreground">
                Profile załogi biorącej udział we wspólnej wyprawie.
              </p>
            </div>

            <div className="grid gap-3">
              {players.map((player) => (
                <PlayerCard
                  key={player.id}
                  isSupabaseConfigured={isSupabaseConfigured}
                  player={player}
                  points={playerPoints.get(player.id) ?? 0}
                />
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
