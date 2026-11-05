import { useEffect, useRef, useState } from 'react';
import Application from '../components/Application';
import './plastic-surgeons.css';
import './trade-vsl.css';

type TradeConfig = {
  edition: string;
  audience: string;
  title: string;
  emphasis: string;
  description: string;
  baseline: [string, string, string];
  overviewTitle: string;
  overviewDescription: string;
  principles: [string, string, string][];
  questions: [string, string, string][];
  closeTitle: string;
  closeDescription: string;
  disclaimer: string;
  accent: string;
  deep: string;
};

type TradeKind = 'plumbers' | 'window-siding-replacement';

const tradeConfigs: Record<TradeKind, TradeConfig> = {
  plumbers: {
    edition: 'THE PLUMBING EDITION — 02',
    audience: 'FOR PLUMBING COMPANIES',
    title: `The answer
when the call
<em>cannot wait.</em>`,
    emphasis: 'A CLEARER ROUTE FROM URGENT CALL TO BOOKED JOB.',
    description: 'A leaking pipe, no hot water or a stalled project does not wait for office hours. Connect how homeowners find you, how every inquiry is answered, and how the right job reaches your calendar.',
    baseline: ['LOCAL VISIBILITY', 'FAST RESPONSE', 'BOOKED WORK'],
    overviewTitle: `Your crew.
<em>A connected front door.</em>`,
    overviewDescription: 'See how one system can help turn a first call, form or local search into a clear next step for your team.',
    principles: [
      ['01', 'Be easy to find.', 'Help Google and AI search understand the services and locations you actually cover.'],
      ['02', 'Answer while it matters.', 'Give each caller a prompt, useful response and route urgent needs to the right next step.'],
      ['03', 'Keep work moving.', 'Organize follow-up, scheduling and job details so good opportunities do not go cold.'],
    ],
    questions: [
      ['Will it sound like our company?', '01 / CUSTOMER EXPERIENCE', 'Shape the receptionist around your service area, common jobs and the way your team speaks to customers.'],
      ['What happens with urgent calls?', '02 / PRIORITIES', 'Capture the right details and create a clear handoff path for the situations your team needs to handle.'],
      ['Will it work with our dispatch?', '03 / YOUR WORKFLOW', 'Map where a conversation belongs next—whether that is a callback, an estimate or a scheduled visit.'],
      ['Can you guarantee local visibility?', '04 / HONEST EXPECTATIONS', 'We can improve what search systems can understand and measure; no one controls their recommendations.'],
      ['What does setup involve?', '05 / IMPLEMENTATION', 'We learn your services, response process and team handoffs before the system goes live.'],
      ['How do we know it fits?', '06 / THE INVESTMENT', 'Start with your inquiry volume, service mix and business goals—not a generic package.'],
    ],
    closeTitle: `Built for the calls
<em>your team needs to win.</em>`,
    closeDescription: 'Let’s talk about your current response process, dispatch workflow and where a connected system could help.',
    disclaimer: 'Business operations support only. Availability, AI recommendations and business outcomes are not guaranteed.',
    accent: '#4d8697',
    deep: '#244956',
  },
  'window-siding-replacement': {
    edition: 'THE EXTERIOR EDITION — 03',
    audience: 'FOR WINDOW & SIDING REPLACEMENT COMPANIES',
    title: `Make every
project inquiry
<em>feel considered.</em>`,
    emphasis: 'A CLEARER PATH FROM FIRST LOOK TO IN-HOME CONSULTATION.',
    description: 'A window or siding project is a considered decision. Connect how homeowners discover your company, how their questions are handled, and how interest becomes a well-prepared consultation.',
    baseline: ['PROJECT VISIBILITY', 'THOUGHTFUL RESPONSE', 'CONSULTATION FOLLOW-THROUGH'],
    overviewTitle: `Your craft.
<em>A connected first step.</em>`,
    overviewDescription: 'See how one system can support the journey from an initial renovation question to a booked in-home consultation.',
    principles: [
      ['01', 'Be understood.', 'Help search systems understand your project types, service area and the work your company is known for.'],
      ['02', 'Make the first reply count.', 'Give homeowners a clear, helpful next step while their project is still top of mind.'],
      ['03', 'Protect the follow-through.', 'Organize consultation follow-up so a serious project does not disappear between touchpoints.'],
    ],
    questions: [
      ['Can it reflect our brand?', '01 / HOMEOWNER EXPERIENCE', 'Shape the initial conversation around your project types, service area and consultation process.'],
      ['How are project details captured?', '02 / BETTER CONTEXT', 'Gather practical starting information so your team can prepare for the right conversation.'],
      ['Will it work with our sales team?', '03 / YOUR WORKFLOW', 'Define the handoff from first question to consultation, estimate and follow-up.'],
      ['Can you guarantee AI visibility?', '04 / HONEST EXPECTATIONS', 'We can improve clarity and measure progress; no one can promise a recommendation from AI platforms.'],
      ['What does setup involve?', '05 / IMPLEMENTATION', 'We learn your offers, qualification process and team handoffs before launch.'],
      ['How do we know it fits?', '06 / THE INVESTMENT', 'Start with your inquiry flow, project value and business goals—not a generic package.'],
    ],
    closeTitle: `Built around your company.
<em>And the homeowner journey.</em>`,
    closeDescription: 'Let’s talk about your inquiry process, sales handoff and where a connected system could help.',
    disclaimer: 'Business operations support only. AI recommendations and business outcomes are not guaranteed.',
    accent: '#a36f49',
    deep: '#5e3e29',
  },
};

