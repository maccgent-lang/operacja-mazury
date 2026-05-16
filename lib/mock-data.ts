import type { ActivityLog, Player } from "@/types/domain";

export const mockPlayers: Player[] = [
  {
    id: "player-anna",
    name: "Anna",
    characterClass: "healer",
    isPrenatalFriendly: true,
  },
  {
    id: "player-bartek",
    name: "Bartek",
    characterClass: "tank",
    isPrenatalFriendly: false,
  },
  {
    id: "player-celina",
    name: "Celina",
    characterClass: "scout",
    isPrenatalFriendly: false,
  },
  {
    id: "player-damian",
    name: "Damian",
    characterClass: "berserker",
    isPrenatalFriendly: false,
  },
  {
    id: "player-eliza",
    name: "Eliza",
    characterClass: "monk",
    isPrenatalFriendly: false,
  },
];

export const mockActivityLogs: ActivityLog[] = [
  {
    id: "log-001",
    playerId: "player-anna",
    activityKey: "walk",
    quantity: 35,
    points: 35,
    occurredOn: "2026-05-10",
    note: "Spokojny spacer nad jeziorem.",
  },
  {
    id: "log-002",
    playerId: "player-bartek",
    activityKey: "strength-training",
    quantity: 45,
    points: 60,
    occurredOn: "2026-05-11",
  },
  {
    id: "log-003",
    playerId: "player-celina",
    activityKey: "bike",
    quantity: 50,
    points: 70,
    occurredOn: "2026-05-12",
    note: "Lekka trasa po pracy.",
  },
  {
    id: "log-004",
    playerId: "player-damian",
    activityKey: "run",
    quantity: 30,
    points: 45,
    occurredOn: "2026-05-13",
  },
  {
    id: "log-005",
    playerId: "player-eliza",
    activityKey: "mobility",
    quantity: 25,
    points: 25,
    occurredOn: "2026-05-14",
    note: "Rozciąganie i mobilność.",
  },
];
