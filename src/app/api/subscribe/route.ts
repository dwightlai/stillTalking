import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    email?: unknown;
    company?: unknown;
    source?: unknown;
  } | null;
  const email =
    typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  // Bots commonly fill hidden fields that people never see.
  if (body?.company) {
    return NextResponse.json({
      message: "You are on the list. Look for the first note soon.",
    });
  }

  if (!emailPattern.test(email) || email.length > 254) {
    return NextResponse.json(
      { message: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const kitApiKey = process.env.KIT_API_KEY;
  const kitFormId = process.env.KIT_FORM_ID;

  if (kitApiKey && kitFormId) {
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://stilltalkingfamily.com";
    const source =
      typeof body?.source === "string" && body.source.startsWith("/")
        ? body.source
        : "/";
    const kitHeaders = {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": kitApiKey,
    };
    const createResponse = await fetch(
      "https://api.kit.com/v4/subscribers",
      {
        method: "POST",
        headers: kitHeaders,
        body: JSON.stringify({
          email_address: email,
          state: "inactive",
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      },
    ).catch(() => null);

    if (!createResponse?.ok) {
      console.error("Kit subscriber creation failed", {
        status: createResponse?.status ?? "network_error",
      });
      return NextResponse.json(
        { message: "We could not add you right now. Please try again." },
        { status: 502 },
      );
    }

    const createResult = (await createResponse.json().catch(() => null)) as {
      subscriber?: { id?: number };
    } | null;
    const subscriberId = createResult?.subscriber?.id;

    if (!subscriberId) {
      console.error("Kit subscriber creation returned no subscriber ID");
      return NextResponse.json(
        { message: "We could not add you right now. Please try again." },
        { status: 502 },
      );
    }

    const formResponse = await fetch(
      `https://api.kit.com/v4/forms/${encodeURIComponent(kitFormId)}/subscribers/${subscriberId}`,
      {
        method: "POST",
        headers: kitHeaders,
        body: JSON.stringify({
          referrer: new URL(source, siteUrl).toString(),
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      },
    ).catch(() => null);

    if (!formResponse?.ok) {
      console.error("Kit form subscription failed", {
        status: formResponse?.status ?? "network_error",
      });
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
    message: "Check your inbox to confirm your subscription.",
  });
}
