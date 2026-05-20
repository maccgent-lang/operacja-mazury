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
    <section className="rounded-xl border border-accent/40 bg-card p-5 text-card-foreground shadow-2xl shadow-black/25 sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Postęp załogi
          </h2>
          <p className="text-sm text-muted-foreground">
            {currentPoints} z {targetPoints} pkt do wspólnego celu
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
    </section>
  );
}
