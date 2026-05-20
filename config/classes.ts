import type { CharacterClass } from "@/types/domain";

export type CharacterClassConfig = {
  key: CharacterClass;
  label: string;
  bonusLabel: string;
  preferredActivityKeys: string[];
};

export const CHARACTER_CLASSES: Record<CharacterClass, CharacterClassConfig> = {
  healer: {
    key: "healer",
    label: "Uzdrowicielka",
    bonusLabel: "+10%: mobility, regeneracja aktywna, spacer",
    preferredActivityKeys: ["mobility", "active_recovery", "walk"],
  },
  monk: {
    key: "monk",
    label: "Mnich",
    bonusLabel: "+10%: mobility, regeneracja aktywna, spokojny basen/rower",
    preferredActivityKeys: ["mobility", "active_recovery", "calm_swim_bike"],
  },
  tank: {
    key: "tank",
    label: "Tank",
    bonusLabel: "+10%: siłownia, inna aktywność ciężka",
    preferredActivityKeys: ["strength", "other_hard"],
  },
  scout: {
    key: "scout",
    label: "Zwiadowca",
    bonusLabel: "+10%: spacer, cardio, inna aktywność średnia",
    preferredActivityKeys: ["walk", "cardio", "other_medium"],
  },
  bard: {
    key: "bard",
    label: "Bard",
    bonusLabel: "+10%: inne lekkie/średnie, regeneracja, spacer",
    preferredActivityKeys: [
      "other_light",
      "other_medium",
      "active_recovery",
      "walk",
    ],
  },
  berserker: {
    key: "berserker",
    label: "Berserker",
    bonusLabel: "+10%: siłownia, cardio, mocny trening",
    preferredActivityKeys: ["strength", "cardio", "intense", "other_hard"],
  },
};

export const SELECTABLE_CHARACTER_CLASSES: CharacterClassConfig[] = [
  CHARACTER_CLASSES.healer,
  CHARACTER_CLASSES.monk,
  CHARACTER_CLASSES.tank,
  CHARACTER_CLASSES.scout,
  CHARACTER_CLASSES.bard,
];

export function getCharacterClassConfig(characterClass: CharacterClass) {
  return CHARACTER_CLASSES[characterClass];
}
