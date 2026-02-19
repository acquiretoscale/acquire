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
    const assetUrl = (formData.get("assetUrl") as string) ?? null;
    const primaryAsset = (formData.get("primaryAsset") as string) ?? null;
    const primaryAssetOther = (formData.get("primaryAssetOther") as string) ?? null;
    const projectAge = (formData.get("projectAge") as string) ?? null;
    const avgMonthlyProfit = (formData.get("avgMonthlyProfit") as string) ?? null;
    const planningToSell = (formData.get("planningToSell") as string) ?? null;
    const helpWith = (formData.getAll("helpWith") as string[]) ?? [];
    const additionalDetails = (formData.get("additionalDetails") as string) ?? null;

    const html = `
<h2>New Seller Form Submission</h2>

<p><strong>Full Name:</strong> ${fullName ?? "—"}</p>
<p><strong>Email:</strong> ${email ?? "—"}</p>
<p><strong>LinkedIn Profile:</strong> ${linkedIn ?? "—"}</p>
<p><strong>Digital asset URL:</strong> ${assetUrl ?? "—"}</p>

<h3>Primary Asset Class</h3>
<p>${primaryAsset === "Other" ? (primaryAssetOther ?? "Other") : (primaryAsset ?? "—")}</p>

<h3>Project age</h3>
<p>${projectAge ?? "—"}</p>

<h3>Avg. Monthly Profit</h3>
<p>${avgMonthlyProfit ?? "—"}</p>

<h3>Planning to sell?</h3>
<p>${planningToSell ?? "—"}</p>

<h3>What do you need help with?</h3>
<p>${helpWith?.length ? helpWith.join(", ") : "—"}</p>

<h3>Additional details</h3>
<p>${additionalDetails?.replace(/\n/g, "<br>") ?? "—"}</p>

<hr>
<p><em>Submitted from Acquire To Scale seller form</em></p>
    `.trim();

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      try {
        const supabase = await createClient();
        await supabase.from("seller_form_submissions").insert({
          full_name: fullName,
          email,
          linkedin: linkedIn,
          asset_url: assetUrl,
          primary_asset: primaryAsset,
          primary_asset_other: primaryAssetOther,
          project_age: projectAge,
          avg_monthly_profit: avgMonthlyProfit,
          planning_to_sell: planningToSell,
          help_with: helpWith.length ? helpWith : null,
          additional_details: additionalDetails,
        });
      } catch (dbErr) {
        console.error("Supabase seller form save failed:", dbErr);
      }
    }

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM ?? "Acquire To Scale <onboarding@resend.dev>",
      to: TO_EMAIL,
      replyTo: email || undefined,
      subject: `Seller Form: ${fullName ?? "New submission"}`,
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
    console.error("Seller form API error:", err);
    return NextResponse.json(
      { error: `Failed: ${message}` },
      { status: 500 },
    );
  }
}
