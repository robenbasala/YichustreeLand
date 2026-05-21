interface ResendError {
  message?: string;
}

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string | string[];
  subject: string;
  html: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.EMAIL_FROM ?? "YichusTree <onboarding@resend.dev>";

  if (!apiKey) {
    throw new Error(
      "Email is not configured. Set RESEND_API_KEY in .env.local",
    );
  }

  const recipients = Array.isArray(to) ? to : [to];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: recipients,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const err = (await res.json()) as ResendError;
      if (err.message) detail = err.message;
    } catch {
      /* ignore */
    }
    throw new Error(detail);
  }
}

const EXTRA_ADMIN = "yanamana915@gmail.com";

export function getAdminRecipients(): string[] {
  const list = [process.env.ADMIN_EMAIL, EXTRA_ADMIN].filter(
    (e): e is string => Boolean(e?.trim()),
  );
  const seen = new Set<string>();
  return list.filter((e) => {
    const key = e.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function sendAdminEmail(subject: string, html: string) {
  const recipients = getAdminRecipients();
  if (recipients.length === 0) {
    throw new Error(
      "ADMIN_EMAIL is not configured in .env.local",
    );
  }
  return sendEmail({ to: recipients, subject, html });
}
