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
    <section className="flex flex-col gap-3">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">
          Ostatnie wpisy
        </h2>
        <p className="text-sm text-muted-foreground">
          Najnowsze aktywności dodane do wyprawy.
        </p>
      </div>

      <div className="grid gap-3">
        {activities.length === 0 ? (
          <p className="rounded-lg border border-border/80 bg-card/85 p-4 text-sm text-muted-foreground">
            Brak wpisów w dzienniku. Pierwsza aktywność załogi może pojawić się
            tutaj po zapisie.
          </p>
        ) : null}

        {activities.map((activity) => (
          <article
            key={activity.id}
            className="rounded-lg border border-border/80 bg-card/85 p-4 text-card-foreground shadow-lg shadow-black/15"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-medium text-foreground">
                  {activity.playerName}
                </p>
                <p className="text-sm capitalize text-muted-foreground">
                  {activity.activityLabel}
                  {activity.durationLabel ? ` - ${activity.durationLabel}` : ""}
                </p>
              </div>
              <div className="text-sm text-muted-foreground sm:text-right">
                <p>{activity.occurredOn}</p>
                <p className="font-medium text-accent">
                  {activity.points} pkt dla załogi
                </p>
              </div>
            </div>

            {activity.note ? (
              <p className="mt-3 text-sm text-muted-foreground">{activity.note}</p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
