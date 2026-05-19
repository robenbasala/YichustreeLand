"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { FamilyEvent, TreeMember } from "@/lib/tree-layout";

interface SnapEventCardProps {
  event: FamilyEvent;
  member: TreeMember;
  visible: boolean;
  showPhoto: boolean;
  index: number;
}

export function SnapEventCard({
  event,
  member,
  visible,
  showPhoto,
  index,
}: SnapEventCardProps) {
  const Icon = event.icon;
  const offsetX = (index % 2 === 0 ? -1 : 1) * (110 + index * 20);
  const offsetY = -70 - index * 50;

  return (
    <AnimatePresence>
      {visible && (
        <motion.foreignObject
          key={event.id}
          x={member.x + offsetX - 70}
          y={member.y + offsetY - 40}
          width={140}
          height={showPhoto && event.photoUrl ? 130 : 72}
          className="overflow-visible"
          initial={{ opacity: 0, scale: 0.5, rotate: 8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: index * 0.08 }}
        >
          <div className="rounded-xl border border-forest-100 bg-white/95 shadow-card backdrop-blur-sm overflow-hidden">
            {showPhoto && event.photoUrl ? (
              <>
                <div className="relative h-16 w-full">
                  <Image
                    src={event.photoUrl}
                    alt={event.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-2">
                  <p className="text-[10px] font-semibold text-forest-900">{event.title}</p>
                  <p className="text-[8px] text-forest-500">{event.date}</p>
                  {event.description ? (
                    <p className="text-[8px] text-forest-400 mt-0.5 line-clamp-2">
                      {event.description}
                    </p>
                  ) : null}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2 p-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-forest-50 text-forest-600">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <p className="text-[10px] font-semibold text-forest-900">{event.title}</p>
                  <p className="text-[8px] text-forest-500">{event.date}</p>
                </span>
              </div>
            )}
          </div>
        </motion.foreignObject>
      )}
    </AnimatePresence>
  );
}
