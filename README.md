# Unified Emergency Communication Platform (UECP)

Interactive demonstration console for the Tamil Nadu Police multi-agency emergency communication concept. The app is a static, responsive GitHub Pages site; sensitive model and speech traffic is routed through a separate Cloudflare Worker.

## What the demonstration covers

- Jurisdiction-aware duty officer lookup across Police, Fire & Rescue, EMRI 108, ERSS 112, Traffic, Disaster Management and TANGEDCO.
- A plausible end-to-end incident response: citizen call, ERSS call-taking and CAD dispatch, automatic command-group creation, direct field coordination, dispatcher oversight, ICCC context, action extraction and a voice relay.
- Sample radio/app conversations, Tamil-to-English transcripts, incident files, PTT interactions and source-linked briefs.
- RoIP, DMR, SIP, ERSS, ICCC, CCTNS and evidence-store integration health.
- A fresh 10-message live incident run with Tamil radio beginning on message 2, gender-matched speakers, a walkie-talkie lead-in and voice transcripts carried into the next generated turn.

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

The Worker binds the existing account-level `GEMINI_API_KEY`, `GROQ_API_KEY` and `SARVAM_API_KEY` from Cloudflare Secrets Store; no key is stored in this repository. `ALLOWED_ORIGINS` in `worker/wrangler.jsonc` is restricted to the GitHub Pages origin.

The Worker exposes:

- `GET /health` — model and configuration state.
- `GET /data/incidents` — fictional Chennai live-incident list from Cloudflare D1.
- `GET /data/incidents/:id` — full incident context including messages, timeline, tasks, resources, evidence and audio metadata.
- `POST /text/brief` — incident brief generation using `gemini-2.5-pro`.
- `POST /text/transcribe` — short Tamil/English audio transcription and English translation using `gemini-2.5-pro`.
- `POST /tts/sample` — Tamil and English operational speech using `gemini-2.5-pro-preview-tts`.
- `POST /tts/live` — fresh Tamil or Indian-English operational WAV speech through the secure Worker. Language-specific male and female voices rotate without immediate repeats. Requests are capped at 420 characters and are never retried automatically.
- `GET /agent/incident-stream` — a bounded live incident group with 10 contextual messages. Groq `openai/gpt-oss-120b` creates each next update, Sarvam generates 3–4 Tamil voice notes, and Groq `whisper-large-v3` transcribes each voice note into the following turn's shared context.
- `WS /live` — key-protected Gemini Live relay enforcing `gemini-3.5-live-translate-preview` and configured translation languages.

Cloudflare Rate Limiting bindings protect text, TTS and live-session routes. A production rollout still requires UECP user authentication, formal quota policy and state data-localisation controls.

The D1 database is created as `uecp-demo`. Its schema and fictional Chennai seed data live in `worker/migrations/0001_incident_demo.sql`. Apply it with `npx wrangler d1 migrations apply uecp-demo --remote`.

## GitHub Pages

The workflow in `.github/workflows/pages.yml` deploys the repository root from `main`. In the GitHub repository, set **Settings → Pages → Source** to **GitHub Actions** if it is not selected automatically.

## Important deployment boundary

This is a functional demonstration, not a production public-safety system. Production deployment requires state identity, RBAC/ABAC, device binding, SRTP/E2EE, WORM evidence storage, accessibility and security testing, SDC/DRC hosting, OEM adapters, and human approval for actionable automated relay.
