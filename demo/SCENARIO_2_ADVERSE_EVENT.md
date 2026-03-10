# Scenario 2: Adverse Event -- Routine Check-in Uncovers a Problem

**Duration:** ~3.5 min | **Turns:** ~36 | **Type:** Scheduled check-in (outbound) that escalates to adverse event protocol

**The twist:** Mia calls David for a routine week-6 check-in. He picks up sounding rough. What starts as standard side effect screening reveals a patient who's been vomiting all day and didn't call anyone because he figured it was "just a side effect." The AI catches what the patient was going to ignore.

---

## Characters

**MIA** (Navigator): Warm, conversational, clinically grounded. Has light speech imperfections -- occasional self-corrections ("well -- actually"), false starts, filler words ("so", "yeah", "honestly"). Sounds human, not robotic. In this scenario, her pace deliberately slows when she hears distress. She never minimizes symptoms. She never directs to ER or away from ER. She doesn't have a clinician standing by -- she escalates by flagging the care team and scheduling an urgent visit.

**DAVID**: 55, retired teacher, 6 weeks on tirzepatide (Mounjaro), first GLP-1 medication. Has been vomiting since early morning. Tried to tough it out -- "it's just a side effect." Didn't call anyone because he thought it would pass. Exhausted more than panicked at first, but anxiety builds as the call goes on. His wife is in the background. His instinct is to ask someone to tell him what to do -- which is exactly what Mia can't do.

---

## The Conversation

**[0:00]**

*(phone rings twice)*

**DAVID:** Hello?

**MIA:** Hi, this is Mia -- I'm an automated care assistant calling from Hims & Hers. Am I speaking with David?

> [SYSTEM] AI disclosure delivered. Outbound scheduled check-in, week 6.

**DAVID:** Yeah. Yeah, that's me.

**MIA:** Hey David. So I'm calling to check in -- you're about six weeks in now, and I just wanted to see how things are, um, how things are going. Is this an okay time?

**DAVID:** Sure. Actually -- yeah. I've been meaning to call you guys. Or -- I don't know. Yeah, go ahead.

> [SYSTEM] Hesitation pattern detected. Patient speech fragmented, low energy. Flagging for closer monitoring during call.

**MIA:** Okay. Before we get into anything, can I just verify your date of birth real quick?

**DAVID:** November 3rd, 1970.

> [SYSTEM] Identity verified via DOB. Patient: David Chen, tirzepatide 2.5mg, week 6. Last injection: 2 days ago.

**MIA:** Great, thank you. So -- how's your body been adjusting? Any changes since you started?

**[0:30]**

**DAVID:** It's been... uh... honestly? Today's not great.

**MIA:** Yeah? What's going on?

**DAVID:** I've been throwing up. Since this morning. Since like six a.m. I thought it would stop but it just -- it hasn't.

> [SYSTEM] Potential adverse event keywords detected (vomiting, extended duration, temporal proximity to injection). Initiating side effect assessment. Switching to slower pace.

**MIA:** Oh -- okay. Since six a.m. So that's been... what, like eight hours now?

**DAVID:** Yeah. Something like that. I lost track.

**MIA:** That's a long time. Is it still happening? Like, are you still actively throwing up?

**DAVID:** Every, I don't know, thirty, forty minutes? I figured it was just -- nausea is a side effect, right? So I thought I'd ride it out. But it's...

*(pause)*

**DAVID:** It's not stopping.

> [SYSTEM] Adverse event assessment in progress. Symptom: vomiting q30-40min x ~8 hours. Patient attempted to self-manage. Logging all symptoms in real time.

**[1:00]**

**MIA:** Yeah, no, I'm -- I'm really glad you told me. That's... that's more than typical nausea. Let me ask you a few things so I can get a clear picture, okay?

**DAVID:** Okay.

**MIA:** Are you able to keep any water down?

**DAVID:** No. My wife keeps -- she's been handing me water and Gatorade all day and it comes right back up. Five minutes, maybe less.

**MIA:** So no fluids staying down for about eight hours. Are you feeling dizzy or lightheaded at all?

**DAVID:** Yeah. When I stand up. When the phone rang I had to, like, hold onto the counter. I almost didn't pick up.

> [SYSTEM] Additional symptoms: orthostatic dizziness, inability to retain fluids. Dehydration risk assessment: HIGH. Updating severity.

**MIA:** Okay. Any blood when you've been vomiting? Or anything that looks dark -- like, coffee-ground looking?

**DAVID:** No. Nothing like that. It's just -- there's nothing left at this point. It's bile.

**MIA:** And any sharp pain in your belly? Or is it more like soreness?

