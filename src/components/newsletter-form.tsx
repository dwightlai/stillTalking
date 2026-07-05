"use client";

import { useState } from "react";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function subscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setMessage("");
    const form = new FormData(event.currentTarget);

    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        company: form.get("company"),
        source: window.location.pathname,
      }),
    });
    const result = (await response.json()) as { message: string };
    setStatus(response.ok ? "success" : "error");
    setMessage(result.message);
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <form className={compact ? "subscribe-form compact" : "subscribe-form"} onSubmit={subscribe}>
      <label htmlFor={compact ? "resource-email" : "email"} className="sr-only">
        Email address
      </label>
      <input
        id={compact ? "resource-email" : "email"}
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="Email address"
        aria-describedby={message ? `${compact ? "resource-" : ""}subscribe-status` : undefined}
      />
      <input
        className="signup-honeypot"
        name="company"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <button type="submit" disabled={status === "saving"}>
        {status === "saving" ? "Joining..." : "Subscribe"}
      </button>
      <p className="subscribe-note">
        One thoughtful email at a time. Unsubscribe whenever you choose.
      </p>
      <p
        id={`${compact ? "resource-" : ""}subscribe-status`}
        className={`form-status ${status}`}
        role="status"
      >
        {message}
      </p>
      <style>{`
        .subscribe-form { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:10px; }
        .subscribe-form input { min-width:0; border:1px solid transparent; padding:14px 15px; background:white; color:var(--ink); }
        .subscribe-form button { border:0; padding:14px 18px; font-weight:800; background:var(--coral); color:white; }
        .subscribe-form button:disabled { opacity:.7; cursor:wait; }
        .signup-honeypot { position:absolute !important; left:-10000px !important; width:1px !important; height:1px !important; }
        .subscribe-note { grid-column:1/-1; margin:0; font-size:11px; line-height:1.45; color:#aebdc4; }
        .form-status { grid-column:1/-1; min-height:18px; margin:0; font-size:13px; color:#d5e2e6; }
        .form-status.error { color:#ffd1ca; }
        .subscribe-form.compact { max-width:540px; margin-top:20px; }
        @media(max-width:620px){.subscribe-form{grid-template-columns:1fr}.form-status{grid-column:1}}
      `}</style>
    </form>
  );
}
