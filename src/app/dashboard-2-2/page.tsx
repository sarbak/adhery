import Link from 'next/link';
import { kpiData } from '@/lib/seed-data-v2';

function TrendArrow({ trend, delta }: { trend: 'up' | 'down'; delta: number }) {
  const isPositive = trend === 'up';
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d={isPositive ? 'M6 2L10 7H2L6 2Z' : 'M6 10L2 5H10L6 10Z'}
          fill="currentColor"
        />
      </svg>
      {delta > 0 ? '+' : ''}{typeof delta === 'number' && delta % 1 !== 0 ? delta.toFixed(1) : delta}
    </span>
  );
}

interface KpiCardProps {
  label: string;
  value: string;
  delta: number;
  trend: 'up' | 'down';
  href?: string;
  subtitle?: string;
}

function KpiCard({ label, value, delta, trend, href, subtitle }: KpiCardProps) {
  const content = (
    <div className={`bg-white border border-border-light p-6 transition-colors ${href ? 'hover:border-accent cursor-pointer' : ''}`}>
      <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">{label}</p>
      <div className="flex items-end gap-3 mt-2">
        <span className="text-3xl font-bold text-foreground leading-none">{value}</span>
        <TrendArrow trend={trend} delta={delta} />
      </div>
      {subtitle && <p className="text-[11px] text-text-muted mt-2">{subtitle}</p>}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}

export default function MacroView() {
  const { adherenceRate, conversationsHandled, patientsFlagged, casesEscalated, retainedPatients } = kpiData;

  return (
    <div>
      <h1 className="text-lg font-semibold text-foreground">Program Overview</h1>
      <p className="text-sm text-text-secondary mt-1">30-day performance snapshot</p>

      {/* Hero KPI */}
      <div className="mt-8 bg-white border border-border-light p-8">
        <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">30-Day Adherence Rate</p>
        <div className="flex items-end gap-4 mt-3">
          <span className="text-6xl font-bold text-foreground leading-none">{adherenceRate.value}%</span>
          <TrendArrow trend={adherenceRate.trend} delta={adherenceRate.delta} />
        </div>
        <p className="text-sm text-text-muted mt-3">vs prior 30-day period</p>
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-4 gap-4 mt-4">
        <KpiCard
          label="Conversations Handled"
          value={conversationsHandled.value.toLocaleString()}
          delta={conversationsHandled.delta}
          trend={conversationsHandled.trend}
          subtitle="Automated outreach"
        />
        <KpiCard
          label="Patients Flagged for Risk"
          value={String(patientsFlagged.value)}
          delta={patientsFlagged.delta}
          trend={patientsFlagged.trend}
          href="/dashboard-2-2/risk"
          subtitle="Click to review"
        />
        <KpiCard
          label="Cases Escalated"
          value={String(casesEscalated.value)}
          delta={casesEscalated.delta}
          trend={casesEscalated.trend}
          subtitle="Referred to clinicians"
        />
        <KpiCard
          label="Retained Patients"
          value={retainedPatients.value.toLocaleString()}
          delta={retainedPatients.delta}
          trend={retainedPatients.trend}
          subtitle="Active in program"
        />
      </div>
    </div>
  );
}
