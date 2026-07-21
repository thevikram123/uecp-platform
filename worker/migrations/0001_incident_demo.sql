PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS agencies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  role TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '#111111'
);

CREATE TABLE IF NOT EXISTS incidents (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  incident_type TEXT NOT NULL,
  location TEXT NOT NULL,
  latitude REAL,
  longitude REAL,
  severity TEXT NOT NULL,
  status TEXT NOT NULL,
  source TEXT NOT NULL,
  opened_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  commander TEXT,
  summary TEXT NOT NULL,
  hot_zone_metres INTEGER DEFAULT 0,
  casualties_red INTEGER DEFAULT 0,
  casualties_yellow INTEGER DEFAULT 0,
  walking_wounded INTEGER DEFAULT 0,
  is_demo INTEGER NOT NULL DEFAULT 1 CHECK (is_demo IN (0, 1))
);

CREATE TABLE IF NOT EXISTS responders (
  id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  role TEXT NOT NULL,
  agency_id TEXT NOT NULL REFERENCES agencies(id),
  unit_code TEXT NOT NULL,
  presence TEXT NOT NULL,
  languages TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS incident_participants (
  incident_id TEXT NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
  responder_id TEXT NOT NULL REFERENCES responders(id),
  joined_at TEXT NOT NULL,
  coordination_role TEXT NOT NULL,
  PRIMARY KEY (incident_id, responder_id)
);

CREATE TABLE IF NOT EXISTS audio_samples (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  language_code TEXT NOT NULL,
  transcript TEXT NOT NULL,
  english_translation TEXT,
  tts_model TEXT NOT NULL,
  voice TEXT NOT NULL,
  duration_seconds INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS incident_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  incident_id TEXT NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
  sent_at TEXT NOT NULL,
  source_name TEXT NOT NULL,
  source_type TEXT NOT NULL,
  channel TEXT NOT NULL,
  message_type TEXT NOT NULL DEFAULT 'text',
  language_code TEXT NOT NULL DEFAULT 'en-IN',
  body TEXT NOT NULL,
  translated_body TEXT,
  audio_sample_id TEXT REFERENCES audio_samples(id),
  human_approved INTEGER NOT NULL DEFAULT 1 CHECK (human_approved IN (0, 1)),
  sequence_no INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS incident_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  incident_id TEXT NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
  occurred_at TEXT NOT NULL,
  event_type TEXT NOT NULL,
  title TEXT NOT NULL,
  detail TEXT NOT NULL,
  source TEXT NOT NULL,
  verification_status TEXT NOT NULL,
  sequence_no INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS incident_tasks (
  id TEXT PRIMARY KEY,
  incident_id TEXT NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  owner_agency_id TEXT NOT NULL REFERENCES agencies(id),
  status TEXT NOT NULL,
  priority TEXT NOT NULL,
  due_at TEXT,
  evidence TEXT
);

CREATE TABLE IF NOT EXISTS incident_resources (
  id TEXT PRIMARY KEY,
  incident_id TEXT NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
  agency_id TEXT NOT NULL REFERENCES agencies(id),
  resource_type TEXT NOT NULL,
  callsign TEXT NOT NULL,
  status TEXT NOT NULL,
  eta_minutes INTEGER,
  staging_location TEXT
);

CREATE TABLE IF NOT EXISTS incident_evidence (
  id TEXT PRIMARY KEY,
  incident_id TEXT NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
  captured_at TEXT NOT NULL,
  evidence_type TEXT NOT NULL,
  title TEXT NOT NULL,
  source TEXT NOT NULL,
  retention_class TEXT NOT NULL,
  integrity_status TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_messages_incident_sequence ON incident_messages(incident_id, sequence_no);
CREATE INDEX IF NOT EXISTS idx_events_incident_sequence ON incident_events(incident_id, sequence_no);
CREATE INDEX IF NOT EXISTS idx_incidents_status_updated ON incidents(status, updated_at DESC);

INSERT OR IGNORE INTO agencies (id, name, short_name, role, color) VALUES
('erss', 'Emergency Response Support System 112', 'ERSS 112', 'Call intake and dispatch', '#111111'),
('police', 'Greater Chennai Police', 'Police', 'Scene command and public safety', '#ffe600'),
('fire', 'Tamil Nadu Fire and Rescue Services', 'Fire & Rescue', 'Fire suppression and rescue', '#e94b35'),
('emri', 'EMRI 108', '108 Ambulance', 'Triage and medical transport', '#1a7f37'),
('traffic', 'Greater Chennai Traffic Police', 'Traffic', 'Diversion and emergency corridor', '#2b6cb0'),
('nhai', 'National Highways Authority of India', 'NHAI', 'Road control and recovery', '#805ad5'),
('iccc', 'Integrated Command and Control Centre', 'ICCC', 'Common operating picture', '#111111'),
('tangedco', 'Tamil Nadu Generation and Distribution Corporation', 'TANGEDCO', 'Electrical isolation', '#b7791f');

INSERT OR REPLACE INTO incidents VALUES
('INC-0431', 'Multi-vehicle collision · vehicle fire', 'Road traffic collision with fire', 'GST Road · Guindy flyover · Chennai', 13.0067, 80.2206, 'Critical', 'Live', 'ERSS 112', '2026-07-21T14:30:03+05:30', '2026-07-21T14:49:00+05:30', 'Insp. R. Selvakumar', 'Bus, lorry and car collision followed by a car fire. Fire suppression, trauma triage, traffic diversion and spill control are active while dispatch remains on the common incident group.', 50, 2, 0, 3, 1),
('INC-0428', 'Road collapse after flooding', 'Infrastructure failure', 'Saidapet bridge · Chennai', 13.0213, 80.2231, 'High', 'Live', 'ICCC', '2026-07-21T14:07:00+05:30', '2026-07-21T14:44:00+05:30', 'AO J. Farooq', 'Partial carriageway collapse after flooding. Police cordon and engineering assessment are active.', 20, 0, 1, 0, 1),
('INC-0426', 'Crowd congestion at transit hub', 'Crowd management', 'CMBT · Koyambedu · Chennai', 13.0695, 80.2050, 'Medium', 'Monitoring', 'ICCC', '2026-07-21T13:36:00+05:30', '2026-07-21T14:38:00+05:30', 'TI V. Aravind', 'Crowd density elevated at two boarding bays. Passenger flow plan is active.', 0, 0, 0, 0, 1);

INSERT OR IGNORE INTO responders VALUES
('rsp-dispatch', 'Tr. K. Vignesh', 'PSAP Dispatcher', 'erss', 'PSAP-CHN-12', 'online', 'Tamil / Hindi / English'),
('rsp-anitha', 'SI M. Anitha', 'First on scene', 'police', 'PRV-114', 'radio', 'Tamil'),
('rsp-sho', 'Insp. R. Selvakumar', 'Incident commander', 'police', 'TN-CTY-07', 'online', 'Tamil / English'),
('rsp-prabhu', 'SFO K. Prabhu', 'Fire sector commander', 'fire', 'FIRE-TN-3', 'online', 'Tamil / English'),
('rsp-lakshmi', 'Dr. S. Lakshmi', 'Medical branch lead', 'emri', 'AMB-2291', 'online', 'Tamil / English'),
('rsp-aravind', 'TI V. Aravind', 'Traffic branch lead', 'traffic', 'TRF-CEN-5', 'radio', 'Tamil / English'),
('rsp-nhai6', 'NHAI Patrol 6', 'Road recovery lead', 'nhai', 'NHAI-P6', 'online', 'Tamil / English'),
('rsp-iccc', 'ICCC Duty Officer', 'Common operating picture', 'iccc', 'ICCC-OPS-2', 'online', 'Tamil / English');

INSERT OR IGNORE INTO incident_participants VALUES
('INC-0431', 'rsp-dispatch', '2026-07-21T14:30:03+05:30', 'Dispatch loop owner'),
('INC-0431', 'rsp-anitha', '2026-07-21T14:34:28+05:30', 'First on scene'),
('INC-0431', 'rsp-sho', '2026-07-21T14:35:32+05:30', 'Incident command'),
('INC-0431', 'rsp-prabhu', '2026-07-21T14:34:46+05:30', 'Fire operations'),
('INC-0431', 'rsp-lakshmi', '2026-07-21T14:35:44+05:30', 'Medical operations'),
('INC-0431', 'rsp-aravind', '2026-07-21T14:35:14+05:30', 'Traffic operations'),
('INC-0431', 'rsp-nhai6', '2026-07-21T14:36:50+05:30', 'Road recovery'),
('INC-0431', 'rsp-iccc', '2026-07-21T14:38:14+05:30', 'Command support');

INSERT OR REPLACE INTO audio_samples VALUES
('first-scene-ta', 'Tamil first-on-scene report', 'ta-IN', 'கிண்டி மேம்பாலம் அருகே மூன்று வாகனங்கள் மோதியுள்ளன. ஒரு கார் தீப்பிடித்துள்ளது. எரிபொருள் சாலையில் கசிகிறது. இரண்டாவது ஆம்புலன்ஸ் தேவை.', 'Three vehicles have collided near Guindy flyover. One car is on fire. Fuel is leaking onto the road. A second ambulance is required.', 'gemini-3.1-flash-tts-preview', 'Kore', 11),
('traffic-en', 'English traffic-control update', 'en-IN', 'Traffic Central to all units. Both southbound lanes are closed at the previous junction. Emergency corridor is open on the shoulder.', NULL, 'gemini-3.1-flash-tts-preview', 'Puck', 7),
('relay-en', 'English command voice brief', 'en-IN', 'Automated UECP brief for the zonal Assistant Commissioner. A three vehicle collision with one vehicle fire has closed GST Road southbound near Guindy. Fire suppression, trauma triage and traffic diversion are active. Two red-priority patients are reported. Tap to join the incident group.', NULL, 'gemini-3.1-flash-tts-preview', 'Kore', 14),
('district-radio-ta', 'Tamil district-net relay', 'ta-IN', 'ஒரு கார் தீப்பிடித்துள்ளது. ஆம்புலன்ஸ் மற்றும் தீயணைப்பு வாகனம் உடனடியாக தேவை.', 'A car is on fire. An ambulance and fire tender are required immediately.', 'gemini-3.1-flash-tts-preview', 'Puck', 8);

DELETE FROM incident_messages WHERE incident_id = 'INC-0431';
INSERT INTO incident_messages (incident_id, sent_at, source_name, source_type, channel, message_type, language_code, body, translated_body, audio_sample_id, human_approved, sequence_no) VALUES
('INC-0431', '2026-07-21T14:30:03+05:30', 'ERSS 112 · Call Taker 08', 'dispatcher', 'INC-0431', 'text', 'en-IN', 'Multiple callers report a bus, lorry and car collision near Guindy flyover. The car has caught fire; persons may be trapped. Primary caller remains on line at a safe distance.', NULL, NULL, 1, 1),
('INC-0431', '2026-07-21T14:30:18+05:30', 'ERSS 112 · Dispatcher Vignesh', 'dispatcher', 'INC-0431', 'text', 'en-IN', 'CAD INC-0431 dispatched. Traffic Central, PRV-114, Fire TN-3 and two 108 ambulances assigned. NHAI road control and towing vendor notified. Dynamic group is primary coordination.', NULL, NULL, 1, 2),
('INC-0431', '2026-07-21T14:34:28+05:30', 'SI M. Anitha · PRV-114 · first on scene', 'field', 'INC-0431', 'audio', 'ta-IN', 'கிண்டி மேம்பாலம் அருகே மூன்று வாகனங்கள் மோதியுள்ளன. ஒரு கார் தீப்பிடித்துள்ளது. எரிபொருள் சாலையில் கசிகிறது. இரண்டாவது ஆம்புலன்ஸ் தேவை.', 'Three vehicles have collided near Guindy flyover. One car is on fire. Fuel is leaking onto the road. A second ambulance is required.', 'first-scene-ta', 1, 3),
('INC-0431', '2026-07-21T14:34:46+05:30', 'SFO K. Prabhu · FIRE-TN-3', 'field', 'INC-0431', 'text', 'en-IN', 'Received directly, PRV-114. Keep everyone 50 metres upwind and stop ignition sources. We are two minutes out. Confirm whether the lorry carries hazardous goods.', NULL, NULL, 1, 4),
('INC-0431', '2026-07-21T14:35:01+05:30', 'ERSS 112 · Dispatcher Vignesh', 'dispatcher', 'INC-0431', 'text', 'en-IN', 'Vehicle registration lookup shows general freight; hazardous cargo not declared. Marking this unverified until the driver confirms.', NULL, NULL, 1, 5),
('INC-0431', '2026-07-21T14:35:14+05:30', 'TI V. Aravind · Traffic Central', 'field', 'INC-0431', 'audio', 'en-IN', 'Traffic Central to all units. Both southbound lanes are closed at the previous junction. Emergency corridor is open on the shoulder.', NULL, 'traffic-en', 1, 6),
('INC-0431', '2026-07-21T14:35:21+05:30', 'AI Action Agent · Human supervised', 'ai', 'INC-0431', 'text', 'en-IN', 'Actions tracked: 50 m hot zone active; two southbound lanes closed; emergency corridor open; lorry cargo verification pending. Sources linked.', NULL, NULL, 1, 7),
('INC-0431', '2026-07-21T14:35:44+05:30', 'Dr. S. Lakshmi · AMB-2291', 'field', 'INC-0431', 'text', 'en-IN', 'PRV-114, triage point is 80 metres north, behind the barrier. Two red-priority patients and three walking wounded. Request hospital pre-alert for two trauma beds.', NULL, NULL, 1, 8),
('INC-0431', '2026-07-21T14:35:58+05:30', 'ERSS 112 · Call Taker 08', 'dispatcher', 'INC-0431', 'text', 'en-IN', 'Field picture received. Caller confirms the bus has been evacuated and is moving walking wounded toward the police cordon. I am keeping the caller away from the fuel spill.', NULL, NULL, 1, 9),
('INC-0431', '2026-07-21T14:36:22+05:30', 'FIRE-TN-3 · SFO Prabhu', 'field', 'INC-0431', 'text', 'en-IN', 'Fire knockdown started. Police, confirm all occupants are clear of the car. 108 may approach only from the north until we declare the hot zone safe.', NULL, NULL, 1, 10),
('INC-0431', '2026-07-21T14:36:50+05:30', 'NHAI Road Control · Patrol 6', 'field', 'INC-0431', 'text', 'en-IN', 'Portable barriers and spill-control vehicle dispatched. ETA six minutes. Recovery cranes are standing by outside the hot zone.', NULL, NULL, 1, 11),
('INC-0431', '2026-07-21T14:37:40+05:30', 'AI Voice Relay Agent', 'ai', 'INC-0431', 'audio', 'en-IN', 'Dispatcher-approved voice brief queued to the unreachable zonal ACP. Source audio and field messages remain attached.', NULL, 'relay-en', 1, 12),
('INC-0431', '2026-07-21T14:38:14+05:30', 'State Control', 'command', 'INC-0431', 'text', 'en-IN', 'ICCC Camera G-24 and live diversion map added. Dispatch remains on the loop; field commanders continue direct cross-agency coordination.', NULL, NULL, 1, 13);

DELETE FROM incident_events WHERE incident_id = 'INC-0431';
INSERT INTO incident_events (incident_id, occurred_at, event_type, title, detail, source, verification_status, sequence_no) VALUES
('INC-0431', '2026-07-21T14:30:03+05:30', 'call', 'First emergency call received', 'Multiple callers report a collision and visible flames.', 'ERSS 112 call record', 'verified', 1),
('INC-0431', '2026-07-21T14:30:18+05:30', 'dispatch', 'Multi-agency dispatch completed', 'Police, Fire, 108, Traffic and NHAI assigned to one dynamic incident group.', 'CAD dispatch log', 'verified', 2),
('INC-0431', '2026-07-21T14:34:28+05:30', 'scene', 'First on scene report', 'Three vehicles involved, one car on fire and fuel leaking.', 'PRV-114 radio', 'verified', 3),
('INC-0431', '2026-07-21T14:35:01+05:30', 'hazard', 'Cargo status pending', 'Database shows general freight; driver confirmation is pending.', 'Vehicle lookup', 'unverified', 4),
('INC-0431', '2026-07-21T14:35:44+05:30', 'medical', 'Triage established', 'Two red-priority and three walking wounded at the north triage point.', 'AMB-2291', 'verified', 5),
('INC-0431', '2026-07-21T14:36:22+05:30', 'fire', 'Fire knockdown started', 'Fire operations active; medical approach restricted to the north.', 'FIRE-TN-3', 'verified', 6),
('INC-0431', '2026-07-21T14:38:14+05:30', 'command', 'ICCC picture linked', 'Camera G-24 and diversion map shared with all incident participants.', 'ICCC', 'verified', 7);

INSERT OR REPLACE INTO incident_tasks VALUES
('TASK-431-01', 'INC-0431', 'Maintain 50 m hot zone', 'police', 'complete', 'critical', NULL, 'PRV-114 perimeter confirmation'),
('TASK-431-02', 'INC-0431', 'Suppress vehicle fire', 'fire', 'in_progress', 'critical', '2026-07-21T14:42:00+05:30', 'FIRE-TN-3 pump telemetry'),
('TASK-431-03', 'INC-0431', 'Pre-alert two trauma beds', 'emri', 'in_progress', 'high', '2026-07-21T14:40:00+05:30', 'AMB-2291 triage report'),
('TASK-431-04', 'INC-0431', 'Verify lorry cargo declaration', 'erss', 'pending', 'high', '2026-07-21T14:41:00+05:30', 'Driver confirmation required'),
('TASK-431-05', 'INC-0431', 'Deploy spill-control barriers', 'nhai', 'in_progress', 'high', '2026-07-21T14:43:00+05:30', 'Patrol 6 ETA six minutes');

INSERT OR REPLACE INTO incident_resources VALUES
('RES-431-01', 'INC-0431', 'police', 'Police response vehicle', 'PRV-114', 'on_scene', 0, 'South cordon'),
('RES-431-02', 'INC-0431', 'fire', 'Fire tender', 'FIRE-TN-3', 'on_scene', 0, 'North attack position'),
('RES-431-03', 'INC-0431', 'emri', 'Advanced life support ambulance', 'AMB-2291', 'on_scene', 0, 'North triage point'),
('RES-431-04', 'INC-0431', 'emri', 'Basic life support ambulance', 'AMB-2318', 'en_route', 3, 'North approach'),
('RES-431-05', 'INC-0431', 'traffic', 'Traffic patrol', 'TRF-CEN-5', 'on_scene', 0, 'Previous junction'),
('RES-431-06', 'INC-0431', 'nhai', 'Spill-control vehicle', 'NHAI-P6', 'en_route', 6, 'North approach'),
('RES-431-07', 'INC-0431', 'nhai', 'Recovery crane', 'CRANE-12', 'staged', 0, 'Outside hot zone');

INSERT OR REPLACE INTO incident_evidence VALUES
('EVD-431-01', 'INC-0431', '2026-07-21T14:30:03+05:30', 'audio', 'Initial 112 caller recording', 'ERSS 112', '7-year incident record', 'hash_verified'),
('EVD-431-02', 'INC-0431', '2026-07-21T14:34:28+05:30', 'audio', 'PRV-114 first-on-scene radio', 'RoIP bridge', '7-year incident record', 'hash_verified'),
('EVD-431-03', 'INC-0431', '2026-07-21T14:38:14+05:30', 'image', 'Camera G-24 collision overview', 'ICCC', '7-year incident record', 'hash_verified'),
('EVD-431-04', 'INC-0431', '2026-07-21T14:38:20+05:30', 'map', 'Live diversion and emergency corridor map', 'ICCC', 'Operational snapshot', 'hash_verified');
