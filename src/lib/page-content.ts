/**
 * Page content CMS layer.
 *
 * All page content is stored in Supabase page_blocks table as JSONB.
 * Each page has a page_slug and each section has a block_key.
 * If a block is missing from the DB, the hardcoded default below is used.
 * This ensures the site never breaks if the DB is unavailable.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CtaButton = { label: string; href: string };
export type ListItem = { title: string; desc: string };

export type HeroBlock = {
  label: string;
  heading: string;
  rotating_texts?: string[];
  subheading: string;
  subheading_2?: string;
  cta_primary: CtaButton;
  cta_secondary?: CtaButton;
  image_src?: string;
  image_alt?: string;
};

export type QuoteBlock = { text: string };

export type RichTextBlock = {
  heading: string;
  paragraphs: string[];
};

export type CtaBlock = {
  label?: string;
  heading: string;
  body: string;
  button: CtaButton;
};

export type ServiceListBlock = {
  title: string;
  intro: string;
  items: ListItem[];
  image_src?: string;
  image_alt?: string;
  cta: CtaButton;
  note?: string;
};

export type BulletCardBlock = {
  label: string;
  heading: string;
  items: string[];
};

export type AssetFocusBlock = {
  label: string;
  body: string;
};

export type WhyUsBlock = {
  heading: string;
  bullets: string[];
  bold_statement: string;
  body: string;
  cta_primary: CtaButton;
  cta_secondary: CtaButton;
};

export type CardsBlock = {
  heading: string;
  intro?: string;
  cards: { title: string; desc: string }[];
};

export type TableBlock = {
  heading: string;
  intro: string;
  headers: string[];
  rows: string[][];
  footer_note?: string;
};

export type PageBlock =
  | HeroBlock
  | QuoteBlock
  | RichTextBlock
  | CtaBlock
  | ServiceListBlock
  | BulletCardBlock
  | AssetFocusBlock
  | WhyUsBlock
  | CardsBlock
  | TableBlock;

export type PageContentMap = Record<string, PageBlock>;

// ---------------------------------------------------------------------------
// Hardcoded defaults (current page content — used as fallback)
// ---------------------------------------------------------------------------

const PAGE_DEFAULTS: Record<string, PageContentMap> = {
  home: {
    hero: {
      label: "",
      heading: "Institutional-grade due diligence",
      rotating_texts: ["Content Websites", "SaaS", "Youtube Channel", "Newsletter"],
      subheading: "The missing layer between online business marketplaces and M&A firms.",
      subheading_2: "Big-deal standards, built for small acquisitions.",
      cta_primary: { label: "I'm buying a business", href: "#offer-for-the-buyer" },
      cta_secondary: { label: "I'm selling a business", href: "/seller-form" },
      image_src: "/images/hero-listings.png",
      image_alt: "E-commerce and SaaS business listings with buy buttons",
    } satisfies HeroBlock,

    quote: {
      text: "Most sub-$100K online acquisitions don't need heavy legal frameworks—they need fast risk assessment, clean handover, and execution support. That's our focus.",
    } satisfies QuoteBlock,

    clarity_cta: {
      label: "Clarity Call",
      heading: "First time buying an online business? Start here.",
      body: "Buying or selling a digital asset can feel overwhelming. In a 1-on-1 Clarity Call, we'll evaluate your goals, review your investor profile, and outline the right acquisition strategy for you.",
      button: { label: "Book Your Clarity Call", href: "/clarity-call" },
    } satisfies CtaBlock,

    buyer_side: {
      title: "BUYER-SIDE",
      intro: "Buy your first (or next) online business without the expensive lesson. We find the red flags marketplaces ignore and brokers hide.",
      items: [
        { title: "Buyer fit assessment", desc: "Ensuring the deal matches your capital, skills, and risk tolerance" },
        { title: "Deal review & due diligence", desc: "Filter bad deals fast: sanity checks, red flags, and risk assessment" },
        { title: "Tech stack & traffic", desc: "Scalability, automation potential, and ease of delegation post-acquisition" },
        { title: "P&L & valuation", desc: "Monetization quality, margins, and owner dependency" },
        { title: "Post-acquisition operations & scaling", desc: "What breaks, what to fix first, and where to focus" },
        { title: "Deal sourcing", desc: "Access to private and off-market opportunities" },
      ],
      image_src: "/images/due-diligence-report.png",
      image_alt: "Comprehensive due diligence report showing SEO, P&L, MRR, and tech stack analysis",
      cta: { label: "BUYER SERVICES", href: "/due-diligence" },
    } satisfies ServiceListBlock,

    seller_side: {
      title: "SELLER-SIDE",
      intro: "",
      items: [
        { title: "Listing optimization", desc: "Helping serious buyers see the real opportunity faster" },
        { title: "Listing readiness audit", desc: "Fixing documentation gaps that scare off buyers" },
        { title: "Pre-sale fixes", desc: "Quick wins to improve multiples before listing" },
        { title: "Pre-exit scaling", desc: "Mentorship to grow, structure, and scale your digital asset for an eventual exit" },
        { title: "Strategic buyers", desc: "Access to strategic buyers paying higher multiples" },
        { title: "Network access (with conditions)*", desc: "Anonymous introductions to qualified buyers in our network who are actively searching" },
      ],
      image_src: "/images/seller-services.png",
      image_alt: "Comprehensive seller services: documentation audit, pre-exit scaling, listing readiness, strategic buyer access",
      cta: { label: "SELLER SERVICES", href: "/seller-form" },
      note: "Selective introductions — We only introduce a limited number of businesses that pass our in-depth screening and meet our investment criteria.",
    } satisfies ServiceListBlock,

    asset_focus: {
      label: "What we focus on",
      body: "We focus on assets with low to medium operational complexity that are easy to automate & scale:",
    } satisfies AssetFocusBlock,

    buyers_scenario: {
      label: "For buyers",
      heading: "When BUYERS usually come to us",
      items: [
        "First-time buyers who need expert assistance through the process",
        "You've found a \"perfect\" deal on a marketplace, but the numbers look a little too clean",
        "You're tired of losing good deals to faster buyers because you're stuck in analysis paralysis and need expert help",
        "You have found a good deal but are not sure how to grow it",
        "You want an institutional-grade deal dissection before wiring the money",
      ],
    } satisfies BulletCardBlock,

    sellers_scenario: {
      label: "For sellers",
      heading: "When SELLERS usually come to us",
      items: [
        "You want to sell in the next 6–18 months and need a clear pre-exit plan",
        "You're worried hidden risks or weak documentation will kill deals during diligence",
        "You're open to strategic buyers but don't know how to position the business for them",
        "You've tried listing before but deals died in diligence and you don't know why",
      ],
    } satisfies BulletCardBlock,

    why_us: {
      heading: "Why us?",
      bullets: [
        "Brokers work for sellers",
        "M&A firms won't touch deals under $1M and charge five-figure fees",
        "First-time buyers are left alone with spreadsheets and risk",
      ],
      bold_statement: "M&A firms, marketplaces, and brokers want you to buy a deal. At Acquire To Scale, we want you to buy a deal that scales.",
      body: "At Acquire To Scale, we don't just read spreadsheets; we've built, scaled, and exited the same assets you're buying. We offer clarity, confidence, and a roadmap for growth.",
      cta_primary: { label: "Due Diligence", href: "/due-diligence" },
      cta_secondary: { label: "Get a Deal Reviewed", href: "/buyer-form" },
    } satisfies WhyUsBlock,
  },

  about: {
    hero: {
      label: "About",
      heading: "About Acquire To Scale",
      subheading: "",
      cta_primary: { label: "", href: "" },
    } satisfies HeroBlock,

    mission: {
      heading: "Our Mission: Empowering Confident Acquisitions in the Digital Age",
      paragraphs: [
        "The acquisition ecosystem is often designed for large transactions, where M&A firms, lawyers, and complex financial institutions are necessary. This infrastructure makes sense when millions are at stake. However, for online businesses under $100K, that same elaborate framework becomes friction, not protection.",
        "Most sub-$100K deals don't fail due to complex legal structures; they fail because buyers misjudge risk, overpay, or fundamentally misunderstand the asset they are acquiring. What these deals truly need isn't more paperwork, but rather clear, practical risk assessment and a smooth transition plan.",
        "At Acquire To Scale, our mission is to democratize institutional-grade due diligence for online business acquisitions under $100K. We believe that every aspiring entrepreneur and seasoned investor deserves the clarity, confidence, and strategic roadmap needed to make informed buying decisions and build a truly scalable portfolio.",
      ],
    } satisfies RichTextBlock,

    comparison_table: {
      heading: "Why Traditional M&A Fails Sub-$100K Deals",
      intro: "Traditional advisory services are ill-equipped for the unique dynamics of smaller online business acquisitions. Here's how Acquire To Scale offers a tailored, effective alternative:",
      headers: ["Component", "Traditional M&A Firm", "DIY / Unassisted", "Acquire To Scale (<$100k)"],
      rows: [
        ["Minimum Deal Size", "$100K+", "N/A", "Under $100K"],
        ["Advisory Fees", "$10K – $125K+", "$0", "Flat, Performance-Based"],
        ["Due Diligence", "Institutional / Slow", "Surface-level / Guessed", "Practical / Operational"],
        ["Timeline", "1 – 3 Months", "Instant (High Risk)", "2 – 7 Days"],
        ["Main Risk Source", "Financing & Structure", "Scams & Bad Assets", "Mitigated Risk & Growth"],
        ["Post-Purchase", "Hands-off", '"Figure it out"', "30-Day Transition Plan"],
      ],
      footer_note: "Costs vary, figures shown are indicative. At smaller deal sizes, risk isn't legal — it's operational. If you're buying a $50K online business, spending $40K on advisors doesn't reduce risk — it just shifts it.",
    } satisfies TableBlock,

    philosophy: {
      heading: "Our Philosophy: Operators for Operators",
      paragraphs: [
        "We are not just advisors; we are operators. Our team understands the nuances of running and scaling online businesses because we've been in your shoes. This deep, practical experience informs every aspect of our service, from spotting subtle red flags that others miss to identifying overlooked opportunities for post-acquisition growth.",
        "We believe that a successful acquisition isn't just about buying a good deal—it's about acquiring an asset that scales. Our commitment is to provide you with the strategic foresight and actionable intelligence to transform your acquisition into a thriving, automated, and scalable venture.",
      ],
    } satisfies RichTextBlock,

    why_choose: {
      heading: "Why Choose Acquire To Scale?",
      cards: [
        { title: "Operator-Led Expertise", desc: "Benefit from real-world experience in building, growing, and exiting digital businesses." },
        { title: "Unbiased Due Diligence", desc: "We work exclusively for buyers, ensuring our analysis is focused solely on your best interests." },
        { title: "Focus on Scalability", desc: "Our insights go beyond initial profitability, guiding you toward assets with long-term growth potential." },
        { title: "Personalized Support", desc: "From initial review to post-acquisition strategy, we are your trusted partner in the acquisition journey." },
      ],
    } satisfies CardsBlock,

    clarity_cta: {
      label: "Clarity Call",
      heading: "First time buying an online business? Start here.",
      body: "Buying or selling a digital asset can feel overwhelming. In a 1-on-1 Clarity Call, we'll evaluate your goals, review your investor profile, and outline the right acquisition strategy for you.",
      button: { label: "Book Your Clarity Call", href: "/clarity-call" },
    } satisfies CtaBlock,
  },

  "for-buyers": {
    hero: {
      label: "Due Diligence",
      heading: "Your Path to Confident Online Business Acquisition",
      subheading: "We review the assets that 99% of buyers skip. Our due diligence reports go deep on traffic, revenue quality, technical health, and scalability.",
      cta_primary: { label: "", href: "" },
    } satisfies HeroBlock,

    deal_sourcing: {
      heading: "Deal Sourcing & Private Deals Vault",
      paragraphs: [
        "Access exclusive off-market deals and vetted opportunities before they hit public marketplaces. Our private vault gives you a first-mover advantage on the best acquisitions.",
      ],
    } satisfies RichTextBlock,

    cta: {
      label: "",
      heading: "Ready to start?",
      body: "Book a call with our team and let's find the right acquisition strategy for you.",
      button: { label: "Book a call", href: "/buyer-form" },
    } satisfies CtaBlock,
  },

  "for-sellers": {
    hero: {
      label: "Sell your business",
      heading: "Sell your business",
      subheading: "We help online business owners sell smarter — better documentation, better buyers, better multiples.",
      cta_primary: { label: "Submit your business for review", href: "/seller-form" },
    } satisfies HeroBlock,
  },

  "for-scalers": {
    hero: {
      label: "For Scalers",
      heading: "Scaling Advisory & Mentorship",
      subheading: "Strategic guidance on what breaks, what to fix first, and where to focus for rapid post-acquisition growth.",
      cta_primary: { label: "Get in touch", href: "/contact" },
    } satisfies HeroBlock,

    content: {
      heading: "",
      paragraphs: [
        "You've acquired an online business — now comes the hard part. Most buyers underestimate the operational complexity that emerges after the handover. Systems break, traffic fluctuates, and the seller's \"easy\" business suddenly feels anything but.",
        "Our Scaling Advisory service pairs you with operators who have been exactly where you are. We help you stabilize, then systematically grow your acquisition into a portfolio-worthy asset.",
      ],
    } satisfies RichTextBlock,
  },
};

// ---------------------------------------------------------------------------
// Fetch helpers
// ---------------------------------------------------------------------------

/**
 * Fetch all blocks for a page from Supabase, merged with defaults.
 * Server-side only (uses server Supabase client).
 */
