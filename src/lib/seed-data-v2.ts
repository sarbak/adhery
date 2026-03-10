// Mock data for dashboard-2-2: drill-down dashboard

export interface PatientV2 {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: 'Male' | 'Female';
  state: string;
  medication: string;
  currentDose: string;
  doseStartDate: string;
  enrollmentDate: string;
  daysEnrolled: number;
  status: 'adherent' | 'risk' | 'dropped';
  adherenceRate: number;
  riskScore: number | null; // null if dropped
  riskBreakdown: {
    sideEffectScore: number; // 0-100, higher = worse
    sentimentScore: number; // 0-100, higher = worse
    socioeconomicScore: number; // 0-100, higher = worse
  } | null;
  adverseEvents: AdverseEvent[];
  lastInteraction: string;
  interactions: InteractionV2[];
}

export interface AdverseEvent {
  date: string;
  event: string;
  severity: 'mild' | 'moderate' | 'severe';
  resolved: boolean;
}

export interface InteractionV2 {
  id: string;
  date: string;
  channel: 'voice' | 'sms' | 'mail';
  summary: string;
  sentiment: number;
  duration?: string;
  hasTranscript: boolean;
  audioUrl?: string; // mock URL for playback widget
  flag?: string; // adherence flag
  transcript?: TranscriptMessage[];
}

export interface TranscriptMessage {
  speaker: 'mia' | 'patient' | 'system';
  text: string;
  timestamp: string;
  crucial?: boolean; // underlined in UI
}

// --- KPI data ---

export const kpiData = {
  totalPatients: 2047,
  adherence30d: { value: 87.3, delta: +4.2 },
  adherence90d: { value: 82.1, delta: +2.8 },
  adherent: { value: 1891, delta: +89 },
  flagged: { value: 128, delta: -12 },
  droppedOff: { value: 28, delta: +3 },
  escalations: { value: 34, delta: -8 },
  conversations: { value: 4218, delta: +612 },
};

// --- Builders ---

