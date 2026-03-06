'use client';

import { useState, useEffect, useCallback } from 'react';

// ─── Constants ───
const ACCENT = '#1e3a5f';
const ACCENT_LIGHT = '#2563eb';

// ─── Slide Components ───

function TitleSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <h1 className="font-serif text-6xl text-foreground mb-8 leading-tight max-w-4xl">
        An Autonomous Voice Agent for{' '}
        <span className="text-accent whitespace-nowrap">Every GLP-1&nbsp;Patient</span>
      </h1>
      <p className="text-xl text-text-secondary max-w-2xl">
        Most GLP-1 patients stop within a year. Adhery keeps them on therapy with voice AI that listens, triages, and escalates.
      </p>
      <div className="mt-20 flex items-center gap-3 text-text-muted text-sm">
        <span>Press</span>
        <kbd className="px-2 py-1 border border-border-light rounded text-xs font-mono">
          &rarr;
        </kbd>
        <span>to navigate</span>
      </div>
      <span className="absolute bottom-6 right-8 text-[10px] text-text-muted/50">
        v6.0
      </span>
    </div>
  );
}

function RealitySlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <h2 className="font-serif text-5xl text-foreground mb-4 leading-tight max-w-4xl">
        Half of GLP-1 patients stop within 12 months
      </h2>
      <p className="text-lg text-text-secondary mb-10 max-w-2xl">
        Side effects like nausea and fatigue, the belief that &ldquo;I&rsquo;ve lost enough weight already,&rdquo; and hormone rebound risk all drive early discontinuation. Call centers can&rsquo;t intervene fast enough.
      </p>
      <div className="max-w-4xl w-full">
        <div className="h-16 bg-surface border border-border-light flex mb-6">
          <div className="h-full bg-[#94a3b8] flex items-center justify-center" style={{ width: '50%' }}>
            <span className="text-white font-medium">~50% adherent</span>
          </div>
          <div className="h-full flex items-center justify-center flex-1">
            <span className="text-lg text-text-muted">~50% drop off</span>
          </div>
        </div>
        <p className="text-sm text-text-secondary">
          GLP-1 adherence. Most patients who discontinue do so within the first 90 days, before the medication reaches full efficacy.
        </p>
      </div>
    </div>
  );
}

function GapSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <h2 className="font-serif text-5xl text-foreground mb-10 leading-tight max-w-3xl">
        Patients need support on their terms, not yours
      </h2>
      <div className="max-w-4xl space-y-6 text-left">
        <div className="border-l-4 border-accent/30 pl-8">
          <p className="text-xl text-foreground mb-2">
            A patient with nausea needs reassurance and dosage guidance within hours, not a voicemail next Tuesday.
          </p>
        </div>
        <div className="border-l-4 border-accent/30 pl-8">
          <p className="text-xl text-foreground mb-2">
            A patient who &ldquo;feels better&rdquo; and stops needs education about rebound weight gain and metabolic risk.
          </p>
        </div>
        <div className="border-l-4 border-accent pl-8">
          <p className="text-xl text-foreground mb-2">
            A patient hitting insurance renewal friction needs help navigating prior authorization, not another refill reminder.
          </p>
        </div>
      </div>
      <p className="text-lg text-text-secondary mt-10 max-w-3xl text-center">
        The right support depends on the patient. An autonomous system handles that. A call list does not.
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
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <h2 className="font-serif text-5xl text-foreground mb-12 leading-tight max-w-4xl">
        Research shows AI-driven outreach can double adherence rates
      </h2>
      <div className="grid grid-cols-2 gap-6 max-w-4xl mb-8 text-left">
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
        <span className="text-accent">Adhery</span> is an autonomous voice agent for GLP-1 adherence
      </h2>
      <div className="mt-8 mb-10 max-w-md w-full">
        <div className="bg-accent/10 border-2 border-accent/30 p-8 flex flex-col items-center gap-3 mb-6">
          <div className="w-20 h-20 flex items-center justify-center text-lg font-bold bg-accent text-white">
            AI Voice
          </div>
          <p className="text-lg font-semibold text-foreground">Autonomous Voice Conversations</p>
          <p className="text-sm text-text-secondary">Calls patients, screens for problems, handles the routine 80%</p>
        </div>
        <div className="flex gap-4 text-left">
          <div className="flex items-start gap-2 flex-1">
            <span className="text-accent font-bold mt-0.5">+</span>
            <p className="text-sm text-text-secondary"><span className="text-foreground font-medium">SMS triage</span> for quick questions and refill confirmations</p>
          </div>
          <div className="flex items-start gap-2 flex-1">
            <span className="text-accent font-bold mt-0.5">+</span>
            <p className="text-sm text-text-secondary"><span className="text-foreground font-medium">Mail</span> for physical follow-through and documentation</p>
          </div>
        </div>
      </div>
      <p className="text-lg text-text-secondary max-w-xl mb-3">
        We automate the routine 80% so your clinical teams focus on the complex 20%.
      </p>
      <p className="text-sm text-accent font-medium">
        Grounded in your MLR-approved scripts. Zero hallucination.
      </p>
    </div>
  );
}

function SafetyComplianceSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <h2 className="font-serif text-5xl text-foreground mb-10 leading-tight max-w-4xl">
        Zero-Hallucination Safety
      </h2>
      <div className="max-w-4xl space-y-6 text-left">
        <div className="bg-surface border border-border-light p-8 flex items-start gap-6">
          <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-accent/10 text-accent">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground mb-1">MLR-Grounded Guardrails</p>
            <p className="text-text-secondary">AI is restricted to pre-approved clinical scripts. Every response is grounded in your MLR-reviewed content library. No improvisation, no off-label claims.</p>
          </div>
        </div>
        <div className="bg-surface border border-border-light p-8 flex items-start gap-6">
          <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-accent/10 text-accent">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground mb-1">Autonomous Pharmacovigilance</p>
            <p className="text-text-secondary">Real-time adverse event detection during every patient interaction. Automatic severity coding and regulatory-ready documentation.</p>
          </div>
        </div>
        <div className="bg-surface border border-border-light p-8 flex items-start gap-6">
          <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-accent/10 text-accent">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground mb-1">Clinical Safety Net</p>
            <p className="text-text-secondary">Warm handoff to a live pharmacist on red-flag keywords. The AI knows what it doesn&rsquo;t know and escalates immediately.</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-8 mt-10">
        <div className="flex items-center gap-2 text-text-muted">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          <span className="text-sm font-medium">HIPAA Compliant</span>
        </div>
        <div className="flex items-center gap-2 text-text-muted">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          <span className="text-sm font-medium">SOC-2 Type II</span>
        </div>
      </div>
    </div>
  );
}

