export default function AboutPage() {
  return (
    <section style={{ padding: "64px 0" }}>
      <div className="container" style={{ maxWidth: 820 }}>
        <div className="eyebrow">About Still Talking</div>
        <h1 className="serif" style={{ fontSize: "clamp(3rem, 7vw, 5.2rem)", lineHeight: 1, margin: "10px 0 28px" }}>
          Understand their world. Stay part of their life.
        </h1>
        <div className="prose">
          <p>
            Still Talking helps parents understand the economic, social, and
            emotional realities shaping their adult children&apos;s lives in
            America today.
          </p>
          <p>
            We write from the perspective of young adults, but in language
            designed to keep parents in the conversation. We criticize patterns,
            not people. Good intentions matter, but impact matters too.
          </p>
          <p>
            Our goal is practical: help families replace pressure, guessing,
            and repeated arguments with clearer boundaries and conversations
            that leave room for two adults.
          </p>
        </div>
      </div>
    </section>
  );
}
