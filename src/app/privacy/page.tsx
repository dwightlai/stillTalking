import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Still Talking handles email addresses and site data.",
};

export default function PrivacyPage() {
  return (
    <div className="container privacy-page">
      <div className="eyebrow">Last updated July 6, 2026</div>
      <h1 className="serif">Privacy</h1>
      <div className="prose">
        <p>
          Still Talking collects an email address only when you choose to join
          the newsletter or an early-access list. We use it to send the content
          you requested and operational messages related to that subscription.
        </p>
        <h2>Email providers</h2>
        <p>
          In production, subscription data may be processed by the email
          provider identified on the signup form or in the email footer. We do
          not sell email addresses. Every marketing email will include an
          unsubscribe method.
        </p>
        <h2>Cookies and analytics</h2>
        <p>
          The current site does not use advertising cookies or cross-site
          tracking. If non-essential analytics or advertising tools are added,
          this notice and the consent controls will be updated before those
          tools are enabled.
        </p>
        <h2>Your choices</h2>
        <p>
          You may unsubscribe through any newsletter email. Requests to access
          or delete subscription data can be sent to the contact address listed
          in the newsletter footer once the production email service launches.
        </p>
      </div>
      <style>{`
        .privacy-page { max-width:760px; padding-top:70px; padding-bottom:40px; }
        h1 { font-size:clamp(44px,7vw,76px); margin:12px 0 28px; }
      `}</style>
    </div>
  );
}
