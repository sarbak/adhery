'use client';

import { useState, useEffect, useCallback } from 'react';

// ─── Constants ───
const ACCENT = '#0d7377';
const ACCENT_LIGHT = '#14919b';

// ─── Slide Components ───

function TitleSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <img src="/logo.svg" alt="Adhery" className="w-20 h-20 mb-8" />
      <h1 className="font-serif text-6xl text-foreground mb-6">
        Automated Medication Adherence
      </h1>
      <p className="text-2xl text-text-secondary max-w-2xl">
        for Specialty Pharmacies
      </p>
      <div className="mt-16 flex items-center gap-3 text-text-muted text-sm">
        <span>Press</span>
        <kbd className="px-2 py-1 border border-border-light rounded text-xs font-mono">
          →
        </kbd>
        <span>to navigate</span>
      </div>
    </div>
  );
}

function ProblemSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-20">
      <p className="text-xs font-medium text-accent uppercase tracking-[0.2em] mb-4">
        The Problem
      </p>
      <h2 className="font-serif text-5xl text-foreground mb-10 leading-tight max-w-3xl">
        Your team makes{' '}
        <span className="text-accent">13 calls per patient</span> per year
      </h2>
      <div className="grid grid-cols-3 gap-8 max-w-4xl">
        <div className="border-l-2 border-accent/30 pl-6">
          <p className="text-4xl font-bold text-foreground mb-2">6+ FTEs</p>
          <p className="text-text-secondary">
            per 1,000 patients running the call center
          </p>
        </div>
        <div className="border-l-2 border-accent/30 pl-6">
          <p className="text-4xl font-bold text-foreground mb-2">85%</p>
          <p className="text-text-secondary">
            of calls are routine: refills, check-ins, side effects
          </p>
        </div>
        <div className="border-l-2 border-accent/30 pl-6">
          <p className="text-4xl font-bold text-foreground mb-2">Burnout</p>
          <p className="text-text-secondary">
            Staff turnover from repetitive outreach erodes quality
          </p>
        </div>
      </div>
    </div>
  );
}

function CostSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-20">
      <p className="text-xs font-medium text-accent uppercase tracking-[0.2em] mb-4">
        The Cost
      </p>
      <h2 className="font-serif text-5xl text-foreground mb-12 leading-tight">
        Manual adherence outreach costs{' '}
        <span className="text-accent">$130/patient/year</span>
      </h2>
      <div className="flex items-end gap-6 max-w-3xl">
        <div className="flex flex-col items-center">
          <div
            className="w-28 rounded-t-lg flex items-end justify-center pb-3"
            style={{
              height: 260,
              background: `linear-gradient(to top, ${ACCENT}, ${ACCENT_LIGHT})`,
            }}
          >
            <span className="text-white font-bold text-lg">$130</span>
          </div>
          <p className="text-sm text-text-secondary mt-3">Manual calls</p>
          <p className="text-xs text-text-muted">per patient/year</p>
        </div>
        <div className="flex flex-col items-center">
          <div
            className="w-28 rounded-t-lg flex items-end justify-center pb-3 bg-green-500"
            style={{ height: 24 }}
          >
            <span className="text-white font-bold text-xs">$12</span>
          </div>
          <p className="text-sm text-text-secondary mt-3">Adhery</p>
          <p className="text-xs text-text-muted">per patient/year</p>
        </div>
        <div className="ml-12 border-l-2 border-accent/30 pl-6 pb-2">
          <p className="text-5xl font-bold text-accent mb-1">91%</p>
          <p className="text-lg text-text-secondary">cost reduction</p>
          <p className="text-sm text-text-muted mt-1">
            13 calls → automated multichannel outreach
          </p>
        </div>
      </div>
    </div>
  );
}

function SolutionSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-20">
      <p className="text-xs font-medium text-accent uppercase tracking-[0.2em] mb-4">
        The Solution
      </p>
      <h2 className="font-serif text-5xl text-foreground mb-12 leading-tight max-w-3xl">
        Adhery automates patient outreach across every channel
      </h2>
      <div className="grid grid-cols-3 gap-10 max-w-4xl">
        <div className="bg-surface border border-border-light rounded-xl p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-7 h-7 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-foreground text-lg mb-2">SMS</h3>
          <p className="text-sm text-text-secondary">
            Two-way text reminders, refill nudges, and side-effect check-ins
          </p>
        </div>
        <div className="bg-surface border border-border-light rounded-xl p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-7 h-7 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-foreground text-lg mb-2">
            AI Voice
          </h3>
          <p className="text-sm text-text-secondary">
            Conversational calls that feel human - onboarding, refills, wellness
          </p>
        </div>
        <div className="bg-surface border border-border-light rounded-xl p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-7 h-7 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-foreground text-lg mb-2">Mail</h3>
          <p className="text-sm text-text-secondary">
            Physical letters for patients who don't respond to digital outreach
          </p>
        </div>
      </div>
    </div>
  );
}

