"use client";

import { motion, AnimatePresence } from "framer-motion";

export const BIRTHDAY_BADGE = { w: 268, h: 58 } as const;

function PartyHatIcon() {
  return (
    <svg
      width={34}
      height={34}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M6 22 L16 6 L26 22 Z"
        fill="#fb923c"
        stroke="#ea580c"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
      <path
        d="M6 22 H26"
        stroke="#ea580c"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <circle cx={16} cy={6} r={3} fill="#fbbf24" stroke="#f59e0b" strokeWidth={1} />
      <path
        d="M9 20 Q12 18 16 19 Q20 18 23 20"
        stroke="#fff"
        strokeWidth={1.2}
        strokeLinecap="round"
        opacity={0.7}
      />
      <circle cx={11} cy={19} r={1} fill="#fef3c7" />
      <circle cx={16} cy={18.5} r={1} fill="#fde68a" />
      <circle cx={21} cy={19} r={1} fill="#fef3c7" />
    </svg>
  );
}

interface SnapBirthdayBadgeProps {
  x: number;
  y: number;
  visible: boolean;
  dismissing?: boolean;
}

export function SnapBirthdayBadge({
  x,
  y,
  visible,
  dismissing = false,
}: SnapBirthdayBadgeProps) {
  const { w, h } = BIRTHDAY_BADGE;

  return (
    <AnimatePresence>
      {visible && (
        <foreignObject
          x={x - w / 2}
          y={y}
          width={w}
          height={h}
          className="overflow-visible"
          data-reminder-badge
        >
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.88 }}
            animate={
              dismissing
                ? { opacity: 0, scale: 0.9, y: 6 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-full w-full items-center gap-3 rounded-xl border border-orange-300/90 px-3.5 py-2.5 shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, #fff7ed 0%, #ffedd5 55%, #fed7aa 100%)",
              boxShadow:
                "0 0 0 1px rgba(251,146,60,0.25), 0 8px 24px rgba(234,88,12,0.18), 0 0 20px rgba(251,146,60,0.35)",
            }}
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
              style={{ background: "rgba(255,255,255,0.65)" }}
            >
              <PartyHatIcon />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-orange-600">
                Birthday reminder
              </p>
              <p className="text-[13px] font-semibold leading-snug text-orange-950">
                3 days until his birthday
              </p>
            </div>
          </motion.div>
        </foreignObject>
      )}
    </AnimatePresence>
  );
}
