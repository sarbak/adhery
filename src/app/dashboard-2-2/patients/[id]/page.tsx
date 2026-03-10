import Link from 'next/link';
import { getPatientById, patientsV2 } from '@/lib/seed-data-v2';
import { notFound } from 'next/navigation';

function AdherenceChart({ trend }: { trend: number[] }) {
  // Simple SVG bar chart for 30 days
  const barWidth = 100 / trend.length;
  return (
    <div className="mt-4">
      <svg viewBox="0 0 100 24" className="w-full h-16" preserveAspectRatio="none">
        {trend.map((val, i) => (
          <rect
            key={i}
            x={i * barWidth + barWidth * 0.1}
            y={val === 1 ? 2 : 14}
            width={barWidth * 0.8}
            height={val === 1 ? 20 : 8}
            fill={val === 1 ? '#1e3a5f' : '#e2e8f0'}
            rx="0"
          />
        ))}
      </svg>
      <div className="flex justify-between text-[10px] text-text-muted mt-1">
        <span>30 days ago</span>
        <span>Today</span>
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

export async function generateStaticParams() {
  return patientsV2.map((p) => ({ id: p.id }));
}

export default async function PatientOverview({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const patient = getPatientById(id);

  if (!patient) {
    notFound();
  }

  const adherenceColor =
    patient.adherenceRate >= 80 ? 'text-green-600' : patient.adherenceRate >= 60 ? 'text-amber-600' : 'text-red-600';

  return (
    <div>
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-6">
        <Link href="/dashboard-2-2" className="hover:text-accent transition-colors">Overview</Link>
        <span>/</span>
        <Link href="/dashboard-2-2/risk" className="hover:text-accent transition-colors">Risk Patients</Link>
        <span>/</span>
        <span className="text-foreground font-medium">{patient.firstName} {patient.lastName}</span>
      </nav>

      {/* Header */}
      <div className="bg-white border border-border-light p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">{patient.firstName} {patient.lastName}</h1>
            <p className="text-sm text-text-secondary mt-1">{patient.medication}</p>
            <p className="text-xs text-text-muted mt-0.5">Enrolled {patient.enrollmentDate}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">Adherence Rate</p>
            <p className={`text-3xl font-bold ${adherenceColor} leading-none mt-1`}>{patient.adherenceRate}%</p>
          </div>
        </div>

        {/* Risk flags */}
        {patient.riskReason && (
          <div className="mt-4 px-4 py-3 bg-red-50 border border-red-100">
            <p className="text-xs font-medium text-red-700">Active risk flag: {patient.riskReason}</p>
          </div>
        )}
      </div>

      {/* Stats + Chart row */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {/* Key metrics */}
        <div className="bg-white border border-border-light p-5">
          <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">Key Metrics</p>
          <div className="mt-3 space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">PDC</span>
              <span className="text-sm font-medium text-foreground">{patient.pdc}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">Total Interactions</span>
              <span className="text-sm font-medium text-foreground">{patient.totalInteractions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">Days Enrolled</span>
              <span className="text-sm font-medium text-foreground">{patient.daysEnrolled}</span>
            </div>
          </div>
        </div>

        {/* Adherence trend */}
        <div className="col-span-2 bg-white border border-border-light p-5">
          <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">Adherence Trend (30 Days)</p>
          <AdherenceChart trend={patient.adherenceTrend} />
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-accent" />
              <span className="text-[10px] text-text-muted">Dose taken</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-border-light" />
              <span className="text-[10px] text-text-muted">Missed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interaction history */}
      <div className="mt-4 bg-white border border-border-light">
        <div className="px-5 py-4 border-b border-border-light">
          <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">Interaction History</p>
        </div>
        <div>
          {patient.interactions.map((interaction, idx) => (
            <div
              key={interaction.id}
              className={`flex items-center justify-between px-5 py-3.5 ${idx < patient.interactions.length - 1 ? 'border-b border-border-light' : ''} hover:bg-surface-warm transition-colors`}
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-xs text-text-muted">{interaction.date}</span>
                </div>
                <ChannelBadge channel={interaction.channel} />
                <span className="text-sm text-foreground">{interaction.summary}</span>
              </div>
              <div className="flex items-center gap-4">
                {interaction.duration && (
                  <span className="text-xs text-text-muted">{interaction.duration}</span>
                )}
                <span className={`text-xs font-medium ${interaction.sentiment >= 70 ? 'text-green-600' : interaction.sentiment >= 50 ? 'text-amber-600' : 'text-red-500'}`}>
                  {interaction.sentiment}% sentiment
                </span>
                {interaction.hasTranscript && (
                  <Link
                    href={`/dashboard-2-2/patients/${patient.id}/transcript/${interaction.id}`}
                    className="text-xs font-medium text-accent hover:text-accent-dark transition-colors"
                  >
                    View Transcript →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
