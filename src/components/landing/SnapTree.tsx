"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { SnapChapter } from "@/lib/snap-chapters";
import {
  TREE_MEMBERS,
  branchesAtStage,
  membersAtStage,
  VIEWBOX,
  REMINDER_MEMBER_ID,
} from "@/lib/tree-layout";
import { SnapBranch } from "./SnapBranch";
import { SnapPersonNode } from "./SnapPersonNode";
import { SnapEventCard } from "./SnapEventCard";
import { ReminderNotification } from "./ReminderNotification";
import { cn } from "@/lib/utils";

interface SnapTreeProps {
  chapter: SnapChapter;
  className?: string;
}

export function SnapTree({ chapter, className }: SnapTreeProps) {
  const stage = chapter.treeStage;
  const members = membersAtStage(stage);
  const branches = branchesAtStage(stage);
  const memberMap = Object.fromEntries(TREE_MEMBERS.map((m) => [m.id, m]));

  let eventIndex = 0;

  return (
    <motion.div
      className={cn("relative w-full perspective-tree", className)}
      animate={{ scale: chapter.treeScale }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-full bg-radial-green blur-3xl opacity-50"
        animate={{ opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div
        className="preserve-3d relative mx-auto"
        animate={{ rotateX: stage >= 7 ? 12 : 6, rotateY: 0 }}
        transition={{ duration: 0.8 }}
        style={{ perspective: 1400 }}
      >
        <svg
          viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
          className="h-auto w-full max-h-[min(78vh,880px)] min-w-[900px] max-w-none drop-shadow-xl"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="branchGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#57b47c" />
              <stop offset="100%" stopColor="#267848" />
            </linearGradient>
            <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8dd1a8" />
              <stop offset="50%" stopColor="#35965c" />
              <stop offset="100%" stopColor="#57b47c" />
            </linearGradient>
          </defs>

          {branches.map((branch, i) => {
            const parent = memberMap[branch.parentId];
            const child = memberMap[branch.childId];
            if (!parent || !child) return null;
            return (
              <SnapBranch
                key={branch.id}
                branch={branch}
                parent={parent}
                child={child}
                visible
                index={i}
              />
            );
          })}

          {members.map((member, i) => (
            <SnapPersonNode
              key={member.id}
              member={member}
              visible
              showPhotos={chapter.showEventPhotos || stage >= 3}
              isHighlighted={member.id === REMINDER_MEMBER_ID && chapter.showReminder}
              index={i}
            />
          ))}

          {chapter.showEvents &&
            members.map((member) =>
              (member.events ?? [])
                .filter((e) => e.fromStage <= stage)
                .map((event) => {
                  const idx = eventIndex++;
                  return (
                    <SnapEventCard
                      key={event.id}
                      event={event}
                      member={member}
                      visible
                      showPhoto={chapter.showEventPhotos}
                      index={idx}
                    />
                  );
                })
            )}

          {chapter.showReminder && memberMap[REMINDER_MEMBER_ID] && (
            <motion.foreignObject
              x={memberMap[REMINDER_MEMBER_ID].x + 70}
              y={memberMap[REMINDER_MEMBER_ID].y - 100}
              width={250}
              height={130}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", delay: 0.3 }}
            >
              <ReminderNotification visible inline />
            </motion.foreignObject>
          )}
        </svg>

        {chapter.showAddButton && (
          <motion.button
            className="absolute right-[6%] top-[38%] flex items-center gap-2 rounded-full bg-forest-600 px-5 py-2.5 text-sm font-medium text-white shadow-glow"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.4 }}
          >
            <Plus className="h-4 w-4" />
            Add Member
          </motion.button>
        )}

        {chapter.showShareBadges && (
          <motion.div
            className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {["Invite relatives", "Private access", "Secure sharing", "Collaborate"].map((b) => (
              <span
                key={b}
                className="rounded-full border border-forest-200 bg-white/95 px-3 py-1.5 text-[11px] font-medium text-forest-700 shadow-sm"
              >
                {b}
              </span>
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
