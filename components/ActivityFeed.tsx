export type ActivityFeedItem = {
  id: string;
  playerName: string;
  activityLabel: string;
  durationLabel?: string;
  quantity: number;
  points: number;
  occurredOn: string;
  note?: string;
};

type ActivityFeedProps = {
  activities: ActivityFeedItem[];
};

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <section className="flex min-w-0 max-w-full flex-col gap-3 overflow-hidden">
      <div className="min-w-0">
        <h2 className="text-xl font-semibold tracking-tight">
          Ostatnie wpisy
        </h2>
        <p className="break-words text-sm text-muted-foreground">
          Najnowsze aktywności dodane do wyprawy.
        </p>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-3">
        {activities.length === 0 ? (
          <p className="break-words rounded-lg border border-border/80 bg-card/85 p-4 text-sm text-muted-foreground">
            Brak wpisów w dzienniku. Pierwsza aktywność załogi może pojawić się
            tutaj po zapisie.
          </p>
        ) : null}

        {activities.map((activity) => (
          <article
            key={activity.id}
            className="w-full max-w-full min-w-0 overflow-hidden rounded-lg border border-border/80 bg-card/85 p-4 text-card-foreground shadow-lg shadow-black/15"
          >
            <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="break-words font-medium text-foreground">
                  {activity.playerName}
                </p>
                <p className="break-words text-sm capitalize text-muted-foreground">
                  {activity.activityLabel}
                  {activity.durationLabel ? ` - ${activity.durationLabel}` : ""}
                </p>
              </div>
              <div className="min-w-0 text-sm text-muted-foreground sm:text-right">
                <p>{activity.occurredOn}</p>
                <p className="break-words font-medium text-accent">
                  {activity.points} pkt dla załogi
                </p>
              </div>
            </div>

            {activity.note ? (
              <p className="mt-3 break-words text-sm text-muted-foreground">
                {activity.note}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
