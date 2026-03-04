'use client';

import { patients, journeyEvents, getPatientStage, dashboardStats, interactions } from '@/lib/seed-data';
import type { JourneyStage } from '@/lib/seed-data';

// Compute journey-based metrics
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

// Cost model - industry benchmarks
// Source: pharma patient support = $2-3B on calls serving 1-3M patients
// Avg 12-15 calls per patient at $8-12/call (fully loaded call center cost)
const CALLS_PER_PATIENT_YEAR = 13;
const COST_PER_MANUAL_CALL = 10; // $10 fully loaded (agent salary + overhead + tech + QA)
const MANUAL_COST_PER_PATIENT_YEAR = CALLS_PER_PATIENT_YEAR * COST_PER_MANUAL_CALL; // $130

// Adhery automated cost per patient
const TOUCHPOINTS_PER_PATIENT = Math.round(automatedEvents.length / patients.length);
const SMS_COST = 0.02;
const VOICE_COST = 1.50;
const MAIL_COST = 2.00;
// Weighted avg based on channel mix: ~60% SMS, ~25% voice, ~15% mail
const AVG_COST_PER_TOUCHPOINT = (0.60 * SMS_COST) + (0.25 * VOICE_COST) + (0.15 * MAIL_COST);
const AUTOMATED_COST_PER_PATIENT_YEAR = Math.round(TOUCHPOINTS_PER_PATIENT * AVG_COST_PER_TOUCHPOINT * 100) / 100;
const SAVINGS_PER_PATIENT = MANUAL_COST_PER_PATIENT_YEAR - AUTOMATED_COST_PER_PATIENT_YEAR;
const SAVINGS_PCT = Math.round((SAVINGS_PER_PATIENT / MANUAL_COST_PER_PATIENT_YEAR) * 100);

// Scale projections
const currentPatients = patients.length;
const currentSavings = Math.round(SAVINGS_PER_PATIENT * currentPatients);
const projections = [
  { patients: 500, label: '500 patients' },
  { patients: 5000, label: '5,000 patients' },
  { patients: 50000, label: '50,000 patients' },
];

// Medication value saved: non-adherent patients who re-engaged
// Humira ~$80K/year, each re-engaged patient preserves that revenue
const DRUG_ANNUAL_COST = 80000;
const patientsAtRiskOrNonAdherent = patients.filter((p) => p.status === 'at_risk' || p.status === 'non_adherent').length;
const patientsReEngaged = reEngagements.length;
const revenuePreserved = patientsReEngaged * DRUG_ANNUAL_COST;

const stageConfig: Record<JourneyStage, { label: string; color: string; bgColor: string }> = {
  onboarding: { label: 'Onboarding', color: 'text-blue-600', bgColor: 'bg-blue-50' },
  active_monitoring: { label: 'Active & Adherent', color: 'text-green-600', bgColor: 'bg-green-50' },
  intervention: { label: 'In Intervention', color: 'text-amber-600', bgColor: 'bg-amber-50' },
  re_engagement: { label: 'Re-engaged', color: 'text-purple-600', bgColor: 'bg-purple-50' },
  graduated: { label: 'Graduated', color: 'text-teal-600', bgColor: 'bg-teal-50' },
};

const stageOrder: JourneyStage[] = ['onboarding', 'active_monitoring', 'intervention', 're_engagement', 'graduated'];
const maxStageCount = Math.max(...Object.values(stageCounts));

// Recent automated activity
const recentEvents = journeyEvents
  .filter((e) => e.automated)
  .slice(0, 8);

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

