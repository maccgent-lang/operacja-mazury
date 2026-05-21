"use client";

import { useActionState, useState } from "react";
import {
  updatePlayerClass,
  type PlayerClassActionState,
} from "@/app/actions";
import {
  getCharacterClassConfig,
  SELECTABLE_CHARACTER_CLASSES,
} from "@/config/classes";
import type { CharacterClass } from "@/types/domain";

type ClassSelectProps = {
  playerKey: string;
  currentClass: CharacterClass;
  classLocked?: boolean;
  isSupabaseConfigured: boolean;
};

const initialState: PlayerClassActionState = {
  ok: false,
  message: "",
};

export function ClassSelect({
  playerKey,
  currentClass,
  classLocked = false,
  isSupabaseConfigured,
}: ClassSelectProps) {
  const [state, formAction] = useActionState(updatePlayerClass, initialState);
  const [selectedClass, setSelectedClass] =
    useState<CharacterClass>(currentClass);
  const selectedClassConfig = getCharacterClassConfig(selectedClass);
  const isDisabled = !isSupabaseConfigured;

  if (classLocked || state.ok) {
    return null;
  }

  return (
    <form
      action={formAction}
      className="mt-4 grid w-full max-w-full min-w-0 gap-3 overflow-hidden rounded-lg border border-border/70 bg-background/35 p-3 text-xs"
    >
      <input name="playerKey" type="hidden" value={playerKey} />

      <label className="grid min-w-0 gap-1">
        <span className="font-medium text-foreground">Wybierz klasę</span>
        <select
          className="w-full max-w-full rounded-md border border-border bg-background px-2 py-2 text-foreground disabled:opacity-80"
          defaultValue={currentClass}
          disabled={isDisabled}
          name="classKey"
          onChange={(event) =>
            setSelectedClass(event.target.value as CharacterClass)
          }
        >
          {SELECTABLE_CHARACTER_CLASSES.map((characterClass) => (
            <option key={characterClass.key} value={characterClass.key}>
              {characterClass.label} — {characterClass.bonusLabel}
            </option>
          ))}
        </select>
      </label>

      <div className="min-w-0 rounded-md border border-border/70 bg-muted/60 p-2 text-muted-foreground">
        <p className="font-medium text-foreground">
          {selectedClassConfig.label}
        </p>
        <p className="break-words">{selectedClassConfig.bonusLabel}</p>
      </div>

      <button
        className="w-full rounded-md border border-accent/50 px-3 py-2 text-xs font-medium text-accent disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
        disabled={isDisabled}
        type="submit"
      >
        Zapisz klasę
      </button>

      {!isSupabaseConfigured ? (
        <p className="text-muted-foreground">Zmiana klas wymaga Supabase.</p>
      ) : null}

      {state.message ? (
        <p
          className={
            state.ok
              ? "break-words text-accent"
              : "break-words text-destructive"
          }
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
