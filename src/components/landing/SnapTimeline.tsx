"use client";

import { RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SNAP_CHAPTERS } from "@/lib/snap-chapters";
import { cn } from "@/lib/utils";

interface SnapTimelineProps {
  activeIndex: number;
  scrollRef: RefObject<HTMLElement | null>;
}

const STEP_COUNT = SNAP_CHAPTERS.length;

export function SnapTimeline({ activeIndex, scrollRef }: SnapTimelineProps) {
  const scrollTo = (index: number) => {
    const root = scrollRef.current;
    if (!root) return;
    const section = root.querySelector(`[data-snap-index="${index}"]`);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const progress =
    STEP_COUNT > 1 ? (activeIndex / (STEP_COUNT - 1)) * 100 : 0;

  return (
    <nav
      className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 md:block lg:right-8"
      aria-label="Story steps"
    >
      <div className="relative flex min-h-[min(72vh,520px)] flex-col justify-between py-2">
        {/* Track */}
        <div
          className="absolute bottom-2 right-[11px] top-2 w-px bg-forest-100"
          aria-hidden
        />
        <motion.div
          className="absolute right-[11px] top-2 w-px origin-top bg-forest-500"
          aria-hidden
          animate={{ height: `${progress}%` }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />

        {SNAP_CHAPTERS.map((ch, i) => {
          const isCurrent = i === activeIndex;
          const isPast = i < activeIndex;

          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => scrollTo(i)}
              className="group relative flex min-h-[52px] items-center justify-end gap-4"
              aria-current={isCurrent ? "step" : undefined}
              aria-label={`${ch.label}, step ${i + 1}`}
            >
              <div className="flex h-6 min-w-[88px] items-center justify-end">
                <AnimatePresence mode="wait">
                  {isCurrent && (
                    <motion.span
                      key={ch.id}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.25 }}
                      className="whitespace-nowrap text-sm font-semibold tracking-tight text-forest-900"
                    >
                      {ch.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <motion.span
                className={cn(
                  "relative z-10 flex shrink-0 items-center justify-center rounded-full border-2 font-semibold transition-colors",
                  isCurrent
                    ? "h-7 w-7 border-forest-600 bg-forest-600 text-[11px] text-white shadow-md"
                    : isPast
                      ? "h-5 w-5 border-forest-400 bg-forest-500 text-[9px] text-white"
                      : "h-5 w-5 border-forest-200 bg-white text-[9px] text-forest-400 group-hover:border-forest-300"
                )}
                animate={{ scale: isCurrent ? 1 : 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
              >
                {i + 1}
              </motion.span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