export async function getPageContent(pageSlug: string): Promise<PageContentMap> {
  const defaults = PAGE_DEFAULTS[pageSlug] ?? {};

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return defaults;

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();

    const query = supabase
      .from("page_blocks")
      .select("block_key, content")
      .eq("page_slug", pageSlug)
      .eq("is_visible", true);

    const { data, error } = await Promise.race([
      query,
      new Promise<{ data: null; error: Error }>((resolve) =>
        setTimeout(() => resolve({ data: null, error: new Error("timeout") }), 5000)
      ),
    ]);

    if (error || !data) return defaults;

    const fromDb: PageContentMap = {};
    for (const row of data) {
      fromDb[row.block_key] = row.content as PageBlock;
    }

    // Deep merge: DB values override defaults, but defaults fill missing keys
    const merged: PageContentMap = { ...defaults };
    for (const [key, value] of Object.entries(fromDb)) {
      merged[key] = {
        ...(defaults[key] as Record<string, unknown>),
        ...(value as Record<string, unknown>),
      } as PageBlock;
    }
    return merged;
  } catch {
    return defaults;
  }
}

/**
 * Upsert a single page block (admin only).
 * Returns { error } on failure.
 */
export async function upsertPageBlock(
  pageSlug: string,
  blockKey: string,
  blockType: string,
  content: PageBlock,
  sortOrder = 0
): Promise<{ error: string | null }> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { error: "Supabase not configured" };
  }
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { error } = await supabase.from("page_blocks").upsert(
      {
        page_slug: pageSlug,
        block_key: blockKey,
        block_type: blockType,
        content,
        sort_order: sortOrder,
        is_visible: true,
      },
      { onConflict: "page_slug,block_key" }
    );
    if (error) return { error: error.message };
    return { error: null };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Unknown error" };
  }
}

/**
 * Get the defaults for a page (for admin seed / reset).
 */
export function getPageDefaults(pageSlug: string): PageContentMap {
  return PAGE_DEFAULTS[pageSlug] ?? {};
}

/**
 * List of all editable pages with metadata.
 */
export const EDITABLE_PAGES = [
  { slug: "home", label: "Home", path: "/" },
  { slug: "about", label: "About", path: "/about" },
  { slug: "for-buyers", label: "For Buyers", path: "/due-diligence" },
  { slug: "for-sellers", label: "For Sellers", path: "/sell-your-business" },
  { slug: "for-scalers", label: "For Scalers", path: "/scaling" },
] as const;

export type EditablePageSlug = (typeof EDITABLE_PAGES)[number]["slug"];
