"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

const consentKey = "still-talking-analytics-consent";

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

export function AnalyticsScripts() {
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
  const [consent, setConsent] = useState<"granted" | "denied" | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      let saved: string | null = null;
      try {
        saved = window.localStorage?.getItem(consentKey) ?? null;
      } catch {
        saved = null;
      }
      setConsent(saved === "granted" || saved === "denied" ? saved : null);
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  function updateConsent(value: "granted" | "denied") {
    try {
      window.localStorage?.setItem(consentKey, value);
    } catch {
      // Consent still applies to the current page when storage is unavailable.
    }
    setConsent(value);
    window.clarity?.("consentv2", {
      ad_Storage: "denied",
      analytics_Storage: value,
    });
  }

  const clarityLoader = `
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window,document,"clarity","script",${JSON.stringify(clarityProjectId)});
  `;

  return (
    <>
      {umamiWebsiteId && (
        <Script
          id="umami-analytics"
          src="https://cloud.umami.is/script.js"
          data-website-id={umamiWebsiteId}
          data-domains="stilltalkingfamily.com,www.stilltalkingfamily.com"
          data-performance="true"
          strategy="afterInteractive"
        />
      )}
      {clarityProjectId && (
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: clarityLoader }}
          onReady={() =>
            window.clarity?.("consentv2", {
              ad_Storage: "denied",
              analytics_Storage: consent === "granted" ? "granted" : "denied",
            })
          }
        />
      )}
      {clarityProjectId && consent === null && (
        <aside className="analytics-consent" aria-label="Analytics preferences">
          <p>
            We use privacy-friendly traffic analytics and optional session
            insights to improve Still Talking.{" "}
            <Link href="/privacy">Learn more</Link>
          </p>
          <div>
            <button type="button" onClick={() => updateConsent("denied")}>
              Essential only
            </button>
            <button
              type="button"
              className="accept"
              onClick={() => updateConsent("granted")}
            >
              Allow analytics
            </button>
          </div>
          <style>{`
            .analytics-consent {
              position:fixed;
              right:20px;
              bottom:20px;
              z-index:60;
              width:min(440px,calc(100% - 40px));
              border:1px solid var(--line);
              background:var(--paper);
              box-shadow:0 16px 40px rgba(23,33,43,.18);
              padding:20px;
            }
            .analytics-consent p {
              margin:0;
              color:var(--muted);
              font-size:14px;
              line-height:1.55;
            }
            .analytics-consent a {
              color:var(--teal-dark);
              text-decoration:underline;
              text-underline-offset:3px;
            }
            .analytics-consent > div {
              display:flex;
              justify-content:flex-end;
              gap:10px;
              margin-top:16px;
            }
            .analytics-consent button {
              border:1px solid var(--line);
              background:white;
              color:var(--ink);
              padding:10px 13px;
              font-weight:700;
            }
            .analytics-consent button.accept {
              border-color:var(--teal-dark);
              background:var(--teal-dark);
              color:white;
            }
            @media(max-width:520px) {
              .analytics-consent { right:14px; bottom:14px; width:calc(100% - 28px); }
              .analytics-consent > div { display:grid; grid-template-columns:1fr 1fr; }
            }
          `}</style>
        </aside>
      )}
    </>
  );
}
