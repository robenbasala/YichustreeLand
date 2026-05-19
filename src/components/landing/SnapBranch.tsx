"use client";

import { motion } from "framer-motion";
import { getBranchPath, type TreeBranch, type TreeMember } from "@/lib/tree-layout";

interface SnapBranchProps {
  branch: TreeBranch;
  parent: TreeMember;
  child: TreeMember;
  visible: boolean;
  index: number;
}

export function SnapBranch({ branch, parent, child, visible, index }: SnapBranchProps) {
  const pathD = getBranchPath(parent, child, branch.isSpouse);

  return (
    <g>
      <motion.path
        d={pathD}
        fill="none"
        stroke="url(#branchGradient)"
        strokeLinecap="round"
        initial={false}
        animate={{
          pathLength: visible ? 1 : 0,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          pathLength: { duration: 0.9, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.3, delay: index * 0.04 },
        }}
        style={{ strokeWidth: 2.5 }}
      />
    </g>
  );
}
