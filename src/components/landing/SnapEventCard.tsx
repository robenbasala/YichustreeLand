"use client";

import { motion } from "framer-motion";
import type { TreeEvent } from "@/lib/tree-layout";

interface SnapEventCardProps {
  event: TreeEvent;
  x: number;
  y: number;
  width: number;
  height: number;
  isNew?: boolean;
  delay?: number;
  onSeen?: () => void;
}

export function SnapEventCard({
  event,
  x,
  y,
  width,
  height,
  isNew = true,
  delay = 0,
  onSeen,
}: SnapEventCardProps) {
  const glowSoft = `0 0 16px ${event.glow}, 0 0 32px ${event.glow}, 0 4px 14px rgba(15, 23, 42, 0.06)`;
  const glowStrong = `0 0 28px ${event.glow}, 0 0 52px ${event.glow}, 0 4px 14px rgba(15, 23, 42, 0.08)`;

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      className="pointer-events-none overflow-visible"
    >
      <motion.div
        initial={isNew ? { opacity: 0, scale: 0.7, y: 12 } : false}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          boxShadow: [glowSoft, glowStrong, glowSoft],
        }}
        transition={{
          opacity: { type: "spring", stiffness: 220, damping: 20, delay },
          scale: { type: "spring", stiffness: 220, damping: 20, delay },
          y: { type: "spring", stiffness: 220, damping: 20, delay },
          boxShadow: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
        }}
        onAnimationComplete={() => {
          if (isNew) onSeen?.();
        }}
        className="flex h-full w-full flex-col justify-center rounded-xl border-2 px-3 py-2.5"
        style={{
          borderColor: event.color,
          backgroundColor: "rgba(255, 255, 255, 0.92)",
        }}
      >
        <p
          className="text-[11px] font-bold uppercase tracking-[0.2em]"
          style={{ color: event.color }}
        >
          Event
        </p>
        <p className="mt-1 text-[20px] font-bold leading-tight text-forest-950">
          {event.title}
        </p>
        <p className="mt-1.5 text-[15px] font-semibold text-forest-800">
          {event.date}
        </p>
        <p
          className="mt-1 text-[13px] font-medium leading-snug"
          style={{ color: event.color }}
        >
          {event.parashah}
        </p>
      </motion.div>
    </foreignObject>
  );
}
