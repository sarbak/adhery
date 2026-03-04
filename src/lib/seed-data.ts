// Mock seed data for the Adhery dashboard prototype
// Simulates 1 org, 1 drug program, ~50 patients, months of interactions

export interface Organization {
  id: string;
  name: string;
  type: 'pharma' | 'specialty_pharmacy' | 'health_system';
  logoUrl?: string;
}

export interface DrugProgram {
  id: string;
  orgId: string;
  drugName: string;
  drugClass: string;
  scheduleConfig: string;
  sideEffectsMonitored: string[];
  outreachCadence: {
    sms: string;
    voice: string;
    mail: string;
  };
  activePatients: number;
  adherenceRate: number;
}

export interface Patient {
  id: string;
  programId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  riskScore: number;
  adherenceRate: number;
  enrollmentDate: string;
  lastContact: string;
  status: 'active' | 'at_risk' | 'non_adherent' | 'graduated';
  channelPreference: 'sms' | 'voice' | 'mail';
}

export interface Interaction {
  id: string;
  patientId: string;
  programId: string;
  channel: 'sms' | 'voice' | 'mail';
  direction: 'inbound' | 'outbound';
  content: string;
  status: 'sent' | 'delivered' | 'read' | 'failed' | 'completed';
  metadata?: {
    sentiment?: number;
    sideEffectMentioned?: boolean;
    adherenceSignal?: string;
    duration?: string;
    escalated?: boolean;
  };
  createdAt: string;
}

export interface Alert {
  id: string;
  patientId: string;
  programId: string;
  type: 'missed_dose' | 'side_effect' | 'unreachable' | 'refill_gap';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'acknowledged' | 'resolved';
  notes: string;
  createdAt: string;
  resolvedAt?: string;
}

// ─── Organization ───
export const organization: Organization = {
  id: 'org-1',
  name: 'BioVista Specialty Pharmacy',
  type: 'specialty_pharmacy',
};

// ─── Drug Program ───
export const drugProgram: DrugProgram = {
  id: 'prog-1',
  orgId: 'org-1',
  drugName: 'Humira (adalimumab)',
  drugClass: 'TNF Inhibitor / Biologic',
  scheduleConfig: 'Every 2 weeks, subcutaneous injection',
  sideEffectsMonitored: [
    'Injection site reaction',
    'Upper respiratory infection',
    'Headache',
    'Nausea',
    'Rash',
    'Joint pain',
    'Fatigue',
    'Abdominal pain',
  ],
  outreachCadence: {
    sms: 'Day of dose, day after, 3 days before refill',
    voice: 'Monthly check-in, post-side-effect report, 2 missed SMS',
    mail: 'Welcome kit, quarterly newsletter, 2 missed refills',
  },
  activePatients: 2000,
  adherenceRate: 91.3,
};

// ─── Patients ───
const firstNames = [
  'Maria', 'James', 'Linda', 'Robert', 'Patricia', 'Michael', 'Jennifer', 'William',
  'Elizabeth', 'David', 'Susan', 'Richard', 'Jessica', 'Joseph', 'Sarah', 'Thomas',
  'Karen', 'Charles', 'Lisa', 'Christopher', 'Nancy', 'Daniel', 'Betty', 'Matthew',
  'Margaret', 'Anthony', 'Sandra', 'Mark', 'Ashley', 'Donald', 'Dorothy', 'Steven',
  'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle', 'Kenneth',
  'Carol', 'Kevin', 'Amanda', 'Brian', 'Melissa', 'George', 'Deborah', 'Timothy',
];

const lastNames = [
  'Garcia', 'Thompson', 'Sullivan', 'Kim', 'Johnson', 'Williams', 'Brown', 'Jones',
  'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Moore',
  'Jackson', 'Martin', 'Lee', 'Perez', 'White', 'Harris', 'Sanchez', 'Clark',
  'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright',
  'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson',
  'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts', 'Evans',
];

function generatePhone(i: number): string {
  return `+1 (${415 + (i % 10)}) ${String(555).padStart(3, '0')}-${String(1000 + i).padStart(4, '0')}`;
}

function randomDate(start: string, end: string): string {
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  return new Date(s + Math.random() * (e - s)).toISOString().split('T')[0];
}

