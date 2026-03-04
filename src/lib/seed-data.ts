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
  activePatients: 48,
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

export const patients: Patient[] = firstNames.map((first, i) => {
  const adherence = 50 + Math.random() * 50;
  const risk = adherence < 70 ? 80 + Math.random() * 20 : adherence < 85 ? 40 + Math.random() * 30 : Math.random() * 30;
  const statuses: Patient['status'][] = adherence < 60 ? ['non_adherent'] : adherence < 75 ? ['at_risk'] : adherence > 95 ? ['graduated'] : ['active'];
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

// ─── Dashboard aggregate stats ───
export const dashboardStats = {
  totalPatients: patients.length,
  activePatients: patients.filter((p) => p.status === 'active').length,
  atRiskPatients: patients.filter((p) => p.status === 'at_risk').length,
  avgAdherence: Math.round(patients.reduce((sum, p) => sum + p.adherenceRate, 0) / patients.length * 10) / 10,
  openAlerts: alerts.filter((a) => a.status === 'open').length,
  channelBreakdown: {
    sms: interactions.filter((i) => i.channel === 'sms').length,
    voice: interactions.filter((i) => i.channel === 'voice').length,
    mail: interactions.filter((i) => i.channel === 'mail').length,
  },
  monthlyAdherence: [
    { month: 'Sep', rate: 78.2 },
    { month: 'Oct', rate: 81.5 },
    { month: 'Nov', rate: 84.1 },
    { month: 'Dec', rate: 86.7 },
    { month: 'Jan', rate: 89.3 },
    { month: 'Feb', rate: 91.3 },
  ],
};
