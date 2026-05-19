"use client";

import { motion } from "framer-motion";
import { Bell, Mail, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReminderNotificationProps {
  visible: boolean;
  x?: number;
  y?: number;
  className?: string;
  inline?: boolean;
}

export function ReminderNotification({
  visible,
  x = 0,
  y = 0,
  className,
  inline = false,
}: ReminderNotificationProps) {
  const content = (
    <motion.div
      className={cn(
        "rounded-2xl border border-forest-100 bg-white/95 backdrop-blur-md shadow-card-hover p-4 min-w-[220px]",
        className
      )}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.8,
        y: visible ? 0 : 20,
        x: visible ? 0 : 30,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
    >
      <div className="flex items-start gap-3">
        <motion.div
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-100 text-forest-600"
          animate={visible ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Bell className="h-5 w-5" />
        </motion.div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-forest-500" />
            <p className="text-xs font-semibold text-forest-800">Yahrzeit reminder sent</p>
          </div>
          <p className="mt-1 text-[11px] text-forest-500">
            Miriam Levy — 15 Cheshvan · candle lighting
          </p>
          <motion.div
            className="mt-2 flex items-center gap-2 rounded-lg bg-forest-50 px-2.5 py-1.5"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: visible ? 1 : 0, height: visible ? "auto" : 0 }}
            transition={{ delay: 0.4 }}
          >
            <Mail className="h-3 w-3 text-forest-500" />
            <span className="text-[10px] text-forest-600">Sent to 12 family members</span>
          </motion.div>
        </div>
      </div>

      {visible && (
        <motion.div
          className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-forest-500"
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.div>
  );

  if (inline) return content;

  return (
    <motion.foreignObject
      x={x}
      y={y}
      width={240}
      height={120}
      className="overflow-visible"
    >
      {content}
    </motion.foreignObject>
  );
}
