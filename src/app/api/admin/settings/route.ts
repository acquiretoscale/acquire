import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const SETTINGS_ROW_ID = "00000000-0000-0000-0000-000000000001";

export async function GET() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json({
      ga4MeasurementId: null,
      googleSiteVerification: null,
      bingSiteVerification: null,
      aiOptimizationEnabled: true,
      allowAiTraining: true,
      gtmContainerId: null,
      facebookPixelId: null,
      tiktokPixelId: null,
      googleAdsConversionId: null,
      googleAdsConversionLabel: null,
      metaTitleOverride: null,
      metaDescriptionOverride: null,
    });
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("ga4_measurement_id, google_site_verification, bing_site_verification, ai_optimization_enabled, allow_ai_training, gtm_container_id, facebook_pixel_id, tiktok_pixel_id, google_ads_conversion_id, google_ads_conversion_label, meta_title_override, meta_description_override")
      .eq("id", SETTINGS_ROW_ID)
      .maybeSingle();
    if (error || !data) {
      return NextResponse.json({
        ga4MeasurementId: null,
        googleSiteVerification: null,
        bingSiteVerification: null,
        aiOptimizationEnabled: true,
        allowAiTraining: true,
        gtmContainerId: null,
        facebookPixelId: null,
        tiktokPixelId: null,
        googleAdsConversionId: null,
        googleAdsConversionLabel: null,
        metaTitleOverride: null,
        metaDescriptionOverride: null,
      });
    }
    return NextResponse.json({
      ga4MeasurementId: data.ga4_measurement_id ?? null,
      googleSiteVerification: data.google_site_verification ?? null,
      bingSiteVerification: data.bing_site_verification ?? null,
      aiOptimizationEnabled: data.ai_optimization_enabled !== false,
      allowAiTraining: data.allow_ai_training !== false,
      gtmContainerId: data.gtm_container_id ?? null,
      facebookPixelId: data.facebook_pixel_id ?? null,
      tiktokPixelId: data.tiktok_pixel_id ?? null,
      googleAdsConversionId: data.google_ads_conversion_id ?? null,
      googleAdsConversionLabel: data.google_ads_conversion_label ?? null,
      metaTitleOverride: data.meta_title_override ?? null,
      metaDescriptionOverride: data.meta_description_override ?? null,
    });
  } catch {
    return NextResponse.json({
      ga4MeasurementId: null,
      googleSiteVerification: null,
      bingSiteVerification: null,
      aiOptimizationEnabled: true,
      allowAiTraining: true,
      gtmContainerId: null,
      facebookPixelId: null,
      tiktokPixelId: null,
      googleAdsConversionId: null,
      googleAdsConversionLabel: null,
      metaTitleOverride: null,
      metaDescriptionOverride: null,
    });
  }
}

type Body = {
  ga4MeasurementId?: string | null;
  googleSiteVerification?: string | null;
  bingSiteVerification?: string | null;
  aiOptimizationEnabled?: boolean;
  allowAiTraining?: boolean;
  gtmContainerId?: string | null;
  facebookPixelId?: string | null;
  tiktokPixelId?: string | null;
  googleAdsConversionId?: string | null;
  googleAdsConversionLabel?: string | null;
  metaTitleOverride?: string | null;
  metaDescriptionOverride?: string | null;
};

export async function PATCH(request: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json(
      { error: "SEO settings require Supabase. Configure Supabase to save settings." },
      { status: 503 }
    );
  }
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const updates: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };
  if (body.ga4MeasurementId !== undefined) updates.ga4_measurement_id = body.ga4MeasurementId?.trim() || null;
  if (body.googleSiteVerification !== undefined) updates.google_site_verification = body.googleSiteVerification?.trim() || null;
  if (body.bingSiteVerification !== undefined) updates.bing_site_verification = body.bingSiteVerification?.trim() || null;
  if (body.aiOptimizationEnabled !== undefined) updates.ai_optimization_enabled = !!body.aiOptimizationEnabled;
  if (body.allowAiTraining !== undefined) updates.allow_ai_training = !!body.allowAiTraining;
  if (body.gtmContainerId !== undefined) updates.gtm_container_id = body.gtmContainerId?.trim() || null;
  if (body.facebookPixelId !== undefined) updates.facebook_pixel_id = body.facebookPixelId?.trim() || null;
  if (body.tiktokPixelId !== undefined) updates.tiktok_pixel_id = body.tiktokPixelId?.trim() || null;
  if (body.googleAdsConversionId !== undefined) updates.google_ads_conversion_id = body.googleAdsConversionId?.trim() || null;
  if (body.googleAdsConversionLabel !== undefined) updates.google_ads_conversion_label = body.googleAdsConversionLabel?.trim() || null;
  if (body.metaTitleOverride !== undefined) updates.meta_title_override = body.metaTitleOverride?.trim() || null;
  if (body.metaDescriptionOverride !== undefined) updates.meta_description_override = body.metaDescriptionOverride?.trim() || null;

  const { error } = await supabase
    .from("site_settings")
    .update(updates)
    .eq("id", SETTINGS_ROW_ID);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
