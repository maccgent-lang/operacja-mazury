import type { ActivityDefinition, DurationBucket } from "@/types/domain";

export const DURATION_BUCKETS: DurationBucket[] = [
  {
    key: "short",
    label: "Krótko",
    rangeLabel: "10–20 min",
    quantity: 15,
  },
  {
    key: "normal",
    label: "Normalnie",
    rangeLabel: "20–40 min",
    quantity: 30,
  },
  {
    key: "solid",
    label: "Porządnie",
    rangeLabel: "40–60 min",
    quantity: 50,
  },
  {
    key: "epic",
    label: "Epic",
    rangeLabel: "60+ min",
    quantity: 60,
  },
];

export const ACTIVITIES: ActivityDefinition[] = [
  {
    key: "walk",
    label: "Spacer / marsz",
    unit: "minutes",
    bucketPoints: { short: 90, normal: 170, solid: 260, epic: 330 },
    category: "light",
    prenatalFriendly: true,
    intense: false,
  },
  {
    key: "mobility",
    label: "Mobility / joga / rozciąganie",
    unit: "minutes",
    bucketPoints: { short: 80, normal: 150, solid: 220, epic: 280 },
    category: "mobility",
    prenatalFriendly: true,
    intense: false,
  },
  {
    key: "calm_swim_bike",
    label: "Basen / spokojny rower",
    unit: "minutes",
    bucketPoints: { short: 100, normal: 190, solid: 280, epic: 350 },
    category: "prenatal",
    prenatalFriendly: true,
    intense: false,
  },
  {
    key: "active_recovery",
    label: "Regeneracja aktywna",
    unit: "minutes",
    bucketPoints: { short: 70, normal: 130, solid: 190, epic: 240 },
    category: "regeneration",
    prenatalFriendly: true,
    intense: false,
  },
  {
    key: "strength",
    label: "Siłownia / trening siłowy",
    unit: "minutes",
    bucketPoints: { short: 140, normal: 260, solid: 360, epic: 430 },
    category: "strength",
    prenatalFriendly: false,
    intense: false,
  },
  {
    key: "cardio",
    label: "Bieganie / cardio",
    unit: "minutes",
    bucketPoints: { short: 160, normal: 290, solid: 390, epic: 450 },
    category: "cardio",
    prenatalFriendly: false,
    intense: true,
  },
  {
    key: "intense",
    label: "Interwały / mocny trening",
    unit: "minutes",
    bucketPoints: { short: 180, normal: 320, solid: 420, epic: 480 },
    category: "challenge",
    prenatalFriendly: false,
    intense: true,
  },
  {
    key: "other_light",
    label: "🌿 Inna aktywność lekka",
    unit: "minutes",
    bucketPoints: { short: 90, normal: 170, solid: 260, epic: 330 },
    category: "light",
    prenatalFriendly: false,
    intense: false,
  },
  {
    key: "other_medium",
    label: "⚔️ Inna aktywność średnia",
    unit: "minutes",
    bucketPoints: { short: 130, normal: 250, solid: 350, epic: 430 },
    category: "medium",
    prenatalFriendly: false,
    intense: false,
  },
  {
    key: "other_hard",
    label: "🔥 Inna aktywność ciężka",
    unit: "minutes",
    bucketPoints: { short: 170, normal: 310, solid: 420, epic: 500 },
    category: "challenge",
    prenatalFriendly: false,
    intense: true,
  },
];

export function getDurationBucket(durationBucketKey: string) {
  return DURATION_BUCKETS.find((bucket) => bucket.key === durationBucketKey);
}
