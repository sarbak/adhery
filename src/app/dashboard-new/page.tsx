'use client';

import { useRouter } from 'next/navigation';
import { kpiData, patientsV2, type PatientV2 } from '@/lib/seed-data-v2';
import { useState, useCallback } from 'react';

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

// --- Icons ---
function PeopleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-text-muted">
      <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM2 14a6 6 0 0112 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-text-muted">
      <path d="M2 14V8l4-3 4 5 4-8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-text-muted">
      <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function AlertIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-text-muted">
      <path d="M8 1L1 14h14L8 1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M8 6v3M8 11.5v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function ExitIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-text-muted">
      <path d="M6 2H3v12h3M10 5l3 3-3 3M6 8h7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function EscalateIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-text-muted">
      <path d="M8 12V4M5 7l3-3 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-text-muted">
      <path d="M2 3h12v8H6l-4 3V3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

interface KpiCardProps {
  label: string;
  value: string;
  delta: number;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  unit?: string;
}

function KpiCard({ label, value, delta, icon, active, onClick, unit }: KpiCardProps) {
  const isClickable = !!onClick;
  return (
    <button
      onClick={onClick}
      className={`text-left bg-white border p-4 transition-colors w-full ${
        active
          ? 'border-accent ring-1 ring-accent/20'
          : isClickable
            ? 'border-border-light hover:border-accent/40 cursor-pointer'
            : 'border-border-light cursor-default'
      }`}
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          {icon}
          <p className="text-[10px] font-medium text-text-secondary uppercase tracking-wide">{label}</p>
        </div>
        {isClickable && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={`transition-colors ${active ? 'text-accent' : 'text-text-muted'}`}>
            <path d="M3 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-foreground leading-none">{value}{unit}</span>
        <TrendArrow delta={delta} />
      </div>
    </button>
  );
}

// --- Table ---
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

type StatusFilter = 'all' | 'adherent' | 'risk' | 'dropped';

export default function DashboardPage() {
  const router = useRouter();
  const d = kpiData;
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
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

  const filtered = patientsV2.filter((p) => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const fullName = `${p.firstName} ${p.lastName}`.toLowerCase();
      return fullName.includes(q);
    }
    return true;
  });

  const sorted = sortPatients(filtered, sortKey, sortDesc);

  const thClass = 'text-left text-[11px] font-medium text-text-secondary uppercase tracking-wide px-5 py-3 cursor-pointer hover:text-foreground transition-colors select-none';

  return (
    <div>
      <h1 className="text-lg font-semibold text-foreground">Program Overview</h1>

      {/* Hero: 3 big numbers */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white border border-border-light p-7 flex flex-col items-center text-center">
          <PeopleIcon />
          <p className="text-[10px] font-medium text-text-secondary uppercase tracking-wide mt-2">Total Patients</p>
          <span className="text-4xl font-bold text-foreground leading-none mt-1">{d.totalPatients.toLocaleString()}</span>
        </div>
        <div className="bg-white border border-border-light p-7 flex flex-col items-center text-center">
          <ChartIcon />
          <p className="text-[10px] font-medium text-text-secondary uppercase tracking-wide mt-2">30-Day Adherence</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-4xl font-bold text-foreground leading-none">{d.adherence30d.value}%</span>
            <TrendArrow delta={d.adherence30d.delta} />
          </div>
        </div>
        <div className="bg-white border border-border-light p-7 flex flex-col items-center text-center">
          <ChartIcon />
          <p className="text-[10px] font-medium text-text-secondary uppercase tracking-wide mt-2">90-Day Adherence</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-4xl font-bold text-foreground leading-none">{d.adherence90d.value}%</span>
            <TrendArrow delta={d.adherence90d.delta} />
          </div>
        </div>
      </div>

      {/* Secondary KPIs - also act as filters */}
      <div className="grid grid-cols-5 gap-3 mt-4">
        <KpiCard
          label="Adherent"
          value={d.adherent.value.toLocaleString()}
          delta={d.adherent.delta}
          icon={<CheckIcon />}
          active={statusFilter === 'adherent'}
          onClick={() => setStatusFilter(statusFilter === 'adherent' ? 'all' : 'adherent')}
        />
        <KpiCard
          label="Flagged for Risk"
          value={String(d.flagged.value)}
          delta={d.flagged.delta}
          icon={<AlertIcon />}
          active={statusFilter === 'risk'}
          onClick={() => setStatusFilter(statusFilter === 'risk' ? 'all' : 'risk')}
        />
        <KpiCard
          label="Dropped Off"
          value={String(d.droppedOff.value)}
          delta={d.droppedOff.delta}
          icon={<ExitIcon />}
          active={statusFilter === 'dropped'}
          onClick={() => setStatusFilter(statusFilter === 'dropped' ? 'all' : 'dropped')}
        />
        <KpiCard
          label="Escalations"
          value={String(d.escalations.value)}
          delta={d.escalations.delta}
          icon={<EscalateIcon />}
        />
        <KpiCard
          label="Conversations"
          value={d.conversations.value.toLocaleString()}
          delta={d.conversations.delta}
          icon={<ChatIcon />}
        />
      </div>

      {/* Patient table */}
      <div className="mt-6 bg-white border border-border-light">
        <div className="px-5 py-3 border-b border-border-light flex items-center justify-between">
          <p className="text-xs font-medium text-text-secondary">
            {statusFilter === 'all' ? 'All Patients' : statusFilter === 'adherent' ? 'Adherent' : statusFilter === 'risk' ? 'Flagged for Risk' : 'Dropped Off'}
            <span className="text-text-muted ml-1.5">({sorted.length})</span>
          </p>
          <div className="flex items-center gap-3">
            {statusFilter !== 'all' && (
              <button
                onClick={() => setStatusFilter('all')}
                className="text-[10px] font-medium text-accent hover:text-accent-dark transition-colors"
              >
                Show all
              </button>
            )}
            <div className="relative">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted">
                <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M9.5 9.5L13 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-xs pl-8 pr-3 py-1.5 w-48 border border-border-light bg-surface-warm focus:border-accent focus:outline-none transition-colors placeholder:text-text-muted"
              />
            </div>
          </div>
        </div>
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
                onClick={() => router.push(`/dashboard-new/patients/${patient.id}`)}
              >
                <td className="px-5 py-3">
                  <span className="text-sm font-medium text-foreground">
                    {patient.firstName} {patient.lastName}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <StatusBadge status={patient.status} />
                </td>
                <td className="px-5 py-3 text-sm text-text-secondary">
                  {formatDuration(patient.daysEnrolled)}
                </td>
                <td className="px-5 py-3">
                  {patient.riskScore !== null ? (
                    <span className={`text-sm font-medium ${riskColor(patient.riskScore)}`}>
                      {patient.riskScore}
                    </span>
                  ) : (
                    <span className="text-sm text-text-muted">--</span>
                  )}
                </td>
                <td className="px-5 py-3 text-sm text-text-secondary">
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
