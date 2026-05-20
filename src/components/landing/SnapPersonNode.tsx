"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TreeMember } from "@/lib/tree-layout";

interface SnapPersonNodeProps {
  member: TreeMember;
  isNew?: boolean;
  isHighlighted?: boolean;
  isDimmed?: boolean;
  scale?: number;
  showPhotos?: boolean;
  animOrder: number;
  onSeen?: () => void;
}

export function SnapPersonNode({
  member,
  isNew = false,
  isHighlighted = false,
  isDimmed = false,
  scale = 1,
  showPhotos = true,
  animOrder,
  onSeen,
}: SnapPersonNodeProps) {
  const baseSize = member.generation === 0 ? 92 : member.generation === 1 ? 76 : 64;
  const size = Math.round(baseSize * scale);
  const half = size / 2;
  const labelW = 96;
  const delay = isNew ? member.generation * 0.12 + animOrder * 0.06 : 0;

  return (
    <g style={{ opacity: isDimmed ? 0.32 : 1, transition: "opacity 0.5s ease" }}>
      {isHighlighted && (
        <circle
          cx={member.x}
          cy={member.y}
          r={half + 14}
          fill="none"
          stroke="url(#glowGradient)"
          strokeWidth={3}
          className="glow-line"
        />
      )}

      <foreignObject
        x={member.x - labelW / 2}
        y={member.y - half}
        width={labelW}
        height={size + 40}
        className="pointer-events-none overflow-visible"
      >
        <motion.div
          className={cn(
            "flex flex-col items-center",
            isDimmed && "grayscale-[0.5]"
          )}
          initial={isNew ? { scale: 0.5, opacity: 0 } : false}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay,
          }}
          onAnimationComplete={() => {
            if (isNew) onSeen?.();
          }}
          style={{ width: labelW }}
        >
          <div
            className={cn(
              "relative mx-auto overflow-hidden rounded-full border-[3px] bg-white shadow-card transition-all duration-[650ms] ease-out",
              isHighlighted
                ? "border-forest-500 shadow-glow ring-4 ring-forest-200/80"
                : isDimmed
                  ? "border-forest-100"
                  : "border-forest-300"
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
              <span
                className="flex h-full w-full items-center justify-center bg-gradient-to-br from-forest-50 to-forest-100 font-bold text-forest-700"
                style={{ fontSize: size * 0.22 }}
              >
                {member.avatar}
              </span>
            )}
          </div>
          <div className={cn("mt-1.5 w-full text-center", isDimmed && "opacity-55")}>
            <p className="text-[11px] font-semibold leading-tight text-forest-900">
              {member.name}
            </p>
            {member.hebrewName && (
              <p className="text-[9px] font-medium text-forest-500" dir="rtl">
                {member.hebrewName}
              </p>
            )}
          </div>
        </motion.div>
      </foreignObject>
    </g>
  );
}
