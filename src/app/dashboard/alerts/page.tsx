'use client';

import { useState } from 'react';
import { patients, journeyEvents } from '@/lib/seed-data';

// Focus on intervention events
const interventionTypes = [
  'escalation_sms_to_voice',
  'escalation_voice_to_mail',
  'escalation_to_pharmacist',
  'voice_call_completed',
  'voice_call_no_answer',
  'side_effect_reported',
  'side_effect_assessed',
  'pharmacist_intervention',
  'patient_re_engaged',
  'dose_missed',
  'refill_overdue',
];

const allInterventions = journeyEvents
  .filter((e) => interventionTypes.includes(e.type))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const channelLabel: Record<string, string> = {
  sms: 'SMS',
  voice: 'Voice',
  mail: 'Mail',
  system: 'System',
  pharmacist: 'Pharmacist',
};

const channelColor: Record<string, string> = {
  sms: 'text-blue-500 bg-blue-50',
  voice: 'text-green-500 bg-green-50',
  mail: 'text-amber-500 bg-amber-50',
  system: 'text-gray-500 bg-gray-50',
  pharmacist: 'text-purple-500 bg-purple-50',
};

const outcomeColor: Record<string, { dot: string; text: string; label: string }> = {
  success: { dot: 'bg-green-500', text: 'text-green-600', label: 'Resolved' },
  warning: { dot: 'bg-amber-500', text: 'text-amber-600', label: 'In Progress' },
  problem: { dot: 'bg-red-500', text: 'text-red-500', label: 'Needs Attention' },
  neutral: { dot: 'bg-gray-400', text: 'text-gray-500', label: 'Info' },
};

// Stats
const totalAuto = allInterventions.filter((e) => e.automated).length;
const resolved = allInterventions.filter((e) => e.outcome === 'success').length;
const escalations = allInterventions.filter((e) => e.type.startsWith('escalation_')).length;
const sideEffects = allInterventions.filter((e) => e.type.startsWith('side_effect')).length;

export default function InterventionsPage() {
  const [channelFilter, setChannelFilter] = useState<string>('all');
  const [outcomeFilter, setOutcomeFilter] = useState<string>('all');

  const filtered = allInterventions.filter((e) => {
    const matchChannel = channelFilter === 'all' || e.channel === channelFilter;
    const matchOutcome = outcomeFilter === 'all' || e.outcome === outcomeFilter;
    return matchChannel && matchOutcome;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Interventions</h1>
          <p className="text-xs text-text-muted">
            Automated actions taken by the system to maintain adherence
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Interventions', value: allInterventions.length, color: 'text-foreground', sub: `${totalAuto} automated` },
          { label: 'Successfully Resolved', value: resolved, color: 'text-green-600', sub: `${allInterventions.length > 0 ? Math.round((resolved / allInterventions.length) * 100) : 0}% success rate` },
          { label: 'Escalations', value: escalations, color: 'text-amber-600', sub: 'SMS → Voice → Mail → Pharmacist' },
          { label: 'Side Effects Caught', value: sideEffects, color: 'text-purple-600', sub: 'Detected & triaged automatically' },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-border-light rounded-xl p-4">
            <p className="text-[10px] text-text-muted uppercase tracking-wider">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color} mt-1`}>{s.value}</p>
            <p className="text-[10px] text-text-muted mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4">
        <select
          value={channelFilter}
          onChange={(e) => setChannelFilter(e.target.value)}
          className="bg-white border border-border-light rounded-lg px-3 py-2 text-xs text-foreground outline-none"
        >
          <option value="all">All Channels</option>
          <option value="sms">SMS</option>
          <option value="voice">Voice</option>
          <option value="mail">Mail</option>
          <option value="system">System</option>
          <option value="pharmacist">Pharmacist</option>
        </select>
        <select
          value={outcomeFilter}
          onChange={(e) => setOutcomeFilter(e.target.value)}
          className="bg-white border border-border-light rounded-lg px-3 py-2 text-xs text-foreground outline-none"
        >
          <option value="all">All Outcomes</option>
          <option value="success">Resolved</option>
          <option value="warning">In Progress</option>
          <option value="problem">Needs Attention</option>
        </select>
        <span className="text-xs text-text-muted ml-auto">{filtered.length} interventions</span>
      </div>

      {/* Intervention list */}
      <div className="space-y-2">
        {filtered.slice(0, 30).map((event) => {
          const patient = patients.find((p) => p.id === event.patientId);
          const outcome = outcomeColor[event.outcome || 'neutral'];
          const channel = event.channel || 'system';

          return (
            <div
              key={event.id}
              className="bg-white border border-border-light rounded-xl p-4 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 ${outcome.dot} rounded-full mt-1.5 flex-shrink-0`} />
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-medium text-foreground">
                        {patient?.firstName} {patient?.lastName}
                      </span>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${channelColor[channel]}`}>
                        {channelLabel[channel]}
                      </span>
                      {event.automated && (
                        <span className="text-[10px] text-accent bg-accent/5 px-1.5 py-0.5 rounded">
                          Automated
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-medium text-foreground">{event.title}</p>
                    <p className="text-[10px] text-text-secondary leading-relaxed mt-0.5">{event.description}</p>
                    {event.metadata && (
                      <div className="flex items-center gap-3 mt-1.5">
                        {event.metadata.sentiment !== undefined && (
                          <span className="text-[10px] text-text-muted">Sentiment: <span className="font-medium">{event.metadata.sentiment}%</span></span>
                        )}
                        {event.metadata.pdc_current !== undefined && (
                          <span className="text-[10px] text-text-muted">PDC: <span className="font-medium">{event.metadata.pdc_current}%</span></span>
                        )}
                        {event.metadata.duration_min !== undefined && (
                          <span className="text-[10px] text-text-muted">Call: {event.metadata.duration_min}min</span>
                        )}
                        {event.metadata.severity !== undefined && (
                          <span className="text-[10px] text-text-muted">Severity: {event.metadata.severity}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                  <span className={`text-[10px] font-medium ${outcome.text}`}>{outcome.label}</span>
                  <span className="text-[10px] text-text-muted">{event.date}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