// Generate adherence rates that reflect a successful program (avg ~91%)
// Distribution: ~60% high adherent (90-100%), ~25% moderate (80-90%), ~10% at-risk (65-80%), ~5% non-adherent (50-65%)
function generateAdherence(i: number): number {
  // Use deterministic seeding based on index for consistent data
  const seed = ((i * 7 + 13) % 100) / 100;
  if (seed < 0.05) return 50 + seed * 300; // 50-65: non-adherent (~5%)
  if (seed < 0.15) return 65 + (seed - 0.05) * 150; // 65-80: at-risk (~10%)
  if (seed < 0.40) return 80 + (seed - 0.15) * 40; // 80-90: moderate (~25%)
  return 90 + (seed - 0.40) * 16.7; // 90-100: high adherent (~60%)
}

export const patients: Patient[] = firstNames.map((first, i) => {
  const adherence = generateAdherence(i);
  const risk = adherence < 70 ? 80 + (((i * 3) % 20)) : adherence < 85 ? 40 + (((i * 5) % 30)) : ((i * 7) % 25);
  const statuses: Patient['status'][] = adherence < 65 ? ['non_adherent'] : adherence < 80 ? ['at_risk'] : adherence > 95 ? ['graduated'] : ['active'];
  return {
    id: `pat-${i + 1}`,
    programId: 'prog-1',
    firstName: first,
    lastName: lastNames[i],
    phone: generatePhone(i),
    email: `${first.toLowerCase()}.${lastNames[i].toLowerCase()}@email.com`,
    riskScore: Math.round(risk),
    adherenceRate: Math.round(adherence * 10) / 10,
    enrollmentDate: randomDate('2025-06-01', '2025-12-01'),
    lastContact: randomDate('2026-02-01', '2026-03-04'),
    status: statuses[0],
    channelPreference: ['sms', 'voice', 'mail'][i % 3] as Patient['channelPreference'],
  };
});

// ─── Interactions ───
const smsTemplates = [
  { out: 'Hi {name}, time for your Humira dose today. Reply YES when taken!', in: 'YES, took it this morning' },
  { out: 'Hi {name}, quick check-in. How are you feeling after your last injection?', in: 'Good, slight redness at injection site' },
  { out: 'Reminder: your Humira refill is due in 3 days. Need help ordering?', in: 'Already ordered, thanks!' },
  { out: 'Hi {name}, we noticed you missed your dose yesterday. Everything okay?', in: 'Sorry, forgot. Taking it now' },
  { out: 'Great job staying on track, {name}! Your adherence is at {rate}% this month.', in: 'Thanks for the reminder!' },
];

const voiceTranscripts = [
  { summary: 'Monthly check-in call. Patient reports feeling well. No side effects. Adherence confirmed.', duration: '3:24', sentiment: 0.85 },
  { summary: 'Patient reported injection site pain. Provided guidance on ice application and rotation. Scheduled pharmacist follow-up.', duration: '5:12', sentiment: 0.6, sideEffect: true },
  { summary: 'Onboarding education call. Covered injection technique, storage, and side effect reporting. Patient engaged and asked good questions.', duration: '8:45', sentiment: 0.9 },
  { summary: 'Follow-up after missed dose. Patient was traveling. Discussed travel tips for medication storage. Rescheduled dose.', duration: '4:33', sentiment: 0.7 },
  { summary: 'Side effect triage. Patient mentioned fatigue and headaches. Severity assessed as mild. Monitoring recommended.', duration: '6:01', sentiment: 0.55, sideEffect: true, escalated: true },
];

const mailTypes = [
  'Welcome kit sent with medication guide, injection instructions, and pharmacy contact card',
  'Quarterly newsletter with adherence tips and patient success stories',
  'Refill reminder letter with pre-filled order form',
  'Side effect monitoring card with symptom tracker',
];

export const interactions: Interaction[] = [];

