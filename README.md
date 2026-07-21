# Unified Emergency Communication Platform (UECP)

Interactive demonstration console for the Tamil Nadu Police multi-agency emergency communication concept. The app is a static, responsive GitHub Pages site; sensitive Gemini traffic is routed through a separate Cloudflare Worker.

## What the demonstration covers

- Jurisdiction-aware duty officer lookup across Police, Fire & Rescue, EMRI 108, ERSS 112, Traffic, Disaster Management and TANGEDCO.
- A plausible end-to-end incident response: citizen call, ERSS call-taking and CAD dispatch, automatic command-group creation, direct field coordination, dispatcher oversight, ICCC context, AI action extraction and an approved voice relay.
- Sample radio/app conversations, Tamil-to-English transcripts, incident files, PTT interactions and source-linked AI briefs.
- RoIP, DMR, SIP, ERSS, ICCC, CCTNS and evidence-store integration health.
- Gemini 3.5 Live Translate for audio and Gemini 3.1 Flash-Lite for text briefs.

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
npx wrangler secret put GEMINI_API_KEY
npx wrangler deploy
```

Before deploying, set `ALLOWED_ORIGINS` in `worker/wrangler.toml` to the exact local and GitHub Pages origins. Do not commit the API key. Paste the deployed Worker URL into **Live translation → Secure gateway** in the app.

The Worker exposes:

- `GET /health` — approved models and configuration state.
- `POST /text/brief` — incident brief generation using `gemini-3.1-flash-lite`.
- `WS /live` — key-protected Gemini Live relay enforcing `gemini-3.5-live-translate-preview` and approved translation languages.

The included per-isolate limiter is suitable for a controlled prototype. A production rollout should move session quotas to a Durable Object or Cloudflare Rate Limiting, add UECP user authentication, and follow state data-localisation requirements.

## GitHub Pages

The workflow in `.github/workflows/pages.yml` deploys the repository root from `main`. In the GitHub repository, set **Settings → Pages → Source** to **GitHub Actions** if it is not selected automatically.

## Important deployment boundary

This is a functional demonstration, not a production public-safety system. Production deployment requires state identity, RBAC/ABAC, device binding, SRTP/E2EE, WORM evidence storage, accessibility and security testing, SDC/DRC hosting, OEM adapters, and human approval for actionable AI relay.
