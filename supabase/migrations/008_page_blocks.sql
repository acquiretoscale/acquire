-- Page content blocks table for CMS
-- Each row is one editable section of a page

CREATE TABLE IF NOT EXISTS page_blocks (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug   text NOT NULL,
  block_key   text NOT NULL,
  block_type  text NOT NULL CHECK (block_type IN ('hero','rich_text','list','cta','cards','table','quote','partner_logos','featured_articles')),
  content     jsonb NOT NULL DEFAULT '{}',
  sort_order  int DEFAULT 0,
  is_visible  boolean DEFAULT true,
  updated_at  timestamptz DEFAULT now(),
  UNIQUE (page_slug, block_key)
);

CREATE OR REPLACE FUNCTION update_page_blocks_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER page_blocks_updated_at
  BEFORE UPDATE ON page_blocks
  FOR EACH ROW EXECUTE FUNCTION update_page_blocks_updated_at();

ALTER TABLE page_blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "page_blocks_public_read"
  ON page_blocks FOR SELECT USING (true);

CREATE POLICY "page_blocks_auth_write"
  ON page_blocks FOR ALL USING (auth.role() = 'authenticated');

-- Supabase Storage bucket for page images (run separately in Supabase dashboard if needed)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('page-images', 'page-images', true) ON CONFLICT DO NOTHING;
