# Multi-Agent AI Workflow (Solo Developer)

## Architektura Ról
1. **Planner (GPT):** Analizuje cel, modyfikuje `TASKS.md`, utrzymuje architekturę wysokiego poziomu. Z perspektywy kodu - read-only.
2. **Executor (Codex/Cursor/Jules):** Operuje w izolowanym środowisku (feature branch). Skupiony wyłącznie na implementacji atomowego zadania.
3. **Reviewer (Custom GPT Auditor):** Weryfikuje diffy pod kątem kryteriów akceptacji, wycieku sekretów i długu architektonicznego. Nie ma dostępu do środowiska uruchomieniowego.

---

## Zasada nadrzędna

Workflow ma chronić prostotę projektu, nie zastępować myślenia.

Jeśli proces zaczyna być cięższy niż task, wróć do prostszej wersji:
- jeden branch,
- jeden task,
- lint/build/test,
- diff review,
- squash merge.

---

## Standardowa Pętla Wykonawcza (Task Loop)

> Konwencja placeholderów:
> - `<TASK_ID>` — identyfikator zadania z `TASKS.md`, np. `T01`, `T08`, `T15`
> - `<task-slug>` — krótki opis do nazwy brancha, np. `base-app-shell`, `scoring`, `supabase-server-client`
> - `<task-title>` — pełny tytuł zadania z `TASKS.md`

### 1. Synchronizacja i Plan (Baza)

Upewnij się, że startujesz ze stabilnego stanu i masz poprawnie zdefiniowane zadanie w `TASKS.md`.

```bash
git checkout main
git pull --ff-only
git status
```
**Akcja:** Przekaż kontekst/kod do Plannera, ustal Acceptance Criteria dla aktualnego zadania <TASK_ID>.
Planner powinien doprecyzować:

scope taska,
pliki, które mogą być zmienione,
acceptance criteria,
komendy do uruchomienia,
ryzyka architektoniczne,
czy task dotyka logiki biznesowej i wymaga testów.

### 2. Izolacja Transakcji (Śluza AI)
Utworzenie izolowanego środowiska dla Executora.

```bash
git checkout -b task/<TASK_ID>-<task-slug>
```
**Akcja:** Przekazujesz pałeczkę do Codexa/Cursora. Executor operuje wyłącznie w tym branchu i wyłącznie w zakresie aktualnego taska.

### 3. Implementacja (Executor)
Executor modyfikuje pliki w oparciu o wytyczne z TASKS.md dla <TASK_ID>.
Zasady:

nie wychodzi poza scope taska,
nie dodaje nowych bibliotek bez wyraźnego uzasadnienia,
nie zmienia architektury bez powrotu do Plannera,
nie robi „przy okazji” refaktorów,
jeśli task dotyczy UI, nie przenosi logiki biznesowej do komponentów,
jeśli task dotyczy logiki, trzyma ją w src/lib/.

### 4. Quality Gate (Weryfikacja lokalna)
Przed oddaniem do zewnętrznego audytu kod musi spełniać podstawowe normy inżynieryjne (tzw. syntax check & build).

```bash
pnpm lint
pnpm build
git diff --check
```
Jeśli task dotyka src/lib, logiki punktów, badge’y, progressu, dat, walidacji albo filtrowania prenatal-friendly. uruchom też:
pnpm test.
Rekomendowana kolejność dla tasków z logiką:
```bash
pnpm test
pnpm lint
pnpm build
git diff --check
```

**Akcja:** Jeśli gate sypie błędami, Executor poprawia: Limit:
jeśli Executor dwa razy z rzędu nie potrafi przejść tego samego gate’a, przerwij implementację,
zbierz output błędu,
wróć do Plannera po decyzję: uprościć task, podzielić task albo abortować branch.

Jeśli gate przechodzi, zrób roboczy zrzut stanu:

```bash
git add .
git commit -m "WIP: <TASK_ID> implementation"
```

### 5. Generowanie Dowodów dla Audytora (Review)
Wyciągasz czysty przyrost zmian z obecnego zadania, omijając śmieci konfiguracyjne, które marnują Context Window.

```bash
git diff main --stat > review-reports/review-stat.txt
git diff main --name-status > review-reports/review-files.txt
git diff main -- . ':(exclude)pnpm-lock.yaml' > review-reports/review.diff
```
Jeśli zmiana dotyczy zależności, nie wykluczaj lockfile’a:
```bash
git diff main...HEAD -- . > review-reports/review.diff
```

**Akcja:** Akcja: Wrzucasz do Reviewera:
review.diff,
sekcję <TASK_ID> z TASKS.md,
wynik komend quality gate,
krótki opis celu taska.

Szablon wiadomości do Reviewera:
Review this diff for Mazury Fit Quest / Operacja Mazury.

Task:
<TASK_ID> — <task-title>

Acceptance Criteria:
[wklej sekcję taska z TASKS.md]

Zmodyfikowane pliki:
[paste git diff --name-status]

Statystyka zmian:
[paste git diff --stat]

Commands:
- pnpm test: PASS / FAIL / N/A
- pnpm lint: PASS / FAIL
- pnpm build: PASS / FAIL
- git diff --check: PASS / FAIL

Reviewer focus:
- bugs
- acceptance criteria
- scope creep
- architecture violations
- unnecessary complexity
- no new dependencies unless justified
- no auth in MVP
- no separate backend
- no ranking
- no shaming copy
- prenatal-friendly safety if touched
- no client-side secret leakage if Supabase/env touched

Diff:
[wklej review.diff]

### 6. Poprawki (Feedback Loop)
Jeśli Reviewer znajdzie błędy:
wracasz do kroku 3,
Executor poprawia wyłącznie wskazane problemy,
ponownie odpalasz quality gate,
aktualizujesz roboczy commit,
generujesz świeży review.diff.

```bash
git add .
git commit --amend --no-edit
git diff main...HEAD -- . ':(exclude)pnpm-lock.yaml' > review.diff
```
Jeśli poprawka dotyczy zależności:
```bash
git add .
git commit --amend --no-edit
git diff main...HEAD -- . > review.diff
```

### 7. Integracja (Merge)
Reviewer zgłasza brak uwag. Kod spełnia kryteria.

```bash
git push origin task/<TASK_ID>-<task-slug>
#Create Pull Request
#Squash and merge
git checkout main
git pull
git branch -D task/<TASK_ID>-<task-slug>
```
**Akcja:** Zaktualizuj TASKS.md:
<TASK_ID> status: DONE,
jeśli task ujawnił nowe ryzyka albo decyzje, dopisz je do odpowiedniego pliku workflow/decyzyjnego.

---

## Procedura Pivot / Abort (Zarządzanie Błędem Architektonicznym)
Gdy w trakcie implementacji albo quality gate okaże się, że założenia Plannera są błędne, zbyt szerokie albo niemożliwe do zrealizowania, nie próbuj ratować brancha na siłę.

Natychmiastowy abort transakcji:

```bash
git checkout main
git branch -D task/<TASK_ID>-<task-slug>
```

**Korekta Architektury:**
Przekaż Plannerowi dowody z porażki:
stacktrace,
output z pnpm lint,
output z pnpm build,
output z pnpm test,
opis konfliktu ze scope lub architekturą,
fragment diffu, jeśli jest pomocny.

Planner aktualizuje strategię przed kolejną próbą:
upraszcza task,
dzieli task na mniejsze,
zmienia acceptance criteria,
dopisuje decyzję architektoniczną,
albo blokuje task jako BLOCKED.

---