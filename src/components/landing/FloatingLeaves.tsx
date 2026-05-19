"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingLeavesProps {
  className?: string;
  count?: number;
}

function Leaf({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.svg
      viewBox="0 0 24 36"
      className={cn("text-forest-300/40", className)}
      animate={{
        y: [0, -20, 0],
        x: [0, 8, 0],
        rotate: [0, 15, -5, 0],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 6 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <path
        d="M12 2C8 8 4 14 4 22C4 28 8 34 12 34C16 34 20 28 20 22C20 14 16 8 12 2Z"
        fill="currentColor"
      />
      <path
        d="M12 6V30"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.5"
      />
    </motion.svg>
  );
}

export function FloatingLeaves({ className, count = 8 }: FloatingLeavesProps) {
  const positions = [
    "top-[10%] left-[5%]",
    "top-[20%] right-[8%]",
    "top-[45%] left-[3%]",
    "top-[60%] right-[5%]",
    "bottom-[30%] left-[10%]",
    "bottom-[20%] right-[12%]",
    "top-[35%] right-[20%]",
    "bottom-[40%] left-[18%]",
  ];

  return (
    <motion.div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      {positions.slice(0, count).map((pos, i) => (
        <Leaf
          key={i}
          className={cn("absolute h-8 w-5 sm:h-10 sm:w-6", pos)}
          delay={i * 0.7}
        />
      ))}

      {/* Soft gradient orbs */}
      <motion.div
        className="absolute top-1/4 -left-20 h-64 w-64 rounded-full bg-forest-200/30 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-20 h-80 w-80 rounded-full bg-forest-100/40 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
    </motion.div>
  );
}
