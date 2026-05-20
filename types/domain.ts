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

export type Player = {
  id: string;
  name: string;
  characterClass: CharacterClass;
  isPrenatalFriendly: boolean;
};

export type ActivityLog = {
  id: string;
  playerId: string;
  activityKey: string;
  quantity: number;
  points: number;
  occurredOn: string;
  note?: string;
};
