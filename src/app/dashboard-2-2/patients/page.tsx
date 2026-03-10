'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { patientsV2 } from '@/lib/seed-data-v2';
import { Suspense } from 'react';

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    retained: 'bg-green-50 text-green-700',
    risk: 'bg-red-50 text-red-700',
    dropped: 'bg-slate-100 text-slate-500',
  };
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 uppercase tracking-wide ${styles[status] || ''}`}>
      {status}
    </span>
  );
}

function riskColor(score: number): string {
  if (score >= 60) return 'text-red-600';
  if (score >= 30) return 'text-amber-600';
  return 'text-green-600';
}

function formatDuration(days: number): string {
  if (days < 30) return `${days}d`;
  const months = Math.floor(days / 30);
  const remainder = days % 30;
  if (remainder === 0) return `${months}mo`;
  return `${months}mo ${remainder}d`;
}

function PatientListInner() {
  const searchParams = useSearchParams();
  const statusFilter = searchParams.get('status');

  const filtered = statusFilter
    ? patientsV2.filter((p) => p.status === statusFilter)
    : patientsV2;

  const title = statusFilter === 'retained'
    ? 'Retained Patients'
    : statusFilter === 'risk'
      ? 'Patients Flagged for Risk'
      : statusFilter === 'dropped'
        ? 'Dropped Off Patients'
        : 'All Patients';

  return (
    <div>
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-6">
        <Link href="/dashboard-2-2" className="hover:text-accent transition-colors">Overview</Link>
        <span>/</span>
        <span className="text-foreground font-medium">{title}</span>
      </nav>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
          <p className="text-sm text-text-secondary mt-1">{filtered.length} patients</p>
        </div>
        {/* Status filter tabs */}
        <div className="flex items-center gap-1">
          {[
            { label: 'All', value: null },
            { label: 'Retained', value: 'retained' },
            { label: 'Risk', value: 'risk' },
            { label: 'Dropped', value: 'dropped' },
          ].map((tab) => {
            const isActive = statusFilter === tab.value;
            return (
              <Link
                key={tab.label}
                href={tab.value ? `/dashboard-2-2/patients?status=${tab.value}` : '/dashboard-2-2/patients'}
                className={`text-xs font-medium px-3 py-1.5 transition-colors ${
                  isActive
                    ? 'bg-accent text-white'
                    : 'text-text-secondary hover:bg-surface-warm'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 bg-white border border-border-light">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-light">
              <th className="text-left text-[11px] font-medium text-text-secondary uppercase tracking-wide px-5 py-3">Patient</th>
              <th className="text-left text-[11px] font-medium text-text-secondary uppercase tracking-wide px-5 py-3">Status</th>
              <th className="text-left text-[11px] font-medium text-text-secondary uppercase tracking-wide px-5 py-3">Time in Program</th>
              <th className="text-left text-[11px] font-medium text-text-secondary uppercase tracking-wide px-5 py-3">Risk Score</th>
              <th className="text-left text-[11px] font-medium text-text-secondary uppercase tracking-wide px-5 py-3">Last Interaction</th>
              <th className="text-right text-[11px] font-medium text-text-secondary uppercase tracking-wide px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((patient) => (
              <tr key={patient.id} className="border-b border-border-light last:border-b-0 hover:bg-surface-warm transition-colors">
                <td className="px-5 py-3.5">
                  <Link href={`/dashboard-2-2/patients/${patient.id}`} className="text-sm font-medium text-foreground hover:text-accent transition-colors">
                    {patient.firstName} {patient.lastName}
                  </Link>
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={patient.status} />
                </td>
                <td className="px-5 py-3.5 text-sm text-text-secondary">
                  {formatDuration(patient.daysEnrolled)}
                </td>
                <td className="px-5 py-3.5">
                  {patient.riskScore !== null ? (
                    <span className={`text-sm font-medium ${riskColor(patient.riskScore)}`}>
                      {patient.riskScore}
                    </span>
                  ) : (
                    <span className="text-sm text-text-muted">--</span>
                  )}
                </td>
                <td className="px-5 py-3.5 text-sm text-text-secondary">
                  {patient.lastInteraction}
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

export default function PatientsPage() {
  return (
    <Suspense>
      <PatientListInner />
    </Suspense>
  );
}
