'use client';

import { useState } from 'react';
import { patients, journeyEvents, getPatientStage } from '@/lib/seed-data';
import type { JourneyEvent, JourneyStage } from '@/lib/seed-data';

const stageConfig: Record<JourneyStage, { label: string; color: string; bgColor: string }> = {
  onboarding: { label: 'Onboarding', color: 'text-blue-600', bgColor: 'bg-blue-50' },
  active_monitoring: { label: 'Active', color: 'text-green-600', bgColor: 'bg-green-50' },
  intervention: { label: 'Intervention', color: 'text-amber-600', bgColor: 'bg-amber-50' },
  re_engagement: { label: 'Re-engaged', color: 'text-purple-600', bgColor: 'bg-purple-50' },
  graduated: { label: 'Graduated', color: 'text-teal-600', bgColor: 'bg-teal-50' },
};

const channelConfig: Record<string, { label: string; color: string }> = {
  sms: { label: 'SMS', color: 'text-blue-500 bg-blue-50' },
  voice: { label: 'Voice', color: 'text-green-500 bg-green-50' },
  mail: { label: 'Mail', color: 'text-amber-500 bg-amber-50' },
  system: { label: 'System', color: 'text-gray-500 bg-gray-50' },
  pharmacist: { label: 'Pharmacist', color: 'text-purple-500 bg-purple-50' },
};

const outcomeIcon: Record<string, { dot: string; label: string }> = {
  success: { dot: 'bg-green-500', label: 'Resolved' },
  warning: { dot: 'bg-amber-500', label: 'Needs attention' },
  problem: { dot: 'bg-red-500', label: 'Problem' },
  neutral: { dot: 'bg-gray-400', label: 'Info' },
};

