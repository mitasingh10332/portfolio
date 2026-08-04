import { motion, useTransform } from "motion/react";
import { profile } from "@/lib/resume";
import { useJourney } from "../JourneyProvider";
import { SceneSection } from "../SceneSection";

export function OpeningScene() {
  const { progress, reducedMotion } = useJourney();
  const fade = useTransform(progress, [0, 0.08], [1, 0]);
  const drift = useTransform(progress, [0, 0.12], ["0%", "-8%"]);

  return (
    <SceneSection id="start" label="The journey begins" height={1.2}>
      <motion.div
        className="mx-auto max-w-3xl text-center"
        style={reducedMotion ? {} : { opacity: fade, y: drift }}
      >
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.2 }}
        >
          {profile.title}
        </motion.p>

        <motion.h1
          className="mt-6 text-5xl leading-[1.05] text-foreground sm:text-7xl md:text-8xl"
          initial={reducedMotion ? false : { opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.6, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          Hello, I&rsquo;m {profile.name.split(" ")[0]}.
        </motion.h1>

    <motion.p
  className="mx-auto mt-8 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.1, duration: 1.2 }}
>
  {profile.intro.split(/(\*\*.*?\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={index} className="font-semibold text-foreground">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  )}
</motion.p> 


        <motion.div
          className="mt-16 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 1.2 }}
        >
          <span className="eyebrow">{profile.tagline}</span>
          <motion.span
            aria-hidden="true"
            className="block h-16 w-px bg-gradient-to-b from-transparent via-foreground/40 to-transparent"
            animate={reducedMotion ? {} : { opacity: [0.3, 1, 0.3], scaleY: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </SceneSection>
  );
}