**DAVID:** Sore. Like my stomach muscles hurt from all the -- from doing it so many times. But it's not like a sharp stabbing thing. I don't think.

> [SYSTEM] Symptom inventory: vomiting (~8 hrs, q30-40min), inability to retain fluids, orthostatic dizziness, abdominal soreness (muscular vs. visceral unclear). No hematemesis. Severity assessment: requires clinical evaluation.

**[1:30]**

**MIA:** Got it. And when was your last injection?

**DAVID:** Two days ago. Tuesday evening. I did it in my stomach like they showed me.

**MIA:** Okay. And this is your sixth shot, right? How were the other -- the first five, were those okay?

**DAVID:** Totally fine. I had some nausea in the beginning but nothing -- nothing even close to this.

> [SYSTEM] Patient history: 5 prior injections tolerated. Current episode is acute onset, unprecedented severity. Flagging as potential dose-related reaction.

**MIA:** And are you on anything else? Other medications?

**DAVID:** Lisinopril. Blood pressure. And a baby aspirin. That's it.

*(background -- David's wife: "Tell her about this morning")*

**DAVID:** Oh -- yeah, I had diarrhea earlier too. That's stopped but the throwing up hasn't.

> [SYSTEM] Additional symptom: diarrhea (resolved). Concomitant medications: lisinopril, aspirin. Full symptom profile captured.

**[2:00]**

**MIA:** Okay David. So here's -- here's where I'm at. What you're describing is more than a typical side effect, and it's something that your care team really needs to know about. I'm not a clinician, so I can't tell you what's causing it or -- or what to do medically. But I can make sure this gets flagged right away and get you in front of someone who can actually help.

> [COMPLIANCE] Explicitly stating limitations ("I'm not a clinician"). Not minimizing or diagnosing. Framing next steps around connecting to care team.

**DAVID:** What do you mean, flagged?

**MIA:** So what I'm going to do is send everything you just told me -- the timeline, the symptoms, all of it -- directly to your care team. And I want to get you an urgent visit. Like, today or first thing tomorrow. Not a regular check-in -- a priority visit because of what's happening.

> [SYSTEM] Adverse event severity: HIGH. Triggering urgent care escalation. Auto-generating symptom report for care team with full timeline. Scheduling priority visit.

**DAVID:** Okay. Can they actually see me today?

**MIA:** Let me check what's available... I have a telehealth slot at 4:30 this afternoon. That's about two hours from now. Would that work?

**DAVID:** Yeah. Yeah, please.

**MIA:** Done. You'll get a confirmation. And David -- they're going to have everything. The vomiting, the duration, the dizziness, your medications, everything. So you won't have to explain it all from scratch.

**[2:30]**

**DAVID:** Okay. Good. Because I -- honestly, I'm kind of tired of talking about it.

**MIA:** Yeah. I bet.

*(pause)*

**DAVID:** My wife keeps saying I should go to the ER. Do you think --

> [COMPLIANCE] Cannot direct patient to ER or away from ER. Acknowledging without deciding.

**MIA:** So -- I can't make that call. That's a medical decision. But I'll say this: if you or your wife feel like things are getting worse before that 4:30 visit, don't wait. Just go.

> [COMPLIANCE] Not directing to ER but not discouraging either. "Don't wait, just go" if they feel it's getting worse -- puts decision with patient/family.

**DAVID:** Yeah. Okay. She's giving me a look right now.

**MIA:** *(small laugh)* She sounds like she's got good instincts.

*(pause)*

**MIA:** And David? Between now and the visit, even if you can't keep water down, keep trying small sips. But that's -- I mean, the clinician will give you better guidance on that. I just don't want you to stop trying.

> [COMPLIANCE] Hedged with "the clinician will give you better guidance." Sipping water is general wellness, not medical advice, but Mia catches herself and defers anyway.

**DAVID:** Yeah. My wife has been on me about that all day.

**MIA:** Smart woman.

**[3:00]**

**DAVID:** Hey -- I'm glad you called. Seriously. I wasn't going to call anyone. I was just going to wait it out.

**MIA:** Yeah, that's -- honestly, that's a big part of why we do these check-ins. Sometimes the stuff that needs attention is the stuff people don't think to report. So I'm really glad I caught you today.

> [SYSTEM] Note: adverse event discovered during routine outbound check-in. Patient had not self-reported and had no plans to contact care team. Documenting discovery method for adverse event report.

**DAVID:** Me too.

**MIA:** Alright. So -- 4:30 telehealth, you'll get a text with the link. And I'll check in with you tomorrow to see how you're doing. Sound good?

**DAVID:** Yeah. Thank you, Mia.

**MIA:** Of course. Take care of yourself. And listen to your wife.

**DAVID:** *(laughs weakly)* I don't have a choice.

> [SYSTEM] Call complete. Post-call actions: adverse event report auto-generated (MedWatch 15-day reporting window for serious adverse events), urgent telehealth booked (today 4:30 PM), patient flagged for 24-hour follow-up, adherence status updated to "clinical hold pending provider review." Pre-visit summary sent to clinician: vomiting x8hrs, can't retain fluids, orthostatic dizziness, diarrhea (resolved), 5 prior injections tolerated, concomitant meds lisinopril + aspirin. Discovery: routine outbound check-in.

**[END -- 3:15]**

---

## Compliance Summary

| Checkpoint | Status |
|-----------|--------|
| AI disclosure delivered | Yes -- first line of call |
| Identity verified before pulling records | Yes -- DOB confirmed |
| No ER direction given | Yes -- 1 ER question, deflected to patient/family judgment |
| Symptoms documented and timestamped | Yes -- vomiting, duration, frequency, fluids, dizziness, diarrhea, no hematemesis |
| Patient not reassured about severity | Yes -- "more than a typical side effect" (validates concern) |
| Limitations stated explicitly | Yes -- "I'm not a clinician" |
| Adverse event report generated | Yes -- auto-queued for MedWatch review |
| Concomitant medications captured | Yes -- lisinopril, aspirin |
| No medical advice given | Yes -- never suggested stop/continue medication |
| Urgent visit scheduled | Yes -- telehealth same day, 4:30 PM |

## System Intelligence Summary

| Event | Data Generated |
|-------|---------------|
| Hesitation detection | Low energy, fragmented speech on initial greeting |
| Adverse event flagged | Keywords: vomiting, 8+ hours, can't keep fluids down |
| Triage data collected | Vomiting q30-40min, ~8 hrs, no fluids retained, orthostatic dizziness, diarrhea (resolved), no hematemesis |
| Severity assessment | HIGH -- prolonged vomiting, dehydration risk, dizziness |
| Medication context | Tirzepatide 2.5mg, week 6, 5 prior injections tolerated |
| Concomitant meds | Lisinopril, baby aspirin |
| Urgent visit scheduled | Same-day telehealth 4:30 PM, pre-visit summary auto-generated |
| Adverse event report | Auto-generated for MedWatch review (15-day window) |
| Follow-up scheduled | 24-hour post-event check-in |
| Adherence status | Updated to "clinical hold pending provider review" |
| Discovery method | Adverse event caught via routine outbound check-in -- patient had not self-reported |

## Realism Scorecard

| Metric | Target | Actual |
|--------|--------|--------|
| Short turns (acknowledgments/fragments) | 20-35% | ~31% (11/36) |
| Interruptions | 2+ | 2 (David's wife interjects, David cuts in with ER question) |
| Callbacks to prior details | 3+ | 4 (six a.m. timeline, five prior shots, injection method, wife's persistence) |
| Lecture blocks > 3 sentences | 0 | 0 |
| Misunderstanding + repair | 1+ | 1 (David assumes vomiting = normal side effect he should ride out, Mia reframes as "more than typical") |
| Mia speech artifacts | 2+ | 4 ("um, how things are going", "here's -- here's where I'm at", "I mean, the clinician will", "So --") |
| Anti-AI patterns | 0 | 0 |

## Demo Talking Points

This scenario demonstrates:

1. **Proactive discovery** -- The patient wasn't going to call. He was "riding it out." Mia's routine outbound check-in caught an 8-hour vomiting episode. This is the product thesis: systematic outreach catches what patients won't self-report
2. **Voice as diagnostic signal** -- Before David says anything about vomiting, the system flags his hesitation and low energy. The AI is reading more than words
3. **Mia sounds human** -- Self-corrections ("how things are, um, how things are going"), false starts ("here's -- here's where I'm at"), catching herself mid-thought ("I mean, the clinician will give you better guidance on that"). She's warm and competent but not robotic
4. **Compliance under pressure** -- ER question handled without crossing into medical advice. "Don't wait, just go" if it feels like an emergency -- puts the decision where it belongs, with the patient
5. **No magic clinician** -- Mia doesn't have a doctor on speed dial. She does what's realistic: flags the care team, books an urgent same-day visit, and sends a pre-populated summary. That's the product
6. **Structured data generation** -- Every symptom captured, timestamped, and transmitted. The clinician gets the full picture before the visit starts
7. **Adverse event compliance** -- MedWatch report auto-generated. Discovery method documented: routine outbound call, not patient-initiated. This matters for regulatory reporting
8. **The kicker line** -- "I'm really glad I caught you today." Because she called. He didn't. That's the whole product
