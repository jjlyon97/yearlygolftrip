-- ============================================================
-- Yearly Golf Trip — shared ratings
-- Paste this whole file into the Supabase SQL Editor and Run.
-- Safe to run more than once.
-- ============================================================

-- 1. the table -----------------------------------------------
create table if not exists public.ratings (
  destination_id text        not null,
  rater_id       text        not null,
  scores         jsonb       not null default '{}'::jsonb,
  review         text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  primary key (destination_id, rater_id)
);

-- 2. sanity limits so a bad client cannot write junk ----------
do $$ begin
  alter table public.ratings add constraint ratings_scores_is_object
    check (jsonb_typeof(scores) = 'object');
exception when duplicate_object then null; end $$;

do $$ begin
  alter table public.ratings add constraint ratings_review_len
    check (review is null or length(review) <= 400);
exception when duplicate_object then null; end $$;

do $$ begin
  alter table public.ratings add constraint ratings_rater_len
    check (length(rater_id) between 8 and 64);
exception when duplicate_object then null; end $$;

do $$ begin
  alter table public.ratings add constraint ratings_dest_len
    check (length(destination_id) between 2 and 64);
exception when duplicate_object then null; end $$;

-- 3. keep updated_at honest -----------------------------------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists ratings_touch on public.ratings;
create trigger ratings_touch
  before update on public.ratings
  for each row execute function public.touch_updated_at();

-- 4. Row Level Security ---------------------------------------
-- This is the part that matters. The anon key sits in your
-- JavaScript where anyone can read it, which is fine ONLY
-- because these policies decide what that key is allowed to do.
alter table public.ratings enable row level security;

drop policy if exists "anyone can read ratings"   on public.ratings;
drop policy if exists "anyone can add a rating"   on public.ratings;
drop policy if exists "anyone can edit a rating"  on public.ratings;

create policy "anyone can read ratings"
  on public.ratings for select
  using (true);

create policy "anyone can add a rating"
  on public.ratings for insert
  with check (true);

create policy "anyone can edit a rating"
  on public.ratings for update
  using (true) with check (true);

-- Deliberately NO delete policy. Without it, nobody holding the
-- public anon key can wipe the table. Withdrawing a rating is
-- done by overwriting it with an empty scores object instead.

-- 5. check it worked -------------------------------------------
select
  (select count(*) from pg_policies
     where schemaname = 'public' and tablename = 'ratings')          as policy_count,
  (select relrowsecurity from pg_class where relname = 'ratings')    as rls_enabled;
-- Expect: policy_count = 3, rls_enabled = true