// Generate interactions for each patient
patients.forEach((patient, pIdx) => {
  const numInteractions = 5 + Math.floor(Math.random() * 15);
  for (let j = 0; j < numInteractions; j++) {
    const date = randomDate('2025-08-01', '2026-03-04');
    const channelRoll = Math.random();
    const channel: Interaction['channel'] = channelRoll < 0.6 ? 'sms' : channelRoll < 0.85 ? 'voice' : 'mail';

    if (channel === 'sms') {
      const tpl = smsTemplates[j % smsTemplates.length];
      // Outbound
      interactions.push({
        id: `int-${pIdx}-${j}-out`,
        patientId: patient.id,
        programId: 'prog-1',
        channel: 'sms',
        direction: 'outbound',
        content: tpl.out.replace('{name}', patient.firstName).replace('{rate}', String(patient.adherenceRate)),
        status: 'delivered',
        createdAt: date,
      });
      // Inbound response (80% of the time)
      if (Math.random() > 0.2) {
        interactions.push({
          id: `int-${pIdx}-${j}-in`,
          patientId: patient.id,
          programId: 'prog-1',
          channel: 'sms',
          direction: 'inbound',
          content: tpl.in,
          status: 'read',
          createdAt: date,
        });
      }
    } else if (channel === 'voice') {
      const vt = voiceTranscripts[j % voiceTranscripts.length];
      interactions.push({
        id: `int-${pIdx}-${j}-voice`,
        patientId: patient.id,
        programId: 'prog-1',
        channel: 'voice',
        direction: 'outbound',
        content: vt.summary,
        status: 'completed',
        metadata: {
          sentiment: vt.sentiment,
          sideEffectMentioned: vt.sideEffect || false,
          duration: vt.duration,
          escalated: vt.escalated || false,
        },
        createdAt: date,
      });
    } else {
      interactions.push({
        id: `int-${pIdx}-${j}-mail`,
        patientId: patient.id,
        programId: 'prog-1',
        channel: 'mail',
        direction: 'outbound',
        content: mailTypes[j % mailTypes.length],
        status: Math.random() > 0.1 ? 'delivered' : 'sent',
        createdAt: date,
      });
    }
  }
});

// Sort interactions by date
interactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

// ─── Alerts ───
export const alerts: Alert[] = [
  {
    id: 'alert-1',
    patientId: 'pat-4',
    programId: 'prog-1',
    type: 'side_effect',
    severity: 'high',
    status: 'open',
    notes: 'Patient reported persistent injection site reaction lasting >5 days. Possible allergic reaction. Pharmacist review needed.',
    createdAt: '2026-03-03',
  },
  {
    id: 'alert-2',
    patientId: 'pat-7',
    programId: 'prog-1',
    type: 'unreachable',
    severity: 'medium',
    status: 'open',
    notes: 'No response to 3 SMS messages and 1 voice call over 10 days. Mail outreach initiated.',
    createdAt: '2026-03-02',
  },
  {
    id: 'alert-3',
    patientId: 'pat-12',
    programId: 'prog-1',
    type: 'missed_dose',
    severity: 'medium',
    status: 'open',
    notes: 'Missed 2 consecutive doses. Last confirmed dose was Feb 18. Voice call scheduled.',
    createdAt: '2026-03-01',
  },
  {
    id: 'alert-4',
    patientId: 'pat-15',
    programId: 'prog-1',
    type: 'refill_gap',
    severity: 'high',
    status: 'open',
    notes: 'Refill overdue by 8 days. Pharmacy reports no refill request. Insurance coverage may have lapsed.',
    createdAt: '2026-02-28',
  },
  {
    id: 'alert-5',
    patientId: 'pat-2',
    programId: 'prog-1',
    type: 'side_effect',
    severity: 'critical',
    status: 'acknowledged',
    notes: 'Patient mentioned frequent nosebleeds during voice check-in. Flagged for immediate pharmacist review. Could indicate bleeding disorder interaction.',
    createdAt: '2026-02-27',
  },
  {
    id: 'alert-6',
    patientId: 'pat-20',
    programId: 'prog-1',
    type: 'missed_dose',
    severity: 'low',
    status: 'resolved',
    notes: 'Missed single dose due to travel. Patient confirmed resumption of schedule via SMS.',
    createdAt: '2026-02-25',
    resolvedAt: '2026-02-26',
  },
  {
    id: 'alert-7',
    patientId: 'pat-30',
    programId: 'prog-1',
    type: 'unreachable',
    severity: 'high',
    status: 'open',
    notes: 'Patient unreachable for 14 days across all channels. Address verification in progress.',
    createdAt: '2026-02-24',
  },
  {
    id: 'alert-8',
    patientId: 'pat-8',
    programId: 'prog-1',
    type: 'side_effect',
    severity: 'medium',
    status: 'resolved',
    notes: 'Patient reported headaches and fatigue. Pharmacist reviewed and determined expected side effects. Patient counseled.',
    createdAt: '2026-02-20',
    resolvedAt: '2026-02-22',
  },
];

