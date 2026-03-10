'use client';

import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { patientsV2, type PatientV2 } from '@/lib/seed-data-v2';
import { Suspense, useState, useCallback } from 'react';

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    adherent: 'bg-green-50 text-green-700',
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

type SortKey = 'name' | 'status' | 'time' | 'risk' | 'lastInteraction';

function SortArrow({ active, desc }: { active: boolean; desc: boolean }) {
  if (!active) return null;
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="inline ml-1">
      <path d={desc ? 'M4 7L1 3H7L4 7Z' : 'M4 1L7 5H1L4 1Z'} fill="currentColor" />
    </svg>
  );
}

function sortPatients(patients: PatientV2[], sortKey: SortKey, desc: boolean): PatientV2[] {
  return [...patients].sort((a, b) => {
    let cmp = 0;
    switch (sortKey) {
      case 'name':
        cmp = `${a.lastName} ${a.firstName}`.localeCompare(`${b.lastName} ${b.firstName}`);
        break;
      case 'status':
        cmp = a.status.localeCompare(b.status);
        break;
      case 'time':
        cmp = a.daysEnrolled - b.daysEnrolled;
        break;
      case 'risk':
        cmp = (a.riskScore ?? -1) - (b.riskScore ?? -1);
        break;
      case 'lastInteraction':
        cmp = a.lastInteraction.localeCompare(b.lastInteraction);
        break;
    }
    return desc ? -cmp : cmp;
  });
}

function PatientListInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const statusFilter = searchParams.get('status');
  const [sortKey, setSortKey] = useState<SortKey>('risk');
  const [sortDesc, setSortDesc] = useState(true);

  const handleSort = useCallback((key: SortKey) => {
    if (sortKey === key) {
      setSortDesc(!sortDesc);
    } else {
      setSortKey(key);
      setSortDesc(true);
    }
  }, [sortKey, sortDesc]);

  const filtered = statusFilter
    ? patientsV2.filter((p) => p.status === statusFilter)
    : patientsV2;

  const sorted = sortPatients(filtered, sortKey, sortDesc);

  const title = statusFilter === 'adherent'
    ? 'Adherent Patients'
    : statusFilter === 'risk'
      ? 'Patients Flagged for Risk'
      : statusFilter === 'dropped'
        ? 'Dropped Off Patients'
        : 'All Patients';

  const thClass = 'text-left text-[11px] font-medium text-text-secondary uppercase tracking-wide px-5 py-3 cursor-pointer hover:text-foreground transition-colors select-none';

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
          <p className="text-sm text-text-secondary mt-1">{sorted.length} patients</p>
        </div>
        {/* Status filter tabs */}
        <div className="flex items-center gap-1">
          {[
            { label: 'All', value: null },
            { label: 'Adherent', value: 'adherent' },
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
              <th className={thClass} onClick={() => handleSort('name')}>
                Patient<SortArrow active={sortKey === 'name'} desc={sortDesc} />
              </th>
              <th className={thClass} onClick={() => handleSort('status')}>
                Status<SortArrow active={sortKey === 'status'} desc={sortDesc} />
              </th>
              <th className={thClass} onClick={() => handleSort('time')}>
                Time in Program<SortArrow active={sortKey === 'time'} desc={sortDesc} />
              </th>
              <th className={thClass} onClick={() => handleSort('risk')}>
                Risk Score<SortArrow active={sortKey === 'risk'} desc={sortDesc} />
              </th>
              <th className={thClass} onClick={() => handleSort('lastInteraction')}>
                Last Interaction<SortArrow active={sortKey === 'lastInteraction'} desc={sortDesc} />
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((patient) => (
              <tr
                key={patient.id}
                className="border-b border-border-light last:border-b-0 hover:bg-surface-warm transition-colors cursor-pointer"
                onClick={() => router.push(`/dashboard-2-2/patients/${patient.id}`)}
              >
                <td className="px-5 py-3.5">
                  <span className="text-sm font-medium text-foreground">
                    {patient.firstName} {patient.lastName}
                  </span>
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
