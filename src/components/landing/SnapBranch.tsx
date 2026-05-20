"use client";

import { motion } from "framer-motion";
import { getBranchPath, type TreeBranch, type TreeMember } from "@/lib/tree-layout";

interface SnapBranchProps {
  branch: TreeBranch;
  parent: TreeMember;
  child: TreeMember;
  isNew?: boolean;
  animOrder: number;
}

export function SnapBranch({
  branch,
  parent,
  child,
  isNew = false,
  animOrder,
}: SnapBranchProps) {
  const pathD = getBranchPath(parent, child, branch.isSpouse);

  return (
    <motion.path
      d={pathD}
      fill="none"
      stroke="url(#branchGradient)"
      strokeLinecap="square"
      strokeLinejoin="miter"
      strokeWidth={branch.isSpouse ? 2.5 : 2}
      initial={isNew ? { pathLength: 0, opacity: 0 } : false}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        pathLength: {
          duration: 0.7,
          delay: isNew ? animOrder * 0.06 + 0.15 : 0,
          ease: [0.4, 0, 0.2, 1],
        },
        opacity: { duration: 0.25, delay: isNew ? animOrder * 0.05 : 0 },
      }}
    />
  );
}
