import type { Player } from "@/types/domain";

type PlayerCardProps = {
  player: Player;
  points: number;
};

function formatCharacterClass(characterClass: Player["characterClass"]) {
  return characterClass.slice(0, 1).toUpperCase() + characterClass.slice(1);
}

export function PlayerCard({ player, points }: PlayerCardProps) {
  return (
    <article className="rounded-lg border bg-card p-4 text-card-foreground">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">{player.name}</h3>
          <p className="text-sm text-muted-foreground">
            {formatCharacterClass(player.characterClass)}
          </p>
        </div>

        <p className="text-right text-sm font-medium">{points} points</p>
      </div>

      {player.isPrenatalFriendly ? (
        <p className="mt-3 text-sm text-muted-foreground">Prenatal-friendly</p>
      ) : null}
    </article>
  );
}
