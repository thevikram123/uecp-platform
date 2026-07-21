const ICONS = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  alert: '<path d="M10.3 2.9 1.8 17a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 2.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>',
  radio: '<path d="M4.9 19.1a10 10 0 0 1 0-14.2M8.5 15.5a5 5 0 0 1 0-7M19.1 4.9a10 10 0 0 1 0 14.2M15.5 8.5a5 5 0 0 1 0 7"/><circle cx="12" cy="12" r="2"/>',
  languages: '<path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6"/>',
  network: '<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M12 8v4M5 16v-4h14v4"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>', chevron: '<path d="m9 18 6-6-6-6"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M13.7 21h-3.4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>', x: '<path d="M18 6 6 18M6 6l12 12"/>',
  activity: '<path d="M3 12h4l3-9 4 18 3-9h4"/>', truck: '<path d="M10 17h4V5H2v12h3M14 9h4l4 4v4h-3"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="17.5" r="2.5"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  mapPin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 5.2 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L9.1 10.9a16 16 0 0 0 4 4l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2.1Z"/>',
  message: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/>',
  mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
  send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  play: '<path d="m8 5 11 7-11 7Z"/>', pause: '<path d="M8 5v14M16 5v14"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/>',
  check: '<path d="m20 6-11 11-5-5"/>', cloud: '<path d="M17.5 19H6a4 4 0 0 1-.7-7.9A7 7 0 0 1 19 9a5 5 0 0 1-1.5 10Z"/>',
  camera: '<path d="M14.5 4 16 7h4a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h4l1.5-3Z"/><circle cx="12" cy="13" r="3"/>',
  database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  refresh: '<path d="M21 12a9 9 0 0 1-15 6.7L3 16M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 21v-5h5M21 3v5h-5"/>',
  headset: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M18 19c0 1-1 2-2 2h-3"/><rect x="3" y="13" width="4" height="6" rx="2"/><rect x="17" y="13" width="4" height="6" rx="2"/>',
  userCheck: '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="m17 11 2 2 4-4"/>'
};

function icon(name, size = 18) {
  const key = name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  return `<svg aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[key] || ICONS.activity}</svg>`;
}

const DEFAULT_WORKER_URL = 'https://uecp-gemini-proxy.thevikram123.workers.dev';
const LOCAL_AUDIO_SAMPLES = Object.freeze({
  'first-scene-ta': 'assets/audio/first-scene-ta.mp3',
  'traffic-en': 'assets/audio/traffic-en.mp3',
  'relay-en': 'assets/audio/relay-en.mp3',
  'district-radio-ta': 'assets/audio/district-radio-ta.mp3'
});

const people = [
  { id: 1, name: 'Insp. R. Selvakumar', initials: 'RS', role: 'Station House Officer', agency: 'Police', zone: 'T. Nagar', unit: 'TN-CTY-07', presence: 'online', method: 'App + PTT', language: 'Tamil / English', phone: '+91 ••••• 4182' },
  { id: 2, name: 'SI M. Anitha', initials: 'MA', role: 'Patrol Sub-Inspector', agency: 'Police', zone: 'T. Nagar', unit: 'PRV-114', presence: 'radio', method: 'Radio only', language: 'Tamil', phone: '+91 ••••• 7720' },
  { id: 3, name: 'SFO K. Prabhu', initials: 'KP', role: 'Station Fire Officer', agency: 'Fire & Rescue', zone: 'T. Nagar', unit: 'FIRE-TN-3', presence: 'online', method: 'App + SIP', language: 'Tamil / English', phone: '+91 ••••• 1833' },
  { id: 4, name: 'Dr. S. Lakshmi', initials: 'SL', role: '108 Zone Supervisor', agency: 'EMRI 108', zone: 'T. Nagar', unit: 'AMB-2291', presence: 'online', method: 'App + phone', language: 'Tamil / English', phone: '+91 ••••• 9014' },
  { id: 5, name: 'Tr. K. Vignesh', initials: 'KV', role: 'PSAP Dispatcher', agency: 'ERSS 112', zone: 'T. Nagar', unit: 'PSAP-CHN-12', presence: 'online', method: 'Console', language: 'Tamil / Hindi / English', phone: 'Extension 4412' },
  { id: 6, name: 'PC L. Devi', initials: 'LD', role: 'Beat Constable', agency: 'Police', zone: 'T. Nagar', unit: 'BEAT-22', presence: 'offline', method: 'Escalate to SHO', language: 'Tamil', phone: '+91 ••••• 2061' },
  { id: 7, name: 'AO J. Farooq', initials: 'JF', role: 'Assistant Operations Officer', agency: 'Disaster Mgmt', zone: 'Guindy', unit: 'SDMA-CHE-2', presence: 'online', method: 'App + phone', language: 'Tamil / Urdu / English', phone: '+91 ••••• 8181' },
  { id: 8, name: 'TI V. Aravind', initials: 'VA', role: 'Traffic Inspector', agency: 'Traffic', zone: 'T. Nagar', unit: 'TRF-CEN-5', presence: 'radio', method: 'Radio + app', language: 'Tamil / English', phone: '+91 ••••• 6502' },
  { id: 9, name: 'AE P. Meena', initials: 'PM', role: 'Assistant Engineer', agency: 'TANGEDCO', zone: 'T. Nagar', unit: 'EB-TNGR-9', presence: 'online', method: 'Phone', language: 'Tamil / English', phone: '+91 ••••• 3032' }
];

let incidents = [
  { id: 'INC-0431', title: 'Multi-vehicle collision · vehicle fire', location: 'GST Road · Guindy flyover', severity: 'Critical', source: 'ERSS 112', age: '18 min', agencies: ['TRF','POL','F&R','108','NHAI'], responders: 21, status: 'Live' },
  { id: 'INC-0428', title: 'Road collapse after flooding', location: 'Saidapet bridge', severity: 'High', source: 'ICCC', age: '42 min', agencies: ['POL','SDMA','EB'], responders: 9, status: 'Live' },
  { id: 'INC-0426', title: 'Crowd congestion at transit hub', location: 'CMBT · Koyambedu', severity: 'Medium', source: 'ICCC', age: '1 h 12', agencies: ['POL','TRF'], responders: 6, status: 'Live' }
];

const channels = [
  { id:'fire', name:'INC-0431 · GST Road collision', meta:'21 members · 6 agencies', time:'14:49', icon:'alert' },
  { id:'state', name:'TN State Command', meta:'38 online · standing group', time:'14:42', icon:'radio' },
  { id:'tngr', name:'T. Nagar District Net', meta:'DMR Ch-3 · RoIP bridge', time:'14:38', icon:'radio' },
  { id:'erss', name:'ERSS 112 · Chennai', meta:'8 dispatchers online', time:'14:24', icon:'headset' },
  { id:'traffic', name:'Traffic Central', meta:'22 units · encrypted', time:'13:58', icon:'truck' }
];

