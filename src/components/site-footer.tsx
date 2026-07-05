import Link from "next/link";

export function SiteFooter() {
  return (
    <footer
      style={{
        background: "var(--ink)",
        color: "white",
        marginTop: 80,
        padding: "54px 0 30px",
      }}
    >
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="serif" style={{ fontSize: 28, marginBottom: 12 }}>
              Still Talking
            </div>
            <p style={{ color: "#bbc5cc", maxWidth: 420, lineHeight: 1.65 }}>
              Helping parents understand the world their adult children are
              navigating, one honest conversation at a time.
            </p>
          </div>
          <div>
            <strong>Explore</strong>
            <Link href="/library" style={{ display: "block", marginTop: 16, color: "#bbc5cc" }}>
              Article library
            </Link>
            <Link href="/topics/relationships" style={{ display: "block", marginTop: 16, color: "#bbc5cc" }}>
              Relationships
            </Link>
            <Link href="/topics/boundaries" style={{ display: "block", marginTop: 12, color: "#bbc5cc" }}>
              Boundaries
            </Link>
          </div>
          <div>
            <strong>About</strong>
            <Link href="/about" style={{ display: "block", marginTop: 16, color: "#bbc5cc" }}>
              About Still Talking
            </Link>
            <Link href="/resources" style={{ display: "block", marginTop: 12, color: "#bbc5cc" }}>
              Free resources
            </Link>
            <Link href="/disclosure" style={{ display: "block", marginTop: 12, color: "#bbc5cc" }}>
              Disclosure
            </Link>
            <Link href="/privacy" style={{ display: "block", marginTop: 12, color: "#bbc5cc" }}>
              Privacy
            </Link>
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid #34414b",
            marginTop: 40,
            paddingTop: 22,
            color: "#8f9da7",
            fontSize: 13,
          }}
        >
          © {new Date().getFullYear()} Still Talking. Informational content,
          not therapy or professional advice.
        </div>
      </div>
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: minmax(220px, 1.4fr) repeat(2, minmax(140px, 1fr));
          gap: 40px;
        }
        @media (max-width: 700px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .footer-grid > div:first-child { grid-column: 1 / -1; }
        }
      `}</style>
    </footer>
  );
}
