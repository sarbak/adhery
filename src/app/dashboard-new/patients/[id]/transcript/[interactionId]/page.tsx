'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getPatientById, getInteraction, type TranscriptMessage } from '@/lib/seed-data-v2';
import { useState, useRef, useEffect } from 'react';

function AudioPlayer({ duration }: { duration?: string }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const totalSeconds = duration
    ? parseInt(duration.split(':')[0]) * 60 + parseInt(duration.split(':')[1])
    : 90;

  const togglePlay = () => {
    if (playing) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setPlaying(false);
      return;
    }
    setPlaying(true);
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setPlaying(false);
          return 0;
        }
        return p + 0.5;
      });
    }, totalSeconds * 5);
  };

  const currentSec = Math.floor((progress / 100) * totalSeconds);
  const timeStr = `${Math.floor(currentSec / 60)}:${String(currentSec % 60).padStart(2, '0')}`;
  const totalStr = duration || `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, '0')}`;

  return (
    <div className="bg-white border border-border-light p-5">
      <div className="flex items-center gap-2 mb-3">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-accent">
          <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="7" cy="7" r="2" fill="currentColor" />
        </svg>
        <p className="text-[11px] font-medium text-text-secondary uppercase tracking-wide">Call Recording</p>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="w-10 h-10 bg-accent flex items-center justify-center flex-shrink-0 hover:bg-accent-dark transition-colors"
          title={playing ? 'Pause' : 'Play'}
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="3" y="2" width="3.5" height="12" fill="white" />
              <rect x="9.5" y="2" width="3.5" height="12" fill="white" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 2L13 8L4 14V2Z" fill="white" />
            </svg>
          )}
        </button>
        <div className="flex-1">
          <div
            className="h-2 bg-border-light w-full cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setProgress(Math.floor(((e.clientX - rect.left) / rect.width) * 100));
            }}
          >
            <div className="h-full bg-accent transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <span className="text-xs text-foreground font-medium tabular-nums min-w-20 text-right">{timeStr} / {totalStr}</span>
      </div>
    </div>
  );
}

function HighlightedText({ text, highlights, baseClass }: { text: string; highlights?: string[]; baseClass: string }) {
  if (!highlights || highlights.length === 0) {
    return <p className={baseClass}>{text}</p>;
  }

  const parts: { text: string; highlighted: boolean }[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    let earliest = -1;
    let earliestPhrase = '';

    for (const phrase of highlights) {
      const idx = remaining.toLowerCase().indexOf(phrase.toLowerCase());
      if (idx !== -1 && (earliest === -1 || idx < earliest)) {
        earliest = idx;
        earliestPhrase = phrase;
      }
    }

    if (earliest === -1) {
      parts.push({ text: remaining, highlighted: false });
      break;
    }

    if (earliest > 0) {
      parts.push({ text: remaining.slice(0, earliest), highlighted: false });
    }
    parts.push({ text: remaining.slice(earliest, earliest + earliestPhrase.length), highlighted: true });
    remaining = remaining.slice(earliest + earliestPhrase.length);
  }

  return (
    <p className={baseClass}>
      {parts.map((part, i) =>
        part.highlighted ? (
          <mark key={i} className="bg-amber-100 text-inherit px-0.5 decoration-0">{part.text}</mark>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </p>
  );
}

function MiaBubble({ msg }: { msg: TranscriptMessage }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-7 h-7 bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-[10px] font-bold text-white">M</span>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-accent">Mia</span>
          <span className="text-[10px] text-text-muted">{msg.timestamp}</span>
        </div>
        <HighlightedText text={msg.text} highlights={msg.highlights} baseClass="text-sm text-foreground leading-relaxed" />
      </div>
    </div>
  );
}

function PatientBubble({ msg, name }: { msg: TranscriptMessage; name: string }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-7 h-7 bg-surface-warm border border-border-light flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-[10px] font-medium text-text-secondary">{name[0]}</span>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-foreground">{name}</span>
          <span className="text-[10px] text-text-muted">{msg.timestamp}</span>
        </div>
        <HighlightedText text={msg.text} highlights={msg.highlights} baseClass="text-sm text-text-secondary leading-relaxed" />
      </div>
    </div>
  );
}

function SystemAnnotation({ msg }: { msg: TranscriptMessage }) {
  return (
    <div className="mx-10 px-4 py-2.5 bg-amber-50/60 border-l-2 border-amber-400">
      <div className="flex items-center gap-2 mb-0.5">
        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wide">System</span>
        <span className="text-[10px] text-amber-600/70">{msg.timestamp}</span>
      </div>
      <p className="text-xs text-amber-800 leading-relaxed">{msg.text.replace('[SYSTEM] ', '')}</p>
    </div>
  );
}

export default function TranscriptPage() {
  const params = useParams<{ id: string; interactionId: string }>();
  const patient = getPatientById(params.id);

  if (!patient) {
    return <div className="text-sm text-red-500">Patient not found</div>;
  }

  const interaction = getInteraction(params.id, params.interactionId);

  if (!interaction || !interaction.transcript) {
    return <div className="text-sm text-red-500">Transcript not found</div>;
  }

  return (
    <div>
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-6">
        <Link href="/dashboard-new" className="hover:text-accent transition-colors">Overview</Link>
        <span>/</span>
        <Link href="/dashboard-new/patients" className="hover:text-accent transition-colors">Patients</Link>
        <span>/</span>
        <Link href={`/dashboard-new/patients/${patient.id}`} className="hover:text-accent transition-colors">
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

      {/* Audio Player */}
      <div className="mt-4">
        <AudioPlayer duration={interaction.duration} />
      </div>

      {/* Transcript */}
      <div className="mt-4 bg-white border border-border-light p-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-[11px] font-medium text-text-secondary uppercase tracking-wide">Conversation Transcript</p>
          <div className="flex items-center gap-1.5">
            <mark className="bg-amber-100 text-[10px] text-text-muted px-1.5 py-0.5">highlighted</mark>
            <span className="text-[10px] text-text-muted">= key phrase</span>
          </div>
        </div>
        <div className="space-y-5">
          {interaction.transcript.map((msg, idx) => {
            if (msg.speaker === 'mia') {
              return <MiaBubble key={idx} msg={msg} />;
            }
            if (msg.speaker === 'patient') {
              return <PatientBubble key={idx} msg={msg} name={patient.firstName} />;
            }
            return <SystemAnnotation key={idx} msg={msg} />;
          })}
        </div>
      </div>

      {/* Back link */}
      <div className="mt-4">
        <Link
          href={`/dashboard-new/patients/${patient.id}`}
          className="text-sm font-medium text-accent hover:text-accent-dark transition-colors"
        >
          ← Back to patient overview
        </Link>
      </div>
    </div>
  );
}
