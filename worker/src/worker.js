const GEMINI_HTTP = 'https://generativelanguage.googleapis.com';
const GEMINI_LIVE = 'https://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent';
const DEFAULT_LIVE_MODEL = 'gemini-3.5-live-translate-preview';
const DEFAULT_TEXT_MODEL = 'gemini-3.1-flash-lite';
const DEFAULT_TTS_MODEL = 'gemini-3.1-flash-tts-preview';
const TTS_SAMPLES = Object.freeze({
  'first-scene-ta': {
    voice: 'Kore',
    input: 'Speak in Tamil as a calm but urgent female police radio officer. Keep the delivery concise and realistic, with a slight radio cadence. Say exactly: கிண்டி மேம்பாலம் அருகே மூன்று வாகனங்கள் மோதியுள்ளன. ஒரு கார் தீப்பிடித்துள்ளது. எரிபொருள் சாலையில் கசிகிறது. இரண்டாவது ஆம்புலன்ஸ் தேவை.'
  },
  'traffic-en': {
    voice: 'Puck',
    input: 'Speak as a composed Indian traffic-control radio officer. Use crisp dispatch cadence. Say exactly: Traffic Central to all units. Both southbound lanes are closed at the previous junction. Emergency corridor is open on the shoulder.'
  },
  'relay-en': {
    voice: 'Kore',
    input: 'Speak as a calm, neutral Indian emergency operations voice assistant. Say exactly: Automated U E C P brief for the zonal Assistant Commissioner. A three vehicle collision with one vehicle fire has closed G S T Road southbound near Guindy. Fire suppression, trauma triage and traffic diversion are active. Two red-priority patients are reported. Tap to join the incident group.'
  },
  'district-radio-ta': {
    voice: 'Puck',
    input: 'Speak in Tamil as a concise male police radio officer with controlled urgency. Say exactly: ஒரு கார் தீப்பிடித்துள்ளது. ஆம்புலன்ஸ் மற்றும் தீயணைப்பு வாகனம் உடனடியாக தேவை.'
  },
  'fire-command-ta': {
    voice: 'Puck',
    input: 'Speak in Tamil as a calm male fire commander over operational radio. Use a concise, controlled cadence. Say exactly: தீ கட்டுப்பாட்டில் உள்ளது. காரில் இருந்த அனைவரும் பாதுகாப்பாக வெளியேற்றப்பட்டுள்ளனர். நூற்றி எட்டு குழு வடக்குப் பக்கத்திலிருந்து அணுகலாம்.'
  },
  'dispatch-clearance-en': {
    voice: 'Kore',
    input: 'Speak as a composed female Indian emergency dispatcher over a clear radio channel. Use crisp operational cadence. Say exactly: ERSS dispatch to all responding units. Fire reports knockdown achieved. Maintain the southbound closure until spill control clears the carriageway.'
  }
});
const ALLOWED_LANGUAGES = new Set([
  'af','ak','sq','am','ar','hy','az','eu','be','bn','bg','my','ca','zh-Hans','zh-Hant','hr','cs','da','nl','en','et','fil','fi','fr','gl','ka','de','el','gu','ha','he','hi','hu','is','id','it','ja','jv','kn','kk','km','rw','ko','lo','lv','lt','mk','ms','ml','mr','mn','ne','no','nb','fa','pl','pt-BR','pt-PT','pa','ro','ru','sr','sd','si','sk','sl','es','su','sw','sv','ta','te','th','tr','uk','ur','uz','vi','zu'
]);

