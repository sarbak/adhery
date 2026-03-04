'use client';

import { patients, journeyEvents, getPatientStage, dashboardStats, interactions, drugProgram } from '@/lib/seed-data';
import type { JourneyStage } from '@/lib/seed-data';

// Program scale - the overview shows full program metrics, not just detailed sample patients
const PROGRAM_PATIENTS = drugProgram.activePatients; // 2,000

// Compute journey-based metrics from sample data
const stages = patients.map((p) => getPatientStage(p.id));
const stageCounts: Record<JourneyStage, number> = {
  onboarding: stages.filter((s) => s === 'onboarding').length,
  active_monitoring: stages.filter((s) => s === 'active_monitoring').length,
  intervention: stages.filter((s) => s === 'intervention').length,
  re_engagement: stages.filter((s) => s === 're_engagement').length,
  graduated: stages.filter((s) => s === 'graduated').length,
};

const automatedEvents = journeyEvents.filter((e) => e.automated);
const totalInterventions = journeyEvents.filter((e) =>
  ['escalation_sms_to_voice', 'escalation_voice_to_mail', 'escalation_to_pharmacist', 'voice_call_completed', 'side_effect_assessed', 'pharmacist_intervention'].includes(e.type)
);
const successfulInterventions = totalInterventions.filter((e) => e.outcome === 'success');
const reEngagements = journeyEvents.filter((e) => e.type === 'patient_re_engaged');
const dosesConfirmed = journeyEvents.filter((e) => e.type === 'dose_confirmed');
const dosesMissed = journeyEvents.filter((e) => e.type === 'dose_missed');
const sideEffectsCaught = journeyEvents.filter((e) => e.type === 'side_effect_reported');

// Scale factor: sample patients → program scale
const scaleFactor = PROGRAM_PATIENTS / patients.length;

// Cost model
const CALLS_PER_PATIENT_YEAR = 13;
const COST_PER_MANUAL_CALL = 10;
const MANUAL_COST_PER_PATIENT_YEAR = CALLS_PER_PATIENT_YEAR * COST_PER_MANUAL_CALL; // $130

// Adhery cost per patient (COGS ~$12)
const ADHERY_COST_PER_PATIENT_YEAR = 12;
const SAVINGS_PER_PATIENT = MANUAL_COST_PER_PATIENT_YEAR - ADHERY_COST_PER_PATIENT_YEAR; // $118
const TOTAL_SAVINGS = SAVINGS_PER_PATIENT * PROGRAM_PATIENTS;

// Drug revenue preserved (12% at-risk, 50% re-engaged)
const DRUG_ANNUAL_COST = 80000;
const AT_RISK_PCT = 0.12;
const RE_ENGAGEMENT_RATE = 0.50;
const patientsAtRisk = Math.round(PROGRAM_PATIENTS * AT_RISK_PCT);
const patientsReEngaged = Math.round(patientsAtRisk * RE_ENGAGEMENT_RATE);
const revenuePreserved = patientsReEngaged * DRUG_ANNUAL_COST;

// Adherence metrics from computed data
const baselinePDC = dashboardStats.baselineAdherence;
const currentPDC = dashboardStats.avgAdherence;
const improvement = Math.round((currentPDC - baselinePDC) * 10) / 10;
const pctAdherentBefore = 54;
const pctAdherentNow = Math.round((patients.filter((p) => p.adherenceRate >= 80).length / patients.length) * 100);
const patientsAdherentNow = Math.round(PROGRAM_PATIENTS * pctAdherentNow / 100);
const patientsAdherentBefore = Math.round(PROGRAM_PATIENTS * pctAdherentBefore / 100);
const newlyAdherent = patientsAdherentNow - patientsAdherentBefore;

// Calls eliminated
const callsEliminated = CALLS_PER_PATIENT_YEAR * PROGRAM_PATIENTS;

// Patient distribution buckets
const buckets = [
  { label: '<60%', range: [0, 60] as [number, number], color: 'bg-red-500', textColor: 'text-red-600' },
  { label: '60-79%', range: [60, 80] as [number, number], color: 'bg-amber-400', textColor: 'text-amber-600' },
  { label: '80-89%', range: [80, 90] as [number, number], color: 'bg-green-400', textColor: 'text-green-600' },
  { label: '90%+', range: [90, 101] as [number, number], color: 'bg-accent', textColor: 'text-accent' },
];
const bucketCounts = buckets.map((b) => ({
  ...b,
  count: patients.filter((p) => p.adherenceRate >= b.range[0] && p.adherenceRate < b.range[1]).length,
  scaled: Math.round(patients.filter((p) => p.adherenceRate >= b.range[0] && p.adherenceRate < b.range[1]).length * scaleFactor),
}));
const maxBucket = Math.max(...bucketCounts.map((b) => b.scaled));

