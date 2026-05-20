"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { SnapShareCursor } from "./SnapShareCursor";

function StatusLight({ green }: { green: boolean }) {
  return (
    <span className="relative inline-flex h-3 w-3 shrink-0">
      <span
        className={cn(
          "absolute inline-flex h-full w-full rounded-full animate-ping",
          green ? "bg-emerald-400" : "bg-amber-400",
        )}
        style={{ animationDuration: green ? "1.2s" : "0.85s" }}
      />
      <span
        className={cn(
          "relative inline-flex h-3 w-3 rounded-full",
          green
            ? "bg-emerald-500 shadow-[0_0_8px_#34d399]"
            : "bg-amber-400 shadow-[0_0_8px_#fbbf24]",
        )}
      />
    </span>
  );
}

interface SnapConnectRequestProps {
  leftPct: number;
  topPct: number;
  width?: number;
  visible: boolean;
  lightGreen: boolean;
  confirmPressed?: boolean;
  showCursor?: boolean;
  cursorClick?: boolean;
}

export function SnapConnectRequest({
  leftPct,
  topPct,
  width = 220,
  visible,
  lightGreen,
  confirmPressed = false,
  showCursor = false,
  cursorClick = false,
}: SnapConnectRequestProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-auto absolute z-[80]"
          style={{
            left: `${leftPct}%`,
            top: `${topPct}%`,
            width,
            transform: "translate(0, 0)",
          }}
          initial={{ opacity: 0, x: 24, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 12, scale: 0.94 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className={cn(
              "rounded-xl border border-teal-300/50 bg-white/98 p-3 shadow-lg",
              "shadow-[0_0_0_1px_rgba(45,184,184,0.12),0_0_24px_rgba(45,184,184,0.22),0_8px_24px_rgba(15,23,42,0.1)]",
            )}
          >
            <div className="mb-2 flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50">
                <Link2 className="h-4 w-4 text-teal-600" strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
                  Connect
                </p>
                <div className="mt-1 flex items-center gap-1.5">
                  <StatusLight green={lightGreen} />
                  <span className="text-xs font-medium text-slate-500">
                    {lightGreen ? "Approved" : "Pending"}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm font-semibold leading-snug text-slate-900">
              Sarah wants to connect her tree to yours.
            </p>
            <p className="mt-1 text-xs font-medium text-slate-500">
              Do you agree?
            </p>

            <div className="mt-3 flex gap-2">
              <span className="flex-1 rounded-lg border border-slate-200 bg-white py-2 text-center text-xs font-semibold text-slate-500">
                Cancel
              </span>
              <motion.span
                className={cn(
                  "relative flex-1 rounded-lg py-2 text-center text-xs font-semibold text-white",
                  lightGreen
                    ? "bg-emerald-600 shadow-[0_0_12px_rgba(16,185,129,0.45)]"
                    : "bg-teal-600 shadow-[0_0_10px_rgba(13,148,136,0.35)]",
                )}
                animate={
                  confirmPressed
                    ? lightGreen
                      ? { scale: [0.9, 1.04, 1] }
                      : { scale: 0.9 }
                    : { scale: 1 }
                }
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  boxShadow: confirmPressed && !lightGreen
                    ? "0 0 0 3px rgba(45,184,184,0.45), 0 0 16px rgba(13,148,136,0.5)"
                    : undefined,
                }}
              >
                Confirm
                <SnapShareCursor
                  visible={showCursor}
                  clicking={cursorClick}
                />
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
