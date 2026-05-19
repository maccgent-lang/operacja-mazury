# Decisions

## D001 — Use one-page Next.js app

We use a single-page Next.js App Router application.

Reason:
The project is small, short-lived and dashboard-focused.

Consequences:
- No complex routing.
- Main page contains sections.
- Components can be extracted as the page grows.

---

## D002 — Keep game config in code

Game rules live in `src/config`.

Reason:
Rules are easier to review, edit and version in code.

Consequences:
- Supabase stores only dynamic data.
- Changing point rules later does not rewrite historical activity logs.

---

## D003 — No authentication in MVP

We do not implement full auth.

Reason:
Small trusted group, short lifecycle, lower complexity.

Consequences:
- Write access will later use TEAM_WRITE_CODE.
- This is not real security, only lightweight protection.

---

## D004 — No leaderboard

We do not build a public ranking.

Reason:
The product is team-progress oriented and anti-shaming.

Consequences:
- Player cards can show personal contribution.
- UI must not sort players by points as a ranking.

---

## D005 — Prenatal-friendly is a product requirement

Prenatal-friendly treatment is required, not cosmetic.

Reason:
Some users are pregnant and the app must avoid unsafe suggestions or pressure.

Consequences:
- Safe activities are prioritized.
- Intense activities are hidden or marked as not recommended.
- No pressure-based copy.