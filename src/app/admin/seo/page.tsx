import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isDemoMode } from "@/lib/admin-demo";
import { SeoSettingsForm } from "./SeoSettingsForm";

export default async function SeoPage() {
  const demoMode = isDemoMode();
  if (!demoMode) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/admin/login");
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold text-[var(--foreground)]">
        SEO & tracking
      </h1>
      <p className="mt-2 text-[var(--muted)]">
        Verification (GSC, Bing), meta overrides, analytics (GA4, GTM), pixels (Facebook, TikTok), and Google Ads. Changes apply site-wide.
      </p>
      <div className="mt-8">
        <SeoSettingsForm demoMode={demoMode} />
      </div>
    </section>
  );
}
