-- Add custom_head_scripts column for pasting raw Google tags or other tracking snippets
alter table public.site_settings
  add column if not exists custom_head_scripts text;
