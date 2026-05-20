interface ResendError {
  message?: string;
}

export async function sendAdminEmail(subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ADMIN_EMAIL;
  const from =
    process.env.EMAIL_FROM ?? "YichusTree <onboarding@resend.dev>";

  if (!apiKey || !to) {
    throw new Error(
      "Email is not configured. Set RESEND_API_KEY and ADMIN_EMAIL in .env.local",
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
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