export default {
  async fetch(request, env, ctx) {
    try {
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
          recordedAudioTranscriptionModel: env.TEXT_MODEL || DEFAULT_TEXT_MODEL,
          ttsModel: env.TTS_MODEL || DEFAULT_TTS_MODEL,
          apiKeyBindingConfigured: Boolean(env.GEMINI_API_KEY),
          incidentDatabaseConfigured: Boolean(env.DB)
        }, 200, cors);
      }

      if (!isAllowedOrigin(origin, env)) return json({ error: 'origin not allowed' }, 403, cors);

      const isBrief = url.pathname === '/text/brief' && request.method === 'POST';
      const isTranscribe = url.pathname === '/text/transcribe' && request.method === 'POST';
      const isTts = url.pathname === '/tts/sample' && request.method === 'POST';
      const isLive = url.pathname === '/live' && request.headers.get('Upgrade')?.toLowerCase() === 'websocket';
      const incidentMatch = url.pathname.match(/^\/data\/incidents\/([A-Z0-9-]+)$/);
      const isIncidentList = url.pathname === '/data/incidents' && request.method === 'GET';
      const isIncidentDetail = Boolean(incidentMatch) && request.method === 'GET';
      const isData = isIncidentList || isIncidentDetail;
      if (!isBrief && !isTranscribe && !isTts && !isLive && !isData) return json({ error: 'not found' }, 404, cors);

      const actorKey = request.headers.get('CF-Connecting-IP') || 'unknown-client';
      const limiter = isLive ? env.LIVE_RATE_LIMITER : isTts ? env.TTS_RATE_LIMITER : isTranscribe ? env.STT_RATE_LIMITER : isData ? env.DATA_RATE_LIMITER : env.TEXT_RATE_LIMITER;
      const { success } = await limiter.limit({ key: `${url.pathname}:${actorKey}` });
      if (!success) return json({ error: 'rate limit exceeded; retry shortly' }, 429, cors);

      if (isIncidentList) return listIncidents(env, cors);
      if (isIncidentDetail) return getIncidentContext(env, cors, incidentMatch[1]);

      const geminiApiKey = await readGeminiApiKey(env);
      if (!geminiApiKey) return json({ error: 'GEMINI_API_KEY is not configured' }, 503, cors);

      if (isBrief) {
        return createBrief(request, env, cors, geminiApiKey);
      }

      if (isTranscribe) {
        return transcribeAudio(request, env, cors, geminiApiKey);
      }

      if (isTts) {
        return createSampleAudio(request, env, cors, geminiApiKey, ctx);
      }

      if (isLive) {
        return openLiveTranslation(request, env, geminiApiKey);
      }
    } catch (error) {
      console.error(JSON.stringify({ message: 'unhandled gateway error', error: error instanceof Error ? error.message : String(error) }));
      return json({ error: 'internal gateway error' }, 500);
    }
  }
};

async function listIncidents(env, cors) {
  const result = await env.DB.prepare(`
    SELECT i.*,
      (SELECT COUNT(*) FROM incident_participants p WHERE p.incident_id = i.id) AS responder_count,
      (SELECT COUNT(DISTINCT r.agency_id) FROM incident_participants p JOIN responders r ON r.id = p.responder_id WHERE p.incident_id = i.id) AS agency_count
    FROM incidents i
    WHERE i.is_demo = 1
    ORDER BY CASE i.status WHEN 'Live' THEN 0 WHEN 'Monitoring' THEN 1 ELSE 2 END, i.updated_at DESC
  `).all();
  return json({ incidents: result.results, source: 'Cloudflare D1', city: 'Chennai', fictionalDemoData: true }, 200, cors);
}

async function getIncidentContext(env, cors, incidentId) {
  const incident = await env.DB.prepare('SELECT * FROM incidents WHERE id = ? AND is_demo = 1').bind(incidentId).first();
  if (!incident) return json({ error: 'incident not found' }, 404, cors);

  const queries = await Promise.all([
    env.DB.prepare(`SELECT a.id, a.name, a.short_name, a.role, a.color, COUNT(p.responder_id) AS responder_count
      FROM incident_participants p JOIN responders r ON r.id = p.responder_id JOIN agencies a ON a.id = r.agency_id
      WHERE p.incident_id = ? GROUP BY a.id ORDER BY a.name`).bind(incidentId).all(),
    env.DB.prepare(`SELECT m.*, s.duration_seconds, s.transcript AS audio_transcript, s.english_translation, s.tts_model, s.voice
      FROM incident_messages m LEFT JOIN audio_samples s ON s.id = m.audio_sample_id
      WHERE m.incident_id = ? ORDER BY m.sequence_no`).bind(incidentId).all(),
    env.DB.prepare('SELECT * FROM incident_events WHERE incident_id = ? ORDER BY sequence_no').bind(incidentId).all(),
    env.DB.prepare('SELECT * FROM incident_tasks WHERE incident_id = ? ORDER BY CASE priority WHEN \'critical\' THEN 0 WHEN \'high\' THEN 1 ELSE 2 END, due_at').bind(incidentId).all(),
    env.DB.prepare(`SELECT r.*, a.short_name AS agency_name FROM incident_resources r JOIN agencies a ON a.id = r.agency_id
      WHERE r.incident_id = ? ORDER BY r.status, r.callsign`).bind(incidentId).all(),
    env.DB.prepare('SELECT * FROM incident_evidence WHERE incident_id = ? ORDER BY captured_at').bind(incidentId).all()
  ]);

  return json({
    incident,
    agencies: queries[0].results,
    messages: queries[1].results,
    events: queries[2].results,
    tasks: queries[3].results,
    resources: queries[4].results,
    evidence: queries[5].results,
    source: 'Cloudflare D1',
    city: 'Chennai',
    fictionalDemoData: true
  }, 200, cors);
}

