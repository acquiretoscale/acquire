-- Add author fields to blog posts
alter table public.blog_posts
  add column if not exists author_name text,
  add column if not exists author_bio  text,
  add column if not exists author_image text;
