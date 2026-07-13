"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";

const links = [
  ["Library", "/library"],
  ["Communication", "/topics/communication"],
  ["Boundaries", "/topics/boundaries"],
  ["Money & Support", "/topics/money-and-support"],
  ["Conflict & Repair", "/topics/conflict-and-repair"],
  ["Resources", "/resources"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href ||
    pathname.startsWith(`${href}/`) ||
    (href === "/library" && pathname.startsWith("/articles/"));

  return (
    <header
      style={{
        background: "var(--paper)",
        borderBottom: "1px solid var(--line)",
        position: "sticky",
        top: 0,
        zIndex: 30,
      }}
    >
      <div
        className="container"
        style={{
          minHeight: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <Link
          href="/"
          className="focus-ring serif"
          style={{ fontSize: 27, fontWeight: 700 }}
        >
          Still <span style={{ color: "var(--teal)" }}>Talking</span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="desktop-nav"
          style={{ display: "flex", alignItems: "center", gap: 28 }}
        >
          {links.map(([label, href]) => (
            <Link
              className={`focus-ring nav-link ${isActive(href) ? "nav-active" : ""}`}
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
          <button
            aria-label="Search"
            onClick={() => window.location.assign("/library?focus=search")}
            className="focus-ring"
            style={{ border: 0, background: "transparent", padding: 8 }}
          >
            <Search size={19} strokeWidth={2} />
          </button>
        </nav>
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="mobile-menu focus-ring"
          onClick={() => setOpen(!open)}
          style={{ border: 0, background: "transparent", padding: 8 }}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          style={{
            borderTop: "1px solid var(--line)",
            padding: "18px 20px 24px",
            background: "var(--paper)",
          }}
        >
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={`mobile-nav-link ${isActive(href) ? "nav-active" : ""}`}
              onClick={() => setOpen(false)}
              style={{ display: "block", padding: "11px 0", fontWeight: 700 }}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
      <style>{`
        .mobile-menu { display: none !important; }
        .nav-link { position:relative; padding:26px 0 24px; font-size:14px; font-weight:700; }
        .nav-link::after { content:""; position:absolute; left:0; right:0; bottom:16px; height:2px; background:var(--teal); transform:scaleX(0); transform-origin:left; transition:transform .18s ease; }
        .nav-link:hover::after, .nav-link.nav-active::after { transform:scaleX(1); }
        .nav-active { color:var(--teal-dark); }
        .mobile-nav-link.nav-active { border-left:3px solid var(--teal); padding-left:12px !important; }
        @media (max-width: 820px) {
          .desktop-nav { display: none !important; }
          .mobile-menu { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