function PatientTimeline({ patientId }: { patientId: string }) {
  const patient = patients.find((p) => p.id === patientId)!;
  const events = journeyEvents
    .filter((e) => e.patientId === patientId)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const stage = getPatientStage(patientId);
  const stageInfo = stageConfig[stage];

  return (
    <div className="bg-white border border-border-light rounded-xl overflow-hidden">
      {/* Patient header */}
      <div className="p-4 border-b border-border-light">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/10 text-accent flex items-center justify-center text-sm font-bold rounded-lg">
              {patient.firstName[0]}{patient.lastName[0]}
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">{patient.firstName} {patient.lastName}</h2>
              <p className="text-[10px] text-text-muted">{patient.email}</p>
            </div>
          </div>
          <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full ${stageInfo.color} ${stageInfo.bgColor}`}>
            {stageInfo.label}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Adherence (PDC)', value: `${patient.adherenceRate}%`, color: patient.adherenceRate >= 80 ? 'text-green-600' : patient.adherenceRate >= 60 ? 'text-amber-600' : 'text-red-500' },
            { label: 'Risk Score', value: patient.riskScore, color: patient.riskScore > 70 ? 'text-red-500' : patient.riskScore > 40 ? 'text-amber-600' : 'text-green-600' },
            { label: 'Enrolled', value: patient.enrollmentDate, color: 'text-foreground' },
            { label: 'Touchpoints', value: events.length, color: 'text-foreground' },
          ].map((s) => (
            <div key={s.label} className="bg-surface-warm rounded-lg p-2">
              <p className="text-[10px] text-text-muted">{s.label}</p>
              <p className={`text-sm font-semibold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="p-4">
        <p className="text-xs font-medium text-foreground mb-3">Automated Journey Timeline</p>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border-light" />

          <div className="space-y-1">
            {events.map((event, i) => {
              const outcome = outcomeIcon[event.outcome || 'neutral'];
              const channel = channelConfig[event.channel || 'system'];
              return (
                <div key={event.id} className="relative flex items-start gap-3 pl-5 py-2 rounded-lg hover:bg-surface-warm transition-colors group">
                  {/* Timeline dot */}
                  <div className={`absolute left-[3px] top-3.5 w-[9px] h-[9px] rounded-full border-2 border-white ${outcome.dot} z-10`} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-medium text-foreground">{event.title}</span>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${channel.color}`}>
                        {channel.label}
                      </span>
                      {event.automated && (
                        <span className="text-[10px] text-accent bg-accent/5 px-1.5 py-0.5 rounded">
                          Auto
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-text-secondary mt-0.5 leading-relaxed">{event.description}</p>
                    {event.metadata && (
                      <div className="flex items-center gap-3 mt-1">
                        {event.metadata.sentiment !== undefined && (
                          <span className="text-[10px] text-text-muted">
                            Sentiment: <span className="font-medium">{event.metadata.sentiment}%</span>
                          </span>
                        )}
                        {event.metadata.pdc_current !== undefined && (
                          <span className="text-[10px] text-text-muted">
                            PDC: <span className={`font-medium ${Number(event.metadata.pdc_current) >= 80 ? 'text-green-600' : 'text-amber-600'}`}>{event.metadata.pdc_current}%</span>
                          </span>
                        )}
                        {event.metadata.duration_min !== undefined && (
                          <span className="text-[10px] text-text-muted">
                            Duration: {event.metadata.duration_min}min
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-text-muted flex-shrink-0 mt-0.5">{event.date}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PatientsPage() {
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'risk' | 'adherence' | 'name' | 'events'>('risk');

  const patientsWithStage = patients.map((p) => ({
    ...p,
    stage: getPatientStage(p.id),
    eventCount: journeyEvents.filter((e) => e.patientId === p.id).length,
  }));

  const filtered = patientsWithStage
    .filter((p) => {
      const matchSearch = `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase());
      const matchStage = stageFilter === 'all' || p.stage === stageFilter;
      return matchSearch && matchStage;
    })
    .sort((a, b) => {
      if (sortBy === 'risk') return b.riskScore - a.riskScore;
      if (sortBy === 'adherence') return a.adherenceRate - b.adherenceRate;
      if (sortBy === 'events') return b.eventCount - a.eventCount;
      return a.lastName.localeCompare(b.lastName);
    });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Patient Journeys</h1>
          <p className="text-xs text-text-muted">{patients.length} patients - click to view automated journey timeline</p>
        </div>
      </div>

      {/* Stage summary pills */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <button
          onClick={() => setStageFilter('all')}
          className={`text-[10px] font-medium px-3 py-1.5 rounded-full border transition-colors ${
            stageFilter === 'all' ? 'border-accent text-accent bg-accent/5' : 'border-border-light text-text-secondary hover:border-accent/50'
          }`}
        >
          All ({patients.length})
        </button>
        {(['onboarding', 'active_monitoring', 'intervention', 're_engagement', 'graduated'] as JourneyStage[]).map((stage) => {
          const config = stageConfig[stage];
          const count = patientsWithStage.filter((p) => p.stage === stage).length;
          return (
            <button
              key={stage}
              onClick={() => setStageFilter(stage)}
              className={`text-[10px] font-medium px-3 py-1.5 rounded-full border transition-colors ${
                stageFilter === stage ? `border-current ${config.color} ${config.bgColor}` : 'border-border-light text-text-secondary hover:border-accent/50'
              }`}
            >
              {config.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Search patients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white border border-border-light rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-text-muted outline-none focus:border-accent w-64"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="bg-white border border-border-light rounded-lg px-3 py-2 text-xs text-foreground outline-none"
        >
          <option value="risk">Sort by Risk</option>
          <option value="adherence">Sort by Adherence</option>
          <option value="events">Sort by Activity</option>
          <option value="name">Sort by Name</option>
        </select>
        <span className="text-xs text-text-muted ml-auto">{filtered.length} results</span>
      </div>

      <div className="grid lg:grid-cols-[1fr_480px] gap-4">
        {/* Patient list */}
        <div className="bg-white border border-border-light rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1fr_90px_70px_70px_70px] px-4 py-2 border-b border-border-light text-[10px] text-text-muted uppercase tracking-wider">
            <span>Patient</span>
            <span>Stage</span>
            <span>PDC</span>
            <span>Risk</span>
            <span>Events</span>
          </div>
          <div className="max-h-[650px] overflow-y-auto">
            {filtered.map((p) => {
              const config = stageConfig[p.stage];
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPatient(p.id)}
                  className={`grid grid-cols-[1fr_90px_70px_70px_70px] px-4 py-2.5 border-b border-border-light cursor-pointer transition-colors ${
                    selectedPatient === p.id ? 'bg-accent/5 border-l-2 border-l-accent' : 'hover:bg-surface-warm border-l-2 border-l-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-accent/10 text-accent flex items-center justify-center text-[10px] font-bold rounded flex-shrink-0">
                      {p.firstName[0]}{p.lastName[0]}
                    </div>
                    <div>
                      <p className="text-xs text-foreground">{p.firstName} {p.lastName}</p>
                      <p className="text-[10px] text-text-muted">{p.phone}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded self-center ${config.color} ${config.bgColor}`}>
                    {config.label}
                  </span>
                  <span className={`text-xs self-center font-medium ${p.adherenceRate >= 80 ? 'text-green-600' : p.adherenceRate >= 60 ? 'text-amber-600' : 'text-red-500'}`}>
                    {p.adherenceRate}%
                  </span>
                  <span className={`text-xs self-center ${p.riskScore > 70 ? 'text-red-500' : p.riskScore > 40 ? 'text-amber-600' : 'text-text-secondary'}`}>
                    {p.riskScore}
                  </span>
                  <span className="text-xs text-text-secondary self-center">{p.eventCount}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Patient journey timeline panel */}
        {selectedPatient ? (
          <PatientTimeline patientId={selectedPatient} />
        ) : (
          <div className="bg-white border border-border-light rounded-xl flex items-center justify-center p-8">
            <div className="text-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto text-text-muted mb-2">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs text-text-muted">Select a patient to view their</p>
              <p className="text-xs text-text-muted">automated journey timeline</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
