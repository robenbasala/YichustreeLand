"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TreeMember } from "@/lib/tree-layout";

interface SnapPersonNodeProps {
  member: TreeMember;
  visible: boolean;
  isHighlighted?: boolean;
  showPhotos?: boolean;
  index: number;
}

export function SnapPersonNode({
  member,
  visible,
  isHighlighted = false,
  showPhotos = true,
  index,
}: SnapPersonNodeProps) {
  const size = member.generation === 0 ? 80 : 68;
  const half = size / 2;

  return (
    <AnimatePresence>
      {visible && (
        <motion.g
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.2 }}
          transition={{
            type: "spring",
            stiffness: 140,
            damping: 18,
            delay: index * 0.05,
          }}
          style={{ transformOrigin: `${member.x}px ${member.y}px` }}
        >
          {isHighlighted && (
            <motion.circle
              cx={member.x}
              cy={member.y}
              r={half + 14}
              fill="none"
              stroke="url(#glowGradient)"
              strokeWidth={2.5}
              className="glow-line"
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}

          <foreignObject
            x={member.x - half - 8}
            y={member.y - half - 8}
            width={size + 80}
            height={size + 48}
            className="overflow-visible"
          >
            <motion.div
              className="flex flex-col items-center"
              initial={{ y: 16 }}
              animate={{ y: 0 }}
              transition={{ delay: index * 0.05 + 0.1 }}
            >
              <motion.div
                className={cn(
                  "relative overflow-hidden rounded-full border-[3px] bg-white shadow-card",
                  isHighlighted ? "border-forest-500 shadow-glow" : "border-forest-200",
                  member.generation === 0 && "border-forest-500 shadow-glow-lg"
                )}
                style={{ width: size, height: size }}
              >
                {showPhotos && member.photoUrl ? (
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    width={size}
                    height={size}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-forest-50 to-forest-100 text-sm font-bold text-forest-700">
                    {member.avatar}
                  </span>
                )}
              </motion.div>
              <div className="mt-2 max-w-[100px] text-center">
                <p className="text-[11px] font-semibold leading-tight text-forest-900">
                  {member.name}
                </p>
                {member.hebrewName && (
                  <p className="text-[9px] text-forest-500 font-medium" dir="rtl">
                    {member.hebrewName}
                  </p>
                )}
                {member.born && (
                  <p className="text-[8px] text-forest-400">
                    {member.born}
                    {member.died ? ` – ${member.died}` : ""}
                  </p>
                )}
              </div>
            </motion.div>
          </foreignObject>
        </motion.g>
      )}
    </AnimatePresence>
  );
}
