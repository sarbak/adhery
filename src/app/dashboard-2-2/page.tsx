import Link from 'next/link';
import { kpiData } from '@/lib/seed-data-v2';

function TrendArrow({ delta }: { delta: number }) {
  const up = delta >= 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${up ? 'text-green-600' : 'text-red-500'}`}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d={up ? 'M5 1L9 6H1L5 1Z' : 'M5 9L1 4H9L5 9Z'} fill="currentColor" />
      </svg>
      {up ? '+' : ''}{typeof delta === 'number' && delta % 1 !== 0 ? delta.toFixed(1) : delta}
    </span>
  );
}

interface KpiCardProps {
  label: string;
  value: string;
  delta: number;
  href?: string;
  unit?: string;
}

function KpiCard({ label, value, delta, href, unit }: KpiCardProps) {
  const content = (
    <div className={`bg-white border border-border-light p-5 transition-colors ${href ? 'hover:border-accent cursor-pointer' : ''}`}>
      <p className="text-[11px] font-medium text-text-secondary uppercase tracking-wide">{label}</p>
      <div className="flex items-end gap-2 mt-1.5">
        <span className="text-2xl font-bold text-foreground leading-none">{value}{unit}</span>
        <TrendArrow delta={delta} />
      </div>
    </div>
  );

  if (href) return <Link href={href}>{content}</Link>;
  return content;
}

export default function MacroView() {
  const d = kpiData;

  return (
    <div>
      <h1 className="text-lg font-semibold text-foreground">Program Overview</h1>

      {/* Hero: 3 big numbers */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white border border-border-light p-8">
          <p className="text-[11px] font-medium text-text-secondary uppercase tracking-wide">Total Patients</p>
          <span className="text-5xl font-bold text-foreground leading-none mt-2 block">{d.totalPatients.toLocaleString()}</span>
        </div>
        <div className="bg-white border border-border-light p-8">
          <p className="text-[11px] font-medium text-text-secondary uppercase tracking-wide">30-Day Adherence</p>
          <div className="flex items-end gap-3 mt-2">
            <span className="text-5xl font-bold text-foreground leading-none">{d.adherence30d.value}%</span>
            <TrendArrow delta={d.adherence30d.delta} />
          </div>
        </div>
        <div className="bg-white border border-border-light p-8">
          <p className="text-[11px] font-medium text-text-secondary uppercase tracking-wide">90-Day Adherence</p>
          <div className="flex items-end gap-3 mt-2">
            <span className="text-5xl font-bold text-foreground leading-none">{d.adherence90d.value}%</span>
            <TrendArrow delta={d.adherence90d.delta} />
          </div>
        </div>
      </div>

      {/* Secondary: left 3 + right 2 */}
      <div className="grid grid-cols-5 gap-4 mt-4">
        <KpiCard
          label="Patients Retained"
          value={d.retained.value.toLocaleString()}
          delta={d.retained.delta}
          href="/dashboard-2-2/patients?status=retained"
        />
        <KpiCard
          label="Flagged for Risk"
          value={String(d.flagged.value)}
          delta={d.flagged.delta}
          href="/dashboard-2-2/patients?status=risk"
        />
        <KpiCard
          label="Dropped Off"
          value={String(d.droppedOff.value)}
          delta={d.droppedOff.delta}
          href="/dashboard-2-2/patients?status=dropped"
        />
        <KpiCard
          label="Escalations"
          value={String(d.escalations.value)}
          delta={d.escalations.delta}
        />
        <KpiCard
          label="Conversations"
          value={d.conversations.value.toLocaleString()}
          delta={d.conversations.delta}
        />
      </div>
    </div>
  );
}
