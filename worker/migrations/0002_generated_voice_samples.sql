PRAGMA foreign_keys = ON;

UPDATE incident_messages
SET source_name = 'Automated Action Tracker · Human supervised'
WHERE incident_id = 'INC-0431' AND source_name = 'AI Action Agent · Human supervised';

UPDATE incident_messages
SET source_name = 'Automated Voice Relay'
WHERE incident_id = 'INC-0431' AND source_name = 'AI Voice Relay Agent';

INSERT OR REPLACE INTO audio_samples
  (id, label, language_code, transcript, english_translation, tts_model, voice, duration_seconds)
VALUES
  ('fire-command-ta', 'Tamil fire-command clearance', 'ta-IN',
   'தீ கட்டுப்பாட்டில் உள்ளது. காரில் இருந்த அனைவரும் பாதுகாப்பாக வெளியேற்றப்பட்டுள்ளனர். 108 குழு வடக்குப் பக்கத்திலிருந்து அணுகலாம்.',
   'The fire is under control. Everyone in the car has been safely evacuated. The 108 team may approach from the north.',
   'gemini-3.1-flash-tts-preview', 'Puck', 10),
  ('dispatch-clearance-en', 'English ERSS road-clearance update', 'en-IN',
   'ERSS dispatch to all responding units. Fire reports knockdown achieved. Maintain the southbound closure until spill control clears the carriageway.',
   NULL, 'gemini-3.1-flash-tts-preview', 'Kore', 9);

INSERT INTO incident_messages
  (incident_id, sent_at, source_name, source_type, channel, message_type, language_code, body, translated_body, audio_sample_id, human_approved, sequence_no)
SELECT
  'INC-0431', '2026-07-21T14:39:34+05:30', 'FIRE-TN-3 · SFO Prabhu', 'field', 'INC-0431', 'audio', 'ta-IN',
  'தீ கட்டுப்பாட்டில் உள்ளது. காரில் இருந்த அனைவரும் பாதுகாப்பாக வெளியேற்றப்பட்டுள்ளனர். 108 குழு வடக்குப் பக்கத்திலிருந்து அணுகலாம்.',
  'The fire is under control. Everyone in the car has been safely evacuated. The 108 team may approach from the north.',
  'fire-command-ta', 1, 14
WHERE NOT EXISTS (SELECT 1 FROM incident_messages WHERE audio_sample_id = 'fire-command-ta');

INSERT INTO incident_messages
  (incident_id, sent_at, source_name, source_type, channel, message_type, language_code, body, translated_body, audio_sample_id, human_approved, sequence_no)
SELECT
  'INC-0431', '2026-07-21T14:40:06+05:30', 'ERSS 112 · Dispatcher Vignesh', 'dispatcher', 'INC-0431', 'audio', 'en-IN',
  'ERSS dispatch to all responding units. Fire reports knockdown achieved. Maintain the southbound closure until spill control clears the carriageway.',
  NULL, 'dispatch-clearance-en', 1, 15
WHERE NOT EXISTS (SELECT 1 FROM incident_messages WHERE audio_sample_id = 'dispatch-clearance-en');
