import { NextResponse } from "next/server";
import { sendAdminEmail } from "@/lib/send-admin-email";

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatAppointmentDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const type = body?.type as string;

    if (type === "appointment") {
      const date = String(body.date ?? "").trim();
      const time = String(body.time ?? "").trim();
      if (!date || !time) {
        return NextResponse.json(
          { error: "Date and time are required" },
          { status: 400 },
        );
      }

      await sendAdminEmail(
        `New appointment — ${date} ${time}`,
        `
          <h2>New YichusTree appointment</h2>
          <p><strong>Date:</strong> ${escapeHtml(formatAppointmentDate(date))}</p>
          <p><strong>Time:</strong> ${escapeHtml(time)}</p>
          <p style="color:#64748b;font-size:12px">Sent from the booking form on yichustree.com</p>
        `,
      );

      return NextResponse.json({ ok: true });
    }

    if (type === "contact") {
      const name = String(body.name ?? "").trim();
      const email = String(body.email ?? "").trim();
      const message = String(body.message ?? "").trim();

      if (!name || !email.includes("@") || !message) {
        return NextResponse.json(
          { error: "Name, email, and message are required" },
          { status: 400 },
        );
      }

      await sendAdminEmail(
        `Contact form — ${name}`,
        `
          <h2>New contact message</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
          <p style="color:#64748b;font-size:12px">Reply directly to ${escapeHtml(email)}</p>
        `,
      );

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Invalid notification type" }, { status: 400 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to send email";
    console.error("[notify]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
