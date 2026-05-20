export type CharacterClass =
  | "tank"
  | "scout"
  | "monk"
  | "berserker"
  | "healer"
  | "bard";

export type ActivityCategory =
  | "light"
  | "medium"
  | "strength"
  | "cardio"
  | "mobility"
  | "regeneration"
  | "prenatal"
  | "challenge";

export type ActivityUnit = "minutes" | "reps" | "session";
export type DurationBucketKey = "short" | "normal" | "solid" | "epic";

export type DurationBucket = {
  key: DurationBucketKey;
  label: string;
  rangeLabel: string;
  quantity: number;
};

export type ActivityBucketPoints = Record<DurationBucketKey, number>;

export type ActivityDefinition = {
  key: string;
  label: string;
  unit: ActivityUnit;
  bucketPoints: ActivityBucketPoints;
  category: ActivityCategory;
  prenatalFriendly: boolean;
  prenatalOnly?: boolean;
  intense: boolean;
};

export type Player = {
  id: string;
  name: string;
  characterClass: CharacterClass;
  classLocked?: boolean;
  isPrenatalFriendly: boolean;
};

export type PlayerProfile = {
  playerKey: string;
  classKey: CharacterClass;
  classLocked: boolean;
};

export type ActivityLog = {
  id: string;
  playerId: string;
  activityKey: string;
  quantity: number;
  points: number;
  classKey?: CharacterClass;
  durationBucket?: DurationBucketKey;
  occurredOn: string;
  note?: string;
};

export type ActivityLogRow = {
  id: string;
  player_key: string;
  class_key?: CharacterClass;
  activity_key: string;
  quantity: number;
  points: number;
  duration_bucket: DurationBucketKey | null;
  occurred_on: string;
  note: string | null;
  created_at: string;
};

export type NewActivityLogRow = {
  player_key: string;
  class_key: CharacterClass;
  activity_key: string;
  quantity: number;
  points: number;
  duration_bucket: DurationBucketKey;
  occurred_on?: string;
  note: string | null;
};

export type PlayerProfileRow = {
  player_key: string;
  class_key: CharacterClass;
  class_locked?: boolean;
  updated_at: string;
};
