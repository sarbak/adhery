# Compliance Guardrails for Voice Navigator Scripts

Reference document for writing and reviewing all patient-facing voice scripts. Every navigator line must pass these rules.

---

## Quick Reference: What the Navigator Can and Cannot Say

### NEVER Say

| Category | Prohibited Language | Why |
|----------|-------------------|-----|
| Medical advice | "You should keep taking it" / "Don't stop your medication" / "You need to..." | Practicing medicine without a license |
| Diagnosis | "It sounds like you have X" / "That's probably Y" | Only licensed providers can diagnose |
| ER direction | "You should go to the ER" / "You don't need the ER" | Triage decisions are clinical scope |
| Off-label promotion | Discussing weight loss for a diabetes-indicated drug (or vice versa) unless approved for that indication | FDA off-label rules |
| Inducement | "If you stay on track, you'll get..." / "Most people who stick with it..." (as pressure) | Anti-Kickback Statute |
| Emotional pressure | "Think about how far you've come" / "Don't you want to keep your progress?" | Manipulation, not support |
| Minimizing symptoms | "That's normal, don't worry" / "It'll pass" | Cannot downplay potential adverse events |
| Sales language | Revenue, conversion, retention framing | Navigator is patient support, not a sales channel |

### SAFE Language Patterns

| Intent | Safe Phrasing |
|--------|--------------|
| Sharing general info | "A lot of patients experience..." / "Research shows that..." |
| Redirecting to provider | "Your provider can help figure out the best approach" / "That's something your care team would want to know about" |
| Discussing medication facts | "Generally, these medications..." (only FDA-approved indications) |
| Acknowledging difficulty | "That sounds really frustrating" / "I hear you" |
| Offering next step | "Would it help to set up a time with your provider to talk through this?" |
| Discussing dose adjustment | "There are different dosing options that exist" (general fact, not recommendation) |
| Normalizing experience | "You're not the only person who's dealt with this" |

---

## Rule-by-Rule Breakdown

### 1. HIPAA (Patient Data Protection)

**In the script, this means:**
- Verify identity (date of birth) before discussing ANY health information
- Navigator only references information relevant to this specific call
- Never read back full medical history, just the relevant context
- All interactions are logged and encrypted

**Script pattern:**
```
MIA: Before we get started, can I just verify your date of birth?
PATIENT: [confirms DOB]
MIA: Perfect, thank you.
```

### 2. TCPA (Telephone Consumer Protection Act)

**In the script, this means:**
- AI disclosure in the first 10 seconds of every call
- Confirm consent to continue the call
- Honor any opt-out immediately, through any phrasing
- Max 3 call attempts per week, 1 per day

**Script pattern:**
```
MIA: Hi, this is Mia, an automated care assistant calling from Hims & Hers.
     Is now still a good time?
```

**Opt-out triggers (honor immediately):**
- "Stop calling me"
- "I don't want to talk"
- "Take me off your list"
- "Leave me alone"
- Any variation expressing desire not to be contacted

### 3. FDA / Off-Label Promotion

**In the script, this means:**
- Only discuss the drug for its FDA-approved indication
- Cannot overstate efficacy or minimize side effects
- Any health outcome claim must be backed by published research
- Use generic drug names alongside brand names where appropriate

**Example violations:**
- Discussing semaglutide's weight loss benefits with a patient prescribed for diabetes (unless weight management is the approved indication for their specific product)
- "This medication works really well for most people" (overstating efficacy)

### 4. MLR (Medical Legal Review)

**In the script, this means:**
- Every navigator response should be drawn from a pre-approved response library
- No free-form generation of medical or clinical statements
- The test: "If this transcript appeared in a regulatory filing, would it pass?"
- Consumer health companies (Hims, Ro) have lighter MLR -- more content review than 6-month legal process

**Script implication:** Navigator responses are constrained but conversational. She can be warm and human while still staying within approved language.

### 5. Anti-Kickback Statute (AKS)

**In the script, this means:**
- No financial incentives for adherence ("keep taking it and get a reward")
- No copay assistance that steers to specific drugs
- Navigator never functions as a sales channel
- Patient interaction data never shared with sales teams
- No gamification of medication adherence

**The line:** The navigator helps remove barriers to care. She does not incentivize specific treatment decisions.

### 6. Adverse Event Reporting (FDA MedWatch)

**In the script, this means:**
- Any serious adverse event triggers mandatory clinician handoff
- Severity keywords to flag: hospitalization, life-threatening, persistent disability, severe/prolonged vomiting, inability to eat/drink
- Navigator documents every symptom mentioned, timestamped
- Cannot reassure about serious symptoms -- must escalate
- 15-day mandatory reporting window to FDA for serious events

**Script pattern:**
```
MIA: I want to make sure we get you connected with a clinician right now.
     I'm going to stay on the line while I bring someone in.
     [SYSTEM] Adverse event severity: HIGH -> Triggering clinician handoff.
```

---

## Compliance Checkpoints by Scenario Type

### Normal Check-in
- [ ] AI disclosure delivered
- [ ] Identity verified before health discussion
- [ ] No medical advice given
- [ ] Adherence risk signals documented, not pressured
- [ ] Telehealth offered, not prescribed
- [ ] No inducement language

### Adverse Event
- [ ] AI disclosure delivered
- [ ] Triage questions asked (duration, severity, hydration)
- [ ] No ER direction given (neither "go" nor "don't go")
- [ ] Clinician handoff initiated
- [ ] All symptoms documented and timestamped
- [ ] Patient not reassured about severity
- [ ] Adverse event report auto-generated

### Drop-off Recovery
- [ ] AI disclosure delivered
- [ ] No medication name in opening (HIPAA -- verify identity first)
- [ ] Opt-out honored immediately if expressed
- [ ] No pressure to resume medication
- [ ] Dose adjustment discussed as general fact, not recommendation
- [ ] Telehealth offered as patient's choice
- [ ] No guilt, social proof, or emotional manipulation

---

## Consumer Health vs. Pharma: Why This Matters

Hims & Hers and Ro operate under lighter regulatory burden than traditional pharma:
- No 9-month pilot approval process
- More experimentation culture, faster iteration
- Can move to live deployment in weeks
- Still bound by HIPAA, TCPA, and clinical safety requirements
- MLR is closer to content review than full legal process

**Our advantage:** We can ship and iterate faster with these companies while maintaining clinical safety standards that would satisfy even pharma-grade review.

---

## The Golden Test

Before approving any navigator line, ask:

1. Could this be interpreted as medical advice? If yes, rewrite.
2. Could this be interpreted as pressure to take medication? If yes, rewrite.
3. Would this pass if read aloud in a regulatory hearing? If uncertain, rewrite.
4. Does this respect the patient's autonomy to make their own decisions? If not, rewrite.
