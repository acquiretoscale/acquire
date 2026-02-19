-- Buyer and seller form submissions (stored in Supabase; API uses anon key to insert)
-- Run after schema.sql and other migrations (002–006).

-- Buyer form submissions
create table if not exists public.buyer_form_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  email text,
  linkedin text,
  how_can_we_help text,
  primary_asset text,
  primary_asset_other text,
  target_budget text,
  deal_url text,
  how_found text,
  stage text,
  service_needed text,
  created_at timestamptz not null default now()
);

create index if not exists buyer_form_submissions_created_at_idx on public.buyer_form_submissions (created_at desc);

alter table public.buyer_form_submissions enable row level security;

-- Allow anonymous insert (form submission from site; API uses anon key)
create policy "Anon can insert buyer form"
  on public.buyer_form_submissions for insert
  to anon
  with check (true);

-- Only authenticated (admin) can read
create policy "Authenticated can read buyer form submissions"
  on public.buyer_form_submissions for select
  to authenticated
  using (true);

-- Seller form submissions
create table if not exists public.seller_form_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  email text,
  linkedin text,
  asset_url text,
  primary_asset text,
  primary_asset_other text,
  project_age text,
  avg_monthly_profit text,
  planning_to_sell text,
  help_with text[],
  additional_details text,
  created_at timestamptz not null default now()
);

create index if not exists seller_form_submissions_created_at_idx on public.seller_form_submissions (created_at desc);

alter table public.seller_form_submissions enable row level security;

create policy "Anon can insert seller form"
  on public.seller_form_submissions for insert
  to anon
  with check (true);

create policy "Authenticated can read seller form submissions"
  on public.seller_form_submissions for select
  to authenticated
  using (true);
