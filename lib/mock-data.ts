import { PLAYERS } from "@/config/players";
import type { ActivityLog } from "@/types/domain";

export const mockPlayers = PLAYERS;

export const mockActivityLogs: ActivityLog[] = [
  {
    id: "log-001",
    playerId: "aniela",
    activityKey: "walk",
    quantity: 30,
    points: 238,
    durationBucket: "normal",
    occurredOn: "2026-05-10",
    note: "Spokojny spacer nad jeziorem.",
  },
  {
    id: "log-002",
    playerId: "wojtek",
    activityKey: "strength",
    quantity: 50,
    points: 360,
    durationBucket: "solid",
    occurredOn: "2026-05-11",
  },
  {
    id: "log-003",
    playerId: "weronika",
    activityKey: "calm_swim_bike",
    quantity: 50,
    points: 392,
    durationBucket: "solid",
    occurredOn: "2026-05-12",
    note: "Lekka trasa po pracy.",
  },
  {
    id: "log-004",
    playerId: "kuba",
    activityKey: "cardio",
    quantity: 30,
    points: 290,
    durationBucket: "normal",
    occurredOn: "2026-05-13",
  },
  {
    id: "log-005",
    playerId: "maciek",
    activityKey: "mobility",
    quantity: 30,
    points: 150,
    durationBucket: "normal",
    occurredOn: "2026-05-14",
    note: "Rozciąganie i mobilność.",
  },
];