const conversations = {
  fire: [
    { from:'ERSS 112 · Call Taker 08', time:'14:30:03', text:'Multiple callers report a bus, lorry and car collision near Guindy flyover. The car has caught fire; persons may be trapped. Primary caller remains on line at a safe distance.' },
    { from:'ERSS 112 · Dispatcher Vignesh', time:'14:30:18', text:'CAD INC-0431 dispatched. Traffic Central, PRV-114, Fire TN-3 and two 108 ambulances assigned. NHAI road control and towing vendor notified. Dynamic group is primary coordination.' },
    { from:'SI M. Anitha · PRV-114 · first on scene', time:'14:34:28', type:'audio', duration:'0:11', audioText:'கிண்டி மேம்பாலம் அருகே மூன்று வாகனங்கள் மோதியுள்ளன. ஒரு கார் தீப்பிடித்துள்ளது. எரிபொருள் சாலையில் கசிகிறது. இரண்டாவது ஆம்புலன்ஸ் தேவை.', audioLang:'ta-IN', text:'கிண்டி மேம்பாலம் அருகே மூன்று வாகனங்கள் மோதியுள்ளன. ஒரு கார் தீப்பிடித்துள்ளது. எரிபொருள் சாலையில் கசிகிறது. இரண்டாவது ஆம்புலன்ஸ் தேவை.', translation:'Three vehicles have collided near Guindy flyover. One car is on fire. Fuel is leaking onto the road. A second ambulance is required.' },
    { from:'SFO K. Prabhu · FIRE-TN-3', time:'14:34:46', text:'Received directly, PRV-114. Keep everyone 50 metres upwind and stop ignition sources. We are two minutes out. Confirm whether the lorry carries hazardous goods.', mine:false },
    { from:'ERSS 112 · Dispatcher Vignesh', time:'14:35:01', text:'Vehicle registration lookup shows general freight; hazardous cargo not declared. Marking this unverified until the driver confirms.' },
    { from:'TI V. Aravind · Traffic Central', time:'14:35:14', type:'audio', duration:'0:07', audioText:'Traffic Central to all units. Both southbound lanes are closed at the previous junction. Emergency corridor is open on the shoulder.', audioLang:'en-IN', text:'Traffic Central to all units. Both southbound lanes are closed at the previous junction. Emergency corridor is open on the shoulder.' },
    { from:'AI Action Agent · Human supervised', time:'14:35:21', text:'Actions tracked: 50 m hot zone active ✓ · two southbound lanes closed ✓ · emergency corridor open ✓ · lorry cargo verification pending. Sources linked.', ai:true },
    { from:'Dr. S. Lakshmi · AMB-2291', time:'14:35:44', text:'PRV-114, triage point is 80 metres north, behind the barrier. Two red-priority patients and three walking wounded. Request hospital pre-alert for two trauma beds.', mine:false },
    { from:'ERSS 112 · Call Taker 08', time:'14:35:58', text:'Field picture received. Caller confirms the bus has been evacuated and is moving walking wounded toward the police cordon. I am keeping the caller away from the fuel spill.' },
    { from:'FIRE-TN-3 · SFO Prabhu', time:'14:36:22', text:'Fire knockdown started. Police, confirm all occupants are clear of the car. 108 may approach only from the north until we declare the hot zone safe.' },
    { from:'NHAI Road Control · Patrol 6', time:'14:36:50', text:'Portable barriers and spill-control vehicle dispatched. ETA six minutes. Recovery cranes are standing by outside the hot zone.' },
    { from:'AI Voice Relay Agent', time:'14:37:40', type:'audio', duration:'0:14', audioText:'Automated UECP brief for the zonal Assistant Commissioner. A three vehicle collision with one vehicle fire has closed GST Road southbound near Guindy. Fire suppression, trauma triage and traffic diversion are active. Two red-priority patients are reported. Tap to join the incident group.', audioLang:'en-IN', text:'Dispatcher-approved voice brief queued to the unreachable zonal ACP. Source audio and field messages remain attached.', ai:true },
    { from:'You · State Control', time:'14:38:14', text:'ICCC Camera G-24 and live diversion map added. Dispatch remains on the loop; field commanders continue direct cross-agency coordination.', mine:true },
    { from:'ICCC Camera G-24', time:'14:39:02', type:'file', file:'G24_collision_overview.jpg', detail:'Incident approach and traffic queue · 1.8 MB' }
  ],
  state: [
    { from:'DGP Operations', time:'14:12:10', text:'District control rooms: confirm primary and DR voice paths before 15:00 readiness check.' },
    { from:'Coimbatore DCR', time:'14:14:02', text:'Primary GSWAN and 4G failover verified. Six radio channels registered.' },
    { from:'Madurai DCR', time:'14:15:21', text:'DR voice path verified. Recording hash chain current.' },
    { from:'You · State Control', time:'14:16:03', text:'Acknowledged. Chennai test completes at 14:30.', mine:true }
  ],
  tngr: [
    { from:'PRV-114 · DMR radio', time:'14:34:28', type:'audio', duration:'0:08', audioText:'ஒரு கார் தீப்பிடித்துள்ளது. ஆம்புலன்ஸ் மற்றும் தீயணைப்பு வாகனம் உடனடியாக தேவை.', audioLang:'ta-IN', text:'ஒரு கார் தீப்பிடித்துள்ளது. ஆம்புலன்ஸ் மற்றும் தீயணைப்பு வாகனம் உடனடியாக தேவை.', translation:'A car is on fire. An ambulance and fire tender are required immediately.' },
    { from:'South Zone Control', time:'14:34:38', text:'PRV-114, Fire TN-3 and two ambulances are responding. Establish the hot zone and keep the emergency shoulder clear.' },
    { from:'AI Comms Concierge', time:'14:28:41', text:'Radio traffic linked to INC-0431 with 94% confidence.', ai:true }
  ],
  erss: [
    { from:'Call Taker 112-08', time:'14:30:03', text:'Caller reports visible flames, approximately 20 people evacuating, no confirmed trapped persons.' },
    { from:'Dispatcher Vignesh', time:'14:30:16', text:'CAD event pushed to UECP. Police, Fire and 108 responsibility chain resolved.' },
    { from:'UECP System', time:'14:30:18', text:'Dynamic incident group INC-0431 created. 12 responders notified.', ai:true }
  ],
  traffic: [
    { from:'TI V. Aravind', time:'13:54:02', text:'Westbound flow diverted at Nandanam junction. Signal plan T-14 active.' },
    { from:'ICCC Traffic Analytics', time:'13:55:12', text:'Congestion index reduced from 0.86 to 0.61 after diversion.', ai:true }
  ]
};

const state = {
  view: location.hash.slice(1) || 'overview',
  agency: 'All agencies',
  query: '',
  selectedIncident: incidents[0].id,
  selectedChannel: 'fire',
  commandTab: 'timeline',
  translating: false,
  socket: null,
  audioContext: null,
  audioStream: null,
  processor: null,
  pttRecorder: null,
  pttStream: null,
  pttChunks: [],
  pttStopRequested: false,
  gisMap: null,
  gisTileLayer: null,
  gisLayers: {},
  gisBase: 'light',
  nextAudioTime: 0,
  transcriptIn: '',
  transcriptOut: ''
};

const titles = {
  overview: ['COMMAND CENTRE','Operational overview'], directory: ['RESOURCE DISCOVERY','Jurisdiction directory'],
  incidents: ['INCIDENT COMMAND','Incident command'], comms: ['MULTI-AGENCY COLLABORATION','Unified communications'],
  translate: ['AI COMMS CONCIERGE','Live translation'], integrations: ['FEDERATION & MIDDLEWARE','Integrations'],
  audit: ['GOVERNANCE','Evidence & audit']
};

const viewRoot = document.querySelector('#viewRoot');
const pageTitle = document.querySelector('#pageTitle');
const eyebrow = document.querySelector('#eyebrow');

function hydrateIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach(node => {
    const name = node.dataset.icon;
    if (node.tagName === 'BUTTON') node.insertAdjacentHTML('afterbegin', icon(name));
    else node.innerHTML = icon(name);
  });
}

function metric(label, value, foot, iconName, accent = false) {
  return `<article class="metric-card ${accent ? 'accent' : ''}"><div class="metric-top"><span>${label}</span><span class="metric-icon">${icon(iconName)}</span></div><div class="metric-value">${value}</div><div class="metric-foot">${foot}</div></article>`;
}

function incidentRow(item) {
  return `<button class="incident-row" data-incident="${item.id}">
    <span class="incident-indicator ${item.severity.toLowerCase()}"></span>
    <span class="incident-title"><strong>${item.title}</strong><small>${item.id} · ${item.location}</small></span>
    <span class="incident-meta"><b>${item.source}</b>Source system</span>
    <span class="incident-meta"><b>${item.responders} active</b>${item.age} elapsed</span>
    <span class="agency-stack">${item.agencies.map(a => `<i class="agency-avatar">${a}</i>`).join('')}</span>
    <span class="severity-tag ${item.severity.toLowerCase()}">${item.severity}</span>
    <span class="status-tag live">${item.status}</span>
  </button>`;
}

function renderOverview() {
  return `<section class="view">
    <div class="view-head"><div><p class="eyebrow">REAL-TIME STATE PICTURE</p><h2>Good afternoon, Control.</h2><p>Live operational picture across police, fire, ERSS, EMRI and city command systems.</p></div><div class="view-actions"><button class="button secondary" data-action="export-sitrep">${icon('file')} Export SITREP</button><button class="button primary" data-action="new-incident">${icon('plus')} Create incident</button></div></div>
    <div class="metric-grid">
      ${metric('Active incidents','03','<span class="trend-up">↑ 1</span> in the last hour','alert',true)}
      ${metric('Responders online','2,418','96.4% statewide availability','users')}
      ${metric('Radio channels bridged','118 / 120','2 in planned maintenance','radio')}
      ${metric('Median dispatch time','02:14','<span class="trend-up">↓ 18 sec</span> vs last shift','clock')}
    </div>
    <div class="dashboard-grid">
      <section class="panel"><div class="panel-head"><div><h3>Active incident board</h3><p>Cross-agency events ranked by operational priority</p></div><button class="panel-action" data-view-link="incidents">Open command view →</button></div><div class="incident-list">${incidents.map(incidentRow).join('')}</div>
        <div class="health-grid"><div class="health-cell"><p>ERSS 112 CAD</p><strong>Healthy</strong><small>34 ms event latency</small></div><div class="health-cell"><p>ICCC feeds</p><strong>12 / 12</strong><small>Video links available</small></div><div class="health-cell"><p>RoIP gateways</p><strong>98.3%</strong><small>2 maintenance windows</small></div><div class="health-cell"><p>Evidence sync</p><strong>Current</strong><small>0 items pending</small></div></div>
      </section>
      <section class="panel gis-panel" id="gisPanel"><div class="panel-head"><div><h3>Chennai live picture</h3><p>GIS · ICCC · ERSS · live field resources</p></div><button class="panel-action" data-action="map-fullscreen">Expand</button></div><div class="gis-map-shell"><div id="chennaiLiveMap" class="chennai-live-map" aria-label="Interactive Chennai incident and responder map"></div><div class="gis-live-badge"><i></i><span>LIVE</span><b>CHENNAI · 3 INCIDENTS</b></div><div class="gis-layer-panel"><span>OPERATIONAL LAYERS</span><div><button class="active" data-gis-layer="incidents">Incidents</button><button class="active" data-gis-layer="resources">Units</button><button class="active" data-gis-layer="zones">Hot zone</button><button class="active" data-gis-layer="cameras">CCTV</button></div><div class="gis-basemap"><button class="active" data-gis-base="light">Light GIS</button><button data-gis-base="satellite">Satellite</button></div></div><div class="gis-incident-hud"><span>PRIORITY INCIDENT</span><strong>INC-0431 · GUINDY</strong><small>Vehicle fire · 50 m hot zone · southbound closure</small><div><b>21</b> responders <b>6</b> agencies</div></div></div></section>
    </div>
    <div class="dashboard-grid">
      <section class="panel"><div class="panel-head"><div><h3>AI communications brief</h3><p>Gemini 3.1 Flash-Lite · sources remain linked for verification</p></div><button class="button secondary" data-action="refresh-brief">${icon('refresh')} Regenerate brief</button></div><div class="timeline" id="briefPanel"><div class="timeline-item"><span class="timeline-time">14:49</span><div class="timeline-copy"><strong>Guindy collision and vehicle fire remains the priority incident.</strong><p>Fire suppression, trauma triage and full southbound diversion are active. Two red-priority patients reported; lorry cargo status remains unverified. NHAI barriers and spill control ETA is six minutes.</p></div></div><div class="timeline-item"><span class="timeline-time">14:42</span><div class="timeline-copy"><strong>Saidapet bridge traffic diverted.</strong><p>ICCC congestion score has reduced 19%. TANGEDCO isolation team ETA is 8 minutes.</p></div></div></div></section>
      <section class="panel"><div class="panel-head"><div><h3>Reachability exceptions</h3><p>Concierge is watching these escalation chains</p></div></div><div class="responder-list"><div class="responder-row"><span class="avatar">LD</span><div><strong>PC L. Devi · Beat 22</strong><small>Unreachable 12 min · escalated to SHO</small></div><span class="radio-chip">AUTO</span></div><div class="responder-row"><span class="avatar">R3</span><div><strong>Rescue Tender 03</strong><small>Radio-only · DMR text delivered</small></div><span class="radio-chip">DMR</span></div><div class="responder-row"><span class="avatar">EB</span><div><strong>TANGEDCO duty engineer</strong><small>Voice brief queued after current call</small></div><span class="radio-chip">SIP</span></div></div></section>
    </div>
  </section>`;
}

