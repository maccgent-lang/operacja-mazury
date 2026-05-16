export type CharacterClass =
  | "tank"
  | "scout"
  | "monk"
  | "berserker"
  | "healer"
  | "bard";

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
