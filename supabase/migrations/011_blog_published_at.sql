-- Add published_at so authors can control the display date
alter table public.blog_posts
  add column if not exists published_at timestamptz default now();

-- Backfill: set published_at = created_at for existing rows
update public.blog_posts set published_at = created_at where published_at is null;
