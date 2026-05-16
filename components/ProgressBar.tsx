type ProgressBarProps = {
  currentPoints: number;
  targetPoints: number;
  progressPercent: number;
};

export function ProgressBar({
  currentPoints,
  targetPoints,
  progressPercent,
}: ProgressBarProps) {
  return (
    <section className="rounded-lg border bg-card p-4 text-card-foreground">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Team progress</h2>
          <p className="text-sm text-muted-foreground">
            {currentPoints} of {targetPoints} points
          </p>
        </div>
        <p className="text-2xl font-semibold">{progressPercent}%</p>
      </div>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </section>
  );
}
