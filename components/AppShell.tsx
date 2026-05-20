import { ActivityFeed, type ActivityFeedItem } from "@/components/ActivityFeed";
import { PlayerCard } from "@/components/PlayerCard";
import { ProgressBar } from "@/components/ProgressBar";
import { GAME_CONFIG } from "@/config/game";
import { mockActivityLogs, mockPlayers } from "@/lib/mock-data";

export function AppShell() {
  const totalPoints = mockActivityLogs.reduce((sum, log) => sum + log.points, 0);
  const progressPercent = Math.min(
    Math.round((totalPoints / GAME_CONFIG.targetPoints) * 100),
    100,
  );

  const playerPoints = new Map<string, number>();

  for (const player of mockPlayers) {
    playerPoints.set(player.id, 0);
  }

  for (const log of mockActivityLogs) {
    playerPoints.set(
      log.playerId,
      (playerPoints.get(log.playerId) ?? 0) + log.points,
    );
  }

  const playerNames = new Map(
    mockPlayers.map((player) => [player.id, player.name]),
  );

  const recentActivities: ActivityFeedItem[] = [...mockActivityLogs]
    .sort((first, second) => second.occurredOn.localeCompare(first.occurredOn))
    .map((log) => ({
      id: log.id,
      playerName: playerNames.get(log.playerId) ?? "Nieznany członek załogi",
      activityKey: log.activityKey,
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
            Operacja Mazury
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Każdy wpis dokłada coś do wspólnej drogi nad jezioro.
          </p>
        </section>

        <ProgressBar
          currentPoints={totalPoints}
          targetPoints={GAME_CONFIG.targetPoints}
          progressPercent={progressPercent}
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
              {mockPlayers.map((player) => (
                <PlayerCard
                  key={player.id}
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
