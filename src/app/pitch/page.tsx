'use client';

import { useState, useEffect, useCallback } from 'react';

// ─── Constants ───
const ACCENT = '#1e3a5f';
const ACCENT_LIGHT = '#2563eb';

// ─── Shared slide wrapper with top-left title ───
function SlideLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full px-16 pt-20 pb-16">
      <h2 className="font-serif text-4xl text-foreground mb-10 leading-tight">
        {title}
      </h2>
      <div className="flex-1 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
}

// ─── Slide Components ───

function TitleSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <h1 className="font-serif text-6xl text-foreground mb-8 leading-tight max-w-4xl">
        Conversational AI that keeps{' '}
        <span className="text-accent whitespace-nowrap">GLP-1&nbsp;patients</span>
        {' '}on therapy
      </h1>
      <p className="text-xl text-text-secondary max-w-2xl">
        Most patients churn in the first 90 days. Adhery catches them
        with real conversations at scale.
      </p>
      <div className="mt-20 flex items-center gap-3 text-text-muted text-sm">
        <span>Press</span>
        <kbd className="px-2 py-1 border border-border-light rounded text-xs font-mono">
          &rarr;
        </kbd>
        <span>to navigate</span>
      </div>
      <span className="absolute bottom-6 right-8 text-[10px] text-text-muted/50">
        v7.0
      </span>
    </div>
  );
}

function ChurnCurveSlide() {
  const W = 700;
  const H = 440;
  const PAD_L = 60;
  const PAD_R = 20;
  const PAD_T = 10;
  const PAD_B = 50;

  const chartW = W - PAD_L - PAD_R;
  const chartH = H - PAD_T - PAD_B;

  const x = (d: number) => PAD_L + (d / 365) * chartW;
  const y = (p: number) => PAD_T + ((100 - p) / 100) * chartH;

  const x90 = x(90);

  // Smooth cubic bezier curve
  const curve = `M ${x(0)} ${y(100)} C ${x(25)} ${y(90)}, ${x(55)} ${y(55)}, ${x(90)} ${y(40)} C ${x(140)} ${y(30)}, ${x(220)} ${y(25)}, ${x(365)} ${y(22)}`;

  // Fill under curve to day 90
  const fill90 = `M ${x(0)} ${y(100)} C ${x(25)} ${y(90)}, ${x(55)} ${y(55)}, ${x(90)} ${y(40)} L ${x90} ${y(0)} L ${x(0)} ${y(0)} Z`;

  return (
    <SlideLayout title="Most GLP-1 churn happens in the first 90 days">
      <div className="max-w-4xl w-full">
        {/* Axis labels */}
        <div className="flex justify-between mb-1 px-2">
          <span className="text-xs text-text-muted uppercase tracking-wider">Patients on therapy (%)</span>
          <span className="text-xs text-text-muted uppercase tracking-wider">Time</span>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
          {/* Grid lines + Y labels */}
          {[100, 80, 60, 40, 20, 0].map((p) => (
            <g key={p}>
              <line x1={PAD_L} y1={y(p)} x2={W - PAD_R} y2={y(p)} stroke="#e2e8f0" strokeWidth="0.5" />
              <text x={PAD_L - 10} y={y(p) + 4} textAnchor="end" fontSize="12" fill="#94a3b8" fontFamily="system-ui">
                {p}%
              </text>
            </g>
          ))}

          {/* 90-day shaded zone */}
          <path d={fill90} fill="#dc2626" opacity="0.06" />

          {/* 90-day dashed line */}
          <line x1={x90} y1={PAD_T} x2={x90} y2={H - PAD_B} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="6 4" />

          {/* Smooth curve */}
          <path d={curve} fill="none" stroke={ACCENT} strokeWidth="2.5" />

          {/* Dot at day 90 intersection */}
          <circle cx={x90} cy={y(40)} r="5" fill="#dc2626" />

          {/* X-axis labels */}
          {[
            { d: 0, label: 'Day 0', color: '#94a3b8', bold: false },
            { d: 90, label: 'Day 90', color: '#dc2626', bold: true },
            { d: 180, label: '6 mo', color: '#94a3b8', bold: false },
            { d: 365, label: '12 mo', color: '#94a3b8', bold: false },
          ].map((tick) => (
            <text
              key={tick.d}
              x={x(tick.d)}
              y={H - 15}
              textAnchor="middle"
              fontSize="12"
              fill={tick.color}
              fontWeight={tick.bold ? 'bold' : 'normal'}
              fontFamily="system-ui"
            >
              {tick.label}
            </text>
          ))}
        </svg>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className="w-10 h-0.5 bg-[#dc2626]" />
        <p className="text-sm text-[#dc2626] font-semibold">60% of total churn happens in this window</p>
        <div className="w-10 h-0.5 bg-[#dc2626]" />
      </div>
    </SlideLayout>
  );
}

