"use client"; // This ensures the component runs on the client-side

import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";

interface GoogleAnalyticsProps {
  trackingId: string;
}

export default function GoogleAnalytics({ trackingId }: GoogleAnalyticsProps) {
  const router = useRouter();

  useEffect(() => {
    // Check if the gtag function is defined before using it
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      const handleRouteChange = (url: string) => {
        window.gtag("config", trackingId, {
          page_path: url,
        });
      };
      router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, [router.events, trackingId]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${trackingId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
