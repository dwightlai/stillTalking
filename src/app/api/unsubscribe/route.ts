import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    email?: unknown;
  } | null;
  const email =
    typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { message: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const notifyTo = process.env.NEWSLETTER_NOTIFY_TO;
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "Still Talking <onboarding@resend.dev>";

  if (notifyTo && resendApiKey) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: notifyTo,
        subject: "Unsubscribe request",
        text: `Unsubscribe request for: ${email}\nTime: ${new Date().toISOString()}\n\nPlease remove this address from the newsletter list.`,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    }).catch(() => null);
  }

  console.log("Unsubscribe request", { email, time: new Date().toISOString() });

  return NextResponse.json({
    message:
      "You will not receive further emails. We're sorry to see you go.",
  });
}
