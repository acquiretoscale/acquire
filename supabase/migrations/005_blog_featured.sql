-- Add featured column to blog_posts for homepage display
alter table public.blog_posts
  add column if not exists featured boolean not null default false;

create index if not exists blog_posts_featured_idx on public.blog_posts (featured) where featured = true;
