-- Tags for blog posts (multi-select in editor)
alter table public.blog_posts
  add column if not exists tags text[] default '{}';

-- Storage bucket for editor images (run in Supabase Dashboard → Storage if needed)
-- Bucket name: blog-images
-- Public: yes (so we can use public URLs in content)

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog-images',
  'blog-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
on conflict (id) do update set
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

-- Allow authenticated users (admin) to upload
create policy "Authenticated can upload blog images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'blog-images');

-- Allow public read (already public bucket, this makes objects readable)
create policy "Public read blog images"
  on storage.objects for select
  to public
  using (bucket_id = 'blog-images');

-- Allow authenticated to update/delete their uploads
create policy "Authenticated can update blog images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'blog-images');

create policy "Authenticated can delete blog images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'blog-images');
