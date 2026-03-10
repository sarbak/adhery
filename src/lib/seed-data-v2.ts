// Mock data for dashboard-2-2: simplified drill-down dashboard

export interface PatientV2 {
  id: string;
  firstName: string;
  lastName: string;
  medication: string;
  enrollmentDate: string;
  adherenceRate: number;
  pdc: number;
  totalInteractions: number;
  daysEnrolled: number;
  riskReason: string | null;
  lastInteraction: string;
  adherenceTrend: number[]; // last 30 days, 1 = adherent, 0 = missed
  interactions: InteractionV2[];
}

export interface InteractionV2 {
  id: string;
  date: string;
  channel: 'voice' | 'sms' | 'mail';
  summary: string;
  sentiment: number; // 0-100
  duration?: string; // voice only
  hasTranscript: boolean;
  transcript?: TranscriptMessage[];
}

export interface TranscriptMessage {
  speaker: 'mia' | 'patient' | 'system';
  text: string;
  timestamp: string;
}

// --- KPI data ---

export const kpiData = {
  adherenceRate: { value: 87.3, delta: +4.2, trend: 'up' as const },
  conversationsHandled: { value: 1842, delta: +312, trend: 'up' as const },
  patientsFlagged: { value: 23, delta: -5, trend: 'down' as const },
  casesEscalated: { value: 8, delta: -2, trend: 'down' as const },
  retainedPatients: { value: 1956, delta: +89, trend: 'up' as const },
};

// --- Patients ---

const RISK_REASONS = [
  'Missed 3+ doses',
  'No response to outreach',
  'Reported side effects',
  'Refill overdue',
];

