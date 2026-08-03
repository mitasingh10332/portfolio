import { motion, useTransform, type MotionValue } from "motion/react";
import { useJourney } from "./JourneyProvider";
import mountains from "@/assets/mountains.png";
import clouds from "@/assets/clouds.png";
import trees from "@/assets/trees.png";
import city from "@/assets/city.png";
import futuristic from "@/assets/futuristic.png";
import { Clouds } from "./Clouds";
import { Atmosphere } from "./Atmosphere";

type SkyKey = "dawn" | "cloud" | "mountain" | "city" | "digital" | "sunset";

const skies: { key: SkyKey; stops: number[]; opacity: number[] }[] = [
  { key: "dawn", stops: [0, 0, 0.14, 0.2], opacity: [0, 1, 1, 0] },
  { key: "cloud", stops: [0.08, 0.18, 0.3, 0.38], opacity: [0, 1, 1, 0] },
  { key: "mountain", stops: [0.28, 0.36, 0.48, 0.56], opacity: [0, 1, 1, 0] },
  { key: "city", stops: [0.46, 0.56, 0.64, 0.72], opacity: [0, 1, 1, 0] },
  { key: "digital", stops: [0.62, 0.72, 0.8, 0.87], opacity: [0, 1, 1, 0] },
  { key: "sunset", stops: [0.78, 0.9, 1, 1], opacity: [0, 1, 1, 1] },
];

function SkyLayer({
  sky,
  stops,
  opacity: opacityRange,
  progress,
}: {
  sky: SkyKey;
  stops: number[];
  opacity: number[];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, stops, opacityRange);
  return (
    <motion.div
      className="absolute inset-0"
      style={{ opacity, backgroundImage: `var(--sky-${sky})` }}
    />
  );
}

function ParallaxLayer({
  src,
  progress,
  range,
  yRange,
  opacityRange,
  scaleRange = [1.05, 1.16],
  className = "",
  pointerFactor = 0,
}: {
  src: string;
  progress: MotionValue<number>;
  range: number[];
  yRange: number[];
  opacityRange: number[];
  scaleRange?: number[];
  className?: string;
  pointerFactor?: number;
}) {
  const { pointerX } = useJourney();
  const y = useTransform(progress, range, yRange);
  const opacity = useTransform(progress, range, opacityRange);
  const scale = useTransform(progress, [range[0] ?? 0, range[range.length - 1] ?? 1], scaleRange);
  const x = useTransform(pointerX, [-1, 1], [pointerFactor, -pointerFactor]);

  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className={`pointer-events-none absolute bottom-0 left-1/2 w-[130%] max-w-none -translate-x-1/2 select-none object-cover ${className}`}
      style={{ y, x, opacity, scale, willChange: "transform, opacity" }}
    />
  );
}

/** The world the bird travels through: sky, terrain, clouds and air. */
export function Environment() {
  const { progress, reducedMotion } = useJourney();

  const sunY = useTransform(progress, [0, 0.5, 1], ["8%", "18%", "62%"]);
  const sunOpacity = useTransform(progress, [0, 0.3, 0.7, 1], [0.5, 0.25, 0.4, 0.95]);
  const sunScale = useTransform(progress, [0, 1], [1, 1.9]);
  const vignette = useTransform(progress, [0, 0.6, 1], [0.06, 0.14, 0.26]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {skies.map((s) => (
        <SkyLayer key={s.key} sky={s.key} stops={s.stops} opacity={s.opacity} progress={progress} />
      ))}

      {/* sun / light source */}
      <motion.div
        className="absolute left-1/2 h-[46vmin] w-[46vmin] -translate-x-1/2 rounded-full"
        style={{
          top: sunY,
          opacity: sunOpacity,
          scale: sunScale,
          background:
            "radial-gradient(circle, oklch(0.97 0.09 82 / 0.9) 0%, oklch(0.9 0.12 62 / 0.35) 45%, transparent 70%)",
        }}
      />

      <ParallaxLayer
        src={clouds}
        progress={progress}
        range={[0.08, 0.16, 0.28, 0.42]}
        yRange={["6%", "0%", "-3%", "-10%"] as unknown as number[]}
        opacityRange={[0, 0.40, 0.4, 0]}
        pointerFactor={10}
        className="opacity-90"
      />
      <ParallaxLayer
        src={mountains}
        progress={progress}
        range={[0.16, 0.36, 0.56, 0.78]}
        yRange={["12%", "0%", "-4%", "-14%"] as unknown as number[]}
        opacityRange={[0, 0.95, 0.7, 0]}
        pointerFactor={14}
        className="opacity-90"
      />
      <ParallaxLayer
        src={trees}
        progress={progress}
        range={[0.3, 0.44, 0.58, 0.7]}
        yRange={["18%", "4%", "0%", "-10%"] as unknown as number[]}
        opacityRange={[0, 0.85, 0.6, 0]}
        pointerFactor={26}
      />
      <ParallaxLayer
        src={city}
        progress={progress}
        range={[0.44, 0.6, 0.72, 0.84]}
        yRange={["20%", "2%", "0%", "-12%"] as unknown as number[]}
        opacityRange={[0, 0.9, 0.65, 0]}
        pointerFactor={20}
      />
      <ParallaxLayer
        src={futuristic}
        progress={progress}
        range={[0.66, 0.78, 0.9, 1]}
        yRange={["24%", "6%", "2%", "-6%"] as unknown as number[]}
        opacityRange={[0, 0.85, 0.7, 0.35]}
        pointerFactor={32}
      />

      <Clouds />
      {!reducedMotion && <Atmosphere />}

      {/* depth vignette */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: vignette,
          background: "radial-gradient(ellipse at 50% 45%, transparent 45%, var(--ink) 130%)",
        }}
      />
    </div>
  );
}
