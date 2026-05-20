"use client";

import { useEffect, useMemo, useState } from "react";

type TripCountdownProps = {
  tripDate: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const secondInMs = 1000;
const minuteInMs = 60 * secondInMs;
const hourInMs = 60 * minuteInMs;
const dayInMs = 24 * hourInMs;

function getTargetTime(tripDate: string) {
  return new Date(`${tripDate}T00:00:00+02:00`).getTime();
}

function calculateTimeLeft(targetTime: number, now: number): TimeLeft {
  const distance = Math.max(targetTime - now, 0);

  return {
    days: Math.floor(distance / dayInMs),
    hours: Math.floor((distance % dayInMs) / hourInMs),
    minutes: Math.floor((distance % hourInMs) / minuteInMs),
    seconds: Math.floor((distance % minuteInMs) / secondInMs),
  };
}

function formatValue(value: number) {
  return value.toString().padStart(2, "0");
}

export function TripCountdown({ tripDate }: TripCountdownProps) {
  const targetTime = useMemo(() => getTargetTime(tripDate), [tripDate]);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const updateTimeLeft = () => {
      setTimeLeft(calculateTimeLeft(targetTime, Date.now()));
    };
    const timeoutId = window.setTimeout(updateTimeLeft, 0);
    const intervalId = window.setInterval(updateTimeLeft, secondInMs);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [targetTime]);

  const units = [
    { label: "dni", value: timeLeft?.days ?? 0 },
    { label: "godz.", value: timeLeft?.hours ?? 0 },
    { label: "min", value: timeLeft?.minutes ?? 0 },
    { label: "sek", value: timeLeft?.seconds ?? 0 },
  ];

  return (
    <section className="w-full max-w-full overflow-hidden rounded-xl border border-accent/35 bg-card/70 p-4 text-card-foreground shadow-xl shadow-black/15 sm:p-5">
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-accent">
            Do wyprawy zostało
          </p>
          <p className="break-words text-sm text-muted-foreground">
            Odliczanie do 3 czerwca.
          </p>
        </div>

        <div className="grid min-w-0 grid-cols-4 gap-2">
          {units.map((unit) => (
            <div
              className="min-w-0 rounded-lg border border-border/70 bg-muted/70 px-2 py-3 text-center"
              key={unit.label}
            >
              <p className="tabular-nums text-lg font-semibold text-foreground sm:text-2xl">
                {formatValue(unit.value)}
              </p>
              <p className="break-words text-[10px] uppercase tracking-wide text-muted-foreground sm:text-xs">
                {unit.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
