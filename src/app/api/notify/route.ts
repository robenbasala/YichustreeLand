import { NextResponse } from "next/server";
import {
  appointmentAdminHtml,
  appointmentUserHtml,
  contactAdminHtml,
  contactUserHtml,
} from "@/lib/email-templates";
import { sendAdminEmail, sendEmail } from "@/lib/send-email";

function formatAppointmentDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const type = body?.type as string;

    if (type === "appointment") {
      const name = String(body.name ?? "").trim();
      const email = String(body.email ?? "").trim();
      const phone = String(body.phone ?? "").trim();
      const date = String(body.date ?? "").trim();
      const time = String(body.time ?? "").trim();

      if (!name || !email.includes("@") || normalizePhone(phone).length < 7) {
        return NextResponse.json(
          { error: "Name, valid email, and phone are required" },
          { status: 400 },
        );
      }
      if (!date || !time) {
        return NextResponse.json(
          { error: "Date and time are required" },
          { status: 400 },
        );
      }

      const details = {
        name,
        email,
        phone,
        dateFormatted: formatAppointmentDate(date),
        time,
      };

      const adminHtml = appointmentAdminHtml(details);
      const userHtml = appointmentUserHtml(details);

      await sendAdminEmail(
        `New appointment — ${name} · ${date} ${time}`,
        adminHtml,
      );
      await sendEmail({
        to: email,
        subject: "Your YichusTree appointment is booked",
        html: userHtml,
      });

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
        contactAdminHtml(name, email, message),
      );
      await sendEmail({
        to: email,
        subject: "We received your message — YichusTree",
        html: contactUserHtml(name, email, message),
      });

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
