# Operacja Mazury — TASKS

## Statusy

- TODO
- IN_PROGRESS
- REVIEW
- DONE
- BLOCKED

## Zasady pracy

- Jeden task = jeden mały zakres zmian.
- Jeden task powinien dać się sprawdzić przez `pnpm lint` i `pnpm build`.
- Nie robimy Supabase, dopóki mockowy dashboard i logika lokalna nie są gotowe.
- Nie dodajemy auth w MVP.
- Nie dodajemy rankingu.
- Nie dodajemy osobnego backendu.
- Nie dodajemy nowych bibliotek bez wyraźnego powodu.
- Każdy task musi mieć acceptance criteria.
- Każdy task musi kończyć się działającą aplikacją.

---

## Faza 0 — Project workflow

### T00 — Add AI workflow files

Status: TODO

Goal:
Add project-level workflow files for AI-assisted development.

Scope:
- TASKS.md
- AI_RULES.md
- REVIEW_CHECKLIST.md
- DECISIONS.md

Acceptance criteria:
- TASKS.md contains task backlog and workflow rules.
- AI_RULES.md contains constraints for coding agents.
- REVIEW_CHECKLIST.md contains review checklist.
- DECISIONS.md exists and has initial architecture decisions.
- App still builds.

Commands:
- pnpm lint
- pnpm build

Manual QA:
- Open repo and confirm files are readable.
- Confirm no app code was changed.

---

## Faza 1 — Szkielet i mock dashboard

### T01 — Create base app shell

Status: TODO

Goal:
Create a simple one-page app shell for the dashboard.

Scope:
- src/app/page.tsx
- src/components/AppShell.tsx

Acceptance criteria:
- Main page renders app title.
- Page uses mobile-first layout.
- No Supabase.
- No business logic.
- No new dependencies.
- App still builds.

Commands:
- pnpm lint
- pnpm build

Manual QA:
- Run `pnpm dev`.
- Open `/`.
- Confirm page renders without errors.

---

### T02 — Add mock data

Status: TODO

Goal:
Add local mock data for players and activity logs.

Scope:
- src/lib/mock-data.ts
- src/types/domain.ts

Acceptance criteria:
- Mock players include at least 6 people.
- At least one player has `isPrenatalFriendly: true`.
- Mock activity logs include points, activity key, date and optional note.
- No Supabase.
- No UI changes except imports if needed.

Commands:
- pnpm lint
- pnpm build

Manual QA:
- Confirm mock data is easy to read and edit.

---

### T03 — Create static dashboard sections

Status: TODO

Goal:
Render the main dashboard sections using mock data.

Scope:
- src/app/page.tsx
- src/components/AppShell.tsx
- src/components/ProgressBar.tsx
- src/components/ActivityFeed.tsx
- src/components/PlayerCard.tsx

Acceptance criteria:
- Dashboard shows title.
- Dashboard shows progress area.
- Dashboard shows recent activities.
- Dashboard shows player cards.
- No form yet.
- No Supabase.
- No ranking.

Commands:
- pnpm lint
- pnpm build

Manual QA:
- Open `/`.
- Confirm layout is readable on desktop and mobile width.
- Confirm no public leaderboard exists.

---

### T04 — Add basic visual direction

Status: TODO

Goal:
Apply initial Mazury/RPG visual style.

Scope:
- src/app/globals.css
- src/app/page.tsx
- existing components

Acceptance criteria:
- Dark lake/forest inspired background.
- Card-based layout.
- Mobile-first spacing.
- Progress area is visually prominent.
- No heavy animations.
- No new dependencies.

Commands:
- pnpm lint
- pnpm build

Manual QA:
- Check desktop and mobile width.
- Confirm UI does not look like a corporate fitness dashboard.

---

## Faza 2 — Config gry

### T05 — Add game config and domain types

Status: TODO

Goal:
Add basic game config and shared domain types.

Scope:
- src/config/game.ts
- src/types/domain.ts

Acceptance criteria:
- GAME_CONFIG includes name, target points and trip date.
- Domain types include CharacterClass, ActivityCategory, ActivityUnit.
- No UI changes.
- No Supabase.

Commands:
- pnpm lint
- pnpm build

---

### T06 — Add activities config

Status: TODO

Goal:
Add static activity definitions.

Scope:
- src/config/activities.ts
- src/types/domain.ts

Acceptance criteria:
- Activities include light, medium, strength, mobility, regeneration and prenatal-friendly examples.
- Every activity has label, unit, baseQuantity, points, category and prenatalFriendly.
- Prenatal-friendly activities are clearly marked.
- No database code.

Commands:
- pnpm lint
- pnpm build

---

### T07 — Add classes and milestones config

Status: TODO

Goal:
Add character classes and milestones.

Scope:
- src/config/classes.ts
- src/config/milestones.ts

Acceptance criteria:
- Classes include Tank, Scout, Monk, Berserker, Healer, Bard.
- Classes are visual/narrative only.
- Milestones include 1000, 2500, 5000, 7500, 10000 points.
- No bonus scoring.