function initChennaiMap() {
  const container=document.querySelector('#chennaiLiveMap');
  if(!container)return;
  if(!window.L){container.innerHTML='<div class="gis-map-fallback"><strong>GIS basemap unavailable</strong><span>Incident and resource data remain available in the command view.</span></div>';return;}

  const L=window.L;
  const map=L.map(container,{zoomControl:true,attributionControl:true,zoomSnap:.5,minZoom:10,maxZoom:19}).setView([13.0285,80.2237],12.5);
  state.gisMap=map;
  setGisBase(state.gisBase);
  L.control.scale({imperial:false,position:'bottomright'}).addTo(map);

  const operationalIcon=(label,kind,size=30)=>L.divIcon({
    className:'gis-div-icon',
    html:`<span class="gis-marker ${kind}">${label}</span>`,
    iconSize:[size,size],iconAnchor:[size/2,size/2],popupAnchor:[0,-size/2]
  });
  const incidentPopup=(id,title,status,detail)=>`<div class="gis-popup"><span>${id} · ${status}</span><strong>${title}</strong><p>${detail}</p><button onclick="location.hash='incidents'">Open command view</button></div>`;
  const unitPopup=(agency,callsign,status,detail)=>`<div class="gis-popup"><span>${agency} · ${status}</span><strong>${callsign}</strong><p>${detail}</p></div>`;

  const incidentLayer=L.layerGroup();
  L.marker([13.0067,80.2206],{icon:operationalIcon('!', 'critical',34),zIndexOffset:1000})
    .bindTooltip('INC-0431 · VEHICLE FIRE',{permanent:true,direction:'right',className:'gis-priority-label',offset:[12,0]})
    .bindPopup(incidentPopup('INC-0431','Guindy multi-vehicle collision','CRITICAL','Car fire, fuel spill, two red-priority patients. Southbound GST Road closed.'))
    .addTo(incidentLayer);
  L.marker([13.0239,80.2284],{icon:operationalIcon('R','high')})
    .bindPopup(incidentPopup('INC-0428','Saidapet road collapse','HIGH','Police, disaster management and TANGEDCO response active.'))
    .addTo(incidentLayer);
  L.marker([13.0696,80.2066],{icon:operationalIcon('C','medium')})
    .bindPopup(incidentPopup('INC-0426','CMBT crowd congestion','MEDIUM','ICCC crowd monitoring with police and traffic units.'))
    .addTo(incidentLayer);

  const resourceLayer=L.layerGroup();
  [
    [[13.0080,80.2192],'P','Police','PRV-114','ON SCENE','First-on-scene unit maintaining the 50 m cordon.'],
    [[13.0052,80.2167],'F','Fire & Rescue','FIRE-TN-3','SUPPRESSION','Rescue tender positioned upwind; fire knockdown active.'],
    [[13.0104,80.2227],'108','EMRI 108','AMB-2291','TRIAGE','Triage point established north of the hot zone.'],
    [[13.0151,80.2209],'T','Traffic','TRF-CEN-5','DIVERSION','Southbound closure and emergency shoulder corridor active.'],
    [[12.9988,80.2180],'N','NHAI','PATROL-6','EN ROUTE','Barriers and spill-control vehicle approaching from the south.']
  ].forEach(([position,label,agency,callsign,status,detail])=>L.marker(position,{icon:operationalIcon(label,'resource',label==='108'?34:30)})
    .bindPopup(unitPopup(agency,callsign,status,detail)).addTo(resourceLayer));

  const zoneLayer=L.layerGroup();
  L.circle([13.0067,80.2206],{radius:50,color:'#d92d20',weight:2,fillColor:'#d92d20',fillOpacity:.14,dashArray:'5 4'})
    .bindTooltip('50 m fire hot zone').addTo(zoneLayer);
  L.polygon([[13.00635,80.2202],[13.00655,80.2209],[13.0061,80.2211]],{color:'#d92d20',weight:1,fillColor:'#ffe600',fillOpacity:.48})
    .bindTooltip('Reported fuel spill · unverified extent').addTo(zoneLayer);
  const corridor=[[13.0160,80.2218],[13.0128,80.2213],[13.0096,80.2209],[13.0068,80.2206],[13.0022,80.2196]];
  L.polyline(corridor,{color:'#ffe600',weight:9,opacity:.92}).bindTooltip('Emergency response corridor').addTo(zoneLayer);
  L.polyline(corridor,{color:'#111',weight:2,dashArray:'8 7',opacity:.8}).addTo(zoneLayer);
  L.polyline([[13.0182,80.2219],[13.0134,80.2213],[13.0070,80.2205]],{color:'#d92d20',weight:4,dashArray:'3 7',opacity:.85})
    .bindTooltip('GST Road southbound closed').addTo(zoneLayer);

  const cameraLayer=L.layerGroup();
  [
    [[13.0075,80.2211],'G24','ICCC Camera G-24','Live incident approach · queue and cordon visible'],
    [[13.0132,80.2219],'G19','ICCC Camera G-19','Diversion junction · southbound closure visible'],
    [[13.0229,80.2280],'S12','ICCC Camera S-12','Saidapet bridge monitoring feed']
  ].forEach(([position,label,title,detail])=>L.marker(position,{icon:operationalIcon(label,'camera',32)})
    .bindPopup(unitPopup('ICCC',title,'LIVE',detail)).addTo(cameraLayer));

  state.gisLayers={incidents:incidentLayer,resources:resourceLayer,zones:zoneLayer,cameras:cameraLayer};
  Object.values(state.gisLayers).forEach(layer=>layer.addTo(map));
  setTimeout(()=>map.invalidateSize(),120);
}

function setGisBase(base) {
  state.gisBase=base==='satellite'?'satellite':'light';
  document.querySelectorAll('[data-gis-base]').forEach(button=>button.classList.toggle('active',button.dataset.gisBase===state.gisBase));
  if(!state.gisMap||!window.L)return;
  if(state.gisTileLayer)state.gisMap.removeLayer(state.gisTileLayer);
  const config=state.gisBase==='satellite'
    ? {url:'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',options:{attribution:'Tiles © Esri',maxZoom:19}}
    : {url:'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',options:{attribution:'© OpenStreetMap contributors · © CARTO',subdomains:'abcd',maxZoom:20}};
  state.gisTileLayer=window.L.tileLayer(config.url,config.options).addTo(state.gisMap);
  state.gisTileLayer.bringToBack();
}

function toggleGisLayer(button) {
  const layer=state.gisLayers[button.dataset.gisLayer]; if(!layer||!state.gisMap)return;
  const visible=state.gisMap.hasLayer(layer);
  if(visible)state.gisMap.removeLayer(layer);else layer.addTo(state.gisMap);
  button.classList.toggle('active',!visible);
}

function toggleMapFullscreen(button) {
  const panel=document.querySelector('#gisPanel'); if(!panel)return;
  const expanded=panel.classList.toggle('expanded');
  button.textContent=expanded?'Collapse':'Expand';
  document.body.classList.toggle('gis-expanded',expanded);
  setTimeout(()=>state.gisMap?.invalidateSize(),180);
}

