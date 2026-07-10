import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { AnalyticsScripts } from "@/components/analytics-scripts";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://stilltalkingfamily.com",
  ),
  title: {
    default: "Still Talking",
    template: "%s | Still Talking",
  },
  description:
    "Practical guidance for parents who want to understand their adult children and stay close without overstepping.",
  openGraph: {
    type: "website",
    siteName: "Still Talking",
    title: "Still Talking",
    description:
      "Practical guidance for parents who want to understand their adult children and stay close without overstepping.",
    images: [{ url: "/images/home-conversation.webp", width: 1586, height: 992 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Still Talking",
    description: "Practical guidance for parents of adult children.",
    images: ["/images/home-conversation.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
