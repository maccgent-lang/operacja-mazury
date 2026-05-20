import { ClassSelect } from "@/components/ClassSelect";
import { getCharacterClassConfig } from "@/config/classes";
import type { Player } from "@/types/domain";

type PlayerCardProps = {
  player: Player;
  points: number;
  isSupabaseConfigured: boolean;
};

const classFlavor: Record<Player["characterClass"], string> = {
  tank: "Trzyma załogę stabilnie, nawet gdy szlak robi się grząski.",
  scout: "Wypatruje dobrej trasy i dba o przyjazne tempo wyprawy.",
  monk: "Wnosi spokój, ruch i cierpliwą regularność.",
  berserker: "Dodaje energii, gdy wyprawa potrzebuje mocniejszego zrywu.",
  healer: "Dba o załogę i łagodny rytm wspólnej drogi.",
  bard: "Podtrzymuje ducha wyprawy między jednym wpisem a drugim.",
};

function formatCharacterClass(characterClass: Player["characterClass"]) {
  return getCharacterClassConfig(characterClass).label;
}

export function PlayerCard({
  player,
  points,
  isSupabaseConfigured,
}: PlayerCardProps) {
  const classConfig = getCharacterClassConfig(player.characterClass);

  return (
    <article className="w-full max-w-full min-w-0 overflow-hidden rounded-lg border border-border/80 bg-card/80 p-4 text-card-foreground shadow-lg shadow-black/10">
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-muted text-sm font-semibold text-foreground">
          {player.name.slice(0, 1)}
        </div>

        <div className="min-w-0 max-w-full">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <h3 className="break-words font-semibold text-foreground">
              {player.name}
            </h3>
            <span className="max-w-full break-words rounded-md border border-border/70 px-2 py-0.5 text-xs text-muted-foreground">
              {formatCharacterClass(player.characterClass)}
            </span>
            <span className="max-w-full break-words rounded-md border border-accent/40 bg-accent/10 px-2 py-0.5 text-xs text-accent">
              {classConfig.bonusLabel}
            </span>
          </div>
          <p className="mt-2 break-words text-sm leading-5 text-muted-foreground">
            {classFlavor[player.characterClass]}
          </p>
        </div>
      </div>

      <div className="mt-4 flex min-w-0 flex-wrap gap-2 text-xs text-muted-foreground">
        <span className="max-w-full break-words rounded-md border border-border/70 px-2 py-1">
          Wkład do wspólnego celu: {points} pkt
        </span>

        {player.isPrenatalFriendly ? (
          <span className="max-w-full break-words rounded-md border border-secondary/60 bg-secondary/35 px-2 py-1 text-secondary-foreground">
            Tryb bezpieczny: spokojne aktywności punktują wyżej
          </span>
        ) : null}
      </div>

      {!player.classLocked ? (
        <ClassSelect
          classLocked={player.classLocked}
          currentClass={player.characterClass}
          isSupabaseConfigured={isSupabaseConfigured}
          playerKey={player.id}
        />
      ) : null}
    </article>
  );
}
