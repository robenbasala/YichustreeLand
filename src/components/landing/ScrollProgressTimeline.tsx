"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { STORY_STEPS } from "@/lib/family-data";
import { cn } from "@/lib/utils";

interface ScrollProgressTimelineProps {
  activeStep: number;
  scrollProgress: MotionValue<number>;
  className?: string;
}

export function ScrollProgressTimeline({
  activeStep,
  scrollProgress,
  className,
}: ScrollProgressTimelineProps) {
  const progressHeight = useTransform(
    scrollProgress,
    [0.08, 0.92],
    ["0%", "100%"]
  );

  return (
    <motion.nav
      className={cn(
        "fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block xl:right-8",
        className
      )}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      aria-label="Story progress"
    >
      <div className="relative flex flex-col gap-0 rounded-full border border-forest-100 bg-white/80 px-3 py-4 shadow-card backdrop-blur-md">
        <motion.div className="absolute left-1/2 top-6 bottom-6 w-0.5 -translate-x-1/2 overflow-hidden rounded-full bg-forest-100">
          <motion.div
            className="w-full origin-top bg-gradient-to-b from-forest-400 to-forest-600"
            style={{ height: progressHeight }}
          />
        </motion.div>

        {STORY_STEPS.map((step) => {
          const isActive = activeStep >= step.id;
          const isCurrent = activeStep === step.id;

          return (
            <div
              key={step.id}
              className="relative flex items-center gap-3 py-2"
            >
              <motion.div
                className={cn(
                  "relative z-10 flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold transition-colors",
                  isActive
                    ? "bg-forest-600 text-white shadow-glow"
                    : "bg-forest-50 text-forest-400"
                )}
                animate={isCurrent ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                transition={{ duration: 1.5, repeat: isCurrent ? Infinity : 0 }}
              >
                {step.id}
              </motion.div>
              <motion.span
                className={cn(
                  "absolute right-full mr-3 whitespace-nowrap text-xs font-medium transition-colors",
                  isActive ? "text-forest-700" : "text-forest-300"
                )}
                animate={{
                  opacity: isCurrent || isActive ? 1 : 0.35,
                }}
              >
                {step.label}
              </motion.span>
            </div>
          );
        })}
      </div>
    </motion.nav>
  );
}
