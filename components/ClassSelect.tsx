"use client";

import { useActionState, useEffect, useRef, useState } from "react";
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
const teamCodeStorageKey = "operacja-mazury-team-code";

export function ClassSelect({
  playerKey,
  currentClass,
  classLocked = false,
  isSupabaseConfigured,
}: ClassSelectProps) {
  const [state, formAction] = useActionState(updatePlayerClass, initialState);
  const [selectedClass, setSelectedClass] =
    useState<CharacterClass>(currentClass);
  const teamCodeInputRef = useRef<HTMLInputElement>(null);
  const selectedClassConfig = getCharacterClassConfig(selectedClass);
  const isDisabled = !isSupabaseConfigured;

  useEffect(() => {
    const savedTeamCode = window.localStorage.getItem(teamCodeStorageKey);

    if (teamCodeInputRef.current && savedTeamCode) {
      teamCodeInputRef.current.value = savedTeamCode;
    }
  }, []);

  useEffect(() => {
    const submittedTeamCode = teamCodeInputRef.current?.value;

    if (state.ok && submittedTeamCode) {
      window.localStorage.setItem(teamCodeStorageKey, submittedTeamCode);
    }
  }, [state.ok]);

  if (classLocked || state.ok) {
    return null;
  }

  return (
    <form
      action={formAction}
      className="mt-4 grid gap-3 rounded-lg border border-border/70 bg-background/35 p-3 text-xs"
    >
      <input name="playerKey" type="hidden" value={playerKey} />

      <label className="grid gap-1">
        <span className="font-medium text-foreground">Wybierz klasę</span>
        <select
          className="rounded-md border border-border bg-background px-2 py-1.5 text-foreground disabled:opacity-80"
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

      <div className="rounded-md border border-border/70 bg-muted/60 p-2 text-muted-foreground">
        <p className="font-medium text-foreground">
          {selectedClassConfig.label}
        </p>
        <p>{selectedClassConfig.bonusLabel}</p>
      </div>

      <label className="grid gap-1">
        <span className="text-muted-foreground">Kod drużyny</span>
        <input
          className="rounded-md border border-border bg-background px-2 py-1.5 text-foreground"
          disabled={!isSupabaseConfigured}
          name="writeCode"
          ref={teamCodeInputRef}
          required
          type="password"
        />
      </label>

      <button
        className="w-fit rounded-md border border-accent/50 px-3 py-1.5 text-xs font-medium text-accent disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isDisabled}
        type="submit"
      >
        Zapisz klasę
      </button>

      {!isSupabaseConfigured ? (
        <p className="text-muted-foreground">Zmiana klas wymaga Supabase.</p>
      ) : null}

      {state.message ? (
        <p className={state.ok ? "text-accent" : "text-destructive"}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
