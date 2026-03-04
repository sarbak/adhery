'use client';

import { useState, useEffect, useCallback } from 'react';

// ─── Constants ───
const ACCENT = '#0d7377';
const ACCENT_LIGHT = '#14919b';

// ─── Pie Chart Component ───
function PieChart({
  segments,
  size = 220,
}: {
  segments: { pct: number; color: string; label: string }[];
  size?: number;
}) {
  const r = size / 2 - 10;
  const cx = size / 2;
  const cy = size / 2;
  let cumulative = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {segments.map((seg, i) => {
        const startAngle = (cumulative / 100) * 360 - 90;
        cumulative += seg.pct;
        const endAngle = (cumulative / 100) * 360 - 90;
        const largeArc = seg.pct > 50 ? 1 : 0;
        const x1 = cx + r * Math.cos((startAngle * Math.PI) / 180);
        const y1 = cy + r * Math.sin((startAngle * Math.PI) / 180);
        const x2 = cx + r * Math.cos((endAngle * Math.PI) / 180);
        const y2 = cy + r * Math.sin((endAngle * Math.PI) / 180);
        const midAngle = ((startAngle + endAngle) / 2) * (Math.PI / 180);
        const labelR = r * 0.65;
        const lx = cx + labelR * Math.cos(midAngle);
        const ly = cy + labelR * Math.sin(midAngle);

        return (
          <g key={i}>
            <path
              d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`}
              fill={seg.color}
              stroke="white"
              strokeWidth="2"
            />
            {seg.pct >= 10 && (
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="11"
                fontWeight="600"
              >
                {seg.pct}%
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ─── Slide Components ───

function TitleSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <h1 className="font-serif text-6xl text-foreground mb-8 leading-tight max-w-4xl">
        What if every patient had{' '}
        <span className="text-accent">their own AI navigator</span>
      </h1>
      <p className="text-xl text-text-secondary max-w-2xl">
        Adhery. An autonomous patient navigator for specialty pharmacy.
      </p>
      <div className="mt-20 flex items-center gap-3 text-text-muted text-sm">
        <span>Press</span>
        <kbd className="px-2 py-1 border border-border-light rounded text-xs font-mono">
          &rarr;
        </kbd>
        <span>to navigate</span>
      </div>
      <span className="absolute bottom-6 right-8 text-[10px] text-text-muted/50">
        v4.0
      </span>
    </div>
  );
}

function RealitySlide() {
  const segments = [
    { pct: 55, color: '#94a3b8', label: 'Voicemail' },
    { pct: 30, color: '#cbd5e1', label: 'Routine' },
    { pct: 15, color: ACCENT, label: 'Meaningful' },
  ];

  return (
    <div className="flex flex-col justify-center h-full px-20">
      <h2 className="font-serif text-5xl text-foreground mb-4 leading-tight max-w-4xl">
        Only 2 out of 13 outreach calls actually help a patient
      </h2>
      <p className="text-lg text-text-secondary mb-10 max-w-2xl">
        The average specialty pharmacy makes 13 calls per patient per year. Most never connect.
      </p>
      <div className="flex items-center gap-16 max-w-4xl">
        <PieChart segments={segments} />
        <div className="space-y-4">
          {segments.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="w-4 h-4 flex-shrink-0" style={{ backgroundColor: s.color }} />
              <div>
                <span className="text-foreground font-medium">{s.pct}% {s.label}</span>
                {s.label === 'Voicemail' && (
                  <p className="text-sm text-text-secondary">Patient never hears the message</p>
                )}
                {s.label === 'Routine' && (
                  <p className="text-sm text-text-secondary">Check-ins that could be automated</p>
                )}
                {s.label === 'Meaningful' && (
                  <p className="text-sm text-text-secondary">Side effects caught, barriers resolved</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GapSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-20">
      <h2 className="font-serif text-5xl text-foreground mb-10 leading-tight max-w-4xl">
        Patients aren&apos;t getting support the way they need it
      </h2>
      <div className="max-w-4xl space-y-6">
        <div className="border-l-4 border-accent/30 pl-8">
          <p className="text-xl text-foreground mb-2">
            A patient with injection-site anxiety needs reassurance within hours, not a voicemail next Tuesday.
          </p>
        </div>
        <div className="border-l-4 border-accent/30 pl-8">
          <p className="text-xl text-foreground mb-2">
            A patient whose copay doubled needs help navigating assistance programs, not a refill reminder.
          </p>
        </div>
        <div className="border-l-4 border-accent pl-8">
          <p className="text-xl text-foreground mb-2">
            A patient who quietly stopped refilling needs someone to notice, not silence until the next scheduled call.
          </p>
        </div>
      </div>
      <p className="text-lg text-text-secondary mt-10 max-w-3xl">
        Each patient needs a different kind of support, at a different time, through a different medium. That takes an autonomous system, not a call list.
      </p>
    </div>
  );
}

function EvidenceSlide() {
  const stats = [
    {
      value: '3.56x',
      label: 'AI voice calls boost continuation',
      detail: 'PDC shifts from 0.29 to 0.58',
      citation: 'Taitel et al., J Manag Care, 2012',
    },
    {
      value: 'SMD 0.89',
      label: 'Voice + async triage combined',
      detail: '3.2x more effective than text alone',
      citation: 'Palmer et al., Prev Med, 2018',
    },
    {
      value: '2.11x',
      label: 'Async triage doubles adherence',
      detail: 'OR 2.11, 95% CI 1.52-2.93',
      citation: 'Thakkar et al., JAMA Intern Med, 2016',
    },
    {
      value: 'RR 1.23',
      label: 'Two-way beats one-way messaging',
      detail: '23% better when patients can reply',
      citation: 'Wald et al., PLoS One, 2019',
    },
  ];

  return (
    <div className="flex flex-col justify-center h-full px-20">
      <h2 className="font-serif text-5xl text-foreground mb-12 leading-tight max-w-4xl">
        AI-driven outreach improves adherence 2-3x over manual call centers
      </h2>
      <div className="grid grid-cols-2 gap-6 max-w-4xl mb-8">
        {stats.map((s) => (
          <div key={s.value} className="border-l-2 border-accent/30 pl-6">
            <p className="text-3xl font-bold text-accent mb-1">{s.value}</p>
            <p className="font-medium text-foreground mb-1">{s.label}</p>
            <p className="text-sm text-text-secondary">{s.detail}</p>
            <p className="text-[10px] text-text-muted mt-1 italic">{s.citation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntroducingSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <img src="/logo.svg" alt="Adhery" className="w-16 h-16 mb-8" />
      <h2 className="font-serif text-5xl text-foreground mb-6 leading-tight max-w-3xl">
        An AI navigator that runs your patient support program autonomously
      </h2>
      <div className="flex items-center gap-10 mt-10 mb-12">
        {[
          { label: 'AI Voice', desc: 'Autonomous conversations', primary: true },
          { label: 'Async Triage', desc: 'Two-way text-based care', primary: false },
          { label: 'Mail', desc: 'Physical follow-through', primary: false },
        ].map((ch) => (
          <div key={ch.label} className="flex flex-col items-center gap-2">
            <div className={`w-16 h-16 flex items-center justify-center text-sm font-semibold ${
              ch.primary ? 'bg-accent text-white' : 'bg-accent/10 text-accent'
            }`}>
              {ch.label}
            </div>
            <span className="text-xs text-text-secondary">{ch.desc}</span>
          </div>
        ))}
      </div>
      <p className="text-lg text-text-secondary max-w-xl">
        The navigator decides when to call, when to text, and when to mail. 95% of patient needs resolve without a pharmacist.
      </p>
    </div>
  );
}

function PatientStorySlide() {
  const steps = [
    {
      day: 'Day 1',
      channel: 'AI Voice',
      color: ACCENT,
      messages: [
        { from: 'ai', text: 'Hi Maria, I\'m your Humira navigator. I\'ll be checking in regularly.' },
        { from: 'pt', text: 'Oh great, what do I need to do?' },
        { from: 'ai', text: 'Just take your dose as prescribed. I\'ll handle the rest. When do you usually take it?' },
        { from: 'pt', text: 'Mornings around 8' },
      ],
      note: 'Navigator onboards, learns schedule',
    },
    {
      day: 'Day 3',
      channel: 'Async',
      color: '#f59e0b',
      messages: [
        { from: 'ai', text: 'How was your Humira dose yesterday?' },
        { from: 'pt', text: 'I noticed redness at the injection site' },
        { from: 'ai', text: 'Is it bigger than a quarter, or any swelling?' },
        { from: 'pt', text: 'No pretty small' },
        { from: 'ai', text: 'That\'s normal. Cold compress helps. I\'ll check back tomorrow.' },
      ],
      note: 'Async triage, no pharmacist needed',
    },
    {
      day: 'Day 5',
      channel: 'AI Voice',
      color: ACCENT,
      messages: [
        { from: 'ai', text: 'Calling about the redness you mentioned.' },
        { from: 'pt', text: 'It went away, but I\'ve been tired.' },
        { from: 'ai', text: 'Is it affecting daily activities?' },
        { from: 'pt', text: 'I\'m napping more' },
        { from: 'ai', text: 'Noting that for your pharmacist. Often improves by week 3.' },
      ],
      note: 'Navigator escalates to voice, catches new symptom',
    },
    {
      day: 'Day 30',
      channel: 'AI Voice',
      color: '#8b5cf6',
      messages: [
        { from: 'ai', text: 'One month! You\'ve taken every dose.' },
        { from: 'pt', text: 'Feeling so much better!' },
      ],
      note: 'Milestone recognition',
    },
  ];

  return (
    <div className="flex flex-col justify-center h-full px-20">
      <h2 className="font-serif text-4xl text-foreground mb-2 leading-tight max-w-3xl">
        Maria stays on Humira because her AI navigator catches every concern
      </h2>
      <p className="text-sm text-text-secondary mb-8 max-w-2xl">
        Zero pharmacist calls needed. Side effects triaged on day 3. New symptom escalated on day 5. 100% adherent at day 30.
      </p>
      <div className="max-w-4xl space-y-3">
        {steps.map((s) => (
          <div key={s.day} className="flex items-start gap-4">
            <div className="w-14 flex-shrink-0 text-right">
              <span className="text-sm font-semibold text-foreground">{s.day}</span>
            </div>
            <div className="w-1 flex-shrink-0 relative">
              <div className="w-3 h-3 rounded-full -ml-1" style={{ backgroundColor: s.color }} />
              <div className="w-px h-full bg-border-light absolute left-0 top-3" />
            </div>
            <div className="flex-1 pb-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium px-2 py-0.5 text-white" style={{ backgroundColor: s.color }}>
                  {s.channel}
                </span>
                <span className="text-[10px] text-text-muted">{s.note}</span>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {s.messages.map((m, i) => (
                  <span
                    key={i}
                    className={`text-xs px-2 py-0.5 ${
                      m.from === 'ai' ? 'bg-accent/10 text-accent' : 'bg-border-light text-text-secondary'
                    }`}
                  >
                    {m.from === 'ai' ? 'AI: ' : 'PT: '}&quot;{m.text}&quot;
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EscalationSlide() {
  const levels = [
    { channel: 'AI Voice', pct: 40, label: 'Navigator handles the conversation', color: ACCENT },
    { channel: 'Async Triage', pct: 35, label: 'Text-based check-ins and follow-ups', color: '#22c55e' },
    { channel: 'Mail', pct: 15, label: 'Physical follow-through for unreachable patients', color: '#f59e0b' },
    { channel: 'Pharmacist', pct: 10, label: 'Cases that need clinical judgment', color: '#dc2626' },
  ];

  return (
    <div className="flex flex-col justify-center h-full px-20">
      <h2 className="font-serif text-5xl text-foreground mb-12 leading-tight max-w-4xl">
        The navigator resolves 90% autonomously. Pharmacists see only the 10% that need them.
      </h2>
      <div className="max-w-4xl space-y-4">
        {levels.map((l) => (
          <div key={l.channel} className="flex items-center gap-4">
            <div className="w-24 text-right">
              <span className="text-sm font-medium text-foreground">{l.channel}</span>
            </div>
            <div className="flex-1 h-10 bg-surface border border-border-light relative">
              <div
                className="h-full flex items-center px-3"
                style={{ width: `${l.pct}%`, backgroundColor: l.color, opacity: 0.85 }}
              >
                <span className="text-white text-sm font-bold">{l.pct}%</span>
              </div>
            </div>
            <div className="w-64">
              <span className="text-sm text-text-secondary">{l.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultsSlide() {
  const before = [
    { pct: 55, color: '#94a3b8', label: 'Voicemail' },
    { pct: 30, color: '#cbd5e1', label: 'Routine' },
    { pct: 15, color: ACCENT, label: 'Meaningful' },
  ];
  const after = [
    { pct: 40, color: ACCENT, label: 'AI Voice' },
    { pct: 35, color: '#22c55e', label: 'Async Triage' },
    { pct: 15, color: '#f59e0b', label: 'Mail' },
    { pct: 10, color: '#dc2626', label: 'Pharmacist' },
  ];

  return (
    <div className="flex flex-col justify-center h-full px-20">
      <h2 className="font-serif text-5xl text-foreground mb-12 leading-tight max-w-4xl">
        Adherence jumps from 78% to 87% when every interaction is meaningful
      </h2>
      <div className="flex items-start gap-16 max-w-4xl">
        {/* Before */}
        <div className="flex-1 text-center">
          <p className="text-sm font-medium text-text-muted uppercase tracking-wider mb-6">Before: Phone Calls Only</p>
          <div className="flex justify-center mb-6">
            <PieChart segments={before} size={180} />
          </div>
          <p className="text-3xl font-bold text-text-secondary mb-1">78% PDC</p>
          <p className="text-sm text-text-muted">15% of outreach is meaningful</p>
        </div>

        <div className="flex items-center pt-20">
          <span className="text-3xl text-text-muted">&rarr;</span>
        </div>

        {/* After */}
        <div className="flex-1 text-center">
          <p className="text-sm font-medium text-accent uppercase tracking-wider mb-6">After: Adhery Navigator</p>
          <div className="flex justify-center mb-6">
            <PieChart segments={after} size={180} />
          </div>
          <p className="text-3xl font-bold text-accent mb-1">87% PDC</p>
          <p className="text-sm text-text-muted">Every touchpoint addresses a real need</p>
        </div>
      </div>
      <p className="text-sm text-text-secondary mt-8 max-w-3xl text-center mx-auto">
        83% of patients above the 80% PDC threshold for CMS Star Ratings
      </p>
    </div>
  );
}

function ROISlide() {
  const tiers = [
    { patients: '500', saved: '$59K', ftes: '~1.5', monthly: '$2,500' },
    { patients: '2,000', saved: '$236K', ftes: '~6', monthly: '$8,000', highlight: true },
    { patients: '5,000', saved: '$590K', ftes: '~15', monthly: '$15,000' },
  ];

  return (
    <div className="flex flex-col justify-center h-full px-20">
      <h2 className="font-serif text-5xl text-foreground mb-4 leading-tight max-w-4xl">
        A 2,000-patient pharmacy saves $236K per year and redeploys 6 FTEs to clinical work
      </h2>
      <p className="text-lg text-text-secondary mb-10 max-w-3xl">
        Cost per patient drops from $130 to $12. The savings fund better patient care, not layoffs.
      </p>
      <div className="grid grid-cols-3 gap-6 max-w-5xl">
        {tiers.map((t) => (
          <div
            key={t.patients}
            className={`p-8 ${
              t.highlight
                ? 'bg-accent/5 border-2 border-accent/30'
                : 'bg-surface border border-border-light'
            }`}
          >
            <p className="text-sm text-text-secondary mb-1">Patients</p>
            <p className="text-3xl font-bold text-foreground mb-6">{t.patients}</p>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-text-secondary">Annual savings</p>
                <p className="text-3xl font-bold text-accent">{t.saved}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">FTEs redeployed</p>
                <p className="text-xl font-semibold text-foreground">{t.ftes}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Adhery cost</p>
                <p className="text-xl font-semibold text-foreground">{t.monthly}/mo</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-20">
      <h2 className="font-serif text-5xl text-foreground mb-4 leading-tight max-w-4xl">
        Your team sees adherence, alerts, and savings in one dashboard every morning
      </h2>
      <p className="text-lg text-text-secondary mb-10 max-w-2xl">
        All interactions logged, all outcomes measured. Your team knows exactly where each patient stands.
      </p>
      <div className="bg-surface border border-border-light p-10 max-w-4xl">
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Avg Adherence', value: '87%', color: 'text-accent' },
            { label: 'Active Patients', value: '2,000', color: 'text-foreground' },
            { label: 'Open Alerts', value: '23', color: 'text-amber-500' },
            { label: 'Monthly Savings', value: '$19.7K', color: 'text-green-600' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-border-light pt-4">
          <p className="text-sm text-text-muted">
            Patient timelines, escalation history, channel performance, and side-effect trends.
          </p>
        </div>
      </div>
    </div>
  );
}

function GettingStartedSlide() {
  const steps = [
    { week: 'Week 1', title: 'We configure your protocols', desc: 'You tell us your rules, we build them' },
    { week: 'Week 2-3', title: 'Patients start receiving outreach', desc: 'You watch the dashboard' },
    { week: 'Week 4', title: 'Review results together', desc: 'You decide whether to continue' },
  ];

  return (
    <div className="flex flex-col justify-center h-full px-20">
      <h2 className="font-serif text-5xl text-foreground mb-4 leading-tight max-w-4xl">
        Go live in 4 weeks, starting with your hardest-to-reach patients
      </h2>
      <p className="text-lg text-text-secondary mb-12 max-w-2xl">
        Pick 100 patients who churned or are about to. If it works there, it works everywhere.
      </p>
      <div className="flex items-start gap-6 max-w-4xl">
        {steps.map((step, i) => (
          <div key={step.week} className="flex items-start gap-6 flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className="w-16 h-16 flex items-center justify-center text-white text-sm font-bold mb-5"
                style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_LIGHT})` }}
              >
                {step.week}
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2 text-center">{step.title}</h3>
              <p className="text-sm text-text-secondary text-center">{step.desc}</p>
            </div>
            {i < steps.length - 1 && <div className="pt-7 text-text-muted text-2xl">&rarr;</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function PricingSlide() {
  const tiers = [
    { range: 'Up to 500', pmpm: '$5' },
    { range: '500 - 5,000', pmpm: '$4', highlight: true },
    { range: '5,000+', pmpm: '$3' },
  ];

  return (
    <div className="flex flex-col justify-center h-full px-20">
      <h2 className="font-serif text-5xl text-foreground mb-12 leading-tight max-w-4xl">
        $10K setup, $3-5 per patient per month, ROI in the first quarter
      </h2>
      <div className="flex gap-8 max-w-4xl items-start">
        <div className="bg-surface-warm border-2 border-accent/20 p-8 w-56 flex-shrink-0">
          <p className="text-sm text-text-secondary mb-2">One-time setup</p>
          <p className="text-4xl font-bold text-foreground mb-2">$10K</p>
          <p className="text-xs text-text-secondary leading-relaxed">
            Protocol configuration, EHR integration, patient onboarding, team training
          </p>
        </div>
        <div className="flex-1">
          <p className="text-sm text-text-muted mb-4">+ monthly per member</p>
          <div className="grid grid-cols-3 gap-4">
            {tiers.map((t) => (
              <div
                key={t.range}
                className={`p-6 text-center ${
                  t.highlight ? 'bg-accent/5 border-2 border-accent/30' : 'bg-surface border border-border-light'
                }`}
              >
                <p className="text-sm text-text-secondary mb-1">Patients</p>
                <p className="text-base font-semibold text-foreground mb-4">{t.range}</p>
                <p className="text-4xl font-bold text-accent mb-1">{t.pmpm}</p>
                <p className="text-sm text-text-muted">PMPM</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-sm text-text-secondary mt-8 max-w-3xl">
        No long-term contracts. Cancel anytime after pilot.
      </p>
    </div>
  );
}

function CTASlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <img src="/logo.svg" alt="Adhery" className="w-16 h-16 mb-10" />
      <h2 className="font-serif text-5xl text-foreground mb-6 leading-tight max-w-3xl">
        Which 100 patients should we bring back first?
      </h2>
      <p className="text-xl text-text-secondary max-w-xl mb-16">
        Give us your hardest cohort. 30 days, measurable results.
      </p>
      <div className="space-y-3 text-lg text-foreground">
        <p><span className="font-semibold">adhery.com</span></p>
        <p className="text-text-secondary">hello@adhery.com</p>
      </div>
    </div>
  );
}

// ─── Slides Array ───
const slides = [
  TitleSlide,       // 1: What if every patient had their own AI navigator
  RealitySlide,     // 2: Only 2/13 calls help (pie chart)
  GapSlide,         // 3: Patients need support their way
  EvidenceSlide,    // 4: AI-driven outreach 2-3x better (citations)
  IntroducingSlide, // 5: Autonomous navigator - AI Voice forward
  PatientStorySlide,// 6: Maria's navigator catches every concern
  EscalationSlide,  // 7: 90% resolves autonomously
  ResultsSlide,     // 8: Adherence 78% → 87% (pie chart comparison)
  ROISlide,         // 9: $236K saved, 6 FTEs redeployed
  DashboardSlide,   // 10: One dashboard every morning
  GettingStartedSlide, // 11: Live in 4 weeks
  PricingSlide,     // 12: $10K + $3-5 PMPM
  CTASlide,         // 13: Which 100 patients?
];

// ─── Main Page ───
export default function SlidesPage() {
  const [current, setCurrent] = useState(0);

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
    <div className="h-screen w-screen overflow-hidden bg-background relative select-none">
      <div className="absolute inset-y-0 left-0 w-1/3 z-10 cursor-w-resize" onClick={goPrev} />
      <div className="absolute inset-y-0 right-0 w-1/3 z-10 cursor-e-resize" onClick={goNext} />

      <div className="absolute top-6 left-8 z-20 flex items-center gap-2 opacity-60">
        <img src="/logo.svg" alt="" className="w-6 h-6" />
        <span className="text-sm font-medium text-text-muted">adhery</span>
      </div>

      <div key={current} className="h-full w-full animate-slide-in">
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
          <span className="text-xs text-text-muted">adhery.com</span>
        </div>
      </div>
    </div>
  );
}
