const GEMINI_HTTP = 'https://generativelanguage.googleapis.com';
const GEMINI_LIVE = 'wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent';
const DEFAULT_LIVE_MODEL = 'gemini-3.5-live-translate-preview';
const DEFAULT_TEXT_MODEL = 'gemini-3.1-flash-lite';
const ALLOWED_LANGUAGES = new Set([
  'af','ak','sq','am','ar','hy','az','eu','be','bn','bg','my','ca','zh-Hans','zh-Hant','hr','cs','da','nl','en','et','fil','fi','fr','gl','ka','de','el','gu','ha','he','hi','hu','is','id','it','ja','jv','kn','kk','km','rw','ko','lo','lv','lt','mk','ms','ml','mr','mn','ne','no','nb','fa','pl','pt-BR','pt-PT','pa','ro','ru','sr','sd','si','sk','sl','es','su','sw','sv','ta','te','th','tr','uk','ur','uz','vi','zu'
]);

const connectionBuckets = new Map();

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';
    const cors = corsHeaders(origin, env);

    if (request.method === 'OPTIONS') {
      if (!isAllowedOrigin(origin, env)) return json({ error: 'origin not allowed' }, 403, cors);
      return new Response(null, { status: 204, headers: cors });
    }

    if (url.pathname === '/health' && request.method === 'GET') {
      return json({
        ok: true,
        service: 'UECP Gemini secure gateway',
        liveModel: env.LIVE_MODEL || DEFAULT_LIVE_MODEL,
        textModel: env.TEXT_MODEL || DEFAULT_TEXT_MODEL,
        apiKeyConfigured: Boolean(env.GEMINI_API_KEY)
      }, 200, cors);
    }

    if (!isAllowedOrigin(origin, env)) return json({ error: 'origin not allowed' }, 403, cors);
    if (!env.GEMINI_API_KEY) return json({ error: 'GEMINI_API_KEY is not configured' }, 503, cors);

    if (url.pathname === '/text/brief' && request.method === 'POST') {
      return createBrief(request, env, cors);
    }

    if (url.pathname === '/live' && request.headers.get('Upgrade')?.toLowerCase() === 'websocket') {
      return openLiveTranslation(request, env);
    }

    return json({ error: 'not found' }, 404, cors);
  }
};

