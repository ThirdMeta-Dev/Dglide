create table if not exists dglide_demo_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  contact text,
  company text not null,
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'completed', 'cancelled')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS: only service role can read; anyone can insert (public form)
alter table dglide_demo_requests enable row level security;

create policy "allow_insert_demo_requests"
  on dglide_demo_requests for insert
  with check (true);

create policy "service_role_all"
  on dglide_demo_requests for all
  using (auth.role() = 'service_role');
