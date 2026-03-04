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
const escalations = journeyEvents.filter((e) => e.type.startsWith('escalation_'));

// Cost model: industry avg 12-15 calls per patient at ~$8-12/call
const CALLS_PER_PATIENT_MANUAL = 13;
const COST_PER_CALL = 10;
const manualCostPerPatient = CALLS_PER_PATIENT_MANUAL * COST_PER_CALL;
const totalManualCost = manualCostPerPatient * patients.length;
const automatedTouchpoints = automatedEvents.length;
const COST_PER_AUTOMATED = 0.50; // SMS ~$0.02, voice ~$1.50, mail ~$2 avg
const totalAutomatedCost = automatedTouchpoints * COST_PER_AUTOMATED;
const costSavings = totalManualCost - totalAutomatedCost;
const costReduction = Math.round((costSavings / totalManualCost) * 100);

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

export default function OverviewPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Program Impact</h1>
          <p className="text-xs text-text-muted">Humira Adherence Program - BioVista Specialty Pharmacy</p>
        </div>
        <div className="text-xs text-text-muted">
          Last updated: Mar 4, 2026
        </div>
      </div>

      {/* Hero metrics - the CEO numbers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-border-light rounded-xl p-5">
          <p className="text-[10px] text-text-muted uppercase tracking-wider mb-2">Program Adherence</p>
          <p className="text-3xl font-bold text-accent">{dashboardStats.avgAdherence}%</p>
          <p className="text-xs text-green-600 mt-1">+13.1% since launch</p>
          <p className="text-[10px] text-text-muted mt-0.5">PDC above 80% threshold</p>
        </div>
        <div className="bg-white border border-border-light rounded-xl p-5">
          <p className="text-[10px] text-text-muted uppercase tracking-wider mb-2">Patients Enrolled</p>
          <p className="text-3xl font-bold text-foreground">{patients.length}</p>
          <p className="text-xs text-text-secondary mt-1">{stageCounts.graduated + stageCounts.active_monitoring} on track</p>
          <p className="text-[10px] text-text-muted mt-0.5">{stageCounts.intervention} receiving intervention</p>
        </div>
        <div className="bg-white border border-border-light rounded-xl p-5">
          <p className="text-[10px] text-text-muted uppercase tracking-wider mb-2">Cost per Patient</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-foreground">${Math.round(totalAutomatedCost / patients.length)}</p>
            <p className="text-sm text-text-muted line-through">${manualCostPerPatient}</p>
          </div>
          <p className="text-xs text-green-600 mt-1">{costReduction}% reduction</p>
          <p className="text-[10px] text-text-muted mt-0.5">vs. manual call center</p>
        </div>
        <div className="bg-white border border-border-light rounded-xl p-5">
          <p className="text-[10px] text-text-muted uppercase tracking-wider mb-2">Automated Touchpoints</p>
          <p className="text-3xl font-bold text-foreground">{automatedTouchpoints}</p>
          <p className="text-xs text-accent mt-1">0 manual calls needed</p>
          <p className="text-[10px] text-text-muted mt-0.5">SMS + voice + mail combined</p>
        </div>
      </div>

      {/* Before/After comparison strip */}
      <div className="bg-gradient-to-r from-red-50 to-green-50 border border-border-light rounded-xl p-5 mb-8">
        <p className="text-xs font-medium text-text-secondary mb-4 uppercase tracking-wider">Before Adhery vs. After</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Patient Adherence', before: '78%', after: `${dashboardStats.avgAdherence}%`, improved: true },
            { label: 'Cost per Patient/Year', before: `$${manualCostPerPatient}`, after: `$${Math.round(totalAutomatedCost / patients.length)}`, improved: true },
            { label: 'Side Effects Caught', before: '~30%', after: `${sideEffectsCaught.length} (100%)`, improved: true },
            { label: 'Patients Re-engaged', before: '0 (lost)', after: `${reEngagements.length} saved`, improved: true },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-[10px] text-text-muted mb-2">{item.label}</p>
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-sm text-red-400 line-through">{item.before}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500 flex-shrink-0">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-green-600">{item.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
                    </div>
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
                total: patients.filter((p) => p.status === 'at_risk' || p.status === 'non_adherent').length,
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

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Adherence Trend */}
        <div className="bg-white border border-border-light rounded-xl p-5">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-medium text-foreground">Adherence Trend (PDC)</p>
            <span className="text-[10px] text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">Trending up</span>
          </div>
          <p className="text-[10px] text-text-muted mb-4">Proportion of Days Covered - 80% is the clinical threshold</p>
          <div className="relative">
            {/* 80% threshold line */}
            <div className="absolute left-0 right-0 border-t border-dashed border-red-300" style={{ bottom: `${((80 - 70) / 30) * 100}%` }}>
              <span className="absolute -top-3 right-0 text-[9px] text-red-400">80% PDC threshold</span>
            </div>
            <div className="flex items-end gap-3 h-36">
              {dashboardStats.monthlyAdherence.map((d, i) => {
                const height = ((d.rate - 70) / 30) * 100;
                const isAboveThreshold = d.rate >= 80;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] font-medium text-foreground">{d.rate}%</span>
                    <div
                      className={`w-full rounded-t-md transition-all ${isAboveThreshold ? 'bg-accent' : 'bg-red-400'}`}
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-[10px] text-text-muted">{d.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Channel ROI */}
        <div className="bg-white border border-border-light rounded-xl p-5">
          <p className="text-sm font-medium text-foreground mb-1">Channel Performance</p>
          <p className="text-[10px] text-text-muted mb-4">Automated touchpoints by channel with response rates</p>
          <div className="space-y-4">
            {[
              {
                channel: 'SMS / iMessage',
                count: dashboardStats.channelBreakdown.sms,
                responseRate: 80,
                costPer: '$0.02',
                color: 'bg-blue-500',
                description: 'Dose reminders, check-ins, refill alerts',
              },
              {
                channel: 'AI Voice Calls',
                count: dashboardStats.channelBreakdown.voice,
                responseRate: 72,
                costPer: '$1.50',
                color: 'bg-green-500',
                description: 'Monthly check-ins, escalation follow-ups, side effect triage',
              },
              {
                channel: 'Physical Mail',
                count: dashboardStats.channelBreakdown.mail,
                responseRate: 45,
                costPer: '$2.00',
                color: 'bg-amber-500',
                description: 'Welcome kits, last-resort outreach for unreachable patients',
              },
            ].map((ch) => {
              const total = dashboardStats.channelBreakdown.sms + dashboardStats.channelBreakdown.voice + dashboardStats.channelBreakdown.mail;
              const pct = Math.round((ch.count / total) * 100);
              return (
                <div key={ch.channel} className="flex items-start gap-3">
                  <div className={`w-2 h-2 ${ch.color} rounded-full mt-1.5 flex-shrink-0`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-foreground">{ch.channel}</span>
                      <span className="text-xs text-text-secondary">{ch.count} touchpoints ({pct}%)</span>
                    </div>
                    <p className="text-[10px] text-text-muted mt-0.5">{ch.description}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-[10px] text-text-muted">Response: <span className="text-foreground font-medium">{ch.responseRate}%</span></span>
                      <span className="text-[10px] text-text-muted">Cost: <span className="text-foreground font-medium">{ch.costPer}/msg</span></span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cost savings summary */}
      <div className="bg-white border border-accent/20 rounded-xl p-5 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Projected Annual Savings</p>
            <p className="text-[10px] text-text-muted">Based on {patients.length} patients, replacing {CALLS_PER_PATIENT_MANUAL} manual calls/patient/year at ${COST_PER_CALL}/call</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-accent">${costSavings.toLocaleString()}</p>
            <p className="text-[10px] text-text-muted">saved annually</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border-light">
          <div>
            <p className="text-[10px] text-text-muted">Manual call center cost</p>
            <p className="text-sm font-semibold text-red-500">${totalManualCost.toLocaleString()}/yr</p>
          </div>
          <div>
            <p className="text-[10px] text-text-muted">Adhery automated cost</p>
            <p className="text-sm font-semibold text-green-600">${Math.round(totalAutomatedCost).toLocaleString()}/yr</p>
          </div>
          <div>
            <p className="text-[10px] text-text-muted">Manual calls eliminated</p>
            <p className="text-sm font-semibold text-foreground">{(CALLS_PER_PATIENT_MANUAL * patients.length).toLocaleString()} calls/yr</p>
          </div>
        </div>
      </div>

      {/* Recent automated activity feed */}
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
