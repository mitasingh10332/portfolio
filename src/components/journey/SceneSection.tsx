import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useJourney } from "./JourneyProvider";

type Props = {
  id: string;
  children: ReactNode;
  /** Vertical travel space of this chapter, in viewport heights. */
  height?: number;
  className?: string;
  label: string;
};

/**
 * One chapter of the journey. Content fades and drifts in as it enters the
 * frame so nothing reads as a stacked page section.
 */
export function SceneSection({ id, children, height = 1.6, className = "", label }: Props) {
  const { reducedMotion } = useJourney();

  return (
    <section
      id={id}
      aria-label={label}
      className={`relative flex w-full items-center justify-center px-6 md:px-10 ${className}`}
      style={{ minHeight: `${height * 100}vh` }}
    >
      <motion.div
        className="w-full max-w-6xl"
        initial={reducedMotion ? false : { opacity: 0, y: 48, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.15, margin: "0px 0px -5% 0px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}
