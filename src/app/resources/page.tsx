import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Mail } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";

const resources = [
  {
    icon: FileText,
    label: "Free guide",
    title: "The One-Reminder Agreement",
    text: "A simple family agreement that turns repeated reminders into one clear, respectful conversation.",
    href: "/resources/conversation-scripts-for-parents",
  },
  {
    icon: BookOpen,
    label: "Workbook preview",
    title: "30 Days of Better Boundaries",
    text: "Daily reflection prompts for parents who want to stay close without managing every decision.",
    href: "#early-list",
  },
  {
    icon: Mail,
    label: "Weekly letter",
    title: "The Sunday Still Talking Note",
    text: "One family pattern, one useful phrase, and one small practice delivered each week.",
    href: "#early-list",
  },
];

export default function ResourcesPage() {
  return (
    <section style={{ padding: "58px 0 72px" }}>
      <div className="container">
        <div style={{ maxWidth: 780 }}>
          <div className="eyebrow">Resources</div>
          <h1 className="serif" style={{ fontSize: "clamp(3.1rem, 7vw, 5.6rem)", lineHeight: 0.98, margin: "10px 0 20px" }}>
            Put a better conversation within reach.
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 19, lineHeight: 1.65 }}>
            Practical tools built from the same principles as our editorial
            library. Free resources launch first; deeper workbooks follow.
          </p>
        </div>
        <div className="resource-grid">
          {resources.map(({ icon: Icon, label, title, text, href }) => (
            <article key={title}>
              <Icon size={26} color="var(--coral)" />
              <div className="eyebrow" style={{ marginTop: 24 }}>{label}</div>
              <h2 className="serif">{title}</h2>
              <p>{text}</p>
              <Link href={href}>{href.startsWith("/resources/") ? "Read the free guide" : "Join the early list"} <ArrowRight size={16} /></Link>
            </article>
          ))}
        </div>
        <div id="early-list" className="early-list">
          <div className="eyebrow" style={{ color: "#9fdadc" }}>Early access</div>
          <h2 className="serif">Get the free guide and resource launch notes.</h2>
          <p>One useful email at a time. Unsubscribe whenever you choose.</p>
          <NewsletterForm compact />
        </div>
        <div className="business-note">
          <div>
            <div className="eyebrow" style={{ color: "#9fdadc" }}>For readers who want to go deeper</div>
            <h2 className="serif">A paid workbook library is in development.</h2>
          </div>
          <Link href="/about">About Still Talking <ArrowRight size={17} /></Link>
        </div>
      </div>
      <style>{`
        .resource-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; margin-top:48px; }
        .resource-grid article { border:1px solid var(--line); background:white; padding:28px; }
        .resource-grid h2 { font-size:27px; line-height:1.15; margin:9px 0 12px; }
        .resource-grid p { color:var(--muted); line-height:1.6; min-height:102px; }
        .resource-grid a { color:var(--teal-dark); display:flex; gap:8px; align-items:center; font-weight:800; }
        .early-list { margin-top:46px; background:var(--teal-dark); color:white; padding:36px; scroll-margin-top:100px; }
        .early-list h2 { font-size:34px; margin:8px 0 10px; }
        .early-list > p { color:#d5e2e6; }
        .business-note { margin-top:46px; background:var(--ink); color:white; padding:36px; display:flex; justify-content:space-between; align-items:end; gap:30px; }
        .business-note h2 { font-size:32px; margin:8px 0 0; }
        .business-note a { display:flex; gap:8px; align-items:center; color:#9fdadc; font-weight:800; }
        @media(max-width:800px){.resource-grid{grid-template-columns:1fr}.resource-grid p{min-height:0}.business-note{display:block}.business-note a{margin-top:24px}}
      `}</style>
    </section>
  );
}
