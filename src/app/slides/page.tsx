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
        Specialty patients stay on therapy when they get{' '}
        <span className="text-accent">the right support at the right time</span>
      </h1>
      <p className="text-xl text-text-secondary max-w-2xl">
        Adhery. Automated multichannel adherence for specialty pharmacy.
      </p>
      <div className="mt-20 flex items-center gap-3 text-text-muted text-sm">
        <span>Press</span>
        <kbd className="px-2 py-1 border border-border-light rounded text-xs font-mono">
          &rarr;
        </kbd>
        <span>to navigate</span>
      </div>
      <span className="absolute bottom-6 right-8 text-[10px] text-text-muted/50">
        v3.0
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
        Each patient needs a different kind of support, through a different channel, at a different time. Phone calls alone can&apos;t do that.
      </p>
    </div>
  );
}

function EvidenceSlide() {
  const stats = [
    {
      value: '2.11x',
      label: 'SMS doubles adherence',
      detail: 'OR 2.11, 95% CI 1.52-2.93',
      citation: 'Thakkar et al., JAMA Intern Med, 2016',
    },
    {
      value: 'SMD 0.89',
      label: 'SMS + Voice combined',
      detail: '3.2x more effective than SMS alone',
      citation: 'Palmer et al., Prev Med, 2018',
    },
    {
      value: '3.56x',
      label: 'Brief calls boost continuation',
      detail: 'PDC shifts from 0.29 to 0.58',
      citation: 'Taitel et al., J Manag Care, 2012',
    },
    {
      value: 'RR 1.23',
      label: 'Two-way beats one-way SMS',
      detail: '23% better when patients can reply',
      citation: 'Wald et al., PLoS One, 2019',
    },
  ];

  return (
    <div className="flex flex-col justify-center h-full px-20">
      <h2 className="font-serif text-5xl text-foreground mb-12 leading-tight max-w-4xl">
        Multichannel outreach improves adherence 2-3x over phone calls alone
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
        Adhery reaches every patient through the channel that works for them
      </h2>
      <div className="flex items-center gap-10 mt-10 mb-12">
        {[
          { label: 'SMS', desc: '92% delivered, two-way' },
          { label: 'AI Voice', desc: 'Calls at their time' },
          { label: 'Mail', desc: '99% delivery rate' },
        ].map((ch) => (
          <div key={ch.label} className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-accent/10 flex items-center justify-center text-accent text-lg font-semibold">
              {ch.label}
            </div>
            <span className="text-xs text-text-secondary">{ch.desc}</span>
          </div>
        ))}
      </div>
      <p className="text-lg text-text-secondary max-w-xl">
        SMS handles 60%, voice picks up 25%, mail reaches 10%. 96% of patients engage through at least one channel.
      </p>
    </div>
  );
}

function PatientStorySlide() {
  const steps = [
    {
      day: 'Day 1',
      channel: 'SMS',
      color: '#22c55e',
      messages: [
        { from: 'ai', text: 'Hi Maria, welcome to Humira support. Reply YES to get started.' },
        { from: 'pt', text: 'YES' },
        { from: 'ai', text: 'Great! When do you usually take your dose?' },
        { from: 'pt', text: 'Mornings around 8' },
      ],
      note: 'Learns her schedule on day one',
    },
    {
      day: 'Day 3',
      channel: 'SMS',
      color: '#f59e0b',
      messages: [
        { from: 'ai', text: 'How was your Humira dose yesterday?' },
        { from: 'pt', text: 'I noticed redness at the injection site' },
        { from: 'ai', text: 'Is it bigger than a quarter, or any swelling?' },
        { from: 'pt', text: 'No pretty small' },
        { from: 'ai', text: 'That\'s normal. Cold compress helps. I\'ll check back tomorrow.' },
      ],
      note: 'Multi-step triage no voicemail could do',
    },
    {
      day: 'Day 5',
      channel: 'Voice',
      color: ACCENT,
      messages: [
        { from: 'ai', text: 'Calling about the redness you mentioned.' },
        { from: 'pt', text: 'It went away, but I\'ve been tired.' },
        { from: 'ai', text: 'Is it affecting daily activities?' },
        { from: 'pt', text: 'I\'m napping more' },
        { from: 'ai', text: 'Noting that for your pharmacist. Often improves by week 3.' },
      ],
      note: 'Catches new symptom, notifies pharmacist',
    },
    {
      day: 'Day 30',
      channel: 'SMS',
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
        Maria stays on Humira because every concern gets addressed immediately
      </h2>
      <p className="text-sm text-text-secondary mb-8 max-w-2xl">
        Zero pharmacist calls. Side effects caught on day 3. New symptom escalated on day 5. 100% adherent at day 30.
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
    { channel: 'SMS', pct: 60, label: 'Resolved at first touch', color: '#22c55e' },
    { channel: 'AI Voice', pct: 25, label: 'Needs a conversation', color: ACCENT },
    { channel: 'Mail', pct: 10, label: 'Catches the digitally unreachable', color: '#f59e0b' },
    { channel: 'Pharmacist', pct: 5, label: 'Gets only the cases that need clinical judgment', color: '#dc2626' },
  ];

  return (
    <div className="flex flex-col justify-center h-full px-20">
      <h2 className="font-serif text-5xl text-foreground mb-12 leading-tight max-w-4xl">
        95% of patient needs resolve automatically. Pharmacists handle the 5% that require judgment.
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
    { pct: 60, color: '#22c55e', label: 'SMS resolved' },
    { pct: 25, color: ACCENT, label: 'Voice handled' },
    { pct: 10, color: '#f59e0b', label: 'Mail caught' },
    { pct: 5, color: '#dc2626', label: 'Pharmacist' },
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
          <p className="text-sm font-medium text-accent uppercase tracking-wider mb-6">After: Adhery Multichannel</p>
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
  TitleSlide,       // 1: Patients stay on therapy with right support
  RealitySlide,     // 2: Only 2/13 calls help (pie chart)
  GapSlide,         // 3: Patients aren't getting support their way
  EvidenceSlide,    // 4: Multichannel 2-3x better (with citations)
  IntroducingSlide, // 5: Adhery reaches every patient
  PatientStorySlide,// 6: Maria stays on Humira
  EscalationSlide,  // 7: 95% resolves automatically
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