function RichText({ children }: { children: string }) {
  const [first, em] = children.split('<em>');
  const lines = first.split('\n');
  return (
    <>
      {lines.map((line, i) => (
        <span key={i}>{line}{i < lines.length - 1 && <br />}</span>
      ))}
      {em && <em>{em.replace('</em>', '')}</em>}
    </>
  );
}

function PlumbingMotion() {
  return (
    <svg className="trade-motion plumbing-motion" viewBox="0 0 520 620" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="plumber-water" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#c5ecf2" />
          <stop offset="1" stopColor="#4d8697" />
        </linearGradient>
      </defs>
      <g className="service-pipe" stroke="currentColor" strokeWidth="17" strokeLinecap="round" strokeLinejoin="round">
        <path d="M74 454h142V368h179v126h54" />
        <path d="M74 454h142V368h179v126h54" stroke="#eff1ea" strokeWidth="8" />
        <circle cx="216" cy="368" r="23" fill="#e8e5dc" strokeWidth="5" />
        <path d="M193 368h46M216 345v46" strokeWidth="4" />
      </g>
      <g className="plumber-person">
        <circle cx="267" cy="132" r="47" fill="#e9c6a9" stroke="currentColor" strokeWidth="5" />
        <path d="M223 126c6-41 76-55 90-9-18-13-48-18-90 9Z" fill="currentColor" />
        <path d="M226 176c22-17 66-17 87 0l31 128-93 10-25-138Z" fill="#567f8b" stroke="currentColor" strokeWidth="5" />
        <path d="M255 307l-60 96 35 23 72-78" fill="#d6dee0" stroke="currentColor" strokeWidth="5" />
        <path d="M314 304l48 78 37-26-53-107" fill="#d6dee0" stroke="currentColor" strokeWidth="5" />
        <path d="M222 213l-57 81" stroke="#e9c6a9" strokeWidth="23" />
        <path d="M315 211l39 68" stroke="#e9c6a9" strokeWidth="23" />
        <path className="wrench-arm" d="M164 294l-31 50" stroke="#e9c6a9" strokeWidth="20" strokeLinecap="round" />
        <path className="wrench" d="m111 324 23 15-18 33-24-9 19-39Z" fill="#e8e5dc" stroke="currentColor" strokeWidth="5" />
        <path d="M195 402l-54 102M364 382l61 78" stroke="#263a40" strokeWidth="28" strokeLinecap="round" />
        <path d="M126 514h48M399 471h48" stroke="#263a40" strokeWidth="16" strokeLinecap="round" />
      </g>
      <g className="tool-case">
        <path d="M61 493h91v59H61z" fill="#d8b37e" stroke="currentColor" strokeWidth="5" />
        <path d="M85 493v-14h43v14M61 520h91" stroke="currentColor" strokeWidth="5" />
      </g>
      <path className="water-line" d="M449 494v40c0 21-13 36-33 46" stroke="url(#plumber-water)" strokeWidth="11" strokeLinecap="round" />
      <g className="water-drops" fill="url(#plumber-water)">
        <path d="M415 555c-13 17-17 26-17 35a17 17 0 1 0 34 0c0-9-4-18-17-35Z" />
        <path d="M464 536c-9 12-12 18-12 26a12 12 0 1 0 24 0c0-8-3-14-12-26Z" />
      </g>
      <path d="M55 543h408" stroke="currentColor" strokeDasharray="4 10" opacity=".32" />
    </svg>
  );
}