const stageConfig: Record<JourneyStage, { label: string; color: string; bgColor: string }> = {
  onboarding: { label: 'Onboarding', color: 'text-blue-600', bgColor: 'bg-blue-50' },
  active_monitoring: { label: 'Active & Adherent', color: 'text-green-600', bgColor: 'bg-green-50' },
  intervention: { label: 'In Intervention', color: 'text-amber-600', bgColor: 'bg-amber-50' },
  re_engagement: { label: 'Re-engaged', color: 'text-purple-600', bgColor: 'bg-purple-50' },
  graduated: { label: 'Graduated', color: 'text-teal-600', bgColor: 'bg-teal-50' },
};

const stageOrder: JourneyStage[] = ['onboarding', 'active_monitoring', 'intervention', 're_engagement', 'graduated'];
const scaledStageCounts = Object.fromEntries(stageOrder.map((s) => [s, Math.round(stageCounts[s] * scaleFactor)]));
const maxStageCount = Math.max(...Object.values(scaledStageCounts));

// Recent automated activity
const recentEvents = journeyEvents
  .filter((e) => e.automated)
  .slice(0, 8);

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000).toLocaleString()}K`;
  return `$${n}`;
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

export default function OverviewPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Program Impact</h1>
          <p className="text-xs text-text-muted">Humira Adherence Program - BioVista Specialty Pharmacy - {PROGRAM_PATIENTS.toLocaleString()} enrolled patients</p>
        </div>
        <div className="text-xs text-text-muted">
          Last updated: Mar 4, 2026
        </div>
      </div>

      {/* ━━━ SINGLE HERO: All Impact Numbers ━━━ */}
      <div className="relative overflow-hidden bg-gradient-to-br from-accent/5 via-white to-green-50 border border-accent/20 rounded-2xl p-8 mb-8">
        <div className="relative z-10">
          {/* Top row: Two giant numbers side by side */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Annual savings */}
            <div>
              <p className="text-[10px] font-medium text-accent uppercase tracking-widest mb-2">Annual Cost Savings</p>
              <p className="text-6xl lg:text-7xl font-bold text-foreground tracking-tight">
                {formatCurrency(TOTAL_SAVINGS)}
              </p>
              <p className="text-sm text-text-secondary mt-1">
                ${SAVINGS_PER_PATIENT}/patient saved across {PROGRAM_PATIENTS.toLocaleString()} patients
              </p>
            </div>
            {/* Drug revenue preserved */}
            <div>
              <p className="text-[10px] font-medium text-purple-600 uppercase tracking-widest mb-2">Drug Revenue Preserved</p>
              <p className="text-6xl lg:text-7xl font-bold text-purple-600 tracking-tight">
                {formatCurrency(revenuePreserved)}
              </p>
              <p className="text-sm text-text-secondary mt-1">
                {patientsReEngaged} patients re-engaged at ${(DRUG_ANNUAL_COST / 1000).toFixed(0)}K/yr each
              </p>
            </div>
          </div>

          {/* Adherence before → after */}
          <div className="bg-white/80 backdrop-blur rounded-xl p-6 border border-border-light mb-6">
            <div className="flex items-center gap-8 lg:gap-12">
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#fee2e2" strokeWidth="2.5" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray={`${baselinePDC} ${100 - baselinePDC}`} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-red-500">{baselinePDC}%</span>
                    <span className="text-[9px] text-text-muted">before</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <div>
                  <p className="text-4xl lg:text-5xl font-bold text-green-600">+{improvement}<span className="text-2xl">pp</span></p>
                  <p className="text-[10px] text-text-muted">adherence improvement</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#d1fae5" strokeWidth="2.5" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#0d7377" strokeWidth="2.5" strokeDasharray={`${currentPDC} ${100 - currentPDC}`} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-accent">{currentPDC}%</span>
                    <span className="text-[9px] text-text-muted">with Adhery</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 text-right">
                <p className="text-3xl font-bold text-green-600">{newlyAdherent.toLocaleString()}</p>
                <p className="text-xs text-text-secondary">more patients above 80% PDC</p>
                <p className="text-[10px] text-text-muted mt-1">{pctAdherentBefore}% {'\u2192'} {pctAdherentNow}% adherent</p>
              </div>
            </div>
          </div>

          {/* Key metrics grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/80 backdrop-blur rounded-xl p-4 border border-border-light text-center">
              <p className="text-[10px] text-text-muted uppercase tracking-wider">Manual Calls Eliminated</p>
              <p className="text-2xl font-bold text-foreground mt-1">{formatNumber(callsEliminated)}</p>
              <p className="text-[10px] text-text-muted">/year</p>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-xl p-4 border border-border-light text-center">
              <p className="text-[10px] text-text-muted uppercase tracking-wider">Patients Above 80% PDC</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{patientsAdherentNow.toLocaleString()}</p>
              <p className="text-[10px] text-text-muted">of {PROGRAM_PATIENTS.toLocaleString()}</p>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-xl p-4 border border-border-light text-center">
              <p className="text-[10px] text-text-muted uppercase tracking-wider">At-Risk Re-engaged</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">{patientsReEngaged}</p>
              <p className="text-[10px] text-text-muted">of {patientsAtRisk} at-risk</p>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-xl p-4 border border-border-light text-center">
              <p className="text-[10px] text-text-muted uppercase tracking-wider">Automation Rate</p>
              <p className="text-2xl font-bold text-accent mt-1">85%</p>
              <p className="text-[10px] text-text-muted">of interactions</p>
            </div>
          </div>
        </div>
        {/* Background decoration */}
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -left-8 -bottom-8 w-48 h-48 bg-green-100/50 rounded-full blur-3xl" />
      </div>

      {/* ━━━ Patient adherence distribution + Monthly trend ━━━ */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-border-light rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-foreground">Patient Adherence Distribution</p>
            <p className="text-[10px] text-text-muted">{PROGRAM_PATIENTS.toLocaleString()} patients</p>
          </div>
          <div className="flex items-end gap-3 h-32">
            {bucketCounts.map((b) => {
              const height = maxBucket > 0 ? (b.scaled / maxBucket) * 100 : 0;
              const isAdherent = b.range[0] >= 80;
              return (
                <div key={b.label} className="flex-1 flex flex-col items-center gap-1">
                  <span className={`text-sm font-bold ${b.textColor}`}>{b.scaled.toLocaleString()}</span>
                  <div className="w-full relative" style={{ height: `${height}%`, minHeight: b.scaled > 0 ? '8px' : 0 }}>
                    <div className={`w-full h-full ${b.color} rounded-t-md ${isAdherent ? 'opacity-100' : 'opacity-60'}`} />
                  </div>
                  <span className="text-[10px] text-text-muted">{b.label}</span>
                  {isAdherent && <span className="text-[8px] text-green-600">adherent</span>}
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-1 mt-3">
            <div className="flex-1 h-px bg-red-200" />
            <span className="text-[9px] text-red-400 px-2">non-adherent</span>
            <div className="w-px h-3 bg-gray-300" />
            <span className="text-[9px] text-green-600 px-2">adherent (PDC {'\u2265'} 80%)</span>
            <div className="flex-1 h-px bg-green-200" />
          </div>
        </div>

        <div className="bg-white border border-border-light rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-foreground">Monthly Adherence Trend</p>
            <span className="text-[10px] text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">+{improvement}pp over 6 months</span>
          </div>
          <div className="relative">
            <div className="absolute left-0 right-0 border-t-2 border-dashed border-red-300" style={{ bottom: `${((80 - 70) / 30) * 100}%` }}>
              <span className="absolute -top-3.5 right-0 text-[9px] text-red-400 bg-white/80 px-1 rounded">80% PDC threshold</span>
            </div>
            <div className="flex items-end gap-3 h-36">
              {dashboardStats.monthlyAdherence.map((d, i) => {
                const height = ((d.rate - 70) / 30) * 100;
                const isAboveThreshold = d.rate >= 80;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className={`text-xs font-bold ${isAboveThreshold ? 'text-accent' : 'text-red-500'}`}>{d.rate}%</span>
                    <div
                      className={`w-full rounded-t-md transition-all ${isAboveThreshold ? 'bg-accent' : 'bg-red-400'}`}
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-[10px] text-text-muted font-medium">{d.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ━━━ What the system does (intervention outcomes + funnel) ━━━ */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Patient Journey Funnel */}
        <div className="bg-white border border-border-light rounded-xl p-5">
          <p className="text-sm font-medium text-foreground mb-1">Patient Journey Funnel</p>
          <p className="text-[10px] text-text-muted mb-4">Where patients are in the automated process</p>
          <div className="space-y-3">
            {stageOrder.map((stage) => {
              const config = stageConfig[stage];
              const count = scaledStageCounts[stage];
              const pct = Math.round((count / PROGRAM_PATIENTS) * 100);
              const barWidth = maxStageCount > 0 ? (count / maxStageCount) * 100 : 0;
              return (
                <div key={stage}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
                    <span className="text-xs text-text-secondary">
                      {count.toLocaleString()} <span className="text-text-muted">({pct}%)</span>
                    </span>
                  </div>
                  <div className="h-6 bg-surface-warm rounded-md overflow-hidden">
                    <div
                      className={`h-full ${config.bgColor} rounded-md flex items-center px-2 transition-all`}
                      style={{ width: `${barWidth}%`, minWidth: count > 0 ? '2rem' : 0 }}
                    >
                      <span className={`text-[10px] font-medium ${config.color}`}>{count.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Intervention Success */}
        <div className="bg-white border border-border-light rounded-xl p-5">
          <p className="text-sm font-medium text-foreground mb-1">Automated Intervention Outcomes</p>
          <p className="text-[10px] text-text-muted mb-4">How the system handles problems without human involvement</p>
          <div className="space-y-4">
            {[
              {
                label: 'Missed doses recovered',
                value: Math.round(dosesConfirmed.length * scaleFactor),
                total: Math.round((dosesConfirmed.length + dosesMissed.length) * scaleFactor),
                description: 'SMS/voice follow-up brought patients back on schedule',
                color: 'bg-green-500',
              },
              {
                label: 'Escalations auto-resolved',
                value: Math.round(successfulInterventions.length * scaleFactor),
                total: Math.round(totalInterventions.length * scaleFactor),
                description: 'AI voice + SMS resolved without human contact',
                color: 'bg-accent',
              },
              {
                label: 'Side effects caught & triaged',
                value: Math.round(sideEffectsCaught.length * scaleFactor),
                total: Math.round(sideEffectsCaught.length * scaleFactor),
                description: 'Detected via SMS/voice, severity assessed automatically',
                color: 'bg-amber-500',
              },
              {
                label: 'Patients re-engaged after dropout',
                value: patientsReEngaged,
                total: patientsAtRisk,
                description: 'Multi-channel escalation brought patients back',
                color: 'bg-purple-500',
              },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-foreground">{item.label}</span>
                  <span className="text-xs font-semibold text-foreground">{item.value.toLocaleString()}/{item.total.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-surface-warm rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: `${item.total > 0 ? (item.value / item.total) * 100 : 0}%` }}
                  />
                </div>
                <p className="text-[10px] text-text-muted mt-0.5">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ━━━ Live automation feed ━━━ */}
      <div className="bg-white border border-border-light rounded-xl p-5">
        <p className="text-sm font-medium text-foreground mb-1">Live Automation Feed</p>
        <p className="text-[10px] text-text-muted mb-4">Recent automated actions taken by the system</p>
        <div className="space-y-2">
          {recentEvents.map((event) => {
            const patient = patients.find((p) => p.id === event.patientId);
            const outcomeColor = event.outcome === 'success' ? 'bg-green-500' : event.outcome === 'warning' ? 'bg-amber-500' : event.outcome === 'problem' ? 'bg-red-500' : 'bg-gray-400';
            const channelLabel: Record<string, string> = {
              sms: 'SMS',
              voice: 'Voice',
              mail: 'Mail',
              system: 'System',
              pharmacist: 'Pharmacist',
            };
            return (
              <div key={event.id} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-surface-warm transition-colors">
                <div className={`w-1.5 h-1.5 ${outcomeColor} rounded-full mt-1.5 flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-foreground">{event.title}</span>
                    {event.channel && (
                      <span className="text-[10px] text-text-muted bg-surface-warm px-1.5 py-0.5 rounded">
                        {channelLabel[event.channel] || event.channel}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-text-muted mt-0.5">
                    {patient?.firstName} {patient?.lastName} - {event.date}
                  </p>
                </div>
                <span className="text-[10px] text-accent bg-accent/5 px-2 py-0.5 rounded flex-shrink-0">
                  Automated
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