Commands:
- pnpm lint
- pnpm build

---

## Faza 3 — Logika lokalna

### T08 — Implement scoring

Status: TODO

Goal:
Implement point calculation.

Scope:
- src/lib/scoring.ts
- src/lib/scoring.test.ts

Acceptance criteria:
- calculatePoints supports session, minutes and reps.
- Points are rounded down to full baseQuantity units.
- Unknown activity key throws an error.
- Tests cover at least 5 cases.

Commands:
- pnpm test
- pnpm lint
- pnpm build

---

### T09 — Implement progress and milestones logic

Status: TODO

Goal:
Implement team progress and milestone helpers.

Scope:
- src/lib/progress.ts
- src/lib/progress.test.ts

Acceptance criteria:
- Can calculate total team points.
- Can calculate progress percentage.
- Can get current and next milestone.
- Tests cover edge cases.

Commands:
- pnpm test
- pnpm lint
- pnpm build

---

### T10 — Implement badge logic

Status: TODO

Goal:
Implement basic badge calculation.

Scope:
- src/lib/badges.ts
- src/lib/badges.test.ts

Acceptance criteria:
- Team badges are based on total points.
- Player active days can be calculated.
- Badge logic is derived from logs.
- No unlocked_badges table.

Commands:
- pnpm test
- pnpm lint
- pnpm build

---

## Faza 4 — Formularz na mockach

### T11 — Add activity form UI without persistence

Status: TODO

Goal:
Create activity form using local mock data.

Scope:
- src/components/ActivityForm.tsx

Acceptance criteria:
- User can choose player.
- User can choose activity.
- User can enter quantity.
- User can see point preview.
- No actual save yet.
- No Supabase.

Commands:
- pnpm lint
- pnpm build

---

### T12 — Add prenatal-friendly filtering

Status: TODO

Goal:
Prioritize safe activities for prenatal-friendly players.

Scope:
- src/components/ActivityForm.tsx
- src/lib/activities.ts

Acceptance criteria:
- Prenatal-friendly players see safe activities first.
- Intense activities are hidden or clearly marked as not recommended.
- No pressure or streak messaging.

Commands:
- pnpm lint
- pnpm build

---

## Faza 5 — Supabase

### T13 — Add database schema

Status: TODO

Goal:
Add Supabase schema for players and activity_logs.

Scope:
- src/db/schema.sql
- .env.local.example

Acceptance criteria:
- players table exists.
- activity_logs table exists.
- points are stored in activity_logs.
- TEAM_WRITE_CODE is documented.
- Service role key is not exposed to browser.

Commands:
- pnpm lint
- pnpm build

---

### T14 — Add Supabase server client

Status: TODO

Goal:
Add server-side Supabase client.

Scope:
- src/lib/supabase/server.ts
- src/lib/supabase/types.ts

Acceptance criteria:
- Client is server-only.
- Uses env variables.
- Does not expose service role key to client components.

Commands:
- pnpm lint
- pnpm build

---

### T15 — Add addActivity Server Action

Status: TODO

Goal:
Persist activity logs through a Server Action.

Scope:
- src/app/actions.ts
- src/lib/validation.ts
- src/lib/scoring.ts

Acceptance criteria:
- Validates form input.
- Checks TEAM_WRITE_CODE.
- Calculates points on server.
- Inserts activity log into Supabase.
- Revalidates dashboard path.

Commands:
- pnpm lint
- pnpm build

---

## Faza 6 — Final dashboard

### T16 — Connect dashboard to Supabase

Status: TODO

Goal:
Load real players and activity logs.

Scope:
- src/app/page.tsx
- src/lib/supabase/server.ts

Acceptance criteria:
- Dashboard uses real players.
- Dashboard uses real activity logs.
- Empty state is handled.
- No client-side secret leakage.

Commands:
- pnpm lint
- pnpm build

---

### T17 — Add milestone map and badge grid

Status: TODO

Goal:
Render final progress-related sections.

Scope:
- src/components/MilestoneMap.tsx
- src/components/BadgeGrid.tsx

Acceptance criteria:
- Milestone map shows current progress.
- Badge grid shows locked and unlocked states.
- No leaderboard.

Commands:
- pnpm lint
- pnpm build

---

## Faza 7 — Polish and deploy

### T18 — Mobile polish

Status: TODO

Goal:
Improve mobile layout and readability.

Scope:
- UI components only

Acceptance criteria:
- Works well on phone width.
- Form is easy to use on mobile.
- No visual clutter.

Commands:
- pnpm lint
- pnpm build

---

### T19 — Deploy to Vercel

Status: TODO

Goal:
Deploy MVP.

Scope:
- Vercel project
- env variables

Acceptance criteria:
- Main branch deploys.
- Env variables configured.
- App works from public link.
- Smoke test passes.

Commands:
- pnpm lint
- pnpm build