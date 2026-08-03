import { motion, useTransform } from "motion/react";
import { useJourney } from "./JourneyProvider";

type CloudSpec = {
  top: number;
  scale: number;
  depth: number;
  duration: number;
  opacity: number;
};

const clouds: CloudSpec[] = [
  { top: 8, scale: 1.5, depth: 0.2, duration: 150, opacity: 0.5 },
  { top: 22, scale: 2.4, depth: 0.4, duration: 110, opacity: 0.7 },
  { top: 38, scale: 1.1, depth: 0.7, duration: 80, opacity: 0.55 },
  { top: 55, scale: 3, depth: 1, duration: 62, opacity: 0.8 },
  { top: 70, scale: 1.8, depth: 1.3, duration: 48, opacity: 0.65 },
];

function CloudShape({ opacity }: { opacity: number }) {
  return (
    <svg width="620" height="200" viewBox="0 0 620 200" fill="none" style={{ opacity }}>
      <g filter="url(#soft)">
        <ellipse cx="200" cy="120" rx="180" ry="46" fill="oklch(1 0 0)" />
        <ellipse cx="320" cy="96" rx="130" ry="52" fill="oklch(1 0 0)" />
        <ellipse cx="430" cy="124" rx="150" ry="38" fill="oklch(1 0 0)" />
      </g>
      <defs>
        <filter id="soft" x="-40" y="-40" width="700" height="280">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
    </svg>
  );
}

/** Layered drifting clouds that thin out as the journey descends into dusk. */
export function Clouds() {
  const { progress, reducedMotion, compact } = useJourney();
  const bandOpacity = useTransform(progress, [0, 0.12, 0.34, 0.6, 0.85, 1], [0.5, 1, 0.9, 0.4, 0.5, 0.75]);
  const visible = compact ? clouds.slice(0, 3) : clouds;

  return (
    <motion.div className="absolute inset-0 overflow-hidden" style={{ opacity: bandOpacity }}>
      {visible.map((cloud, index) => (
        <CloudRow key={index} cloud={cloud} reducedMotion={reducedMotion} />
      ))}
    </motion.div>
  );
}

function CloudRow({ cloud, reducedMotion }: { cloud: CloudSpec; reducedMotion: boolean }) {
  const { progress, pointerX } = useJourney();
  const y = useTransform(progress, [0, 1], [0, cloud.depth * 620]);
  const x = useTransform(pointerX, [-1, 1], [cloud.depth * 22, -cloud.depth * 22]);

  return (
    <motion.div
      className="absolute left-0 w-full"
      style={{ top: `${cloud.top}%`, y, x, scale: cloud.scale, willChange: "transform" }}
    >
      <div
        className="flex w-[200%]"
        style={{
          animationName: reducedMotion ? "none" : "drift",
          animationDuration: `${cloud.duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        <CloudShape opacity={cloud.opacity} />
        <CloudShape opacity={cloud.opacity} />
      </div>
    </motion.div>
  );
}
