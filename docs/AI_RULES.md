# AI Rules for Operacja Mazury

This project is a short-lived prototype. Optimize for clarity, speed and low complexity.

## Architecture constraints

- Use Next.js App Router and TypeScript.
- Do not create a separate backend.
- Do not add authentication in MVP.
- Do not add GraphQL.
- Do not add Prisma unless explicitly requested.
- Do not add Redux or Zustand.
- Do not add Docker.
- Do not add Storybook.
- Do not add analytics.
- Do not add payment logic.
- Do not move game config to the database.

## Project structure

- Keep static game rules in `src/config`.
- Keep business logic in `src/lib`.
- Keep shared domain types in `src/types`.
- Keep UI components small and presentational.
- Do not hide business logic inside React components.

## Product rules

- Do not create a public leaderboard.
- Do not create shaming messages.
- Do not compare players against each other.
- Do not add BMI, calories, body weight or dieting features.
- Do not add aggressive streak mechanics.
- Keep the shared team goal more important than individual performance.
- Respect prenatal-friendly safety rules.

## Database rules

- Supabase stores only dynamic data:
  - players
  - activity_logs
- Points are stored in activity_logs at creation time.
- Later changes to config must not rewrite historical points.
- Do not expose service role keys to the browser.

## Coding style

- Prefer readable TypeScript over clever TypeScript.
- Add new dependencies only with clear justification.
- Keep tasks small.
- Implement only the requested task.
- Avoid broad refactors unless explicitly requested.
- The app must build after every task.

## Testing

Prioritize tests for:
- scoring
- milestones
- badges
- active days
- prenatal-friendly filtering

Do not overinvest in:
- layout tests
- full E2E tests
- Supabase integration tests