// ─── Journey Events (automated process timeline) ───

export type JourneyEventType =
  | 'enrolled'
  | 'welcome_kit_sent'
  | 'welcome_kit_delivered'
  | 'first_sms_sent'
  | 'sms_check_in'
  | 'sms_response_received'
  | 'dose_confirmed'
  | 'dose_missed'
  | 'refill_reminder'
  | 'refill_confirmed'
  | 'refill_overdue'
  | 'side_effect_reported'
  | 'side_effect_assessed'
  | 'voice_call_scheduled'
  | 'voice_call_completed'
  | 'voice_call_no_answer'
  | 'escalation_sms_to_voice'
  | 'escalation_voice_to_mail'
  | 'escalation_to_pharmacist'
  | 'pharmacist_intervention'
  | 'mail_sent'
  | 'mail_delivered'
  | 'patient_re_engaged'
  | 'adherence_milestone';

export interface JourneyEvent {
  id: string;
  patientId: string;
  type: JourneyEventType;
  date: string;
  title: string;
  description: string;
  channel?: 'sms' | 'voice' | 'mail' | 'system' | 'pharmacist';
  automated: boolean;
  outcome?: 'success' | 'warning' | 'problem' | 'neutral';
  metadata?: Record<string, string | number | boolean>;
}

// Journey templates for different patient archetypes
function generateJourney(patient: Patient, patientIndex: number): JourneyEvent[] {
  const events: JourneyEvent[] = [];
  const enrolled = new Date(patient.enrollmentDate);
  let id = 0;
  const pid = patient.id;

  const addEvent = (dayOffset: number, type: JourneyEventType, title: string, description: string, channel: JourneyEvent['channel'], automated: boolean, outcome: JourneyEvent['outcome'], metadata?: JourneyEvent['metadata']) => {
    const date = new Date(enrolled);
    date.setDate(date.getDate() + dayOffset);
    if (date > new Date('2026-03-04')) return;
    events.push({
      id: `je-${pid}-${id++}`,
      patientId: pid,
      type,
      date: date.toISOString().split('T')[0],
      title,
      description,
      channel,
      automated,
      outcome,
      metadata,
    });
  };

  // All patients start the same way
  addEvent(0, 'enrolled', 'Patient enrolled', `${patient.firstName} enrolled in the Humira adherence program.`, 'system', true, 'success');
  addEvent(1, 'welcome_kit_sent', 'Welcome kit mailed', 'Personalized welcome kit with injection guide, pharmacy contact card, and side effect tracker sent via USPS Priority.', 'mail', true, 'neutral');
  addEvent(1, 'first_sms_sent', 'Welcome SMS sent', `"Hi ${patient.firstName}, welcome to your Humira support program! We're here to help. Reply HELP anytime."`, 'sms', true, 'neutral');
  addEvent(3, 'welcome_kit_delivered', 'Welcome kit delivered', 'USPS confirms delivery to patient address.', 'mail', true, 'success');

  // Archetype branching based on adherence rate
  if (patient.adherenceRate > 85) {
    // HIGH ADHERENCE - smooth journey
    addEvent(4, 'sms_response_received', 'Patient responded', `"Thank you! Got the welcome kit, very helpful."`, 'sms', false, 'success');
    addEvent(14, 'sms_check_in', 'Dose day reminder', `"Hi ${patient.firstName}, your Humira dose is due today. Reply YES when taken!"`, 'sms', true, 'neutral');
    addEvent(14, 'dose_confirmed', 'Dose confirmed via SMS', `Patient replied "YES, took it this morning." Adherence logged.`, 'sms', false, 'success', { pdc_current: 100 });
    addEvent(28, 'sms_check_in', 'Dose day reminder', `Automated check-in sent. Patient confirmed dose within 2 hours.`, 'sms', true, 'success');
    addEvent(28, 'dose_confirmed', 'Dose confirmed', 'On-time dose confirmed. PDC tracking at 100%.', 'system', true, 'success', { pdc_current: 100 });
    addEvent(35, 'refill_reminder', 'Refill reminder sent', `"Your Humira refill is due in 3 days. Need help ordering? Reply ORDER."`, 'sms', true, 'neutral');
    addEvent(36, 'refill_confirmed', 'Refill ordered', 'Patient replied "ORDER." Pharmacy notified and refill processing.', 'sms', false, 'success');
    addEvent(42, 'sms_check_in', 'Dose day reminder', 'Automated dose reminder. Confirmed same day.', 'sms', true, 'success');
    addEvent(42, 'dose_confirmed', 'Dose confirmed', 'Third consecutive on-time dose.', 'system', true, 'success', { pdc_current: 100 });
    addEvent(56, 'dose_confirmed', 'Dose confirmed', 'Fourth dose confirmed on schedule.', 'system', true, 'success', { pdc_current: 100 });
    addEvent(60, 'voice_call_completed', 'Monthly check-in call', 'AI voice agent completed routine monthly check-in. Patient reports feeling well, no side effects. Sentiment: positive (87%).', 'voice', true, 'success', { sentiment: 87, duration_min: 3.5 });
    addEvent(70, 'refill_confirmed', 'Auto-refill confirmed', 'Patient opted into auto-refill. No further reminders needed for refills.', 'system', true, 'success');
    addEvent(84, 'adherence_milestone', '90-day adherence milestone', `${patient.firstName} has maintained 100% PDC for 90 days. Program status: Graduated to low-touch cadence.`, 'system', true, 'success', { pdc_current: 100, milestone: '90_day' });
  } else if (patient.adherenceRate > 70) {
    // MODERATE - some bumps, interventions work
    addEvent(4, 'sms_response_received', 'Patient responded', '"Thanks, got it."', 'sms', false, 'success');
    addEvent(14, 'sms_check_in', 'Dose day reminder', 'Automated dose reminder sent.', 'sms', true, 'neutral');
    addEvent(14, 'dose_confirmed', 'Dose confirmed', 'Patient confirmed via SMS.', 'sms', false, 'success', { pdc_current: 100 });
    addEvent(28, 'sms_check_in', 'Dose day reminder', 'Automated dose reminder sent. No response after 4 hours.', 'sms', true, 'warning');
    addEvent(29, 'sms_check_in', 'Follow-up SMS', `"Hi ${patient.firstName}, we noticed you haven't confirmed your dose. Everything okay?"`, 'sms', true, 'warning');
    addEvent(29, 'dose_missed', 'Dose not confirmed', 'No response to 2 SMS reminders. Dose marked as potentially missed.', 'system', true, 'problem', { pdc_current: 86 });
    addEvent(30, 'escalation_sms_to_voice', 'Auto-escalation: SMS to voice', 'System detected 2 unanswered SMS. AI voice call automatically scheduled.', 'system', true, 'warning');
    addEvent(30, 'voice_call_completed', 'AI follow-up call', `AI agent reached ${patient.firstName}. Patient said they forgot due to busy weekend but took the dose a day late. Side effect check: mild injection site redness, assessed as normal.`, 'voice', true, 'success', { sentiment: 72, duration_min: 4.2 });
    addEvent(30, 'dose_confirmed', 'Late dose confirmed', 'Dose confirmed via voice call (1 day late). PDC adjusted.', 'system', true, 'neutral', { pdc_current: 93 });
    addEvent(42, 'dose_confirmed', 'Dose confirmed', 'On-time dose confirmed via SMS.', 'sms', false, 'success');
    addEvent(50, 'side_effect_reported', 'Side effect reported via SMS', `Patient texted: "Having some headaches lately, is that normal?"`, 'sms', false, 'warning');
    addEvent(50, 'side_effect_assessed', 'AI side effect assessment', 'System classified headache as known mild side effect (severity: low). Sent educational content and monitoring plan.', 'system', true, 'neutral', { severity: 'low', side_effect: 'headache' });
    addEvent(56, 'dose_confirmed', 'Dose confirmed', 'On-time, patient mentioned headaches subsiding.', 'sms', false, 'success');
    addEvent(60, 'voice_call_completed', 'Monthly check-in', 'AI voice call. Patient doing well, headaches resolved. Discussed injection rotation tips.', 'voice', true, 'success', { sentiment: 81, duration_min: 5.1 });
    addEvent(70, 'refill_reminder', 'Refill reminder', 'Automated refill reminder sent.', 'sms', true, 'neutral');
    addEvent(72, 'refill_confirmed', 'Refill confirmed', 'Patient ordered refill.', 'system', true, 'success');
  } else if (patient.adherenceRate > 55) {
    // AT RISK - multiple interventions, some work
    addEvent(5, 'sms_check_in', 'Welcome follow-up', 'No response to welcome SMS after 4 days.', 'sms', true, 'warning');
    addEvent(14, 'sms_check_in', 'Dose day reminder', 'Sent. No response.', 'sms', true, 'warning');
    addEvent(15, 'sms_check_in', 'Follow-up SMS', 'Second reminder sent. No response.', 'sms', true, 'problem');
    addEvent(16, 'escalation_sms_to_voice', 'Auto-escalation: SMS to voice', 'System detected no SMS responses in 16 days. AI voice call scheduled.', 'system', true, 'warning');
    addEvent(16, 'voice_call_no_answer', 'Voice call - no answer', 'AI agent attempted call. No answer. Voicemail left.', 'voice', true, 'problem');
    addEvent(17, 'voice_call_completed', 'Voice call - connected', `Reached ${patient.firstName} on second attempt. Patient forgot about the program. Reviewed medication schedule and benefits. Patient agreed to try SMS reminders again.`, 'voice', true, 'success', { sentiment: 58, duration_min: 7.3 });
    addEvent(17, 'patient_re_engaged', 'Patient re-engaged', 'Patient confirmed they will resume medication schedule.', 'system', true, 'success');
    addEvent(28, 'sms_check_in', 'Dose reminder', 'Sent.', 'sms', true, 'neutral');
    addEvent(28, 'dose_confirmed', 'Dose confirmed', 'Patient replied YES. First confirmed dose since enrollment.', 'sms', false, 'success', { pdc_current: 50 });
    addEvent(42, 'dose_missed', 'Dose missed', 'No response to dose reminder. No follow-up response to second SMS.', 'system', true, 'problem', { pdc_current: 43 });
    addEvent(43, 'voice_call_completed', 'AI intervention call', `Patient said they ran out of medication and hasn't ordered a refill because of insurance confusion.`, 'voice', true, 'warning', { sentiment: 45, duration_min: 8.1 });
    addEvent(43, 'escalation_to_pharmacist', 'Auto-escalation to pharmacist', 'System detected insurance/access barrier. Escalated to pharmacist for prior authorization support.', 'system', true, 'warning');
    addEvent(44, 'pharmacist_intervention', 'Pharmacist resolved insurance issue', 'Pharmacist called insurance, confirmed coverage active. Refill initiated. Called patient to confirm.', 'pharmacist', false, 'success');
    addEvent(46, 'refill_confirmed', 'Refill delivered', 'Medication delivered to patient. SMS confirmation received.', 'system', true, 'success');
    addEvent(56, 'dose_confirmed', 'Dose confirmed', 'Back on track after pharmacist intervention.', 'sms', false, 'success', { pdc_current: 57 });
  } else {
    // NON-ADHERENT - escalation through all channels
    addEvent(14, 'sms_check_in', 'Dose reminder', 'Sent. No response.', 'sms', true, 'warning');
    addEvent(15, 'sms_check_in', 'Follow-up', 'No response.', 'sms', true, 'problem');
    addEvent(16, 'escalation_sms_to_voice', 'Auto-escalation to voice', '2 unanswered SMS triggered voice call.', 'system', true, 'warning');
    addEvent(16, 'voice_call_no_answer', 'Voice call - no answer', 'No answer. Voicemail left.', 'voice', true, 'problem');
    addEvent(18, 'voice_call_no_answer', 'Voice call retry - no answer', 'Second attempt. No answer.', 'voice', true, 'problem');
    addEvent(20, 'escalation_voice_to_mail', 'Auto-escalation to physical mail', 'Patient unreachable via SMS (2) and voice (2). Physical mail intervention triggered.', 'system', true, 'warning');
    addEvent(20, 'mail_sent', 'Personalized letter mailed', 'Letter with medication information, pharmacy contact, refill instructions, and a pre-paid return envelope sent via USPS.', 'mail', true, 'neutral');
    addEvent(25, 'mail_delivered', 'Letter delivered', 'USPS confirms delivery.', 'mail', true, 'neutral');
    addEvent(28, 'dose_missed', 'Dose missed (2nd consecutive)', 'No contact from patient across any channel for 28 days.', 'system', true, 'problem', { pdc_current: 0 });
    addEvent(30, 'escalation_to_pharmacist', 'Escalated to pharmacist review', 'System flagged: patient unreachable across all channels for 30 days. Pharmacist outreach required.', 'system', true, 'problem');
    addEvent(32, 'pharmacist_intervention', 'Pharmacist manual outreach', `Pharmacist reached ${patient.firstName} via alternate phone number from pharmacy records. Patient was hospitalized (unrelated) and missed doses. Coordinating with hospital pharmacy.`, 'pharmacist', false, 'warning');
    addEvent(40, 'patient_re_engaged', 'Patient discharged, re-engaged', 'Patient back home and ready to resume medication. New welcome SMS sent.', 'system', true, 'success');
    addEvent(42, 'dose_confirmed', 'First dose after gap', 'Dose confirmed. Restarting adherence tracking.', 'sms', false, 'success', { pdc_current: 14 });
  }

  return events;
}

