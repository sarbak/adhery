'use client';

import { useState } from 'react';
import { drugProgram } from '@/lib/seed-data';

function ProgramDetail() {
  const [activeTab, setActiveTab] = useState<'cadence' | 'side_effects' | 'content'>('cadence');

  return (
    <div className="bg-dash-bg-secondary border border-dash-border">
      {/* Header */}
      <div className="p-4 border-b border-dash-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-dash-text">{drugProgram.drugName}</h2>
            <p className="text-xs text-dash-text-muted">{drugProgram.drugClass}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-lg font-bold text-dash-accent">{drugProgram.adherenceRate}%</p>
              <p className="text-[10px] text-dash-text-muted">Adherence Rate</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-dash-text">{drugProgram.activePatients}</p>
              <p className="text-[10px] text-dash-text-muted">Active Patients</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-dash-text-secondary mt-2">
          Schedule: {drugProgram.scheduleConfig}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-dash-border">
        {[
          { key: 'cadence', label: 'Outreach Cadence' },
          { key: 'side_effects', label: 'Side Effects Monitored' },
          { key: 'content', label: 'Content Library' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? 'border-dash-accent text-dash-accent'
                : 'border-transparent text-dash-text-secondary hover:text-dash-text'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-4">
        {activeTab === 'cadence' && (
          <div className="space-y-4">
            {[
              { channel: 'SMS/iMessage', config: drugProgram.outreachCadence.sms, color: 'bg-blue-500' },
              { channel: 'Voice Calls', config: drugProgram.outreachCadence.voice, color: 'bg-green-500' },
              { channel: 'Physical Mail', config: drugProgram.outreachCadence.mail, color: 'bg-amber-500' },
            ].map((ch) => (
              <div key={ch.channel} className="flex items-start gap-3">
                <div className={`w-2 h-2 ${ch.color} mt-1.5 flex-shrink-0`} />
                <div>
                  <p className="text-xs font-medium text-dash-text">{ch.channel}</p>
                  <p className="text-xs text-dash-text-secondary mt-0.5">{ch.config}</p>
                </div>
              </div>
            ))}
            <div className="mt-4 p-3 bg-dash-bg-tertiary border border-dash-border">
              <p className="text-[10px] text-dash-text-muted uppercase tracking-wider mb-2">Escalation Rules</p>
              <div className="space-y-1 text-xs text-dash-text-secondary">
                <p>1. Start with SMS reminders on dose day</p>
                <p>2. If no response after 2 SMS: trigger voice call</p>
                <p>3. If unreachable by phone after 2 attempts: send physical mail</p>
                <p>4. High-risk patients (score &gt;70): skip to voice call immediately</p>
                <p>5. Side effect reports: auto-escalate to pharmacist review</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'side_effects' && (
          <div className="grid grid-cols-2 gap-2">
            {drugProgram.sideEffectsMonitored.map((se) => (
              <div key={se} className="flex items-center gap-2 p-2 bg-dash-bg-tertiary text-xs text-dash-text-secondary">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-dash-warning flex-shrink-0">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {se}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-2">
            {[
              { type: 'SMS Template', name: 'Dose Day Reminder', status: 'Active' },
              { type: 'SMS Template', name: 'Missed Dose Follow-up', status: 'Active' },
              { type: 'SMS Template', name: 'Refill Reminder', status: 'Active' },
              { type: 'Voice Script', name: 'Monthly Check-in', status: 'Active' },
              { type: 'Voice Script', name: 'Onboarding Education', status: 'Active' },
              { type: 'Voice Script', name: 'Side Effect Triage', status: 'Active' },
              { type: 'Mail Piece', name: 'Welcome Kit', status: 'Active' },
              { type: 'Mail Piece', name: 'Quarterly Newsletter', status: 'Draft' },
              { type: 'Mail Piece', name: 'Refill Reminder Letter', status: 'Active' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2 hover:bg-dash-bg-tertiary transition-colors">
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] px-2 py-0.5 ${
                    item.type.startsWith('SMS') ? 'text-blue-400 bg-blue-400/10' :
                    item.type.startsWith('Voice') ? 'text-green-400 bg-green-400/10' :
                    'text-amber-400 bg-amber-400/10'
                  }`}>
                    {item.type}
                  </span>
                  <span className="text-xs text-dash-text">{item.name}</span>
                </div>
                <span className={`text-[10px] ${
                  item.status === 'Active' ? 'text-dash-success' : 'text-dash-text-muted'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProgramsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold text-dash-text">Programs</h1>
          <p className="text-xs text-dash-text-muted">Drug adherence programs</p>
        </div>
        <button className="text-xs font-medium text-dash-bg bg-dash-accent hover:bg-dash-accent-dim px-4 py-2 transition-colors">
          + New Program
        </button>
      </div>

      {/* Program list (just one for prototype) */}
      <div className="mb-4 p-3 bg-dash-bg-secondary border border-dash-accent/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-dash-success" />
          <div>
            <p className="text-sm font-medium text-dash-text">{drugProgram.drugName}</p>
            <p className="text-xs text-dash-text-muted">{drugProgram.activePatients} patients - {drugProgram.adherenceRate}% adherence</p>
          </div>
        </div>
        <span className="text-[10px] text-dash-accent">Selected</span>
      </div>

      <ProgramDetail />
    </div>
  );
}
