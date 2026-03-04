'use client';

import { useState } from 'react';
import { alerts, patients } from '@/lib/seed-data';

export default function AlertsPage() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');

  const filtered = alerts.filter((a) => {
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchSeverity = severityFilter === 'all' || a.severity === severityFilter;
    return matchStatus && matchSeverity;
  });

  const severityColor: Record<string, string> = {
    critical: 'text-red-400 bg-red-400/10 border-red-400/30',
    high: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
    medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
    low: 'text-text-muted bg-surface-warm border-border-light',
  };

  const statusBadge: Record<string, string> = {
    open: 'text-red-400',
    acknowledged: 'text-yellow-400',
    resolved: 'text-green-400',
  };

  const typeIcon: Record<string, string> = {
    missed_dose: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    side_effect: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z',
    unreachable: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728A9 9 0 105.636 5.636',
    refill_gap: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
  };

  const typeLabel: Record<string, string> = {
    missed_dose: 'Missed Dose',
    side_effect: 'Side Effect',
    unreachable: 'Unreachable',
    refill_gap: 'Refill Gap',
  };

  const openCount = alerts.filter((a) => a.status === 'open').length;
  const criticalCount = alerts.filter((a) => a.severity === 'critical' && a.status !== 'resolved').length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Alerts</h1>
          <p className="text-xs text-text-muted">
            {openCount} open alerts{criticalCount > 0 && ` - ${criticalCount} critical`}
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Open', count: alerts.filter((a) => a.status === 'open').length, color: 'text-red-400' },
          { label: 'Acknowledged', count: alerts.filter((a) => a.status === 'acknowledged').length, color: 'text-yellow-400' },
          { label: 'Resolved', count: alerts.filter((a) => a.status === 'resolved').length, color: 'text-green-400' },
          { label: 'Critical', count: criticalCount, color: 'text-red-400' },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-border-light p-3">
            <p className="text-[10px] text-text-muted uppercase tracking-wider">{s.label}</p>
            <p className={`text-xl font-bold ${s.color}`}>{s.count}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border border-border-light px-3 py-2 text-xs text-foreground outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="open">Open</option>
          <option value="acknowledged">Acknowledged</option>
          <option value="resolved">Resolved</option>
        </select>
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="bg-white border border-border-light px-3 py-2 text-xs text-foreground outline-none"
        >
          <option value="all">All Severities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Alert list */}
      <div className="space-y-2">
        {filtered.map((alert) => {
          const patient = patients.find((p) => p.id === alert.patientId);
          return (
            <div
              key={alert.id}
              className={`bg-white border p-4 ${severityColor[alert.severity]}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 flex-shrink-0">
                    <path d={typeIcon[alert.type]} />
                  </svg>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-foreground">
                        {patient?.firstName} {patient?.lastName}
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 bg-surface-warm">
                        {typeLabel[alert.type]}
                      </span>
                      <span className={`text-[10px] font-medium uppercase ${severityColor[alert.severity].split(' ')[0]}`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">{alert.notes}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-[10px] text-text-muted">Created: {alert.createdAt}</span>
                      {alert.resolvedAt && (
                        <span className="text-[10px] text-green-400">Resolved: {alert.resolvedAt}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${statusBadge[alert.status] === 'text-red-400' ? 'bg-red-400' : statusBadge[alert.status] === 'text-yellow-400' ? 'bg-yellow-400' : 'bg-green-400'}`} />
                  <span className={`text-[10px] font-medium capitalize ${statusBadge[alert.status]}`}>
                    {alert.status}
                  </span>
                </div>
              </div>
              {alert.status === 'open' && (
                <div className="flex gap-2 mt-3 ml-7">
                  <button className="text-[10px] font-medium text-foreground bg-surface-warm hover:bg-border-light px-3 py-1 transition-colors">
                    Acknowledge
                  </button>
                  <button className="text-[10px] font-medium text-white bg-accent hover:bg-accent-dark px-3 py-1 transition-colors">
                    Resolve
                  </button>
                  <button className="text-[10px] font-medium text-text-muted hover:text-foreground px-3 py-1 transition-colors">
                    View Patient
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
