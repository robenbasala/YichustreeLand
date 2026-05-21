"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Check, Sparkles, User, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AppointmentCalendar } from "./AppointmentCalendar";
import {
  loadAppointment,
  saveAppointment,
} from "@/lib/client-storage";
import { notifyAdmin } from "@/lib/notify-admin";

const TIME_SLOTS = [
  "09:00 AM",
  "10:30 AM",
  "12:00 PM",
  "01:30 PM",
  "03:00 PM",
  "04:30 PM",
  "06:00 PM",
];

const inputClass =
  "w-full rounded-lg border border-brand-100 bg-white px-3 py-2 text-sm text-forest-900 outline-none transition-shadow focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30";

function formatDisplayDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function phoneValid(phone: string) {
  return phone.replace(/\D/g, "").length >= 7;
}

export function AppointmentBooking() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [saved, setSaved] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const existing = loadAppointment();
    if (existing) {
      setName(existing.name);
      setEmail(existing.email);
      setPhone(existing.phone);
      setDate(existing.date);
      setTime(existing.time);
      setSaved(true);
    }
    setLoaded(true);
  }, []);

  const canSave =
    name.trim().length > 0 &&
    email.includes("@") &&
    phoneValid(phone) &&
    Boolean(date && time);

  const resetSaved = () => setSaved(false);

  const handleSave = async () => {
    if (!canSave || submitting) return;
    setSubmitting(true);
    setError(null);
    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      date,
      time,
    };
    try {
      await notifyAdmin({ type: "appointment", ...payload });
      saveAppointment(payload);
      setSaved(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not send appointment. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!loaded) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-2xl"
    >
      <div className="appointment-glow-ring absolute -inset-[2px] rounded-[1.35rem] opacity-90" />
      <div className="appointment-glow-pulse pointer-events-none absolute -inset-4 rounded-[1.75rem] bg-brand-400/20 blur-2xl" />

      <div className="relative rounded-[1.25rem] border border-brand-200/60 bg-white/95 p-5 shadow-card backdrop-blur-sm sm:p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 shadow-[0_0_16px_rgba(46,184,184,0.22)]">
            <Sparkles className="h-4 w-4 text-brand-500" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-600">
              Book a session
            </p>
            <p className="font-display text-base font-bold text-forest-950">
              Schedule your appointment
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-forest-600">
                <User className="h-3 w-3" />
                Full name
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  resetSaved();
                }}
                className={inputClass}
                placeholder="Your name"
                autoComplete="name"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-forest-600">
                <Mail className="h-3 w-3" />
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  resetSaved();
                }}
                className={inputClass}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-forest-600">
                <Phone className="h-3 w-3" />
                Mobile
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  resetSaved();
                }}
                className={inputClass}
                placeholder="+1 555 000 0000"
                autoComplete="tel"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:items-start">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-forest-600">
                Date
              </p>
              <AppointmentCalendar
                value={date}
                onChange={(iso) => {
                  setDate(iso);
                  resetSaved();
                }}
              />
            </div>

            <div>
              <span className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-forest-600">
                <Clock className="h-3 w-3" />
                Time
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {TIME_SLOTS.map((slot) => {
                  const selected = time === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        setTime(slot);
                        resetSaved();
                      }}
                      className={cn(
                        "rounded-lg border px-1.5 py-2 text-center text-[11px] font-semibold transition-all",
                        selected
                          ? "border-brand-500 bg-brand-500 text-white shadow-[0_0_14px_rgba(46,184,184,0.4)]"
                          : "border-brand-100 bg-white text-forest-700 hover:border-brand-300 hover:bg-brand-50",
                      )}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {error && (
            <p className="text-center text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <Button
            size="lg"
            className="h-14 w-full min-w-full px-10 text-base font-semibold shadow-glow"
            disabled={!canSave || saved || submitting}
            onClick={handleSave}
          >
            {saved ? (
              <>
                <Check className="h-5 w-5" />
                Appointment sent
              </>
            ) : submitting ? (
              "Sending…"
            ) : (
              "Confirm appointment"
            )}
          </Button>

          {saved && date && time && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-sm font-medium text-brand-700"
            >
              Confirmation sent to {email}. {formatDisplayDate(date)} at {time}.
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
