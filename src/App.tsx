import {
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { copy } from "./config/copy";
import { BRAND_NAME, BOOKING_URL } from "./config/settings";
import { theme } from "./config/theme";
import { progress, scenes, clamp, smooth } from "./config/scenes";
import { useMedia } from "./hooks/useMotion";
import Story, { Demo, ScenePhoto } from "./overlay/Story";
import { Connected, Opportunity, Engine, Industries, How, Proof, Fit, FAQ, Finale } from "./components/Walkthrough";
gsap.registerPlugin(ScrollTrigger);
const dollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
export default function App() {
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const staticMode =
    reduced ||
    new URLSearchParams(location.search).get("motion") === "reduce";
  const story = useRef<HTMLDivElement>(null!),
    stage = useRef<HTMLDivElement>(null!),
    canvas = useRef<HTMLDivElement>(null!);
  const lenisRef = useRef<Lenis | null>(null);
  const open = () => window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
  const CTA = () => (
    <button className="button" onClick={open}>
      {copy.cta}
      <span aria-hidden="true">↗</span>
    </button>
  );
  useEffect(() => {
    Object.entries(theme).forEach(([key, value]) =>
      document.documentElement.style.setProperty(`--${key}`, value),
    );
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('in-view', entry.isIntersecting)), {threshold: .12});
    document.querySelectorAll('.normal-flow > section').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useLayoutEffect(() => {
    document.documentElement.dataset.motion = staticMode ? "reduce" : "full";
    if (staticMode) {
      progress.value = 0;
      return;
    }
    const lenis = new Lenis({ smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const panels = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scene]"),
    );
    const dots = Array.from(
      document.querySelectorAll<HTMLElement>(".tracker button"),
    );
    const hero = document.querySelector<HTMLElement>(".hero")!;
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
    const sticky = document.querySelector<HTMLElement>(".mobile-cta")!;
    const track = document.querySelector<HTMLElement>(".tracker")!;
    const render = (p: number) => {
      progress.value = p;
      hero.style.opacity = String(1 - smooth(p / 0.065));
      hero.style.visibility = p > 0.075 ? "hidden" : "visible";
      canvas.current.style.opacity = String(1 - smooth(p / .075));
      canvas.current.style.visibility = p >= .08 ? "hidden" : "visible";
      panels.forEach((panel, j) => {
        const s = scenes[j + 1];
        const local = (p - s.start) / (s.end - s.start);
        const opacity =
          local >= 0 && local <= 1
            ? Math.min(smooth(local / 0.12), smooth((1 - local) / 0.12))
            : 0;
        panel.style.setProperty("--scene-progress", String(clamp(local)));
        for(let beat=0;beat<3;beat++) panel.style.setProperty(`--beat-${beat}`, String(smooth((local-beat*.24)/.18)));
        const turn=(j===0?360:55)*(1-smooth(local/.2))-35*smooth((local-.85)/.15);
        panel.style.setProperty("--phone-spin", `${turn}deg`);
        panel.style.setProperty("--photo-scale", String(1.025 + smooth(clamp(local))*.065));
        panel.style.setProperty("--photo-pan", `${(clamp(local)-.5)*(j%2?-14:14)}px`);
        panel.style.setProperty("--device-turn", `${Math.sin(clamp(local)*Math.PI*2)*5}deg`);
        panel.style.setProperty("--device-scale", String(.94 + smooth(clamp(local)/.6)*.06));
        panel.style.setProperty("--screen-lift", `${j === 0 ? 0 : smooth(clamp(local)/.35)*22}px`);
        panel.style.opacity = String(opacity);
        panel.style.visibility = opacity > 0 ? "visible" : "hidden";
        panel.style.transform = `translateY(${(1 - opacity) * 24}px)`;
      });
      dots.forEach((d, i) => {
        d.classList.toggle(
          "active",
          p >= scenes[i + 1].start && p < scenes[i + 1].end,
        );
      });
      track.style.opacity = p > 0.07 && p < 0.93 ? "1" : "0";
      sticky.classList.toggle("shown", p > 0.08);
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
      trigger: story.current,
      start: "top top",
      end: "+=700%",
      pin: stage.current,
      scrub: true,
      onUpdate: (self) => render(self.progress),
      onRefresh: (self) => render(self.progress),
    });
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".section-heading, .finale-walk").forEach((el) => {
        const heading = el.querySelector('h2');
        const eyebrow = el.querySelector('.eyebrow');
        const description = el.querySelector(':scope > p');
        const timeline = gsap.timeline({scrollTrigger:{trigger:el,start:'top 88%',once:true}});
        if (eyebrow) timeline.from(eyebrow,{opacity:0,y:6,duration:.35,ease:'power2.out'},0);
        if (heading) timeline.from(heading,{opacity:0,y:18,clipPath:'inset(0 0 100% 0)',duration:.75,ease:'power3.out'},.08);
        if (description) timeline.from(description,{opacity:0,y:8,duration:.45,ease:'power2.out'},.3);
      });
    });
    render(trigger.progress);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("orientationchange", refresh);
    requestAnimationFrame(refresh);
    return () => {
      ctx.revert();
      trigger.kill();
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove(tick);
      window.removeEventListener("orientationchange", refresh);
    };
  }, [staticMode]);
  const jump = (p: number) => {
    const st = ScrollTrigger.getAll().find((t) => t.vars.pin === stage.current);
    const y = st ? st.start + (st.end - st.start) * p : 0;
    lenisRef.current
      ? lenisRef.current.scrollTo(y)
      : window.scrollTo({ top: y, behavior: "smooth" });
  };
  return (
    <>
      <a className="skip" href="#engine">
        Skip to What we do
      </a>
      <header className="nav">
        <a className="wordmark" href="#" aria-label="Avanor Solutions home">
          {BRAND_NAME}
        </a>
        <nav aria-label="Main navigation">
          <a href="#engine">What we do</a>
          <a href="/services/">Services</a>
          <a href="#how">How it works</a>
          <a href="#faq">FAQs</a>
        </nav>
        <button className="nav-cta" onClick={open}>
          {copy.ui.applyNow} <span>↗</span>
        </button>
      </header>
      <main>
        <div className={`canvas photo-hero ${staticMode ? "static-photo-hero" : ""}`} ref={canvas} aria-hidden="true"><div className="hero-engine-mark"><span/><span/><span/></div></div>
        <div
          ref={story}
          id="story"
          className={staticMode ? "static-story" : "scroll-story"}
        >
          <div ref={stage} className="stage">
            <section className="hero">
              {copy.eyebrow && <div className="eyebrow">{copy.eyebrow}</div>}
              <h1>
                {copy.heroLines[0]}{" "}
                <span>{copy.heroLines[1]}</span>
                <br className="desktop-break" /> {copy.heroLines[2]}{" "}
                <span>{copy.heroLines[3]}</span>
                <br />
                {copy.heroLines[4]}
              </h1>
              <p>{copy.intro}</p>
              <div className="hero-actions">
                <CTA />
                <button
                  className="text-link"
                  onClick={() =>
                    staticMode
                      ? document
                          .getElementById("static-steps")
                          ?.scrollIntoView()
                      : jump(0.1)
                  }
                >
                  {copy.ui.seeHow} <span>↓</span>
                </button>
              </div>
              <small>{copy.micro}</small>
              <div className="hero-bottom">
                <span>From first click to five-star review.</span>
                <span>
                  Scroll to explore <b>↓</b>
                </span>
              </div>
            </section>
            {!staticMode && <Story />}
          </div>
        </div>
        {staticMode && (
          <section id="static-steps" className="static-steps">
            {copy.captions.map((s, i) => (
              <article key={s}>
                <span className="eyebrow">{scenes[i + 1].name}</span>
                <h2>{s}</h2>
                <ScenePhoto index={i}/><Demo index={i} />
                <small>{copy.demo}</small>
              </article>
            ))}
          </section>
        )}
        <aside className="tracker" aria-label="Workflow progress">
          {scenes.slice(1, 7).map((s) => (
            <button
              key={s.name}
              onClick={() => jump(s.start + 0.025)}
              aria-label={`View ${s.name}`}
            >
              <i />
              <span>{s.name}</span>
            </button>
          ))}
        </aside>
        <div className="normal-flow">
          <Connected open={open}/>
          <Opportunity/>
          <Engine open={open}/>
          <Industries/>
          <How/>
          <Proof open={open}/>
          <Fit open={open}/>
          <FAQ/>
          <Finale open={open}/>
          <footer>
            <div>
              <span>© {BRAND_NAME}</span>
              <div>
                <a href="/privacy/">Privacy</a>
                <a href="/terms/">Terms</a>
                <a href="/cookies/">Cookies</a>
              </div>
            </div>
            <p>{copy.disclaimer}</p>
          </footer>
        </div>
      </main>
      <div className={`mobile-cta ${staticMode ? "shown" : ""}`}>
        <CTA />
      </div>
    </>
  );
}
