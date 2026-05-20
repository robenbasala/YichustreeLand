"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function toIso(y: number, m: number, d: number) {
  return `${y}-${pad(m + 1)}-${pad(d)}`;
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

interface AppointmentCalendarProps {
  value: string;
  onChange: (iso: string) => void;
}

export function AppointmentCalendar({ value, onChange }: AppointmentCalendarProps) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [view, setView] = useState(() => {
    const base = value ? new Date(value + "T12:00:00") : today;
    return { year: base.getFullYear(), month: base.getMonth() };
  });

  const cells = useMemo(() => {
    const first = new Date(view.year, view.month, 1);
    const startPad = first.getDay();
    const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
    const rows: Array<
      | { type: "empty"; key: string }
      | { type: "day"; key: string; day: number; iso: string; disabled: boolean }
    > = [];

    for (let i = 0; i < startPad; i++) {
      rows.push({ type: "empty", key: `e-${i}` });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const iso = toIso(view.year, view.month, d);
      const cellDate = new Date(view.year, view.month, d);
      rows.push({
        type: "day",
        key: iso,
        day: d,
        iso,
        disabled: cellDate < today,
      });
    }
    return rows;
  }, [view.year, view.month, today]);

  const prevMonth = () => {
    setView((v) => {
      if (v.month === 0) return { year: v.year - 1, month: 11 };
      return { ...v, month: v.month - 1 };
    });
  };

  const nextMonth = () => {
    setView((v) => {
      if (v.month === 11) return { year: v.year + 1, month: 0 };
      return { ...v, month: v.month + 1 };
    });
  };

  const formattedSelected =
    value &&
    new Date(value + "T12:00:00").toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div
      className={cn(
        "rounded-2xl border border-brand-200/70 bg-gradient-to-br from-brand-50/80 via-white to-brand-50/40 p-4",
        "shadow-[inset_0_0_0_1px_rgba(46,184,184,0.1),0_0_32px_rgba(46,184,184,0.14)]",
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={prevMonth}
          aria-label="Previous month"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-100 bg-white text-brand-700 transition-all hover:border-brand-300 hover:shadow-[0_0_12px_rgba(46,184,184,0.2)]"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="font-display text-base font-bold text-forest-950">
          {MONTHS[view.month]} {view.year}
        </p>
        <button
          type="button"
          onClick={nextMonth}
          aria-label="Next month"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-100 bg-white text-brand-700 transition-all hover:border-brand-300 hover:shadow-[0_0_12px_rgba(46,184,184,0.2)]"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((d) => (
          <span
            key={d}
            className="py-1 text-center text-[10px] font-bold uppercase tracking-wider text-brand-600/80"
          >
            {d}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((cell) => {
          if (cell.type === "empty") {
            return <span key={cell.key} className="aspect-square" />;
          }

          const isSelected = value === cell.iso;
          const isToday =
            cell.iso ===
            toIso(today.getFullYear(), today.getMonth(), today.getDate());

          return (
            <button
              key={cell.key}
              type="button"
              disabled={cell.disabled}
              onClick={() => onChange(cell.iso)}
              className={cn(
                "relative aspect-square rounded-xl text-sm font-semibold transition-all",
                cell.disabled &&
                  "cursor-not-allowed text-forest-300/60 line-through decoration-forest-200",
                !cell.disabled &&
                  !isSelected &&
                  "text-forest-800 hover:bg-brand-100 hover:shadow-[0_0_14px_rgba(46,184,184,0.2)]",
                isToday &&
                  !isSelected &&
                  !cell.disabled &&
                  "ring-1 ring-brand-300/60",
                isSelected &&
                  "text-white shadow-[0_0_22px_rgba(46,184,184,0.55)] ring-2 ring-brand-400/90",
              )}
            >
              {isSelected && (
                <motion.span
                  layoutId="cal-selection"
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-[0_0_18px_rgba(46,184,184,0.5)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{cell.day}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {formattedSelected ? (
          <motion.p
            key={value}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 rounded-lg bg-brand-500/10 px-3 py-2 text-center text-xs font-medium text-brand-800"
          >
            Selected: {formattedSelected}
          </motion.p>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-xs text-forest-500"
          >
            Pick an available date
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
