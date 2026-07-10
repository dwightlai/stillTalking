"use client";

import { useEffect, useState } from "react";

export default function UnsubscribePage() {
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");
    if (!email) {
      setStatus("error");
      setMessage("No email address provided.");
      return;
    }
    fetch("/api/unsubscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((r) => r.json())
      .then((data) => {
        setStatus("done");
        setMessage(data.message ?? "Unsubscribed.");
      })
      .catch(() => {
        setStatus("error");
        setMessage("Something went wrong. Please try again later.");
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 20px",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        {status === "loading" && (
          <p style={{ fontSize: 18, color: "var(--muted)" }}>Processing...</p>
        )}
        {status === "done" && (
          <>
            <h1
              className="serif"
              style={{ fontSize: 32, marginBottom: 12, color: "var(--ink)" }}
            >
              You're unsubscribed.
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--muted)" }}>
              {message}
            </p>
            <a
              href="/"
              style={{
                display: "inline-block",
                marginTop: 24,
                color: "var(--teal-dark)",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Return home
            </a>
          </>
        )}
        {status === "error" && (
          <>
            <h1
              className="serif"
              style={{ fontSize: 32, marginBottom: 12, color: "var(--ink)" }}
            >
              Something went wrong.
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--muted)" }}>
              {message}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
