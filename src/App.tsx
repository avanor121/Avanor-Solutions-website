import {
  useEffect,
  useState,
} from "react";
import { copy } from "./config/copy";
import { BRAND_NAME, BOOKING_URL } from "./config/settings";
import { theme } from "./config/theme";
import { useMedia } from "./hooks/useMotion";
import { Opportunity, How, Proof, FAQ, Finale } from "./components/Walkthrough";
import { ServicesMenu } from "./components/ServiceMenu";
export default function App() {
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const [scrolled, setScrolled] = useState(false);
  const open = () => window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
  const CTA = () => (
    <button className="button" onClick={open}>
      {copy.cta}
      <span aria-hidden="true">↗</span>
    </button>
  );
  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "reduce" : "full";
  }, [reduced]);
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
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const seeHow = () =>
    document.getElementById("how")?.scrollIntoView({ behavior: "smooth" });
  return (
    <>
      <a className="skip" href="#proof">
        Skip to main content
      </a>
      <header className="nav">
        <a className="wordmark" href="#" aria-label="Avanor Solutions home">
          {BRAND_NAME}
        </a>
        <nav aria-label="Main navigation">
          <ServicesMenu />
          <a href="#how">How it works</a>
          <a href="#faq">FAQs</a>
        </nav>
        <button className="nav-cta" onClick={open}>
          {copy.ui.applyNow} <span>↗</span>
        </button>
      </header>
      <main>
        <div className="canvas photo-hero" aria-hidden="true"><div className="hero-engine-mark"><span/><span/><span/></div></div>
        <div className="stage">
          <section className="hero">
            {copy.eyebrow && <div className="eyebrow">{copy.eyebrow}</div>}
            <h1>
              {copy.heroLines[0]}
              <br /> <span>{copy.heroLines[1]}</span>
              <br /> {copy.heroLines[2]}{" "}
              <span>{copy.heroLines[3]}</span>
              <br />
              {copy.heroLines[4]}
            </h1>
            <p>{copy.intro}</p>
            <div className="hero-actions">
              <CTA />
              <button
                className="text-link"
                onClick={seeHow}
              >
                {copy.ui.seeHow} <span>↓</span>
              </button>
            </div>
            <small>{copy.micro}</small>
          </section>
        </div>
        <div className="normal-flow">
          <Proof open={open}/>
          <Opportunity/>
          <How/>
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
      <div className={`mobile-cta ${scrolled ? "shown" : ""}`}>
        <CTA />
      </div>
    </>
  );
}
