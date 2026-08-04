
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import { useJourney } from "./JourneyProvider";

export function Bird() {
  const { progress, velocity, reducedMotion, compact } = useJourney();

  const [flapping, setFlapping] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pathX = useTransform(
    progress,
    [0, 0.08, 0.18, 0.36, 0.56, 0.76, 1],
    [33, 40, 44, 62, 30, 66, 50]
  );

  const pathY = useTransform(
    progress,
    [0, 0.08, 0.18, 0.36, 0.56, 0.76, 1],
    [23, 28, 22, 44, 26, 50, 62]
  );

  const x = useSpring(pathX, { stiffness: 40, damping: 18, mass: 0.8 });
  const y = useSpring(pathY, { stiffness: 34, damping: 16, mass: 0.9 });

  const bank = useTransform(velocity, [-1.6, 0, 1.6], [-12, 0, 10], { clamp: true });
  const tilt = useSpring(bank, { stiffness: 50, damping: 22 });

  const scale = useTransform(progress, [0, 0.4, 0.78, 1], [0.85, 1, 0.92, 0.72]);

  const bob = useMotionValue(0);

  useEffect(() => {
    if (reducedMotion) return;

    let raf = 0;
    const start = performance.now();

    const loop = (now: number) => {
      const t = (now - start) / 1000;
      const movement = Math.sin(t * 0.9) * 1.8 + Math.sin(t * 2.1) * 0.45;
      bob.set(movement);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [bob, reducedMotion]);

  useMotionValueEvent(velocity, "change", (v) => {
    if (Math.abs(v) > 0.02) {
      setFlapping(true);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setFlapping(false), 1000);
    }
  });

  const top = useTransform([y, bob] as const, ([ty, tb]: number[]) => `${(ty ?? 0) + (tb ?? 0)}%`);
  const left = useTransform(x, (v) => `${v}%`);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-30"
      style={{ left, top, x: "-50%", rotate: tilt, scale, willChange: "transform" }}
    >
      <div style={{ perspective: 700 }}>
        <BirdSilhouette flapping={flapping && !reducedMotion} size={compact ? 84 : 132} />
      </div>
    </motion.div>
  );
}

