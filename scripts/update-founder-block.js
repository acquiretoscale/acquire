#!/usr/bin/env node
/**
 * One-off: upsert the about/founder block with Adil's content.
 * Requires SUPABASE_DB_URL in .env.local.
 */
require("dotenv").config({ path: ".env.local" });
const { Client } = require("pg");

const content = {
  name: "Adil Maf",
  title: "Founder & Business architect",
  bio: "Adil is a **serial entrepreneur and investor**, and a board member of multiple seven-figure businesses. He brings real-world experience building, growing, and exiting digital companies.\n\nHe has mentored over 2,000 entrepreneurs across 60+ countries ([testimonials](https://adilmaf.com/testimonials)), and built across platforms a global audience of 40,000+ subscribers, where he shares tactical frameworks for online business growth.\n\nHis approach to due diligence is **operator-led** — the same framework he uses when evaluating deals for himself and his consulting clients.\n\nThrough Acquire To Scale, his mission is to provide the institutional-grade due diligence he wished he had when he began his own acquisition journey in 2011.",
  image_src: "",
  image_alt: "Adil Maf, Founder of Acquire To Scale",
  social: {
    instagram: "https://instagram.com/adil.maf",
    youtube: "https://www.youtube.com/adilmaf",
    substack: "https://acquiretoscale.substack.com",
    linkedin: "",
    twitter: "",
    website: "",
  },
};

const url = process.env.SUPABASE_DB_URL;
if (!url) {
  console.log("SUPABASE_DB_URL not set in .env.local. Founder content is in code defaults; run seed or set DB URL and run: node scripts/update-founder-block.js");
  process.exit(0);
}

const client = new Client({ connectionString: url, ssl: { rejectUnauthorized: false } });

client
  .connect()
  .then(() =>
    client.query(
      `INSERT INTO page_blocks (page_slug, block_key, block_type, content, sort_order, is_visible)
       VALUES ('about', 'founder', 'founder', $1::jsonb, 6, true)
       ON CONFLICT (page_slug, block_key) DO UPDATE SET content = $1::jsonb, block_type = 'founder', sort_order = 6`,
      [JSON.stringify(content)]
    )
  )
  .then(() => {
    console.log("Founder block updated in database.");
    return client.end();
  })
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
