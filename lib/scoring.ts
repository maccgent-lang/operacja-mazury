import { ACTIVITIES } from "@/config/activities";
import { getCharacterClassConfig } from "@/config/classes";
import { PLAYERS } from "@/config/players";
import type { CharacterClass, DurationBucketKey } from "@/types/domain";

const MAX_POINTS_PER_LOG = 500;
const PRENATAL_SAFE_BONUS = 0.3;
const CLASS_BONUS = 0.1;

type CalculatePointsInput = {
  activityKey: string;
  durationBucket: DurationBucketKey;
  playerKey: string;
  classKey?: CharacterClass;
};

export function getActivity(activityKey: string) {
  return ACTIVITIES.find((activity) => activity.key === activityKey);
}

export function calculatePointBreakdown({
  activityKey,
  durationBucket,
  playerKey,
  classKey,
}: CalculatePointsInput) {
  const activity = getActivity(activityKey);
  const player = PLAYERS.find((knownPlayer) => knownPlayer.id === playerKey);

  if (!activity) {
    throw new Error("Nieznana aktywność.");
  }

  const points = activity.bucketPoints[durationBucket];

  if (points === undefined) {
    throw new Error("Nieznany czas aktywności.");
  }

  const activeClassKey = classKey ?? player?.characterClass;
  const classConfig = activeClassKey
    ? getCharacterClassConfig(activeClassKey)
    : undefined;
  const hasPrenatalSafeBonus =
    Boolean(player?.isPrenatalFriendly) &&
    activity.prenatalFriendly &&
    !activity.intense;
  const hasClassBonus =
    classConfig?.preferredActivityKeys.includes(activity.key) ?? false;
  const multiplier =
    1 +
    (hasPrenatalSafeBonus ? PRENATAL_SAFE_BONUS : 0) +
    (hasClassBonus ? CLASS_BONUS : 0);

  return {
    basePoints: points,
    points: Math.min(Math.floor(points * multiplier), MAX_POINTS_PER_LOG),
    bonuses: {
      prenatalSafe: hasPrenatalSafeBonus,
      classBonus: hasClassBonus,
    },
  };
}

export function calculatePoints(input: CalculatePointsInput) {
  return calculatePointBreakdown(input).points;
}
