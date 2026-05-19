"use client";

import { RefObject } from "react";
import { motion } from "framer-motion";
import { SNAP_CHAPTERS } from "@/lib/snap-chapters";
import { cn } from "@/lib/utils";

interface SnapTimelineProps {
  activeIndex: number;
  scrollRef: RefObject<HTMLElement | null>;
}

export function SnapTimeline({ activeIndex, scrollRef }: SnapTimelineProps) {
  const scrollTo = (index: number) => {
    const root = scrollRef.current;
    if (!root) return;
    const section = root.querySelector(`[data-snap-index="${index}"]`);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className="fixed right-3 top-1/2 z-50 hidden -translate-y-1/2 md:block lg:right-6"
      aria-label="Story steps"
    >
      <div className="relative flex flex-col gap-0 rounded-full border border-forest-100 bg-white/85 py-3 pl-3 pr-2 shadow-card backdrop-blur-lg">
        <div
          className="absolute bottom-3 left-[18px] top-3 w-0.5 rounded-full bg-forest-100"
          aria-hidden
        >
          <motion.div
            className="w-full origin-top rounded-full bg-gradient-to-b from-forest-400 to-forest-600"
            animate={{
              height: `${((activeIndex + 1) / SNAP_CHAPTERS.length) * 100}%`,
            }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {SNAP_CHAPTERS.map((ch, i) => {
          const isActive = i <= activeIndex;
          const isCurrent = i === activeIndex;
          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => scrollTo(i)}
              className="relative flex items-center gap-2.5 py-1.5 text-left"
              aria-current={isCurrent ? "step" : undefined}
            >
              <motion.span
                className={cn(
                  "relative z-10 flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold",
                  isActive ? "bg-forest-600 text-white" : "bg-forest-50 text-forest-400"
                )}
                animate={{ scale: isCurrent ? 1.2 : 1 }}
              >
                {i + 1}
              </motion.span>
              <span
                className={cn(
                  "absolute right-full mr-2 whitespace-nowrap text-[10px] font-medium",
                  isCurrent ? "text-forest-800" : isActive ? "text-forest-600" : "text-forest-300"
                )}
              >
                {ch.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
