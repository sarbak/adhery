import Link from 'next/link';
import { riskPatients } from '@/lib/seed-data-v2';

const riskSeverityOrder: Record<string, number> = {
  'Missed 3+ doses': 0,
  'Reported side effects': 1,
  'Refill overdue': 2,
  'No response to outreach': 3,
};

function RiskBadge({ reason }: { reason: string }) {
  const colors: Record<string, string> = {
    'Missed 3+ doses': 'bg-red-50 text-red-700',
    'Reported side effects': 'bg-amber-50 text-amber-700',
    'Refill overdue': 'bg-orange-50 text-orange-700',
    'No response to outreach': 'bg-slate-100 text-slate-600',
  };
  return (
    <span className={`text-[11px] font-medium px-2 py-0.5 ${colors[reason] || 'bg-slate-100 text-slate-600'}`}>
      {reason}
    </span>
  );
}

export default function RiskPage() {
  const sorted = [...riskPatients].sort(
    (a, b) => (riskSeverityOrder[a.riskReason!] ?? 99) - (riskSeverityOrder[b.riskReason!] ?? 99)
  );

  return (
    <div>
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-6">
        <Link href="/dashboard-2-2" className="hover:text-accent transition-colors">Overview</Link>
        <span>/</span>
        <span className="text-foreground font-medium">Risk Patients</span>
      </nav>

      <h1 className="text-lg font-semibold text-foreground">Patients Flagged for Risk</h1>
      <p className="text-sm text-text-secondary mt-1">{sorted.length} patients need attention</p>

      {/* Table */}
      <div className="mt-6 bg-white border border-border-light">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-light">
              <th className="text-left text-[11px] font-medium text-text-secondary uppercase tracking-wide px-5 py-3">Patient Name</th>
              <th className="text-left text-[11px] font-medium text-text-secondary uppercase tracking-wide px-5 py-3">Risk Reason</th>
              <th className="text-left text-[11px] font-medium text-text-secondary uppercase tracking-wide px-5 py-3">Last Interaction</th>
              <th className="text-left text-[11px] font-medium text-text-secondary uppercase tracking-wide px-5 py-3">Adherence</th>
              <th className="text-right text-[11px] font-medium text-text-secondary uppercase tracking-wide px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((patient) => (
              <tr key={patient.id} className="border-b border-border-light last:border-b-0 hover:bg-surface-warm transition-colors">
                <td className="px-5 py-3.5">
                  <Link href={`/dashboard-2-2/patients/${patient.id}`} className="text-sm font-medium text-foreground hover:text-accent transition-colors">
                    {patient.firstName} {patient.lastName}
                  </Link>
                </td>
                <td className="px-5 py-3.5">
                  <RiskBadge reason={patient.riskReason!} />
                </td>
                <td className="px-5 py-3.5 text-sm text-text-secondary">
                  {patient.lastInteraction}
                </td>
                <td className="px-5 py-3.5">
                  <span className={`text-sm font-medium ${patient.adherenceRate < 60 ? 'text-red-600' : patient.adherenceRate < 80 ? 'text-amber-600' : 'text-green-600'}`}>
                    {patient.adherenceRate}%
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <Link
                    href={`/dashboard-2-2/patients/${patient.id}`}
                    className="text-xs font-medium text-accent hover:text-accent-dark transition-colors"
                  >
                    View →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
