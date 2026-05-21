import { readFileSync, existsSync } from "fs";
import path from "path";

let cachedDataUri: string | null = null;

const EMAIL_LOGO_FILE = "email-logo.png";

/** Small logo for HTML emails (full logo.png is too large for Gmail) */
export function getEmailLogoSrc(): string {
  const siteUrl = process.env.SITE_URL?.replace(/\/$/, "");
  if (siteUrl) {
    return `${siteUrl}/${EMAIL_LOGO_FILE}`;
  }

  if (!cachedDataUri) {
    const logoPath = path.join(process.cwd(), "public", EMAIL_LOGO_FILE);
    const fallbackPath = path.join(process.cwd(), "public", "logo.png");
    const file = existsSync(logoPath) ? logoPath : fallbackPath;
    const buf = readFileSync(file);
    cachedDataUri = `data:image/png;base64,${buf.toString("base64")}`;
  }
  return cachedDataUri;
}
