import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM =
  process.env.RESEND_FROM_EMAIL ?? "Still Talking <onboarding@resend.dev>";
const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;
const NOTIFY_TO = process.env.NEWSLETTER_NOTIFY_TO ?? "";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://stilltalkingfamily.com";

function welcomeHtml(email: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f3ee;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3ee;padding:32px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:560px;">
        <tr><td style="padding:40px 40px 24px;">
          <h1 style="font-size:26px;line-height:1.25;color:#1a1a1a;margin:0 0 16px;">You're on the list.</h1>
          <p style="font-size:16px;line-height:1.6;color:#444;margin:0 0 16px;">
            Thank you for subscribing. Still Talking is an independent editorial project
            for parents of adult children — practical, evidence-informed guidance for the
            conversations that matter most.
          </p>
          <p style="font-size:16px;line-height:1.6;color:#444;margin:0 0 28px;">
            You'll receive a thoughtful note when new articles are published.
            No spam, no sponsors, unsubscribe whenever you choose.
          </p>
          <a href="${SITE_URL}/library" style="display:inline-block;background:#d85a30;color:#ffffff;font-weight:700;font-size:15px;padding:14px 28px;border-radius:6px;text-decoration:none;font-family:Arial,sans-serif;">
            Browse the library
          </a>
        </td></tr>
        <tr><td style="padding:0 40px 40px;">
          <p style="font-size:13px;line-height:1.5;color:#888;margin:0;border-top:1px solid #eee;padding-top:20px;">
            Still Talking &middot; ${SITE_URL}<br>
            You subscribed with <strong>${email}</strong>.<br>
            <a href="${SITE_URL}/unsubscribe?email=${encodeURIComponent(email)}" style="color:#888;">Unsubscribe</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function notifyText(email: string, source: string): string {
  return `New newsletter subscriber:\n\nEmail: ${email}\nSource: ${source}\nTime: ${new Date().toISOString()}\n\n— Still Talking`;
}

const resendHeaders = () => ({
  Authorization: `Bearer ${RESEND_API_KEY}`,
  "Content-Type": "application/json",
});

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    email?: unknown;
    company?: unknown;
    source?: unknown;
  } | null;
  const email =
    typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

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

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json(
      { message: "Email signup is temporarily unavailable." },
      { status: 503 },
    );
  }

  const source =
    typeof body?.source === "string" && body.source.startsWith("/")
      ? body.source
      : "/";

  // 1. Add contact to audience (if audience ID is configured)
  if (RESEND_AUDIENCE_ID) {
    const contactResponse = await fetch(
      `https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`,
      {
        method: "POST",
        headers: resendHeaders(),
        body: JSON.stringify({ email }),
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      },
    ).catch(() => null);

    if (!contactResponse?.ok && contactResponse?.status !== 422) {
      // 422 = already exists, which is fine
      console.error("Resend contact creation failed", {
        status: contactResponse?.status ?? "network_error",
        body: await contactResponse?.text().catch(() => ""),
      });
    }
  }

  // 2. Send welcome email
  const sendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: resendHeaders(),
    body: JSON.stringify({
      from: RESEND_FROM,
      to: email,
      subject: "Welcome to Still Talking",
      html: welcomeHtml(email),
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  }).catch(() => null);

  if (!sendResponse?.ok) {
    const errorBody = await sendResponse?.text().catch(() => "");
    console.error("Resend welcome email failed", {
      status: sendResponse?.status ?? "network_error",
      body: errorBody,
    });
    return NextResponse.json(
      { message: "We could not add you right now. Please try again." },
      { status: 502 },
    );
  }

  // 3. Notify site owner
  if (NOTIFY_TO) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: resendHeaders(),
      body: JSON.stringify({
        from: RESEND_FROM,
        to: NOTIFY_TO,
        subject: "New subscriber on Still Talking",
        text: notifyText(email, source),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    }).catch(() => null);
  }

  return NextResponse.json({
    message: "Check your inbox for a welcome note.",
  });
}
