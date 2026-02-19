-- Add a status column to blog_posts (draft / published)
alter table public.blog_posts
  add column if not exists status text not null default 'published';

-- Index for filtering by status
create index if not exists blog_posts_status_idx on public.blog_posts (status);

-- Update RLS: public can only read published posts
drop policy if exists "Public can read blog posts" on public.blog_posts;
create policy "Public can read published blog posts"
  on public.blog_posts for select
  using (status = 'published' or auth.role() = 'authenticated');
