type ProgressBarProps = {
  currentPoints: number;
  targetPoints: number;
  progressPercent: number;
  milestones: readonly {
    points: number;
    label: string;
  }[];
};

export function ProgressBar({
  currentPoints,
  targetPoints,
  progressPercent,
  milestones,
}: ProgressBarProps) {
  return (
    <section className="rounded-xl border border-accent/40 bg-card p-5 text-card-foreground shadow-2xl shadow-black/25 sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Postęp załogi
          </h2>
          <p className="text-sm text-muted-foreground">
            {currentPoints} z {targetPoints} pkt do wspólnego celu
          </p>
          <p className="mt-3 text-sm font-medium text-foreground">
            Cel: 10 000 pkt = fancy lunch na podróż dla całej załogi.
          </p>
          <p className="text-xs text-muted-foreground">
            Menu jeszcze owiane mgłą, ale ambicje są niepokojąco wysokie.
          </p>
        </div>
        <p className="text-3xl font-semibold text-accent">{progressPercent}%</p>
      </div>

      <div className="mt-5 h-4 overflow-hidden rounded-full border border-border/70 bg-muted">
        <div
          className="h-full rounded-full bg-primary shadow-[0_0_18px_var(--primary)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="relative mt-2 h-7">
        {milestones.map((milestone) => {
          const tickPosition = Math.min(
            (milestone.points / targetPoints) * 100,
            100,
          );
          const isReached = currentPoints >= milestone.points;

          return (
            <div
              className="absolute top-0 flex -translate-x-1/2 flex-col items-center gap-1"
              key={milestone.points}
              style={{ left: `${tickPosition}%` }}
              title={`${milestone.points} pkt: ${milestone.label}`}
            >
              <span
                className={
                  isReached
                    ? "h-3 w-0.5 rounded-full bg-accent"
                    : "h-3 w-0.5 rounded-full bg-border"
                }
              />
              <span className="text-[10px] font-medium text-muted-foreground">
                {milestone.points / 1000}k
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-5">
        {milestones.map((milestone) => {
          const isReached = currentPoints >= milestone.points;

          return (
            <div
              className={
                isReached
                  ? "rounded-lg border border-accent/50 bg-accent/10 px-3 py-2"
                  : "rounded-lg border border-border/70 bg-muted/70 px-3 py-2"
              }
              key={milestone.points}
            >
              <p className="text-xs font-semibold text-foreground">
                {milestone.points} pkt
              </p>
              <p className="text-xs leading-5 text-muted-foreground">
                {milestone.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
