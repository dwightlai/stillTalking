"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import type { ArticleMeta } from "@/lib/articles";

const PAGE_SIZE = 10;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function formatPublishedDate(value: string) {
  return dateFormatter.format(new Date(`${value}T12:00:00Z`));
}

export function LibraryExplorer({
  articles,
  pillars,
  initialPillar = "All topics",
  focusSearch = false,
}: {
  articles: ArticleMeta[];
  pillars: string[];
  initialPillar?: string;
  focusSearch?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [pillar, setPillar] = useState(
    pillars.includes(initialPillar) ? initialPillar : "All topics",
  );
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesPillar = pillar === "All topics" || article.pillar === pillar;
      const matchesQuery =
        !normalized ||
        `${article.title} ${article.description} ${article.pillar ?? ""}`
          .toLowerCase()
          .includes(normalized);
      return matchesPillar && matchesQuery;
    });
  }, [articles, pillar, query]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pages);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function updateQuery(value: string) {
    setQuery(value);
    setPage(1);
  }

  function updatePillar(value: string) {
    setPillar(value);
    setPage(1);
  }

  function goToPage(value: number) {
    setPage(Math.max(1, Math.min(pages, value)));
    document
      .getElementById("library-results")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div>
      <div className="library-controls">
        <label className="search-field">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">Search the article library</span>
          <input
            autoFocus={focusSearch}
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            placeholder="Search a family question"
          />
        </label>
        <label className="topic-select">
          <SlidersHorizontal size={18} aria-hidden="true" />
          <span className="sr-only">Filter by topic</span>
          <select value={pillar} onChange={(event) => updatePillar(event.target.value)}>
            <option>All topics</option>
            {pillars.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="library-summary" id="library-results" aria-live="polite">
        <span>
          <strong>{filtered.length}</strong>{" "}
          {filtered.length === 1 ? "practical article" : "practical articles"}
          {pillar !== "All topics" ? ` in ${pillar}` : ""}
        </span>
        <span>Newest first</span>
      </div>

      <div className="library-grid">
        {visible.map((article) => (
          <article key={article.slug} className="library-card">
            <Link href={`/articles/${article.slug}`} className="focus-ring image-link">
              <Image src={article.image} alt="" fill sizes="180px" style={{ objectFit: "cover" }} />
            </Link>
            <div>
              <div className="eyebrow">{article.pillar ?? article.category}</div>
              <h2 className="serif">
                <Link href={`/articles/${article.slug}`} className="focus-ring">
                  {article.title}
                </Link>
              </h2>
              <p>{article.description}</p>
              <div className="card-meta">
                <time dateTime={article.publishedAt}>
                  {formatPublishedDate(article.publishedAt)}
                </time>
                <span>{article.readingTime}</span>
                <span>Editorially reviewed</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {visible.length === 0 && (
        <div className="empty-state">
          No articles match that search. Try a broader phrase such as “money,”
          “privacy,” or “marriage.”
        </div>
      )}

      <nav className="pagination" aria-label="Article pages">
        <button
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>
        <span>
          Page {currentPage} of {pages}
        </span>
        <button
          disabled={currentPage === pages}
          onClick={() => goToPage(currentPage + 1)}
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </nav>

      <style>{`
        .sr-only { position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0,0,0,0); }
        .library-controls { display:grid; grid-template-columns:1fr 280px; gap:14px; margin:30px 0 18px; }
        .search-field,.topic-select { display:flex; align-items:center; gap:10px; border:1px solid var(--line); background:white; padding:0 14px; min-height:50px; }
        .search-field input,.topic-select select { width:100%; border:0; outline:0; background:transparent; color:var(--ink); }
        .topic-select select { cursor:pointer; }
        .library-summary { display:flex; justify-content:space-between; gap:18px; color:var(--muted); margin-bottom:30px; scroll-margin-top:100px; }
        .library-grid { display:grid; grid-template-columns:1fr 1fr; column-gap:36px; border-top:1px solid var(--line); }
        .library-card { display:grid; grid-template-columns:150px 1fr; gap:19px; padding:24px 0; border-bottom:1px solid var(--line); min-width:0; }
        .image-link { position:relative; display:block; aspect-ratio:4/3; background:#e5e9e8; }
        .library-card h2 { font-size:21px; line-height:1.18; margin:7px 0 8px; }
        .library-card p { color:var(--muted); font-size:13px; line-height:1.5; margin:0; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .card-meta { display:flex; flex-wrap:wrap; gap:6px 12px; color:var(--muted); font-size:11px; margin-top:11px; }
        .pagination { display:flex; align-items:center; justify-content:center; gap:16px; margin-top:38px; }
        .pagination button { display:inline-flex; border:1px solid var(--line); background:white; padding:9px; color:var(--ink); }
        .pagination button:disabled { opacity:.35; }
        .pagination span { color:var(--muted); font-size:13px; }
        .empty-state { border:1px solid var(--line); padding:30px; color:var(--muted); background:white; }
        @media(max-width:900px) {
          .library-grid { grid-template-columns:1fr; }
        }
        @media(max-width:620px) {
          .library-controls { grid-template-columns:1fr; }
          .library-card { grid-template-columns:100px 1fr; gap:14px; }
          .library-card h2 { font-size:18px; }
          .library-card p { display:none; }
        }
      `}</style>
    </div>
  );
}
