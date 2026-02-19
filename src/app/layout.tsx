import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { CookieConsent } from "@/components/CookieConsent";
import { ConnectionBanner } from "@/components/ConnectionBanner";
import { SeoInject } from "@/components/SeoInject";
import { site } from "@/lib/site";
import { getSeoSettings } from "@/lib/seo-settings";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings();
  const title = seo.metaTitleOverride ?? site.name;
  const description = seo.metaDescriptionOverride ?? site.description;
  return {
    metadataBase: new URL(site.url),
    title: {
      default: title,
      template: `%s | ${site.name}`,
    },
    description,
    applicationName: site.name,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      url: site.url,
      siteName: site.name,
      title,
      description,
      images: [
        {
          url: "/api/og",
          width: 1200,
          height: 630,
          alt: `${site.name} — ${site.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/api/og"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const seo = await getSeoSettings();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {seo.gtmContainerId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${seo.gtmContainerId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        )}
        <SeoInject
          googleSiteVerification={seo.googleSiteVerification}
          bingSiteVerification={seo.bingSiteVerification}
          ga4MeasurementId={seo.ga4MeasurementId}
          allowAiTraining={seo.aiOptimizationEnabled ? seo.allowAiTraining : true}
          gtmContainerId={seo.gtmContainerId}
          facebookPixelId={seo.facebookPixelId}
          tiktokPixelId={seo.tiktokPixelId}
          googleAdsConversionId={seo.googleAdsConversionId}
          googleAdsConversionLabel={seo.googleAdsConversionLabel}
        />
        <Script
          id="ld-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(site.schema.organization),
          }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(site.schema.website),
          }}
        />
        <div className="min-h-dvh">
          <ConnectionBanner />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <CookieConsent />
        </div>
      </body>
    </html>
  );
}
