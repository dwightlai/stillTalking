import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Still Talking handles email addresses and site data.",
};

export default function PrivacyPage() {
  return (
    <div className="container privacy-page">
      <div className="eyebrow">Last updated July 5, 2026</div>
      <h1 className="serif">Privacy</h1>
      <div className="prose">
        <p>
          Still Talking collects an email address only when you choose to join
          the newsletter or an early-access list. We use it to send the content
          you requested and operational messages related to that subscription.
        </p>
        <h2>Email providers</h2>
        <p>
          Newsletter subscriptions are processed by Kit, formerly ConvertKit.
          Kit receives the email address and the page where the signup
          occurred so it can manage the subscription and deliver requested
          emails. We do not sell email addresses. Every newsletter email
          includes an unsubscribe method.
        </p>
        <h2>Cookies and analytics</h2>
        <p>
          We use Umami Cloud to understand aggregate visits, referrers, devices,
          and page performance. Umami does not use cookies or collect personally
          identifiable information.
        </p>
        <p>
          We also use Microsoft Clarity to understand interactions through
          heatmaps and session recordings. Sensitive content is masked. Clarity
          receives an analytics-storage consent signal from our preference
          notice; advertising storage is always denied. Choosing “Essential
          only” keeps analytics storage denied.
        </p>
        <h2>Your choices</h2>
        <p>
          You may unsubscribe through any newsletter email. Requests to access
          or delete subscription data can be sent to the contact address in the
          newsletter footer.
        </p>
      </div>
      <style>{`
        .privacy-page { max-width:760px; padding-top:70px; padding-bottom:40px; }
        h1 { font-size:clamp(44px,7vw,76px); margin:12px 0 28px; }
      `}</style>
    </div>
  );
}
