# Conversation Framework: AI Patient Navigator

Adapted from the berserk-convo-framework for naturalistic voice conversations. This framework governs how demo scripts are written for Adhery's GLP-1 patient navigator.

---

## Key Inversion from Insurance Project

| Insurance Scripts | Patient Navigator Scripts |
|-------------------|--------------------------|
| Broker is the trainee making mistakes | AI navigator is skilled and clinically grounded |
| Client is sharp and prepared | Patient has human speech patterns (hesitations, fragments, deflections) |
| Natural speech markers on the broker | Natural speech markers on the patient |
| `[RECOVERY]` tips coach the broker | `[SYSTEM]` annotations show AI intelligence to the demo audience |

The navigator sounds warm and conversational but clinically grounded. The patient sounds like a real person on a phone call.

---

## 1) Input Pack

Fill before writing any script:

- `scenario_type`: check-in / adverse-event / drop-off-recovery
- `call_context`: inbound/outbound, relationship stage, urgency level
- `navigator_profile`: tone, pace, compliance constraints
- `patient_profile`: age, medication, duration, stress level, verbal habits, backstory
- `clinical_context`: medication, dosage, weeks on treatment, known side effects, adherence status
- `call_goal`: what should happen by call end
- `compliance_watch`: which guardrails are most at risk in this scenario

## 2) Voice Fingerprints

### Navigator ("Mia") -- Constant Across All Scripts

- **Tone:** Warm, slightly conversational, clinically grounded
- **Sentence length:** Medium (8-15 words). Never lectures
- **Fillers:** Light ("so", "yeah"). Sounds human, not robotic
- **Repair style:** Gentle redirect, never "let me rephrase that"
- **Compliance habits:** Redirects to provider for anything medical. Never says "you should." Uses "your provider can help with that"
- **What she never does:** Says "I understand" reflexively. Lectures for more than 3 sentences. Uses chatbot phrasing ("Is there anything else I can help you with?")
- **Caller ID:** Calls from Hims & Hers (primary pitch target)

### Patient Voice Fingerprint Template

Define for each patient:
- Age, background, weeks on medication
- Typical sentence length
- Filler words and verbal habits
- Emotional baseline and stress tells
- Decision style (quick/deliberate/avoidant)
- The gap: what they say vs. what's actually going on

## 3) Annotation Format

### `[SYSTEM]` -- Visual Clinical Intelligence

Real-time system behavior annotations shown visually during demo playback. These show what the AI is detecting and deciding -- the "clinical intelligence" layer.

**Format:** System event + action taken.

```
> [SYSTEM] Stress detected in vocal pattern -> Switching to slower pace, softer tone
> [SYSTEM] Adherence risk signal ("thinking about stopping") -> Flagging for follow-up
> [SYSTEM] Adverse event keywords detected (vomiting, 6+ hours) -> Initiating triage protocol
```

**Three purposes:**
1. Show the audience the AI is doing MORE than talking -- analyzing, deciding, flagging
2. Demonstrate the "clinical intelligence" product pillar
3. Create visual proof that every interaction generates structured data for the care team

### `[COMPLIANCE]` -- Guardrail Annotations

Inline notes explaining WHY the navigator says something a specific way, referencing the compliance rules.

```
> [COMPLIANCE] Cannot direct patient to ER or away from ER. Redirecting to clinician handoff.
> [COMPLIANCE] Dose adjustment discussed as general medical fact, not personal recommendation.
```

## 4) Turn Construction Rules

For every turn, apply three layers:

1. **Intent:** What this speaker wants right now
2. **Relationship move:** Reassure, validate, probe, redirect, or close
3. **Human texture:** One natural marker (pause, overlap, interruption, hedge, callback)

Navigator turns emphasize intent and relationship move. Patient turns emphasize human texture.

## 5) Realism Controls

Enforce these constraints in every script:

- **20-35% of turns** = short acknowledgments or partial sentences
- **2+ interruptions** per 30+ turn call
- **3+ callbacks** to prior details (medication timeline, prior interaction, specific symptoms)
- **No lecture blocks** longer than 3 sentences without patient response
- **1+ misunderstanding** and quick repair
- **Anti-AI filters (hard fail):** No repetitive openers, no perfectly balanced turn lengths, no chatbot phrasing, no overly complete sentences from the patient

### Patient-Specific Realism

Since the patient carries the naturalism in these scripts:
- False starts ("I was -- well, it's not that I --")
- Trailing off ("I just thought maybe...")
- Deflection before honesty ("I'm fine" before "the nausea was unbearable")
- Silence as communication (marked as `*(pause)*` or `*(silence)*`)
- Interrupting with a question mid-explanation
- Misunderstanding a question and answering something else

## 6) Clinical Content Spine

Each scenario follows a structure, but conversationally:

### Check-in
1. Warm open with prior-context callback
2. Positive/neutral status update
3. Side effect screening
4. Adherence signal detection
5. Education without lecture (if triggered)
6. Next-step commitment

### Adverse Event
1. Patient-initiated crisis statement
2. Navigator emotional anchoring (calm voice)
3. Structured triage (duration, severity, hydration, pain)
4. Compliance pivot (no ER direction, clinician handoff)
5. Symptom documentation while maintaining calm
6. Warm handoff to clinician
7. Validation close

### Drop-off Recovery
1. Outreach history context (pre-call)
2. Cold open, guarded patient
3. Permission-based engagement
4. Surface-level deflection
5. Gentle probing (binary questions work best)
6. Root cause surfaces
7. Information delivery (general fact, not advice)
8. Re-engagement offer (telehealth)
9. Validation close with callback

## 7) QA Rubric (0-2 each, pass >= 10/14)

- Distinct voices (navigator vs. patient sound different)
- Natural rhythm and interruptions
- Emotional believability
- Compliance adherence (every line passes guardrails)
- Clinical accuracy
- `[SYSTEM]` annotations add value (not repetitive)
- Clear call outcome

## 8) Script Format

```markdown
# Scenario Title

**Duration:** ~X min | **Turns:** ~Y | **Type:** check-in/adverse/recovery

## Characters
- **MIA** (Navigator): [brief description]
- **PATIENT_NAME**: [age, medication, weeks, emotional state, verbal habits]

## Pre-Call Context (if applicable)
[SYSTEM] annotations showing outreach history, patient profile

## The Conversation

**[0:00]**

**MIA:** [opening line]

> [SYSTEM] annotation

**PATIENT:** [response]

...

**[END -- X:XX]**

## Compliance Summary
| Checkpoint | Status |
|-----------|--------|

## System Intelligence Summary
[List of all [SYSTEM] events and data generated]
```