async function createSampleAudio(request, env, cors, geminiApiKey, ctx) {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 1_000) return json({ error: 'request too large' }, 413, cors);

  let body;
  try { body = await request.json(); } catch { return json({ error: 'invalid JSON' }, 400, cors); }
  const sampleId = clean(body.sampleId || '', 40);
  const sample = TTS_SAMPLES[sampleId];
  if (!sample) return json({ error: 'unknown sample' }, 400, cors);

  const model = env.TTS_MODEL || DEFAULT_TTS_MODEL;
  const cacheUrl = new URL(request.url);
  cacheUrl.pathname = `/tts/cache/${encodeURIComponent(model)}/${encodeURIComponent(sampleId)}.wav`;
  cacheUrl.search = 'v=1';
  const cacheKey = new Request(cacheUrl.toString(), { method: 'GET' });
  const cached = await caches.default.match(cacheKey);
  if (cached) return withCors(cached, cors);

  const payload = {
    model,
    input: sample.input,
    response_format: { type: 'audio' },
    generation_config: { speech_config: [{ voice: sample.voice }] }
  };

  let upstream;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    upstream = await fetch(`${GEMINI_HTTP}/v1beta/interactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': geminiApiKey,
        'Api-Revision': '2026-05-20'
      },
      body: JSON.stringify(payload)
    });
    if (upstream.ok || upstream.status < 500) break;
  }

  const data = await upstream.json();
  if (!upstream.ok) {
    console.error(JSON.stringify({ message: 'Gemini TTS request failed', status: upstream.status, sampleId, detail: clean(data?.error?.message || 'upstream error', 300) }));
    return json({ error: 'Gemini TTS request failed' }, upstream.status, cors);
  }

  const audio = data?.output_audio || data?.steps
    ?.filter(step => step.type === 'model_output')
    .flatMap(step => step.content || [])
    .find(content => content.type === 'audio' && content.data);
  if (!audio) return json({ error: 'Gemini returned no audio' }, 502, cors);

  const decoded = decodeBase64(audio.data);
  const wav = audio.mime_type === 'audio/wav'
    ? decoded
    : makeWav(decoded, Number(audio.sample_rate) || 24000, Number(audio.channels) || 1);

  const response = new Response(wav, {
    headers: {
      ...cors,
      'Content-Type': 'audio/wav',
      'Cache-Control': 'public, max-age=86400',
      'X-UECP-Audio-Model': model
    }
  });
  ctx.waitUntil(caches.default.put(cacheKey, response.clone()));
  return response;
}

async function createBrief(request, env, cors, geminiApiKey) {
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

  const upstream = await fetch(`${GEMINI_HTTP}/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': geminiApiKey },
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

async function transcribeAudio(request, env, cors, geminiApiKey) {
  const mimeType = (request.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
  const allowedTypes = new Set(['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/x-wav', 'audio/webm', 'audio/ogg', 'audio/mp4', 'audio/aac']);
  if (!allowedTypes.has(mimeType)) return json({ error: 'unsupported audio format' }, 415, cors);

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 4_000_000) return json({ error: 'audio exceeds the 4 MB demo limit' }, 413, cors);
  const audio = await request.arrayBuffer();
  if (!audio.byteLength) return json({ error: 'audio is empty' }, 400, cors);
  if (audio.byteLength > 4_000_000) return json({ error: 'audio exceeds the 4 MB demo limit' }, 413, cors);

  const model = env.TEXT_MODEL || DEFAULT_TEXT_MODEL;
  const prompt = [
    'Transcribe this short public-safety voice note verbatim.',
    'The speaker may use Tamil, English, or switch between them.',
    'Preserve names, callsigns, road names, quantities, and operational terms exactly when audible.',
    'Do not infer words that are not audible. Use [inaudible] for unclear speech.',
    'Return the detected BCP-47 language code, the original transcript, and a faithful English translation.',
    'If the transcript is already fully English, repeat it as the English translation.'
  ].join('\n');

  const upstream = await fetch(`${GEMINI_HTTP}/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': geminiApiKey },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [
        { text: prompt },
        { inlineData: { mimeType, data: encodeBase64(audio) } }
      ] }],
      generationConfig: {
        temperature: 0,
        maxOutputTokens: 900,
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'OBJECT',
          properties: {
            languageCode: { type: 'STRING' },
            transcript: { type: 'STRING' },
            englishTranslation: { type: 'STRING' }
          },
          required: ['languageCode', 'transcript', 'englishTranslation']
        }
      }
    })
  });

  const data = await upstream.json();
  if (!upstream.ok) {
    console.error(JSON.stringify({ message: 'Gemini transcription request failed', status: upstream.status, detail: clean(data?.error?.message || 'upstream error', 300) }));
    return json({ error: 'Gemini transcription request failed' }, upstream.status, cors);
  }

  const output = data?.candidates?.[0]?.content?.parts?.map(part => part.text || '').join('').trim();
  if (!output) return json({ error: 'Gemini returned an empty transcript' }, 502, cors);
  let transcript;
  try { transcript = JSON.parse(output); } catch { return json({ error: 'Gemini returned an invalid transcript' }, 502, cors); }
  return json({
    languageCode: clean(transcript.languageCode || 'und', 20),
    transcript: clean(transcript.transcript || '', 8_000),
    englishTranslation: clean(transcript.englishTranslation || '', 8_000),
    model,
    mode: 'recorded-audio',
    humanReviewRequired: true
  }, 200, cors);
}

async function openLiveTranslation(request, env, geminiApiKey) {
  const pair = new WebSocketPair();
  const client = pair[0];
  const server = pair[1];
  server.binaryType = 'arraybuffer';
  server.accept({ allowHalfOpen: true });

  let upstream;
  try {
    const response = await fetch(`${GEMINI_LIVE}?key=${encodeURIComponent(geminiApiKey)}`, { headers: { Upgrade: 'websocket' } });
    upstream = response.webSocket;
    if (!upstream) {
      console.error(JSON.stringify({ message: 'Gemini Live handshake rejected', status: response.status }));
      server.close(1011, 'Gemini Live connection failed');
      return new Response('Gemini Live connection failed', { status: 502 });
    }
    upstream.binaryType = 'arraybuffer';
    upstream.accept({ allowHalfOpen: true });
  } catch (error) {
    console.error(JSON.stringify({ message: 'Gemini Live connection error', error: error instanceof Error ? error.message : String(error) }));
    server.close(1011, 'Gemini Live unavailable');
    return new Response('Gemini Live unavailable', { status: 502 });
  }

  let setupComplete = false;
  let closed = false;
  const closeBoth = (code = 1000, reason = 'session closed') => {
    if (closed) return;
    closed = true;
    try { server.close(code, reason); } catch {}
    try { upstream.close(code, reason); } catch {}
  };

  server.addEventListener('message', event => {
    const frameSize = typeof event.data === 'string' ? event.data.length : event.data?.byteLength || 0;
    if (frameSize > 1_500_000) return closeBoth(1009, 'frame too large');

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
            translationConfig: {
              targetLanguageCode: requestedTarget,
              echoTargetLanguage: Boolean(message.setup?.generationConfig?.translationConfig?.echoTargetLanguage)
            }
          },
          inputAudioTranscription: {},
          outputAudioTranscription: {}
        }
      };
      upstream.send(JSON.stringify(enforcedSetup));
      setupComplete = true;
      return;
    }

    upstream.send(event.data);
  });

  upstream.addEventListener('message', event => server.send(event.data));
  server.addEventListener('close', event => closeBoth(event.code || 1000, event.reason || 'client closed'));
  upstream.addEventListener('close', event => {
    console.warn(JSON.stringify({ message: 'Gemini Live socket closed', code: event.code, reason: event.reason || '' }));
    closeBoth(event.code || 1011, event.reason || 'Gemini Live closed');
  });
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

function withCors(response, cors) {
  const headers = new Headers(response.headers);
  Object.entries(cors).forEach(([key, value]) => headers.set(key, value));
  return new Response(response.body, { status: response.status, headers });
}

function decodeBase64(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

function encodeBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
  }
  return btoa(binary);
}

function makeWav(pcm, sampleRate, channels) {
  const headerSize = 44;
  const buffer = new ArrayBuffer(headerSize + pcm.byteLength);
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);
  const writeAscii = (offset, value) => {
    for (let index = 0; index < value.length; index += 1) view.setUint8(offset + index, value.charCodeAt(index));
  };
  writeAscii(0, 'RIFF');
  view.setUint32(4, 36 + pcm.byteLength, true);
  writeAscii(8, 'WAVE');
  writeAscii(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, channels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * channels * 2, true);
  view.setUint16(32, channels * 2, true);
  view.setUint16(34, 16, true);
  writeAscii(36, 'data');
  view.setUint32(40, pcm.byteLength, true);
  bytes.set(pcm, headerSize);
  return bytes;
}

function clean(value, maxLength) {
  return String(value).replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

async function readGeminiApiKey(env) {
  if (!env.GEMINI_API_KEY) return '';
  if (typeof env.GEMINI_API_KEY === 'string') return env.GEMINI_API_KEY;
  return env.GEMINI_API_KEY.get();
}