function ChurnReasonsSlide() {
  const reasons = [
    {
      title: 'Side effects',
      desc: 'Nausea and fatigue hit hardest in weeks 2-6. No guidance means patients assume the worst.',
    },
    {
      title: 'Expectation mismatch',
      desc: '"I lost 8 lbs, I\'m good." No understanding of rebound risk or long-term benefits.',
    },
    {
      title: 'Support gap',
      desc: 'Questions at 5pm, callback next Tuesday. By then they\'ve already decided to stop.',
    },
    {
      title: 'Refill friction',
      desc: 'Prior auth delays, pharmacy switches, insurance changes. Each one a natural exit point.',
    },
  ];

  return (
    <div className="flex flex-col h-full px-16 pt-20 pb-16">
      <h2 className="font-serif text-4xl text-foreground mb-6 leading-tight">
        Patients leave for predictable reasons
      </h2>
      <div className="max-w-3xl w-full space-y-5">
        {reasons.map((r, i) => (
          <div key={r.title} className="flex items-start gap-5">
            <div
              className="w-8 h-8 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5"
              style={{ backgroundColor: ACCENT }}
            >
              {i + 1}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{r.title}</h3>
              <p className="text-sm text-text-secondary mt-1">{r.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExistingToolsSlide() {
  const tools = [
    {
      name: 'SMS / Push',
      limitation: 'One-way. No conversation. Easy to ignore.',
      stat: '< 5% response',
    },
    {
      name: 'Support teams',
      limitation: 'Reactive only. Silent churners never call in.',
      stat: 'Miss 80%+ at-risk',
    },
    {
      name: 'Clinician check-ins',
      limitation: 'Too expensive to scale for every patient.',
      stat: '$50-150 per call',
    },
  ];

  return (
    <SlideLayout title="Existing tools miss the critical churn moments">
      <div className="max-w-4xl w-full space-y-5">
        {tools.map((t) => (
          <div key={t.name} className="bg-surface border border-border-light p-6 text-left flex gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-1">{t.name}</h3>
              <p className="text-sm text-text-secondary">{t.limitation}</p>
            </div>
            <div className="flex-shrink-0 flex items-center">
              <span className="text-sm font-medium text-[#dc2626] bg-[#dc2626]/10 px-3 py-1.5">{t.stat}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-base text-foreground mt-8">
        What&rsquo;s missing: <span className="font-semibold text-accent">real conversations at the right moment</span>
      </p>
    </SlideLayout>
  );
}

function PositioningSlide() {
  return (
    <SlideLayout title="The conversational layer between messaging and care teams">
      <div className="max-w-5xl w-full flex items-stretch gap-3">
        {/* Left: Messaging */}
        <div className="w-44 bg-surface border border-border-light p-5 text-left flex flex-col opacity-50">
          <p className="text-[10px] text-text-muted uppercase tracking-wider mb-2">Your messaging</p>
          <h3 className="text-sm font-semibold text-foreground mb-3">SMS, push, email</h3>
          <ul className="text-xs text-text-secondary space-y-1.5 flex-1">
            <li>Reminders</li>
            <li>Refill notifications</li>
            <li>Educational content</li>
          </ul>
          <p className="text-[10px] text-text-muted mt-3 pt-2 border-t border-border-light">Broadcasts info</p>
        </div>

        {/* Center: Adhery - dominant */}
        <div className="flex-1 border-2 border-accent p-8 text-left flex flex-col relative" style={{ backgroundColor: 'rgba(30, 58, 95, 0.04)' }}>
          <div className="absolute -top-3 left-6 bg-accent text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
            Adhery
          </div>
          <h3 className="text-2xl font-semibold text-foreground mb-6 mt-2">Conversational AI</h3>
          <div className="grid grid-cols-2 gap-4 flex-1">
            {[
              ['Proactive outreach', 'Reaches at-risk patients before they disengage'],
              ['Side effect triage', 'Real-time clinically grounded guidance'],
              ['Motivation coaching', 'Rebound risk education, goal reinforcement'],
              ['Smart escalation', 'Pre-populated summaries to your care team'],
            ].map(([title, desc]) => (
              <div key={title} className="flex items-start gap-2">
                <span className="text-accent mt-0.5 text-sm">&#9654;</span>
                <div>
                  <p className="text-sm font-medium text-foreground">{title}</p>
                  <p className="text-xs text-text-secondary">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-accent mt-4 pt-3 border-t border-accent/20 font-medium">
            Has conversations. Understands context. Knows when to hand off.
          </p>
        </div>

        {/* Right: Care Teams */}
        <div className="w-44 bg-surface border border-border-light p-5 text-left flex flex-col opacity-50">
          <p className="text-[10px] text-text-muted uppercase tracking-wider mb-2">Your care teams</p>
          <h3 className="text-sm font-semibold text-foreground mb-3">Clinicians + support</h3>
          <ul className="text-xs text-text-secondary space-y-1.5 flex-1">
            <li>Complex clinical decisions</li>
            <li>Dose adjustments</li>
            <li>High-acuity patients</li>
          </ul>
          <p className="text-[10px] text-text-muted mt-3 pt-2 border-t border-border-light">Handles exceptions</p>
        </div>
      </div>
    </SlideLayout>
  );
}

function HowItWorksSlide() {
  const phases = [
    {
      title: 'Engage',
      desc: 'Proactive outreach during high-churn windows',
      color: ACCENT,
    },
    {
      title: 'Triage',
      desc: 'Clinically grounded responses to symptoms and doubts',
      color: ACCENT_LIGHT,
    },
    {
      title: 'Escalate',
      desc: 'Flag severe cases to your team with full context',
      color: '#22c55e',
    },
  ];

  return (
    <SlideLayout title="How Adhery works">
      <div className="max-w-4xl w-full">
        {/* Arrow phases */}
        <div className="flex items-stretch">
          {phases.map((p, i) => (
            <div key={p.title} className="flex-1 flex items-stretch">
              <div
                className="flex-1 p-6 flex flex-col justify-center relative"
                style={{ backgroundColor: p.color }}
              >
                <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-white/80">{p.desc}</p>
              </div>
              {i < phases.length - 1 && (
                <div className="flex items-center -mr-3 z-10">
                  <svg width="24" height="80" viewBox="0 0 24 80" fill="none">
                    <polygon points="0,0 24,40 0,80" fill={p.color} />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 bg-surface-warm border border-border-light px-6 py-3 max-w-3xl">
        <p className="text-xs text-text-secondary">
          <span className="font-semibold text-foreground">Compliance:</span>{' '}
          FDA-compliant response boundaries. Never diagnoses, prescribes, or recommends dosage changes.
        </p>
      </div>
    </SlideLayout>
  );
}

function PatientStorySlide() {
  const timeline = [
    { day: 'Day 8', event: 'Reports nausea', tag: 'Side effects' },
    { day: 'Day 22', event: '"I\'ve lost enough, can I stop?"', tag: 'Expectations' },
    { day: 'Day 45', event: 'Missed refill window', tag: 'Refill friction' },
    { day: 'Day 67', event: '"Do I really need this?"', tag: 'Support gap' },
    { day: 'Day 90', event: 'Still on therapy', tag: '' },
  ];

  return (
    <SlideLayout title="Keeping one patient through day 90">
      <div className="max-w-3xl w-full">
        {timeline.map((t, i) => (
          <div key={t.day} className="flex items-start gap-6 relative">
            <div className="flex flex-col items-center">
              <div
                className="w-3.5 h-3.5 rounded-full z-10 flex-shrink-0"
                style={{ backgroundColor: i === timeline.length - 1 ? '#22c55e' : ACCENT }}
              />
              {i < timeline.length - 1 && (
                <div className="w-0.5 bg-border-light" style={{ height: '44px' }} />
              )}
            </div>
            <div className="flex items-baseline gap-4 -mt-1 pb-5">
              <span
                className="text-sm font-bold flex-shrink-0 w-14"
                style={{ color: i === timeline.length - 1 ? '#22c55e' : ACCENT }}
              >
                {t.day}
              </span>
              <span className={`text-base ${i === timeline.length - 1 ? 'font-semibold text-[#22c55e]' : 'text-foreground'}`}>
                {t.event}
              </span>
              {t.tag && (
                <span className="text-[10px] font-medium px-1.5 py-0.5 bg-accent/10 text-accent flex-shrink-0">
                  {t.tag}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="text-sm text-text-secondary mt-4">
        Four churn moments addressed. Zero clinical escalations.
      </p>
    </SlideLayout>
  );
}

function RetentionImpactSlide() {
  const baseline = 60;
  const adheryHigh = 70;
  const maxH = 300;
  const barW = 140;

  return (
    <SlideLayout title="Small retention lift, large revenue impact">
      <div className="max-w-3xl w-full flex items-end gap-20">
        {/* Baseline bar */}
        <div className="flex flex-col items-center">
          <span className="text-4xl font-bold text-text-muted mb-3">{baseline}%</span>
          <div
            style={{
              width: `${barW}px`,
              height: `${(baseline / 100) * maxH}px`,
              backgroundColor: '#e2e8f0',
            }}
          />
          <p className="text-sm text-text-secondary mt-4">Baseline</p>
          <p className="text-xs text-text-muted">90-day retention</p>
        </div>

        {/* Adhery bar */}
        <div className="flex flex-col items-center">
          <span className="text-5xl font-bold text-[#22c55e] mb-3">65-{adheryHigh}%</span>
          <div className="relative" style={{ width: `${barW}px`, height: `${(adheryHigh / 100) * maxH}px` }}>
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{
                height: `${(baseline / 100) * maxH}px`,
                backgroundColor: '#e2e8f0',
              }}
            />
            <div
              className="absolute left-0 right-0 flex items-center justify-center text-white text-xs font-bold"
              style={{
                bottom: `${(baseline / 100) * maxH}px`,
                height: `${((adheryHigh - baseline) / 100) * maxH}px`,
                backgroundColor: '#22c55e',
              }}
            >
              +5-10pp
            </div>
          </div>
          <p className="text-sm font-semibold text-foreground mt-4">With Adhery</p>
          <p className="text-xs text-text-muted">90-day retention</p>
        </div>
      </div>
      <div className="mt-8 bg-surface-warm border border-border-light px-6 py-3 max-w-md">
        <p className="text-sm text-foreground">
          Per 1,000 patients: <span className="font-bold text-[#22c55e]">+50 to +100</span> still on therapy at day 90
        </p>
      </div>
    </SlideLayout>
  );
}

function ROISlide() {
  const tiers = [
    { patients: '500', retained: '25-50', revenueGain: '$50K-$250K', adheryCost: '$4-5K', label: 'Pilot' },
    { patients: '2,000', retained: '100-200', revenueGain: '$200K-$1M', adheryCost: '$15-20K', label: 'Scale' },
    { patients: '5,000', retained: '250-500', revenueGain: '$500K-$2.5M', adheryCost: '$35-45K', label: 'Enterprise' },
  ];

  return (
    <SlideLayout title="Modest retention lift pays for itself quickly">
      <div className="max-w-4xl w-full">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-foreground">
              <th className="py-3 pr-4 text-xs text-text-muted uppercase tracking-wider"></th>
              <th className="py-3 px-4 text-xs text-text-muted uppercase tracking-wider">Patients</th>
              <th className="py-3 px-4 text-xs text-text-muted uppercase tracking-wider">Add&rsquo;l retained</th>
              <th className="py-3 px-4 text-xs text-text-muted uppercase tracking-wider">Revenue protected</th>
              <th className="py-3 px-4 text-xs text-text-muted uppercase tracking-wider">Adhery cost/yr</th>
            </tr>
          </thead>
          <tbody>
            {tiers.map((t) => (
              <tr key={t.patients} className="border-b border-border-light">
                <td className="py-4 pr-4">
                  <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1">{t.label}</span>
                </td>
                <td className="py-4 px-4 text-foreground font-medium">{t.patients}</td>
                <td className="py-4 px-4 text-foreground">{t.retained}</td>
                <td className="py-4 px-4 text-[#22c55e] font-semibold">{t.revenueGain}</td>
                <td className="py-4 px-4 text-foreground">{t.adheryCost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 max-w-3xl flex gap-6">
        <div className="flex-1 bg-surface-warm border border-border-light p-4">
          <p className="text-xs text-text-muted mb-1">GLP-1 patient LTV</p>
          <p className="text-xl font-bold text-foreground">$2K-$5K</p>
          <p className="text-xs text-text-secondary">12-mo revenue per patient</p>
        </div>
        <div className="flex-1 bg-surface-warm border border-border-light p-4">
          <p className="text-xs text-text-muted mb-1">Typical ROI</p>
          <p className="text-xl font-bold text-[#22c55e]">10-50x</p>
          <p className="text-xs text-text-secondary">revenue protected vs. cost</p>
        </div>
      </div>
    </SlideLayout>
  );
}

function DashboardSlide() {
  const metrics = [
    { label: 'Active patients', value: '1,247', change: '+34 this wk', positive: true },
    { label: '30-day retention', value: '89%', change: '+3pp', positive: true },
    { label: '90-day retention', value: '67%', change: '+7pp', positive: true },
    { label: 'Escalations', value: '12', change: '3 urgent', positive: false },
  ];

  const recentContacts = [
    { patient: '#4821', reason: 'Nausea - wk 3', outcome: 'Resolved', day: 19 },
    { patient: '#3109', reason: 'Missed refill', outcome: 'Refill initiated', day: 42 },
    { patient: '#5567', reason: 'Wants to stop', outcome: 'Escalated', day: 31 },
  ];

  return (
    <SlideLayout title="Real-time visibility into patient engagement">
      {/* Screen frame */}
      <div className="max-w-5xl w-full">
        {/* Browser chrome */}
        <div className="bg-[#e2e8f0] px-4 py-2 flex items-center gap-2 rounded-t-lg">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#f87171]" />
            <div className="w-3 h-3 rounded-full bg-[#fbbf24]" />
            <div className="w-3 h-3 rounded-full bg-[#4ade80]" />
          </div>
          <div className="flex-1 bg-white/70 rounded px-3 py-0.5 mx-8">
            <span className="text-[10px] text-text-muted">app.adhery.com/dashboard</span>
          </div>
        </div>
        {/* Dashboard content */}
        <div className="bg-surface border-x border-b border-border-light p-5 rounded-b-lg shadow-lg">
          <div className="grid grid-cols-4 gap-3 mb-5">
            {metrics.map((m) => (
              <div key={m.label} className="bg-surface-warm border border-border-light p-3">
                <p className="text-[10px] text-text-muted mb-1">{m.label}</p>
                <p className="text-xl font-bold text-foreground">{m.value}</p>
                <p className={`text-[10px] mt-0.5 ${m.positive ? 'text-[#22c55e]' : 'text-[#f59e0b]'}`}>
                  {m.change}
                </p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-[10px] text-text-muted uppercase tracking-wider mb-2">Recent conversations</p>
            <div className="space-y-1">
              {recentContacts.map((c) => (
                <div key={c.patient} className="flex items-center justify-between py-1.5 border-b border-border-light last:border-0">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-medium text-foreground w-14">{c.patient}</span>
                    <span className="text-xs text-text-secondary">{c.reason}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-text-muted">Day {c.day}</span>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 ${
                      c.outcome === 'Escalated'
                        ? 'bg-[#f59e0b]/10 text-[#f59e0b]'
                        : 'bg-[#22c55e]/10 text-[#22c55e]'
                    }`}>
                      {c.outcome}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}

function GoLiveSlide() {
  return (
    <SlideLayout title="Go live in 4 weeks">
      <p className="text-lg text-text-secondary mb-10">
        Start with 100 at-risk patients. Measure impact in 30 days.
      </p>
      <div className="max-w-3xl w-full space-y-4">
        {[
          { week: 'Wk 1', task: 'Integration + data mapping' },
          { week: 'Wk 2', task: 'Conversation design + brand voice' },
          { week: 'Wk 3', task: 'Pilot cohort selection + dashboard' },
          { week: 'Wk 4', task: 'Go live + daily check-ins' },
        ].map((w) => (
          <div key={w.week} className="flex gap-6 text-left items-center">
            <span className="text-sm font-bold text-accent w-12 flex-shrink-0">{w.week}</span>
            <div className="flex-1 border-l-2 border-accent/20 pl-6">
              <p className="text-base text-foreground">{w.task}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 bg-surface-warm border border-border-light px-6 py-3">
        <p className="text-sm text-foreground">
          After 30 days: retention data, conversation analytics, clear ROI.
        </p>
      </div>
    </SlideLayout>
  );
}

function PricingSlide() {
  return (
    <SlideLayout title="Priced to protect LTV">
      <div className="max-w-3xl w-full flex items-center justify-center gap-16">
        {/* GLP-1 LTV */}
        <div className="flex-1 text-center border-2 border-accent p-8" style={{ backgroundColor: 'rgba(30, 58, 95, 0.04)' }}>
          <p className="text-xs text-text-muted uppercase tracking-wider mb-3">GLP-1 patient LTV (12 mo)</p>
          <p className="text-5xl font-bold text-accent">$2K-$5K</p>
          <p className="text-sm text-text-secondary mt-2">per patient</p>
        </div>

        <div className="text-2xl text-text-muted font-light">vs.</div>

        {/* Adhery cost */}
        <div className="flex-1 text-center border-2 border-[#22c55e] p-8" style={{ backgroundColor: 'rgba(34, 197, 94, 0.04)' }}>
          <p className="text-xs text-text-muted uppercase tracking-wider mb-3">Adhery cost (12 mo)</p>
          <p className="text-5xl font-bold text-[#22c55e]">~$100</p>
          <p className="text-sm text-text-secondary mt-2">per patient</p>
        </div>
      </div>
      <p className="text-base text-foreground mt-10">
        Keeping <span className="font-bold">one</span> patient covers the cost of protecting <span className="font-bold">20-50</span>.
      </p>
    </SlideLayout>
  );
}

function CTASlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <h2 className="font-serif text-5xl text-foreground mb-10 leading-tight max-w-4xl">
        Which 100 GLP-1 patients should we help you keep first?
      </h2>
      <div className="max-w-2xl space-y-4 text-left">
        {[
          'Pick your hardest-to-retain cohort',
          '30 days to measurable retention impact',
          'Minimal integration lift',
          'Clear ROI data before any commitment',
        ].map((item) => (
          <div key={item} className="flex items-center gap-4">
            <div className="w-2 h-2 flex-shrink-0" style={{ backgroundColor: ACCENT }} />
            <p className="text-lg text-foreground">{item}</p>
          </div>
        ))}
      </div>
      <div className="mt-16">
        <p className="text-xl text-accent font-semibold">adhery.com</p>
      </div>
    </div>
  );
}

// ─── Slide titles for editable text overlay in PPTX ───
const slideTitles: (string | null)[] = [
  null, // P1: Title slide (centered, no top-left title)
  'Most GLP-1 churn happens in the first 90 days',
  'Patients leave for predictable reasons',
  'Existing tools miss the critical churn moments',
  'The conversational layer between messaging and care teams',
  'How Adhery works',
  'Keeping one patient through day 90',
  'Small retention lift, large revenue impact',
  'Modest retention lift pays for itself quickly',
  'Real-time visibility into patient engagement',
  'Go live in 4 weeks',
  'Priced to protect LTV',
  null, // P13: CTA slide (centered, no top-left title)
];

// ─── PPTX Export: Screenshot version (pixel-perfect, titles editable) ───

async function exportScreenshotPPTX() {
  const [pptxgenModule, htmlToImage] = await Promise.all([
    import('pptxgenjs'),
    import('html-to-image'),
  ]);
  const pptxgen = pptxgenModule.default;
  const pres = new pptxgen();

  pres.layout = 'LAYOUT_WIDE';
  pres.author = 'Adhery';
  pres.subject = 'Adhery Pitch Deck v7.0 (Screenshot)';

  const FG = '1A1A2E';
  const MUT = '94A3B8';
  const hd = 'Georgia';
  const bd = 'Calibri';
  const TOTAL = slides.length;

  const originalIndex = (window as any).__currentSlideIndex ?? 0;

  for (let i = 0; i < TOTAL; i++) {
    (window as any).__setSlideIndex?.(i);
    await new Promise(r => setTimeout(r, 350));

    const el = document.querySelector('[data-slide-content]') as HTMLElement;
    if (!el) continue;

    const imgData = await htmlToImage.toPng(el, {
      pixelRatio: 2,
      backgroundColor: '#FAFAF8',
    });
    const s = pres.addSlide();

    s.addImage({ data: imgData, x: 0, y: 0, w: '100%', h: '100%' });

    const slideTitle = slideTitles[i];
    if (slideTitle) {
      s.addShape('rect' as any, { x: 0.5, y: 0.8, w: 11, h: 0.8, fill: { color: 'FAFAF8' } } as any);
      s.addText(slideTitle, { x: 0.8, y: 0.85, w: 11, h: 0.7, fontSize: 24, color: FG, fontFace: hd });
    }

    s.addShape('rect' as any, { x: 0, y: 6.9, w: 13.33, h: 0.6, fill: { color: 'FAFAF8' } } as any);
    s.addText(`${i + 1} / ${TOTAL}`, { x: 0.5, y: 7.05, w: 2, h: 0.25, fontSize: 7, color: MUT, fontFace: bd });
    s.addText('adhery.com', { x: 10.5, y: 7.05, w: 2, h: 0.25, fontSize: 7, color: MUT, fontFace: bd, align: 'right' });
  }

  (window as any).__setSlideIndex?.(originalIndex);
  pres.writeFile({ fileName: 'Adhery-Pitch-v7-screenshot.pptx' });
}

// ─── PPTX Export: Fully editable version (all text/shapes editable) ───

async function exportEditablePPTX() {
  const pptxgen = await import('pptxgenjs');
  const pres = new pptxgen.default();

  pres.layout = 'LAYOUT_WIDE';
  pres.author = 'Adhery';
  pres.subject = 'Adhery Pitch Deck v7.0 (Editable)';

  const BG = '#FAFAF8';
  const FG = '1A1A2E';
  const A = '1E3A5F';
  const AL = '2563EB';
  const SEC = '64748B';
  const MUT = '94A3B8';
  const GRN = '22C55E';
  const RED = 'DC2626';
  const SFC = 'F1F5F9';

  const hd = 'Georgia';
  const bd = 'Calibri';

  const TOTAL = 13;
  const TX = 0.8;
  const TY = 0.5;

  function footer(s: ReturnType<typeof pres.addSlide>, n: number) {
    s.addText(`${n} / ${TOTAL}`, { x: 0.5, y: 7.05, w: 2, h: 0.25, fontSize: 7, color: MUT, fontFace: bd });
    s.addText('adhery.com', { x: 10.5, y: 7.05, w: 2, h: 0.25, fontSize: 7, color: MUT, fontFace: bd, align: 'right' });
  }

  function title(s: ReturnType<typeof pres.addSlide>, text: string) {
    s.addText(text, { x: TX, y: TY, w: 11, h: 0.7, fontSize: 24, color: FG, fontFace: hd });
  }

  // P1: Title
  {
    const s = pres.addSlide();
    s.background = { color: BG };
    s.addText([
      { text: 'Conversational AI that keeps\n', options: { fontSize: 32, color: FG, fontFace: hd } },
      { text: 'GLP-1 patients', options: { fontSize: 32, color: A, fontFace: hd, bold: true } },
      { text: ' on therapy', options: { fontSize: 32, color: FG, fontFace: hd } },
    ], { x: 1.5, y: 2.2, w: 10, h: 1.8, align: 'center', lineSpacingMultiple: 1.2 });
    s.addText('Most patients churn in the first 90 days.\nAdhery catches them with real conversations at scale.', {
      x: 3, y: 4.3, w: 7, h: 0.8, fontSize: 13, color: SEC, fontFace: bd, align: 'center', lineSpacingMultiple: 1.3,
    });
    s.addText('v7.0', { x: 11.5, y: 7.05, w: 0.8, h: 0.25, fontSize: 7, color: MUT, fontFace: bd, align: 'right' });
    footer(s, 1);
  }

  // P2: Churn curve (bar chart)
  {
    const s = pres.addSlide();
    s.background = { color: BG };
    title(s, 'Most GLP-1 churn happens in the first 90 days');

    const dataPoints = [
      { label: 'Start', pct: 100, color: A },
      { label: '30d', pct: 82, color: A },
      { label: '60d', pct: 58, color: AL },
      { label: '90d', pct: 40, color: RED },
      { label: '6mo', pct: 30, color: MUT },
      { label: '12mo', pct: 23, color: MUT },
    ];
    const barW = 1.2, gap = 0.5, startX = 1.8, baseY = 6.2, maxH = 3.8;

    dataPoints.forEach((d, i) => {
      const x = startX + i * (barW + gap);
      const h = (d.pct / 100) * maxH;
      s.addShape('rect' as any, { x, y: baseY - h, w: barW, h, fill: { color: d.color } } as any);
      s.addText(`${d.pct}%`, { x, y: baseY - h - 0.35, w: barW, h: 0.3, fontSize: d.label === '90d' ? 14 : 11, color: d.color, fontFace: bd, bold: true, align: 'center' });
      s.addText(d.label, { x, y: baseY + 0.05, w: barW, h: 0.25, fontSize: 9, color: d.label === '90d' ? RED : MUT, fontFace: bd, align: 'center', bold: d.label === '90d' });
    });

    const bracketX1 = startX;
    const bracketX2 = startX + 3 * (barW + gap) + barW;
    s.addShape('rect' as any, { x: bracketX1, y: 1.5, w: bracketX2 - bracketX1, h: 0.03, fill: { color: RED } } as any);
    s.addText('60% of all churn happens here', { x: bracketX1, y: 1.55, w: bracketX2 - bracketX1, h: 0.3, fontSize: 10, color: RED, fontFace: bd, bold: true, align: 'center' });
    footer(s, 2);
  }

  // P3: Churn reasons
  {
    const s = pres.addSlide();
    s.background = { color: BG };
    title(s, 'Patients leave for predictable reasons');

    const reasons = [
      { n: '1', t: 'Side effects', d: 'Nausea and fatigue hit hardest wks 2-6. No guidance means patients assume the worst.' },
      { n: '2', t: 'Expectation mismatch', d: '"I lost 8 lbs, I\'m good." No understanding of rebound risk.' },
      { n: '3', t: 'Support gap', d: 'Questions at 5pm, callback next Tuesday. By then they\'ve decided to stop.' },
      { n: '4', t: 'Refill friction', d: 'Prior auth delays, pharmacy switches, insurance. Each a natural exit point.' },
    ];
    reasons.forEach((r, i) => {
      const y = 1.8 + i * 1.3;
      s.addShape('rect' as any, { x: 1.0, y: y + 0.05, w: 0.4, h: 0.4, fill: { color: A } } as any);
      s.addText(r.n, { x: 1.0, y: y + 0.05, w: 0.4, h: 0.4, fontSize: 11, color: 'FFFFFF', fontFace: bd, bold: true, align: 'center', valign: 'middle' });
      s.addText(r.t, { x: 1.6, y: y, w: 4, h: 0.35, fontSize: 13, color: FG, fontFace: bd, bold: true });
      s.addText(r.d, { x: 1.6, y: y + 0.4, w: 9, h: 0.6, fontSize: 10, color: SEC, fontFace: bd });
    });
    footer(s, 3);
  }

  // P4: Existing tools
  {
    const s = pres.addSlide();
    s.background = { color: BG };
    title(s, 'Existing tools miss the critical churn moments');

    const tools = [
      { name: 'SMS / Push', lim: 'One-way. No conversation. Easy to ignore.', stat: '< 5% response' },
      { name: 'Support teams', lim: 'Reactive only. Silent churners never call in.', stat: 'Miss 80%+ at-risk' },
      { name: 'Clinician check-ins', lim: 'Too expensive to scale for every patient.', stat: '$50-150 per call' },
    ];
    tools.forEach((t, i) => {
      const y = 1.8 + i * 1.6;
      s.addShape('rect' as any, { x: 1.0, y, w: 10.5, h: 1.3, fill: { color: 'FFFFFF' }, line: { color: 'E2E8F0', width: 1 } } as any);
      s.addText(t.name, { x: 1.3, y: y + 0.15, w: 5, h: 0.35, fontSize: 13, color: FG, fontFace: bd, bold: true });
      s.addText(t.lim, { x: 1.3, y: y + 0.55, w: 5, h: 0.4, fontSize: 10, color: SEC, fontFace: bd });
      s.addShape('rect' as any, { x: 8.5, y: y + 0.35, w: 2.5, h: 0.5, fill: { color: 'FEE2E2' } } as any);
      s.addText(t.stat, { x: 8.5, y: y + 0.35, w: 2.5, h: 0.5, fontSize: 10, color: RED, fontFace: bd, bold: true, align: 'center', valign: 'middle' });
    });
    s.addText('What\'s missing: real conversations at the right moment', { x: 1, y: 6.3, w: 11, h: 0.4, fontSize: 12, color: FG, fontFace: bd });
    footer(s, 4);
  }

  // P5: Positioning
  {
    const s = pres.addSlide();
    s.background = { color: BG };
    title(s, 'The conversational layer between messaging and care teams');

    s.addShape('rect' as any, { x: 0.8, y: 2.0, w: 2.5, h: 4.2, fill: { color: 'FFFFFF' }, line: { color: 'E2E8F0', width: 1 } } as any);
    s.addText('YOUR MESSAGING', { x: 1.0, y: 2.1, w: 2.1, h: 0.25, fontSize: 7, color: MUT, fontFace: bd });
    s.addText('SMS, push, email', { x: 1.0, y: 2.4, w: 2.1, h: 0.35, fontSize: 12, color: FG, fontFace: bd, bold: true });
    s.addText('Reminders\nRefill notifications\nEducational content', { x: 1.0, y: 3.0, w: 2.1, h: 1.5, fontSize: 10, color: SEC, fontFace: bd, lineSpacingMultiple: 1.4 });

    s.addShape('rect' as any, { x: 3.7, y: 1.8, w: 5.6, h: 4.6, fill: { color: 'FFFFFF' }, line: { color: A, width: 2.5 } } as any);
    s.addShape('rect' as any, { x: 4.2, y: 1.65, w: 1.2, h: 0.3, fill: { color: A } } as any);
    s.addText('ADHERY', { x: 4.2, y: 1.65, w: 1.2, h: 0.3, fontSize: 7, color: 'FFFFFF', fontFace: bd, bold: true, align: 'center', valign: 'middle' });
    s.addText('Conversational AI', { x: 4.0, y: 2.2, w: 5, h: 0.45, fontSize: 16, color: FG, fontFace: bd, bold: true });
    s.addText('Proactive outreach to at-risk patients\nReal-time side effect triage\nMotivation + expectation coaching\nSmart escalation with full context', {
      x: 4.2, y: 2.9, w: 4.8, h: 2.2, fontSize: 11, color: FG, fontFace: bd, lineSpacingMultiple: 1.5,
    });
    s.addText('Has conversations. Understands context. Knows when to hand off.', { x: 4.0, y: 5.4, w: 5, h: 0.4, fontSize: 9, color: A, fontFace: bd, italic: true });

    s.addShape('rect' as any, { x: 9.7, y: 2.0, w: 2.5, h: 4.2, fill: { color: 'FFFFFF' }, line: { color: 'E2E8F0', width: 1 } } as any);
    s.addText('YOUR CARE TEAMS', { x: 9.9, y: 2.1, w: 2.1, h: 0.25, fontSize: 7, color: MUT, fontFace: bd });
    s.addText('Clinicians + support', { x: 9.9, y: 2.4, w: 2.1, h: 0.35, fontSize: 12, color: FG, fontFace: bd, bold: true });
    s.addText('Complex clinical decisions\nDose adjustments\nHigh-acuity patients', { x: 9.9, y: 3.0, w: 2.1, h: 1.5, fontSize: 10, color: SEC, fontFace: bd, lineSpacingMultiple: 1.4 });
    footer(s, 5);
  }

  // P6: How it works
  {
    const s = pres.addSlide();
    s.background = { color: BG };
    title(s, 'How Adhery works');

    const phases = [
      { t: 'Engage', d: 'Proactive outreach during high-churn windows', color: A },
      { t: 'Triage', d: 'Clinically grounded responses to symptoms and doubts', color: AL },
      { t: 'Escalate', d: 'Flag severe cases to your team with full context', color: GRN },
    ];
    phases.forEach((p, i) => {
      const x = 1 + i * 3.7;
      s.addShape('rect' as any, { x, y: 2.5, w: 3.4, h: 2.5, fill: { color: p.color } } as any);
      s.addText(p.t, { x: x + 0.3, y: 2.8, w: 2.8, h: 0.5, fontSize: 18, color: 'FFFFFF', fontFace: bd, bold: true });
      s.addText(p.d, { x: x + 0.3, y: 3.5, w: 2.8, h: 1, fontSize: 10, color: 'FFFFFF', fontFace: bd });
      if (i < 2) s.addText('>', { x: x + 3.4, y: 3.2, w: 0.3, h: 0.5, fontSize: 24, color: MUT, fontFace: bd, align: 'center' });
    });
    s.addShape('rect' as any, { x: 1, y: 5.8, w: 11, h: 0.6, fill: { color: SFC } } as any);
    s.addText('Compliance: FDA-compliant response boundaries. Never diagnoses, prescribes, or recommends dosage changes.', {
      x: 1.3, y: 5.8, w: 10.5, h: 0.6, fontSize: 9, color: SEC, fontFace: bd, valign: 'middle',
    });
    footer(s, 6);
  }

  // P7: Patient story
  {
    const s = pres.addSlide();
    s.background = { color: BG };
    title(s, 'Keeping one patient through day 90');

    const timeline = [
      { day: 'Day 8', event: 'Reports nausea', tag: 'Side effects' },
      { day: 'Day 22', event: '"I\'ve lost enough, can I stop?"', tag: 'Expectations' },
      { day: 'Day 45', event: 'Missed refill window', tag: 'Refill friction' },
      { day: 'Day 67', event: '"Do I really need this?"', tag: 'Support gap' },
      { day: 'Day 90', event: 'Still on therapy', tag: '' },
    ];
    timeline.forEach((t, i) => {
      const y = 1.8 + i * 1.0;
      const isLast = i === timeline.length - 1;
      s.addShape('ellipse' as any, { x: 2.0, y: y + 0.05, w: 0.18, h: 0.18, fill: { color: isLast ? GRN : A } } as any);
      if (!isLast) s.addShape('rect' as any, { x: 2.07, y: y + 0.25, w: 0.04, h: 0.75, fill: { color: 'E2E8F0' } } as any);
      s.addText(t.day, { x: 2.5, y: y - 0.05, w: 1.2, h: 0.3, fontSize: 11, color: isLast ? GRN : A, fontFace: bd, bold: true });
      s.addText(t.event, { x: 3.7, y: y - 0.05, w: 4, h: 0.3, fontSize: 11, color: isLast ? GRN : FG, fontFace: bd, bold: isLast });
      if (t.tag) {
        s.addShape('rect' as any, { x: 8, y, w: 1.5, h: 0.22, fill: { color: 'EFF6FF' } } as any);
        s.addText(t.tag, { x: 8, y, w: 1.5, h: 0.22, fontSize: 7, color: A, fontFace: bd, bold: true, align: 'center', valign: 'middle' });
      }
    });
    s.addText('Four churn moments addressed. Zero clinical escalations.', { x: 2, y: 6.5, w: 7, h: 0.3, fontSize: 10, color: SEC, fontFace: bd });
    footer(s, 7);
  }

  // P8: Retention impact
  {
    const s = pres.addSlide();
    s.background = { color: BG };
    title(s, 'Small retention lift, large revenue impact');

    const baseY = 6.0, maxH = 3.5, barW = 2.5;
    const bH = (60 / 100) * maxH;
    s.addShape('rect' as any, { x: 3, y: baseY - bH, w: barW, h: bH, fill: { color: 'E2E8F0' } } as any);
    s.addText('60%', { x: 3, y: baseY - bH - 0.5, w: barW, h: 0.45, fontSize: 28, color: MUT, fontFace: bd, bold: true, align: 'center' });
    s.addText('Baseline\n90-day retention', { x: 3, y: baseY + 0.1, w: barW, h: 0.5, fontSize: 10, color: SEC, fontFace: bd, align: 'center' });

    const aH = (70 / 100) * maxH;
    const deltaH = ((70 - 60) / 100) * maxH;
    s.addShape('rect' as any, { x: 7, y: baseY - bH, w: barW, h: bH, fill: { color: 'E2E8F0' } } as any);
    s.addShape('rect' as any, { x: 7, y: baseY - aH, w: barW, h: deltaH, fill: { color: GRN } } as any);
    s.addText('+5-10pp', { x: 7, y: baseY - aH, w: barW, h: deltaH, fontSize: 11, color: 'FFFFFF', fontFace: bd, bold: true, align: 'center', valign: 'middle' });
    s.addText('65-70%', { x: 7, y: baseY - aH - 0.5, w: barW, h: 0.45, fontSize: 28, color: GRN, fontFace: bd, bold: true, align: 'center' });
    s.addText('With Adhery\n90-day retention', { x: 7, y: baseY + 0.1, w: barW, h: 0.5, fontSize: 10, color: FG, fontFace: bd, align: 'center', bold: true });

    s.addShape('rect' as any, { x: 3, y: 6.7, w: 6.5, h: 0.4, fill: { color: SFC } } as any);
    s.addText('Per 1,000 patients: +50 to +100 still on therapy at day 90', {
      x: 3, y: 6.7, w: 6.5, h: 0.4, fontSize: 10, color: FG, fontFace: bd, align: 'center', valign: 'middle', bold: true,
    });
    footer(s, 8);
  }

  // P9: ROI table
  {
    const s = pres.addSlide();
    s.background = { color: BG };
    title(s, 'Modest retention lift pays for itself quickly');

    const headerOpts = { fontSize: 9, color: MUT, bold: true, fontFace: bd, fill: { color: SFC } as any, border: [{ color: 'E2E8F0', pt: 0.5 }, { color: 'E2E8F0', pt: 0.5 }, { color: 'E2E8F0', pt: 0.5 }, { color: 'E2E8F0', pt: 0.5 }] as any };
    const cellOpts = (ci: number) => ({ fontSize: 11, color: ci === 3 ? GRN : FG, bold: ci === 0 || ci === 3, fontFace: bd, fill: { color: 'FFFFFF' } as any, border: [{ color: 'E2E8F0', pt: 0.5 }, { color: 'E2E8F0', pt: 0.5 }, { color: 'E2E8F0', pt: 0.5 }, { color: 'E2E8F0', pt: 0.5 }] as any });

    const rows: any[][] = [
      ['', 'Patients', "Add'l retained", 'Revenue protected', 'Adhery cost/yr'].map(t => ({ text: t, options: headerOpts })),
      ['Pilot', '500', '25-50', '$50K-$250K', '$4-5K'].map((t, ci) => ({ text: t, options: cellOpts(ci) })),
      ['Scale', '2,000', '100-200', '$200K-$1M', '$15-20K'].map((t, ci) => ({ text: t, options: cellOpts(ci) })),
      ['Enterprise', '5,000', '250-500', '$500K-$2.5M', '$35-45K'].map((t, ci) => ({ text: t, options: cellOpts(ci) })),
    ];
    s.addTable(rows, { x: 1.0, y: 1.8, w: 11, colW: [1.5, 1.8, 2, 2.7, 2] });

    s.addShape('rect' as any, { x: 2, y: 5.2, w: 3.5, h: 1.2, fill: { color: SFC }, line: { color: 'E2E8F0', width: 0.5 } } as any);
    s.addText('GLP-1 patient LTV', { x: 2.2, y: 5.3, w: 3.1, h: 0.2, fontSize: 8, color: MUT, fontFace: bd, align: 'center' });
    s.addText('$2K-$5K', { x: 2.2, y: 5.55, w: 3.1, h: 0.4, fontSize: 18, color: FG, fontFace: bd, bold: true, align: 'center' });
    s.addText('12-mo revenue per patient', { x: 2.2, y: 5.95, w: 3.1, h: 0.2, fontSize: 8, color: SEC, fontFace: bd, align: 'center' });

    s.addShape('rect' as any, { x: 7, y: 5.2, w: 3.5, h: 1.2, fill: { color: SFC }, line: { color: 'E2E8F0', width: 0.5 } } as any);
    s.addText('Typical ROI', { x: 7.2, y: 5.3, w: 3.1, h: 0.2, fontSize: 8, color: MUT, fontFace: bd, align: 'center' });
    s.addText('10-50x', { x: 7.2, y: 5.55, w: 3.1, h: 0.4, fontSize: 18, color: GRN, fontFace: bd, bold: true, align: 'center' });
    s.addText('revenue protected vs. cost', { x: 7.2, y: 5.95, w: 3.1, h: 0.2, fontSize: 8, color: SEC, fontFace: bd, align: 'center' });
    footer(s, 9);
  }

  // P10: Dashboard
  {
    const s = pres.addSlide();
    s.background = { color: BG };
    title(s, 'Real-time visibility into patient engagement');

    s.addShape('rect' as any, { x: 1.0, y: 1.6, w: 11, h: 0.4, fill: { color: 'E2E8F0' } } as any);
    s.addShape('ellipse' as any, { x: 1.3, y: 1.72, w: 0.14, h: 0.14, fill: { color: 'F87171' } } as any);
    s.addShape('ellipse' as any, { x: 1.55, y: 1.72, w: 0.14, h: 0.14, fill: { color: 'FBBF24' } } as any);
    s.addShape('ellipse' as any, { x: 1.8, y: 1.72, w: 0.14, h: 0.14, fill: { color: '4ADE80' } } as any);
    s.addText('app.adhery.com/dashboard', { x: 3, y: 1.62, w: 5, h: 0.35, fontSize: 8, color: MUT, fontFace: bd, align: 'center' });

    s.addShape('rect' as any, { x: 1.0, y: 2.0, w: 11, h: 4.5, fill: { color: 'FFFFFF' }, line: { color: 'E2E8F0', width: 1 } } as any);

    const metrics = [
      { label: 'Active patients', value: '1,247', change: '+34 this wk', color: GRN },
      { label: '30-day retention', value: '89%', change: '+3pp', color: GRN },
      { label: '90-day retention', value: '67%', change: '+7pp', color: GRN },
      { label: 'Escalations', value: '12', change: '3 urgent', color: 'F59E0B' },
    ];
    metrics.forEach((m, i) => {
      const x = 1.3 + i * 2.6;
      s.addShape('rect' as any, { x, y: 2.3, w: 2.3, h: 1.2, fill: { color: SFC }, line: { color: 'E2E8F0', width: 0.5 } } as any);
      s.addText(m.label, { x: x + 0.15, y: 2.35, w: 2, h: 0.2, fontSize: 7, color: MUT, fontFace: bd });
      s.addText(m.value, { x: x + 0.15, y: 2.6, w: 2, h: 0.4, fontSize: 16, color: FG, fontFace: bd, bold: true });
      s.addText(m.change, { x: x + 0.15, y: 3.05, w: 2, h: 0.2, fontSize: 7, color: m.color, fontFace: bd });
    });

    s.addText('RECENT CONVERSATIONS', { x: 1.3, y: 3.8, w: 5, h: 0.2, fontSize: 7, color: MUT, fontFace: bd });
    const contacts = [
      ['#4821', 'Nausea - wk 3', 'Day 19', 'Resolved', GRN],
      ['#3109', 'Missed refill', 'Day 42', 'Refill initiated', GRN],
      ['#5567', 'Wants to stop', 'Day 31', 'Escalated', 'F59E0B'],
    ];
    contacts.forEach((c, i) => {
      const y = 4.1 + i * 0.4;
      if (i > 0) s.addShape('rect' as any, { x: 1.3, y: y - 0.02, w: 10.4, h: 0.01, fill: { color: 'E2E8F0' } } as any);
      s.addText(c[0], { x: 1.3, y, w: 1.2, h: 0.3, fontSize: 9, color: FG, fontFace: bd, bold: true });
      s.addText(c[1], { x: 2.5, y, w: 3, h: 0.3, fontSize: 9, color: SEC, fontFace: bd });
      s.addText(c[2], { x: 7.5, y, w: 1.2, h: 0.3, fontSize: 8, color: MUT, fontFace: bd });
      s.addText(c[3], { x: 9, y, w: 2, h: 0.3, fontSize: 8, color: c[4], fontFace: bd, bold: true });
    });
    footer(s, 10);
  }

  // P11: Go live
  {
    const s = pres.addSlide();
    s.background = { color: BG };
    title(s, 'Go live in 4 weeks');
    s.addText('Start with 100 at-risk patients. Measure impact in 30 days.', { x: TX, y: 1.3, w: 8, h: 0.4, fontSize: 12, color: SEC, fontFace: bd });

    const weeks = [
      { w: 'Wk 1', task: 'Integration + data mapping' },
      { w: 'Wk 2', task: 'Conversation design + brand voice' },
      { w: 'Wk 3', task: 'Pilot cohort selection + dashboard' },
      { w: 'Wk 4', task: 'Go live + daily check-ins' },
    ];
    weeks.forEach((w, i) => {
      const y = 2.4 + i * 0.9;
      s.addText(w.w, { x: 1.5, y, w: 1.2, h: 0.35, fontSize: 11, color: A, fontFace: bd, bold: true });
      s.addShape('rect' as any, { x: 2.8, y: y + 0.02, w: 0.04, h: 0.3, fill: { color: 'E2E8F0' } } as any);
      s.addText(w.task, { x: 3.1, y, w: 5, h: 0.35, fontSize: 12, color: FG, fontFace: bd });
    });
    s.addShape('rect' as any, { x: 1, y: 6.2, w: 7, h: 0.5, fill: { color: SFC } } as any);
    s.addText('After 30 days: retention data, conversation analytics, clear ROI.', { x: 1.2, y: 6.2, w: 6.6, h: 0.5, fontSize: 10, color: FG, fontFace: bd, valign: 'middle' });
    footer(s, 11);
  }

  // P12: Pricing
  {
    const s = pres.addSlide();
    s.background = { color: BG };
    title(s, 'Priced to protect LTV');

    s.addShape('rect' as any, { x: 1.5, y: 2.0, w: 4.5, h: 3.5, fill: { color: 'FFFFFF' }, line: { color: A, width: 2 } } as any);
    s.addText('GLP-1 PATIENT LTV (12 MO)', { x: 1.5, y: 2.3, w: 4.5, h: 0.3, fontSize: 8, color: MUT, fontFace: bd, align: 'center' });
    s.addText('$2K-$5K', { x: 1.5, y: 3.0, w: 4.5, h: 0.8, fontSize: 36, color: A, fontFace: bd, bold: true, align: 'center' });
    s.addText('per patient', { x: 1.5, y: 3.9, w: 4.5, h: 0.3, fontSize: 11, color: SEC, fontFace: bd, align: 'center' });

    s.addText('vs.', { x: 6.1, y: 3.2, w: 0.8, h: 0.5, fontSize: 18, color: MUT, fontFace: bd, align: 'center' });

    s.addShape('rect' as any, { x: 7, y: 2.0, w: 4.5, h: 3.5, fill: { color: 'FFFFFF' }, line: { color: GRN, width: 2 } } as any);
    s.addText('ADHERY COST (12 MO)', { x: 7, y: 2.3, w: 4.5, h: 0.3, fontSize: 8, color: MUT, fontFace: bd, align: 'center' });
    s.addText('~$100', { x: 7, y: 3.0, w: 4.5, h: 0.8, fontSize: 36, color: GRN, fontFace: bd, bold: true, align: 'center' });
    s.addText('per patient', { x: 7, y: 3.9, w: 4.5, h: 0.3, fontSize: 11, color: SEC, fontFace: bd, align: 'center' });

    s.addText('Keeping one patient covers the cost of protecting 20-50.', { x: 1, y: 6.2, w: 11, h: 0.35, fontSize: 12, color: FG, fontFace: bd, bold: true });
    footer(s, 12);
  }

  // P13: CTA
  {
    const s = pres.addSlide();
    s.background = { color: BG };
    s.addText('Which 100 GLP-1 patients should we help you keep first?', { x: 1, y: 1.5, w: 11, h: 1, fontSize: 28, color: FG, fontFace: hd, align: 'center' });

    const items = [
      'Pick your hardest-to-retain cohort',
      '30 days to measurable retention impact',
      'Minimal integration lift',
      'Clear ROI data before any commitment',
    ];
    items.forEach((item, i) => {
      s.addShape('rect' as any, { x: 4, y: 3.3 + i * 0.55, w: 0.12, h: 0.12, fill: { color: A } } as any);
      s.addText(item, { x: 4.4, y: 3.2 + i * 0.55, w: 5, h: 0.35, fontSize: 12, color: FG, fontFace: bd });
    });
    s.addText('adhery.com', { x: 4, y: 5.5, w: 5, h: 0.5, fontSize: 16, color: A, fontFace: bd, bold: true, align: 'center' });
    footer(s, 13);
  }

  pres.writeFile({ fileName: 'Adhery-Pitch-v7-editable.pptx' });
}

// ─── Export both PPTX versions ───

async function exportBothPPTX() {
  await exportEditablePPTX();
  await exportScreenshotPPTX();
}

// ─── Slides Array ───
const slides = [
  TitleSlide,             // 1
  ChurnCurveSlide,        // 2
  ChurnReasonsSlide,      // 3
  ExistingToolsSlide,     // 4
  PositioningSlide,       // 5
  HowItWorksSlide,        // 6
  PatientStorySlide,      // 7
  RetentionImpactSlide,   // 8
  ROISlide,               // 9
  DashboardSlide,         // 10
  GoLiveSlide,            // 11
  PricingSlide,           // 12
  CTASlide,               // 13
];

// ─── Main Page ───
export default function PitchPage() {
  const [current, setCurrent] = useState(0);

  // Expose setter for PPTX export to programmatically navigate slides
  useEffect(() => {
    (window as any).__setSlideIndex = (i: number) => setCurrent(i);
    return () => { delete (window as any).__setSlideIndex; };
  }, []);

  // Track current index for PPTX export restore
  useEffect(() => {
    (window as any).__currentSlideIndex = current;
  }, [current]);

  const goNext = useCallback(() => {
    setCurrent((c) => Math.min(c + 1, slides.length - 1));
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((c) => Math.max(c - 1, 0));
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  const SlideComponent = slides[current];

  return (
    <div className="h-screen w-screen overflow-hidden bg-background relative select-none" data-pitch-wrapper>
      <div className="absolute inset-y-0 left-0 w-1/3 z-10 cursor-w-resize" onClick={goPrev} />
      <div className="absolute inset-y-0 right-0 w-1/3 z-10 cursor-e-resize" onClick={goNext} />

      <div className="absolute top-6 left-8 z-20 flex items-center gap-2 opacity-60">
        <img src="/logo.svg" alt="" className="w-6 h-6" />
        <span className="text-sm font-medium text-text-muted">adhery</span>
      </div>

      <div key={current} className="h-full w-full animate-slide-in" data-slide-content>
        <SlideComponent />
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-1 bg-border-light">
          <div
            className="h-full transition-all duration-300 ease-out"
            style={{
              width: `${((current + 1) / slides.length) * 100}%`,
              background: `linear-gradient(to right, ${ACCENT}, ${ACCENT_LIGHT})`,
            }}
          />
        </div>
        <div className="flex items-center justify-between px-8 py-3">
          <span className="text-xs text-text-muted">{current + 1} / {slides.length}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              exportBothPPTX();
            }}
            className="text-xs text-text-muted hover:text-foreground border border-border-light px-3 py-1 transition-colors z-30 relative"
          >
            Export PPTX
          </button>
          <span className="text-xs text-text-muted">adhery.com</span>
        </div>
      </div>
    </div>
  );
}
