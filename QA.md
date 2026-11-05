# Verification

- TypeScript and Vite production build passed during development; final packaging runs the same build again.
- Tested actual browser layouts at 1440×1000, 768×1024 and 390×844. No horizontal document overflow at 390px or 768px.
- Visually reviewed procedural studio, Found, Nurtured and Tracked interfaces, responsive feature sections and mobile story.
- Checked forward scene navigation and refresh in the Tracked scene. Pipeline counter reached the illustrative $2,400,000 value.
- Required-field validation rejected the empty application (all nine fields invalid, focus moved to name).
- Completed all nine fields with dummy data and verified the explicit preview success state; no endpoint is configured and no data was sent.
- Escape dismissed the dialog. Native modal focus containment is used.
- Opened the FAQ guarantee question and verified its answer.
- The reduced-motion rendering branch was tested through `?motion=reduce`: zero canvases, six static steps, no horizontal overflow. OS preference detection uses matchMedia against the same branch.
- Browser warning/error log was empty during the checked sessions.
- npm dependency audit after updating Vite reported zero vulnerabilities.

## Remaining environment-dependent checks

Physical-device 60fps desktop / 30fps mobile targets are not benchmarked. Production POST/redirect behavior needs the owner's real endpoint and booking URL; the placeholder path is tested. Vite reports a large WebGL dependency chunk; it is lazy-loaded, with no external runtime assets.

## Motion-graphics revision

Production build passes. Verified the new centered-phone composition on desktop and at 390px; no horizontal overflow at 390px. Visually checked Found, Answered and Booked. Browser warning/error log was empty. All artwork is now SVG/CSS/DOM; no WebGL canvas is mounted. Previous photo and character screenshots are superseded by avanor-motion-preview.jpg.

## October 16 — full interactive walkthrough
See MOTION-DIRECTION.md for the current section design and checks. Supersedes the previous static lower marketing sections. Desktop and 390px mobile checked; production build passed; form preview end-to-end checked with synthetic example.com data.