export const journeyEvents: JourneyEvent[] = patients.flatMap((p, i) => generateJourney(p, i));

// Sort by date descending
journeyEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// ─── Journey stage for each patient ───
export type JourneyStage = 'onboarding' | 'active_monitoring' | 'intervention' | 're_engagement' | 'graduated';

export function getPatientStage(patientId: string): JourneyStage {
  const events = journeyEvents.filter((e) => e.patientId === patientId);
  if (events.length === 0) return 'onboarding';
  const latest = events[0];
  if (latest.type === 'adherence_milestone') return 'graduated';
  if (latest.type === 'patient_re_engaged' || latest.type === 'pharmacist_intervention') return 're_engagement';
  if (['escalation_sms_to_voice', 'escalation_voice_to_mail', 'escalation_to_pharmacist', 'voice_call_no_answer', 'dose_missed', 'refill_overdue', 'side_effect_reported'].includes(latest.type)) return 'intervention';
  if (['enrolled', 'welcome_kit_sent', 'welcome_kit_delivered', 'first_sms_sent'].includes(latest.type)) return 'onboarding';
  return 'active_monitoring';
}

// ─── Dashboard aggregate stats ───
const computedAvgAdherence = Math.round(patients.reduce((sum, p) => sum + p.adherenceRate, 0) / patients.length * 10) / 10;
const BASELINE_ADHERENCE = 78.2; // Industry baseline before Adhery (US commercial claims benchmark)

// Monthly trend: from baseline to current computed average over 6 months
const adherenceImprovement = computedAvgAdherence - BASELINE_ADHERENCE;
const monthlyTrend = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'].map((month, i) => {
  const progress = (i + 1) / 6;
  // Slightly accelerating curve (early gains come faster)
  const rate = Math.round((BASELINE_ADHERENCE + adherenceImprovement * Math.pow(progress, 0.8)) * 10) / 10;
  return { month, rate };
});

export const dashboardStats = {
  totalPatients: patients.length,
  activePatients: patients.filter((p) => p.status === 'active').length,
  atRiskPatients: patients.filter((p) => p.status === 'at_risk').length,
  avgAdherence: computedAvgAdherence,
  baselineAdherence: BASELINE_ADHERENCE,
  openAlerts: alerts.filter((a) => a.status === 'open').length,
  channelBreakdown: {
    sms: interactions.filter((i) => i.channel === 'sms').length,
    voice: interactions.filter((i) => i.channel === 'voice').length,
    mail: interactions.filter((i) => i.channel === 'mail').length,
  },
  monthlyAdherence: monthlyTrend,
};
