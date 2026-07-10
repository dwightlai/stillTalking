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

  const resendApiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const notifyTo = process.env.NEWSLETTER_NOTIFY_TO;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "Still Talking <onboarding@resend.dev>";

  // 1. Remove contact from audience
  if (resendApiKey && audienceId) {
    // Find contact by email
    const listResponse = await fetch(
      `https://api.resend.com/audiences/${audienceId}/contacts`,
      {
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      },
    ).catch(() => null);

    if (listResponse?.ok) {
      const listData = (await listResponse.json()) as {
        data?: Array<{ id: string; email: string }>;
      };
      const contact = listData.data?.find(
        (c) => c.email === email,
      );
      if (contact) {
        await fetch(
          `https://api.resend.com/audiences/${audienceId}/contacts/${contact.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${resendApiKey}`,
            },
            cache: "no-store",
            signal: AbortSignal.timeout(10_000),
          },
        ).catch(() => null);
      }
    }
  }

  // 2. Notify site owner
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
        text: `Unsubscribe request for: ${email}\nTime: ${new Date().toISOString()}`,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    }).catch(() => null);
  }

  console.log("Unsubscribe processed", { email, time: new Date().toISOString() });

  return NextResponse.json({
    message:
      "You will not receive further emails. We're sorry to see you go.",
  });
}
