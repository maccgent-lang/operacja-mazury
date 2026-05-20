import type { Player } from "@/types/domain";

type PlayerCardProps = {
  player: Player;
  points: number;
};

const classFlavor: Record<Player["characterClass"], string> = {
  tank: "Trzyma załogę stabilnie, nawet gdy szlak robi się grząski.",
  scout: "Wypatruje dobrej trasy i dba o przyjazne tempo wyprawy.",
  monk: "Wnosi spokój, ruch i cierpliwą regularność.",
  berserker: "Dodaje energii, gdy wyprawa potrzebuje mocniejszego zrywu.",
  healer: "Dba o załogę i łagodny rytm wspólnej drogi.",
  bard: "Podtrzymuje ducha wyprawy między jednym wpisem a drugim.",
};

const classLabels: Record<Player["characterClass"], string> = {
  tank: "Tank",
  scout: "Zwiadowca",
  monk: "Mnich",
  berserker: "Berserker",
  healer: "Uzdrowiciel",
  bard: "Bard",
};

function formatCharacterClass(characterClass: Player["characterClass"]) {
  return classLabels[characterClass];
}

export function PlayerCard({ player, points }: PlayerCardProps) {
  return (
    <article className="rounded-lg border border-border/80 bg-card/80 p-4 text-card-foreground shadow-lg shadow-black/10">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-muted text-sm font-semibold text-foreground">
          {player.name.slice(0, 1)}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-foreground">{player.name}</h3>
            <span className="rounded-md border border-border/70 px-2 py-0.5 text-xs text-muted-foreground">
              {formatCharacterClass(player.characterClass)}
            </span>
          </div>
          <p className="mt-2 text-sm leading-5 text-muted-foreground">
            {classFlavor[player.characterClass]}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span className="rounded-md border border-border/70 px-2 py-1">
          Wkład do wspólnego celu: {points} pkt
        </span>

        {player.isPrenatalFriendly ? (
          <span className="rounded-md border border-secondary/60 bg-secondary/35 px-2 py-1 text-secondary-foreground">
            Tryb prenatal-friendly
          </span>
        ) : null}
      </div>
    </article>
  );
}
