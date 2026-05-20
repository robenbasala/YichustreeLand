"use client";

import { useLayoutEffect, useRef, useState } from "react";

interface SnapEventConnectorProps {
  d: string;
  color: string;
  animate?: boolean;
  delay?: number;
  strokeWidth?: number;
  /** When true, onComplete only fires after draw animation (not when static) */
  deferComplete?: boolean;
  onComplete?: () => void;
}

export function SnapEventConnector({
  d,
  color,
  animate = false,
  delay = 0,
  strokeWidth = 1.5,
  deferComplete = false,
  onComplete,
}: SnapEventConnectorProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const onCompleteRef = useRef(onComplete);
  const hasDrawnRef = useRef(false);
  const [lineReady, setLineReady] = useState(!animate);

  onCompleteRef.current = onComplete;

  useLayoutEffect(() => {
    const el = pathRef.current;
    if (!el) return;

    const len = el.getTotalLength();
    if (len <= 0) return;

    const applyStatic = () => {
      el.style.strokeDasharray = "none";
      el.style.strokeDashoffset = "0";
      el.style.transition = "none";
      setLineReady(true);
    };

    if (hasDrawnRef.current) {
      applyStatic();
      return;
    }

    if (!animate) {
      applyStatic();
      if (!deferComplete) onCompleteRef.current?.();
      return;
    }

    setLineReady(false);
    el.style.strokeDasharray = `${len}`;
    el.style.strokeDashoffset = `${len}`;
    el.style.transition = "none";

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setLineReady(true);
        el.style.transition = `stroke-dashoffset 0.85s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`;
        el.style.strokeDashoffset = "0";
      });
    });

    const timer = window.setTimeout(() => {
      hasDrawnRef.current = true;
      applyStatic();
      onCompleteRef.current?.();
    }, delay * 1000 + 900);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [d, animate, delay, deferComplete]);

  return (
    <path
      ref={pathRef}
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={lineReady ? 0.9 : 0}
    />
  );
}
