export const GAME_CONFIG = {
  name: "Wyprawa po Złote Gacie Kąpielowe",
  targetPoints: 10000,
  tripDate: "2026-06-03",
  milestones: [
    { points: 1000, label: "Pierwsze Wiosło" },
    { points: 2500, label: "Ponton Napompowany" },
    { points: 5000, label: "Kajak Wodowany" },
    { points: 7500, label: "Ognisko Rozpalone" },
    { points: 10000, label: "Złote Gacie Odblokowane" },
  ],
} as const;
