# Scenario 2 (Short): Adverse Event -- Routine Check-in Uncovers a Problem

**Duration:** ~45 sec | **Turns:** ~14 | **Type:** Scheduled check-in (outbound) that escalates to adverse event protocol

---

## Characters

**MIA** (Navigator): Warm, conversational, clinically grounded. Pace slows when she hears distress. Never minimizes symptoms. Never directs to or away from ER.

**DAVID**: 55, retired teacher, 6 weeks on tirzepatide (Mounjaro). Been vomiting since 6am, didn't call anyone because he figured it was "just a side effect."

---

## The Conversation

**[0:00]**

**MIA:** Hi, this is Mia -- an automated care assistant calling from Hims & Hers. Am I speaking with David?

> [SYSTEM] AI disclosure delivered. Outbound check-in, week 6.

**DAVID:** Yeah. That's me.

**MIA:** Hey David. Just a routine check-in. Can I verify your date of birth?

**DAVID:** November 3rd, 1970.

> [SYSTEM] Identity verified. Patient: tirzepatide 2.5mg, week 6. Last injection: 2 days ago.

**MIA:** Thanks. So -- how's your body been adjusting?

**DAVID:** Honestly? Not great. I've been throwing up since six a.m. Every thirty, forty minutes. Can't keep water down.

> [SYSTEM] Adverse event keywords detected. Vomiting ~8 hrs, inability to retain fluids. Initiating triage assessment.

**[0:15]**

**MIA:** Oh -- okay. That's a long time. Are you feeling dizzy at all?

**DAVID:** Yeah. When I stand up I have to hold onto the counter.

> [SYSTEM] Additional symptoms: orthostatic dizziness, dehydration risk HIGH. Severity: HIGH.

**MIA:** Okay David. What you're describing is more than a typical side effect. I'm not a clinician, so I can't tell you what's causing it -- but I can get this flagged to your care team right now and get you an urgent visit. I have a telehealth slot at 4:30 today.

> [COMPLIANCE] Explicitly stating limitations. Not minimizing or diagnosing. Connecting to care team.

**DAVID:** Yeah. Please.

**MIA:** Done. They'll have everything -- the timeline, the vomiting, the dizziness, your medications. And David -- if you or your wife feel like things are getting worse before 4:30, don't wait. Just go.

> [COMPLIANCE] Not directing to ER but not discouraging either. Decision with patient/family.

**DAVID:** Okay. I'm glad you called. I wasn't going to call anyone.

> [SYSTEM] Adverse event discovered during routine outbound check-in. Patient had not self-reported. Urgent telehealth booked, adverse event report auto-generated for MedWatch review.

**MIA:** That's exactly why we do these check-ins. Take care, David.

**[END -- 0:45]**

---

## Compliance Summary

| Checkpoint | Status |
|-----------|--------|
| AI disclosure delivered | Yes -- first line |
| Identity verified before pulling records | Yes -- DOB confirmed |
| No ER direction given | Yes -- "if you feel it's getting worse, don't wait" (patient's judgment) |
| Symptoms documented | Yes -- vomiting duration, frequency, fluids, dizziness |
| Patient not reassured about severity | Yes -- "more than a typical side effect" |
| Limitations stated explicitly | Yes -- "I'm not a clinician" |
| Adverse event report generated | Yes -- auto-queued for MedWatch |
| No medical advice given | Yes -- never suggested stop/continue medication |
| Urgent visit scheduled | Yes -- same-day telehealth |