async function createBrief(request, env, cors) {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 20_000) return json({ error: 'request too large' }, 413, cors);

  let body;
  try { body = await request.json(); } catch { return json({ error: 'invalid JSON' }, 400, cors); }
  const incidentId = clean(body.incidentId || 'UNKNOWN', 40);
  const events = Array.isArray(body.events) ? body.events.slice(0, 30).map(event => clean(event, 500)) : [];
  if (!events.length) return json({ error: 'events are required' }, 400, cors);

  const model = env.TEXT_MODEL || DEFAULT_TEXT_MODEL;
  const prompt = [
    'You are the human-supervised communications briefing assistant for a police-led emergency coordination platform.',
    `Create one concise operational brief for incident ${incidentId}.`,
    'Use only the supplied events. Do not invent casualties, resources, decisions, or certainty.',
    'Write 3 to 5 short sentences covering situation, completed actions, pending actions, and the next coordination need.',
    'Use calm, neutral Indian public-safety language. Mark any ambiguous item as unverified.',
    '',
    ...events.map((event, index) => `${index + 1}. ${event}`)
  ].join('\n');

  const upstream = await fetch(`${GEMINI_HTTP}/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(env.GEMINI_API_KEY)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.2, maxOutputTokens: 280 }
    })
  });

  const data = await upstream.json();
  if (!upstream.ok) return json({ error: 'Gemini text request failed', detail: data?.error?.message || 'upstream error' }, upstream.status, cors);
  const brief = data?.candidates?.[0]?.content?.parts?.map(part => part.text || '').join('').trim();
  if (!brief) return json({ error: 'Gemini returned an empty brief' }, 502, cors);
  return json({ brief, model, humanReviewRequired: true }, 200, cors);
}

async function openLiveTranslation(request, env) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (!takeConnectionToken(ip)) return new Response('Too many live sessions; retry shortly', { status: 429 });

  const pair = new WebSocketPair();
  const client = pair[0];
  const server = pair[1];
  server.accept();

  let upstream;
  try {
    const response = await fetch(`${GEMINI_LIVE}?key=${encodeURIComponent(env.GEMINI_API_KEY)}`, { headers: { Upgrade: 'websocket' } });
    upstream = response.webSocket;
    if (!upstream) {
      releaseConnectionToken(ip);
      server.close(1011, 'Gemini Live connection failed');
      return new Response('Gemini Live connection failed', { status: 502 });
    }
    upstream.accept();
  } catch {
    releaseConnectionToken(ip);
    server.close(1011, 'Gemini Live unavailable');
    return new Response('Gemini Live unavailable', { status: 502 });
  }

  let setupComplete = false;
  let closed = false;
  const closeBoth = (code = 1000, reason = 'session closed') => {
    if (closed) return;
    closed = true;
    releaseConnectionToken(ip);
    try { server.close(code, reason); } catch {}
    try { upstream.close(code, reason); } catch {}
  };

  server.addEventListener('message', event => {
    if (typeof event.data === 'string' && event.data.length > 1_500_000) return closeBoth(1009, 'frame too large');

    if (!setupComplete) {
      if (typeof event.data !== 'string') return closeBoth(1003, 'setup must be JSON');
      let message;
      try { message = JSON.parse(event.data); } catch { return closeBoth(1003, 'invalid setup JSON'); }
      if (!message.setup) return closeBoth(1008, 'first frame must be setup');

      const requestedTarget = message.setup?.generationConfig?.translationConfig?.targetLanguageCode || 'en';
      if (!ALLOWED_LANGUAGES.has(requestedTarget)) return closeBoth(1008, 'target language not allowed');

      const enforcedSetup = {
        setup: {
          model: `models/${env.LIVE_MODEL || DEFAULT_LIVE_MODEL}`,
          generationConfig: {
            responseModalities: ['AUDIO'],
            inputAudioTranscription: {},
            outputAudioTranscription: {},
            translationConfig: {
              targetLanguageCode: requestedTarget,
              echoTargetLanguage: Boolean(message.setup?.generationConfig?.translationConfig?.echoTargetLanguage)
            }
          }
        }
      };
      upstream.send(JSON.stringify(enforcedSetup));
      setupComplete = true;
      return;
    }

    upstream.send(event.data);
  });

  upstream.addEventListener('message', event => server.send(event.data));
  server.addEventListener('close', () => closeBoth());
  upstream.addEventListener('close', () => closeBoth());
  server.addEventListener('error', () => closeBoth(1011, 'client socket error'));
  upstream.addEventListener('error', () => closeBoth(1011, 'upstream socket error'));

  return new Response(null, { status: 101, webSocket: client });
}

function isAllowedOrigin(origin, env) {
  if (!origin) return false;
  const allowed = String(env.ALLOWED_ORIGINS || '').split(',').map(value => value.trim()).filter(Boolean);
  return allowed.includes(origin);
}

function corsHeaders(origin, env) {
  const headers = {
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer'
  };
  if (isAllowedOrigin(origin, env)) headers['Access-Control-Allow-Origin'] = origin;
  return headers;
}

function json(value, status, headers = {}) {
  return new Response(JSON.stringify(value), { status, headers: { ...headers, 'Content-Type': 'application/json; charset=utf-8' } });
}

function clean(value, maxLength) {
  return String(value).replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

function takeConnectionToken(ip) {
  const now = Date.now();
  const bucket = connectionBuckets.get(ip) || { active: 0, resetAt: now + 60_000, starts: 0 };
  if (now > bucket.resetAt) { bucket.starts = 0; bucket.resetAt = now + 60_000; }
  if (bucket.active >= 2 || bucket.starts >= 8) return false;
  bucket.active += 1; bucket.starts += 1; connectionBuckets.set(ip, bucket); return true;
}

function releaseConnectionToken(ip) {
  const bucket = connectionBuckets.get(ip); if (!bucket) return;
  bucket.active = Math.max(0, bucket.active - 1);
  if (!bucket.active && Date.now() > bucket.resetAt) connectionBuckets.delete(ip);
}
