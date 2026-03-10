import Link from 'next/link';
import { getPatientById, getInteraction, patientsV2 } from '@/lib/seed-data-v2';
import { notFound } from 'next/navigation';

function MiaBubble({ text, timestamp }: { text: string; timestamp: string }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-7 h-7 bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-[10px] font-bold text-white">M</span>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-accent">Mia</span>
          <span className="text-[10px] text-text-muted">{timestamp}</span>
        </div>
        <p className="text-sm text-foreground leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function PatientBubble({ text, timestamp, name }: { text: string; timestamp: string; name: string }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-7 h-7 bg-surface-warm border border-border-light flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-[10px] font-medium text-text-secondary">{name[0]}</span>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-foreground">{name}</span>
          <span className="text-[10px] text-text-muted">{timestamp}</span>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function SystemAnnotation({ text, timestamp }: { text: string; timestamp: string }) {
  return (
    <div className="mx-10 px-4 py-2.5 bg-amber-50/60 border-l-2 border-amber-400">
      <div className="flex items-center gap-2 mb-0.5">
        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wide">System</span>
        <span className="text-[10px] text-amber-600/70">{timestamp}</span>
      </div>
      <p className="text-xs text-amber-800 leading-relaxed">{text.replace('[SYSTEM] ', '')}</p>
    </div>
  );
}

export async function generateStaticParams() {
  const params: { id: string; interactionId: string }[] = [];
  for (const p of patientsV2) {
    for (const i of p.interactions) {
      if (i.hasTranscript) {
        params.push({ id: p.id, interactionId: i.id });
      }
    }
  }
  return params;
}

export default async function TranscriptPage({ params }: { params: Promise<{ id: string; interactionId: string }> }) {
  const { id, interactionId } = await params;
  const patient = getPatientById(id);

  if (!patient) {
    notFound();
  }

  const interaction = getInteraction(id, interactionId);

  if (!interaction || !interaction.transcript) {
    notFound();
  }

  return (
    <div>
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-6">
        <Link href="/dashboard-2-2" className="hover:text-accent transition-colors">Overview</Link>
        <span>/</span>
        <Link href="/dashboard-2-2/risk" className="hover:text-accent transition-colors">Risk Patients</Link>
        <span>/</span>
        <Link href={`/dashboard-2-2/patients/${patient.id}`} className="hover:text-accent transition-colors">
          {patient.firstName} {patient.lastName}
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">Transcript</span>
      </nav>

      {/* Call metadata */}
      <div className="bg-white border border-border-light p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Call with {patient.firstName} {patient.lastName}
            </h1>
            <p className="text-sm text-text-secondary mt-1">{interaction.date}</p>
          </div>
          <div className="flex items-center gap-6">
            {interaction.duration && (
              <div className="text-right">
                <p className="text-[10px] font-medium text-text-muted uppercase tracking-wide">Duration</p>
                <p className="text-sm font-medium text-foreground mt-0.5">{interaction.duration}</p>
              </div>
            )}
            <div className="text-right">
              <p className="text-[10px] font-medium text-text-muted uppercase tracking-wide">Channel</p>
              <p className="text-sm font-medium text-foreground mt-0.5 uppercase">{interaction.channel}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-medium text-text-muted uppercase tracking-wide">Sentiment</p>
              <p className={`text-sm font-medium mt-0.5 ${interaction.sentiment >= 70 ? 'text-green-600' : interaction.sentiment >= 50 ? 'text-amber-600' : 'text-red-500'}`}>
                {interaction.sentiment}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Transcript */}
      <div className="mt-4 bg-white border border-border-light p-6">
        <p className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-6">Conversation Transcript</p>
        <div className="space-y-5">
          {interaction.transcript.map((msg, idx) => {
            if (msg.speaker === 'mia') {
              return <MiaBubble key={idx} text={msg.text} timestamp={msg.timestamp} />;
            }
            if (msg.speaker === 'patient') {
              return <PatientBubble key={idx} text={msg.text} timestamp={msg.timestamp} name={patient.firstName} />;
            }
            return <SystemAnnotation key={idx} text={msg.text} timestamp={msg.timestamp} />;
          })}
        </div>
      </div>

      {/* Back link */}
      <div className="mt-4">
        <Link
          href={`/dashboard-2-2/patients/${patient.id}`}
          className="text-sm font-medium text-accent hover:text-accent-dark transition-colors"
        >
          ← Back to patient overview
        </Link>
      </div>
    </div>
  );
}