function renderDirectory() {
  const agencies = ['All agencies','Police','Fire & Rescue','EMRI 108','ERSS 112','Traffic','Disaster Mgmt','TANGEDCO'];
  const filtered = people.filter(p => (state.agency === 'All agencies' || p.agency === state.agency) && `${p.name} ${p.role} ${p.unit} ${p.zone}`.toLowerCase().includes(state.query.toLowerCase()));
  return `<section class="view"><div class="view-head"><div><p class="eyebrow">GIS → ROLE → PERSON ON DUTY</p><h2>Find the responsible officer</h2><p>Resolve the person accountable for any location, service and duty role—without relying on personal contact lists.</p></div><div class="view-actions"><button class="button secondary" data-action="share-directory">${icon('link')} Copy duty link</button></div></div>
    <div class="directory-layout">
      <aside class="filter-panel"><div class="filter-section"><label>Jurisdiction</label><select class="select" id="zoneSelect"><option>T. Nagar · Chennai</option><option>Guindy · Chennai</option><option>Madurai City</option><option>Coimbatore City</option></select></div><div class="filter-section"><label>Agency</label><div class="agency-filters">${agencies.map(a => `<button class="agency-filter ${state.agency===a?'active':''}" data-agency="${a}"><i class="agency-dot" style="background:${a==='All agencies'?'#111':a.includes('Fire')?'#d92d20':a.includes('EMRI')?'#16803c':a.includes('ERSS')?'#b36b00':'#1c5fd4'}"></i>${a}<b>${a==='All agencies'?people.length:people.filter(p=>p.agency===a).length}</b></button>`).join('')}</div></div><div class="filter-section"><label>Presence</label><div class="presence-key"><span><i class="agency-dot" style="background:#16803c"></i>Available now</span><span><i class="agency-dot" style="background:#ec8d00"></i>Radio only</span><span><i class="agency-dot" style="background:#aaa"></i>Unavailable · escalate</span></div></div></aside>
      <div><div class="panel-head" style="border:1px solid var(--line);margin-bottom:10px"><div><h3>T. Nagar responsibility roster</h3><p>${filtered.length} matching officers and service leads</p></div><label class="global-search" style="margin:0;width:260px"><span>${icon('search')}</span><input id="directorySearch" value="${state.query}" placeholder="Filter this roster"></label></div><div class="person-grid">${filtered.length ? filtered.map(personCard).join('') : '<div class="empty-state">No responsible officers match this filter.</div>'}</div></div>
    </div></section>`;
}

function personCard(p) {
  const presenceLabel = p.presence === 'online' ? 'Available' : p.presence === 'radio' ? 'Radio only' : 'Unavailable';
  return `<button class="person-card" data-person="${p.id}"><span class="presence ${p.presence}">${presenceLabel}</span><div class="card-top"><span class="avatar">${p.initials}</span><div><h3>${p.name}</h3><p class="role">${p.role}</p></div></div><div class="person-meta"><span>Agency<b>${p.agency}</b></span><span>Unit / callsign<b>${p.unit}</b></span><span>Jurisdiction<b>${p.zone}</b></span><span>Preferred reach<b>${p.method}</b></span></div><div class="person-actions"><span>${icon('radio',12)} PTT</span><span>${icon('phone',12)} Call</span><span>${icon('message',12)} Message</span></div></button>`;
}

function renderIncidents() {
  const selected = incidents.find(i => i.id === state.selectedIncident) || incidents[0];
  const content = state.commandTab === 'timeline' ? `<div class="timeline"><div class="timeline-item"><span class="timeline-time">14:30:18</span><div class="timeline-copy"><strong>ERSS dispatch creates command group</strong><p>Multiple 112 calls matched near Guindy flyover. Traffic, local police, Fire, 108, NHAI road control and towing stakeholders were resolved and notified.</p></div></div><div class="timeline-item"><span class="timeline-time">14:31:02</span><div class="timeline-copy"><strong>South Zone radio net bridged</strong><p>RoIP gateway TN-3 patched DMR Channel 3 into this incident group; recording and field GPS correlation started.</p></div></div><div class="timeline-item"><span class="timeline-time">14:34:28</span><div class="timeline-copy"><strong>First-on-scene report translated</strong><p>Tamil radio identified a three-vehicle collision, vehicle fire and fuel spill. Second ambulance request verified by dispatcher.</p></div></div><div class="timeline-item"><span class="timeline-time">14:35:14</span><div class="timeline-copy"><strong>Traffic diversion and emergency corridor active</strong><p>Traffic Central closed southbound lanes while retaining shoulder access for Fire and 108.</p></div></div><div class="timeline-item"><span class="timeline-time">14:35:44</span><div class="timeline-copy"><strong>Trauma triage established</strong><p>AMB-2291 reports two red-priority patients and three walking wounded; hospital pre-alert initiated.</p></div></div><div class="timeline-item"><span class="timeline-time">14:36:50</span><div class="timeline-copy"><strong>Road recovery resources mobilized</strong><p>NHAI barriers, spill control and recovery cranes dispatched; entry remains subject to Fire hot-zone clearance.</p></div></div></div>` : `<div class="responder-list">${people.slice(0,6).map(p=>`<div class="responder-row"><span class="avatar">${p.initials}</span><div><strong>${p.name}</strong><small>${p.role} · ${p.unit}</small></div><span class="presence ${p.presence}">${p.presence==='online'?'Available':p.presence==='radio'?'Radio':'Offline'}</span></div>`).join('')}</div>`;
  return `<section class="view"><div class="view-head"><div><p class="eyebrow">DYNAMIC RESPONSE GROUPS</p><h2>Incident command</h2><p>CAD and ICCC events become governed talk-groups, chat rooms, file spaces and evidence records.</p></div><div class="view-actions"><button class="button secondary" data-action="upload">${icon('file')} Add file</button><button class="button primary" data-action="new-incident">${icon('plus')} Create incident</button></div></div>
    <div class="incident-workspace"><section><div class="panel"><div class="panel-head"><div><h3>Active incidents</h3><p>Three live command groups</p></div></div><div class="incident-list">${incidents.map(incidentRow).join('')}</div></div><div class="incident-detail" style="margin-top:12px"><div class="incident-banner"><div><span class="severity-tag ${selected.severity.toLowerCase()}">${selected.severity}</span><h3>${selected.title}</h3><p>${selected.id} · ${selected.location} · source ${selected.source}</p></div><div class="view-actions"><button class="button secondary" data-action="open-channel">${icon('message')} Open group</button><button class="button dark" data-action="join-ptt">${icon('radio')} Join PTT</button></div></div><div class="command-tabs"><button class="command-tab ${state.commandTab==='timeline'?'active':''}" data-command-tab="timeline">Operational timeline</button><button class="command-tab ${state.commandTab==='responders'?'active':''}" data-command-tab="responders">Responders (21)</button><button class="command-tab" data-action="files">Files (6)</button></div>${content}</div></section>
      <aside><section class="panel"><div class="panel-head"><div><h3>Command brief</h3><p>Verified 14:49 · AI-assisted</p></div><button class="panel-action" data-action="refresh-brief">Refresh</button></div><div style="padding:15px;font-size:10px;line-height:1.65"><ol style="padding-left:17px;margin:0;display:grid;gap:8px"><li>Bus, lorry and car involved; car fire suppression is in progress.</li><li>50 m hot zone established; lorry cargo declaration remains unverified.</li><li>Southbound GST Road closed with an emergency shoulder corridor.</li><li>Two red-priority patients and three walking wounded under 108 triage.</li><li>NHAI spill control, barriers and recovery cranes mobilized outside the hot zone.</li></ol><div class="privacy-note" style="margin-top:14px">${icon('shield')} Every line links to source audio, CAD event or responder update. Human verification required before external release.</div></div></section><section class="panel" style="margin-top:12px"><div class="panel-head"><div><h3>Bridged resources</h3><p>Field channels and live context</p></div></div><div class="responder-list"><div class="responder-row"><span class="avatar">R3</span><div><strong>South Zone DMR Ch-3</strong><small>RoIP TN-3 · Police + Fire</small></div><span class="status-tag live">Live</span></div><div class="responder-row"><span class="avatar">G24</span><div><strong>ICCC Camera G-24</strong><small>Guindy flyover · 1080p</small></div><span class="status-tag live">Live</span></div><div class="responder-row"><span class="avatar">112</span><div><strong>ERSS CAD event</strong><small>Call taker + dispatch status sync</small></div><span class="status-tag live">Sync</span></div></div></section></aside>
    </div></section>`;
}

function renderComms() {
  const channel = channels.find(c=>c.id===state.selectedChannel) || channels[0];
  const messages = conversations[channel.id] || [];
  return `<section class="view"><div class="view-head"><div><p class="eyebrow">VOICE · PTT · CHAT · FILES</p><h2>Unified communications</h2><p>Sample operational conversations show officers how radio, app, SIP and translated messages converge in one incident record.</p></div><div class="view-actions"><button class="button secondary" data-action="new-group">${icon('users')} New group</button></div></div>
    <div class="comms-layout"><aside class="channel-list"><div class="channel-search"><input class="text-input" placeholder="Search channels"></div>${channels.map(c=>`<button class="channel-item ${c.id===channel.id?'active':''}" data-channel="${c.id}"><span class="channel-icon">${icon(c.icon)}</span><div><strong>${c.name}</strong><small>${c.meta}</small></div><time>${c.time}</time></button>`).join('')}</aside>
      <section class="conversation"><header class="conversation-head"><span class="channel-icon">${icon(channel.icon)}</span><div><h3>${channel.name}</h3><p>${channel.meta} · messages retained under incident policy</p></div><button class="icon-button" data-action="call" aria-label="Start call">${icon('phone')}</button><button class="icon-button" data-action="channel-info" aria-label="Channel information">${icon('users')}</button></header><div class="message-stream" id="messageStream">${messages.map(messageMarkup).join('')}</div><div class="composer"><button class="icon-button" data-action="upload" aria-label="Attach a file">${icon('file')}</button><input id="messageInput" placeholder="Message this group…"><button class="ptt-button" id="pttButton">${icon('mic',13)} Hold to talk</button><button class="button primary" data-action="send-message" aria-label="Send message">${icon('send')}</button></div></section>
    </div></section>`;
}

