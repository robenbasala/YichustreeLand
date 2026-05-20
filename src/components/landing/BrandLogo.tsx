"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  /** Display size in px (square logo: icon + wordmark) */
  height?: number;
  className?: string;
  animated?: boolean;
}

export function BrandLogo({
  height = 56,
  className,
  animated = false,
}: BrandLogoProps) {
  const size = height;
  const img = (
    <span className={cn("inline-block leading-none", className)}>
      <Image
        src="/logo.png"
        alt="YichusTree"
        width={size}
        height={size}
        className="object-contain"
        style={{
          width: size,
          height: size,
          maxWidth: size,
        }}
        priority
      />
    </span>
  );

  if (!animated) return img;

  return (
    <motion.div
      className="bg-transparent"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      {img}
    </motion.div>
  );
}
