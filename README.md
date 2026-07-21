# Unified Emergency Communication Platform (UECP)

Interactive demonstration console for the Tamil Nadu Police multi-agency emergency communication concept. The app is a static, responsive GitHub Pages site; sensitive Gemini traffic is routed through a separate Cloudflare Worker.

## What the demonstration covers

- Jurisdiction-aware duty officer lookup across Police, Fire & Rescue, EMRI 108, ERSS 112, Traffic, Disaster Management and TANGEDCO.
- A plausible end-to-end incident response: citizen call, ERSS call-taking and CAD dispatch, automatic command-group creation, direct field coordination, dispatcher oversight, ICCC context, AI action extraction and an approved voice relay.
- Sample radio/app conversations, Tamil-to-English transcripts, incident files, PTT interactions and source-linked AI briefs.
- RoIP, DMR, SIP, ERSS, ICCC, CCTNS and evidence-store integration health.
- Gemini 3.5 Live Translate for interactive interpretation, Gemini 3.1 Flash-Lite for text briefs and Gemini 3.1 Flash TTS Preview for bilingual sample radio audio.

## Run the UI locally

Any static server works. For example:

```powershell
npx serve . -l 4173
```

Open `http://localhost:4173`.

## Deploy the Cloudflare Worker

```powershell
cd worker
npm install
npx wrangler login
npx wrangler deploy
```

The Worker binds the existing account-level `GEMINI_API_KEY` from Cloudflare Secrets Store; the key is not stored in this repository. `ALLOWED_ORIGINS` in `worker/wrangler.jsonc` is restricted to the GitHub Pages origin.

The Worker exposes:

- `GET /health` — approved models and configuration state.
- `GET /data/incidents` — fictional Chennai live-incident list from Cloudflare D1.
- `GET /data/incidents/:id` — full incident context including messages, timeline, tasks, resources, evidence and audio metadata.
- `POST /text/brief` — incident brief generation using `gemini-3.1-flash-lite`.
- `POST /tts/sample` — approved Tamil and English operational samples using `gemini-3.1-flash-tts-preview`.
- `WS /live` — key-protected Gemini Live relay enforcing `gemini-3.5-live-translate-preview` and approved translation languages.

Cloudflare Rate Limiting bindings protect text, TTS and live-session routes. A production rollout still requires UECP user authentication, formal quota policy and state data-localisation controls.

The D1 database is created as `uecp-demo`. Its schema and fictional Chennai seed data live in `worker/migrations/0001_incident_demo.sql`. Apply it with `npx wrangler d1 migrations apply uecp-demo --remote`.

## GitHub Pages

The workflow in `.github/workflows/pages.yml` deploys the repository root from `main`. In the GitHub repository, set **Settings → Pages → Source** to **GitHub Actions** if it is not selected automatically.

## Important deployment boundary

This is a functional demonstration, not a production public-safety system. Production deployment requires state identity, RBAC/ABAC, device binding, SRTP/E2EE, WORM evidence storage, accessibility and security testing, SDC/DRC hosting, OEM adapters, and human approval for actionable AI relay.
