"use client";

import { motion, AnimatePresence } from "framer-motion";

export const REMINDER_PHONE = { w: 176, h: 212 } as const;

interface SnapReminderPhoneProps {
  x: number;
  y: number;
  visible: boolean;
}

export function SnapReminderPhone({ x, y, visible }: SnapReminderPhoneProps) {
  const { w, h } = REMINDER_PHONE;

  return (
    <AnimatePresence>
      {visible && (
        <foreignObject
          x={x - w / 2}
          y={y}
          width={w}
          height={h}
          className="overflow-visible"
        >
          <div style={{ width: w, height: h, boxSizing: "border-box" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                borderRadius: 18,
                border: "1px solid #cbd5e1",
                background: "#0f172a",
                boxShadow: "0 10px 28px rgba(15,23,42,0.2)",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 12px 4px",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: "#ffffff",
                  }}
                >
                  9:41
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 14,
                    height: 7,
                    borderRadius: 2,
                    background: "rgba(255,255,255,0.9)",
                  }}
                />
              </div>

              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  background: "#ffffff",
                  minHeight: 0,
                }}
              >
                <div
                  style={{
                    padding: "8px 12px",
                    borderBottom: "1px solid #f1f5f9",
                    background: "#f8fafc",
                    flexShrink: 0,
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#0f172a",
                    }}
                  >
                    Messages
                  </p>
                  <p
                    style={{
                      margin: "2px 0 0",
                      fontSize: 9,
                      color: "#64748b",
                    }}
                  >
                    Family Reminders
                  </p>
                </div>

                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: 10,
                    background:
                      "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
                    minHeight: 100,
                  }}
                >
                  <div
                    style={{
                      background: "#0d9488",
                      borderRadius: 14,
                      borderBottomLeftRadius: 4,
                      padding: "10px 12px",
                      boxShadow: "0 2px 8px rgba(13,148,136,0.25)",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: 11,
                        fontWeight: 600,
                        lineHeight: 1.45,
                        color: "#ffffff",
                      }}
                    >
                      Mosheh, happy birthday Avraham and Rachel!
                    </p>
                    <p
                      style={{
                        margin: "6px 0 0",
                        fontSize: 9,
                        fontWeight: 500,
                        color: "#99f6e4",
                        textAlign: "right",
                      }}
                    >
                      Just now
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "6px 0 8px",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 4,
                      borderRadius: 999,
                      background: "#cbd5e1",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </foreignObject>
      )}
    </AnimatePresence>
  );
}
