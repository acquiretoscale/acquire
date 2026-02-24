#!/usr/bin/env node
/**
 * Seed the page_blocks table with current page content defaults.
 * Safe to run multiple times (uses upsert).
 */
const { Client } = require("pg");

const SEED_BLOCKS = [
  // ─── HOME PAGE ───────────────────────────────────────────────────────────
  {
    page_slug: "home", block_key: "hero", block_type: "hero", sort_order: 0,
    content: {
      label: "",
      heading: "Institutional-grade due diligence",
      rotating_texts: ["Content Websites", "SaaS", "Youtube Channel", "Newsletter"],
      subheading: "The missing layer between online business marketplaces and M&A firms.",
      subheading_2: "Big-deal standards, built for small acquisitions.",
      cta_primary: { label: "I'm buying a business", href: "#offer-for-the-buyer" },
      cta_secondary: { label: "I'm selling a business", href: "/seller-form" },
      image_src: "/images/hero-listings.png",
      image_alt: "E-commerce and SaaS business listings with buy buttons",
    }
  },
  {
    page_slug: "home", block_key: "quote", block_type: "quote", sort_order: 1,
    content: {
      text: "Most sub-$100K online acquisitions don't need heavy legal frameworks—they need fast risk assessment, clean handover, and execution support. That's our focus.",
    }
  },
  {
    page_slug: "home", block_key: "clarity_cta", block_type: "cta", sort_order: 2,
    content: {
      label: "Clarity Call",
      heading: "First time buying an online business? Start here.",
      body: "Buying or selling a digital asset can feel overwhelming. In a 1-on-1 Clarity Call, we'll evaluate your goals, review your investor profile, and outline the right acquisition strategy for you.",
      button: { label: "Book Your Clarity Call", href: "/clarity-call" },
    }
  },
  {
    page_slug: "home", block_key: "buyer_side", block_type: "list", sort_order: 3,
    content: {
      title: "Founder title: "BUYER-SIDE" Business architect",
      intro: "Buy your first (or next) online business without the expensive lesson. We find the red flags marketplaces ignore and brokers hide.",
      items: [
        { title: "Founder title: "Buyer fit assessment" Business architect", desc: "Ensuring the deal matches your capital, skills, and risk tolerance" },
        { title: "Founder title: "Deal review & due diligence" Business architect", desc: "Filter bad deals fast: sanity checks, red flags, and risk assessment" },
        { title: "Founder title: "Tech stack & traffic" Business architect", desc: "Scalability, automation potential, and ease of delegation post-acquisition" },
        { title: "Founder title: "P&L & valuation" Business architect", desc: "Monetization quality, margins, and owner dependency" },
        { title: "Founder title: "Post-acquisition operations & scaling" Business architect", desc: "What breaks, what to fix first, and where to focus" },
        { title: "Founder title: "Deal sourcing" Business architect", desc: "Access to private and off-market opportunities" },
      ],
      image_src: "/images/due-diligence-report.png",
      image_alt: "Comprehensive due diligence report showing SEO, P&L, MRR, and tech stack analysis",
      cta: { label: "BUYER SERVICES", href: "/due-diligence" },
    }
  },
  {
    page_slug: "home", block_key: "seller_side", block_type: "list", sort_order: 4,
    content: {
      title: "Founder title: "SELLER-SIDE" Business architect",
      intro: "",
      items: [
        { title: "Founder title: "Listing optimization" Business architect", desc: "Helping serious buyers see the real opportunity faster" },
        { title: "Founder title: "Listing readiness audit" Business architect", desc: "Fixing documentation gaps that scare off buyers" },
        { title: "Founder title: "Pre-sale fixes" Business architect", desc: "Quick wins to improve multiples before listing" },
        { title: "Founder title: "Pre-exit scaling" Business architect", desc: "Mentorship to grow, structure, and scale your digital asset for an eventual exit" },
        { title: "Founder title: "Strategic buyers" Business architect", desc: "Access to strategic buyers paying higher multiples" },
        { title: "Founder title: "Network access (with conditions)*" Business architect", desc: "Anonymous introductions to qualified buyers in our network who are actively searching" },
      ],
      image_src: "/images/seller-services.png",
      image_alt: "Comprehensive seller services: documentation audit, pre-exit scaling, listing readiness, strategic buyer access",
      cta: { label: "SELLER SERVICES", href: "/seller-form" },
      note: "Selective introductions — We only introduce a limited number of businesses that pass our in-depth screening and meet our investment criteria.",
    }
  },
  {
    page_slug: "home", block_key: "asset_focus", block_type: "rich_text", sort_order: 5,
    content: {
      label: "What we focus on",
      body: "We focus on assets with low to medium operational complexity that are easy to automate & scale:",
    }
  },
  {
    page_slug: "home", block_key: "buyers_scenario", block_type: "list", sort_order: 6,
    content: {
      label: "For buyers",
      heading: "When BUYERS usually come to us",
      items: [
        "First-time buyers who need expert assistance through the process",
        "You've found a \"perfect\" deal on a marketplace, but the numbers look a little too clean",
        "You're tired of losing good deals to faster buyers because you're stuck in analysis paralysis and need expert help",
        "You have found a good deal but are not sure how to grow it",
        "You want an institutional-grade deal dissection before wiring the money",
      ],
    }
  },
  {
    page_slug: "home", block_key: "sellers_scenario", block_type: "list", sort_order: 7,
    content: {
      label: "For sellers",
      heading: "When SELLERS usually come to us",
      items: [
        "You want to sell in the next 6–18 months and need a clear pre-exit plan",
        "You're worried hidden risks or weak documentation will kill deals during diligence",
        "You're open to strategic buyers but don't know how to position the business for them",
        "You've tried listing before but deals died in diligence and you don't know why",
      ],
    }
  },
  {
    page_slug: "home", block_key: "why_us", block_type: "rich_text", sort_order: 8,
    content: {
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
    }
  },

  // ─── ABOUT PAGE ──────────────────────────────────────────────────────────
  {
    page_slug: "about", block_key: "hero", block_type: "hero", sort_order: 0,
    content: {
      label: "About",
      heading: "About Acquire To Scale",
      subheading: "",
      cta_primary: { label: "", href: "" },
    }
  },
  {
    page_slug: "about", block_key: "mission", block_type: "rich_text", sort_order: 1,
    content: {
      heading: "Our Mission: Empowering Confident Acquisitions in the Digital Age",
      paragraphs: [
        "The acquisition ecosystem is often designed for large transactions, where M&A firms, lawyers, and complex financial institutions are necessary. This infrastructure makes sense when millions are at stake. However, for smaller online business deals, that same elaborate framework becomes friction, not protection.",
        "Most small deals don't fail due to complex legal structures; they fail because buyers misjudge risk, overpay, or fundamentally misunderstand the asset they are acquiring. What these deals truly need isn't more paperwork, but rather clear, practical risk assessment and a smooth transition plan.",
        "At Acquire To Scale, our mission is to democratize institutional-grade due diligence for small online business acquisitions. We believe that every aspiring entrepreneur and seasoned investor deserves the clarity, confidence, and strategic roadmap needed to make informed buying decisions and build a truly scalable portfolio.",
      ],
    }
  },
  {
    page_slug: "about", block_key: "comparison_table", block_type: "table", sort_order: 2,
    content: {
      heading: "Why Traditional M&A Fails Small Deals",
      intro: "Traditional advisory services are ill-equipped for the unique dynamics of smaller online business acquisitions. Here's how Acquire To Scale offers a tailored, effective alternative:",
      headers: ["Component", "Traditional M&A Firm", "DIY / Unassisted", "Acquire To Scale (Small Deals)"],
      rows: [
        ["Minimum Deal Size", "High six figures+", "N/A", "Small deals"],
        ["Advisory Fees", "$10K – $125K+", "$0", "Flat, Performance-Based"],
        ["Due Diligence", "Institutional / Slow", "Surface-level / Guessed", "Practical / Operational"],
        ["Timeline", "1 – 3 Months", "Instant (High Risk)", "2 – 7 Days"],
        ["Main Risk Source", "Financing & Structure", "Scams & Bad Assets", "Mitigated Risk & Growth"],
        ["Post-Purchase", "Hands-off", '"Figure it out"', "30-Day Transition Plan"],
      ],
      footer_note: "Costs vary, figures shown are indicative. At smaller deal sizes, risk isn't legal — it's operational.",
    }
  },
  {
    page_slug: "about", block_key: "philosophy", block_type: "rich_text", sort_order: 3,
    content: {
      heading: "Our Philosophy: Operators for Operators",
      paragraphs: [
        "We are not just advisors; we are operators. Our team understands the nuances of running and scaling online businesses because we've been in your shoes. This deep, practical experience informs every aspect of our service.",
        "We believe that a successful acquisition isn't just about buying a good deal—it's about acquiring an asset that scales. Our commitment is to provide you with the strategic foresight and actionable intelligence to transform your acquisition into a thriving, automated, and scalable venture.",
      ],
    }
  },
  {
    page_slug: "about", block_key: "why_choose", block_type: "cards", sort_order: 4,
    content: {
      heading: "Why Choose Acquire To Scale?",
      cards: [
        { title: "Founder title: "Operator-Led Expertise" Business architect", desc: "Benefit from real-world experience in building, growing, and exiting digital businesses." },
        { title: "Founder title: "Unbiased Due Diligence" Business architect", desc: "We work exclusively for buyers, ensuring our analysis is focused solely on your best interests." },
        { title: "Founder title: "Focus on Scalability" Business architect", desc: "Our insights go beyond initial profitability, guiding you toward assets with long-term growth potential." },
        { title: "Founder title: "Personalized Support" Business architect", desc: "From initial review to post-acquisition strategy, we are your trusted partner in the acquisition journey." },
      ],
    }
  },
  {
    page_slug: "about", block_key: "clarity_cta", block_type: "cta", sort_order: 5,
    content: {
      label: "Clarity Call",
      heading: "First time buying an online business? Start here.",
      body: "Buying or selling a digital asset can feel overwhelming. In a 1-on-1 Clarity Call, we'll evaluate your goals, review your investor profile, and outline the right acquisition strategy for you.",
      button: { label: "Book Your Clarity Call", href: "/clarity-call" },
    }
  },
  {
    page_slug: "about", block_key: "founder", block_type: "founder", sort_order: 6,
    content: {
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
    }
  },

  // ─── FOR BUYERS (due-diligence) PAGE ─────────────────────────────────────
  {
    page_slug: "for-buyers", block_key: "hero", block_type: "hero", sort_order: 0,
    content: {
      label: "Due Diligence",
      heading: "Your Path to Confident Online Business Acquisition",
      subheading: "We review the assets that 99% of buyers skip. Our due diligence reports go deep on traffic, revenue quality, technical health, and scalability.",
      cta_primary: { label: "", href: "" },
    }
  },
  {
    page_slug: "for-buyers", block_key: "deal_sourcing", block_type: "rich_text", sort_order: 1,
    content: {
      heading: "Deal Sourcing & Private Deals Vault",
      paragraphs: ["Access exclusive off-market deals and vetted opportunities before they hit public marketplaces. Our private vault gives you a first-mover advantage on the best acquisitions."],
    }
  },
  {
    page_slug: "for-buyers", block_key: "cta", block_type: "cta", sort_order: 2,
    content: {
      label: "",
      heading: "Ready to start?",
      body: "Book a call with our team and let's find the right acquisition strategy for you.",
      button: { label: "Book a call", href: "/buyer-form" },
    }
  },

  // ─── FOR SELLERS PAGE ─────────────────────────────────────────────────────
  {
    page_slug: "for-sellers", block_key: "hero", block_type: "hero", sort_order: 0,
    content: {
      label: "Sell your business",
      heading: "Sell your business",
      subheading: "We help online business owners sell smarter — better documentation, better buyers, better multiples.",
      cta_primary: { label: "Submit your business for review", href: "/seller-form" },
    }
  },

  // ─── FOR SCALERS PAGE ─────────────────────────────────────────────────────
  {
    page_slug: "for-scalers", block_key: "hero", block_type: "hero", sort_order: 0,
    content: {
      label: "For Scalers",
      heading: "Scaling Advisory & Mentorship",
      subheading: "Strategic guidance on what breaks, what to fix first, and where to focus for rapid post-acquisition growth.",
      cta_primary: { label: "Get in touch", href: "/contact" },
    }
  },
  {
    page_slug: "for-scalers", block_key: "content", block_type: "rich_text", sort_order: 1,
    content: {
      heading: "",
      paragraphs: [
        "You've acquired an online business — now comes the hard part. Most buyers underestimate the operational complexity that emerges after the handover. Systems break, traffic fluctuates, and the seller's \"easy\" business suddenly feels anything but.",
        "Our Scaling Advisory service pairs you with operators who have been exactly where you are. We help you stabilize, then systematically grow your acquisition into a portfolio-worthy asset.",
      ],
    }
  },
];

async function seed() {
  const client = new Client({
    host: "aws-0-us-west-2.pooler.supabase.com",
    port: 6543,
    user: "postgres.uajvtaarigyagsjbvkla",
    password: "jePASSE13$$d",
    database: "postgres",
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  console.log("Connected. Seeding page_blocks...");

  for (const block of SEED_BLOCKS) {
    await client.query(
      `INSERT INTO page_blocks (page_slug, block_key, block_type, content, sort_order, is_visible)
       VALUES ($1, $2, $3, $4::jsonb, $5, true)
       ON CONFLICT (page_slug, block_key) DO UPDATE
         SET content = EXCLUDED.content,
             block_type = EXCLUDED.block_type,
             sort_order = EXCLUDED.sort_order,
             updated_at = now()`,
      [block.page_slug, block.block_key, block.block_type, JSON.stringify(block.content), block.sort_order]
    );
    console.log(`  ✓ ${block.page_slug} / ${block.block_key}`);
  }

  await client.end();
  console.log(`\nSeeded ${SEED_BLOCKS.length} blocks successfully.`);
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
