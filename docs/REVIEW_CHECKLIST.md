# Review Checklist

Use this checklist for every AI-generated change.

## Scope

- [ ] Does the change implement only the requested task?
- [ ] Did it avoid unrelated refactors?
- [ ] Did it avoid new dependencies unless justified?
- [ ] Does the app still build?

## Architecture

- [ ] Static game rules are in `src/config`.
- [ ] Business logic is in `src/lib`.
- [ ] UI components stay presentational.
- [ ] No separate backend was introduced.
- [ ] No auth was introduced.
- [ ] No database work was introduced before the planned Supabase phase.

## Product safety

- [ ] No public leaderboard.
- [ ] No shaming copy.
- [ ] No player comparisons.
- [ ] No BMI, calories, weight or dieting features.
- [ ] Prenatal-friendly rules are respected.
- [ ] Intense activities are not promoted to prenatal-friendly players.

## TypeScript

- [ ] Types are clear.
- [ ] No unnecessary `any`.
- [ ] No overengineered generics.
- [ ] Function names are boring and obvious.
- [ ] Errors are understandable.

## Tests

- [ ] Logic changes have tests where useful.
- [ ] Scoring changes are tested.
- [ ] Badge/milestone changes are tested.
- [ ] Edge cases are covered where cheap.

## Manual QA

- [ ] `pnpm lint`
- [ ] `pnpm build`
- [ ] `pnpm test` if tests exist
- [ ] App runs with `pnpm dev`
- [ ] Main page renders
- [ ] Mobile width is usable