function generateTranscript(patientName: string, riskReason: string | null): TranscriptMessage[] {
  if (riskReason === 'Reported side effects') {
    return [
      { speaker: 'mia', text: `Hi ${patientName}, this is Mia from Adhery. How are you doing today?`, timestamp: '0:00' },
      { speaker: 'patient', text: `Oh hey, yeah I'm... I've been okay I guess. The, uh, the medication has been making me feel pretty nauseous though.`, timestamp: '0:05' },
      { speaker: 'system', text: '[SYSTEM] Side effect detected: nausea. Severity assessment initiated. Patient tone: hesitant, possible minimization pattern.', timestamp: '0:12' },
      { speaker: 'mia', text: `I'm sorry to hear that. Can you tell me a bit more? Like when does it usually happen -- is it right after you take it, or more throughout the day?`, timestamp: '0:14' },
      { speaker: 'patient', text: `It's mostly, um, like 30 minutes after? And then it kind of lingers for a couple hours. I almost didn't take it yesterday because of it.`, timestamp: '0:20' },
      { speaker: 'system', text: '[SYSTEM] Adherence risk flag: patient considering skipping doses due to side effects. Deflection pattern: "almost didn\'t" suggests this may have already happened. Escalation threshold approaching.', timestamp: '0:28' },
      { speaker: 'mia', text: `That sounds really uncomfortable. A lot of people actually experience this in the first few weeks -- it often gets better as your body adjusts. Have you tried taking it with food? That can help quite a bit.`, timestamp: '0:30' },
      { speaker: 'patient', text: `No, I've just been taking it first thing in the morning on an empty stomach like the instructions said.`, timestamp: '0:38' },
      { speaker: 'mia', text: `Ah, that might be it. Taking it with a small meal or even just some crackers can really reduce the nausea. Would you be willing to try that for the next few days and see if it helps?`, timestamp: '0:42' },
      { speaker: 'patient', text: `Yeah, I can try that. I just... I really don't want to stop taking it because I've been seeing some results already.`, timestamp: '0:50' },
      { speaker: 'system', text: '[SYSTEM] Positive signal: patient motivated by results. Adherence intent: high despite side effects. Recommended action: schedule follow-up in 3 days to check side effect status.', timestamp: '0:55' },
      { speaker: 'mia', text: `That's great to hear that you're seeing results! Let's definitely keep you on track. I'll check back in with you in a couple of days to see how the food trick is working. And if the nausea doesn't improve, we can talk to your care team about adjusting the timing or dosage. Sound good?`, timestamp: '0:57' },
      { speaker: 'patient', text: `Yeah, that sounds good. Thanks, Mia.`, timestamp: '1:08' },
      { speaker: 'mia', text: `Of course! Talk to you soon. Take care.`, timestamp: '1:11' },
      { speaker: 'system', text: '[SYSTEM] Call outcome: side effect managed with behavioral adjustment. Follow-up scheduled: 3 days. Risk level: medium (monitoring). No clinician escalation needed at this time.', timestamp: '1:14' },
    ];
  }

  if (riskReason === 'Missed 3+ doses') {
    return [
      { speaker: 'mia', text: `Hi ${patientName}, this is Mia from Adhery. I wanted to check in with you -- how have things been going with your medication?`, timestamp: '0:00' },
      { speaker: 'patient', text: `Ugh, honestly? Not great. I keep forgetting to take it. Life's been crazy with work and everything.`, timestamp: '0:06' },
      { speaker: 'system', text: '[SYSTEM] Adherence barrier identified: lifestyle/schedule disruption. Patient tone: frustrated but not resistant. Opportunity for practical intervention.', timestamp: '0:12' },
      { speaker: 'mia', text: `I totally get it -- things get hectic. When you do remember to take it, is there a particular time of day that works best for you?`, timestamp: '0:14' },
      { speaker: 'patient', text: `I mean, mornings are a mess. Evenings are probably better, like... right before dinner maybe?`, timestamp: '0:20' },
      { speaker: 'system', text: '[SYSTEM] Behavioral insight: morning routine is disrupted, evening anchor (dinner) is stable. Recommend time-of-day adjustment + reminder pairing.', timestamp: '0:25' },
      { speaker: 'mia', text: `That's a good idea. A lot of people find pairing it with something they already do every day -- like setting it next to where you make dinner -- makes it way easier to remember. Would it help if I sent you a quick text reminder around 5:30 PM?`, timestamp: '0:27' },
      { speaker: 'patient', text: `Yeah actually, a text would be helpful. I check my phone constantly anyway.`, timestamp: '0:35' },
      { speaker: 'mia', text: `Perfect, I'll set that up for you. And just so you know, missing a few doses happens to everyone. The important thing is getting back on track, and it sounds like you're ready to do that.`, timestamp: '0:38' },
      { speaker: 'patient', text: `Yeah, I want to. I mean, my doctor said this is really important for my health so...`, timestamp: '0:45' },
      { speaker: 'system', text: '[SYSTEM] Motivation confirmed: health concern from physician recommendation. Adherence intent: recovering. SMS reminder configured for 17:30 daily.', timestamp: '0:49' },
      { speaker: 'mia', text: `Absolutely. I'll check back in a week to see how the evening schedule is working. You've got this!`, timestamp: '0:51' },
      { speaker: 'patient', text: `Thanks, Mia. Appreciate the call.`, timestamp: '0:55' },
      { speaker: 'system', text: '[SYSTEM] Call outcome: schedule adjustment + SMS reminder set. Follow-up: 7 days. Risk level: high → medium (active re-engagement).', timestamp: '0:58' },
    ];
  }

  if (riskReason === 'No response to outreach') {
    return [
      { speaker: 'mia', text: `Hi ${patientName}, this is Mia from Adhery. I've been trying to reach you -- just wanted to make sure everything's okay.`, timestamp: '0:00' },
      { speaker: 'patient', text: `Oh, yeah, sorry about that. I saw the messages but I just... didn't get around to responding.`, timestamp: '0:06' },
      { speaker: 'system', text: '[SYSTEM] Contact re-established after 12 days of silence. Patient tone: apologetic, not hostile. Disengagement appears passive, not intentional avoidance.', timestamp: '0:11' },
      { speaker: 'mia', text: `No worries at all! I'm glad I caught you now. How have you been feeling? Still taking your medication?`, timestamp: '0:13' },
      { speaker: 'patient', text: `Mostly, yeah. I think I missed a couple days last week but I'm back on it.`, timestamp: '0:18' },
      { speaker: 'system', text: '[SYSTEM] Self-reported missed doses during communication gap. Correlation: non-response periods likely indicate adherence lapses. Flag for proactive outreach protocol.', timestamp: '0:22' },
      { speaker: 'mia', text: `Okay, that's good that you got back on track. Would it be easier if I checked in by text instead of calling? Whatever works best for you.`, timestamp: '0:24' },
      { speaker: 'patient', text: `Yeah, texts are better honestly. I'm bad at picking up the phone.`, timestamp: '0:30' },
      { speaker: 'system', text: '[SYSTEM] Channel preference updated: SMS preferred over voice. Updating outreach cadence accordingly.', timestamp: '0:34' },
      { speaker: 'mia', text: `Got it, I'll switch to texts going forward. I'll send you a quick check-in once a week -- just takes a second to reply. Does that work?`, timestamp: '0:36' },
      { speaker: 'patient', text: `Yeah, that's fine. Thanks for being patient with me.`, timestamp: '0:41' },
      { speaker: 'mia', text: `Of course! We're here to help, not to nag. Talk soon!`, timestamp: '0:44' },
      { speaker: 'system', text: '[SYSTEM] Call outcome: re-engaged after 12-day gap. Channel switched to SMS. Weekly cadence established. Risk level: high → medium.', timestamp: '0:47' },
    ];
  }

  // Default: Refill overdue or general
  return [
    { speaker: 'mia', text: `Hi ${patientName}, this is Mia from Adhery. I noticed your refill might be coming up soon -- wanted to check in.`, timestamp: '0:00' },
    { speaker: 'patient', text: `Oh right, yeah. I've been meaning to call the pharmacy but I keep putting it off.`, timestamp: '0:05' },
    { speaker: 'system', text: '[SYSTEM] Refill barrier: procrastination/low urgency. Patient is aware but not acting. Intervention type: reduce friction.', timestamp: '0:09' },
    { speaker: 'mia', text: `I hear you. Would it help if I sent you a reminder with the pharmacy number so you can just tap and call?`, timestamp: '0:11' },
    { speaker: 'patient', text: `Actually, yeah. That would make it way easier.`, timestamp: '0:15' },
    { speaker: 'mia', text: `Done! I'll text you right after this call. And just to make sure you don't run out -- do you have enough to get through this week?`, timestamp: '0:17' },
    { speaker: 'patient', text: `I think I have like 3 or 4 days left, so I should be okay if I call today.`, timestamp: '0:22' },
    { speaker: 'system', text: '[SYSTEM] Supply check: 3-4 days remaining. Refill urgency: moderate. SMS with pharmacy contact queued.', timestamp: '0:26' },
    { speaker: 'mia', text: `Great, you've got a little buffer. I'll follow up in a couple days to make sure you got it sorted. Sound good?`, timestamp: '0:28' },
    { speaker: 'patient', text: `Sounds good. Thanks, Mia.`, timestamp: '0:32' },
    { speaker: 'system', text: '[SYSTEM] Call outcome: refill reminder sent via SMS. Follow-up: 2 days. Risk level: medium (pending refill confirmation).', timestamp: '0:35' },
  ];
}

