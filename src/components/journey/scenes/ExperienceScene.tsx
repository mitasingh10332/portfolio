import { experience } from "@/lib/resume";
import { InteractiveObject } from "../InteractiveObject";
import { RichText } from "../RichText";
import { SceneSection } from "../SceneSection";

export function ExperienceScene() {
  return (
    <SceneSection id="experience" label="Experience" height={1.9}>
      <div className="mx-auto max-w-4xl">
        <header className="max-w-xl">
          {/* <p className="eyebrow">Into the city</p> */}
          <h2 className="mt-4 text-3xl text-foreground sm:text-5xl">Experience</h2>
        </header>

        <div className="mt-12 space-y-8">
          {experience.map((role) => (
            <InteractiveObject
              key={role.company}
              className="glass-panel rounded-xl p-8 sm:p-10"
              intensity={4}
              lift={8}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <h3 className="text-2xl text-foreground sm:text-3xl">{role.company}</h3>
                  <p className="mt-1 text-sm text-foreground">{role.role}</p>
                </div>
                <p className="text-xs uppercase tracking-[0.24em] text-foreground">{role.period}</p>
              </div>

              <ul className="mt-8 space-y-4">
                {role.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-4 text-sm leading-relaxed text-foreground">
                    <span aria-hidden="true" className="mt-2.5 h-px w-6 shrink-0 bg-foreground/30" />
                    <RichText text={highlight} />
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-2 border-t border-border pt-6">
                {role.tech.map((tech) => (
                  <span key={tech} className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </InteractiveObject>
          ))}
        </div>
      </div>
    </SceneSection>
  );
}