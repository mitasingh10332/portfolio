import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { useJourney } from "./JourneyProvider";

type Props = {
  children: ReactNode;
  className?: string;
  /** How strongly the object leans toward the cursor, in degrees. */
  intensity?: number;
  lift?: number;
};

/**
 * A surface that reacts to the cursor with a subtle 3D lean, a small lift and
 * a soft moving highlight. Keyboard focus produces the same lift.
 */
export function InteractiveObject({ children, className = "", intensity = 6, lift = 6 }: Props) {
  const { reducedMotion } = useJourney();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const hovered = useMotionValue(0);

  const rotateY = useSpring(useTransform(px, [-1, 1], [-intensity, intensity]), {
    stiffness: 140,
    damping: 18,
  });
  const rotateX = useSpring(useTransform(py, [-1, 1], [intensity, -intensity]), {
    stiffness: 140,
    damping: 18,
  });
  const translateY = useSpring(useTransform(hovered, [0, 1], [0, -lift]), {
    stiffness: 180,
    damping: 22,
  });
  const glowX = useTransform(px, [-1, 1], ["20%", "80%"]);
  const glowY = useTransform(py, [-1, 1], ["20%", "80%"]);
  const glowOpacity = useTransform(hovered, [0, 1], [0, 0.45]);
  const glow = useMotionTemplate`radial-gradient(320px circle at ${glowX} ${glowY}, oklch(1 0 0 / 0.5), transparent 65%)`;

  const handleMove = (event: React.PointerEvent) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    py.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
    hovered.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={
        reducedMotion
          ? {}
          : {
              rotateX,
              rotateY,
              y: translateY,
              transformPerspective: 900,
              transformStyle: "preserve-3d",
            }
      }
      onPointerMove={handleMove}
      onPointerEnter={() => hovered.set(1)}
      onPointerLeave={reset}
      onFocus={() => hovered.set(1)}
      onBlur={reset}
    >
      {children}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ opacity: glowOpacity, background: glow }}
      />
    </motion.div>
  );
}