function ExteriorMotion() {
  return (
    <svg className="trade-motion exterior-motion" viewBox="0 0 520 620" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="window-sky" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#dce9ec" />
          <stop offset="1" stopColor="#91afb8" />
        </linearGradient>
        <linearGradient id="siding-shine" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".65" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g className="siding-panels" fill="#dbc6b2" stroke="currentColor" strokeWidth="2">
        <path d="M64 125h392v61H64z" />
        <path d="M64 202h392v61H64z" />
        <path d="M64 279h392v61H64z" />
        <path d="M64 356h392v61H64z" />
        <path d="M64 433h392v61H64z" />
      </g>
      <path className="siding-shine" d="M-90 115h108l260 390H170z" fill="url(#siding-shine)" opacity=".8" />
      <g className="window-frame">
        <rect x="142" y="112" width="238" height="344" rx="3" fill="#f6f3ec" stroke="currentColor" strokeWidth="14" />
        <rect x="160" y="130" width="202" height="308" fill="url(#window-sky)" />
        <path d="M261 130v308M160 284h202" stroke="currentColor" strokeWidth="10" />
        <path className="window-glint" d="M180 148h48l114 152v78z" fill="#fff" opacity=".42" />
      </g>
      <g className="home-lines" stroke="currentColor" opacity=".55">
        <path d="M100 512h320M120 531h280" strokeDasharray="4 9" />
        <path d="M91 98 261 39l170 59" strokeWidth="3" />
      </g>
    </svg>
  );
}

function TradePlayer({ trade, index, large = false }: { trade: TradeConfig; index: number; large?: boolean }) {
  const [opened, setOpened] = useState(false);
  const label = index === 0 ? 'A connected first step for your customers.' : trade.questions[index - 1][0];
  return (
    <div className={`surgical-player ${large ? 'featured-player' : ''}`}>
      <div className="video-art" aria-hidden="true" style={{ background: `radial-gradient(ellipse at 75% 20%, ${trade.accent}80, transparent 65%), linear-gradient(125deg, ${trade.deep}, #263b3a)` }}>
        <div className="video-aperture" />
        <span className="frame-corner tl" />
        <span className="frame-corner br" />
        <span className="video-monogram">A<span> / </span>{trade.edition.endsWith('02') ? 'P' : 'E'}</span>
      </div>
      <button className="video-placeholder" onClick={() => setOpened(!opened)} aria-expanded={opened} aria-label={`${opened ? 'Close' : 'Preview'} ${label}`}>
        <span className="play-circle" aria-hidden="true">▷</span>
        <span>{opened ? 'Video not yet added' : 'Preview video space'}</span>
        <small>{opened ? 'Your finished video will appear here.' : 'VIDEO PLACEHOLDER'}</small>
      </button>
      <div className="video-foot">
        <span>{large ? 'THE AVANOR APPROACH' : `CHAPTER 0${index}`}</span>
        <span>FILM COMING SOON ↗</span>
      </div>
    </div>
  );
}

