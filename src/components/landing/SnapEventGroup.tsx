"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  getEventLayout,
  type TreeEvent,
  type TreeMember,
} from "@/lib/tree-layout";
import { SnapEventCard } from "./SnapEventCard";
import { SnapEventConnector } from "./SnapEventConnector";

interface SnapEventGroupProps {
  event: TreeEvent;
  member: TreeMember;
  genScale: Record<number, number>;
  isNew: boolean;
  onSeen: () => void;
}

export function SnapEventGroup({
  event,
  member,
  genScale,
  isNew,
  onSeen,
}: SnapEventGroupProps) {
  const layout = getEventLayout(member, event, genScale);
  const delay = event.animOrder * 0.14;
  const waitForLine = Boolean(event.lineFirst);

  const lineFinishedRef = useRef(!waitForLine || !isNew);
  const [lineDone, setLineDone] = useState(lineFinishedRef.current);

  useEffect(() => {
    if (isNew && waitForLine && !lineFinishedRef.current) {
      setLineDone(false);
    }
  }, [isNew, waitForLine, event.id]);

  const onLineComplete = useCallback(() => {
    if (!waitForLine || lineFinishedRef.current) return;
    lineFinishedRef.current = true;
    setLineDone(true);
  }, [waitForLine]);

  return (
    <g>
      <SnapEventConnector
        d={layout.connector}
        color={event.color}
        animate={isNew}
        delay={delay}
        strokeWidth={
          event.connector && event.connector !== "orthogonal" ? 1.2 : 1.5
        }
        deferComplete={waitForLine}
        onComplete={onLineComplete}
      />
      {lineDone && (
        <SnapEventCard
          event={event}
          x={layout.x}
          y={layout.y}
          width={layout.w}
          height={layout.h}
          isNew={isNew}
          delay={0}
          onSeen={onSeen}
        />
      )}
    </g>
  );
}