export default function OverviewPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Program Impact</h1>
          <p className="text-xs text-text-muted">Humira Adherence Program - BioVista Specialty Pharmacy</p>
        </div>
        <div className="text-xs text-text-muted">
          Last updated: Mar 4, 2026
        </div>
      </div>

      {/* ━━━ HERO: Giant savings number ━━━ */}
      <div className="relative overflow-hidden bg-gradient-to-br from-accent/5 via-white to-green-50 border border-accent/20 rounded-2xl p-8 mb-8">
        <div className="relative z-10">
          <p className="text-xs font-medium text-accent uppercase tracking-widest mb-3">Total Cost Savings from Automation</p>
          <div className="flex items-end gap-4 mb-2">
            <p className="text-6xl lg:text-7xl font-bold text-foreground tracking-tight">
              {formatCurrency(currentSavings)}
            </p>
            <p className="text-xl text-text-secondary mb-2">/year</p>
          </div>
          <p className="text-sm text-text-secondary mb-6">
            Replacing {(CALLS_PER_PATIENT_YEAR * currentPatients).toLocaleString()} manual call center calls with automated multi-channel outreach for {currentPatients} patients
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/80 backdrop-blur rounded-xl p-4 border border-border-light">
              <p className="text-[10px] text-text-muted uppercase tracking-wider">Manual Cost</p>
              <p className="text-xl font-bold text-red-500 line-through mt-1">${(MANUAL_COST_PER_PATIENT_YEAR * currentPatients).toLocaleString()}</p>
              <p className="text-[10px] text-text-muted mt-0.5">${MANUAL_COST_PER_PATIENT_YEAR}/patient x {currentPatients}</p>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-xl p-4 border border-border-light">
              <p className="text-[10px] text-text-muted uppercase tracking-wider">Adhery Cost</p>
              <p className="text-xl font-bold text-green-600 mt-1">${Math.round(AUTOMATED_COST_PER_PATIENT_YEAR * currentPatients).toLocaleString()}</p>
              <p className="text-[10px] text-text-muted mt-0.5">${AUTOMATED_COST_PER_PATIENT_YEAR.toFixed(2)}/patient x {currentPatients}</p>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-xl p-4 border border-border-light">
              <p className="text-[10px] text-text-muted uppercase tracking-wider">Cost Reduction</p>
              <p className="text-xl font-bold text-accent mt-1">{SAVINGS_PCT}%</p>
              <p className="text-[10px] text-text-muted mt-0.5">${SAVINGS_PER_PATIENT.toFixed(2)} saved/patient</p>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-xl p-4 border border-border-light">
              <p className="text-[10px] text-text-muted uppercase tracking-wider">Calls Eliminated</p>
              <p className="text-xl font-bold text-foreground mt-1">{(CALLS_PER_PATIENT_YEAR * currentPatients).toLocaleString()}</p>
              <p className="text-[10px] text-text-muted mt-0.5">{CALLS_PER_PATIENT_YEAR}/patient/year</p>
            </div>
          </div>
        </div>
        {/* Background decoration */}
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -left-8 -bottom-8 w-48 h-48 bg-green-100/50 rounded-full blur-3xl" />
      </div>

      {/* ━━━ HERO 2: Adherence Improvement ━━━ */}
      {(() => {
        const adherentBefore = Math.round(currentPatients * 0.54); // 54% baseline (US commercial claims benchmark)
        const adherentNow = patients.filter((p) => p.adherenceRate >= 80).length;
        const newlyAdherent = adherentNow - adherentBefore;
        const pctAdherentBefore = 54;
        const pctAdherentNow = Math.round((adherentNow / currentPatients) * 100);
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
        }));
        const maxBucket = Math.max(...bucketCounts.map((b) => b.count));

        return (
          <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-accent/5 border border-green-200/50 rounded-2xl p-8 mb-8">
            <div className="relative z-10">
              <p className="text-xs font-medium text-green-700 uppercase tracking-widest mb-3">Adherence Improvement</p>

              {/* Big before → after */}
              <div className="flex items-center gap-6 lg:gap-10 mb-8">
                <div className="text-center">
                  <p className="text-[10px] text-text-muted uppercase tracking-wider mb-2">Before Adhery</p>
                  <div className="relative w-32 h-32 lg:w-40 lg:h-40">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#fee2e2" strokeWidth="2.5" />
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="78.2 21.8" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl lg:text-5xl font-bold text-red-500">78%</span>
                      <span className="text-[10px] text-text-muted">avg PDC</span>
                    </div>
                  </div>
                  <p className="text-xs text-red-500 mt-2 font-medium">Below 80% threshold</p>
                  <p className="text-[10px] text-text-muted">{pctAdherentBefore}% of patients adherent</p>
                </div>

                <div className="flex-1 flex flex-col items-center py-4">
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-green-500 mb-3">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  <p className="text-5xl lg:text-6xl font-bold text-green-600">+13.1<span className="text-3xl">pp</span></p>
                  <p className="text-xs text-text-secondary mt-1">percentage point improvement</p>
                  <div className="mt-3 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                    <p className="text-[10px] text-green-700 text-center">
                      {newlyAdherent > 0 ? `${newlyAdherent} patients crossed the 80% PDC threshold` : 'Patients moving above 80% PDC threshold'}
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-[10px] text-text-muted uppercase tracking-wider mb-2">With Adhery</p>
                  <div className="relative w-32 h-32 lg:w-40 lg:h-40">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#d1fae5" strokeWidth="2.5" />
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#0d7377" strokeWidth="2.5" strokeDasharray={`${dashboardStats.avgAdherence} ${100 - dashboardStats.avgAdherence}`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl lg:text-5xl font-bold text-accent">{dashboardStats.avgAdherence}%</span>
                      <span className="text-[10px] text-text-muted">avg PDC</span>
                    </div>
                  </div>
                  <p className="text-xs text-green-600 mt-2 font-medium">Above 80% threshold</p>
                  <p className="text-[10px] text-text-muted">{pctAdherentNow}% of patients adherent</p>
                </div>
              </div>

              {/* Patient adherence distribution */}
              <div className="bg-white/80 backdrop-blur rounded-xl p-5 border border-border-light mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-foreground">Patient Adherence Distribution</p>
                  <p className="text-[10px] text-text-muted">PDC {'\u2265'} 80% is the clinical adherence threshold</p>
                </div>
                <div className="flex items-end gap-2 h-28">
                  {bucketCounts.map((b) => {
                    const height = maxBucket > 0 ? (b.count / maxBucket) * 100 : 0;
                    const isAdherent = b.range[0] >= 80;
                    return (
                      <div key={b.label} className="flex-1 flex flex-col items-center gap-1">
                        <span className={`text-xs font-bold ${b.textColor}`}>{b.count}</span>
                        <div className="w-full relative" style={{ height: `${height}%`, minHeight: b.count > 0 ? '8px' : 0 }}>
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

              {/* Monthly trend */}
              <div className="bg-white/80 backdrop-blur rounded-xl p-5 border border-border-light">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-foreground">Monthly Adherence Trend</p>
                  <span className="text-[10px] text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">+13.1pp over 6 months</span>
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
            {/* Background decoration */}
            <div className="absolute -right-16 -top-16 w-72 h-72 bg-green-100/40 rounded-full blur-3xl" />
            <div className="absolute -left-10 -bottom-10 w-56 h-56 bg-accent/5 rounded-full blur-3xl" />
          </div>
        );
      })()}

      {/* ━━━ Scale projections ━━━ */}
      <div className="bg-white border border-border-light rounded-xl p-6 mb-8">
        <p className="text-sm font-medium text-foreground mb-1">Savings at Scale</p>
        <p className="text-[10px] text-text-muted mb-5">Projected annual savings as your program grows</p>
        <div className="grid grid-cols-3 gap-4">
          {projections.map((p) => {
            const savings = Math.round(SAVINGS_PER_PATIENT * p.patients);
            const manualCost = MANUAL_COST_PER_PATIENT_YEAR * p.patients;
            const adhCost = Math.round(AUTOMATED_COST_PER_PATIENT_YEAR * p.patients);
            const callsEliminated = CALLS_PER_PATIENT_YEAR * p.patients;
            return (
              <div key={p.patients} className="bg-surface-warm rounded-xl p-5 text-center">
                <p className="text-xs text-text-muted mb-1">{p.label}</p>
                <p className="text-3xl font-bold text-accent mb-2">{formatCurrency(savings)}</p>
                <p className="text-[10px] text-text-muted">saved per year</p>
                <div className="border-t border-border-light mt-3 pt-3 space-y-1">
                  <p className="text-[10px] text-text-muted"><span className="text-red-500 line-through">{formatCurrency(manualCost)}</span> → <span className="text-green-600 font-medium">{formatCurrency(adhCost)}</span></p>
                  <p className="text-[10px] text-text-muted">{callsEliminated.toLocaleString()} calls eliminated</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 pt-4 border-t border-border-light">
          <p className="text-[10px] text-text-muted">
            Based on industry avg of {CALLS_PER_PATIENT_YEAR} manual calls/patient/year at ${COST_PER_MANUAL_CALL}/call (fully loaded). Adhery cost: SMS ${SMS_COST}, AI voice ${VOICE_COST.toFixed(2)}, mail ${MAIL_COST.toFixed(2)} per touchpoint.
          </p>
        </div>
      </div>

      {/* ━━━ Drug revenue preserved ━━━ */}
      <div className="bg-gradient-to-r from-purple-50 to-white border border-purple-200/50 rounded-xl p-6 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Drug Revenue Preserved</p>
            <p className="text-[10px] text-text-muted">Patients who would have dropped off without automated intervention</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-purple-600">{formatCurrency(revenuePreserved)}</p>
            <p className="text-[10px] text-text-muted">annual Rx revenue saved</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-purple-100">
          <div>
            <p className="text-[10px] text-text-muted">Patients at risk of dropout</p>
            <p className="text-lg font-bold text-amber-600">{patientsAtRiskOrNonAdherent}</p>
          </div>
          <div>
            <p className="text-[10px] text-text-muted">Re-engaged by automation</p>
            <p className="text-lg font-bold text-green-600">{patientsReEngaged}</p>
          </div>
          <div>
            <p className="text-[10px] text-text-muted">Humira annual cost/patient</p>
            <p className="text-lg font-bold text-foreground">${(DRUG_ANNUAL_COST).toLocaleString()}</p>
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
              const count = stageCounts[stage];
              const pct = Math.round((count / patients.length) * 100);
              const barWidth = maxStageCount > 0 ? (count / maxStageCount) * 100 : 0;
              return (
                <div key={stage}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
                    <span className="text-xs text-text-secondary">
                      {count} <span className="text-text-muted">({pct}%)</span>
                    </span>
                  </div>
                  <div className="h-6 bg-surface-warm rounded-md overflow-hidden">
                    <div
                      className={`h-full ${config.bgColor} rounded-md flex items-center px-2 transition-all`}
                      style={{ width: `${barWidth}%`, minWidth: count > 0 ? '2rem' : 0 }}
                    >
                      <span className={`text-[10px] font-medium ${config.color}`}>{count}</span>
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
                value: dosesConfirmed.length,
                total: dosesConfirmed.length + dosesMissed.length,
                description: 'SMS/voice follow-up brought patients back on schedule',
                color: 'bg-green-500',
              },
              {
                label: 'Escalations auto-resolved',
                value: successfulInterventions.length,
                total: totalInterventions.length,
                description: 'AI voice + SMS resolved without human contact',
                color: 'bg-accent',
              },
              {
                label: 'Side effects caught & triaged',
                value: sideEffectsCaught.length,
                total: sideEffectsCaught.length,
                description: 'Detected via SMS/voice, severity assessed automatically',
                color: 'bg-amber-500',
              },
              {
                label: 'Patients re-engaged after dropout',
                value: reEngagements.length,
                total: patientsAtRiskOrNonAdherent,
                description: 'Multi-channel escalation brought patients back',
                color: 'bg-purple-500',
              },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-foreground">{item.label}</span>
                  <span className="text-xs font-semibold text-foreground">{item.value}/{item.total}</span>
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

      {/* ━━━ Channel ROI ━━━ */}
      <div className="bg-white border border-border-light rounded-xl p-5 mb-8">
        <p className="text-sm font-medium text-foreground mb-1">Channel Cost Breakdown</p>
        <p className="text-[10px] text-text-muted mb-4">Cost per touchpoint by channel vs. manual call center equivalent</p>
        <div className="space-y-3">
          {[
            {
              channel: 'SMS / iMessage',
              count: dashboardStats.channelBreakdown.sms,
              costPer: SMS_COST,
              totalCost: dashboardStats.channelBreakdown.sms * SMS_COST,
              manualEquiv: dashboardStats.channelBreakdown.sms * COST_PER_MANUAL_CALL,
              color: 'bg-blue-500',
              responseRate: 80,
            },
            {
              channel: 'AI Voice Calls',
              count: dashboardStats.channelBreakdown.voice,
              costPer: VOICE_COST,
              totalCost: dashboardStats.channelBreakdown.voice * VOICE_COST,
              manualEquiv: dashboardStats.channelBreakdown.voice * COST_PER_MANUAL_CALL,
              color: 'bg-green-500',
              responseRate: 72,
            },
            {
              channel: 'Physical Mail',
              count: dashboardStats.channelBreakdown.mail,
              costPer: MAIL_COST,
              totalCost: dashboardStats.channelBreakdown.mail * MAIL_COST,
              manualEquiv: dashboardStats.channelBreakdown.mail * COST_PER_MANUAL_CALL,
              color: 'bg-amber-500',
              responseRate: 45,
            },
          ].map((ch) => {
            const savings = ch.manualEquiv - ch.totalCost;
            const savingsPct = Math.round((savings / ch.manualEquiv) * 100);
            return (
              <div key={ch.channel} className="flex items-center gap-4 p-3 bg-surface-warm rounded-lg">
                <div className={`w-2 h-10 ${ch.color} rounded-full flex-shrink-0`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground">{ch.channel}</span>
                    <span className="text-xs text-green-600 font-medium">saves {formatCurrency(savings)}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-[10px] text-text-muted">{ch.count} touchpoints</span>
                    <span className="text-[10px] text-text-muted">${ch.costPer.toFixed(2)}/each</span>
                    <span className="text-[10px] text-text-muted">Total: <span className="font-medium">${Math.round(ch.totalCost).toLocaleString()}</span></span>
                    <span className="text-[10px] text-red-400 line-through">Manual: ${ch.manualEquiv.toLocaleString()}</span>
                    <span className="text-[10px] text-text-muted">{ch.responseRate}% response</span>
                  </div>
                </div>
              </div>
            );
          })}
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
