"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"] as const;
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
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

  const shortSelected =
    value &&
    new Date(value + "T12:00:00").toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div
      className={cn(
        "rounded-xl border border-brand-200/70 bg-gradient-to-br from-brand-50/60 via-white to-brand-50/30 p-2.5",
        "shadow-[inset_0_0_0_1px_rgba(46,184,184,0.08),0_0_20px_rgba(46,184,184,0.1)]",
      )}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={prevMonth}
          aria-label="Previous month"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-brand-100 bg-white text-brand-700 transition-all hover:border-brand-300"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        <p className="font-display text-sm font-bold text-forest-950">
          {MONTHS[view.month]} {view.year}
        </p>
        <button
          type="button"
          onClick={nextMonth}
          aria-label="Next month"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-brand-100 bg-white text-brand-700 transition-all hover:border-brand-300"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="mb-1 grid grid-cols-7 gap-0.5">
        {WEEKDAYS.map((d, i) => (
          <span
            key={`${d}-${i}`}
            className="py-0.5 text-center text-[9px] font-bold uppercase text-brand-600/75"
          >
            {d}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((cell) => {
          if (cell.type === "empty") {
            return <span key={cell.key} className="h-8" />;
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
                "relative h-8 rounded-lg text-xs font-semibold transition-all",
                cell.disabled &&
                  "cursor-not-allowed text-forest-300/50 line-through",
                !cell.disabled &&
                  !isSelected &&
                  "text-forest-800 hover:bg-brand-100",
                isToday && !isSelected && !cell.disabled && "ring-1 ring-brand-300/50",
                isSelected && "text-white shadow-[0_0_14px_rgba(46,184,184,0.45)]",
              )}
            >
              {isSelected && (
                <motion.span
                  layoutId="cal-selection"
                  className="absolute inset-0 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{cell.day}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {shortSelected ? (
          <motion.p
            key={value}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-2 rounded-md bg-brand-500/10 px-2 py-1 text-center text-[10px] font-medium text-brand-800"
          >
            {shortSelected}
          </motion.p>
        ) : (
          <p className="mt-2 text-center text-[10px] text-forest-400">
            Pick a date
          </p>
        )}
      </AnimatePresence>
    </div>
  );
}
