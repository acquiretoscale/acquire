-- Single-row site settings for SEO (GA4, GSC, Bing, AI optimization)
create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  -- Google Analytics 4
  ga4_measurement_id text,
  -- Google Search Console: meta content value (e.g. from verification HTML tag)
  google_site_verification text,
  -- Bing Webmaster: meta content value
  bing_site_verification text,
  -- AI / LLM crawler optimization
  ai_optimization_enabled boolean not null default true,
  allow_ai_training boolean not null default true,
  updated_at timestamptz not null default now()
);

-- Ensure single row (id = constant)
insert into public.site_settings (id, ga4_measurement_id, google_site_verification, bing_site_verification, ai_optimization_enabled, allow_ai_training)
values (
  '00000000-0000-0000-0000-000000000001'::uuid,
  null,
  null,
  null,
  true,
  true
)
on conflict (id) do nothing;

alter table public.site_settings enable row level security;

-- Public read for layout (only non-secret fields; verification strings are public)
create policy "Public can read site settings"
  on public.site_settings for select
  using (true);

-- Only authenticated can update
create policy "Authenticated can update site settings"
  on public.site_settings for update
  to authenticated
  using (true)
  with check (true);