function messageMarkup(m) {
  let body = m.text || '';
  if (m.type === 'audio') body = `<div class="audio-bubble"><button data-action="play-sample" data-audio-sample="${sampleIdForMessage(m)}" data-audio-text="${escapeHtml(m.audioText || m.text)}" data-audio-lang="${m.audioLang || 'en-IN'}" aria-label="Play approved ${m.audioLang?.startsWith('ta') ? 'Tamil' : 'English'} radio sample">${icon('play',12)}</button><div class="wave">${[35,60,25,85,44,70,32,90,55,38,66,27,78,50,31].map(h=>`<i style="height:${h}%"></i>`).join('')}</div><b>${m.duration}</b></div><small class="audio-model">Approved ${m.audioLang?.startsWith('ta') ? 'Tamil' : 'English'} voice · Gemini TTS fallback</small><div style="margin-top:9px">${m.text}</div>`;
  if (m.type === 'file') body = `<div class="audio-bubble">${icon('camera',22)}<div><strong>${m.file}</strong><br><small>${m.detail}</small></div></div>`;
  return `<article class="message ${m.mine?'mine':''}"><div class="message-meta"><b>${m.from}</b><time>${m.time}</time>${m.ai?'<span class="status-tag live">AI</span>':''}</div><div class="bubble">${body}${m.translation?`<div class="translation"><b>${m.translationModel||'Gemini 3.5 Live'} · source → English</b>${m.translation}</div>`:''}</div></article>`;
}

function sampleIdForMessage(message) {
  if (message.sampleId) return message.sampleId;
  if (message.from.startsWith('SI M. Anitha')) return 'first-scene-ta';
  if (message.from.startsWith('TI V. Aravind')) return 'traffic-en';
  if (message.from.startsWith('AI Voice Relay')) return 'relay-en';
  return 'district-radio-ta';
}

const languages = [['ta','தமிழ் · Tamil'],['en','English'],['hi','हिन्दी · Hindi'],['te','తెలుగు · Telugu'],['ml','മലയാളം · Malayalam'],['kn','ಕನ್ನಡ · Kannada'],['ur','اردو · Urdu'],['bn','বাংলা · Bengali'],['mr','मराठी · Marathi'],['gu','ગુજરાતી · Gujarati']];

function renderTranslate() {
  const workerUrl = localStorage.getItem('uecpWorkerUrl') || DEFAULT_WORKER_URL;
  const target = localStorage.getItem('uecpTargetLanguage') || 'en';
  return `<section class="view"><div class="view-head"><div><p class="eyebrow">GEMINI LIVE THROUGH SECURE WORKER</p><h2>Real-time speech translation</h2><p>Low-latency Tamil ↔ English and multilingual interpretation for cross-agency calls and bridged radio traffic.</p></div><div class="view-actions"><span class="classification">PILOT · HUMAN SUPERVISED</span></div></div>
    <div class="translate-layout"><section class="translate-console"><div class="translate-hero"><div><p class="eyebrow">LIVE INTERPRETER</p><h3>Speak naturally. Hear the translation.</h3><p>Continuous audio translation · source and output transcripts retained with consent</p></div><span class="model-chip">gemini-3.5-live-translate-preview</span></div><div class="language-route"><label>Input language<select id="sourceLanguage"><option value="auto">Auto-detect</option>${languages.map(([c,n])=>`<option value="${c}">${n}</option>`).join('')}</select></label><span class="route-arrow">${icon('languages')}</span><label>Translate into<select id="targetLanguage">${languages.map(([c,n])=>`<option value="${c}" ${c===target?'selected':''}>${n}</option>`).join('')}</select></label></div>
      <div class="transcript-stage"><section class="transcript-card"><header><span>Source transcript</span><span id="inputLanguageCode">AUTO</span></header><div class="transcript-copy ${state.transcriptIn?'':'transcript-placeholder'}" id="inputTranscript">${state.transcriptIn || 'Source speech will appear here as the radio or officer speaks…'}</div><footer class="transcript-foot"><span>16 kHz PCM input</span><span id="inputConfidence">waiting</span></footer></section><section class="transcript-card"><header><span>Translated transcript</span><span id="outputLanguageCode">${target.toUpperCase()}</span></header><div class="transcript-copy ${state.transcriptOut?'':'transcript-placeholder'}" id="outputTranscript">${state.transcriptOut || 'The translated transcript will appear here and audio will play automatically…'}</div><footer class="transcript-foot"><span>24 kHz PCM output</span><span id="outputState">waiting</span></footer></section></div>
      <div class="translate-controls"><button class="mic-button ${state.translating?'active':''}" id="translateMic" aria-label="${state.translating?'Stop':'Start'} live translation">${icon(state.translating?'x':'mic')}</button><div class="session-state"><strong id="sessionStatus">${state.translating?'Live translation active':'Ready to translate'}</strong><small id="sessionDetail">${state.translating?'Listening for speech':'Select a target language, then start'}</small></div><button class="button secondary" data-action="load-translation-demo">Play sample flow</button></div></section>
      <aside class="settings-panel"><div class="panel-head"><div><h3>Secure gateway</h3><p>API key remains in Cloudflare</p></div>${icon('shield')}</div><div class="settings-body"><label>Cloudflare Worker URL<input id="workerUrl" value="${workerUrl}" placeholder="https://uecp-gemini-proxy.workers.dev"></label><button class="button secondary connection-test" data-action="test-worker">${icon('activity')} Test connection</button><div class="privacy-note">${icon('lock')} GitHub Pages never receives the Gemini API key. The Worker validates the origin, rate-limits sessions and enforces approved model identifiers.</div><div class="mini-stat-grid"><div class="mini-stat"><span>Text model</span><b>3.1 Flash-Lite</b></div><div class="mini-stat"><span>Voice model</span><b>3.5 Live</b></div><div class="mini-stat"><span>Input</span><b>16 kHz</b></div><div class="mini-stat"><span>Output</span><b>24 kHz</b></div></div><label><input type="checkbox" id="echoLanguage" style="width:auto;height:auto;margin:0 6px 0 0" checked> Echo speech already in target language</label><button class="button dark" data-action="save-worker">Save gateway settings</button></div></aside>
    </div></section>`;
}

function renderIntegrations() {
  const items = [
    ['ERSS 112 · CAD','alert','CAP / EIDO adapter','Inbound events · outbound status','34 ms'],
    ['City ICCC','camera','IUDX / REST / CAP','Alerts · cameras · responder map','82 ms'],
    ['Radio interoperability','radio','RTP / SIP / DMR-AIS','118 bridged channels','12 ms'],
    ['CCTNS','database','State API gateway','Person · vehicle context','91 ms'],
    ['IP-PBX / PSTN','phone','SIP trunk','Desk phone · relay calls','18 ms'],
    ['Evidence store','shield','WORM + hash chain','Voice · files · audit trail','current']
  ];
  return `<section class="view"><div class="view-head"><div><p class="eyebrow">OEM-NEUTRAL FEDERATION</p><h2>Integration & middleware fabric</h2><p>Existing radio fleets, CAD, ICCC and telephony remain operational while UECP provides one governed communication layer.</p></div><div class="view-actions"><button class="button secondary" data-action="refresh-integrations">${icon('refresh')} Refresh health</button></div></div><div class="integration-grid">${items.map(i=>`<article class="integration-card"><header><span class="integration-logo">${icon(i[1])}</span><div><h3>${i[0]}</h3><p>${i[2]}<br>${i[3]}</p></div></header><footer><span><i class="agency-dot" style="background:#16803c"></i>Connected</span><code>${i[4]}</code></footer></article>`).join('')}</div><div class="architecture-strip"><div class="arch-node"><strong>FIELD & RADIO</strong><small>Existing analog / DMR fleets, mobile apps, MDTs</small></div><div class="arch-arrow">→</div><div class="arch-node"><strong>RoIP + GSWAN</strong><small>Donor radio gateways, VPN, resilient paths</small></div><div class="arch-arrow">→</div><div class="arch-node accent"><strong>UECP CORE · DC/DRC</strong><small>MCX, directory, incidents, messaging, AI concierge</small></div><div class="arch-arrow">↔</div><div class="arch-node"><strong>EXTERNAL SYSTEMS</strong><small>ERSS, ICCC, CCTNS, IP-PBX and state GIS</small></div></div></section>`;
}

function renderAudit() {
  const rows = [
    ['14:49:12','AI brief regenerated','INC-0431','ADGP A. Karthik','a8f7…90c2','Verified'],
    ['14:47:26','Patient status received','AMB-2291','Dr. S. Lakshmi','b112…7dd9','Ingested'],
    ['14:43:05','Bot relay approved','FIRE DMR Ch-3','Dispatcher Vignesh','cc84…02e1','Approved'],
    ['14:39:02','Camera snapshot attached','ICCC CAM-17','System adapter','348e…fb16','Ingested'],
    ['14:36:42','Tamil radio translated','FIRE-TN-3','Gemini Live gateway','714a…aec4','AI output'],
    ['14:31:02','Radio bridge opened','DMR Ch-3','SFO K. Prabhu','4df0…a229','Authorized'],
    ['14:30:18','Incident group created','INC-0431','ERSS CAD adapter','f938…0dd1','Automated']
  ];
  return `<section class="view"><div class="view-head"><div><p class="eyebrow">CHAIN OF CUSTODY</p><h2>Evidence & audit</h2><p>Every message, file, translation, radio action and AI brief retains source linkage and an immutable integrity record.</p></div><div class="view-actions"><button class="button secondary" data-action="verify-chain">${icon('shield')} Verify hash chain</button><button class="button primary" data-action="export-audit">${icon('file')} Export manifest</button></div></div><div class="metric-grid">${metric('Evidence objects','18.6 M','1.4 TB online this month','database',true)}${metric('Hash-chain status','Valid','0 integrity exceptions','shield')}${metric('Retention jobs','12','All completed on schedule','clock')}${metric('Pending approvals','04','2 relay · 2 export requests','userCheck')}</div><div class="panel" style="margin-top:12px"><div class="panel-head"><div><h3>Recent evidence events</h3><p>WORM store · role-gated playback · official timestamps</p></div><span class="status-tag live">Chain valid</span></div><div class="audit-wrap"><table class="audit-table"><thead><tr><th>Time</th><th>Event</th><th>Object</th><th>Actor</th><th>SHA-256</th><th>State</th></tr></thead><tbody>${rows.map(r=>`<tr><td><code>${r[0]}</code></td><td><b>${r[1]}</b></td><td>${r[2]}</td><td>${r[3]}</td><td class="hash"><code>${r[4]}</code></td><td><span class="status-tag live">${r[5]}</span></td></tr>`).join('')}</tbody></table></div></div></section>`;
}

