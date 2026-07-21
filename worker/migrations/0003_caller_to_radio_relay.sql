PRAGMA foreign_keys = ON;

UPDATE incident_messages
SET sequence_no = sequence_no + 4
WHERE incident_id = 'INC-0431' AND sequence_no >= 3;

INSERT INTO incident_messages
  (incident_id, sent_at, source_name, source_type, channel, message_type, language_code, body, translated_body, audio_sample_id, human_approved, sequence_no)
VALUES
  ('INC-0431', '2026-07-21T14:30:20+05:30', 'Assisted Call Intake · Tamil caller', 'ai', 'INC-0431', 'text', 'ta-IN',
   'கிண்டி மேம்பாலம் அருகே வாகனங்கள் மோதியுள்ளன. ஒரு காரில் தீ உள்ளது. தயவுசெய்து உடனடியாக உதவி அனுப்புங்கள்.',
   'Vehicles have collided near Guindy flyover. A car is on fire. Please send help immediately.', NULL, 0, 3),
  ('INC-0431', '2026-07-21T14:30:24+05:30', 'ERSS 112 · Dispatcher Vignesh', 'dispatcher', 'INC-0431', 'text', 'en-IN',
   'Caller location matched to GST Road at Guindy flyover. Fire and collision details verified against a second call. Tamil radio relay approved for South Zone DMR Channel 3.',
   NULL, NULL, 1, 4),
  ('INC-0431', '2026-07-21T14:30:31+05:30', 'Automated Radio Relay · South Zone DMR Ch-3', 'ai', 'INC-0431', 'audio', 'ta-IN',
   'ஒரு கார் தீப்பிடித்துள்ளது. ஆம்புலன்ஸ் மற்றும் தீயணைப்பு வாகனம் உடனடியாக தேவை.',
   'A car is on fire. An ambulance and fire tender are required immediately.', 'district-radio-ta', 1, 5),
  ('INC-0431', '2026-07-21T14:30:37+05:30', 'PRV-114 · DMR walkie-talkie', 'field', 'INC-0431', 'text', 'en-IN',
   'Relay received clearly on handheld radio. PRV-114 responding from Kathipara; ETA four minutes.',
   NULL, NULL, 1, 6);

INSERT INTO incident_events
  (incident_id, occurred_at, event_type, title, detail, source, verification_status, sequence_no)
SELECT
  'INC-0431', '2026-07-21T14:30:37+05:30', 'relay', 'Caller report relayed to field walkie-talkie',
  'Tamil caller report was location-matched, dispatcher-approved and delivered over South Zone DMR Channel 3. PRV-114 acknowledged receipt.',
  'ERSS call record + RoIP delivery receipt', 'verified', 8
WHERE NOT EXISTS (
  SELECT 1 FROM incident_events WHERE incident_id = 'INC-0431' AND title = 'Caller report relayed to field walkie-talkie'
);