function generateAdherenceTrend(adherenceRate: number): number[] {
  const days: number[] = [];
  for (let i = 0; i < 30; i++) {
    days.push(Math.random() * 100 < adherenceRate ? 1 : 0);
  }
  return days;
}

const patientNames = [
  { first: 'Sarah', last: 'Mitchell' },
  { first: 'James', last: 'Rodriguez' },
  { first: 'Linda', last: 'Chen' },
  { first: 'Marcus', last: 'Thompson' },
  { first: 'Emily', last: 'Patel' },
  { first: 'David', last: 'Kim' },
  { first: 'Rachel', last: 'Okafor' },
  { first: 'Michael', last: 'Santos' },
  { first: 'Angela', last: 'Novak' },
  { first: 'Robert', last: 'Williams' },
  { first: 'Diana', last: 'Reyes' },
  { first: 'Thomas', last: 'Baker' },
  { first: 'Natalie', last: 'Gupta' },
  { first: 'Christopher', last: 'Lewis' },
  { first: 'Olivia', last: 'Nakamura' },
  { first: 'Brian', last: 'Foster' },
  { first: 'Maria', last: 'Volkov' },
  { first: 'Kevin', last: 'Osei' },
  { first: 'Patricia', last: 'Dunn' },
  { first: 'Steven', last: 'Morales' },
  { first: 'Jennifer', last: 'Park' },
  { first: 'Daniel', last: 'Webb' },
  { first: 'Catherine', last: 'Ndiaye' },
];

