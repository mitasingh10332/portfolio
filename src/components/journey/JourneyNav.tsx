import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { chapters } from "@/lib/resume";
import { useJourney } from "./JourneyProvider";

/** A quiet chapter index. Always reachable, never in the way. */
export function JourneyNav() {
  const { progress, reducedMotion } = useJourney();
  const [active, setActive] = useState(chapters[0]!.id);

  useEffect(() => {
    const sections = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const computeActive = () => {
      const mid = window.innerHeight / 2;
      // Prefer the section whose rect contains the viewport centre.
      const containing = sections.find((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= mid && r.bottom >= mid;
      });
      if (containing) return containing.id;

      // Fallback: pick the section whose centre is closest to the viewport centre.
      let best = sections[0]!;
      let bestDist = Infinity;
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        const dist = Math.abs((r.top + r.bottom) / 2 - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = s;
        }
      }
      return best.id;
    };

    setActive(computeActive());
    let raf = 0;
    const loop = () => {
      setActive(computeActive());
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const onResize = () => setActive(computeActive());
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 z-50 h-px w-full origin-left bg-ink/40"
        style={{ scaleX: progress }}
      />
      <nav
        aria-label="Journey chapters"
        className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 md:block"
      >
        <ul className="flex flex-col gap-1">
          {chapters.slice(1).map((chapter) => {
            const isActive = active === chapter.id;
            return (
              <li key={chapter.id}>
                <button
                  type="button"
                  onClick={() => goTo(chapter.id)}
                  aria-current={isActive ? "true" : undefined}
                  className="group flex items-center gap-3 rounded-full px-3 py-2 text-right text-xs tracking-[0.18em] uppercase text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <span
                    className={`transition-opacity duration-500 ${isActive ? "opacity-100 text-foreground" : "opacity-0 group-hover:opacity-70 group-focus-visible:opacity-100"}`}
                  >
                    {chapter.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`h-px transition-all duration-500 ${isActive ? "w-8 bg-foreground" : "w-3 bg-muted-foreground group-hover:w-5"}`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile: compact chapter bar */}
      <nav
        aria-label="Journey chapters"
        className="fixed bottom-0 left-0 z-40 w-full overflow-x-auto border-t border-border bg-background px-3 py-2 shadow-[0_-12px_30px_-18px_oklch(0.24_0.03_255/0.45)] md:hidden"
      >
        <ul className="flex min-w-max items-center justify-between gap-2">
          {chapters.slice(1).map((chapter) => (
            <li key={chapter.id}>
              <button
                type="button"
                onClick={() => goTo(chapter.id)}
                aria-current={active === chapter.id ? "true" : undefined}
                className={`rounded-full px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.16em] transition-colors ${
                  active === chapter.id ? "bg-ink/10 text-foreground" : "text-muted-foreground"
                }`}
              >
                {chapter.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