function HowItWorksSlide() {
  const steps = [
    {
      num: '1',
      title: 'Configure',
      desc: 'Set your protocols, messaging cadence, and escalation rules',
    },
    {
      num: '2',
      title: 'Enroll',
      desc: 'Import your patient list - we handle consent and onboarding',
    },
    {
      num: '3',
      title: 'Automate',
      desc: 'The system runs 24/7. Your team only handles escalations',
    },
  ];

  return (
    <div className="flex flex-col justify-center h-full px-20">
      <p className="text-xs font-medium text-accent uppercase tracking-[0.2em] mb-4">
        How It Works
      </p>
      <h2 className="font-serif text-5xl text-foreground mb-14 leading-tight">
        Three steps to automated adherence
      </h2>
      <div className="flex items-start gap-6 max-w-4xl">
        {steps.map((step, i) => (
          <div key={step.num} className="flex items-start gap-6 flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-5"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_LIGHT})`,
                }}
              >
                {step.num}
              </div>
              <h3 className="font-semibold text-foreground text-xl mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-text-secondary text-center">
                {step.desc}
              </p>
            </div>
            {i < steps.length - 1 && (
              <div className="pt-7 text-text-muted text-2xl">→</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function EscalationSlide() {
  const levels = [
    {
      channel: 'SMS',
      pct: '60%',
      desc: 'Resolved at first touch',
      color: '#22c55e',
    },
    {
      channel: 'AI Voice',
      pct: '25%',
      desc: 'Escalated to conversation',
      color: ACCENT,
    },
    {
      channel: 'Mail',
      pct: '10%',
      desc: 'Physical follow-up',
      color: '#f59e0b',
    },
    {
      channel: 'Pharmacist',
      pct: '5%',
      desc: 'Human intervention',
      color: '#dc2626',
    },
  ];

  return (
    <div className="flex flex-col justify-center h-full px-20">
      <p className="text-xs font-medium text-accent uppercase tracking-[0.2em] mb-4">
        Escalation Engine
      </p>
      <h2 className="font-serif text-5xl text-foreground mb-12 leading-tight max-w-3xl">
        Your pharmacists only handle{' '}
        <span className="text-accent">what matters</span>
      </h2>
      <div className="flex items-end gap-4 max-w-4xl">
        {levels.map((level, i) => (
          <div key={level.channel} className="flex-1 flex flex-col items-center">
            <p className="text-3xl font-bold mb-2" style={{ color: level.color }}>
              {level.pct}
            </p>
            <div
              className="w-full rounded-t-lg"
              style={{
                height: [200, 120, 60, 30][i],
                backgroundColor: level.color,
                opacity: 0.85,
              }}
            />
            <div className="mt-4 text-center">
              <p className="font-semibold text-foreground">{level.channel}</p>
              <p className="text-xs text-text-secondary mt-1">{level.desc}</p>
            </div>
            {i < levels.length - 1 && (
              <div className="absolute" />
            )}
          </div>
        ))}
      </div>
      <p className="text-sm text-text-muted mt-8 max-w-2xl">
        95% of patient interactions are handled automatically. Pharmacists focus
        on clinical decisions, not phone tag.
      </p>
    </div>
  );
}

function ImpactSlide() {
  const metrics = [
    { value: '$118', label: 'Saved per patient/year', sub: 'vs. manual calls' },
    {
      value: '85%',
      label: 'Fewer manual calls',
      sub: '13 calls → ~2 escalations',
    },
    {
      value: '+9pp',
      label: 'Adherence improvement',
      sub: '78% → 87% average PDC',
    },
    {
      value: '83%',
      label: 'Patients above 80% PDC',
      sub: 'CMS Star Rating threshold',
    },
  ];

  return (
    <div className="flex flex-col justify-center h-full px-20">
      <p className="text-xs font-medium text-accent uppercase tracking-[0.2em] mb-4">
        Impact
      </p>
      <h2 className="font-serif text-5xl text-foreground mb-12 leading-tight">
        Results that move your Star Rating
      </h2>
      <div className="grid grid-cols-2 gap-6 max-w-4xl">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="border border-border-light rounded-xl p-8 bg-surface"
          >
            <p className="text-5xl font-bold text-accent mb-2">{m.value}</p>
            <p className="text-lg font-medium text-foreground">{m.label}</p>
            <p className="text-sm text-text-secondary mt-1">{m.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ROISlide() {
  const tiers = [
    {
      patients: '500',
      saved: '$59K',
      ftes: '~1.5',
      monthly: '$2,500',
    },
    {
      patients: '2,000',
      saved: '$236K',
      ftes: '~6',
      monthly: '$8,000',
      highlight: true,
    },
    {
      patients: '5,000',
      saved: '$590K',
      ftes: '~15',
      monthly: '$15,000',
    },
  ];

  return (
    <div className="flex flex-col justify-center h-full px-20">
      <p className="text-xs font-medium text-accent uppercase tracking-[0.2em] mb-4">
        ROI by Pharmacy Size
      </p>
      <h2 className="font-serif text-5xl text-foreground mb-12 leading-tight">
        The math works at every scale
      </h2>
      <div className="grid grid-cols-3 gap-6 max-w-5xl">
        {tiers.map((t) => (
          <div
            key={t.patients}
            className={`rounded-xl p-8 ${
              t.highlight
                ? 'bg-accent/5 border-2 border-accent/30'
                : 'bg-surface border border-border-light'
            }`}
          >
            <p className="text-sm text-text-secondary mb-1">Patients</p>
            <p className="text-3xl font-bold text-foreground mb-6">
              {t.patients}
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-text-secondary">Annual savings</p>
                <p className="text-3xl font-bold text-accent">{t.saved}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">FTEs replaced</p>
                <p className="text-xl font-semibold text-foreground">
                  {t.ftes}
                </p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Adhery cost</p>
                <p className="text-xl font-semibold text-foreground">
                  {t.monthly}/mo
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EvidenceSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-20">
      <p className="text-xs font-medium text-accent uppercase tracking-[0.2em] mb-4">
        Evidence Base
      </p>
      <h2 className="font-serif text-5xl text-foreground mb-12 leading-tight">
        Built on peer-reviewed research
      </h2>
      <div className="grid grid-cols-2 gap-8 max-w-4xl">
        <div className="border border-border-light rounded-xl p-8 bg-surface">
          <p className="text-4xl font-bold text-accent mb-3">RR 1.23</p>
          <p className="font-medium text-foreground mb-2">
            Two-way SMS vs. one-way
          </p>
          <p className="text-sm text-text-secondary">
            23% higher adherence rate when patients can reply. Systematic review
            of 16 RCTs, n=2,742.
          </p>
        </div>
        <div className="border border-border-light rounded-xl p-8 bg-surface">
          <p className="text-4xl font-bold text-accent mb-3">SMD 0.89</p>
          <p className="font-medium text-foreground mb-2">
            Combined SMS + voice
          </p>
          <p className="text-sm text-text-secondary">
            Large effect size for multichannel outreach. Meta-analysis across
            chronic disease populations.
          </p>
        </div>
        <div className="border border-border-light rounded-xl p-8 bg-surface">
          <p className="text-4xl font-bold text-accent mb-3">80%</p>
          <p className="font-medium text-foreground mb-2">PDC threshold</p>
          <p className="text-sm text-text-secondary">
            CMS Star Rating standard for medication adherence. Below this,
            pharmacies lose quality bonuses.
          </p>
        </div>
        <div className="border border-border-light rounded-xl p-8 bg-surface">
          <p className="text-4xl font-bold text-accent mb-3">$80K</p>
          <p className="font-medium text-foreground mb-2">
            Avg specialty drug cost
          </p>
          <p className="text-sm text-text-secondary">
            Per patient per year. Non-adherence means lost revenue and worse
            patient outcomes.
          </p>
        </div>
      </div>
    </div>
  );
}

function DashboardSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-20">
      <p className="text-xs font-medium text-accent uppercase tracking-[0.2em] mb-4">
        Dashboard Preview
      </p>
      <h2 className="font-serif text-5xl text-foreground mb-6 leading-tight">
        Real-time visibility into your program
      </h2>
      <p className="text-lg text-text-secondary mb-10 max-w-2xl">
        Track adherence rates, patient engagement, and ROI from a single
        dashboard. Every interaction logged. Every outcome measured.
      </p>
      <div className="bg-surface border border-border-light rounded-xl p-10 max-w-4xl">
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Avg Adherence', value: '87%', color: 'text-accent' },
            { label: 'Active Patients', value: '2,000', color: 'text-foreground' },
            { label: 'Open Alerts', value: '23', color: 'text-amber-500' },
            { label: 'Monthly Savings', value: '$19.7K', color: 'text-green-600' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">
                {stat.label}
              </p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-border-light pt-6 flex items-center gap-3">
          <span className="text-sm text-text-muted">
            Live demo available at
          </span>
          <span className="text-sm font-medium text-accent">
            adhery.com/dashboard
          </span>
        </div>
      </div>
    </div>
  );
}

function PricingSlide() {
  const tiers = [
    { range: 'Up to 500', pmpm: '$5', annual: '$30K/yr' },
    { range: '500 - 5,000', pmpm: '$4', annual: '$24-240K/yr', highlight: true },
    { range: '5,000+', pmpm: '$3', annual: 'Custom' },
  ];

  return (
    <div className="flex flex-col justify-center h-full px-20">
      <p className="text-xs font-medium text-accent uppercase tracking-[0.2em] mb-4">
        Pricing
      </p>
      <h2 className="font-serif text-5xl text-foreground mb-12 leading-tight">
        Simple per-member, per-month pricing
      </h2>
      <div className="grid grid-cols-3 gap-6 max-w-4xl">
        {tiers.map((t) => (
          <div
            key={t.range}
            className={`rounded-xl p-8 text-center ${
              t.highlight
                ? 'bg-accent/5 border-2 border-accent/30'
                : 'bg-surface border border-border-light'
            }`}
          >
            <p className="text-sm text-text-secondary mb-2">Patients</p>
            <p className="text-lg font-semibold text-foreground mb-6">
              {t.range}
            </p>
            <p className="text-5xl font-bold text-accent mb-1">{t.pmpm}</p>
            <p className="text-sm text-text-muted mb-4">PMPM</p>
            <p className="text-sm text-text-secondary">{t.annual}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-text-muted mt-8 max-w-2xl">
        No setup fees. No long-term contracts. Includes all channels (SMS,
        voice, mail), dashboard access, and dedicated onboarding.
      </p>
    </div>
  );
}

function NextStepsSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <img src="/logo.svg" alt="Adhery" className="w-16 h-16 mb-8" />
      <h2 className="font-serif text-5xl text-foreground mb-6 leading-tight">
        Start a pilot with 100 patients
      </h2>
      <p className="text-xl text-text-secondary max-w-xl mb-12">
        See results in 30 days. No setup fees, no risk.
      </p>
      <div className="space-y-4 text-lg">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="text-foreground">
            Week 1: Configure protocols and import patients
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="text-foreground">
            Week 2-3: Automated outreach begins
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="text-foreground">
            Week 4: Review results and decide
          </span>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-border-light">
        <p className="text-text-secondary">
          <span className="font-semibold text-foreground">adhery.com</span>
          <span className="mx-3 text-text-muted">|</span>
          hello@adhery.com
        </p>
      </div>
    </div>
  );
}

// ─── Slides Array ───
const slides = [
  TitleSlide,
  ProblemSlide,
  CostSlide,
  SolutionSlide,
  HowItWorksSlide,
  EscalationSlide,
  ImpactSlide,
  ROISlide,
  EvidenceSlide,
  DashboardSlide,
  PricingSlide,
  NextStepsSlide,
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
      {/* Click zones for navigation */}
      <div
        className="absolute inset-y-0 left-0 w-1/3 z-10 cursor-w-resize"
        onClick={goPrev}
      />
      <div
        className="absolute inset-y-0 right-0 w-1/3 z-10 cursor-e-resize"
        onClick={goNext}
      />

      {/* Logo watermark */}
      <div className="absolute top-6 left-8 z-20 flex items-center gap-2 opacity-60">
        <img src="/logo.svg" alt="" className="w-6 h-6" />
        <span className="text-sm font-medium text-text-muted">adhery</span>
      </div>

      {/* Slide content */}
      <div className="h-full w-full">
        <SlideComponent />
      </div>

      {/* Progress bar + slide counter */}
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
          <span className="text-xs text-text-muted">
            {current + 1} / {slides.length}
          </span>
          <span className="text-xs text-text-muted">adhery.com</span>
        </div>
      </div>
    </div>
  );
}
