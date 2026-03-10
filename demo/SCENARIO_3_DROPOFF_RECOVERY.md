# Scenario 3: Drop-off Recovery -- Recovering a Churned Patient

**Duration:** ~5 min | **Turns:** ~46 | **Type:** Outbound recovery call (attempt #5)

**This is the money shot.** The gap between "I got busy" and "the nausea was so bad I couldn't function" is the entire demo.

---

## Characters

**MIA** (Navigator): Warm, conversational, clinically grounded. Has light speech imperfections -- occasional self-corrections, false starts, filler words ("so", "yeah", "honestly"). Sounds human, not robotic. In this scenario, patience is everything. She doesn't push. She doesn't guilt. She asks permission before probing. She sits with silence. She earns the truth through non-pressure. When Marcus finally opens up, she meets him with zero judgment and exactly the right piece of information.

**MARCUS**: 38, software engineer, stopped semaglutide (Wegovy) 6 weeks ago after 12 weeks on treatment. Guarded. Monosyllabic at first. Walls come down slowly. His pattern: deflects with "I'm fine" / "I just got busy," then opens up to the real reason -- severe nausea that made him unable to function at work. He stopped on his own because he didn't know dose adjustment was an option. Nobody told him. This is the clinical failure the product is designed to catch.

---

## Pre-Call Context

> [SYSTEM] Patient: Marcus Williams, 38. Semaglutide 1.0mg. Started week 1 at 0.25mg, titrated to 1.0mg at week 8.
> Last refill: 6 weeks ago (not picked up). No provider visit in 8 weeks.
> Outreach history:
> - Day 7: SMS ("Hi Marcus, checking in from Hims & Hers...") -- no reply
> - Day 14: SMS ("Just wanted to make sure everything's okay...") -- no reply
> - Day 21: Call -- voicemail left
> - Day 30: Call -- voicemail left
> - Day 42: Call -- attempt #5. Persistence protocol active.
> Adherence status: LAPSED. Risk tier: HIGH.

---

## The Conversation

**[0:00]**

*(phone rings three times)*

**MARCUS:** Hello?

**MIA:** Hi, this is Mia, an automated care assistant calling from Hims & Hers. Am I speaking with Marcus?

> [SYSTEM] AI disclosure delivered. Confirming identity before proceeding.

**MARCUS:** ...Yeah. That's me.

**MIA:** Hey Marcus. I just wanted to check in -- we haven't heard from you in a bit. Is now an okay time to talk for a few minutes?

**MARCUS:** Uh... I guess. What's this about?

**MIA:** So before I get into anything, can I just verify your date of birth?

**MARCUS:** Why do you need my date of birth?

**MIA:** It's just to confirm your identity before we discuss anything related to your care. Standard thing.

**MARCUS:** Fine. September 12th, 1987.

> [SYSTEM] Identity verified via DOB. Proceeding with care-related discussion.

**[0:30]**

**MIA:** Thanks, Marcus. So I've been trying to reach you -- left a couple voicemails. Just wanted to see how things are going.

**MARCUS:** Yeah, I saw those. Sorry I didn't call back. Things have been crazy.

> [SYSTEM] Evasive response pattern detected ("things have been crazy"). Non-specific deflection. Maintaining non-pressured tone, queuing gentle probing.

**MIA:** No need to apologize. Life gets hectic. So -- are you still taking the medication?

*(pause)*

**MARCUS:** No.

**MIA:** Okay.

*(silence -- three seconds)*

> [SYSTEM] Self-discontinuation confirmed. Updating adherence status: lapsed. Patient provided minimal detail. Proceeding with permission-based probing.

**MARCUS:** I stopped a while ago.

**MIA:** Got it. Can I ask what -- like, what happened? Totally fine if you don't want to get into it.

**[1:00]**

**MARCUS:** It just wasn't working for me.

> [SYSTEM] Vague reason: "wasn't working." Common deflection pattern. Multiple possible root causes: efficacy, side effects, cost, lifestyle. Probing deeper.

**MIA:** Wasn't working how?

*(pause)*

**MARCUS:** I don't know. It just -- look, I appreciate the call, but I'm fine. I just decided it wasn't for me.

**MIA:** Yeah, totally your call. I'm not trying to talk you into anything. I just -- sometimes when patients stop, there's something specific that happened, and it helps us understand.

> [SYSTEM] Conversation intelligence: patient has deflected twice ("wasn't working for me", "wasn't for me"). Applying non-pressured binary question technique to narrow root cause without triggering defensiveness.

*(pause)*

**MARCUS:** Mm.

**MIA:** Was it more about the results? Or was it how you were feeling on it?

**MARCUS:** *(sighs)* ...It was how I was feeling.

> [SYSTEM] Root cause narrowing: side effects, not efficacy. Adjusting follow-up questions to side effect exploration.

**[1:30]**

**MIA:** Yeah. Can you tell me a little more? Like, what was -- what was going on?

*(long pause)*

**MARCUS:** The nausea was... bad. Like, really bad.

**MIA:** How bad are we talking?

**MARCUS:** Like, I couldn't -- I work from home, right? And there were days where I was on a Zoom call and I had to mute myself and just... I couldn't function. I'd eat something and within twenty minutes I'd be in the bathroom. And it wasn't getting better. It was getting worse.

> [SYSTEM] Root cause surfaced: severe nausea with functional impairment.
> Conversation intelligence analysis:
> - Patient required 4 probing attempts before disclosing real reason
> - Deflection pattern: "got busy" -> "wasn't working" -> "wasn't for me" -> "the nausea was bad"
> - Emotional state shift: guarded -> resigned -> vulnerable
> - Cross-referencing dose history: patient was on 1.0mg at discontinuation, titrated from 0.25mg
> - Logging as side-effect-driven discontinuation

**MIA:** That sounds awful. Seriously.

**MARCUS:** Yeah. And I -- sorry, this is probably more than you wanted to hear.

**MIA:** No. This is exactly what I wanted to hear. Go on.

**[2:00]**

**MARCUS:** I just... I felt like I had to choose between losing the weight and being able to do my job. And I need my job. So.

**MIA:** Yeah. That's not really a choice.

**MARCUS:** Right. And I kept thinking it would get better, because everything I read online said the nausea goes away after a few weeks. But it didn't. It got worse when they upped the dose.

> [SYSTEM] Timeline correlation: nausea worsened after dose increase to 1.0mg. Common titration-related side effect. Patient unaware of dose adjustment options.

**MIA:** When did it get worse -- was that around when they moved you up to the, uh, the higher dose?

> [SYSTEM] Conversation intelligence: correlating patient timeline with dose history. Testing hypothesis: nausea onset aligns with titration from 0.25mg to 1.0mg at week 8.

**MARCUS:** Yeah. Exactly. The first couple months were fine. Like, I had some nausea but it was manageable. And then they bumped it up and it was like -- a different medication.

**MIA:** And you just stopped on your own?

**MARCUS:** Yeah. I didn't -- I didn't know what else to do. I called the office but they were booked out like three weeks and I couldn't wait three weeks feeling like that. So I just stopped.

> [SYSTEM] Patient self-discontinued without clinical guidance. Unable to reach provider. Information gap: unaware of dose adjustment options. Care access barrier: 3-week wait for appointment. Flagging for care team review.

**MIA:** You tried to call your provider?

**MARCUS:** Yeah. They said earliest was three weeks. And I was throwing up every day. I wasn't gonna wait three weeks.

**MIA:** No, I hear you. That's -- yeah.

**[2:30]**

*(pause)*

**MIA:** Can I share something with you? Just a -- just a piece of information.

**MARCUS:** Sure.

**MIA:** So, generally speaking, when patients have side effects that get worse after a dose increase, one option that exists is going back down to the previous dose. Like, the dose that was working. It's a pretty common adjustment.

> [COMPLIANCE] Dose adjustment discussed as general medical fact ("one option that exists"), not personal recommendation. Not saying "you should go back down." Framing as general information about available approaches.

**MARCUS:** Wait -- you can do that?

**MIA:** Yeah. Dose adjustment is a standard part of how these medications are managed. Going up isn't the only direction. Some patients do well staying at a lower dose longer, or even stepping back down if the increase causes problems.

> [SYSTEM] Information gap confirmed. Patient did not know dose reduction was an option. Dose titration education delivered as general fact.

**MARCUS:** Nobody told me that. I thought -- I thought you just had to keep going up. Like that was the protocol or whatever.

**MIA:** It's actually really individual. But that's the kind of thing your provider would walk through with you -- what dose makes sense, whether to adjust, all of that.

**MARCUS:** Huh.

*(pause)*

**MARCUS:** So I basically stopped for no reason.

**MIA:** I wouldn't say that. You stopped because you were miserable and you couldn't reach anyone to help. That's not "no reason."

> [SYSTEM] Conversation intelligence: patient expressing regret ("stopped for no reason"). Reframing to reduce self-blame -- validates his decision while keeping door open. Emotional state: walls fully down, receptive to next steps.

**[3:00]**

**MARCUS:** Yeah, but if I'd known I could just go back to the lower dose, I probably would've --

**MIA:** Yeah.

*(silence)*

**MARCUS:** Man.

**MIA:** Look, the good news is -- and this is honestly the important part -- this isn't a closed door. If you're interested, you could set up a visit with your provider to talk through options. Whether it's restarting at a different dose or trying something else entirely -- that's between you and your care team.

> [COMPLIANCE] Presenting multiple options (restart at different dose, try something else, implied: don't restart). Not pressuring to resume medication. Decision is patient's.

**MARCUS:** Would I have to go through the whole ramp-up again?

**MIA:** That's a great question for your provider. They'd know what makes sense based on your history. I don't want to guess on that.

> [COMPLIANCE] Clinical question redirected to provider. Not speculating on restart protocol.

**[3:30]**

**MARCUS:** Okay. Yeah. I think -- yeah, I think I should probably talk to someone.

> [SYSTEM] Patient re-engagement successful. Transitioning to scheduling.

**MIA:** Want me to set something up? We can do a telehealth visit -- usually faster than trying to get in with the office.

**MARCUS:** How fast?

**MIA:** Usually within a few days. Let me check... I have Wednesday at 3:15 or Thursday at noon.

**MARCUS:** Wednesday at 3:15. Let's do it.

> [SYSTEM] Telehealth booked: Wednesday 3:15 PM. Pre-populating clinician summary: self-discontinued semaglutide 1.0mg after 12 weeks due to severe nausea post-dose increase, unable to reach provider (3-week wait), unaware of dose adjustment options, 6 weeks off medication, open to re-engaging. Care access barrier flagged.

**MIA:** Done. You'll get a text confirmation and a reminder the day before. And the clinician will already have the -- so basically everything we talked about today, what you were on, what happened -- they'll have all of it. So you won't have to explain it from scratch.

> [SYSTEM] Pre-visit clinician summary auto-generated:
> - Semaglutide, started 0.25mg, titrated to 1.0mg at week 8
> - Self-discontinued at week 12 (6 weeks ago)
> - Root cause: severe nausea post-dose increase, functional impairment
> - Care access barrier: 3-week provider wait during crisis
> - Information gap: unaware of dose reduction/titration options
> - Patient emotional state: open, engaged, no longer guarded
> - Conversation intelligence: required 5 outreach attempts, 4 probing rounds to surface root cause
> - Patient request: discuss restart options, interested in lower dose

**MARCUS:** Good. Because I really don't want to.

**MIA:** I know.

**[4:00]**

*(pause)*

**MARCUS:** Hey, can I ask you something?

**MIA:** Yeah, of course.

**MARCUS:** Is this what you do? Like, call people who stopped?

**MIA:** Yeah. Part of what I do is check in with patients, especially when there's a gap. Sometimes it's nothing -- people just get busy. And sometimes there's a story like yours, where something went wrong and nobody caught it.

**MARCUS:** Yeah. Well... thanks for not giving up. I almost didn't pick up.

**MIA:** I'm glad you did. Talk to you soon, Marcus.

> [SYSTEM] Call complete. Patient status updated: lapsed -> re-engaging. Outreach outcome: successful re-engagement on attempt #5 (day 42). Root cause: side-effect-driven discontinuation, compounded by care access barrier. 30-day adherence tracking restarted. Outreach cadence adjusted to weekly check-ins post-telehealth.

**MARCUS:** Later.

**[END -- 4:15]**

---

## Compliance Summary

| Checkpoint | Status |
|-----------|--------|
| AI disclosure delivered | Yes -- first line of call |
| Identity verified before care discussion | Yes -- DOB confirmed (with pushback, handled smoothly) |
| No pressure to resume medication | Yes -- "totally your call" / "whether it's restarting or something else" |
| Dose adjustment as general fact, not recommendation | Yes -- "one option that exists" / "generally speaking" |
| Clinical questions redirected to provider | Yes -- restart protocol question redirected |
| Opt-out respected | N/A -- patient consented to continue |
| No guilt or social proof | Yes -- no "other patients kept going" pressure |
| No inducement | Yes |
| No off-label discussion | Yes |
| Medication name not mentioned before identity verification | Yes -- Mia says "medication" generically until DOB confirmed |

## System Intelligence Summary

| Event | Data Generated |
|-------|---------------|
| Outreach history | 5 attempts over 42 days documented |
| Self-discontinuation confirmed | Week 12, 6 weeks ago |
| Deflection pattern detected | "I'm fine" / "just got busy" / "wasn't working for me" |
| Root cause surfaced | Severe nausea post-dose increase (0.25 -> 1.0mg) |
| Functional impairment documented | Unable to work, vomiting after meals |
| Information gap identified | Patient unaware of dose reduction option |
| Care access barrier | Provider office booked 3 weeks out at time of crisis |
| Dose titration education delivered | General information, not recommendation |
| Patient re-engaged | Telehealth scheduled Wednesday 3:15 PM |
| Clinician pre-visit summary | Auto-generated with full context |
| Adherence status change | Lapsed -> re-engaging |
| Outreach cadence update | Weekly check-ins post-telehealth |

## Realism Scorecard

| Metric | Target | Actual |
|--------|--------|--------|
| Short turns (acknowledgments/fragments) | 20-35% | ~33% (15/46) |
| Interruptions | 2+ | 2 (Marcus's "look, I appreciate the call" cuts off the thread; Marcus interrupts with "nobody told me that") |
| Callbacks to prior details | 3+ | 5 (voicemails, dose increase timeline, calling the office, the lower dose, "almost didn't pick up") |
| Lecture blocks > 3 sentences | 0 | 0 |
| Misunderstanding + repair | 1+ | 1 (Marcus thinks stopping = permanent decision, Mia reframes as "not a closed door") |
| Mia speech artifacts | 2+ | 5 ("what -- like, what happened", "what was -- what was going on", "the, uh, the higher dose", "just a -- just a piece of information", "so basically everything") |
| Anti-AI patterns | 0 | 0 |

## Demo Talking Points

This scenario demonstrates:

1. **Persistence pays off** -- Five attempts over 42 days. Most programs give up after 2. The visual timeline of failed outreach makes the successful call land harder
2. **Permission-based engagement** -- Mia never pushes. She asks permission to probe, accepts deflection without arguing, and waits for Marcus to open up on his own terms
3. **The reveal** -- The gap between "I'm fine" (0:30) and "I couldn't function at work" (1:30) is the entire product thesis. The AI earned the truth by not pressuring
4. **Information as intervention** -- Marcus didn't need motivation. He needed one fact: dose adjustment exists. The right information at the right moment changes the outcome
5. **Care access failure caught** -- The system identifies that Marcus couldn't reach his provider for 3 weeks during a crisis. This is a care delivery gap, not a patient compliance gap
6. **Revenue recovered without selling** -- Marcus was churned. This call brings him back. But at no point does Mia say "you should restart." The re-engagement happens because the patient decides, with full information, that he wants to talk to his provider
7. **Structured data for the care team** -- The clinician gets a pre-populated summary: why he stopped, what he didn't know, what his experience was. No 15-minute intake conversation needed