function render() {
  if(state.gisMap){state.gisMap.remove();state.gisMap=null;state.gisTileLayer=null;state.gisLayers={};}
  document.body.classList.remove('gis-expanded');
  const [eye, title] = titles[state.view] || titles.overview;
  eyebrow.textContent = eye; pageTitle.textContent = title;
  document.querySelectorAll('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.view === state.view));
  const views = { overview:renderOverview, directory:renderDirectory, incidents:renderIncidents, comms:renderComms, translate:renderTranslate, integrations:renderIntegrations, audit:renderAudit };
  viewRoot.innerHTML = (views[state.view] || renderOverview)();
  bindViewEvents();
  if(state.view==='overview')requestAnimationFrame(initChennaiMap);
  window.scrollTo({top:0, behavior:'smooth'});
}

function navigate(view) {
  state.view = view; location.hash = view; render();
  document.querySelector('#sidebar').classList.remove('open');
  viewRoot.focus({preventScroll:true});
}

function bindViewEvents() {
  viewRoot.querySelectorAll('[data-view-link]').forEach(b => b.onclick = () => navigate(b.dataset.viewLink));
  viewRoot.querySelectorAll('[data-incident]').forEach(b => b.onclick = () => { state.selectedIncident = b.dataset.incident; if (state.view === 'overview') navigate('incidents'); else render(); });
  viewRoot.querySelectorAll('[data-agency]').forEach(b => b.onclick = () => { state.agency = b.dataset.agency; render(); });
  viewRoot.querySelectorAll('[data-person]').forEach(b => b.onclick = () => openPerson(Number(b.dataset.person)));
  viewRoot.querySelectorAll('[data-channel]').forEach(b => b.onclick = () => { state.selectedChannel = b.dataset.channel; render(); });
  viewRoot.querySelectorAll('[data-command-tab]').forEach(b => b.onclick = () => { state.commandTab = b.dataset.commandTab; render(); });
  viewRoot.querySelectorAll('[data-action]').forEach(b => b.onclick = () => handleAction(b.dataset.action, b));
  const ds = document.querySelector('#directorySearch'); if (ds) ds.oninput = e => { state.query = e.target.value; clearTimeout(ds._t); ds._t=setTimeout(render,160); };
  const messageInput = document.querySelector('#messageInput'); if (messageInput) messageInput.onkeydown = e => { if (e.key==='Enter') sendMessage(); };
  viewRoot.querySelectorAll('[data-gis-layer]').forEach(button=>button.onclick=()=>toggleGisLayer(button));
  viewRoot.querySelectorAll('[data-gis-base]').forEach(button=>button.onclick=()=>setGisBase(button.dataset.gisBase));
  bindPtt();
  const mic = document.querySelector('#translateMic'); if (mic) mic.onclick = toggleTranslation;
}

function handleAction(action, button) {
  const actions = {
    'new-incident': () => document.querySelector('#incidentDialog').showModal(),
    'upload': () => document.querySelector('#fileInput').click(),
    'send-message': sendMessage,
    'open-channel': () => { state.selectedChannel='fire'; navigate('comms'); },
    'join-ptt': () => { state.selectedChannel='fire'; navigate('comms'); toast('Joined incident PTT · hold the talk button to transmit'); },
    'save-worker': saveWorkerSettings,
    'test-worker': testWorker,
    'load-translation-demo': loadTranslationDemo,
    'refresh-brief': () => refreshBrief(button),
    'export-sitrep': () => downloadText('UECP_SITREP_INC-0431.txt', 'UECP SITUATION REPORT\nINC-0431 · Multi-vehicle collision with vehicle fire\nLocation: GST Road near Guindy flyover\nStatus: Live\nFire suppression, traffic diversion and trauma triage active. Two red-priority patients reported.\nGenerated: '+new Date().toLocaleString('en-IN')),
    'export-audit': () => downloadText('UECP_Audit_Manifest.txt','UECP EVIDENCE MANIFEST\nHash chain: VALID\nObjects: 18,600,000\nExported: '+new Date().toISOString()),
    'verify-chain': () => toast('Evidence hash chain verified · no integrity exceptions'),
    'refresh-integrations': () => toast('All six integration adapters are healthy'),
    'share-directory': () => copyText(location.href.split('#')[0]+'#directory','Duty roster link copied'),
    'map-fullscreen': () => toggleMapFullscreen(button),
    'new-group': () => toast('New group workflow ready · select members by jurisdiction'),
    'call': () => toast('Secure group call started · ringing 21 members'),
    'play-sample': () => playSyntheticSample(button),
    'files': () => toast('6 incident files · ICCC images, diversion map and vehicle details'),
    'channel-info': () => toast('21 members · 6 agencies · evidence retention: 7 years')
  };
  if (actions[action]) actions[action](); else toast('Action completed in prototype mode');
}

function openPerson(id) {
  const p = people.find(x=>x.id===id); if (!p) return;
  const drawer = document.querySelector('#detailDrawer');
  drawer.innerHTML = `<div class="drawer-head"><div><div class="drawer-avatar">${p.initials}</div><div class="drawer-copy"><span class="presence ${p.presence}">${p.presence==='online'?'Available now':p.presence==='radio'?'Radio only':'Unavailable'}</span><h2>${p.name}</h2><p>${p.role} · ${p.agency}</p></div></div><button class="icon-button" data-close-drawer>${icon('x')}</button></div><div class="drawer-actions"><button class="button primary" data-contact="PTT">${icon('radio')} PTT</button><button class="button secondary" data-contact="Call">${icon('phone')} Call</button><button class="button secondary" data-contact="Message">${icon('message')} Message</button></div><div class="drawer-info"><div><span>Current unit</span><b>${p.unit}</b></div><div><span>Jurisdiction</span><b>${p.zone}</b></div><div><span>Preferred reach</span><b>${p.method}</b></div><div><span>Languages</span><b>${p.language}</b></div><div><span>Official contact</span><b>${p.phone}</b></div><div><span>Duty window</span><b>08:00–20:00 IST</b></div></div><div class="escalation"><h3>Responsibility chain</h3><p>If this officer remains unreachable for 3 minutes on a critical incident, UECP escalates to the zonal ACP and records every attempt.</p></div>`;
  drawer.querySelector('[data-close-drawer]').onclick = closeDrawer;
  drawer.querySelectorAll('[data-contact]').forEach(b=>b.onclick=()=>toast(`${b.dataset.contact} request sent to ${p.name}`));
  drawer.classList.add('open'); drawer.setAttribute('aria-hidden','false'); document.querySelector('#drawerBackdrop').classList.add('open');
}

function closeDrawer() { document.querySelector('#detailDrawer').classList.remove('open'); document.querySelector('#detailDrawer').setAttribute('aria-hidden','true'); document.querySelector('#drawerBackdrop').classList.remove('open'); }

function sendMessage() {
  const input = document.querySelector('#messageInput'); if (!input || !input.value.trim()) return;
  conversations[state.selectedChannel].push({from:'You · State Control',time:new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}),text:escapeHtml(input.value.trim()),mine:true});
  input.value=''; render(); setTimeout(()=>document.querySelector('#messageStream')?.scrollTo({top:99999,behavior:'smooth'}),20);
}

function bindPtt() {
  const ptt = document.querySelector('#pttButton'); if (!ptt) return;
  const start = async e => {
    e.preventDefault();
    if (state.pttRecorder) return;
    state.pttStopRequested=false;
    ptt.classList.add('transmitting'); ptt.innerHTML=`${icon('activity',13)} Recording`;
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) return;
    try {
      const stream=await navigator.mediaDevices.getUserMedia({audio:{channelCount:1,echoCancellation:true,noiseSuppression:true,autoGainControl:true}});
      state.pttStream=stream; state.pttChunks=[];
      const preferred=['audio/webm;codecs=opus','audio/webm','audio/mp4'].find(type=>MediaRecorder.isTypeSupported(type));
      const recorder=new MediaRecorder(stream,preferred?{mimeType:preferred}:undefined); state.pttRecorder=recorder;
      recorder.ondataavailable=event=>{if(event.data.size)state.pttChunks.push(event.data);};
      recorder.onstop=async()=>{
        const blob=new Blob(state.pttChunks,{type:recorder.mimeType||'audio/webm'});
        state.pttStream?.getTracks().forEach(track=>track.stop()); state.pttStream=null; state.pttRecorder=null; state.pttChunks=[];
        if(blob.size)await transcribeAudioBlob(blob,'Field PTT voice note');
        else {ptt.disabled=false;ptt.innerHTML=`${icon('mic',13)} Hold to talk`;toast('No audio was captured');}
      };
      recorder.start();
      if(state.pttStopRequested)recorder.stop();
    } catch(error) {
      state.pttStream?.getTracks().forEach(track=>track.stop()); state.pttStream=null; state.pttRecorder=null;
      ptt.disabled=false; ptt.classList.remove('transmitting'); ptt.innerHTML=`${icon('mic',13)} Hold to talk`;
      toast(`Microphone unavailable · ${error.message}`);
    }
  };
  const stop = () => {
    if (!ptt.classList.contains('transmitting')) return;
    state.pttStopRequested=true; ptt.classList.remove('transmitting'); ptt.disabled=true; ptt.innerHTML=`${icon('activity',13)} Transcribing…`;
    if(state.pttRecorder?.state==='recording')state.pttRecorder.stop();
    else if(!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder){ptt.disabled=false;ptt.innerHTML=`${icon('mic',13)} Hold to talk`;toast('PTT transmission captured in prototype mode');}
  };
  ptt.addEventListener('pointerdown',start); ptt.addEventListener('pointerup',stop); ptt.addEventListener('pointercancel',stop); ptt.addEventListener('pointerleave',stop);
}

