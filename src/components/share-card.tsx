"use client";

import { Check, Copy, Download, Share2 } from "lucide-react";
import { useRef, useState } from "react";

export function ShareCard({
  title,
  quote,
  url,
}: {
  title: string;
  quote: string;
  url: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);

  function wrapText(
    context: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
  ) {
    const words = text.split(" ");
    let line = "";
    let row = 0;
    for (const word of words) {
      const test = `${line}${word} `;
      if (context.measureText(test).width > maxWidth && line) {
        context.fillText(line.trim(), x, y + row * lineHeight);
        line = `${word} `;
        row += 1;
      } else {
        line = test;
      }
    }
    context.fillText(line.trim(), x, y + row * lineHeight);
    return y + (row + 1) * lineHeight;
  }

  function drawCard() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.fillStyle = "#fafaf7";
    context.fillRect(0, 0, 1080, 1350);
    context.fillStyle = "#167c80";
    context.fillRect(0, 0, 1080, 24);
    context.fillStyle = "#e56b5d";
    context.fillRect(830, 108, 130, 12);
    context.fillStyle = "#17212b";
    context.font = "700 54px Georgia";
    context.fillText("Still Talking", 100, 150);
    context.fillStyle = "#66737f";
    context.font = "700 24px Arial";
    context.fillText("A NOTE WORTH SHARING", 100, 240);
    context.fillStyle = "#17212b";
    context.font = "700 64px Georgia";
    const nextY = wrapText(context, title, 100, 350, 860, 78);
    context.fillStyle = "#dde2e5";
    context.fillRect(100, nextY + 50, 880, 2);
    context.fillStyle = "#17212b";
    context.font = "42px Georgia";
    wrapText(context, `“${quote}”`, 100, nextY + 140, 860, 60);
    context.fillStyle = "#167c80";
    context.font = "700 25px Arial";
    context.fillText("UNDERSTAND THEIR WORLD. STAY PART OF THEIR LIFE.", 100, 1230);
    setReady(true);
  }

  function downloadCard() {
    if (!ready) drawCard();
    window.setTimeout(() => {
      const link = document.createElement("a");
      link.download = "still-talking-note.png";
      link.href = canvasRef.current?.toDataURL("image/png") ?? "";
      link.click();
    }, 0);
  }

  async function shareArticle() {
    if (navigator.share) {
      await navigator.share({ title, text: quote, url });
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section
      style={{
        marginTop: 48,
        padding: 28,
        border: "1px solid var(--line)",
        background: "white",
      }}
    >
      <div style={{ display: "flex", gap: 18, alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div className="eyebrow">Share the idea, not the argument</div>
          <h2 className="serif" style={{ fontSize: 27, margin: "8px 0" }}>
            Send a calmer version of the conversation
          </h2>
          <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.55 }}>
            Download a concise card to share with someone you care about.
          </p>
        </div>
        <Share2 color="var(--coral)" aria-hidden="true" />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 20 }}>
        <button onClick={shareArticle} className="focus-ring share-button primary">
          {copied ? <Check size={17} /> : <Copy size={17} />}
          {copied ? "Link copied" : "Share article"}
        </button>
        <button onClick={downloadCard} className="focus-ring share-button">
          <Download size={17} /> Download card
        </button>
      </div>
      <canvas ref={canvasRef} width={1080} height={1350} hidden />
      <style>{`
        .share-button { border:1px solid var(--line); background:white; color:var(--ink); padding:12px 16px; display:inline-flex; gap:9px; align-items:center; font-weight:700; }
        .share-button.primary { background:var(--ink); color:white; border-color:var(--ink); }
      `}</style>
    </section>
  );
}
