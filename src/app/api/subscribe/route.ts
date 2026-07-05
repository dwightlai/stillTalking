import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: unknown } | null;
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!emailPattern.test(email) || email.length > 254) {
    return NextResponse.json(
      { message: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const providerUrl = process.env.NEWSLETTER_PROVIDER_URL;
  if (providerUrl) {
    const providerResponse = await fetch(providerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.NEWSLETTER_API_KEY
          ? { Authorization: `Bearer ${process.env.NEWSLETTER_API_KEY}` }
          : {}),
      },
      body: JSON.stringify({ email }),
    });
    if (!providerResponse.ok) {
      return NextResponse.json(
        { message: "We could not add you right now. Please try again." },
        { status: 502 },
      );
    }
  } else if (process.env.NODE_ENV === "development") {
    const dataDirectory = path.join(process.cwd(), "data");
    await fs.mkdir(dataDirectory, { recursive: true });
    await fs.appendFile(
      path.join(dataDirectory, "subscribers.jsonl"),
      `${JSON.stringify({ email, subscribedAt: new Date().toISOString() })}\n`,
      "utf8",
    );
  } else {
    return NextResponse.json(
      { message: "Email signup is temporarily unavailable." },
      { status: 503 },
    );
  }

  return NextResponse.json({
    message: "You are on the list. Look for the first note soon.",
  });
}
