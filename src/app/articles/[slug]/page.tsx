import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BookLink } from "@/components/book-link";
import { ShareCard } from "@/components/share-card";
import { getAllArticles, getArticle } from "@/lib/articles";

export function generateStaticParams() {
  return getAllArticles().map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  return article
    ? {
        title: article.meta.title,
        description: article.meta.description,
        alternates: { canonical: `/articles/${slug}` },
        openGraph: {
          type: "article",
          title: article.meta.title,
          description: article.meta.description,
          publishedTime: article.meta.publishedAt,
          modifiedTime: article.meta.updatedAt,
          images: [{ url: article.meta.image, alt: article.meta.imageAlt }],
        },
        twitter: {
          card: "summary_large_image",
          title: article.meta.title,
          description: article.meta.description,
          images: [article.meta.image],
        },
      }
    : {};
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const { meta, content } = article;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://stilltalkingfamily.com";
  const articleUrl = `${siteUrl}/articles/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    image: `${siteUrl}${meta.image}`,
    datePublished: meta.publishedAt,
    dateModified: meta.updatedAt,
    author: { "@type": "Organization", name: "Still Talking Editors" },
    publisher: { "@type": "Organization", name: "Still Talking", url: siteUrl },
    mainEntityOfPage: articleUrl,
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Library", item: `${siteUrl}/library` },
      { "@type": "ListItem", position: 3, name: meta.title, item: articleUrl },
    ],
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replaceAll("<", "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd).replaceAll("<", "\\u003c") }}
      />
      <header style={{ padding: "54px 0 34px" }}>
        <div className="container" style={{ maxWidth: 980 }}>
          <nav aria-label="Breadcrumb" className="article-breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span>
            <Link href="/library">Library</Link><span aria-hidden="true">/</span>
            <span aria-current="page">{meta.category}</span>
          </nav>
          <div className="eyebrow">{meta.category}</div>
          <h1
            className="serif"
            style={{
              fontSize: "clamp(2.7rem, 6vw, 5.2rem)",
              lineHeight: 0.98,
              maxWidth: 930,
              margin: "15px 0 20px",
            }}
          >
            {meta.title}
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 20, lineHeight: 1.55, maxWidth: 760 }}>
            {meta.description}
          </p>
          <div style={{ display: "flex", gap: 20, color: "var(--muted)", fontSize: 14, marginTop: 24 }}>
            <span>By Still Talking Editors</span>
            <span>{meta.readingTime}</span>
            <time>{new Date(meta.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time>
            {meta.updatedAt !== meta.publishedAt && (
              <span>
                Updated{" "}
                {new Date(meta.updatedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
        </div>
      </header>
      <div className="container" style={{ maxWidth: 1180 }}>
        <div style={{ position: "relative", aspectRatio: "16 / 9", background: "#e6e9e7" }}>
          <Image src={meta.image} alt={meta.imageAlt} fill priority style={{ objectFit: "cover" }} />
        </div>
        <p style={{ color: "var(--muted)", fontSize: 12, marginTop: 9 }}>
          AI-generated editorial illustration for Still Talking.
        </p>
      </div>
      <div style={{ width: "min(720px, calc(100% - 36px))", margin: "44px auto 0" }}>
        <aside className="evidence-note">
          <strong>Evidence note</strong>
          <p>{meta.evidenceNote}</p>
          {meta.exampleType === "composite" && (
            <p>
              The family scenes and dialogue in this article are composite
              examples, not quotations from an identifiable family.
            </p>
          )}
        </aside>
        <div className="prose">
          <MDXRemote source={content} components={{ BookLink }} />
        </div>
        <section className="article-sources" aria-labelledby="article-sources-title">
          <div className="eyebrow">Reporting notes</div>
          <h2 id="article-sources-title" className="serif">Sources &amp; further reading</h2>
          <ul>
            {meta.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noopener noreferrer">
                  {source.title}
                </a>
                <span>{source.publisher}</span>
              </li>
            ))}
          </ul>
        </section>
        <ShareCard title={meta.title} quote={meta.cardQuote} url={articleUrl} />
      </div>
      <style>{`
        .article-breadcrumb { display:flex; flex-wrap:wrap; gap:8px; color:var(--muted); font-size:13px; margin-bottom:24px; }
        .article-breadcrumb a { text-decoration:underline; text-underline-offset:3px; }
        .evidence-note { border-left:3px solid var(--teal); padding:4px 0 4px 18px; margin-bottom:36px; color:var(--muted); }
        .evidence-note strong { color:var(--ink); font-size:13px; text-transform:uppercase; }
        .evidence-note p { font-size:14px; line-height:1.6; margin:7px 0 0; }
        .article-sources { border-top:1px solid var(--line); margin-top:42px; padding-top:28px; }
        .article-sources h2 { font-size:28px; margin:7px 0 18px; }
        .article-sources ul { list-style:none; margin:0; padding:0; }
        .article-sources li { border-top:1px solid var(--line); padding:14px 0; display:grid; gap:4px; }
        .article-sources a { color:var(--teal-dark); font-weight:700; text-decoration:underline; text-underline-offset:3px; }
        .article-sources span { color:var(--muted); font-size:12px; }
      `}</style>
    </article>
  );
}
