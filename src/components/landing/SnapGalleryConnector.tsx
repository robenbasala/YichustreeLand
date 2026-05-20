"use client";

import { SnapEventConnector } from "./SnapEventConnector";

interface SnapGalleryConnectorProps {
  connector: string;
  color: string;
  glow: string;
  dotStart: { x: number; y: number };
  dotEnd: { x: number; y: number };
  animate?: boolean;
  delay?: number;
  onComplete?: () => void;
}

export function SnapGalleryConnector({
  connector,
  color,
  glow,
  dotStart,
  dotEnd,
  animate = false,
  delay = 0,
  onComplete,
}: SnapGalleryConnectorProps) {
  return (
    <g>
      <path
        d={connector}
        fill="none"
        stroke={glow}
        strokeWidth={10}
        strokeLinecap="round"
        opacity={0.35}
      />
      <path
        d={connector}
        fill="none"
        stroke={color}
        strokeWidth={1}
        strokeLinecap="round"
        opacity={0.15}
        strokeDasharray="4 6"
      />
      <SnapEventConnector
        d={connector}
        color={color}
        animate={animate}
        delay={delay}
        strokeWidth={2}
        deferComplete
        onComplete={onComplete}
      />
      {/* Start: event card */}
      <circle cx={dotStart.x} cy={dotStart.y} r={5} fill={color} opacity={0.95} />
      <circle cx={dotStart.x} cy={dotStart.y} r={9} fill={glow} opacity={0.45} />
      {/* End: gallery */}
      <circle cx={dotEnd.x} cy={dotEnd.y} r={4} fill={color} opacity={0.9} />
      <circle cx={dotEnd.x} cy={dotEnd.y} r={7} fill={glow} opacity={0.4} />
    </g>
  );
}
