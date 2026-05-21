export type NotifyAppointment = {
  type: "appointment";
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
};

export type NotifyContact = {
  type: "contact";
  name: string;
  email: string;
  message: string;
};

export type NotifyPayload = NotifyAppointment | NotifyContact;

export async function notifyAdmin(payload: NotifyPayload): Promise<void> {
  const res = await fetch("/api/notify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await res.json().catch(() => ({}))) as { error?: string };

  if (!res.ok) {
    throw new Error(data.error ?? "Could not send notification");
  }
}
