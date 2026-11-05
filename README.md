# Avanor Solutions

A procedural, scroll-driven studio homepage built with Vite, React and TypeScript. All direct dependencies use exact versions, and package-lock.json pins the dependency graph. No remote imagery, fonts, models, environments or video are requested.

## Run

Use Node.js 22.12+ (tested with Node 26).

```sh
npm install
npm run dev
```

The development server binds to localhost. For a reproducible install use `npm ci`.

```sh
npm run build
npm run preview
```

## Edit

- `src/config/copy.ts`: supplied marketing copy, FAQ, application fields and demo content.
- `src/config/theme.ts`: theme colors, applied as CSS custom properties.
- `src/style.css`: typography, spacing, component tokens and responsive layouts.
- `src/config/scenes.ts`: scene ranges, camera keyframes, named poses and mutable progress store.
- `src/scenes/Studio.tsx`: procedural geometry, studio lights and reversible poses.
- `src/overlay/Story.tsx`: real-DOM demo interfaces.
- `src/config/settings.ts`: brand, `BOOKING_URL`, `FORM_ENDPOINT`, `SHOW_PROOF=false`, `SHOW_PRICE=false`.

## Application integration

The default endpoint and booking URL are empty. The form validates input and clearly confirms preview mode; it does not store or send details. Set `FORM_ENDPOINT` to an HTTPS service accepting a JSON POST. It must allow your site's origin through CORS and handle validation, spam prevention and storage. A non-2xx response leaves the visitor in the form with a retry message. Set `BOOKING_URL` to an HTTPS scheduling page. After successful submission, name and email are appended as query parameters. With only a booking URL configured, the form redirects without POSTing. With only an endpoint, it shows receipt confirmation. No backend has been invented.

Privacy and Terms are explicit placeholders and need real policies before public launch. No analytics or cookies are installed by this application.

## Architecture

One fixed canvas sits behind the DOM. A pinned viewport plus 700 viewport-heights of scroll creates an approximately 800vh story. ScrollTrigger writes a single mutable progress value; camera, poses and overlays derive directly from that value. No progress is stored in React state. All typing, transcript, reminders and pipeline counting are scroll-derived. Lenis feeds ScrollTrigger and runs on the GSAP ticker. Effects and listeners clean up on unmount. Context failure falls back to the static story.

The optional `?motion=reduce` URL also selects the reduced-motion layout for preview and sharing. Reduced-motion users receive all six steps as readable stacked HTML, with no canvas or smooth scrolling. The canvas pauses when the document is hidden. DPR is capped at 2 desktop / 1.5 mobile; shared materials and basic geometry keep the scene light. Contact shadow resolution drops to 128 on mobile. The canvas is lazy-loaded. There are no Environment presets, external assets or postprocessing effects.

Native modal dialog provides focus containment, backdrop inertness and Escape dismissal; focus returns to the opener. The FAQ uses native details/summary. Visible keyboard focus rings and a skip link are included.

## Deploy to Vercel

Import this directory as a Vite project. Install with `npm ci`, build with `npm run build`, output directory `dist`. No server routes are needed. Configure application URLs in settings.ts before building.

## Deploy to ChatGPT Sites

The private Site identity and static `dist` directory are in `.openai/hosting.json`. Use the Sites source workflow to commit/push the exact source, build and package `dist`, then save/deploy that version. Keep the existing project ID. Do not put credentials in source. The Site remains owner-private unless explicitly shared.

## Assumptions

- The supplied business claims and seven-day setup copy are approved copy, not independently verified promises.
- The $2,400,000 pipeline is illustrative demo data, labeled on the dashboard.
- No pricing, proof, testimonials, customer logos or guarantees are shown.
- The application and legal policies remain placeholders until real destinations/content are supplied.
- The experience uses stylized clay figures and a generic search interface; no third-party branding or assets.
- Device FPS depends on GPU and browser; physical-device performance has not been benchmarked.

## Visual update: supplied images

The story now uses the user's original PNG files in `public/images` with scroll-derived zoom, horizontal pan and gentle device tilt. No 3D models or WebGL canvas are mounted. The supplied hand-held phone photograph has a real HTML interface aligned over its screen. Steps 2–4 use the receptionist artwork, step 5 uses the office owner artwork with a dashboard projection, and step 6 uses the supplied handshake artwork. Reduced motion displays the original artwork without image motion. The earlier procedural-renderer architecture description is superseded by this update.

## Current visual direction: editorial motion graphics

The latest revision supersedes the photo-card presentation. `src/overlay/Motion.tsx` contains six original SVG/CSS compositions: search-signal convergence, a voice waveform, a confirmed time slot, a follow-up sequence, pipeline columns and a completion seal. The centered phone sits below the animation in steps 1–4; step 5 uses a centered monitor. Shapes, paths and interface content derive from scroll progress. The references inform the narrative only; no character models or reference photographs appear in the current story. Device frames and all screen text are HTML/CSS. The application flow and marketing copy remain unchanged.
