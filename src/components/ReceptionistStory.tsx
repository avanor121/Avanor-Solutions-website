import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { copy } from "../config/copy";
import { progress, scenes, clamp, smooth } from "../config/scenes";
import { useMedia } from "../hooks/useMotion";
import Story, { Demo, ScenePhoto } from "../overlay/Story";

gsap.registerPlugin(ScrollTrigger);

const dollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/**
 * The AI receptionist, at work: the six-scene scroll journey that used to
 * live on the homepage (Found, Answered, Booked, Nurtured, Tracked,
 * Closed), shown here on the AI Agents service page. The pinned stage and
 * the scene driver are the same as the homepage version, minus the hero
 * fade, the tracker dots and the mobile CTA, which belonged to that page.
 * Reduced-motion users get the stacked static version instead.
 */
export function ReceptionistStory() {
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const staticMode =
    reduced ||
    new URLSearchParams(location.search).get("motion") === "reduce";
  const storyRef = useRef<HTMLDivElement>(null!);
  const stageRef = useRef<HTMLDivElement>(null!);
  const headRef = useRef<HTMLDivElement>(null!);

  useLayoutEffect(() => {
    document.documentElement.dataset.motion = staticMode ? "reduce" : "full";
    if (staticMode) {
      progress.value = 0;
      return;
    }
    const panels = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scene]"),
    );
    const query = document.querySelector("[data-query]")!;
    const transcript = Array.from(
      document.querySelectorAll<HTMLElement>("[data-transcript]"),
    );
    const messages = Array.from(
      document.querySelectorAll<HTMLElement>("[data-message]"),
    );
    const counter = document.querySelector("[data-counter]")!;
    const lead = document.querySelector<HTMLElement>("[data-lead]")!;
    const booked = document.querySelector<HTMLElement>("[data-booked]")!;
    const render = (p: number) => {
      progress.value = p;
      headRef.current.style.opacity = String(1 - smooth(p / 0.065));
      headRef.current.style.visibility = p > 0.075 ? "hidden" : "visible";
      panels.forEach((panel, j) => {
        const s = scenes[j + 1];
        const local = (p - s.start) / (s.end - s.start);
        const opacity =
          local >= 0 && local <= 1
            ? Math.min(smooth(local / 0.12), smooth((1 - local) / 0.12))
            : 0;
        panel.style.setProperty("--scene-progress", String(clamp(local)));
        for (let beat = 0; beat < 3; beat++)
          panel.style.setProperty(
            `--beat-${beat}`,
            String(smooth((local - beat * 0.24) / 0.18)),
          );
        const turn =
          (j === 0 ? 360 : 55) * (1 - smooth(local / 0.2)) -
          35 * smooth((local - 0.85) / 0.15);
        panel.style.setProperty("--phone-spin", `${turn}deg`);
        panel.style.setProperty(
          "--photo-scale",
          String(1.025 + smooth(clamp(local)) * 0.065),
        );
        panel.style.setProperty(
          "--photo-pan",
          `${(clamp(local) - 0.5) * (j % 2 ? -14 : 14)}px`,
        );
        panel.style.setProperty(
          "--device-turn",
          `${Math.sin(clamp(local) * Math.PI * 2) * 5}deg`,
        );
        panel.style.setProperty(
          "--device-scale",
          String(0.94 + smooth(clamp(local) / 0.6) * 0.06),
        );
        panel.style.setProperty(
          "--screen-lift",
          `${j === 0 ? 0 : smooth(clamp(local) / 0.35) * 22}px`,
        );
        panel.style.opacity = String(opacity);
        panel.style.visibility = opacity > 0 ? "visible" : "hidden";
        panel.style.transform = `translateY(${(1 - opacity) * 24}px)`;
      });
      document.documentElement.style.setProperty("--progress", String(p));
      const found = clamp((p - 0.08) / 0.16) * 2.999;
      const q = copy.queries[Math.floor(found)];
      query.textContent =
        q.slice(0, Math.floor(clamp((found % 1) / 0.7) * q.length)) + "▏";
      transcript.forEach((el, i) => {
        el.style.opacity = String(
          smooth(((p - 0.24) / 0.14 - i * 0.26) / 0.12),
        );
      });
      messages.forEach((el, i) => {
        const v = smooth(((p - 0.5) / 0.12 - i * 0.2) / 0.13);
        el.style.opacity = String(v);
        el.style.transform = `translateY(${(1 - v) * 20}px)`;
      });
      counter.textContent = dollars.format(
        Math.round(2400000 * smooth((p - 0.64) / 0.13)),
      );
      lead.style.transform = `translateX(${smooth((p - 0.64) / 0.13) * 190}%)`;
      booked.style.opacity = String(0.25 + 0.75 * smooth((p - 0.4) / 0.06));
    };
    const trigger = ScrollTrigger.create({
      trigger: storyRef.current,
      start: "top top",
      end: "+=700%",
      pin: stageRef.current,
      scrub: true,
      onUpdate: (self) => render(self.progress),
      onRefresh: (self) => render(self.progress),
    });
    render(trigger.progress);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("orientationchange", refresh);
    requestAnimationFrame(refresh);
    return () => {
      trigger.kill();
      window.removeEventListener("orientationchange", refresh);
    };
  }, [staticMode]);

  return (
    <section className="svc-story" aria-label="The AI receptionist at work">
      {staticMode ? (
        <>
          <div className="svc-story-head">
            <span className="svc-eyebrow">The AI receptionist</span>
            <h2>The receptionist, at work.</h2>
            <p>
              Scroll through one customer&rsquo;s journey, from the first
              question to the five-star review.
            </p>
          </div>
          <div id="static-steps" className="static-steps">
            {copy.captions.map((s, i) => (
              <article key={s}>
                <span className="eyebrow">{scenes[i + 1].name}</span>
                <h2>{s}</h2>
                <ScenePhoto index={i} />
                <Demo index={i} />
                <small>{copy.demo}</small>
              </article>
            ))}
          </div>
        </>
      ) : (
        <div ref={storyRef} className="scroll-story">
          <div ref={stageRef} className="stage">
            <div
              ref={headRef}
              className="svc-story-head svc-story-head--in-stage"
            >
              <span className="svc-eyebrow">The AI receptionist</span>
              <h2>The receptionist, at work.</h2>
              <p>
                Scroll through one customer&rsquo;s journey, from the first
                question to the five-star review.
              </p>
            </div>
            <Story />
          </div>
        </div>
      )}
    </section>
  );
}