function BirdSilhouette({ flapping, size }: { flapping: boolean; size: number }) {
  const wing = {
    transformOrigin: "52% 76%",
    animationName: "flap",
    animationDuration: flapping ? "0.72s" : "4.2s",
    animationTimingFunction: "cubic-bezier(0.45, 0, 0.55, 1)",
    animationIterationCount: "infinite",
  } as const;

  const wingBack = {
    ...wing,
    animationDelay: "0.08s",
  };

  return (
    <svg
      width={size}
      height={size * 0.58}
      viewBox="0 0 220 116"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        overflow: "visible",
        filter:
          "drop-shadow(0 12px 20px oklch(0.3 0.12 265 / 0.35)) drop-shadow(0 4px 6px oklch(0.2 0.08 265 / 0.25))",
      }}
    >
      <defs>
        {/* Main body — bold saturated blue-teal, no light wash */}
        <linearGradient id="birdBody" x1="38" y1="76" x2="170" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0B1F4D" />
          <stop offset="0.45" stopColor="#164A9E" />
          <stop offset="0.75" stopColor="#1E7FBF" />
          <stop offset="1" stopColor="#2FB8C4" />
        </linearGradient>

        {/* Front wing — vivid violet-to-cyan */}
        <linearGradient id="frontWing" x1="46" y1="8" x2="119" y2="82" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3ED6D0" />
          <stop offset="0.3" stopColor="#2E9FE0" />
          <stop offset="0.65" stopColor="#3B5FD9" />
          <stop offset="1" stopColor="#2A2A72" />
        </linearGradient>

        {/* Back wing — teal-green, punchy */}
        <linearGradient id="backWing" x1="45" y1="12" x2="118" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5EEAD4" />
          <stop offset="0.5" stopColor="#22B8CF" />
          <stop offset="1" stopColor="#1B6FA8" />
        </linearGradient>

        {/* Neck — rich blue-violet */}
        <linearGradient id="neckGradient" x1="150" y1="84" x2="185" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0F2B5C" />
          <stop offset="0.6" stopColor="#2E63B8" />
          <stop offset="1" stopColor="#38B7D6" />
        </linearGradient>

        {/* Head */}
        <linearGradient id="headGradient" x1="174" y1="42" x2="199" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#164E8F" />
          <stop offset="1" stopColor="#2C8FC9" />
        </linearGradient>

        {/* Beak — golden-orange accent for contrast */}
        <linearGradient id="beakGradient" x1="196" y1="47" x2="213" y2="57" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6557ff" />
          <stop offset="1" stopColor="#F2994A" />
        </linearGradient>

        {/* Wing edge accent stroke */}
        <linearGradient id="featherEdge" x1="53" y1="9" x2="95" y2="74" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8CFFEF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#2E9FE0" stopOpacity="0" />
        </linearGradient>

        {/* Ambient color glow beneath the bird */}
        <radialGradient id="ambientGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#3FD1E0" stopOpacity="0.35" />
          <stop offset="1" stopColor="#3FD1E0" stopOpacity="0" />
        </radialGradient>

        <filter id="birdGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>

        {/* Grounding shadow under the body */}
        <filter id="bodyShadow" x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#0B1F4D" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* ====================================
          AMBIENT COLOR GLOW
          ==================================== */}
      <ellipse cx="103" cy="78" rx="60" ry="14" fill="url(#ambientGlow)" filter="url(#birdGlow)" />

      {/* ====================================
          BACK WING
          ==================================== */}
      <g style={wingBack}>
        <path
          d="
            M118 72
            C98 48 74 24 48 10
            C66 30 81 52 89 68
            C95 78 105 81 118 75
            C121 73 121 72 118 72Z
          "
          fill="url(#backWing)"
          stroke="#0E4A63"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        <path d="M60 25C73 39 83 54 91 69" stroke="#CFFCF6" strokeOpacity="0.55" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M70 27C82 42 90 55 97 69" stroke="#8CFFEF" strokeOpacity="0.4" strokeWidth="1.1" strokeLinecap="round" />
      </g>

      {/* ====================================
          MAIN BODY — your exact path, unchanged
          ==================================== */}
      <path
        d="
          M38 78
          C54 72 70 68 87 67
          C103 66 118 67 130 71
          C139 74 146 78 153 80
          C158 82 116 69 168 80
          C160 86 150 90 138 91
          C122 92 107 88 92 84
          C74 80 55 81 38 78Z
          "
        fill="url(#birdBody)"
        filter="url(#bodyShadow)"
      />

      <path
        d="
          M46 76
          C67 70 88 69 105 70
          C119 71 130 74 140 78
        "
        stroke="#5FE0D8"
        strokeOpacity="0.55"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* ====================================
          NECK — your exact path, unchanged
          ==================================== */}
      <path
        d="
          M149 80
          C158 98 166 74 174 68
          C175 65 180 60 199 57
          L177 53
          C172 59 166 64 160 68
          C155 72 151 76 150 78
          C5 93 178 80 179 80Z
         "
        fill="url(#neckGradient)"
      />

      <path
        d="
          M155 73
          C161 68 168 62 175 55
        "
        stroke="#63D6EA"
        strokeOpacity="0.6"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* ====================================
          HEAD — your exact path, unchanged
          ==================================== */}
      <path
        d="
          M174 51
          C174 45 180 41 187 42
          C194 43 199 47 199 52
          C199 57 194 60 188 60
          C181 60 175 58 174 53
          C174 52 174 51 174 51Z
        "
        fill="url(#headGradient)"
      />

      {/* ====================================
          BEAK — your exact path, unchanged
          ==================================== */}
      <path
        d="
          M196 47
          L213 52
          L196 57
          Z
        "
        fill="url(#beakGradient)"
      />

      {/* ====================================
          FRONT WING — your exact path, unchanged
          ==================================== */}
      <g style={wing}>
        <path
          d="
            M99 69

            C89 50 77 32 59 20
            C50 14 42 10 34 7

            C48 23 59 39 67 54
            C72 64 75 71 77 76

            C80 83 89 85 96 80

            C101 77 102 73 99 69Z
          "
          fill="url(#frontWing)"
          stroke="#152A66"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        <path
          d="
            M43 12
            C58 28 71 48 81 70
          "
          stroke="url(#featherEdge)"
          strokeWidth="3.2"
          strokeLinecap="round"
          opacity="0.85"
        />

        <path
          d="
            M51 18
            C65 33 76 49 84 66
          "
          stroke="#9FF0E8"
          strokeOpacity="0.5"
          strokeWidth="1.1"
          strokeLinecap="round"
        />

        <path
          d="
            M60 20
            C73 36 83 52 89 68
          "
          stroke="#4FB8E0"
          strokeOpacity="0.4"
          strokeWidth="1.1"
          strokeLinecap="round"
        />

        <path
          d="
            M70 25
            C81 40 89 54 94 69
          "
          stroke="#B8F5F0"
          strokeOpacity="0.3"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}