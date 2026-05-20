"use client";

import { motion, AnimatePresence } from "framer-motion";

interface SnapReminderCursorProps {
  targetX: number;
  targetY: number;
  visible: boolean;
  clicking?: boolean;
}

export function SnapReminderCursor({
  targetX,
  targetY,
  visible,
  clicking = false,
}: SnapReminderCursorProps) {
  const size = 28;
  const startX = targetX + 90;
  const startY = targetY - 20;

  return (
    <AnimatePresence>
      {visible && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.g
            initial={{ x: startX, y: startY }}
            animate={{
              x: clicking ? targetX + 8 : targetX + 24,
              y: clicking ? targetY + 6 : targetY + 4,
              scale: clicking ? 0.88 : 1,
            }}
            transition={{
              x: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
              y: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 0.12 },
            }}
          >
            <foreignObject
              x={-size / 2}
              y={-size / 2}
              width={size}
              height={size}
              className="overflow-visible"
            >
              <svg
                viewBox="0 0 24 24"
                width={size}
                height={size}
                className="drop-shadow-md"
              >
                <path
                  d="M5.5 3.5L18 11.5L11.5 13.5L9.5 20.5L5.5 3.5Z"
                  fill="#1e293b"
                  stroke="#fff"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>
            </foreignObject>
            {clicking && (
              <motion.circle
                cx={0}
                cy={0}
                r={14}
                fill="none"
                stroke="#2eb8b8"
                strokeWidth={2}
                initial={{ scale: 0.4, opacity: 0.8 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{ duration: 0.45 }}
              />
            )}
          </motion.g>
        </motion.g>
      )}
    </AnimatePresence>
  );
}
