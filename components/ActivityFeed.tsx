export type ActivityFeedItem = {
  id: string;
  playerName: string;
  activityKey: string;
  quantity: number;
  points: number;
  occurredOn: string;
  note?: string;
};

type ActivityFeedProps = {
  activities: ActivityFeedItem[];
};

function formatActivityKey(activityKey: string) {
  return activityKey.replaceAll("-", " ");
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <section className="flex flex-col gap-3">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">
          Recent activities
        </h2>
        <p className="text-sm text-muted-foreground">
          Latest mock activity entries.
        </p>
      </div>

      <div className="grid gap-3">
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
                  {formatActivityKey(activity.activityKey)} - {activity.quantity}
                </p>
              </div>
              <div className="text-sm text-muted-foreground sm:text-right">
                <p>{activity.occurredOn}</p>
                <p className="font-medium text-accent">
                  {activity.points} points
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
