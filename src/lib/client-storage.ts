export const STORAGE_KEYS = {
  appointment: "yichus-appointment",
  contact: "yichus-contact-messages",
} as const;

export interface SavedAppointment {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  savedAt: number;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  sentAt: number;
}

function readJson<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown): boolean {
  if (typeof window === "undefined") return false;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function loadAppointment(): SavedAppointment | null {
  const data = readJson<SavedAppointment>(STORAGE_KEYS.appointment);
  if (!data?.date || !data?.time || !data?.name || !data?.email) return null;
  return data;
}

export function saveAppointment(
  appointment: Omit<SavedAppointment, "savedAt">,
): boolean {
  return writeJson(STORAGE_KEYS.appointment, {
    ...appointment,
    savedAt: Date.now(),
  });
}

export function loadContactMessages(): ContactMessage[] {
  const list = readJson<ContactMessage[]>(STORAGE_KEYS.contact);
  return Array.isArray(list) ? list : [];
}

export function saveContactMessage(
  message: Omit<ContactMessage, "sentAt">,
): boolean {
  const existing = loadContactMessages();
  return writeJson(STORAGE_KEYS.contact, [
    ...existing,
    { ...message, sentAt: Date.now() },
  ]);
}
