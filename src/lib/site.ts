import { ASSET_TYPES } from "@/lib/due-diligence";

export type MegaMenuSection = {
  title: string;
  href: string;
  description?: string;
  bullets?: (string | { label: string; desc: string })[];
  items: { href: string; label: string; slug?: string }[];
};

export type MegaMenuLayout = "columns" | "blocks";

export const site = {
  name: "Acquire To Scale",
  tagline: "The missing layer between online business marketplaces and M&A firms",
  description:
    "Practical insights on buying scalable digital assets under $250K. We help you buy, sell, and scale content websites, SaaS, YouTube channels, and more.",
  url: "https://www.acquiretoscale.com",
  contactEmail: "hello@acquiretoscale.com",
  newsletterUrl: "https://acquiretoscale.substack.com/",
  nav: [
    { href: "/", label: "Home" },
    {
      href: "/due-diligence",
      label: "For Buyers",
      megaMenu: {
        sections: [
          {
            title: "Due Diligence",
            href: "/due-diligence",
            items: ASSET_TYPES.map((a) => ({
              href: `/due-diligence/${a.slug}`,
              label: a.title.replace(/^Due Diligence for /, ""),
              slug: a.slug,
            })),
          },
          {
            title: "Services",
            href: "/due-diligence",
            items: [
              { href: "/clarity-call", label: "Clarity Call" },
              { href: "/due-diligence#deal-sourcing", label: "Deal Sourcing" },
              { href: "/due-diligence#deal-sourcing", label: "Private Vault Access" },
            ],
          },
        ],
      },
      children: [
        ...ASSET_TYPES.map((a) => ({
          href: `/due-diligence/${a.slug}`,
          label: a.title.replace(/^Due Diligence for /, ""),
        })),
        { href: "/clarity-call", label: "Clarity Call" },
        { href: "/due-diligence#deal-sourcing", label: "Deal Sourcing" },
        { href: "/due-diligence#deal-sourcing", label: "Private Vault Access" },
      ],
    },
    { href: "/seller-form", label: "For Seller" },
    {
      href: "/scaling",
      label: "For Scalers",
      megaMenu: {
        layout: "blocks",
        sections: [
          {
            title: "Scaling Advisory & Mentorship",
            href: "/scaling",
            description: "Strategic guidance on what breaks, what to fix first, and where to focus for rapid post-acquisition growth.",
            items: [],
          },
          {
            title: "Global Operations & Infrastructure",
            href: "/global-operations",
            bullets: [
              { label: "Offshore Incorporation & Tax Optimization", desc: "Strategically structuring entities for international compliance and maximized fiscal efficiency." },
              { label: "Expert Banking & Payment Processing", desc: "Seamless setup and optimization of high-volume, high-risk merchant accounts and global banking solutions." },
            ],
            items: [],
          },
        ],
      },
      children: [
        { href: "/scaling", label: "Scaling Advisory & Mentorship" },
        { href: "/global-operations", label: "Global Operations & Infrastructure" },
      ],
    },
    {
      href: "/about",
      label: "About",
      children: [
        { href: "/about#our-mission", label: "Our Mission" },
        { href: "/career", label: "Career" },
        { href: "/contact", label: "Contact" },
      ],
    },
    { href: "/blog", label: "Blog" },
  ],
  schema: {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Acquire To Scale",
      url: "https://www.acquiretoscale.com",
      logo: "https://www.acquiretoscale.com/logo.png",
      email: "hello@acquiretoscale.com",
      description:
        "Advisory for digital asset acquisitions ($10k-$250k). We help entrepreneurs vet deals and optimize their offshore/tax structures. Buy, sell, and scale content websites, SaaS, YouTube channels.",
      sameAs: ["https://acquiretoscale.substack.com/"],
    },
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Acquire To Scale",
      url: "https://www.acquiretoscale.com",
      description:
        "Practical insights on buying scalable digital assets under $250K. Buy, sell, scale content websites, SaaS, YouTube channels.",
      publisher: {
        "@type": "Organization",
        name: "Acquire To Scale",
        url: "https://www.acquiretoscale.com",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: "https://www.acquiretoscale.com/blog?q={search_term_string}" },
        "query-input": "required name=search_term_string",
      },
    },
  },
} as const;
