'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getPatientById, getInteraction, type TranscriptMessage } from '@/lib/seed-data-v2';
import { useState } from 'react';

function AudioPlayer({ audioUrl }: { audioUrl: string }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Mock playback: advances progress when "playing"
  const togglePlay = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    setPlaying(true);
    // Simulate progress
    let p = progress;
    const interval = setInterval(() => {
      p += 1;
      if (p >= 100) {
        clearInterval(interval);
        setPlaying(false);
        setProgress(0);
        return;
      }
      setProgress(p);
    }, 150);
  };

  const minutes = Math.floor((progress / 100) * 90);
  const seconds = Math.floor(((progress / 100) * 90) % 60);
  const timeStr = `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}`;
  const totalStr = '1:30';

  return (
    <div className="flex items-center gap-3 bg-surface-warm border border-border-light px-4 py-3">
      <button
        onClick={togglePlay}
        className="w-8 h-8 bg-accent flex items-center justify-center flex-shrink-0 hover:bg-accent-dark transition-colors"
        title={playing ? 'Pause' : 'Play'}
      >
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="3" y="2" width="3" height="10" fill="white" />
            <rect x="8" y="2" width="3" height="10" fill="white" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 1L12 7L3 13V1Z" fill="white" />
          </svg>
        )}
      </button>
      <div className="flex-1">
        <div className="h-1.5 bg-border-light w-full cursor-pointer" onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setProgress(Math.floor(((e.clientX - rect.left) / rect.width) * 100));
        }}>
          <div className="h-full bg-accent transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <span className="text-[10px] text-text-muted font-medium tabular-nums w-16 text-right">{timeStr} / {totalStr}</span>
      <span className="text-[10px] text-text-muted truncate max-w-32">{audioUrl}</span>
    </div>
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
        <p className={`text-sm text-foreground leading-relaxed ${msg.crucial ? 'underline decoration-accent decoration-2 underline-offset-2' : ''}`}>{msg.text}</p>
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
        <p className={`text-sm text-text-secondary leading-relaxed ${msg.crucial ? 'underline decoration-red-400 decoration-2 underline-offset-2' : ''}`}>{msg.text}</p>
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
      <p className={`text-xs text-amber-800 leading-relaxed ${msg.crucial ? 'underline decoration-amber-600 decoration-2 underline-offset-2' : ''}`}>
        {msg.text.replace('[SYSTEM] ', '')}
      </p>
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
        <Link href="/dashboard-2-2" className="hover:text-accent transition-colors">Overview</Link>
        <span>/</span>
        <Link href="/dashboard-2-2/patients" className="hover:text-accent transition-colors">Patients</Link>
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

      {/* Audio Player */}
      {interaction.audioUrl && (
        <div className="mt-4">
          <AudioPlayer audioUrl={interaction.audioUrl} />
        </div>
      )}

      {/* Transcript */}
      <div className="mt-4 bg-white border border-border-light p-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-[11px] font-medium text-text-secondary uppercase tracking-wide">Conversation Transcript</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-0 border-b-2 border-accent" />
              <span className="text-[10px] text-text-muted">Crucial (Mia)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-0 border-b-2 border-red-400" />
              <span className="text-[10px] text-text-muted">Crucial (Patient)</span>
            </div>
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
          href={`/dashboard-2-2/patients/${patient.id}`}
          className="text-sm font-medium text-accent hover:text-accent-dark transition-colors"
        >
          ← Back to patient overview
        </Link>
      </div>
    </div>
  );
}