const US_STATES = ['CA', 'TX', 'NY', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI', 'NJ', 'VA', 'WA', 'AZ', 'MA', 'TN', 'IN', 'MO', 'MD', 'WI', 'CO', 'MN', 'SC', 'AL'];

const MEDICATIONS = [
  { name: 'Ozempic', doses: ['0.25mg', '0.5mg', '1mg', '2mg'] },
  { name: 'Wegovy', doses: ['0.25mg', '0.5mg', '1mg', '1.7mg', '2.4mg'] },
  { name: 'Mounjaro', doses: ['2.5mg', '5mg', '7.5mg', '10mg', '12.5mg', '15mg'] },
];

const ADVERSE_EVENTS_POOL = [
  { event: 'Nausea', severity: 'mild' as const },
  { event: 'Vomiting', severity: 'moderate' as const },
  { event: 'Diarrhea', severity: 'mild' as const },
  { event: 'Constipation', severity: 'mild' as const },
  { event: 'Injection site reaction', severity: 'mild' as const },
  { event: 'Headache', severity: 'mild' as const },
  { event: 'Fatigue', severity: 'mild' as const },
  { event: 'Abdominal pain', severity: 'moderate' as const },
  { event: 'Dizziness', severity: 'mild' as const },
  { event: 'Pancreatitis symptoms', severity: 'severe' as const },
  { event: 'Gallbladder issues', severity: 'severe' as const },
  { event: 'Hypoglycemia', severity: 'moderate' as const },
];

const INTERACTION_FLAGS = [
  'Skipped refill',
  'Missed 2+ consecutive doses',
  'Expressed intent to discontinue',
  'Dose reduction requested',
  'Side effect escalation',
  'No response to 3+ outreach attempts',
];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function generateTranscripts(patientName: string, patientStatus: string, flag?: string): TranscriptMessage[] {
  if (flag === 'Skipped refill') {
    return [
      { speaker: 'mia', text: `Hi ${patientName}, this is Mia from Adhery. I noticed your refill might be coming up soon. Wanted to check in.`, timestamp: '0:00' },
      { speaker: 'patient', text: `Oh right, yeah. I've been meaning to call the pharmacy but I keep putting it off.`, timestamp: '0:05' },
      { speaker: 'system', text: '[SYSTEM] Refill barrier: procrastination/low urgency. Patient is aware but not acting. Intervention type: reduce friction.', timestamp: '0:09' },
      { speaker: 'mia', text: `I hear you. Would it help if I sent you a reminder with the pharmacy number so you can just tap and call?`, timestamp: '0:11' },
      { speaker: 'patient', text: `Actually, yeah. That would make it way easier.`, timestamp: '0:15', crucial: true },
      { speaker: 'mia', text: `Done! I'll text you right after this call. And just to make sure you don't run out, do you have enough to get through this week?`, timestamp: '0:17' },
      { speaker: 'patient', text: `I think I have like 3 or 4 days left, so I should be okay if I call today.`, timestamp: '0:22', crucial: true },
      { speaker: 'system', text: '[SYSTEM] Supply check: 3-4 days remaining. Refill urgency: moderate. SMS with pharmacy contact queued.', timestamp: '0:26' },
      { speaker: 'mia', text: `Great, you've got a little buffer. I'll follow up in a couple days to make sure you got it sorted. Sound good?`, timestamp: '0:28' },
      { speaker: 'patient', text: `Sounds good. Thanks, Mia.`, timestamp: '0:32' },
      { speaker: 'system', text: '[SYSTEM] Call outcome: refill reminder sent via SMS. Follow-up: 2 days. Risk level: medium (pending refill confirmation).', timestamp: '0:35' },
    ];
  }

  if (flag === 'Side effect escalation' || patientStatus === 'risk') {
    return [
      { speaker: 'mia', text: `Hi ${patientName}, this is Mia from Adhery. How are you doing today?`, timestamp: '0:00' },
      { speaker: 'patient', text: `Oh hey, yeah I'm... I've been okay I guess. The, uh, the medication has been making me feel pretty nauseous though.`, timestamp: '0:05', crucial: true },
      { speaker: 'system', text: '[SYSTEM] Side effect detected: nausea. Severity assessment initiated. Patient tone: hesitant, possible minimization pattern.', timestamp: '0:12' },
      { speaker: 'mia', text: `I'm sorry to hear that. Can you tell me a bit more? Like when does it usually happen, is it right after you take it, or more throughout the day?`, timestamp: '0:14' },
      { speaker: 'patient', text: `It's mostly, um, like 30 minutes after? And then it kind of lingers for a couple hours. I almost didn't take it yesterday because of it.`, timestamp: '0:20', crucial: true },
      { speaker: 'system', text: '[SYSTEM] Adherence risk flag: patient considering skipping doses due to side effects. Deflection pattern: "almost didn\'t" suggests this may have already happened. Escalation threshold approaching.', timestamp: '0:28' },
      { speaker: 'mia', text: `That sounds really uncomfortable. A lot of people actually experience this in the first few weeks. It often gets better as your body adjusts. Have you tried taking it with food? That can help quite a bit.`, timestamp: '0:30' },
      { speaker: 'patient', text: `No, I've just been taking it first thing in the morning on an empty stomach like the instructions said.`, timestamp: '0:38' },
      { speaker: 'mia', text: `Ah, that might be it. Taking it with a small meal or even just some crackers can really reduce the nausea. Would you be willing to try that for the next few days and see if it helps?`, timestamp: '0:42' },
      { speaker: 'patient', text: `Yeah, I can try that. I just... I really don't want to stop taking it because I've been seeing some results already.`, timestamp: '0:50', crucial: true },
      { speaker: 'system', text: '[SYSTEM] Positive signal: patient motivated by results. Adherence intent: high despite side effects. Recommended action: schedule follow-up in 3 days to check side effect status.', timestamp: '0:55' },
      { speaker: 'mia', text: `That's great to hear that you're seeing results! Let's definitely keep you on track. I'll check back in with you in a couple of days to see how the food trick is working. And if the nausea doesn't improve, we can talk to your care team about adjusting the timing or dosage. Sound good?`, timestamp: '0:57' },
      { speaker: 'patient', text: `Yeah, that sounds good. Thanks, Mia.`, timestamp: '1:08' },
      { speaker: 'mia', text: `Of course! Talk to you soon. Take care.`, timestamp: '1:11' },
      { speaker: 'system', text: '[SYSTEM] Call outcome: side effect managed with behavioral adjustment. Follow-up scheduled: 3 days. Risk level: medium (monitoring). No clinician escalation needed at this time.', timestamp: '1:14' },
    ];
  }

  if (flag === 'Missed 2+ consecutive doses') {
    return [
      { speaker: 'mia', text: `Hi ${patientName}, this is Mia from Adhery. I wanted to check in with you. How have things been going with your medication?`, timestamp: '0:00' },
      { speaker: 'patient', text: `Ugh, honestly? Not great. I keep forgetting to take it. Life's been crazy with work and everything.`, timestamp: '0:06', crucial: true },
      { speaker: 'system', text: '[SYSTEM] Adherence barrier identified: lifestyle/schedule disruption. Patient tone: frustrated but not resistant. Opportunity for practical intervention.', timestamp: '0:12' },
      { speaker: 'mia', text: `I totally get it, things get hectic. When you do remember to take it, is there a particular time of day that works best for you?`, timestamp: '0:14' },
      { speaker: 'patient', text: `I mean, mornings are a mess. Evenings are probably better, like... right before dinner maybe?`, timestamp: '0:20' },
      { speaker: 'system', text: '[SYSTEM] Behavioral insight: morning routine is disrupted, evening anchor (dinner) is stable. Recommend time-of-day adjustment + reminder pairing.', timestamp: '0:25' },
      { speaker: 'mia', text: `That's a good idea. A lot of people find pairing it with something they already do every day, like setting it next to where you make dinner, makes it way easier to remember. Would it help if I sent you a quick text reminder around 5:30 PM?`, timestamp: '0:27' },
      { speaker: 'patient', text: `Yeah actually, a text would be helpful. I check my phone constantly anyway.`, timestamp: '0:35', crucial: true },
      { speaker: 'mia', text: `Perfect, I'll set that up for you. And just so you know, missing a few doses happens to everyone. The important thing is getting back on track, and it sounds like you're ready to do that.`, timestamp: '0:38' },
      { speaker: 'patient', text: `Yeah, I want to. I mean, my doctor said this is really important for my health so...`, timestamp: '0:45', crucial: true },
      { speaker: 'system', text: '[SYSTEM] Motivation confirmed: health concern from physician recommendation. Adherence intent: recovering. SMS reminder configured for 17:30 daily.', timestamp: '0:49' },
      { speaker: 'mia', text: `Absolutely. I'll check back in a week to see how the evening schedule is working. You've got this!`, timestamp: '0:51' },
      { speaker: 'patient', text: `Thanks, Mia. Appreciate the call.`, timestamp: '0:55' },
      { speaker: 'system', text: '[SYSTEM] Call outcome: schedule adjustment + SMS reminder set. Follow-up: 7 days. Risk level: high to medium (active re-engagement).', timestamp: '0:58' },
    ];
  }

  if (flag === 'Expressed intent to discontinue') {
    return [
      { speaker: 'mia', text: `Hi ${patientName}, this is Mia from Adhery. Just checking in. How's everything going?`, timestamp: '0:00' },
      { speaker: 'patient', text: `Honestly, I've been thinking about stopping the medication. I'm not sure it's worth it.`, timestamp: '0:05', crucial: true },
      { speaker: 'system', text: '[SYSTEM] Critical: patient expressing discontinuation intent. Motivational interviewing protocol initiated. Assessing underlying barriers.', timestamp: '0:10' },
      { speaker: 'mia', text: `I appreciate you being honest with me. Can you tell me more about what's making you feel that way?`, timestamp: '0:12' },
      { speaker: 'patient', text: `I don't know, I feel like I should be seeing more results by now. And the side effects are annoying. Like what's the point, you know?`, timestamp: '0:17', crucial: true },
      { speaker: 'system', text: '[SYSTEM] Dual barrier: unmet expectations + side effect burden. Patient needs outcome reframing and timeline education.', timestamp: '0:23' },
      { speaker: 'mia', text: `I hear you, and those are really valid frustrations. A lot of people feel that way around this point in their journey. For most people, the bigger results start showing up around week 8 to 12. Where are you in that timeline?`, timestamp: '0:25' },
      { speaker: 'patient', text: `I think I'm at about 6 weeks? Maybe 7?`, timestamp: '0:33' },
      { speaker: 'mia', text: `Okay, so you're actually right at the point where things tend to start picking up. Would you be open to giving it a few more weeks and checking in with me again? I can also connect you with your care team about the side effects.`, timestamp: '0:36' },
      { speaker: 'patient', text: `I guess I can try a few more weeks. But if it doesn't improve, I'm done.`, timestamp: '0:44', crucial: true },
      { speaker: 'system', text: '[SYSTEM] Tentative commitment secured. Patient set personal deadline. Schedule intensive follow-up cadence. Flag for clinician review if no improvement by week 10.', timestamp: '0:48' },
      { speaker: 'mia', text: `That's totally fair. I'll check in more frequently over the next couple weeks so we can track how things are going together. Sound good?`, timestamp: '0:50' },
      { speaker: 'patient', text: `Yeah, okay. Thanks for listening.`, timestamp: '0:55' },
      { speaker: 'system', text: '[SYSTEM] Call outcome: discontinuation deferred. Weekly follow-up scheduled. Clinician notification queued. Risk level: high (monitoring).', timestamp: '0:58' },
    ];
  }

  // Default: general check-in
  return [
    { speaker: 'mia', text: `Hi ${patientName}, this is Mia from Adhery. Just a quick check-in. How are things going with your medication?`, timestamp: '0:00' },
    { speaker: 'patient', text: `Pretty good, actually! I've been taking it every day like clockwork.`, timestamp: '0:05', crucial: true },
    { speaker: 'system', text: '[SYSTEM] Patient reports consistent adherence. Tone: positive and confident. No intervention needed.', timestamp: '0:09' },
    { speaker: 'mia', text: `That's wonderful to hear! Any side effects or anything bothering you?`, timestamp: '0:11' },
    { speaker: 'patient', text: `Nope, everything's been smooth. I did notice I've been less hungry which is nice.`, timestamp: '0:15' },
    { speaker: 'mia', text: `That's great! That's exactly what we'd expect. Keep up the good work, and I'll check in again next week. Take care!`, timestamp: '0:19' },
    { speaker: 'patient', text: `Thanks, Mia. Have a good one!`, timestamp: '0:23' },
    { speaker: 'system', text: '[SYSTEM] Call outcome: routine check-in, no issues. Adherence confirmed. Next follow-up: 7 days.', timestamp: '0:26' },
  ];
}

const patientPool = [
  { first: 'Sarah', last: 'Mitchell', gender: 'Female' as const },
  { first: 'James', last: 'Rodriguez', gender: 'Male' as const },
  { first: 'Linda', last: 'Chen', gender: 'Female' as const },
  { first: 'Marcus', last: 'Thompson', gender: 'Male' as const },
  { first: 'Emily', last: 'Patel', gender: 'Female' as const },
  { first: 'David', last: 'Kim', gender: 'Male' as const },
  { first: 'Rachel', last: 'Okafor', gender: 'Female' as const },
  { first: 'Michael', last: 'Santos', gender: 'Male' as const },
  { first: 'Angela', last: 'Novak', gender: 'Female' as const },
  { first: 'Robert', last: 'Williams', gender: 'Male' as const },
  { first: 'Diana', last: 'Reyes', gender: 'Female' as const },
  { first: 'Thomas', last: 'Baker', gender: 'Male' as const },
  { first: 'Natalie', last: 'Gupta', gender: 'Female' as const },
  { first: 'Christopher', last: 'Lewis', gender: 'Male' as const },
  { first: 'Olivia', last: 'Nakamura', gender: 'Female' as const },
  { first: 'Brian', last: 'Foster', gender: 'Male' as const },
  { first: 'Maria', last: 'Volkov', gender: 'Female' as const },
  { first: 'Kevin', last: 'Osei', gender: 'Male' as const },
  { first: 'Patricia', last: 'Dunn', gender: 'Female' as const },
  { first: 'Steven', last: 'Morales', gender: 'Male' as const },
  { first: 'Jennifer', last: 'Park', gender: 'Female' as const },
  { first: 'Daniel', last: 'Webb', gender: 'Male' as const },
  { first: 'Catherine', last: 'Ndiaye', gender: 'Female' as const },
  { first: 'William', last: 'Chang', gender: 'Male' as const },
  { first: 'Lisa', last: 'Hernandez', gender: 'Female' as const },
  { first: 'Andrew', last: 'Murray', gender: 'Male' as const },
  { first: 'Sophia', last: 'Okonkwo', gender: 'Female' as const },
  { first: 'Richard', last: 'Petrov', gender: 'Male' as const },
  { first: 'Grace', last: 'Yamamoto', gender: 'Female' as const },
  { first: 'Joseph', last: 'Sullivan', gender: 'Male' as const },
];

function buildPatients(): PatientV2[] {
  const rand = seededRandom(42);
  const patients: PatientV2[] = [];

  for (let i = 0; i < patientPool.length; i++) {
    const { first, last, gender } = patientPool[i];
    const r = rand();

    // Status distribution: ~63% adherent, ~27% risk, ~10% dropped
    let status: PatientV2['status'];
    if (r < 0.63) status = 'adherent';
    else if (r < 0.90) status = 'risk';
    else status = 'dropped';

    const age = 28 + Math.floor(rand() * 45); // 28-72
    const state = US_STATES[Math.floor(rand() * US_STATES.length)];
    const med = MEDICATIONS[Math.floor(rand() * MEDICATIONS.length)];
    const doseIdx = Math.min(Math.floor(rand() * med.doses.length), med.doses.length - 1);
    const currentDose = med.doses[doseIdx];
    const daysEnrolled = 14 + Math.floor(rand() * 180);
    const doseStartDays = Math.min(daysEnrolled, Math.floor(rand() * 60) + 7);

    let adherenceRate: number;
    if (status === 'adherent') adherenceRate = 80 + Math.floor(rand() * 20);
    else if (status === 'risk') adherenceRate = 45 + Math.floor(rand() * 35);
    else adherenceRate = 20 + Math.floor(rand() * 30);

    // Risk score + breakdown
    let riskScore: number | null = null;
    let riskBreakdown: PatientV2['riskBreakdown'] = null;
    if (status === 'adherent') {
      riskScore = Math.floor(rand() * 25); // 0-24, low
      riskBreakdown = {
        sideEffectScore: Math.floor(rand() * 20),
        sentimentScore: Math.floor(rand() * 15),
        socioeconomicScore: Math.floor(rand() * 30),
      };
    } else if (status === 'risk') {
      riskScore = 40 + Math.floor(rand() * 50); // 40-89
      riskBreakdown = {
        sideEffectScore: 20 + Math.floor(rand() * 60),
        sentimentScore: 30 + Math.floor(rand() * 50),
        socioeconomicScore: 10 + Math.floor(rand() * 60),
      };
    }
    // dropped: null

    // Adverse events
    const adverseEvents: AdverseEvent[] = [];
    const numAE = status === 'risk' ? 1 + Math.floor(rand() * 3) : status === 'dropped' ? 2 + Math.floor(rand() * 2) : Math.floor(rand() * 2);
    for (let a = 0; a < numAE; a++) {
      const ae = ADVERSE_EVENTS_POOL[Math.floor(rand() * ADVERSE_EVENTS_POOL.length)];
      const daysAgo = Math.floor(rand() * daysEnrolled);
      const d = new Date('2026-03-11');
      d.setDate(d.getDate() - daysAgo);
      adverseEvents.push({
        date: d.toISOString().split('T')[0],
        event: ae.event,
        severity: ae.severity,
        resolved: rand() > 0.4,
      });
    }

    // Interactions
    const interactions: InteractionV2[] = [];
    const numInt = 3 + Math.floor(rand() * 6);
    for (let j = 0; j < numInt; j++) {
      const daysAgo = j * (2 + Math.floor(rand() * 6));
      const d = new Date('2026-03-11');
      d.setDate(d.getDate() - daysAgo);
      const channel: InteractionV2['channel'] = j === 0 ? 'voice' : (['voice', 'sms', 'sms', 'sms', 'mail'] as const)[Math.floor(rand() * 5)];
      const sentimentBase = status === 'adherent' ? 70 : status === 'risk' ? 40 : 25;
      const sentiment = Math.min(100, sentimentBase + Math.floor(rand() * 25));

      // Flags on some interactions
      let flag: string | undefined;
      if (status !== 'adherent' && j < 3 && rand() > 0.5) {
        flag = INTERACTION_FLAGS[Math.floor(rand() * INTERACTION_FLAGS.length)];
      }

      const summaries = channel === 'voice'
        ? ['Check-in call about medication adherence', 'Follow-up on side effects and dosing', 'Wellness check and refill reminder', 'Discussed concerns about treatment progress']
        : channel === 'sms'
          ? ['Dose reminder sent, patient confirmed', 'Refill reminder sent', 'Weekly check-in, no response', 'Side effect follow-up']
          : ['Medication guide mailed', 'Monthly adherence summary mailed'];

      const hasTranscript = channel === 'voice';
      const intId = `int-${i}-${j}`;

      interactions.push({
        id: intId,
        date: d.toISOString().split('T')[0],
        channel,
        summary: summaries[Math.floor(rand() * summaries.length)],
        sentiment,
        duration: channel === 'voice' ? `${1 + Math.floor(rand() * 3)}:${String(Math.floor(rand() * 60)).padStart(2, '0')}` : undefined,
        hasTranscript,
        audioUrl: hasTranscript ? `/audio/${intId}.wav` : undefined,
        flag,
        transcript: hasTranscript ? generateTranscripts(first, status, flag) : undefined,
      });
    }

    const enrollDate = new Date('2026-03-11');
    enrollDate.setDate(enrollDate.getDate() - daysEnrolled);
    const doseStart = new Date('2026-03-11');
    doseStart.setDate(doseStart.getDate() - doseStartDays);

    patients.push({
      id: `pat-${String(i).padStart(3, '0')}`,
      firstName: first,
      lastName: last,
      age,
      gender,
      state,
      medication: med.name,
      currentDose: `${med.name} ${currentDose}`,
      doseStartDate: doseStart.toISOString().split('T')[0],
      enrollmentDate: enrollDate.toISOString().split('T')[0],
      daysEnrolled,
      status,
      adherenceRate,
      riskScore,
      riskBreakdown,
      adverseEvents,
      lastInteraction: interactions[0]?.date || '2026-03-11',
      interactions,
    });
  }

  return patients;
}

export const patientsV2 = buildPatients();

export const adherentPatients = patientsV2.filter((p) => p.status === 'adherent');
export const riskPatients = patientsV2.filter((p) => p.status === 'risk');
export const droppedPatients = patientsV2.filter((p) => p.status === 'dropped');

export function getPatientById(id: string): PatientV2 | undefined {
  return patientsV2.find((p) => p.id === id);
}

export function getInteraction(patientId: string, interactionId: string): InteractionV2 | undefined {
  const patient = getPatientById(patientId);
  return patient?.interactions.find((i) => i.id === interactionId);
}
