"use client";

import { useEffect } from "react";
import Script from "next/script";

type SeoInjectProps = {
  googleSiteVerification: string | null;
  bingSiteVerification: string | null;
  ga4MeasurementId: string | null;
  allowAiTraining: boolean;
  gtmContainerId?: string | null;
  facebookPixelId?: string | null;
  tiktokPixelId?: string | null;
  googleAdsConversionId?: string | null;
  googleAdsConversionLabel?: string | null;
};

function setMeta(name: string, content: string, dataAttr?: string) {
  const sel = dataAttr ? `meta[name="${name}"][data-seo-inject="${dataAttr}"]` : `meta[name="${name}"]`;
  let el = document.querySelector(sel);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    if (dataAttr) el.setAttribute("data-seo-inject", dataAttr);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function removeMeta(name: string, dataAttr?: string) {
  const sel = dataAttr ? `meta[name="${name}"][data-seo-inject="${dataAttr}"]` : `meta[name="${name}"]`;
  document.querySelector(sel)?.remove();
}

export function SeoInject({
  googleSiteVerification,
  bingSiteVerification,
  ga4MeasurementId,
  allowAiTraining,
  gtmContainerId,
  facebookPixelId,
  tiktokPixelId,
  googleAdsConversionId,
  googleAdsConversionLabel,
}: SeoInjectProps) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (googleSiteVerification) setMeta("google-site-verification", googleSiteVerification);
    if (bingSiteVerification) setMeta("msvalidate.01", bingSiteVerification);
    if (!allowAiTraining) setMeta("robots", "noai, noimageai", "ai");
    return () => {
      if (googleSiteVerification) removeMeta("google-site-verification");
      if (bingSiteVerification) removeMeta("msvalidate.01");
      if (!allowAiTraining) removeMeta("robots", "ai");
    };
  }, [googleSiteVerification, bingSiteVerification, allowAiTraining]);

  return (
    <>
      {/* Google Tag Manager – loads first when configured; add GA4, pixels, ads via GTM UI */}
      {gtmContainerId && (
        <Script id="gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmContainerId}');
          `}
        </Script>
      )}
      {/* GA4 direct – only when GTM not used */}
      {!gtmContainerId && (ga4MeasurementId || (googleAdsConversionId && googleAdsConversionLabel)) && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId || googleAdsConversionId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-gads-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              ${ga4MeasurementId ? `gtag('config', '${ga4MeasurementId}');` : ""}
              ${googleAdsConversionId && googleAdsConversionLabel ? `gtag('config', '${googleAdsConversionId}', {'send_to': '${googleAdsConversionId}/${googleAdsConversionLabel}'});` : ""}
            `}
          </Script>
        </>
      )}
      {/* Facebook Pixel – when GTM not used or for direct install */}
      {facebookPixelId && !gtmContainerId && (
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');fbq('init', '${facebookPixelId}');fbq('track', 'PageView');
          `}
        </Script>
      )}
      {/* TikTok Pixel */}
      {tiktokPixelId && !gtmContainerId && (
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};ttq.load('${tiktokPixelId}');ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      )}
    </>
  );
}