async function transcribeAudioBlob(blob, sourceLabel='Uploaded voice note') {
  const workerUrl=(localStorage.getItem('uecpWorkerUrl') || DEFAULT_WORKER_URL).replace(/\/$/,'');
  try {
    const response=await fetch(`${workerUrl}/text/transcribe`,{method:'POST',headers:{'Content-Type':blob.type||'audio/webm'},body:blob});
    const data=await response.json(); if(!response.ok)throw new Error(data.error||'transcription failed');
    const original=escapeHtml(data.transcript||'[No speech detected]');
    const english=escapeHtml(data.englishTranslation||'');
    conversations.fire.push({
      from:`You · ${sourceLabel} · Gemini 3.1 Flash-Lite`,
      time:new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}),
      text:original,
      translation:english&&english!==original?english:'',
      translationModel:'Gemini 3.1 Flash-Lite',
      mine:true,
      ai:true
    });
    state.selectedChannel='fire';
    if(state.view==='comms')render();
    toast(`Voice note transcribed · ${String(data.languageCode||'auto').toUpperCase()} · human review required`);
  } catch(error) {
    toast(`Audio transcription failed · ${error.message}`);
  } finally {
    const button=document.querySelector('#pttButton'); if(button){button.disabled=false;button.classList.remove('transmitting');button.innerHTML=`${icon('mic',13)} Hold to talk`;}
  }
}

function toast(message) {
  const region = document.querySelector('#toastRegion'); const node=document.createElement('div'); node.className='toast'; node.innerHTML=`${icon('check')}<span>${message}</span>`; region.append(node); setTimeout(()=>node.remove(),3800);
}

function saveWorkerSettings() {
  const url = document.querySelector('#workerUrl')?.value.trim().replace(/\/$/,'');
  if (!url) return toast('Enter the deployed Cloudflare Worker URL first');
  localStorage.setItem('uecpWorkerUrl',url); localStorage.setItem('uecpTargetLanguage',document.querySelector('#targetLanguage')?.value||'en'); toast('Secure gateway settings saved on this device');
}

async function testWorker() {
  const url = document.querySelector('#workerUrl')?.value.trim().replace(/\/$/,''); if (!url) return toast('Enter the Worker URL first');
  try { const r=await fetch(`${url}/health`); const data=await r.json(); if(!r.ok)throw new Error(data.error||'unavailable'); toast(`Worker connected · ${data.liveModel||'approved model ready'}`); }
  catch(e){ toast(`Worker connection failed · ${e.message}`); }
}

async function refreshBrief(button) {
  const original=button?.innerHTML; if(button){button.disabled=true;button.textContent='Generating…';}
  const url=localStorage.getItem('uecpWorkerUrl') || DEFAULT_WORKER_URL;
  try {
    if (!url) throw new Error('demo');
    const r=await fetch(`${url}/text/brief`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({incidentId:'INC-0431',events:['Bus, lorry and car collided near Guindy flyover','Car fire suppression in progress','50 metre hot zone active','Southbound lanes closed with emergency corridor','Two red-priority patients and three walking wounded','Lorry cargo declaration not yet verified','NHAI spill control ETA six minutes']})});
    const data=await r.json(); if(!r.ok)throw new Error(data.error||'brief failed');
    const panel=document.querySelector('#briefPanel'); if(panel)panel.innerHTML=`<div class="timeline-item"><span class="timeline-time">NOW</span><div class="timeline-copy"><strong>AI communications brief refreshed.</strong><p>${escapeHtml(data.brief)}</p></div></div>`;
    toast('Brief regenerated with Gemini 3.1 Flash-Lite');
  } catch { setTimeout(()=>toast('Demo brief refreshed · connect Worker for live Gemini output'),300); }
  finally { if(button){button.disabled=false;button.innerHTML=original;} }
}

function loadTranslationDemo() {
  state.transcriptIn='கட்டிடத்தின் கிழக்குப் பகுதியில் கூட்டம் அதிகரிக்கிறது. போக்குவரத்து காவல்துறை உதவி தேவை.';
  state.transcriptOut='The crowd is increasing on the east side of the building. Traffic Police assistance is required.';
  const i=document.querySelector('#inputTranscript'),o=document.querySelector('#outputTranscript'); if(i){i.textContent=state.transcriptIn;i.classList.remove('transcript-placeholder');} if(o){o.textContent=state.transcriptOut;o.classList.remove('transcript-placeholder');}
  document.querySelector('#inputLanguageCode').textContent='TA'; document.querySelector('#inputConfidence').textContent='96% confidence'; document.querySelector('#outputState').textContent='translated in 480 ms'; toast('Sample Tamil radio translation loaded');
}

async function toggleTranslation() { if (state.translating) stopTranslation(); else await startTranslation(); }

async function startTranslation() {
  const base=(document.querySelector('#workerUrl')?.value.trim()||localStorage.getItem('uecpWorkerUrl')||DEFAULT_WORKER_URL).replace(/\/$/,''); if(!base)return toast('Configure the Cloudflare Worker URL before starting');
  const target=document.querySelector('#targetLanguage').value; localStorage.setItem('uecpWorkerUrl',base);localStorage.setItem('uecpTargetLanguage',target);
  try {
    const wsUrl=base.replace(/^http/,'ws')+'/live'; const socket=new WebSocket(wsUrl); state.socket=socket;
    updateSession('Connecting securely…','Opening the Worker relay');
    socket.onopen=async()=>{
      socket.send(JSON.stringify({setup:{model:'models/gemini-3.5-live-translate-preview',generationConfig:{responseModalities:['AUDIO'],inputAudioTranscription:{},outputAudioTranscription:{},translationConfig:{targetLanguageCode:target,echoTargetLanguage:document.querySelector('#echoLanguage').checked}}}}));
      await beginMicrophone(socket); state.translating=true; updateMicUi(); updateSession('Live translation active','Listening · tap the yellow microphone to stop');
    };
    socket.onmessage=e=>handleLiveMessage(e.data);
    socket.onerror=()=>{toast('Live translation connection error');stopTranslation();};
    socket.onclose=()=>{ if(state.translating)toast('Live translation session ended');stopTranslation(false); };
  } catch(e){ toast(`Could not start translation · ${e.message}`); stopTranslation(); }
}

async function beginMicrophone(socket) {
  const stream=await navigator.mediaDevices.getUserMedia({audio:{channelCount:1,echoCancellation:true,noiseSuppression:true,autoGainControl:true}}); state.audioStream=stream;
  const Ctx=window.AudioContext||window.webkitAudioContext; const ctx=new Ctx(); state.audioContext=ctx; const source=ctx.createMediaStreamSource(stream); const processor=ctx.createScriptProcessor(4096,1,1); state.processor=processor;
  processor.onaudioprocess=e=>{ if(socket.readyState!==WebSocket.OPEN)return; const pcm=downsampleTo16k(e.inputBuffer.getChannelData(0),ctx.sampleRate); socket.send(JSON.stringify({realtimeInput:{audio:{data:arrayBufferToBase64(pcm.buffer),mimeType:'audio/pcm;rate=16000'}}})); };
  source.connect(processor); processor.connect(ctx.destination);
}

function downsampleTo16k(input, sampleRate) {
  const ratio=sampleRate/16000, length=Math.round(input.length/ratio), output=new Int16Array(length); let offset=0;
  for(let i=0;i<length;i++){const next=Math.round((i+1)*ratio);let sum=0,count=0;for(let j=offset;j<next&&j<input.length;j++){sum+=input[j];count++;}const s=Math.max(-1,Math.min(1,sum/Math.max(1,count)));output[i]=s<0?s*0x8000:s*0x7fff;offset=next;}
  return output;
}

function handleLiveMessage(raw) {
  try { const msg=JSON.parse(raw); const content=msg.serverContent; if(!content)return;
    if(content.inputTranscription?.text){state.transcriptIn+=content.inputTranscription.text;setTranscript('inputTranscript',state.transcriptIn);document.querySelector('#inputLanguageCode').textContent=(content.inputTranscription.languageCode||'auto').toUpperCase();document.querySelector('#inputConfidence').textContent='live';}
    if(content.outputTranscription?.text){state.transcriptOut+=content.outputTranscription.text;setTranscript('outputTranscript',state.transcriptOut);document.querySelector('#outputLanguageCode').textContent=(content.outputTranscription.languageCode||localStorage.getItem('uecpTargetLanguage')||'en').toUpperCase();document.querySelector('#outputState').textContent='streaming';}
    content.modelTurn?.parts?.forEach(part=>{if(part.inlineData?.data)playPcm24k(part.inlineData.data);});
  } catch(e){console.warn('UECP Live message parse failed',e);}
}

