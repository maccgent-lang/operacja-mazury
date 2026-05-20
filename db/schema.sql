create extension if not exists pgcrypto;

create table if not exists public.player_profiles (
  player_key text primary key,
  class_key text not null,
  class_locked boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.player_profiles
  add column if not exists class_locked boolean not null default false;

insert into public.player_profiles (player_key, class_key, class_locked)
values
  ('aniela', 'healer', false),
  ('weronika', 'monk', false),
  ('wojtek', 'tank', false),
  ('kuba', 'scout', false),
  ('maciek', 'bard', false)
on conflict (player_key) do nothing;

create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  player_key text not null,
  class_key text not null,
  activity_key text not null,
  quantity numeric not null check (quantity > 0),
  points integer not null check (points >= 0),
  duration_bucket text not null,
  note text null,
  occurred_on date not null default current_date,
  created_at timestamptz not null default now()
);

alter table public.activity_logs
  add column if not exists class_key text;

update public.activity_logs
set class_key = public.player_profiles.class_key
from public.player_profiles
where public.activity_logs.player_key = public.player_profiles.player_key
  and public.activity_logs.class_key is null;

update public.activity_logs
set class_key = 'bard'
where class_key is null;

alter table public.activity_logs
  alter column class_key set not null;

alter table public.player_profiles enable row level security;
alter table public.activity_logs enable row level security;

create index if not exists activity_logs_created_at_desc_idx
  on public.activity_logs (created_at desc);
