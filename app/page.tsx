import { AppShell } from "@/components/AppShell";
import { PLAYERS } from "@/config/players";
import {
  fetchActivityLogs,
  getPlayerProfiles,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

export default async function Home() {
  const [activityLogs, playerProfiles] = await Promise.all([
    fetchActivityLogs(),
    getPlayerProfiles(),
  ]);
  const profileByPlayer = new Map(
    playerProfiles.map((profile) => [profile.playerKey, profile]),
  );
  const players = PLAYERS.map((player) => ({
    ...player,
    characterClass:
      profileByPlayer.get(player.id)?.classKey ?? player.characterClass,
    classLocked: profileByPlayer.get(player.id)?.classLocked ?? false,
  }));

  return (
    <AppShell
      activityLogs={activityLogs}
      isSupabaseConfigured={isSupabaseConfigured()}
      players={players}
    />
  );
}
