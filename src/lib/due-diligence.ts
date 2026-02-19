export const ASSET_TYPES = [
  {
    slug: "saas-apps",
    title: "Due Diligence for SaaS / Webapps",
    description:
      "Specialized analysis for software-as-a-service and web application businesses, focusing on recurring revenue, churn, tech stack, and user acquisition metrics.",
    detailIntro:
      "We evaluate SaaS and web app businesses with a focus on unit economics, retention, tech stack maintainability, and growth levers so you can invest with confidence.",
  },
  {
    slug: "content-websites",
    title: "Due Diligence for Content Websites",
    description: "In-depth review of traffic, monetization, and content sustainability.",
    detailIntro:
      "We assess content and affiliate sites for traffic quality, monetization mix, SEO risk, and content scalability so you know exactly what you're buying.",
  },
  {
    slug: "newsletters",
    title: "Due Diligence for Newsletters",
    description: "Subscriber quality, growth levers, and revenue durability.",
    detailIntro:
      "We analyze list health, open rates, revenue per subscriber, and growth channels to ensure your newsletter acquisition is built on solid foundations.",
  },
  {
    slug: "kdp-digital-products",
    title: "Due Diligence for KDP & Digital Products",
    description: "Catalog performance, competition, and scalability.",
    detailIntro:
      "We review catalog performance, market saturation, and scalability of KDP and other digital product businesses so you can spot winners and avoid duds.",
  },
  {
    slug: "youtube-channels",
    title: "Due Diligence for YouTube Channels",
    description: "Audience, CPM, and content strategy for faceless and creator-led channels.",
    detailIntro:
      "We evaluate audience quality, CPM sustainability, and content strategy for both faceless and creator-led YouTube channels so you know the real upside and risks.",
  },
] as const;

export type AssetSlug = (typeof ASSET_TYPES)[number]["slug"];

export function getAssetBySlug(slug: string) {
  return ASSET_TYPES.find((a) => a.slug === slug) ?? null;
}
