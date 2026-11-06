create table public.word_centers (
  id uuid primary key default gen_random_uuid(),
  name text not null, city text not null, voivodeship text not null,
  verified boolean not null default false, created_at timestamptz default now());
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  name text not null check (char_length(name) between 1 and 80),
  category text not null check (category in ('AM','A1','A2','A','B1','B','B+E','C','C+E','D','D+E','T')),
  active boolean not null default false, created_at timestamptz default now());
create table public.monitoring_configs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  profile_id uuid not null references public.profiles on delete cascade,
  status text not null default 'inactive',
  interval_minutes int not null default 1440 check (interval_minutes >= 60),
  notify boolean not null default true, created_at timestamptz default now());
create table public.user_word_centers (
  user_id uuid not null references auth.users on delete cascade,
  profile_id uuid references public.profiles on delete cascade,
  word_center_id uuid not null references public.word_centers on delete cascade,
  favorite boolean not null default false, monitored boolean not null default false,
  primary key (user_id, word_center_id));
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  kind text not null, message text not null, read boolean not null default false,
  created_at timestamptz default now());
create table public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  action text not null, details text, created_at timestamptz default now());
create table public.user_settings (
  user_id uuid primary key references auth.users on delete cascade,
  theme text not null default 'dark', accent text default 'blue', data jsonb not null default '{}');
create index on public.profiles(user_id); create index on public.monitoring_configs(user_id);
create index on public.notifications(user_id, read); create index on public.activity_logs(user_id, created_at desc);
alter table public.word_centers enable row level security;
create policy "read centers" on public.word_centers for select using (true);
do $$ declare t text; begin
 foreach t in array array['profiles','monitoring_configs','user_word_centers','notifications','activity_logs','user_settings'] loop
  execute format('alter table public.%I enable row level security', t);
  execute format('create policy "own rows" on public.%I for all using (user_id = auth.uid()) with check (user_id = auth.uid())', t);
 end loop; end $$;
