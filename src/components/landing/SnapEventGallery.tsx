"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  BAR_MITZVAH_GALLERY_INITIAL,
  type TreeEvent,
} from "@/lib/tree-layout";
import { SnapGalleryConnector } from "./SnapGalleryConnector";

interface SnapEventGalleryProps {
  event: TreeEvent;
  x: number;
  y: number;
  width: number;
  height: number;
  connector: string;
  dotStart: { x: number; y: number };
  dotEnd: { x: number; y: number };
  photos: readonly string[];
  isNew: boolean;
  panDelay?: number;
  scale?: number;
  onSeen?: () => void;
}

export function SnapEventGallery({
  event,
  x,
  y,
  width,
  height,
  connector,
  dotStart,
  dotEnd,
  photos,
  isNew,
  panDelay = 0.65,
  scale = 1,
  onSeen,
}: SnapEventGalleryProps) {
  const lineFinishedRef = useRef(!isNew);
  const [lineDone, setLineDone] = useState(lineFinishedRef.current);
  const [visibleCount, setVisibleCount] = useState(BAR_MITZVAH_GALLERY_INITIAL);
  const [loadingMore, setLoadingMore] = useState(false);

  const onLineComplete = useCallback(() => {
    if (lineFinishedRef.current) return;
    lineFinishedRef.current = true;
    setLineDone(true);
  }, []);

  const hasMore = visibleCount < photos.length;

  const handleLoadMore = () => {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);
    window.setTimeout(() => {
      setVisibleCount(photos.length);
      setLoadingMore(false);
    }, 500);
  };

  const visiblePhotos = photos.slice(0, visibleCount);

  return (
    <g>
      <SnapGalleryConnector
        connector={connector}
        color={event.color}
        glow={event.glow}
        dotStart={dotStart}
        dotEnd={dotEnd}
        animate={isNew}
        delay={panDelay}
        onComplete={onLineComplete}
      />
      {lineDone && (
        <foreignObject
          x={x}
          y={y}
          width={width}
          height={height}
          className="pointer-events-none overflow-visible"
        >
          <motion.div
            initial={isNew ? { opacity: 0, scale: 0.9 * scale, x: -12 } : false}
            animate={{ opacity: 1, scale, x: 0 }}
            transition={{
              scale: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
              opacity: { type: "spring", stiffness: 220, damping: 22, delay: isNew ? 0.05 : 0 },
              x: { type: "spring", stiffness: 220, damping: 22, delay: isNew ? 0.05 : 0 },
            }}
            onAnimationComplete={() => {
              if (isNew) onSeen?.();
            }}
            className="pointer-events-auto box-border flex h-full w-full flex-col overflow-hidden rounded-xl border-2 bg-white/95 p-2 shadow-lg"
            style={{
              transformOrigin: "right center",
              borderColor: event.color,
              boxShadow: `0 0 20px ${event.glow}, 0 4px 18px rgba(15, 23, 42, 0.1)`,
            }}
          >
            <p
              className="mb-1.5 shrink-0 text-[9px] font-bold uppercase tracking-[0.16em]"
              style={{ color: event.color }}
            >
              {event.title} — Gallery
            </p>
            <div
              className={`flex min-h-0 flex-1 flex-col gap-1.5 ${
                visibleCount > BAR_MITZVAH_GALLERY_INITIAL
                  ? "overflow-y-auto pr-0.5"
                  : ""
              }`}
            >
              {visiblePhotos.map((src, i) => (
                <div
                  key={src}
                  className="relative h-[72px] w-full shrink-0 overflow-hidden rounded-md bg-forest-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${event.title} photo ${i + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="mt-2 w-full shrink-0 text-xs"
              disabled={!hasMore || loadingMore}
              onClick={handleLoadMore}
            >
              {loadingMore
                ? "Loading…"
                : hasMore
                  ? "Load more"
                  : "All photos loaded"}
            </Button>
          </motion.div>
        </foreignObject>
      )}
    </g>
  );
}