function PatientStorySlide() {
  const steps = [
    { day: 'Day 1', channel: 'AI Voice', color: ACCENT, what: 'Onboards Sarah, learns her schedule, explains what to expect with nausea' },
    { day: 'Day 5', channel: 'SMS Triage', color: '#f59e0b', what: 'Sarah texts about nausea. AI collects severity details, routes to pharmacist for dosage review.' },
    { day: 'Day 14', channel: 'AI Voice', color: ACCENT, what: 'Check-in call. Sarah mentions she\'s lost 8 lbs, feeling motivated. AI reinforces continued use.' },
    { day: 'Day 30', channel: 'AI Voice', color: '#22c55e', what: 'Refill reminder. Sarah confirms. First refill milestone achieved.' },
    { day: 'Day 90', channel: 'AI Voice', color: '#8b5cf6', what: 'Sarah considers stopping ("I\'ve lost enough"). AI explains rebound risk, offers telehealth consult.' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <h2 className="font-serif text-5xl text-foreground mb-4 leading-tight max-w-4xl">
        One patient, 90 days, crossing the drop-off cliff
      </h2>
      <p className="text-lg text-text-secondary mb-10 max-w-2xl">
        Sarah on Ozempic. The <span className="text-accent font-medium">Adhery</span> voice agent keeps her on therapy through the critical window.
      </p>
      <div className="max-w-4xl space-y-4 text-left w-full">
        {steps.map((s) => (
          <div key={s.day} className="flex items-start gap-5">
            <div className="w-14 flex-shrink-0 text-right pt-0.5">
              <span className="text-sm font-semibold text-foreground">{s.day}</span>
            </div>
            <div className="w-3 flex-shrink-0 pt-1.5">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
            </div>
            <div className="flex-1">
              <span className="text-xs font-medium px-2 py-0.5 text-white inline-block mb-1" style={{ backgroundColor: s.color }}>
                {s.channel}
              </span>
              <p className="text-foreground">{s.what}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultsSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <h2 className="font-serif text-5xl text-foreground mb-4 leading-tight max-w-4xl">
        GLP-1 adherence jumps from ~50% to 80%+ PDC
      </h2>
      <p className="text-lg text-text-secondary mb-10 max-w-3xl">
        Above the CMS Star Rating threshold. Patients cross the 90-day drop-off cliff that loses most GLP-1 patients.
      </p>
      <div className="max-w-4xl space-y-8 w-full text-left">
        {/* Before bar */}
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-sm font-medium text-text-muted">Manual call center</span>
            <span className="text-2xl font-bold text-text-secondary">~50% <span className="text-sm font-normal text-text-muted">PDC</span></span>
          </div>
          <div className="h-12 bg-surface border border-border-light flex">
            <div className="h-full bg-[#94a3b8] flex items-center justify-center" style={{ width: '50%' }}>
              <span className="text-sm text-white font-medium">50% adherent</span>
            </div>
            <div className="h-full flex items-center justify-center flex-1">
              <span className="text-sm text-text-muted">50% drop off</span>
            </div>
          </div>
        </div>

        {/* After bar */}
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-sm font-medium text-accent">Adhery Voice Agent</span>
            <span className="text-2xl font-bold text-accent">80%+ <span className="text-sm font-normal text-text-muted">PDC</span></span>
          </div>
          <div className="h-12 bg-surface border border-border-light flex">
            <div className="h-full bg-[#1e3a5f] flex items-center justify-center" style={{ width: '40%' }}>
              <span className="text-xs text-white font-medium">AI Voice</span>
            </div>
            <div className="h-full bg-[#22c55e] flex items-center justify-center" style={{ width: '35%' }}>
              <span className="text-xs text-white font-medium">SMS</span>
            </div>
            <div className="h-full bg-[#f59e0b] flex items-center justify-center" style={{ width: '15%' }}>
              <span className="text-[10px] text-white font-medium">Mail</span>
            </div>
            <div className="h-full flex items-center justify-center" style={{ width: '10%' }}>
              <span className="text-[10px] text-text-muted">RPh</span>
            </div>
          </div>
        </div>

        {/* Adherence improvement callout */}
        <div className="bg-accent/5 border-2 border-accent/20 p-6 flex items-center gap-8">
          <div className="text-center">
            <p className="text-4xl font-bold text-accent">+30pp</p>
            <p className="text-sm text-text-secondary">adherence gain</p>
          </div>
          <div className="w-px h-12 bg-accent/20" />
          <div>
            <p className="text-foreground">
              Patients cross the 90-day cliff and stay above the 80% PDC threshold that CMS Star Ratings require. Cost per patient drops from $130 to $18.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ROISlide() {
  const tiers = [
    { patients: '500', saved: '$20K', ftes: '~1.5', monthly: '$4,500', pdc: '80%+' },
    { patients: '2,000', saved: '$80K', ftes: '~6', monthly: '$15,000', pdc: '80%+', highlight: true },
    { patients: '5,000', saved: '$200K', ftes: '~15', monthly: '$30,000', pdc: '80%+' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <h2 className="font-serif text-5xl text-foreground mb-4 leading-tight max-w-4xl">
        A 2,000-patient GLP-1 program saves $80K and crosses the 90-day cliff
      </h2>
      <p className="text-lg text-text-secondary mb-10 max-w-3xl">
        Cost drops from $130 to $90 per patient. PDC goes from ~50% to 80%+. The savings fund redeployment to clinical work.
      </p>
      <div className="grid grid-cols-3 gap-6 max-w-5xl text-left">
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
                <p className="text-sm text-text-secondary">PDC (from ~50%)</p>
                <p className="text-xl font-semibold text-accent">{t.pdc}</p>
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
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <h2 className="font-serif text-5xl text-foreground mb-4 leading-tight max-w-4xl">
        Every morning, your lead pharmacist opens this
      </h2>
      <p className="text-lg text-text-secondary mb-10 max-w-2xl">
        Adherence rates, open alerts, retention milestones. One screen, real-time.
      </p>
      <div className="bg-surface border border-border-light p-10 max-w-4xl w-full text-left">
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Avg Adherence', value: '82%', color: 'text-accent' },
            { label: 'Active Patients', value: '2,000', color: 'text-foreground' },
            { label: 'Open Alerts', value: '23', color: 'text-amber-500' },
            { label: '90-Day Retention', value: '78%', color: 'text-green-600' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-border-light pt-4">
          <p className="text-sm text-text-muted">
            First fill, 30-day, 90-day, and PDC tracking. Patient timelines, escalation logs, and side-effect trends.
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
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <h2 className="font-serif text-5xl text-foreground mb-4 leading-tight max-w-4xl">
        Go live in 4 weeks, starting with your hardest-to-retain GLP-1 patients
      </h2>
      <p className="text-lg text-text-secondary mb-12 max-w-2xl">
        Pick 100 GLP-1 patients who churned or are about to. If it works there, it works everywhere.
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
    { range: 'Up to 500', pmpm: '$9' },
    { range: '500 - 5,000', pmpm: '$7.50', highlight: true },
    { range: '5,000+', pmpm: '$6' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <h2 className="font-serif text-5xl text-foreground mb-12 leading-tight max-w-4xl">
        30% less than your call center, ROI from day one
      </h2>
      <div className="flex gap-8 max-w-4xl items-start text-left">
        <div className="bg-surface-warm border-2 border-accent/20 p-8 w-56 flex-shrink-0">
          <p className="text-sm text-text-secondary mb-2">One-time setup</p>
          <p className="text-4xl font-bold text-foreground mb-2">$15K</p>
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
      <p className="text-sm text-text-secondary mt-8 max-w-3xl text-center">
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
        Which 100 GLP-1 patients should we bring back first?
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

// ─── Appendix Slides ───

function AppendixDividerSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <p className="text-sm text-text-muted uppercase tracking-widest mb-4">Appendix</p>
      <h2 className="font-serif text-5xl text-foreground leading-tight max-w-3xl">
        Business model and market opportunity
      </h2>
    </div>
  );
}

function BusinessModelSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <h2 className="font-serif text-5xl text-foreground mb-10 leading-tight max-w-4xl">
        Recurring revenue per patient, compounding with retention
      </h2>
      <div className="max-w-4xl space-y-8 text-left">
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-surface border border-border-light p-6">
            <p className="text-sm text-text-muted mb-2">Revenue per patient</p>
            <p className="text-3xl font-bold text-accent">$90/yr</p>
            <p className="text-xs text-text-secondary mt-2">$7.50 PMPM avg blended rate</p>
          </div>
          <div className="bg-surface border border-border-light p-6">
            <p className="text-sm text-text-muted mb-2">Gross margin</p>
            <p className="text-3xl font-bold text-foreground">80%</p>
            <p className="text-xs text-text-secondary mt-2">AI Voice + SMS costs ~$1.50/patient/mo</p>
          </div>
          <div className="bg-surface border border-border-light p-6">
            <p className="text-sm text-text-muted mb-2">Setup fee</p>
            <p className="text-3xl font-bold text-foreground">$15K</p>
            <p className="text-xs text-text-secondary mt-2">One-time per pharmacy, covers integration</p>
          </div>
        </div>
        <div className="border-l-4 border-accent/30 pl-6">
          <p className="text-lg text-foreground mb-2">
            Each pharmacy expands from 500 to 5,000+ patients over 2-3 years without additional sales cost. Adherence gains (~50% to 80%+) mean fewer churned patients and more retained drug spend.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-accent/5 border border-accent/20 p-6">
            <p className="text-sm text-text-muted mb-2">LTV per pharmacy (2,000 pts)</p>
            <p className="text-2xl font-bold text-accent">$555K</p>
            <p className="text-xs text-text-secondary mt-1">$15K setup + $180K ARR x 3yr avg tenure</p>
          </div>
          <div className="bg-accent/5 border border-accent/20 p-6">
            <p className="text-sm text-text-muted mb-2">CAC payback</p>
            <p className="text-2xl font-bold text-accent">&lt;3 months</p>
            <p className="text-xs text-text-secondary mt-1">Setup fee alone covers acquisition cost</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PharmaValueSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <h2 className="font-serif text-5xl text-foreground mb-10 leading-tight max-w-4xl">
        For every $1 a GLP-1 manufacturer spends on <span className="text-accent">Adhery</span>, they get $200+ back
      </h2>
      <div className="max-w-4xl space-y-6 text-left">
        <p className="text-lg text-text-secondary max-w-3xl">
          Example: GLP-1 manufacturer with 50,000 patients in support programs. GLP-1 drugs cost $1,000-$1,500/month ($12K-$18K/yr).
        </p>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-surface border border-border-light p-6">
            <p className="text-sm text-text-muted mb-2">Call center today</p>
            <p className="text-3xl font-bold text-foreground">$6.5M/yr</p>
            <p className="text-xs text-text-secondary mt-2">50K patients x $130/patient</p>
          </div>
          <div className="bg-surface border border-border-light p-6">
            <p className="text-sm text-text-muted mb-2">Adhery instead</p>
            <p className="text-3xl font-bold text-accent">$4.5M/yr</p>
            <p className="text-xs text-text-secondary mt-2">50K patients x $7.50/mo (30% less)</p>
          </div>
          <div className="bg-accent/5 border-2 border-accent/30 p-6">
            <p className="text-sm text-text-muted mb-2">Retained drug revenue</p>
            <p className="text-3xl font-bold text-accent">$75M/yr</p>
            <p className="text-xs text-text-secondary mt-2">5,000 more patients stay x $15K avg GLP-1 drug cost</p>
          </div>
        </div>
        <div className="bg-accent/10 border border-accent/30 p-5 flex items-center justify-between">
          <p className="text-foreground">
            <span className="font-bold">$2M/yr saved</span> in operations. <span className="font-bold">$75M/yr retained</span> in drug revenue.
          </p>
          <div className="text-right pl-8 shrink-0">
            <p className="text-5xl font-bold text-accent">~17x</p>
            <p className="text-xs text-text-muted">return</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarketSizeSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <h2 className="font-serif text-5xl text-foreground mb-10 leading-tight max-w-4xl">
        ~15M Americans on GLP-1s, growing rapidly
      </h2>
      <div className="max-w-4xl space-y-8 text-left">
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-surface border border-border-light p-6">
            <p className="text-sm text-text-muted mb-2">TAM</p>
            <p className="text-3xl font-bold text-foreground">$1.35B</p>
            <p className="text-xs text-text-secondary mt-2">~15M Americans on GLP-1s x $90/yr</p>
          </div>
          <div className="bg-surface border border-border-light p-6">
            <p className="text-sm text-text-muted mb-2">SAM</p>
            <p className="text-3xl font-bold text-foreground">$400M</p>
            <p className="text-xs text-text-secondary mt-2">Top consumer health + pharma, US only</p>
          </div>
          <div className="bg-accent/5 border-2 border-accent/30 p-6">
            <p className="text-sm text-text-muted mb-2">SOM (Year 3)</p>
            <p className="text-3xl font-bold text-accent">$18M</p>
            <p className="text-xs text-text-secondary mt-2">200K patients across consumer health + pharma partners</p>
          </div>
        </div>
        <div className="border-l-4 border-accent/30 pl-6 space-y-3">
          <p className="text-lg text-foreground">
            GLP-1 is the fastest-growing drug class in history. Semaglutide and tirzepatide prescriptions are expanding beyond diabetes into obesity, cardiovascular risk reduction, and MASH. Adherence directly determines whether patients achieve lasting outcomes.
          </p>
          <p className="text-text-secondary">
            Non-adherence costs GLP-1 manufacturers billions in lost revenue per year. Every patient who drops off at 90 days is $12K-$18K/yr in lost drug spend.
          </p>
        </div>
      </div>
    </div>
  );
}

function DataEnrichmentDividerSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <p className="text-sm text-text-muted uppercase tracking-widest mb-4">Appendix</p>
      <h2 className="font-serif text-5xl text-foreground leading-tight max-w-3xl">
        Patient Intelligence Infrastructure
      </h2>
      <p className="text-lg text-text-secondary mt-6 max-w-2xl">
        How Adhery sources, enriches, and acts on patient data to predict and prevent drop-off before it happens
      </p>
    </div>
  );
}

function DataGapSlide() {
  const formFields = [
    { field: 'Name, DOB, Address', available: true },
    { field: 'Phone, Email', available: true },
    { field: 'Insurance (primary, secondary)', available: true },
    { field: 'Diagnosis & Prescription', available: true },
    { field: 'Prescriber & Pharmacy', available: true },
  ];
  const missingFields = [
    { field: 'Food insecurity', impact: 'aOR 0.56', rank: 1 },
    { field: 'Housing instability', impact: 'aOR 0.64', rank: 2 },
    { field: 'Transportation access', impact: '46% of pts', rank: 3 },
    { field: 'Prior adherence history', impact: 'Best single predictor', rank: 4 },
    { field: 'Cost burden / copay sensitivity', impact: 'Significant', rank: 5 },
    { field: 'Mental health comorbidity', impact: '2x non-adherence', rank: 6 },
    { field: 'Health literacy', impact: 'Moderate', rank: 7 },
    { field: 'Social support / living situation', impact: 'Moderate', rank: 8 },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <h2 className="font-serif text-5xl text-foreground mb-10 leading-tight max-w-4xl">
        Enrollment forms collect the prescription, not the patient
      </h2>
      <div className="max-w-5xl grid grid-cols-2 gap-8 text-left">
        <div>
          <p className="text-sm text-text-muted uppercase tracking-wider mb-4">What the form collects</p>
          <div className="space-y-2">
            {formFields.map((f) => (
              <div key={f.field} className="flex items-center gap-3 text-foreground">
                <span className="text-green-500 text-sm">&#10003;</span>
                <span>{f.field}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 border-l-4 border-amber-400/50 pl-4">
            <p className="text-sm text-text-secondary">
              Standard across Merck, AbbVie, Novo Nordisk enrollment forms. None collect social or behavioral risk factors.
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm text-text-muted uppercase tracking-wider mb-4">What actually predicts drop-off</p>
          <div className="space-y-2">
            {missingFields.map((f) => (
              <div key={f.field} className="flex items-center gap-3">
                <span className="text-red-400 text-sm">&#10007;</span>
                <span className="text-foreground flex-1">{f.field}</span>
                <span className="text-xs text-accent font-medium">{f.impact}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs text-text-muted mt-8 italic max-w-3xl">
        Sources: PMC systematic review (2021), JMCP (2018), UCSF SIREN specialty pharmacy study, WHO adherence report
      </p>
    </div>
  );
}

function EnrichmentLayersSlide() {
  const layers = [
    {
      name: 'Geographic Intelligence',
      label: 'Layer 1',
      color: '#94a3b8',
      fields: [
        'Area deprivation index',
        'Food access & pharmacy density',
        'Social vulnerability indicators',
        'Rural vs urban classification',
        'Healthcare shortage area status',
      ],
      note: 'Derived from patient address at enrollment. Instant.',
    },
    {
      name: 'Demographic Enrichment',
      label: 'Layer 2',
      color: ACCENT,
      fields: [
        'Individual income range',
        'Education level',
        'Household size & composition',
        'Home ownership status',
        'Clinically validated SDoH risk score',
      ],
      note: 'Individual-level enrichment via HIPAA-compliant data partners.',
    },
    {
      name: 'Adhery Behavioral Intelligence',
      label: 'Layer 3',
      color: '#22c55e',
      fields: [
        'Response time & engagement rate',
        'Voice call sentiment trajectory',
        'Cost/insurance barrier signals',
        'Side effect mention frequency',
        'Refill pattern & drop-off indicators',
      ],
      note: 'Generated by Adhery\'s AI agent. Real-time. Proprietary.',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <h2 className="font-serif text-5xl text-foreground mb-10 leading-tight max-w-4xl">
        Three layers of patient intelligence
      </h2>
      <div className="max-w-5xl grid grid-cols-3 gap-5 text-left">
        {layers.map((layer) => (
          <div key={layer.name} className="border border-border-light p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3" style={{ backgroundColor: layer.color }} />
              <p className="text-xs text-text-muted uppercase tracking-wider">{layer.label}</p>
            </div>
            <p className="text-lg font-semibold text-foreground mb-4">{layer.name}</p>
            <div className="space-y-1.5 mb-4">
              {layer.fields.map((f) => (
                <div key={f} className="flex items-start gap-2">
                  <span className="text-xs mt-0.5" style={{ color: layer.color }}>&#8226;</span>
                  <span className="text-sm text-text-secondary">{f}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-text-muted border-t border-border-light pt-3">{layer.note}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-text-secondary mt-8 max-w-3xl">
        All three layers combine into a single adherence risk score per patient, updated in real time.
      </p>
    </div>
  );
}

function AdheryBehavioralSlide() {
  const signals = [
    {
      signal: 'First response time',
      when: 'Day 1-3',
      meaning: 'Engagement level and digital literacy',
      confidence: 85,
    },
    {
      signal: 'Voice call sentiment score',
      when: 'First call',
      meaning: 'Emotional state, anxiety about treatment',
      confidence: 82,
    },
    {
      signal: 'Cost/insurance questions',
      when: 'Any interaction',
      meaning: 'Financial barrier present, copay sensitivity',
      confidence: 88,
    },
    {
      signal: 'Side effect mentions',
      when: 'Week 1-4',
      meaning: 'Tolerability concern, may discontinue',
      confidence: 80,
    },
    {
      signal: 'Missed refill window',
      when: 'Day 28-35',
      meaning: 'Early drop-off signal, strongest single predictor',
      confidence: 92,
    },
    {
      signal: 'Response rate decline',
      when: 'Ongoing',
      meaning: 'Disengagement trajectory, pre-drop-off pattern',
      confidence: 87,
    },
    {
      signal: 'Channel avoidance',
      when: 'Ongoing',
      meaning: 'Opted out of voice = lower engagement surface',
      confidence: 75,
    },
    {
      signal: '"I feel better" / "lost enough"',
      when: 'Day 60-90',
      meaning: 'Premature discontinuation intent (GLP-1 specific)',
      confidence: 90,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <h2 className="font-serif text-5xl text-foreground mb-4 leading-tight max-w-4xl">
        Adhery generates the data that predicts drop-off
      </h2>
      <p className="text-lg text-text-secondary mb-8 max-w-3xl">
        Every voice call, SMS, and missed window produces behavioral signals no external dataset can match.
      </p>
      <div className="max-w-5xl w-full text-left">
        <div className="grid grid-cols-[1fr_80px_1.5fr_60px] gap-px bg-border-light border border-border-light">
          <div className="bg-surface-warm p-2.5 text-[10px] font-medium text-text-muted uppercase">Signal</div>
          <div className="bg-surface-warm p-2.5 text-[10px] font-medium text-text-muted uppercase">When</div>
          <div className="bg-surface-warm p-2.5 text-[10px] font-medium text-text-muted uppercase">What it means</div>
          <div className="bg-surface-warm p-2.5 text-[10px] font-medium text-text-muted uppercase text-right">Conf.</div>
          {signals.map((s) => (
            <>
              <div key={s.signal} className="bg-background p-2.5 text-sm font-medium text-foreground">{s.signal}</div>
              <div className="bg-background p-2.5 text-xs text-accent font-medium">{s.when}</div>
              <div className="bg-background p-2.5 text-sm text-text-secondary">{s.meaning}</div>
              <div className="bg-background p-2.5 text-right">
                <span className={`text-sm font-bold ${s.confidence >= 85 ? 'text-green-600' : s.confidence >= 80 ? 'text-accent' : 'text-amber-500'}`}>
                  {s.confidence}%
                </span>
              </div>
            </>
          ))}
        </div>
      </div>
      <div className="mt-6 bg-accent/5 border border-accent/20 p-4 max-w-3xl">
        <p className="text-sm text-foreground">
          <span className="font-bold">This is Adhery&rsquo;s moat.</span> The AI agent creates the interaction data, then uses it to predict and prevent the drop-off. No call center or static enrichment can do both.
        </p>
      </div>
    </div>
  );
}

function ConfidenceSummarySlide() {
  // Each layer: base = where previous layer ended, delta = what this layer adds
  const layers = [
    {
      label: 'Enrollment form only',
      desc: 'Name, address, insurance, diagnosis',
      base: 0,
      delta: 25,
      color: '#d1d5db',
      total: 25,
    },
    {
      label: '+ Geographic intelligence',
      desc: '+ Area deprivation, food access, pharmacy density, SVI',
      base: 25,
      delta: 30,
      color: '#94a3b8',
      total: 55,
    },
    {
      label: '+ Demographic enrichment',
      desc: '+ Individual income, education, household, SDoH score',
      base: 55,
      delta: 15,
      color: ACCENT,
      total: 70,
    },
    {
      label: '+ Adhery behavioral data',
      desc: '+ Sentiment, response time, cost signals, refill patterns',
      base: 70,
      delta: 20,
      color: '#22c55e',
      total: 90,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <h2 className="font-serif text-5xl text-foreground mb-4 leading-tight max-w-4xl">
        Each layer compounds prediction accuracy
      </h2>
      <p className="text-lg text-text-secondary mb-12 max-w-3xl">
        Confidence in predicting 90-day adherence outcome, by data layer
      </p>
      <div className="max-w-4xl w-full space-y-6 text-left">
        {layers.map((l) => (
          <div key={l.label} className="flex items-center gap-6">
            {/* Label column */}
            <div className="w-56 flex-shrink-0 text-right">
              <p className="text-sm font-semibold text-foreground leading-tight">{l.label}</p>
              <p className="text-xs text-text-muted mt-0.5">{l.desc}</p>
            </div>
            {/* Stacked bar */}
            <div className="flex-1 flex items-center gap-4">
              <div className="flex-1 h-10 bg-surface border border-border-light relative flex">
                {/* Previous layers (grayed out) */}
                {l.base > 0 && (
                  <div
                    className="h-full bg-[#e5e7eb]"
                    style={{ width: `${(l.base / 100) * 100}%` }}
                  />
                )}
                {/* This layer's contribution (colored) */}
                <div
                  className="h-full flex items-center justify-center"
                  style={{ width: `${(l.delta / 100) * 100}%`, backgroundColor: l.color }}
                >
                  <span className="text-xs font-bold text-white">+{l.delta}pp</span>
                </div>
              </div>
              <span className="text-2xl font-bold w-14 text-right" style={{ color: l.color }}>
                {l.total}%
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Legend */}
      <div className="mt-10 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-3 bg-[#e5e7eb]" />
          <span className="text-xs text-text-muted">Previous layers</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-3" style={{ backgroundColor: '#22c55e' }} />
          <span className="text-xs text-text-muted">New contribution</span>
        </div>
      </div>
      <p className="text-xs text-text-muted mt-6 italic max-w-3xl">
        Based on published ML adherence prediction models achieving AUC 0.83-0.87 with behavioral + demographic features.
      </p>
    </div>
  );
}

function RevenueProjectionSlide() {
  const years = [
    { year: 'Year 1', pharmacies: '5', patients: '5K', arr: '$450K', note: 'Pilot phase' },
    { year: 'Year 2', pharmacies: '20', patients: '40K', arr: '$3.6M', note: 'Expansion', highlight: false },
    { year: 'Year 3', pharmacies: '40', patients: '200K', arr: '$18M', note: 'Scale', highlight: true },
    { year: 'Year 5', pharmacies: '150', patients: '1M', arr: '$90M', note: 'Market leader', highlight: false },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <h2 className="font-serif text-5xl text-foreground mb-10 leading-tight max-w-4xl">
        Path to $90M ARR with 80% margins
      </h2>
      <div className="max-w-4xl text-left">
        <div className="grid grid-cols-4 gap-4 mb-8">
          {years.map((y) => (
            <div
              key={y.year}
              className={`p-6 ${
                y.highlight ? 'bg-accent/5 border-2 border-accent/30' : 'bg-surface border border-border-light'
              }`}
            >
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">{y.year}</p>
              <p className="text-3xl font-bold text-accent mb-3">{y.arr}</p>
              <div className="space-y-1">
                <p className="text-sm text-foreground">{y.pharmacies} pharmacies</p>
                <p className="text-sm text-foreground">{y.patients} patients</p>
              </div>
              <p className="text-xs text-text-muted mt-3">{y.note}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="border-l-4 border-accent/30 pl-6">
            <p className="text-sm text-text-muted mb-1">Why this scales</p>
            <p className="text-foreground">
              Each pharmacy runs autonomously once configured. Adding a pharmacy costs one integration sprint, not a new team. Marginal cost per patient approaches zero.
            </p>
          </div>
          <div className="border-l-4 border-accent/30 pl-6">
            <p className="text-sm text-text-muted mb-1">Valuation benchmark</p>
            <p className="text-foreground">
              Healthcare SaaS companies trade at 15-25x ARR. At $18M ARR (Year 3), that puts Adhery at a $270M-$450M valuation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Slides Array ───
const slides = [
  TitleSlide,             // 1: Autonomous Voice Agent for Every GLP-1 Patient
  RealitySlide,           // 2: Half of GLP-1 patients stop within 12 months
  GapSlide,               // 3: Patients need support their way
  EvidenceSlide,          // 4: AI-driven outreach 2-3x better
  IntroducingSlide,       // 5: Autonomous voice agent - AI Voice forward
  SafetyComplianceSlide,  // 6: Zero-Hallucination Safety
  PatientStorySlide,      // 7: Sarah on Ozempic, 90 days
  ResultsSlide,           // 8: GLP-1 adherence ~50% → 80%+
  ROISlide,               // 9: $80K saved, crosses 90-day cliff
  DashboardSlide,         // 10: One dashboard every morning
  GettingStartedSlide,    // 11: Live in 4 weeks
  PricingSlide,           // 12: 30% less than call center, $6-9 PMPM
  CTASlide,               // 13: Which 100 GLP-1 patients?
  // ─── Appendix: Business ───
  AppendixDividerSlide,     // 14: Appendix divider
  BusinessModelSlide,       // 15: Revenue model and unit economics
  PharmaValueSlide,         // 16: Value to GLP-1 manufacturers
  MarketSizeSlide,          // 17: TAM/SAM/SOM for GLP-1
  RevenueProjectionSlide,   // 18: Path to $90M ARR
  // --- Appendix: Data Enrichment ---
  DataEnrichmentDividerSlide, // 19: Patient Intelligence Infrastructure
  DataGapSlide,               // 20: Enrollment forms miss what predicts drop-off
  EnrichmentLayersSlide,      // 21: Three layers of patient intelligence
  AdheryBehavioralSlide,      // 22: Adhery behavioral data = the moat
  ConfidenceSummarySlide,     // 23: Each layer compounds prediction accuracy
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
