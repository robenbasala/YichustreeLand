"use client";

import { motion, AnimatePresence } from "framer-motion";

/** Tip of pointer SVG (~5.5, 3.5 in 24×24) — align tip to anchor center */
const TIP_OFFSET_X = 6;
const TIP_OFFSET_Y = 5;
const CURSOR_SIZE = 28;

interface SnapShareCursorProps {
  visible: boolean;
  clicking?: boolean;
}

export function SnapShareCursor({
  visible,
  clicking = false,
}: SnapShareCursorProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.span
          className="pointer-events-none absolute z-20"
          style={{
            left: "50%",
            top: "50%",
            width: CURSOR_SIZE,
            height: CURSOR_SIZE,
            marginLeft: -TIP_OFFSET_X,
            marginTop: -TIP_OFFSET_Y,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.span
            className="relative block"
            initial={{ x: 40, y: -22, opacity: 0.5 }}
            animate={{
              x: 0,
              y: clicking ? 2 : 0,
              opacity: 1,
              scale: clicking ? 0.88 : 1,
            }}
            transition={{
              x: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
              y: { duration: 0.12 },
              scale: { duration: 0.12 },
            }}
          >
            <svg
              width={CURSOR_SIZE}
              height={CURSOR_SIZE}
              viewBox="0 0 24 24"
              className="block drop-shadow-md"
              aria-hidden
            >
              <path
                d="M5.5 3.5L18 11.5L11.5 13.5L9.5 20.5L5.5 3.5Z"
                fill="#1e293b"
                stroke="#fff"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
            {clicking && (
              <motion.span
                className="absolute rounded-full border-2 border-teal-500"
                style={{
                  width: 28,
                  height: 28,
                  left: -TIP_OFFSET_X,
                  top: -TIP_OFFSET_Y,
                }}
                initial={{ scale: 0.35, opacity: 0.85 }}
                animate={{ scale: 1.7, opacity: 0 }}
                transition={{ duration: 0.45 }}
              />
            )}
          </motion.span>
        </motion.span>
      )}
    </AnimatePresence>
  );
}
