#!/usr/bin/env node
/**
 * Run Supabase SQL migrations in order.
 * Requires SUPABASE_DB_URL in .env.local (Session mode URI from Supabase → Project Settings → Database).
 */
const { readFileSync } = require("fs");
const { join } = require("path");
const { Client } = require("pg");
const path = require("path");

// Load .env.local
function loadEnvLocal() {
  const envPath = join(process.cwd(), ".env.local");
  try {
    const content = readFileSync(envPath, "utf8");
    for (const line of content.split("\n")) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
      if (m) {
        const key = m[1];
        let val = m[2].trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1).replace(/\\"/g, '"');
        else if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1).replace(/\\'/g, "'");
        process.env[key] = val;
      }
    }
  } catch (e) {
    if (e.code !== "ENOENT") throw e;
  }
}

loadEnvLocal();

const SUPABASE_DB_URL = process.env.SUPABASE_DB_URL;
if (!SUPABASE_DB_URL) {
  console.error("Missing SUPABASE_DB_URL. Add it to .env.local (Supabase → Project Settings → Database → Connection string, URI).");
  process.exit(1);
}

const migrationsDir = join(process.cwd(), "supabase");
const order = [
  join(migrationsDir, "schema.sql"),
  join(migrationsDir, "migrations", "002_blog_editor.sql"),
  join(migrationsDir, "migrations", "003_blog_status.sql"),
  join(migrationsDir, "migrations", "004_site_settings_seo.sql"),
  join(migrationsDir, "migrations", "005_blog_featured.sql"),
  join(migrationsDir, "migrations", "006_site_settings_tracking_seo.sql"),
  join(migrationsDir, "migrations", "007_form_submissions.sql"),
  join(migrationsDir, "migrations", "008_page_blocks.sql"),
];

async function run() {
  const client = new Client({ connectionString: SUPABASE_DB_URL });
  try {
    await client.connect();
    for (const file of order) {
      const name = path.basename(file);
      const sql = readFileSync(file, "utf8");
      await client.query(sql);
      console.log("OK:", name);
    }
    console.log("All migrations finished.");
  } catch (err) {
    console.error("Migration failed:", err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
