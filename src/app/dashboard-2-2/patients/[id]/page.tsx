import Link from 'next/link';
import { getPatientById, patientsV2 } from '@/lib/seed-data-v2';
import { notFound } from 'next/navigation';

function RiskBar({ label, value }: { label: string; value: number }) {
  const color = value >= 60 ? 'bg-red-500' : value >= 30 ? 'bg-amber-500' : 'bg-green-500';
  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <span className="text-xs text-text-secondary">{label}</span>
        <span className="text-xs font-medium text-foreground">{value}</span>
      </div>
      <div className="h-1.5 bg-border-light w-full">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function ChannelBadge({ channel }: { channel: string }) {
  const styles: Record<string, string> = {
    voice: 'bg-blue-50 text-blue-700',
    sms: 'bg-green-50 text-green-700',
    mail: 'bg-slate-100 text-slate-600',
  };
  return (
    <span className={`text-[10px] font-medium px-1.5 py-0.5 ${styles[channel] || 'bg-slate-100 text-slate-600'}`}>
      {channel.toUpperCase()}
    </span>
  );
}

function SeverityDot({ severity }: { severity: string }) {
  const color = severity === 'severe' ? 'bg-red-500' : severity === 'moderate' ? 'bg-amber-500' : 'bg-green-500';
  return <div className={`w-2 h-2 ${color} flex-shrink-0`} />;
}

function formatDuration(days: number): string {
  if (days < 30) return `${days} days`;
  const months = Math.floor(days / 30);
  const remainder = days % 30;
  if (remainder === 0) return `${months} months`;
  return `${months}mo ${remainder}d`;
}

export async function generateStaticParams() {
  return patientsV2.map((p) => ({ id: p.id }));
}

export default async function PatientProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const patient = getPatientById(id);

  if (!patient) notFound();

  const riskColor = patient.riskScore === null
    ? 'text-text-muted'
    : patient.riskScore >= 60
      ? 'text-red-600'
      : patient.riskScore >= 30
        ? 'text-amber-600'
        : 'text-green-600';

  const doseStartDate = new Date(patient.doseStartDate);
  const now = new Date('2026-03-11');
  const doseDays = Math.floor((now.getTime() - doseStartDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div>
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-6">
        <Link href="/dashboard-2-2" className="hover:text-accent transition-colors">Overview</Link>
        <span>/</span>
        <Link href="/dashboard-2-2/patients" className="hover:text-accent transition-colors">Patients</Link>
        <span>/</span>
        <span className="text-foreground font-medium">{patient.firstName} {patient.lastName}</span>
      </nav>

      <div className="grid grid-cols-5 gap-4">
        {/* LEFT: Patient profile (2 cols) */}
        <div className="col-span-2 space-y-4">

          {/* Demographics */}
          <div className="bg-white border border-border-light p-5">
            <h1 className="text-xl font-semibold text-foreground">{patient.firstName} {patient.lastName}</h1>
            <div className="flex items-center gap-3 mt-2 text-sm text-text-secondary">
              <span>{patient.age}yo</span>
              <span>{patient.gender}</span>
              <span>{patient.state}</span>
            </div>
            <p className="text-xs text-text-muted mt-1">Enrolled {patient.enrollmentDate} ({formatDuration(patient.daysEnrolled)})</p>
          </div>

          {/* Medication / Dose */}
          <div className="bg-white border border-border-light p-5">
            <p className="text-[11px] font-medium text-text-secondary uppercase tracking-wide">Current Medication</p>
            <p className="text-sm font-semibold text-foreground mt-1.5">{patient.currentDose}</p>
            <p className="text-xs text-text-muted mt-0.5">On this dose since {patient.doseStartDate} ({formatDuration(doseDays)})</p>
          </div>

          {/* Adverse Events */}
          <div className="bg-white border border-border-light p-5">
            <p className="text-[11px] font-medium text-text-secondary uppercase tracking-wide">Adverse Events</p>
            {patient.adverseEvents.length === 0 ? (
              <p className="text-sm text-text-muted mt-2">No adverse events reported</p>
            ) : (
              <div className="mt-2 space-y-2">
                {patient.adverseEvents.map((ae, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <SeverityDot severity={ae.severity} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{ae.event}</span>
                        <span className="text-[10px] text-text-muted">{ae.date}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-text-muted capitalize">{ae.severity}</span>
                        <span className={`text-[10px] font-medium ${ae.resolved ? 'text-green-600' : 'text-amber-600'}`}>
                          {ae.resolved ? 'Resolved' : 'Active'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Risk Score */}
          <div className="bg-white border border-border-light p-5">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-medium text-text-secondary uppercase tracking-wide">Risk Score</p>
              {patient.riskScore !== null ? (
                <span className={`text-2xl font-bold ${riskColor}`}>{patient.riskScore}</span>
              ) : (
                <span className="text-sm text-text-muted">N/A</span>
              )}
            </div>
            {patient.riskBreakdown && (
              <div className="mt-4 space-y-3">
                <RiskBar label="Side Effect Score" value={patient.riskBreakdown.sideEffectScore} />
                <RiskBar label="Conversation Sentiment" value={patient.riskBreakdown.sentimentScore} />
                <RiskBar label="Socioeconomic Factors" value={patient.riskBreakdown.socioeconomicScore} />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Interaction History (3 cols) */}
        <div className="col-span-3">
          <div className="bg-white border border-border-light">
            <div className="px-5 py-4 border-b border-border-light">
              <p className="text-[11px] font-medium text-text-secondary uppercase tracking-wide">Interaction History</p>
            </div>
            <div>
              {patient.interactions.map((interaction, idx) => (
                <div
                  key={interaction.id}
                  className={`px-5 py-3.5 ${idx < patient.interactions.length - 1 ? 'border-b border-border-light' : ''} hover:bg-surface-warm transition-colors`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-text-muted w-20 flex-shrink-0">{interaction.date}</span>
                      <ChannelBadge channel={interaction.channel} />
                      <span className="text-sm text-foreground">{interaction.summary}</span>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                      {interaction.duration && (
                        <span className="text-[10px] text-text-muted">{interaction.duration}</span>
                      )}
                      {interaction.hasTranscript && (
                        <Link
                          href={`/dashboard-2-2/patients/${patient.id}/transcript/${interaction.id}`}
                          className="text-xs font-medium text-accent hover:text-accent-dark transition-colors"
                        >
                          Transcript →
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Flag */}
                  {interaction.flag && (
                    <div className="mt-1.5 ml-20 pl-2">
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-red-600 bg-red-50 px-2 py-0.5">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1v8M1 1h6l-1.5 2.5L7 6H1" stroke="currentColor" strokeWidth="1.2" /></svg>
                        {interaction.flag}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
