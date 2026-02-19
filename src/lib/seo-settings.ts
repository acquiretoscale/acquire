/**
 * SEO settings (GA4, GSC, Bing, AI optimization).
 * Stored in Supabase site_settings; falls back to env and defaults when DB unavailable.
 */

export type SeoSettings = {
  ga4MeasurementId: string | null;
  googleSiteVerification: string | null;
  bingSiteVerification: string | null;
  aiOptimizationEnabled: boolean;
  allowAiTraining: boolean;
  gtmContainerId: string | null;
  facebookPixelId: string | null;
  tiktokPixelId: string | null;
  googleAdsConversionId: string | null;
  googleAdsConversionLabel: string | null;
  metaTitleOverride: string | null;
  metaDescriptionOverride: string | null;
};

const DEFAULT_SETTINGS: SeoSettings = {
  ga4MeasurementId: null,
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? null,
  bingSiteVerification: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? null,
  aiOptimizationEnabled: true,
  allowAiTraining: true,
  gtmContainerId: null,
  facebookPixelId: null,
  tiktokPixelId: null,
  googleAdsConversionId: null,
  googleAdsConversionLabel: null,
  metaTitleOverride: null,
  metaDescriptionOverride: null,
};

const SETTINGS_ROW_ID = "00000000-0000-0000-0000-000000000001";

export async function getSeoSettings(): Promise<SeoSettings> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return {
      ...DEFAULT_SETTINGS,
      ga4MeasurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? null,
    };
  }
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const query = supabase
      .from("site_settings")
      .select("ga4_measurement_id, google_site_verification, bing_site_verification, ai_optimization_enabled, allow_ai_training, gtm_container_id, facebook_pixel_id, tiktok_pixel_id, google_ads_conversion_id, google_ads_conversion_label, meta_title_override, meta_description_override")
      .eq("id", SETTINGS_ROW_ID)
      .maybeSingle();
    const { data, error } = await Promise.race([
      query,
      new Promise<{ data: null; error: Error }>((resolve) =>
        setTimeout(() => resolve({ data: null, error: new Error("timeout") }), 5000)
      ),
    ]);
    if (error || !data) return DEFAULT_SETTINGS;
    return {
      ga4MeasurementId: (data.ga4_measurement_id as string) ?? null,
      googleSiteVerification: (data.google_site_verification as string) ?? null,
      bingSiteVerification: (data.bing_site_verification as string) ?? null,
      aiOptimizationEnabled: data.ai_optimization_enabled !== false,
      allowAiTraining: data.allow_ai_training !== false,
      gtmContainerId: (data.gtm_container_id as string) ?? null,
      facebookPixelId: (data.facebook_pixel_id as string) ?? null,
      tiktokPixelId: (data.tiktok_pixel_id as string) ?? null,
      googleAdsConversionId: (data.google_ads_conversion_id as string) ?? null,
      googleAdsConversionLabel: (data.google_ads_conversion_label as string) ?? null,
      metaTitleOverride: (data.meta_title_override as string) ?? null,
      metaDescriptionOverride: (data.meta_description_override as string) ?? null,
    };
  } catch {
    return {
      ...DEFAULT_SETTINGS,
      ga4MeasurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? null,
    };
  }
}
