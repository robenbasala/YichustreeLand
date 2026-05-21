import { getEmailLogoSrc } from "./email-logo";

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export interface AppointmentDetails {
  name: string;
  email: string;
  phone: string;
  dateFormatted: string;
  time: string;
}

const BRAND = {
  teal: "#2eb8b8",
  tealDark: "#1f9e9e",
  forest: "#14532d",
  muted: "#64748b",
  bg: "#f0fdfa",
};

function emailShell(title: string, body: string) {
  const logoSrc = getEmailLogoSrc();
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 12px 40px rgba(15,118,110,0.12);">
          <tr>
            <td style="background:linear-gradient(135deg,${BRAND.teal} 0%,${BRAND.tealDark} 100%);padding:24px 32px 28px;text-align:center;">
              <img src="${logoSrc}" alt="YichusTree" width="120" style="display:block;margin:0 auto 12px;max-width:120px;height:auto;border:0;" />
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;line-height:1.3;font-family:Georgia,'Times New Roman',serif;">${escapeHtml(title)}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;font-family:system-ui,-apple-system,sans-serif;font-size:15px;line-height:1.6;color:#334155;">
              ${body}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 28px;background:${BRAND.bg};text-align:center;border-top:1px solid #ccfbf1;">
              <p style="margin:0;font-size:12px;color:${BRAND.muted};font-family:system-ui,sans-serif;">
                Preserve your Jewish family story — <strong style="color:${BRAND.tealDark};">YichusTree</strong>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function detailRow(label: string, value: string) {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;">
      <span style="display:block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:${BRAND.muted};margin-bottom:4px;">${escapeHtml(label)}</span>
      <span style="font-size:16px;font-weight:600;color:${BRAND.forest};">${escapeHtml(value)}</span>
    </td>
  </tr>`;
}

export function appointmentAdminHtml(d: AppointmentDetails) {
  const body = `
    <p style="margin:0 0 20px;color:${BRAND.muted};">A new session was booked on your site.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};border-radius:14px;padding:4px 20px;border:1px solid #99f6e4;">
      ${detailRow("Name", d.name)}
      ${detailRow("Email", d.email)}
      ${detailRow("Phone", d.phone)}
      ${detailRow("Date", d.dateFormatted)}
      ${detailRow("Time", d.time)}
    </table>
    <p style="margin:24px 0 0;text-align:center;">
      <a href="mailto:${escapeHtml(d.email)}" style="display:inline-block;background:${BRAND.teal};color:#fff;text-decoration:none;padding:12px 28px;border-radius:10px;font-weight:600;font-size:14px;">Reply to ${escapeHtml(d.name)}</a>
    </p>`;
  return emailShell("New appointment", body);
}

export function appointmentUserHtml(d: AppointmentDetails) {
  const firstName = d.name.split(/\s+/)[0] || d.name;
  const body = `
    <p style="margin:0 0 8px;font-size:17px;color:${BRAND.forest};">Hi ${escapeHtml(firstName)},</p>
    <p style="margin:0 0 24px;color:${BRAND.muted};">Thank you for booking with YichusTree. Your session is reserved — our team will confirm shortly.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(180deg,#f0fdfa 0%,#ffffff 100%);border-radius:14px;border:2px solid ${BRAND.teal};padding:4px 20px;">
      ${detailRow("Date", d.dateFormatted)}
      ${detailRow("Time", d.time)}
      ${detailRow("Phone", d.phone)}
    </table>
    <p style="margin:24px 0 0;font-size:14px;color:${BRAND.muted};">If you need to reschedule, reply to this email or contact us through the website.</p>
    <p style="margin:16px 0 0;font-size:14px;color:${BRAND.forest};font-weight:600;">We look forward to helping you build your family legacy.</p>`;
  return emailShell("Your appointment is booked", body);
}

export function contactAdminHtml(
  name: string,
  email: string,
  message: string,
) {
  const body = `
    <p style="margin:0 0 20px;color:${BRAND.muted};">New message from the contact form.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};border-radius:14px;padding:4px 20px;border:1px solid #99f6e4;">
      ${detailRow("Name", name)}
      ${detailRow("Email", email)}
      <tr>
        <td style="padding:10px 0;">
          <span style="display:block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:${BRAND.muted};margin-bottom:8px;">Message</span>
          <p style="margin:0;font-size:15px;line-height:1.55;color:#334155;white-space:pre-wrap;">${escapeHtml(message)}</p>
        </td>
      </tr>
    </table>
    <p style="margin:24px 0 0;text-align:center;">
      <a href="mailto:${escapeHtml(email)}" style="display:inline-block;background:${BRAND.teal};color:#fff;text-decoration:none;padding:12px 28px;border-radius:10px;font-weight:600;font-size:14px;">Reply to ${escapeHtml(name)}</a>
    </p>`;
  return emailShell("New contact message", body);
}

export function contactUserHtml(
  name: string,
  email: string,
  message: string,
) {
  const firstName = name.split(/\s+/)[0] || name;
  const body = `
    <p style="margin:0 0 8px;font-size:17px;color:${BRAND.forest};">Hi ${escapeHtml(firstName)},</p>
    <p style="margin:0 0 24px;color:${BRAND.muted};">Thank you for reaching out to YichusTree. We received your message and will reply soon.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(180deg,#f0fdfa 0%,#ffffff 100%);border-radius:14px;border:2px solid ${BRAND.teal};padding:4px 20px;">
      ${detailRow("Your email", email)}
      <tr>
        <td style="padding:10px 0;">
          <span style="display:block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:${BRAND.muted};margin-bottom:8px;">Your message</span>
          <p style="margin:0;font-size:15px;line-height:1.55;color:#334155;white-space:pre-wrap;">${escapeHtml(message)}</p>
        </td>
      </tr>
    </table>
    <p style="margin:24px 0 0;font-size:14px;color:${BRAND.muted};">If you have urgent questions, simply reply to this email.</p>
    <p style="margin:16px 0 0;font-size:14px;color:${BRAND.forest};font-weight:600;">— The YichusTree team</p>`;
  return emailShell("We received your message", body);
}
