"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";

const links = [
  ["Library", "/library"],
  ["Relationships", "/topics/relationships"],
  ["Boundaries", "/topics/boundaries"],
  ["Money & Work", "/topics/money-work"],
  ["Resources", "/resources"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

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
              className="focus-ring"
              key={href}
              href={href}
              style={{ fontSize: 14, fontWeight: 700 }}
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
        @media (max-width: 820px) {
          .desktop-nav { display: none !important; }
          .mobile-menu { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
