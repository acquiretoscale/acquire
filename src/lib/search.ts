import { getAllPosts } from "@/lib/blog";
import { getAllSupabasePosts } from "@/lib/supabase-blog";
import { ASSET_TYPES } from "@/lib/due-diligence";

export type SearchResult = {
  href: string;
  title: string;
  type: "page" | "blog";
  description?: string | null;
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

function matchesQuery(text: string, q: string): boolean {
  const n = normalize(text);
  const terms = normalize(q).split(/\s+/).filter(Boolean);
  return terms.length === 0 || terms.every((term) => n.includes(term));
}

function buildStaticPages(): SearchResult[] {
  const pages: SearchResult[] = [
    { href: "/", title: "Home", type: "page", description: "Acquire To Scale – due diligence for small deals." },
    { href: "/about", title: "About", type: "page", description: "Learn about Acquire To Scale." },
    { href: "/blog", title: "Blog", type: "page", description: "Articles and insights on buying and scaling digital assets." },
    { href: "/contact", title: "Contact", type: "page", description: "Get in touch for due diligence and advisory." },
    { href: "/due-diligence", title: "Due Diligence", type: "page", description: "Operator-led due diligence by asset type, deal sourcing, and clarity calls." },
    { href: "/who-its-for", title: "Who It's For", type: "page", description: "Who we help – first-time buyers and serial acquirers." },
    { href: "/seller-form", title: "Sell Your Business", type: "page", description: "Submit your profitable digital business for review. We review a limited number of assets for acquisition or introduction to buyers." },
    { href: "/clarity-call", title: "Clarity Call", type: "page", description: "A high-level discussion for buyers or sellers. Surface-level review, positioning, and next steps. Book a call." },
    { href: "/scaling", title: "Scaling Advisory & Mentorship", type: "page", description: "Strategic guidance on what breaks, what to fix first, and where to focus for rapid post-acquisition growth." },
    { href: "/global-operations", title: "Global Operations & Infrastructure", type: "page", description: "Offshore incorporation & tax optimization, expert banking and payment processing for high-volume merchant accounts." },
    { href: "/privacy", title: "Privacy Policy", type: "page", description: "Privacy Policy for Acquire To Scale." },
    { href: "/terms", title: "Terms of Use", type: "page", description: "Terms of Use for Acquire To Scale." },
    { href: "/modern-slavery-act", title: "Modern Slavery Act", type: "page", description: "Modern Slavery Act statement." },
    { href: "/cookie-policy", title: "Cookie Policy", type: "page", description: "Cookie Policy for Acquire To Scale." },
    { href: "/career", title: "Career", type: "page", description: "Careers at Acquire To Scale." },
  ];
  ASSET_TYPES.forEach((asset) => {
    pages.push({
      href: `/due-diligence/${asset.slug}`,
      title: asset.title,
      type: "page",
      description: asset.description,
    });
  });
  return pages;
}

export async function searchSite(query: string): Promise<SearchResult[]> {
  const q = (query || "").trim();
  if (q.length < 2) return [];

  const results: SearchResult[] = [];

  // Static pages
  const staticPages = buildStaticPages();
  for (const page of staticPages) {
    const searchable = [page.title, page.description].filter(Boolean).join(" ");
    if (matchesQuery(searchable, q)) {
      results.push(page);
    }
  }

  // File-based blog posts
  try {
    const filePosts = getAllPosts();
    for (const post of filePosts) {
      const searchable = [post.title, post.description].join(" ");
      if (matchesQuery(searchable, q)) {
        results.push({
          href: `/blog/${post.slug}`,
          title: post.title,
          type: "blog",
          description: post.description || null,
        });
      }
    }
  } catch {
    // ignore
  }

  // Supabase blog posts
  try {
    const supabasePosts = await getAllSupabasePosts();
    for (const post of supabasePosts) {
      const searchable = [post.title, post.meta_description].filter(Boolean).join(" ");
      if (matchesQuery(searchable, q)) {
        results.push({
          href: `/blog/${post.slug}`,
          title: post.title,
          type: "blog",
          description: post.meta_description ?? null,
        });
      }
    }
  } catch {
    // ignore
  }

  // Dedupe by href (file and Supabase might both have a slug)
  const seen = new Set<string>();
  return results.filter((r) => {
    if (seen.has(r.href)) return false;
    seen.add(r.href);
    return true;
  });
}
