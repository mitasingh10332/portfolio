import { useState } from "react";
import { motion } from "motion/react";
import { projects } from "@/lib/resume";
import { RichText } from "../RichText";
import { SceneSection } from "../SceneSection";
import { useJourney } from "../JourneyProvider";

export function ProjectsScene() {
  const { reducedMotion } = useJourney();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <SceneSection id="projects" label="Projects" height={2.4}>
      <div className="mx-auto max-w-5xl">
        <header className="max-w-xl">
          {/* <p className="eyebrow">The digital expanse</p> */}
          <h2 className="mt-4 text-3xl text-foreground sm:text-5xl">Projects</h2>
        </header>

        <ul className="mt-14 grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => {
            const expanded = open === project.name;
            return (
              <motion.li
                key={project.name}
                initial={reducedMotion ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={index % 2 === 1 ? "md:mt-16" : undefined}
              >
                <motion.div
                  className="h-full"
                  {...(reducedMotion ? {} : { whileHover: { scale: 1.03 } })}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* screen bezel */}
                  <div className="glass-panel h-full overflow-hidden rounded-xl">
                    <div className="flex items-center gap-1.5 border-b border-border px-5 py-3">
                      {/* <span className="h-1.5 w-1.5 rounded-full bg-foreground/25" />
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground/15" /> */}
                      <span className="ml-3 text-[0.65rem] uppercase tracking-[0.2em] text-foreground">
                        <RichText text={project.subtitle} />
                      </span>
                    </div>

                    <div className="p-7 sm:p-8">
                      <h3 className="text-2xl text-foreground">{project.name}</h3>
                      <p className="mt-4 text-sm leading-relaxed text-foreground">
                        <RichText text={project.description} />
                      </p>

                      <button
                        type="button"
                        onClick={() => setOpen(expanded ? null : project.name)}
                        aria-expanded={expanded}
                        className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        {expanded ? "Less" : "More detail"}
                        <span aria-hidden="true" className="h-px w-6 bg-current" />
                      </button>

                      <motion.div
                        initial={false}
                        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pt-5 text-sm leading-relaxed text-foreground">
                          <RichText text={project.detail} />
                        </p>
                      </motion.div>

                      <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-6">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </SceneSection>
  );
}