import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Conversation Scripts for Parents of Adult Children", description: "Practical phrases for contact, advice, money, boundaries, apologies, partners, space, and family conflict.", alternates: { canonical: "/resources/conversation-scripts-for-parents" } };

const groups = [
  { title: "Asking for more contact", href: "/topics/communication", scripts: [
    ["You never call us anymore.", "I miss hearing from you. Could we find a rhythm that works for both of us?"],
    ["It takes ten seconds to text your mother.", "When you are busy, even a quick note helps me know when to expect a longer conversation."],
    ["Fine, I will stop bothering you.", "I do not want contact to feel like pressure. What kind of check-in feels realistic right now?"],
  ] },
  { title: "Offering advice", href: "/articles/let-the-good-news-land", scripts: [
    ["Here is what you need to do.", "Would ideas be useful, or would you rather I just listen?"],
    ["I already told you this would happen.", "That sounds frustrating. What part would be most useful to think through together?"],
    ["You are making a mistake.", "I see this differently, but I know the decision is yours. Do you want to hear my concern?"],
  ] },
  { title: "Talking about money", href: "/topics/money-and-support", scripts: [
    ["After all we have paid for, we should have a say.", "Let us separate the help we agreed on from decisions that still belong to you."],
    ["We will help whenever you need it.", "We can contribute this amount through September, and then we should review the plan together."],
    ["Why did you spend money on that?", "I want to keep our agreement clear. Is this expense part of what we agreed to support?"],
  ] },
  { title: "Setting house rules", href: "/topics/independence", scripts: [
    ["As long as you live here, you will do what I say.", "Because we share this home, let us agree on the routines that affect everyone who lives here."],
    ["You treat this place like a hotel.", "I need us to divide chores and shared costs clearly. Can we write down who handles what?"],
    ["You need to be home by midnight.", "I do not need to set your bedtime, but I do need quiet after midnight and a message if plans affect the household."],
  ] },
  { title: "Apologizing", href: "/articles/apology-that-does-not-demand-forgiveness", scripts: [
    ["I am sorry you took it that way.", "I am sorry I said that. It was hurtful, and I understand why you pulled back."],
    ["I apologized, so can we move on?", "I do not expect you to be ready immediately. I will give you time and show the change in how I act."],
    ["I only yelled because I care.", "Caring does not excuse yelling. I was wrong, and next time I will pause before continuing the conversation."],
  ] },
  { title: "Discussing a partner", href: "/topics/family-relationships", scripts: [
    ["Your partner is changing you.", "I am adjusting to how your life has changed. I want to understand the choices you are making together."],
    ["You always choose them over us.", "I miss some of our old time together. Could we plan something without making you choose between families?"],
    ["Tell your partner they cannot do that.", "This concern is mine to raise respectfully, not yours to carry as a message between us."],
  ] },
  { title: "Giving space", href: "/topics/boundaries", scripts: [
    ["Why are you shutting us out?", "I hear that you need space. I will respect that and let you tell me when contact feels okay."],
    ["At least tell me how long this will last.", "You do not have to set a deadline today. Is there a low-pressure way I may check in?"],
    ["I need an answer right now.", "This matters to me, and I can wait until you have had time to think."],
  ] },
  { title: "Repairing conflict", href: "/topics/conflict-and-repair", scripts: [
    ["Can we forget the whole thing?", "I would like to repair this, and I know that starts with understanding what was harmful."],
    ["We both said things we regret.", "I want to take responsibility for my part without asking you to take care of my feelings."],
    ["Family should not hold grudges.", "Being family does not erase the impact. What would make future conversations feel safer?"],
  ] },
] as const;

export default function ConversationScriptsPage() {
  return <article className="scripts-page"><div className="container"><header><div className="eyebrow">Free practical resource</div><h1 className="serif">Conversation Scripts for Parents of Adult Children</h1><p>These phrases are starting points, not magic words. Choose language that is honest for you, say it once without a hidden demand, and leave room for the other person to answer.</p></header>
    <nav className="script-nav" aria-label="Script topics">{groups.map((group) => <a key={group.title} href={`#${group.title.toLowerCase().replaceAll(" ", "-")}`}>{group.title}</a>)}</nav>
    {groups.map((group) => <section key={group.title} id={group.title.toLowerCase().replaceAll(" ", "-")}><div className="section-heading"><div><div className="eyebrow">Conversation</div><h2 className="serif">{group.title}</h2></div><Link href={group.href}>Explore related advice</Link></div><div className="script-grid">{group.scripts.map(([instead, saying]) => <div className="script" key={instead}><div><span>Instead of</span><p>{instead}</p></div><div><span>Try saying</span><p>{saying}</p></div></div>)}</div></section>)}
    <aside><strong>A useful pause</strong><p>If a conversation feels unsafe, abusive, or beyond what a script can hold, step back and consider support from a qualified professional. These examples are general information, not therapy.</p></aside>
  </div><style>{`.scripts-page{padding:58px 0 78px}.scripts-page header{max-width:900px}.scripts-page h1{font-size:clamp(3rem,7vw,5.6rem);line-height:.98;margin:10px 0 20px}.scripts-page header>p{font-size:19px;line-height:1.7;color:var(--muted);max-width:780px}.script-nav{display:flex;flex-wrap:wrap;gap:12px 20px;border-block:1px solid var(--line);padding:20px 0;margin:38px 0 20px}.script-nav a,.section-heading>a{color:var(--teal-dark);font-weight:800}.scripts-page section{padding:44px 0;scroll-margin-top:90px;border-bottom:1px solid var(--line)}.section-heading{display:flex;justify-content:space-between;align-items:end;gap:20px}.section-heading h2{font-size:38px;margin:7px 0 0}.script-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:24px}.script{background:white;border:1px solid var(--line)}.script>div{padding:20px}.script>div+div{border-top:1px solid var(--line);background:#f2f7f6}.script span{font-size:11px;font-weight:900;text-transform:uppercase;color:var(--coral)}.script p{line-height:1.55;margin:8px 0 0}.scripts-page aside{border-left:3px solid var(--teal);padding:8px 0 8px 20px;margin-top:44px}.scripts-page aside p{color:var(--muted);line-height:1.6}@media(max-width:800px){.script-grid{grid-template-columns:1fr}.section-heading{display:block}.section-heading>a{display:inline-block;margin-top:12px}}`}</style></article>;
}
