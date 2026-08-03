import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  useScroll,
  useSpring,
  useVelocity,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

type JourneyContextValue = {
  /** Smoothed 0 → 1 progress through the whole journey. */
  progress: MotionValue<number>;
  /** Signed scroll velocity, smoothed. */
  velocity: MotionValue<number>;
  /** Pointer position normalised to -1 → 1 on both axes. */
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  reducedMotion: boolean;
  compact: boolean;
};

const JourneyContext = createContext<JourneyContextValue | null>(null);

export function useJourney() {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error("useJourney must be used inside <JourneyProvider>");
  return ctx;
}

/** Smooth scrolling via Lenis, disabled for reduced-motion users. */
function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let instance: { raf: (t: number) => void; destroy: () => void } | null = null;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1.4 });
      instance = lenis;
      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      instance?.destroy();
    };
  }, [enabled]);
}

export function JourneyProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion() ?? false;
  const [compact, setCompact] = useState(false);
  const frame = useRef(0);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: reducedMotion ? 300 : 60,
    damping: reducedMotion ? 40 : 22,
    mass: 0.6,
  });
  const rawVelocity = useVelocity(progress);
  const velocity = useSpring(rawVelocity, { stiffness: 120, damping: 30 });

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  useLenis(!reducedMotion);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (event: PointerEvent) => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        pointerX.set((event.clientX / window.innerWidth) * 2 - 1);
        pointerY.set((event.clientY / window.innerHeight) * 2 - 1);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [pointerX, pointerY, reducedMotion]);

  const value = useMemo(
    () => ({ progress, velocity, pointerX, pointerY, reducedMotion, compact }),
    [progress, velocity, pointerX, pointerY, reducedMotion, compact],
  );

  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>;
}
