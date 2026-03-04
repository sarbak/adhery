'use client';

import { dashboardStats, patients, alerts } from '@/lib/seed-data';

function StatCard({ label, value, sub, accent }: { label: string; value: string | number; sub?: string; accent?: boolean }) {
  return (
    <div className="bg-dash-bg-secondary border border-dash-border p-4">
      <p className="text-[10px] text-dash-text-muted uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-2xl font-bold ${accent ? 'text-dash-accent' : 'text-dash-text'}`}>{value}</p>
      {sub && <p className="text-xs text-dash-text-secondary mt-1">{sub}</p>}
    </div>
  );
}

function AdherenceChart() {
  const data = dashboardStats.monthlyAdherence;
  const max = 100;
  const min = 70;
  const range = max - min;

  return (
    <div className="bg-dash-bg-secondary border border-dash-border p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-dash-text">Adherence Trend</p>
        <p className="text-xs text-dash-text-muted">Last 6 months</p>
      </div>
      <div className="flex items-end gap-2 h-32">
        {data.map((d, i) => {
          const height = ((d.rate - min) / range) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] text-dash-text-secondary">{d.rate}%</span>
              <div
                className="w-full bg-dash-accent/80 transition-all"
                style={{ height: `${height}%` }}
              />
              <span className="text-[10px] text-dash-text-muted">{d.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChannelBreakdown() {
  const { sms, voice, mail } = dashboardStats.channelBreakdown;
  const total = sms + voice + mail;

  return (
    <div className="bg-dash-bg-secondary border border-dash-border p-4">
      <p className="text-sm font-medium text-dash-text mb-4">Channel Breakdown</p>
      <div className="space-y-3">
        {[
          { label: 'SMS/iMessage', count: sms, color: 'bg-blue-500' },
          { label: 'Voice Calls', count: voice, color: 'bg-green-500' },
          { label: 'Physical Mail', count: mail, color: 'bg-amber-500' },
        ].map((ch) => (
          <div key={ch.label}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-dash-text-secondary">{ch.label}</span>
              <span className="text-dash-text">{ch.count} <span className="text-dash-text-muted">({Math.round((ch.count / total) * 100)}%)</span></span>
            </div>
            <div className="h-1.5 bg-dash-bg-tertiary">
              <div className={`h-full ${ch.color}`} style={{ width: `${(ch.count / total) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentAlerts() {
  const openAlerts = alerts.filter((a) => a.status === 'open').slice(0, 5);

  const severityColor: Record<string, string> = {
    critical: 'text-red-400 bg-red-400/10',
    high: 'text-orange-400 bg-orange-400/10',
    medium: 'text-yellow-400 bg-yellow-400/10',
    low: 'text-dash-text-muted bg-dash-bg-tertiary',
  };

  const typeLabel: Record<string, string> = {
    missed_dose: 'Missed Dose',
    side_effect: 'Side Effect',
    unreachable: 'Unreachable',
    refill_gap: 'Refill Gap',
  };

  return (
    <div className="bg-dash-bg-secondary border border-dash-border p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-dash-text">Open Alerts</p>
        <a href="/dashboard/alerts" className="text-xs text-dash-accent hover:text-dash-accent-dim">View all &rarr;</a>
      </div>
      <div className="space-y-2">
        {openAlerts.map((alert) => {
          const patient = patients.find((p) => p.id === alert.patientId);
          return (
            <div key={alert.id} className="flex items-center gap-3 p-2 hover:bg-dash-bg-tertiary transition-colors">
              <span className={`text-[10px] font-medium px-2 py-0.5 ${severityColor[alert.severity]}`}>
                {alert.severity.toUpperCase()}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-dash-text truncate">
                  {patient?.firstName} {patient?.lastName}
                </p>
                <p className="text-[10px] text-dash-text-muted">{typeLabel[alert.type]}</p>
              </div>
              <span className="text-[10px] text-dash-text-muted">{alert.createdAt}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AtRiskPatients() {
  const atRisk = patients.filter((p) => p.status === 'at_risk' || p.status === 'non_adherent').slice(0, 5);

  return (
    <div className="bg-dash-bg-secondary border border-dash-border p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-dash-text">At-Risk Patients</p>
        <a href="/dashboard/patients" className="text-xs text-dash-accent hover:text-dash-accent-dim">View all &rarr;</a>
      </div>
      <div className="space-y-2">
        {atRisk.map((p) => (
          <div key={p.id} className="flex items-center gap-3 p-2 hover:bg-dash-bg-tertiary transition-colors">
            <div className="w-7 h-7 bg-dash-accent/10 text-dash-accent flex items-center justify-center text-[10px] font-bold flex-shrink-0">
              {p.firstName[0]}{p.lastName[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-dash-text">{p.firstName} {p.lastName}</p>
              <p className="text-[10px] text-dash-text-muted">Adherence: {p.adherenceRate}%</p>
            </div>
            <span className={`text-[10px] font-medium px-2 py-0.5 ${
              p.riskScore > 70 ? 'text-red-400 bg-red-400/10' : 'text-yellow-400 bg-yellow-400/10'
            }`}>
              Risk: {p.riskScore}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OverviewPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold text-dash-text">Overview</h1>
          <p className="text-xs text-dash-text-muted">Humira Adherence Program - BioVista Specialty Pharmacy</p>
        </div>
        <div className="text-xs text-dash-text-muted">
          Last updated: Mar 4, 2026
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        <StatCard label="Total Patients" value={dashboardStats.totalPatients} />
        <StatCard label="Active" value={dashboardStats.activePatients} sub="enrolled & engaged" />
        <StatCard label="At Risk" value={dashboardStats.atRiskPatients} sub="need attention" accent />
        <StatCard label="Avg Adherence" value={`${dashboardStats.avgAdherence}%`} sub="+13.1% since Sep" />
        <StatCard label="Open Alerts" value={dashboardStats.openAlerts} accent />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-3 mb-6">
        <AdherenceChart />
        <ChannelBreakdown />
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-2 gap-3">
        <RecentAlerts />
        <AtRiskPatients />
      </div>
    </div>
  );
}
