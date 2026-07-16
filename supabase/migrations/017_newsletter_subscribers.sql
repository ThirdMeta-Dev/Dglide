create table if not exists public.dglide_newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source_path text,
  source_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint dglide_newsletter_subscribers_email_length check (char_length(email) between 3 and 254)
);

alter table public.dglide_newsletter_subscribers enable row level security;

create index if not exists dglide_newsletter_subscribers_created_at_idx
  on public.dglide_newsletter_subscribers (created_at desc);
