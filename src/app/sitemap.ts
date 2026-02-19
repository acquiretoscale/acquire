import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { getAllSupabasePosts } from "@/lib/supabase-blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = site.url;
  const fileSlugs = getAllSlugs();
  const supabasePosts = await getAllSupabasePosts();

  const dueDiligenceRoutes: MetadataRoute.Sitemap = [
    "/due-diligence",
    "/due-diligence/saas-apps",
    "/due-diligence/content-websites",
    "/due-diligence/newsletters",
    "/due-diligence/kdp-digital-products",
    "/due-diligence/youtube-channels",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "/due-diligence" ? 0.8 : 0.7,
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/contact",
    "/buyer-form",
    "/sell-your-business",
    "/seller-form",
    "/clarity-call",
    "/investor-portal",
    "/scaling",
    "/global-operations",
    "/blog",
    "/search",
    "/privacy",
    "/terms",
    "/modern-slavery-act",
    "/cookie-policy",
    "/career",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("monthly" as const) : ("weekly" as const),
    priority: route === "" ? 1 : 0.8,
  }));

  const fileBlogRoutes: MetadataRoute.Sitemap = fileSlugs.map((slug) => {
    const post = getPostBySlug(slug);
    return {
      url: `${baseUrl}/blog/${slug}`,
      lastModified: post?.updated ? new Date(post.updated) : post ? new Date(post.date) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    };
  });

  const supabaseBlogRoutes: MetadataRoute.Sitemap = supabasePosts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...dueDiligenceRoutes, ...fileBlogRoutes, ...supabaseBlogRoutes];
}
