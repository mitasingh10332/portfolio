import { profile } from "@/lib/resume";
import { InteractiveObject } from "../InteractiveObject";
import { SceneSection } from "../SceneSection";

export function ContactScene() {
  return (
    <SceneSection id="contact" label="Contact" height={1.8}>
      <div className="mx-auto max-w-3xl text-center">
        {/* <p className="eyebrow">Golden hour</p> */}
        <h2 className="mt-6 text-4xl leading-tight text-foreground sm:text-6xl">
          Let’s Connect
        </h2>

        <InteractiveObject
          className="glass-panel mx-auto mt-12 rounded-xl p-8 sm:p-10"
          intensity={3}
          lift={5}
        >
          <ul className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-12">
            <li className="text-center">
              <span className="eyebrow block">Email</span>
              <a
                href={`mailto:${profile.contact.email}`}
                className="mt-2 inline-block text-base text-foreground underline-offset-4 transition-colors hover:text-accent-foreground hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {profile.contact.email}
              </a>
            </li>
            <li className="text-center">
              <span className="eyebrow block">Phone</span>
              <a
                href={`tel:${profile.contact.phone.replace(/\s/g, "")}`}
                className="mt-2 inline-block text-base text-foreground underline-offset-4 transition-colors hover:text-accent-foreground hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {profile.contact.phone}
              </a>
            </li>
            <li className="text-center">
              <span className="eyebrow block">LinkedIn</span>
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-base text-foreground underline-offset-4 transition-colors hover:text-accent-foreground hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {profile.contact.linkedin.replace("https://www.", "")}
              </a>
            </li>
          </ul>
        </InteractiveObject>

        <p className="mt-14 text-xs uppercase tracking-[0.24em] text-foreground">
          {profile.name} · {profile.title}
        </p>
      </div>
    </SceneSection>
  );
}