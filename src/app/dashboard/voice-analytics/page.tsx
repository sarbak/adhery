'use client';

import { interactions, patients } from '@/lib/seed-data';

export default function VoiceAnalyticsPage() {
  const voiceCalls = interactions
    .filter((i) => i.channel === 'voice')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const totalCalls = voiceCalls.length;
  const avgSentiment = voiceCalls.reduce((sum, c) => sum + (c.metadata?.sentiment || 0), 0) / totalCalls;
  const sideEffectCalls = voiceCalls.filter((c) => c.metadata?.sideEffectMentioned).length;
  const escalatedCalls = voiceCalls.filter((c) => c.metadata?.escalated).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold text-dash-text">Voice Analytics</h1>
          <p className="text-xs text-dash-text-muted">Post-call analysis and conversation intelligence</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Calls', value: totalCalls },
          { label: 'Avg Sentiment', value: `${Math.round(avgSentiment * 100)}%`, color: avgSentiment > 0.7 ? 'text-green-400' : 'text-yellow-400' },
          { label: 'Side Effects Detected', value: sideEffectCalls, color: 'text-orange-400' },
          { label: 'Escalations', value: escalatedCalls, color: 'text-red-400' },
        ].map((s) => (
          <div key={s.label} className="bg-dash-bg-secondary border border-dash-border p-3">
            <p className="text-[10px] text-dash-text-muted uppercase tracking-wider">{s.label}</p>
            <p className={`text-xl font-bold ${s.color || 'text-dash-text'}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Sentiment distribution */}
      <div className="bg-dash-bg-secondary border border-dash-border p-4 mb-6">
        <p className="text-sm font-medium text-dash-text mb-4">Sentiment Distribution</p>
        <div className="flex gap-3">
          {[
            { label: 'Positive (>70%)', count: voiceCalls.filter((c) => (c.metadata?.sentiment || 0) > 0.7).length, color: 'bg-green-500' },
            { label: 'Neutral (40-70%)', count: voiceCalls.filter((c) => { const s = c.metadata?.sentiment || 0; return s >= 0.4 && s <= 0.7; }).length, color: 'bg-yellow-500' },
            { label: 'Negative (<40%)', count: voiceCalls.filter((c) => (c.metadata?.sentiment || 0) < 0.4).length, color: 'bg-red-500' },
          ].map((bucket) => (
            <div key={bucket.label} className="flex-1 bg-dash-bg-tertiary p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 ${bucket.color}`} />
                <span className="text-xs text-dash-text-secondary">{bucket.label}</span>
              </div>
              <p className="text-lg font-bold text-dash-text">{bucket.count}</p>
              <p className="text-[10px] text-dash-text-muted">{Math.round((bucket.count / totalCalls) * 100)}% of calls</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent calls */}
      <div className="bg-dash-bg-secondary border border-dash-border">
        <div className="p-4 border-b border-dash-border">
          <p className="text-sm font-medium text-dash-text">Recent Voice Calls</p>
        </div>
        <div className="divide-y divide-dash-border">
          {voiceCalls.slice(0, 15).map((call) => {
            const patient = patients.find((p) => p.id === call.patientId);
            const sentiment = call.metadata?.sentiment || 0;

            return (
              <div key={call.id} className="p-4 hover:bg-dash-bg-tertiary transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-dash-accent/10 text-dash-accent flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                      {patient?.firstName[0]}{patient?.lastName[0]}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-dash-text">
                        {patient?.firstName} {patient?.lastName}
                      </p>
                      <p className="text-[10px] text-dash-text-muted">
                        {call.createdAt} - Duration: {call.metadata?.duration || 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {call.metadata?.sideEffectMentioned && (
                      <span className="text-[10px] text-orange-400 bg-orange-400/10 px-2 py-0.5">Side Effect</span>
                    )}
                    {call.metadata?.escalated && (
                      <span className="text-[10px] text-red-400 bg-red-400/10 px-2 py-0.5">Escalated</span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-dash-text-secondary leading-relaxed mb-2 ml-10">
                  {call.content}
                </p>

                {/* Analysis bar */}
                <div className="flex items-center gap-4 ml-10">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-dash-text-muted">Sentiment:</span>
                    <div className="w-20 h-1.5 bg-dash-bg-tertiary">
                      <div
                        className={`h-full ${sentiment > 0.7 ? 'bg-green-500' : sentiment > 0.4 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${sentiment * 100}%` }}
                      />
                    </div>
                    <span className={`text-[10px] font-medium ${sentiment > 0.7 ? 'text-green-400' : sentiment > 0.4 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {Math.round(sentiment * 100)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-dash-text-muted">Adherence:</span>
                    <span className="text-[10px] text-dash-text-secondary">
                      {sentiment > 0.6 ? 'Confirmed' : 'Concern flagged'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