export default function TradeVSL({ kind }: { kind: TradeKind }) {
  const trade = tradeConfigs[kind];
  const root = useRef<HTMLDivElement>(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    document.title = `${kind === 'plumbers' ? 'Plumbing Companies' : 'Window & Siding Replacement Companies'} — Avanor Solutions`;
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = 'noindex, nofollow';
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.content = trade.description;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('surgical-visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.12 },
    );
    root.current?.querySelectorAll('[data-surgical-reveal]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [kind, trade]);

  return (
    <div className="surgical-vsl trade-vsl" ref={root} style={{ '--surgical-copper': trade.accent } as React.CSSProperties}>
      <a href="#trade-film" className="surgical-skip">Skip to the film</a>
      <header className="surgical-nav">
        <span className="surgical-brand">avanor<span> / </span>solutions</span>
        <span className="surgical-edition">{trade.edition}</span>
        <button onClick={() => setModal(true)}>Discuss your company <span>↗</span></button>
      </header>
      <main>
        <section className="surgical-hero">
          <div className="contour-panel trade-contour">
            {kind === 'plumbers' ? <PlumbingMotion /> : <ExteriorMotion />}
            <span className="contour-caption">{trade.emphasis}</span>
          </div>
          <div className="surgical-hero-copy">
            <span className="surgical-kicker">{trade.audience}</span>
            <h1><RichText>{trade.title}</RichText></h1>
            <p>{trade.description}</p>
            <a href="#trade-film" className="surgical-watch">Explore the approach <span>↓</span></a>
          </div>
          <div className="hero-baseline">
            <span>{trade.baseline[0]}</span><i /><span>{trade.baseline[1]}</span><i /><span>{trade.baseline[2]}</span>
          </div>
        </section>
        <section className="surgical-film-section" id="trade-film">
          <div className="film-intro" data-surgical-reveal>
            <span className="surgical-kicker">01 / THE BIG PICTURE</span>
            <h2><RichText>{trade.overviewTitle}</RichText></h2>
            <p>{trade.overviewDescription}</p>
          </div>
          <div data-surgical-reveal className="featured-wrap">
            <TradePlayer trade={trade} index={0} large />
            <div className="featured-caption">
              <h3>A more connected path from first inquiry to the next right step.</h3>
              <span>MADE FOR YOUR COMPANY</span>
            </div>
          </div>
          <div className="surgical-principles" data-surgical-reveal>
            {trade.principles.map(([n, h, p]) => (
              <div key={n}><small>{n}</small><h3>{h}</h3><p>{p}</p></div>
            ))}
          </div>
        </section>
        <section className="surgical-chapters" id="questions">
          <div className="chapter-heading" data-surgical-reveal>
            <div>
              <span className="surgical-kicker">02 / A CLOSER LOOK</span>
              <h2>Good questions.<br /><em>Straight answers.</em></h2>
            </div>
            <p>Six short films covering the details that matter. Choose the question on your mind.</p>
          </div>
          <div className="chapter-grid">
            {trade.questions.map(([q, tag, a], i) => (
              <article key={q} data-surgical-reveal style={{ '--reveal-delay': `${i % 3 * 80}ms` } as React.CSSProperties}>
                <TradePlayer trade={trade} index={i + 1} />
                <span className="chapter-tag">{tag}</span>
                <h3>{q}</h3>
                <p>{a}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="surgical-close" data-surgical-reveal>
          <span className="surgical-kicker">03 / YOUR NEXT STEP</span>
          <h2><RichText>{trade.closeTitle}</RichText></h2>
          <p>{trade.closeDescription}</p>
          <button className="surgical-cta" onClick={() => setModal(true)}>Apply for a strategy call <span>↗</span></button>
          <small>A short application. A focused conversation.</small>
        </section>
      </main>
      <footer className="surgical-footer">
        <span>Avanor Solutions / {trade.edition.replace('THE ', '').replace(' — ', ' / ')}</span>
        <p>{trade.disclaimer}</p>
        <span>© {new Date().getFullYear()} Avanor Solutions</span>
      </footer>
      {modal && <Application close={() => setModal(false)} />}
    </div>
  );
}
