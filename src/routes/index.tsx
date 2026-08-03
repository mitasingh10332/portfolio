import { createFileRoute } from "@tanstack/react-router";
import { JourneyProvider } from "@/components/journey/JourneyProvider";
import { Environment } from "@/components/journey/Environment";
import { Bird } from "@/components/journey/Bird";
import { JourneyNav } from "@/components/journey/JourneyNav";
import { OpeningScene } from "@/components/journey/scenes/OpeningScene";
import { AboutScene } from "@/components/journey/scenes/AboutScene";
import { SkillsScene } from "@/components/journey/scenes/SkillsScene";
import { ExperienceScene } from "@/components/journey/scenes/ExperienceScene";
import { ProjectsScene } from "@/components/journey/scenes/ProjectsScene";
import { ContactScene } from "@/components/journey/scenes/ContactScene";

const title = "Mita Singh  — Frontend Developer & Software Engineer";
const description =
  "A scroll-driven journey through the work of Mita Singh : React.js, Next.js and TypeScript applications, cloud deployment on AWS and Vercel.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Journey,
});

function Journey() {
  return (
    <JourneyProvider>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <Environment />
      <Bird />
      <JourneyNav />

      <main className="relative z-10 pb-24 md:pb-0">
        <OpeningScene />
        <AboutScene />
        <SkillsScene />
        <ExperienceScene />
        <ProjectsScene />
        <ContactScene />
      </main>
    </JourneyProvider>
  );
}
