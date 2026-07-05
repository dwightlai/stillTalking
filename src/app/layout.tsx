import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://still-talking.vercel.app",
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
    images: [{ url: "/images/home-conversation.png", width: 1536, height: 1024 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Still Talking",
    description: "Practical guidance for parents of adult children.",
    images: ["/images/home-conversation.png"],
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
      </body>
    </html>
  );
}
