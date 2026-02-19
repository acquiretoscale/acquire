-- Acquire To Scale: Blog posts table and Auth policies
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)

-- Blog posts table (for admin-created content)
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content text not null,
  meta_description text,
  featured_image text,
  status text not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for fast slug lookups and listing
create index if not exists blog_posts_slug_idx on public.blog_posts (slug);
create index if not exists blog_posts_created_at_idx on public.blog_posts (created_at desc);

-- RLS: allow public read for blog posts (so the site can show them)
alter table public.blog_posts enable row level security;

create policy "Public can read blog posts"
  on public.blog_posts for select
  using (true);

-- Only authenticated users (admin) can insert/update/delete
create policy "Authenticated users can insert blog posts"
  on public.blog_posts for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update blog posts"
  on public.blog_posts for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete blog posts"
  on public.blog_posts for delete
  to authenticated
  using (true);

-- Optional: trigger to keep updated_at in sync
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists blog_posts_updated_at on public.blog_posts;
create trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

-- SEO / site settings (GA4, GSC, Bing, AI): see migrations/004_site_settings_seo.sql
