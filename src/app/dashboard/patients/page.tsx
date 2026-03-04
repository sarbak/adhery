'use client';

import { useState } from 'react';
import { patients, interactions } from '@/lib/seed-data';

function PatientDetail({ patientId, onClose }: { patientId: string; onClose: () => void }) {
  const patient = patients.find((p) => p.id === patientId)!;
  const patientInteractions = interactions
    .filter((i) => i.patientId === patientId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 20);

  const channelIcon: Record<string, { color: string; label: string }> = {
    sms: { color: 'text-blue-400 bg-blue-400/10', label: 'SMS' },
    voice: { color: 'text-green-400 bg-green-400/10', label: 'Voice' },
    mail: { color: 'text-amber-400 bg-amber-400/10', label: 'Mail' },
  };

  return (
    <div className="bg-dash-bg-secondary border border-dash-border">
      {/* Header */}
      <div className="p-4 border-b border-dash-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-dash-accent/10 text-dash-accent flex items-center justify-center text-sm font-bold">
            {patient.firstName[0]}{patient.lastName[0]}
          </div>
          <div>
            <h2 className="text-sm font-semibold text-dash-text">{patient.firstName} {patient.lastName}</h2>
            <p className="text-xs text-dash-text-muted">{patient.email}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-dash-text-muted hover:text-dash-text text-xs">
          Close &times;
        </button>
      </div>

      {/* Patient stats */}
      <div className="grid grid-cols-4 border-b border-dash-border">
        {[
          { label: 'Adherence', value: `${patient.adherenceRate}%` },
          { label: 'Risk Score', value: patient.riskScore },
          { label: 'Enrolled', value: patient.enrollmentDate },
          { label: 'Last Contact', value: patient.lastContact },
        ].map((s) => (
          <div key={s.label} className="p-3 border-r border-dash-border last:border-r-0">
            <p className="text-[10px] text-dash-text-muted uppercase tracking-wider">{s.label}</p>
            <p className="text-sm font-medium text-dash-text mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Interaction timeline */}
      <div className="p-4">
        <p className="text-xs font-medium text-dash-text mb-3">Interaction Timeline</p>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {patientInteractions.map((int) => (
            <div key={int.id} className="flex items-start gap-3 p-2 hover:bg-dash-bg-tertiary transition-colors">
              <span className={`text-[10px] font-medium px-2 py-0.5 flex-shrink-0 ${channelIcon[int.channel].color}`}>
                {channelIcon[int.channel].label}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-dash-text-muted">
                    {int.direction === 'outbound' ? 'Sent' : 'Received'}
                  </span>
                  {int.metadata?.sideEffectMentioned && (
                    <span className="text-[10px] text-red-400 bg-red-400/10 px-1.5 py-0.5">Side Effect</span>
                  )}
                  {int.metadata?.escalated && (
                    <span className="text-[10px] text-orange-400 bg-orange-400/10 px-1.5 py-0.5">Escalated</span>
                  )}
                </div>
                <p className="text-xs text-dash-text-secondary mt-0.5 line-clamp-2">{int.content}</p>
                {int.metadata?.sentiment !== undefined && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-dash-text-muted">Sentiment:</span>
                    <div className="w-16 h-1.5 bg-dash-bg-tertiary">
                      <div
                        className={`h-full ${int.metadata.sentiment > 0.7 ? 'bg-green-500' : int.metadata.sentiment > 0.4 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${int.metadata.sentiment * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-dash-text-muted">{Math.round(int.metadata.sentiment * 100)}%</span>
                  </div>
                )}
                {int.metadata?.duration && (
                  <span className="text-[10px] text-dash-text-muted mt-0.5 block">Duration: {int.metadata.duration}</span>
                )}
              </div>
              <span className="text-[10px] text-dash-text-muted flex-shrink-0">{int.createdAt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PatientsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'adherence' | 'risk'>('risk');

  const filtered = patients
    .filter((p) => {
      const matchSearch = `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'risk') return b.riskScore - a.riskScore;
      if (sortBy === 'adherence') return a.adherenceRate - b.adherenceRate;
      return a.lastName.localeCompare(b.lastName);
    });

  const statusColor: Record<string, string> = {
    active: 'text-green-400 bg-green-400/10',
    at_risk: 'text-yellow-400 bg-yellow-400/10',
    non_adherent: 'text-red-400 bg-red-400/10',
    graduated: 'text-blue-400 bg-blue-400/10',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold text-dash-text">Patients</h1>
          <p className="text-xs text-dash-text-muted">{patients.length} enrolled patients</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Search patients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-dash-bg-secondary border border-dash-border px-3 py-2 text-xs text-dash-text placeholder:text-dash-text-muted outline-none focus:border-dash-accent w-64"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-dash-bg-secondary border border-dash-border px-3 py-2 text-xs text-dash-text outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="at_risk">At Risk</option>
          <option value="non_adherent">Non-Adherent</option>
          <option value="graduated">Graduated</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="bg-dash-bg-secondary border border-dash-border px-3 py-2 text-xs text-dash-text outline-none"
        >
          <option value="risk">Sort by Risk</option>
          <option value="adherence">Sort by Adherence</option>
          <option value="name">Sort by Name</option>
        </select>
        <span className="text-xs text-dash-text-muted ml-auto">{filtered.length} results</span>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-4">
        {/* Patient list */}
        <div className="bg-dash-bg-secondary border border-dash-border">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_80px_80px_80px_90px_90px] px-4 py-2 border-b border-dash-border text-[10px] text-dash-text-muted uppercase tracking-wider">
            <span>Patient</span>
            <span>Status</span>
            <span>Adherence</span>
            <span>Risk</span>
            <span>Last Contact</span>
            <span>Channel</span>
          </div>
          <div className="max-h-[600px] overflow-y-auto">
            {filtered.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelectedPatient(p.id)}
                className={`grid grid-cols-[1fr_80px_80px_80px_90px_90px] px-4 py-2.5 border-b border-dash-border cursor-pointer transition-colors ${
                  selectedPatient === p.id ? 'bg-dash-accent/5 border-l-2 border-l-dash-accent' : 'hover:bg-dash-bg-tertiary border-l-2 border-l-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-dash-accent/10 text-dash-accent flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                    {p.firstName[0]}{p.lastName[0]}
                  </div>
                  <div>
                    <p className="text-xs text-dash-text">{p.firstName} {p.lastName}</p>
                    <p className="text-[10px] text-dash-text-muted">{p.phone}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-medium px-1.5 py-0.5 self-center ${statusColor[p.status]}`}>
                  {p.status.replace('_', ' ')}
                </span>
                <span className={`text-xs self-center ${p.adherenceRate < 70 ? 'text-red-400' : p.adherenceRate < 85 ? 'text-yellow-400' : 'text-green-400'}`}>
                  {p.adherenceRate}%
                </span>
                <span className={`text-xs self-center ${p.riskScore > 70 ? 'text-red-400' : p.riskScore > 40 ? 'text-yellow-400' : 'text-dash-text-secondary'}`}>
                  {p.riskScore}
                </span>
                <span className="text-[10px] text-dash-text-muted self-center">{p.lastContact}</span>
                <span className="text-[10px] text-dash-text-muted self-center capitalize">{p.channelPreference}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Patient detail panel */}
        {selectedPatient ? (
          <PatientDetail patientId={selectedPatient} onClose={() => setSelectedPatient(null)} />
        ) : (
          <div className="bg-dash-bg-secondary border border-dash-border flex items-center justify-center p-8">
            <p className="text-xs text-dash-text-muted">Select a patient to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
