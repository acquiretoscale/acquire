# Acquire To Scale

**www.acquiretoscale.com** — Advisory for digital asset acquisitions ($10K–$250K). Next.js 14+ (App Router), Supabase, Tailwind, MDX blog, SEO-first.

## Features

- **Unified layout**: Header/footer with nav — Home, Services (Buy / Sell / Scale), About, Blog
- **SEO**: Metadata API, `generateMetadata` for blog, sitemap.xml + robots.txt, JSON-LD (Organization, Website, Article)
- **Blog**: Flat URLs (`/blog/post-slug`), MDX with reading time & last updated, SSG
- **Newsletter**: Footer signup linking to [Substack](https://acquiretoscale.substack.com/)
- **Admin**: Protected `/admin` with Supabase Auth. **Rich text editor** (Tiptap) for posts: bubble menu (Bold, Italic, Link, H1, H2), slash commands (Image, lists, blockquote, code), image upload to Supabase Storage, auto-save, and a **Post Settings** sidebar (slug, meta description, featured image, tags).

## Setup

```bash
# Install dependencies (includes Supabase)
npm install

# Run dev server
npm run dev

# Build
npm run build
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase (Admin & optional blog storage)

1. Create a project at [supabase.com](https://supabase.com).
2. Copy **Project URL** and **anon public** key into `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. In Supabase **SQL Editor**, run the SQL files **in this order** (copy-paste each file’s contents and run):
   - `supabase/schema.sql` — blog_posts table and RLS
   - `supabase/migrations/002_blog_editor.sql` — tags column, `blog-images` storage bucket
   - `supabase/migrations/003_blog_status.sql` — status column (draft/published)
   - `supabase/migrations/004_site_settings_seo.sql` — site_settings table (SEO, GA4, etc.)
   - `supabase/migrations/005_blog_featured.sql` — featured flag for posts
   - `supabase/migrations/006_site_settings_tracking_seo.sql` — GTM, pixels, meta overrides
   - `supabase/migrations/007_form_submissions.sql` — buyer_form_submissions, seller_form_submissions
   If the storage bucket in 002 fails, create a **public** bucket named `blog-images` in Dashboard → Storage.
4. In **Authentication → Users**, create a user (e.g. email + password) to sign in at `/admin/login`.

With this setup, **articles** (blog posts) and **SEO settings** are stored in Supabase; **buyer** and **seller** form submissions are saved to `buyer_form_submissions` and `seller_form_submissions` (and still emailed via Resend). Admin users are managed by Supabase Auth.

Without Supabase, the site and blog (from local MDX) still work; only `/admin` and form persistence will be limited.

## Blog content

- **Local MDX**: Add `.md` or `.mdx` files under `content/blog/` with frontmatter: `title`, `slug`, `description`, `date`, optional `updated`, `featuredImage`. The home blog list and post pages use these for SSG.
- **Admin-created posts**: Created via `/admin` are stored in Supabase. To show them on the blog, you can later extend `src/lib/blog.ts` to merge or prefer Supabase rows.

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, JSON-LD (Organization + Website)
│   ├── page.tsx            # Home
│   ├── services/            # Buy · Sell · Scale
│   ├── about/
│   ├── contact/
│   ├── blog/
│   │   ├── page.tsx        # Blog list (from content/blog + reading time)
│   │   └── [slug]/page.tsx  # Post page, MDX, Article JSON-LD
│   ├── admin/              # Protected
│   │   ├── login/
│   │   ├── posts/new       # Create post form
│   │   └── posts/[id]/edit # Edit post form
│   ├── sitemap.ts          # Static + blog slugs
│   └── robots.ts            # Allow /, disallow /api/, /admin/
├── components/             # Header, Footer, NewsletterSignup, MobileMenu
├── lib/
│   ├── site.ts             # Site config, nav, schema
│   ├── blog.ts             # MDX reading, reading time, Article schema
│   └── supabase/           # Browser + server clients
content/blog/               # Local MDX posts
supabase/schema.sql         # blog_posts table + RLS (run in dashboard)
```

## Design

- **Brand**: Operator-advisor, premium but practical. Slate/navy + emerald accent, Geist typography.
- **Semantic HTML**: `<article>`, `<section>`, `<nav>` where appropriate. Images use `next/image` where used.

## Deployment (Vercel)

1. Push to GitHub and import in Vercel.
2. Add env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Deploy. Run Lighthouse for Core Web Vitals (aim for 100/100).
