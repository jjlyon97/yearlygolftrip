-- ============================================================
-- Yearly Golf Trip — passport (which courses you have played)
-- Paste into the Supabase SQL Editor and Run. Safe to re-run.
-- Requires supabase-setup.sql to have been run first.
-- ============================================================

create table if not exists public.passport (
  rater_id   text        primary key,
  courses    jsonb       not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

do $$ begin
  alter table public.passport add constraint passport_courses_is_array
    check (jsonb_typeof(courses) = 'array');
exception when duplicate_object then null; end $$;

do $$ begin
  alter table public.passport add constraint passport_rater_len
    check (length(rater_id) between 8 and 64);
exception when duplicate_object then null; end $$;

-- cap it so nobody can use this as free storage
do $$ begin
  alter table public.passport add constraint passport_size
    check (jsonb_array_length(courses) <= 500);
exception when duplicate_object then null; end $$;

drop trigger if exists passport_touch on public.passport;
create trigger passport_touch
  before update on public.passport
  for each row execute function public.touch_updated_at();

alter table public.passport enable row level security;

drop policy if exists "read passports"   on public.passport;
drop policy if exists "add a passport"   on public.passport;
drop policy if exists "edit a passport"  on public.passport;

create policy "read passports"  on public.passport for select using (true);
create policy "add a passport"  on public.passport for insert with check (true);
create policy "edit a passport" on public.passport for update using (true) with check (true);
-- again, deliberately no delete policy

revoke all on table public.passport from anon, authenticated;
grant select, insert, update on table public.passport to anon, authenticated;

select
  (select count(*) from pg_policies where tablename = 'passport')        as policy_count,
  (select relrowsecurity from pg_class where relname = 'passport')       as rls_enabled,
  (select string_agg(privilege_type, ', ' order by privilege_type)
     from information_schema.role_table_grants
    where table_name = 'passport' and grantee = 'anon')                  as anon_can;
-- Expect: 3 | true | INSERT, SELECT, UPDATE