function setTranscript(id,text){const el=document.querySelector('#'+id);if(el){el.textContent=text;el.classList.remove('transcript-placeholder');}}

function playPcm24k(base64) {
  if(!state.audioContext)return; const binary=atob(base64), pcm=new Int16Array(binary.length/2); for(let i=0;i<pcm.length;i++)pcm[i]=(binary.charCodeAt(i*2)|(binary.charCodeAt(i*2+1)<<8)); const buffer=state.audioContext.createBuffer(1,pcm.length,24000),data=buffer.getChannelData(0);for(let i=0;i<pcm.length;i++)data[i]=pcm[i]/32768;const src=state.audioContext.createBufferSource();src.buffer=buffer;src.connect(state.audioContext.destination);const now=state.audioContext.currentTime;state.nextAudioTime=Math.max(now,state.nextAudioTime);src.start(state.nextAudioTime);state.nextAudioTime+=buffer.duration;
}

function stopTranslation(closeSocket=true) {
  state.translating=false; if(state.processor){state.processor.disconnect();state.processor=null;} if(state.audioStream){state.audioStream.getTracks().forEach(t=>t.stop());state.audioStream=null;} if(closeSocket&&state.socket){try{state.socket.close(1000,'user stopped');}catch{}}state.socket=null; updateMicUi();updateSession('Ready to translate','Session stopped · transcripts remain visible');
}

function updateMicUi(){const b=document.querySelector('#translateMic');if(!b)return;b.classList.toggle('active',state.translating);b.innerHTML=icon(state.translating?'x':'mic');b.setAttribute('aria-label',state.translating?'Stop live translation':'Start live translation');}
function updateSession(title,detail){const s=document.querySelector('#sessionStatus'),d=document.querySelector('#sessionDetail');if(s)s.textContent=title;if(d)d.textContent=detail;}
function arrayBufferToBase64(buffer){const bytes=new Uint8Array(buffer);let binary='';for(let i=0;i<bytes.length;i++)binary+=String.fromCharCode(bytes[i]);return btoa(binary);}

async function playSyntheticSample(button) {
  button.disabled=true;
  button.innerHTML=icon('pause',12);
  radioChirp(880, .08);
  await new Promise(resolve=>setTimeout(resolve,420));
  const localSource=LOCAL_AUDIO_SAMPLES[button.dataset.audioSample];
  if(localSource){
    const localAudio=new Audio(localSource);
    let fallbackStarted=false;
    const fallback=()=>{if(fallbackStarted)return;fallbackStarted=true;playGeminiSample(button);};
    localAudio.onended=()=>finishSample(button,'Approved operational voice sample complete');
    localAudio.onerror=fallback;
    try { await localAudio.play(); return; } catch { fallback(); return; }
  }
  await playGeminiSample(button);
}

async function playGeminiSample(button) {
  try {
    const workerUrl=(localStorage.getItem('uecpWorkerUrl') || DEFAULT_WORKER_URL).replace(/\/$/,'');
    const response=await fetch(`${workerUrl}/tts/sample`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sampleId:button.dataset.audioSample})});
    if(!response.ok)throw new Error('Gemini audio unavailable');
    const audioUrl=URL.createObjectURL(await response.blob());
    const audio=new Audio(audioUrl);
    audio.onended=()=>{URL.revokeObjectURL(audioUrl);finishSample(button,'Gemini 3.1 Flash TTS sample complete');};
    audio.onerror=()=>{URL.revokeObjectURL(audioUrl);playBrowserVoice(button);};
    await audio.play();
  } catch {
    playBrowserVoice(button);
  }
}

function playBrowserVoice(button) {
  if (!('speechSynthesis' in window)) return finishSample(button,'Audio playback is unavailable in this browser');
  speechSynthesis.cancel();
  const utterance=new SpeechSynthesisUtterance(button.dataset.audioText || 'UECP radio sample');
  utterance.lang=button.dataset.audioLang || 'en-IN'; utterance.rate=.93; utterance.pitch=.92;
  utterance.onend=()=>finishSample(button,'Browser voice fallback complete');
  utterance.onerror=()=>finishSample(button,'No compatible system voice is installed for this sample');
  setTimeout(()=>speechSynthesis.speak(utterance),110);
}
function finishSample(button,message){radioChirp(620,.06);button.innerHTML=icon('play',12);button.disabled=false;toast(`${message} · source retained in evidence`);}
function radioChirp(frequency,duration){
  if(frequency>700){const cue=new Audio('assets/audio/radio-cue.mp3');cue.volume=.28;cue.play().catch(()=>syntheticChirp(frequency,duration));return;}
  syntheticChirp(frequency,duration);
}
function syntheticChirp(frequency,duration){try{const Ctx=window.AudioContext||window.webkitAudioContext,ctx=new Ctx(),osc=ctx.createOscillator(),gain=ctx.createGain();osc.frequency.value=frequency;gain.gain.setValueAtTime(.04,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+duration);osc.connect(gain);gain.connect(ctx.destination);osc.start();osc.stop(ctx.currentTime+duration);}catch{}}
function downloadText(name,text){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type:'text/plain'}));a.download=name;a.click();URL.revokeObjectURL(a.href);toast(`${name} downloaded`);}
async function copyText(text,message){try{await navigator.clipboard.writeText(text);toast(message);}catch{toast('Copy is unavailable in this browser');}}
function escapeHtml(value){return String(value).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}

async function loadIncidentDatabase() {
  try {
    const [listResponse, detailResponse] = await Promise.all([
      fetch(`${DEFAULT_WORKER_URL}/data/incidents`),
      fetch(`${DEFAULT_WORKER_URL}/data/incidents/INC-0431`)
    ]);
    if (!listResponse.ok || !detailResponse.ok) return;
    const listData = await listResponse.json();
    const detailData = await detailResponse.json();
    const existingById = new Map(incidents.map(incident => [incident.id, incident]));
    incidents = listData.incidents.map(incident => ({
      ...(existingById.get(incident.id) || {}),
      id: incident.id,
      title: incident.title,
      location: incident.location,
      severity: incident.severity,
      source: incident.source,
      status: incident.status,
      age: incident.status === 'Live' ? 'Live now' : 'Monitoring',
      responders: incident.responder_count
    }));
    conversations.fire = detailData.messages.map(message => ({
      from: message.source_name,
      time: new Date(message.sent_at).toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false,timeZone:'Asia/Kolkata'}),
      type: message.message_type,
      duration: message.duration_seconds ? `0:${String(message.duration_seconds).padStart(2,'0')}` : undefined,
      audioText: message.audio_transcript || message.body,
      audioLang: message.language_code,
      sampleId: message.audio_sample_id,
      text: message.body,
      translation: message.translated_body,
      ai: message.source_type === 'ai',
      mine: message.source_type === 'command'
    }));
    state.databaseContext = detailData;
    render();
  } catch {}
}

document.querySelectorAll('.nav-item').forEach(b=>b.onclick=()=>navigate(b.dataset.view));
document.querySelector('#menuButton').onclick=()=>document.querySelector('#sidebar').classList.toggle('open');
document.querySelector('#drawerBackdrop').onclick=closeDrawer;
document.querySelector('#fileInput').onchange=async e=>{
  const files=[...e.target.files]; const audioFiles=files.filter(file=>file.type.startsWith('audio/'));
  if(audioFiles.length){toast(`${audioFiles.length} audio file${audioFiles.length>1?'s':''} attached · Flash-Lite transcription started`);for(const file of audioFiles.slice(0,3))await transcribeAudioBlob(file,'Uploaded evidence audio');}
  const otherCount=files.length-audioFiles.length;if(otherCount)toast(`${otherCount} file${otherCount>1?'s':''} attached to the evidence record`);
  e.target.value='';
};
document.querySelector('#incidentDialog').addEventListener('close',e=>{if(e.target.returnValue!=='default')return;const form=new FormData(document.querySelector('#incidentForm'));const title=form.get('title'),locationName=form.get('location');if(!title||!locationName)return;const item={id:`INC-${String(432+incidents.length).padStart(4,'0')}`,title,location:locationName,severity:form.get('severity'),source:form.get('source'),age:'Just now',agencies:['POL','F&R','108'],responders:0,status:'Live'};incidents.unshift(item);state.selectedIncident=item.id;toast(`${item.id} created · responsible agencies notified`);navigate('incidents');document.querySelector('#incidentForm').reset();});
document.querySelector('#globalSearch').addEventListener('input',e=>{const q=e.target.value.toLowerCase().trim();if(!q)return;const person=people.find(p=>`${p.name} ${p.unit} ${p.role}`.toLowerCase().includes(q));const incident=incidents.find(i=>`${i.id} ${i.title} ${i.location}`.toLowerCase().includes(q));if(person){state.query=e.target.value;navigate('directory');}else if(incident){state.selectedIncident=incident.id;navigate('incidents');}});
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();document.querySelector('#globalSearch').focus();}if(e.key==='Escape')closeDrawer();});
window.addEventListener('hashchange',()=>{const h=location.hash.slice(1);if(titles[h]&&h!==state.view){state.view=h;render();}});
setInterval(()=>{const c=document.querySelector('#clock');if(c)c.textContent=new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Kolkata'})+' IST';},1000);

hydrateIcons(); render(); loadIncidentDatabase();
