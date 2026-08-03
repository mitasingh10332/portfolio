import { motion } from "motion/react";
import { skillGroups } from "@/lib/resume";
import { InteractiveObject } from "../InteractiveObject";
import { SceneSection } from "../SceneSection";
import { useJourney } from "../JourneyProvider";

export function SkillsScene() {
  const { reducedMotion } = useJourney();

  return (
    <SceneSection id="skills" label="Skills" height={2}>
      <div className="mx-auto max-w-5xl">
        <header className="max-w-xl">
          <p className="eyebrow">Over the mountains</p>
          <h2 className="mt-4 text-3xl text-foreground sm:text-5xl">What I know</h2>
        </header>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <motion.li
              key={group.label}
              initial={reducedMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <InteractiveObject
                className="glass-panel h-full rounded-lg p-6 transition-colors hover:border-foreground/25"
                intensity={7}
                lift={8}
              >
                <h3 className="text-lg text-foreground">{group.label}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-background/40 px-3 py-1 text-xs tracking-wide text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </InteractiveObject>
            </motion.li>
          ))}
        </ul>
      </div>
    </SceneSection>
  );
}