-- ============================================================
-- 018: Case Studies — listing cards, gated PDF downloads, leads
-- Run in Supabase Dashboard → SQL Editor → Run
-- Safe to run multiple times (idempotent)
-- ============================================================

create table if not exists public.dglide_case_studies (
  id uuid primary key default gen_random_uuid(),
  company text not null default '',
  logo_url text not null default '',
  category text not null default '',
  title text not null default '',
  excerpt text not null default '',
  person_name text not null default '',
  person_role text not null default '',
  metric_one_value text not null default '',
  metric_one_label text not null default '',
  metric_two_value text not null default '',
  metric_two_label text not null default '',
  pdf_url text not null default '',
  is_featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published')),
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.dglide_case_studies enable row level security;

create index if not exists dglide_case_studies_status_order_idx
  on public.dglide_case_studies (status, order_index asc, created_at desc);

create table if not exists public.dglide_case_study_leads (
  id uuid primary key default gen_random_uuid(),
  case_study_id uuid references public.dglide_case_studies (id) on delete set null,
  case_study_title text not null default '',
  name text not null,
  email text not null,
  phone text not null default '',
  source_path text,
  created_at timestamptz not null default now(),
  constraint dglide_case_study_leads_email_length check (char_length(email) between 3 and 254)
);

alter table public.dglide_case_study_leads enable row level security;

create index if not exists dglide_case_study_leads_created_at_idx
  on public.dglide_case_study_leads (created_at desc);
