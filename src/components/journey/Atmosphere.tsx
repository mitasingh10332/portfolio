import { useMemo } from "react";
import { motion, useTransform } from "motion/react";
import { useJourney } from "./JourneyProvider";

/** Fine airborne particles — dust in the light, then embers at dusk. */
export function Atmosphere() {
  const { progress, compact } = useJourney();
  const count = compact ? 14 : 30;

  const motes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i * 37) % 100,
        top: (i * 61) % 100,
        size: 1 + ((i * 7) % 4),
        delay: (i % 10) * 0.9,
        duration: 12 + ((i * 5) % 14),
      })),
    [count],
  );

  const opacity = useTransform(progress, [0, 0.2, 0.6, 1], [0.25, 0.4, 0.3, 0.7]);
  const hue = useTransform(progress, [0, 0.7, 1], [0.18, 0.28, 0.9]);

  return (
    <motion.div className="absolute inset-0 overflow-hidden" style={{ opacity }}>
      {motes.map((mote, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${mote.left}%`,
            top: `${mote.top}%`,
            width: mote.size,
            height: mote.size,
            backgroundColor: "oklch(1 0 0)",
            filter: "blur(0.3px)",
          }}
          animate={{ y: [0, -60, 0], x: [0, 18, 0], opacity: [0, 1, 0] }}
          transition={{
            duration: mote.duration,
            delay: mote.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: hue,
          background:
            "linear-gradient(to top, oklch(0.75 0.13 55 / 0.28), transparent 55%)",
        }}
      />
    </motion.div>
  );
}
