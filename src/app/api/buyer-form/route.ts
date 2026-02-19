import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";

const TO_EMAIL = "eliteaccelerator@gmail.com";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.startsWith("re_xxxx") || apiKey === "your-api-key") {
    console.error("RESEND_API_KEY is missing or placeholder. Add your real key to .env.local");
    return NextResponse.json(
      { error: "Email not configured. Add RESEND_API_KEY to .env.local and restart the server." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);

  try {
    const formData = await request.formData();

    const fullName = (formData.get("fullName") as string) ?? null;
    const email = (formData.get("email") as string) ?? null;
    const linkedIn = (formData.get("linkedIn") as string) ?? null;
    const howCanWeHelp = (formData.get("howCanWeHelp") as string) ?? null;
    const primaryAsset = (formData.get("primaryAsset") as string) ?? null;
    const primaryAssetOther = (formData.get("primaryAssetOther") as string) ?? null;
    const targetBudget = (formData.get("targetBudget") as string) ?? null;
    const dealUrl = (formData.get("dealUrl") as string) ?? null;
    const howFound = (formData.get("howFound") as string) ?? null;
    const stage = (formData.get("stage") as string) ?? null;
    const serviceNeeded = (formData.get("serviceNeeded") as string) ?? null;

    const html = `
<h2>New Buyer Form Submission</h2>

<p><strong>Full Name:</strong> ${fullName ?? "—"}</p>
<p><strong>Professional Email:</strong> ${email ?? "—"}</p>
<p><strong>LinkedIn Profile:</strong> ${linkedIn ?? "—"}</p>

<h3>How can we help you today?</h3>
<p>${howCanWeHelp?.replace(/\n/g, "<br>") ?? "—"}</p>

<h3>Primary Asset Class</h3>
<p>${primaryAsset === "Other" ? (primaryAssetOther ?? "Other") : (primaryAsset ?? "—")}</p>

<h3>Target Budget</h3>
<p>${targetBudget ?? "—"}</p>

<h3>Deal Details</h3>
<p><strong>Deal URL:</strong> ${dealUrl ?? "—"}</p>
<p><strong>How did you find it?</strong> ${howFound ?? "—"}</p>
<p><strong>Stage:</strong> ${stage ?? "—"}</p>

<h3>Service Needed</h3>
<p>${serviceNeeded ?? "—"}</p>

<hr>
<p><em>Submitted from Acquire To Scale buyer form</em></p>
    `.trim();

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      try {
        const supabase = await createClient();
        await supabase.from("buyer_form_submissions").insert({
          full_name: fullName,
          email,
          linkedin: linkedIn,
          how_can_we_help: howCanWeHelp,
          primary_asset: primaryAsset,
          primary_asset_other: primaryAssetOther,
          target_budget: targetBudget,
          deal_url: dealUrl,
          how_found: howFound,
          stage,
          service_needed: serviceNeeded,
        });
      } catch (dbErr) {
        console.error("Supabase buyer form save failed:", dbErr);
      }
    }

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM ?? "Acquire To Scale <onboarding@resend.dev>",
      to: TO_EMAIL,
      replyTo: email || undefined,
      subject: `Buyer Form: ${fullName ?? "New submission"}`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: `Email failed: ${error.message}. Check Resend dashboard and spam folder.` },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Buyer form API error:", err);
    return NextResponse.json(
      { error: `Failed: ${message}` },
      { status: 500 },
    );
  }
}
