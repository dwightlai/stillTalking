"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function UnsubscribePage() {
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");
    const request = email ? fetch("/api/unsubscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }) : Promise.reject(new Error("missing-email"));
    request
      .then((r) => r.json())
      .then((data) => {
        setStatus("done");
        setMessage(data.message ?? "Unsubscribed.");
      })
      .catch((error: Error) => {
        setStatus("error");
        setMessage(error.message === "missing-email" ? "No email address provided." : "Something went wrong. Please try again later.");
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
              You&apos;re unsubscribed.
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--muted)" }}>
              {message}
            </p>
            <Link
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
            </Link>
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
