-- Extend site_settings for ads, pixels, GTM, and SEO overrides
alter table public.site_settings
  add column if not exists gtm_container_id text,
  add column if not exists facebook_pixel_id text,
  add column if not exists tiktok_pixel_id text,
  add column if not exists google_ads_conversion_id text,
  add column if not exists google_ads_conversion_label text,
  add column if not exists meta_title_override text,
  add column if not exists meta_description_override text;

-- Ensure Public can read new columns (select policy already allows true)
-- No change needed; existing policies apply to new columns
