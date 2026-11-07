import { useEffect } from "react";
import { BRAND_NAME, BOOKING_URL } from "../config/settings";
import { theme } from "../config/theme";
import { copy } from "../config/copy";
import { SERVICES, SERVICES_OVERVIEW, type Service } from "./data";
import { Connected, Industries } from "../components/Walkthrough";
import { ReceptionistStory } from "../components/ReceptionistStory";
import { ServicesMenu } from "../components/ServiceMenu";
import "./services.css";

const openBooking = () =>
  window.open(BOOKING_URL, "_blank", "noopener,noreferrer");

function useTheme() {
  useEffect(() => {
    Object.entries(theme).forEach(([key, value]) =>
      document.documentElement.style.setProperty(`--${key}`, value),
    );
  }, []);
}

function renderHeadline(headline: string, highlight: string) {
  const parts = headline.split(highlight);
  if (parts.length < 2) return headline;
  return (
    <>
      {parts[0]}
      <span className="svc-accent">{highlight}</span>
      {parts.slice(1).join(highlight)}
    </>
  );
}

function ServiceNav({ active }: { active: "services" }) {
  return (
    <header className="nav svc-nav">
      <a className="wordmark" href="/" aria-label="Avanor Solutions home">
        {BRAND_NAME}
      </a>
      <nav aria-label="Main navigation">
        <ServicesMenu active={active === "services"} />
        <a href="/#how">How it works</a>
        <a href="/#faq">FAQs</a>
      </nav>
      <button className="nav-cta" onClick={openBooking}>
        {copy.ui.applyNow} <span>↗</span>
      </button>
    </header>
  );
}

function ServiceFooter() {
  return (
    <footer className="svc-footer">
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
  );
}

function CtaBand({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="svc-cta-band">
      <h3>{title}</h3>
      <p>{sub}</p>
      <button className="svc-cta-button" onClick={openBooking}>
        Book a Free Audit <span aria-hidden="true">↗</span>
      </button>
    </div>
  );
}

export function ServicesOverview() {
  useTheme();
  useEffect(() => {
    document.title = "Services — Avanor Solutions";
  }, []);
  return (
    <>
      <a className="skip" href="#services">
        Skip to services
      </a>
      <ServiceNav active="services" />
      <main className="svc-page">
        <section id="services" className="svc-section svc-fade">
          <div className="svc-eyebrow">{SERVICES_OVERVIEW.eyebrow}</div>
          <h1>
            {renderHeadline(
              SERVICES_OVERVIEW.headline,
              SERVICES_OVERVIEW.highlight,
            )}
          </h1>
          <p className="svc-lead">{SERVICES_OVERVIEW.lead}</p>
          <div className="svc-grid">
            {SERVICES.map((service, i) => (
              <a
                key={service.slug}
                className={`svc-card${i === 0 ? " svc-card-free" : ""}`}
                href={`/services/${service.slug}/`}
              >
                {i === 0 ? (
                  <span className="svc-tag">Start here — free</span>
                ) : (
                  <span className="svc-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
                <h3>{service.title}</h3>
                <p>{service.short}</p>
                <span className="svc-go">
                  {i === 0 ? "Book a free audit" : "See the service"} →
                </span>
              </a>
            ))}
          </div>
          <Industries />
          <CtaBand
            title="Find out where AI pays in your business."
            sub="Free. 15 to 30 minutes. Your numbers, not ours."
          />
        </section>
      </main>
      <ServiceFooter />
    </>
  );
}

function PriceRow({ service }: { service: Service }) {
  if (!service.price) return null;
  return (
    <div className="svc-price-row">
      <div className="svc-price-box">
        <div className="svc-price-label">Other agencies charge</div>
        <div className="svc-price-amount">
          <span className="svc-strike">{service.price.other}</span>
        </div>
        <p>{service.price.otherNote}</p>
      </div>
      <div className="svc-price-box svc-price-free">
        <div className="svc-price-label">Avanor audit</div>
        <div className="svc-price-amount svc-accent">
          {service.price.ours}
        </div>
        <p>{service.price.oursNote}</p>
      </div>
    </div>
  );
}

export function ServiceDetail({ slug }: { slug: string }) {
  useTheme();
  const service = SERVICES.find((s) => s.slug === slug);
  useEffect(() => {
    document.title = service
      ? `${service.title} — Avanor Solutions`
      : "Services — Avanor Solutions";
  }, [service]);
  if (!service) return <ServicesOverview />;
  const isAgents = service.slug === "ai-agents";
  return (
    <>
      <a className="skip" href="#service">
        Skip to service
      </a>
      <ServiceNav active="services" />
      <main className="svc-page">
        <section
          id="service"
          className={`svc-section svc-fade${isAgents ? " svc-section--before-story" : ""}`}
        >
          <div className="svc-eyebrow">{service.eyebrow}</div>
          <h1>{renderHeadline(service.headline, service.highlight)}</h1>
          <p className="svc-lead">{service.lead}</p>
          <PriceRow service={service} />
          {service.examples && service.examples.length > 0 && (
            <div className="svc-examples">
              <h3>{service.examplesTitle ?? "Template examples"}</h3>
              <div className="svc-ex-grid">
                {service.examples.map((example) => (
                  <div key={example.title} className="svc-ex">
                    <h4>{example.title}</h4>
                    <p>{example.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="svc-disclaimer">
            <strong>
              {service.slug === "free-business-audit"
                ? "Free, with no obligation."
                : "These are template examples."}
            </strong>{" "}
            {service.slug === "free-business-audit"
              ? service.disclaimer
              : service.disclaimer.replace(
                  /^These are template examples\.?\s*/,
                  "",
                )}
          </div>
          <div className="svc-steps">
            {service.steps.map((step, i) => (
              <div key={step.title} className="svc-step">
                <div className="svc-step-k">Step {i + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
          {!isAgents && (
            <CtaBand title={service.ctaTitle} sub={service.ctaSub} />
          )}
        </section>
        {isAgents && <ReceptionistStory />}
        {isAgents && (
          <section className="svc-section svc-section--after-story">
            <Connected open={openBooking} />
            <CtaBand title={service.ctaTitle} sub={service.ctaSub} />
          </section>
        )}
      </main>
      <ServiceFooter />
    </>
  );
}
