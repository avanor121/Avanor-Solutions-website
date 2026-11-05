# Netlify publishing

## Manual upload

1. Open your existing Avanor site in Netlify.
2. Open Deploys and upload the contents of `dist`, or the supplied `Avanor-Netlify-Update.zip`.
3. Confirm the deployment preview works before publishing it to production.

The ZIP has `index.html` at its root. No npm install, backend, database, or domain change is needed for a manual upload.

## Build from source

Use this project directory as the base directory. `netlify.toml` configures `npm run build` and the `dist` output folder. Use Node 22.12 or newer. The lockfile is included.

## Check after upload

- Reload the homepage and scroll through the six phone/monitor scenes.
- Verify connected-system cards, opportunity cards, build steps, and fit selections.
- Open every FAQ and confirm the matching illustration.
- Check `/plastic-surgeons/` directly. This page is unlinked and marked noindex; its videos still need your final video files.
- Confirm Calendly loads and offers a date and time; do not book a test appointment unless intended.
- Check the site on an actual phone. Desktop responsive previews do not measure physical-device frame rate.

The footer provides email links to request privacy policies and terms until approved policy pages are supplied. No legal text has been invented.

The `_headers` file asks Netlify to revalidate HTML on reload while caching versioned assets. A tab already open still needs a reload to run a newly deployed build.
