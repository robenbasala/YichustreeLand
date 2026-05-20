"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Check, Sparkles } from "lucide-react";
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

function formatDisplayDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function AppointmentBooking() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [saved, setSaved] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const existing = loadAppointment();
    if (existing) {
      setDate(existing.date);
      setTime(existing.time);
      setSaved(true);
    }
    setLoaded(true);
  }, []);

  const canSave = Boolean(date && time);

  const handleSave = async () => {
    if (!canSave || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      await notifyAdmin({ type: "appointment", date, time });
      saveAppointment({ date, time });
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
      className="relative mx-auto w-full max-w-lg"
    >
      <div className="appointment-glow-ring absolute -inset-[2px] rounded-[1.35rem] opacity-90" />
      <div className="appointment-glow-pulse pointer-events-none absolute -inset-4 rounded-[1.75rem] bg-brand-400/20 blur-2xl" />

      <div className="relative rounded-[1.25rem] border border-brand-200/60 bg-white/95 p-6 shadow-card backdrop-blur-sm sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 shadow-[0_0_20px_rgba(46,184,184,0.25)]">
            <Sparkles className="h-5 w-5 text-brand-500" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-600">
              Book a session
            </p>
            <p className="font-display text-lg font-bold text-forest-950">
              Schedule your appointment
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-forest-600">
              Select a date
            </p>
            <AppointmentCalendar
              value={date}
              onChange={(iso) => {
                setDate(iso);
                setSaved(false);
              }}
            />
          </div>

          <div>
            <span className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest-600">
              <Clock className="h-3.5 w-3.5" />
              Select a time
            </span>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {TIME_SLOTS.map((slot) => {
                const selected = time === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => {
                      setTime(slot);
                      setSaved(false);
                    }}
                    className={cn(
                      "rounded-xl border px-2 py-2.5 text-center text-xs font-semibold transition-all sm:text-sm",
                      selected
                        ? "border-brand-500 bg-brand-500 text-white shadow-[0_0_20px_rgba(46,184,184,0.45)]"
                        : "border-brand-100 bg-white text-forest-700 hover:border-brand-300 hover:bg-brand-50 hover:shadow-[0_0_14px_rgba(46,184,184,0.18)]",
                    )}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <p className="text-center text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <Button
            size="lg"
            className="w-full shadow-glow"
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
              "Save appointment"
            )}
          </Button>

          {saved && date && time && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-sm font-medium text-brand-700"
            >
              We emailed our team. {formatDisplayDate(date)} at {time}.
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
