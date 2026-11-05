# Interactive walkthrough — October 16, 2026

The lower page now tells a continuous customer story using 2D interface motion, rather than unrelated looping decoration.

- Connected: five selectable handoffs, inquiry context, finite connection animation.
- Opportunity: before/after switch and three selectable gaps with specific explanations.
- Engine: three interactive product scenes covering discovery, conversation and follow-through.
- How it works: Apply / Build / Launch timeline, staggered assembly and replay.
- Fit: three groups of choices with relevant guidance; no invented eligibility score.
- FAQs: four topic filters, animated disclosures, contextual summary graphic.
- Final call to action: a three-step application with validation, preserved values, review and honest preview result.

Animations pause outside the viewport. Reduced-motion preferences remove animation while preserving interaction. Mobile layouts stack the demonstrations and retain tap controls. Device movement is now 2D rotation.

## Reference research

- https://linear.app/features — product interfaces as the primary explanation.
- https://stripe.com/payments/checkout — clear guided interaction and form progression.
- https://webflow.com/blog/11-interactions-2-0-examples-that-move-in-just-the-right-way — assembly, state changes and scroll-based explanation.
- https://university.webflow.com/videos/when-to-use-interactions — motion should serve the visitor's task.

These informed the approach; no assets or source code were copied.

## Verification

Production TypeScript/Vite build passes. Browser checks covered desktop and 390px mobile layouts, comparison switch, connected inquiry steps, engine stage selection, timeline selection, FAQ filtering, fit guidance, form progression, preserved review data, back navigation, required-field validation, Escape dismissal and preview submission. No browser error logs were reported during the checked session. Mobile document width matched the viewport. Reduced-motion query mode was checked.

The application service and booking URL remain unconfigured. Public hosting remains blocked by the previously recorded Sites source synchronization approval rejection; the local preview is current.

## Pearl / cobalt art direction

Replaced flat white sections with pearl (#f6f8fc), ice blue and pale lavender washes, navy text (#14243b), cobalt actions (#175ce5), low-contrast architectural grids and translucent panels. Backgrounds remain still while interface states and headings provide movement. Headlines reveal once in a short eyebrow → headline → description sequence. Decorative pulses now run once. Reduced motion retains readable content and functioning controls.

Additional research: https://linear.app/changelog/2024-03-20-new-linear-ui (hierarchy and balance); https://webflow.com/made-in-webflow/website/text-animation-on-load (text reveal example); https://stripe.com/ (product presentation reference). These are inspirations, not a claim of a universally best palette.

Verification: production build passed, desktop FAQ reviewed, 390px mobile checked without horizontal overflow, reduced-motion heading visible, browser error log empty.