const medications = ['Ozempic 0.5mg', 'Ozempic 1mg', 'Wegovy 2.4mg', 'Mounjaro 5mg', 'Mounjaro 10mg'];

function buildPatients(): PatientV2[] {
  const patients: PatientV2[] = [];

  // 23 risk patients (matching KPI)
  const riskPatientIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

  for (let i = 0; i < patientNames.length; i++) {
    const { first, last } = patientNames[i];
    const isRisk = riskPatientIndices.includes(i);
    const adherenceRate = isRisk
      ? 40 + Math.floor(Math.random() * 35) // 40-75%
      : 80 + Math.floor(Math.random() * 20); // 80-100%
    const riskReason = isRisk ? RISK_REASONS[i % RISK_REASONS.length] : null;
    const daysEnrolled = 30 + Math.floor(Math.random() * 150);
    const medication = medications[i % medications.length];

    const interactions: InteractionV2[] = [];
    const numInteractions = 3 + Math.floor(Math.random() * 5);

    for (let j = 0; j < numInteractions; j++) {
      const daysAgo = j * (3 + Math.floor(Math.random() * 5));
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      const channel: InteractionV2['channel'] = j === 0 ? 'voice' : (['voice', 'sms', 'sms', 'mail'] as const)[j % 4];
      const sentiments = isRisk ? [45, 55, 50, 60, 65] : [75, 80, 85, 90, 70];

      const summaries = channel === 'voice'
        ? [
            'Discussed medication adherence and addressed concerns',
            'Check-in call about side effects and dosing schedule',
            'Follow-up on missed doses, set new reminder schedule',
            'Refill reminder and wellness check',
          ]
        : channel === 'sms'
          ? [
              'Dose reminder sent, patient confirmed',
              'Refill reminder sent',
              'Weekly check-in, no response',
              'Side effect check-in, patient replied',
            ]
          : [
              'Medication guide mailed',
              'Monthly adherence summary mailed',
            ];

      const hasTranscript = channel === 'voice' && j === 0;

      interactions.push({
        id: `int-${i}-${j}`,
        date: date.toISOString().split('T')[0],
        channel,
        summary: summaries[j % summaries.length],
        sentiment: sentiments[j % sentiments.length],
        duration: channel === 'voice' ? `${1 + Math.floor(Math.random() * 3)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}` : undefined,
        hasTranscript,
        transcript: hasTranscript ? generateTranscript(first, riskReason) : undefined,
      });
    }

    const lastDate = interactions[0]?.date || new Date().toISOString().split('T')[0];

    patients.push({
      id: `pat-${String(i).padStart(3, '0')}`,
      firstName: first,
      lastName: last,
      medication,
      enrollmentDate: (() => {
        const d = new Date();
        d.setDate(d.getDate() - daysEnrolled);
        return d.toISOString().split('T')[0];
      })(),
      adherenceRate,
      pdc: adherenceRate - Math.floor(Math.random() * 5),
      totalInteractions: interactions.length,
      daysEnrolled,
      riskReason,
      lastInteraction: lastDate,
      adherenceTrend: generateAdherenceTrend(adherenceRate),
      interactions,
    });
  }

  return patients;
}

export const patientsV2 = buildPatients();

export const riskPatients = patientsV2.filter((p) => p.riskReason !== null);

export function getPatientById(id: string): PatientV2 | undefined {
  return patientsV2.find((p) => p.id === id);
}

export function getInteraction(patientId: string, interactionId: string): InteractionV2 | undefined {
  const patient = getPatientById(patientId);
  return patient?.interactions.find((i) => i.id === interactionId);
}
