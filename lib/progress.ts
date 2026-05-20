import type { ActivityLog } from "@/types/domain";

export function calculateTeamPoints(activityLogs: ActivityLog[]) {
  return activityLogs.reduce((sum, log) => sum + log.points, 0);
}

export function calculateProgressPercent(currentPoints: number, targetPoints: number) {
  if (targetPoints <= 0) {
    return 0;
  }

  return Math.min(Math.round((currentPoints / targetPoints) * 100), 100);
}
