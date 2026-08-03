import { motion } from "motion/react";
import { profile, portfolioStats } from "@/lib/resume";
import { RichText } from "../RichText";
import { SceneSection } from "../SceneSection";
import { useJourney } from "../JourneyProvider";

export function AboutScene() {
  const { reducedMotion } = useJourney();

  return (
    <SceneSection id="about" label="About" height={2.6}>
      <div className="mx-auto max-w-5xl">
        {/* Header — open, no box */}
        <header className="max-w-2xl">
          {/* <p className="eyebrow">Above the clouds</p> */}
          <h2 className="mt-4 text-3xl leading-tight text-foreground sm:text-5xl">
            {profile.name}
          </h2>
          <p className="mt-3 text-sm tracking-wide text-foreground sm:text-base">
            {profile.title}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-foreground sm:text-xl">
            <RichText text={profile.tagline} />
          </p>
        </header>

        {/* Stats strip — visual interest */}
        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {portfolioStats.map((stat, index) => (
            <motion.li
              key={stat.label}
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel rounded-lg px-5 py-6 text-center"
            >
              <span className="block font-display text-3xl text-foreground sm:text-4xl">
                {stat.value}
              </span>
              <span className="mt-2 block text-[0.65rem] uppercase tracking-[0.18em] text-foreground">
                {stat.label}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* Row 1 — The Story (big box) */}
        <motion.section
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass-panel mt-12 rounded-xl p-7 sm:p-10"
        >
          <p className="eyebrow">About</p>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-foreground sm:text-lg">
            {profile.about.map((line) => (
              <p key={line}>
                <RichText text={line} />
              </p>
            ))}
          </div>
        </motion.section>

        {/* Row 2 — Education & Certifications */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <motion.section
            initial={reducedMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel rounded-xl p-7 sm:p-8"
          >
            <p className="eyebrow">Education</p>
            <div className="mt-5">
              <p className="font-medium text-foreground">{profile.education.degree}</p>
              <p className="mt-1 text-sm text-foreground">{profile.education.school}</p>
              <p className="mt-1 text-sm text-foreground">
                {profile.education.period} · {profile.education.detail}
              </p>
            </div>
          </motion.section>

          <motion.section
            initial={reducedMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel rounded-xl p-7 sm:p-8"
          >
            <p className="eyebrow">Certifications</p>
            <ul className="mt-5 space-y-2.5">
              {profile.certifications.map((cert) => (
                <li
                  key={cert}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <RichText text={cert} />
                </li>
              ))}
            </ul>
          </motion.section>
        </div>

        {/* Resume CTA */}
        <div className="mt-12 text-center">
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-lg bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            View Resume
            <span aria-hidden="true" className="text-base leading-none">
              ↗
            </span>
          </a>
        </div>
      </div>
    </SceneSection>
  );
}