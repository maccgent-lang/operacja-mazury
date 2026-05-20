ARCHITEKTURA TECHNICZNA

Projekt jest optymalizowany pod szybkość developmentu i łatwość zmian za pomocą AI (vibe coding), a nie pod skalowalność czy wzorce enterprise.

1. Stack Technologiczny

Środowisko: Next.js (App Router), Node.js, pnpm

Język: TypeScript

Styling: Tailwind CSS (v4)

Komponenty UI: shadcn/ui (Silnik: Radix, Preset: Nova - Lucide/Geist)

Baza Danych: Supabase (PostgreSQL)

Hosting: Vercel

2. Główne Zasady Architektury

Single-Page App (Mocno ukryte): Jedna główna strona z dashboardem, ewentualnie modal/overlay na formularze.

Brak Auth: Brak systemu logowania użytkowników.

Brak dedykowanego Backend API: Nie budujemy osobnego API w Node/Express. Używamy Supabase Client (z kluczami anon) lub Server Actions w Next.js bezpośrednio gadających do bazy.

State Management: Wbudowane narzędzia Reacta (useState, useContext) - nie ciągniemy Reduxa czy Zustanda jeśli nie jest to absolutnie konieczne.

3. Struktura Danych i Konfiguracja

Dane dzielą się wyraźnie na dwa typy:

A. Dane "Twarde" (w kodzie)

Reguły gry trzymamy w plikach konfiguracyjnych (np. src/config), a nie w bazie danych, żeby łatwiej było je modyfikować przez GitHub i AI.

Klasy postaci

System mnożników i punktacji

Lista kamieni milowych (milestones) i odznak (badges)

B. Dane "Miękkie" (Supabase)

Tylko niezbędne dane transakcyjne, do których dostęp będzie publiczny lub semi-publiczny.

players (Tabela): Lista uczestników (imię, avatar_url, przypisana_klasa_id, soft_delete_flag). Uwaga: Możliwe, że całą tabelę players przerzucimy do src/config, jeśli lista osób jest zamknięta.

activity_logs (Tabela): Feed wpisów. (id, player_id, typ_aktywnosci, czas_trwania, dystans, wyliczone_punkty, timestamp, komentarz).