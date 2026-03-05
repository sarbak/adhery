'use client';

import { useState, useEffect, useCallback } from 'react';

// ─── Constants ───
const ACCENT = '#0d7377';
const ACCENT_LIGHT = '#14919b';

// ─── Slide Components ───

function TitleSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <h1 className="font-serif text-6xl text-foreground mb-8 leading-tight max-w-4xl">
        What if every patient had{' '}
        <span className="text-accent whitespace-nowrap">their own AI&nbsp;navigator</span>
      </h1>
      <p className="text-xl text-text-secondary max-w-2xl">
        <span className="font-semibold text-foreground">Adhery</span> is an autonomous patient navigator for specialty pharmacy.
      </p>
      <div className="mt-20 flex items-center gap-3 text-text-muted text-sm">
        <span>Press</span>
        <kbd className="px-2 py-1 border border-border-light rounded text-xs font-mono">
          &rarr;
        </kbd>
        <span>to navigate</span>
      </div>
      <span className="absolute bottom-6 right-8 text-[10px] text-text-muted/50">
        v5.2
      </span>
    </div>
  );
}

function RealitySlide() {
  return (
    <div className="flex flex-col justify-center h-full px-20">
      <h2 className="font-serif text-5xl text-foreground mb-4 leading-tight max-w-4xl">
        Half of specialty patients stop taking their medication
      </h2>
      <p className="text-lg text-text-secondary mb-10 max-w-2xl">
        Call centers make 12-15 calls per patient per year. Most go to voicemail. Adherence stays around 50%.
      </p>
      <div className="max-w-4xl">
        <div className="h-16 bg-surface border border-border-light flex mb-6">
          <div className="h-full bg-[#94a3b8] flex items-center justify-center" style={{ width: '50%' }}>
            <span className="text-white font-medium">~50% adherent</span>
          </div>
          <div className="h-full flex items-center justify-center flex-1">
            <span className="text-lg text-text-muted">~50% drop off</span>
          </div>
        </div>
        <p className="text-sm text-text-secondary">
          Of those reached, most calls are routine check-ins. Real barriers go undetected until the patient stops refilling.
        </p>
      </div>
    </div>
  );
}

function GapSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-20">
      <h2 className="font-serif text-5xl text-foreground mb-10 leading-tight max-w-3xl">
        Patients need support on their terms, not yours
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
    <div className="flex flex-col justify-center h-full px-20">
      <h2 className="font-serif text-5xl text-foreground mb-12 leading-tight max-w-4xl">
        Research shows AI-driven outreach can double adherence rates
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
        <span className="text-accent">Adhery</span> runs your patient support program autonomously
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
        <span className="text-accent font-medium">Adhery</span> picks the right channel for each patient. 95% of needs resolve without a pharmacist.
      </p>
    </div>
  );
}

function PatientStorySlide() {
  const steps = [
    { day: 'Day 1', channel: 'AI Voice', color: ACCENT, what: 'Onboards Maria, learns her schedule and concerns' },
    { day: 'Day 3', channel: 'Async Triage', color: '#f59e0b', what: 'Maria texts about injection-site redness. Navigator collects details and routes to pharmacist for review.' },
    { day: 'Day 5', channel: 'AI Voice', color: ACCENT, what: 'Follow-up call. Maria mentions fatigue. Navigator logs it and flags for pharmacist.' },
    { day: 'Day 14', channel: 'Async Triage', color: '#f59e0b', what: 'Refill reminder sent. Maria confirms order.' },
    { day: 'Day 30', channel: 'AI Voice', color: '#8b5cf6', what: 'Milestone: 100% adherent. No pharmacist calls needed all month.' },
  ];

  return (
    <div className="flex flex-col justify-center h-full px-20">
      <h2 className="font-serif text-5xl text-foreground mb-4 leading-tight max-w-4xl">
        One patient, 30 days, zero pharmacist calls
      </h2>
      <p className="text-lg text-text-secondary mb-10 max-w-2xl">
        Maria on Humira. The <span className="text-accent font-medium">Adhery</span> navigator handles everything autonomously.
      </p>
      <div className="max-w-4xl space-y-4">
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
    <div className="flex flex-col justify-center h-full px-20">
      <h2 className="font-serif text-5xl text-foreground mb-4 leading-tight max-w-4xl">
        Adherence jumps from ~50% to 80%+ PDC
      </h2>
      <p className="text-lg text-text-secondary mb-10 max-w-3xl">
        Above the CMS Star Rating threshold. Cost per patient drops from $130 to $18.
      </p>
      <div className="max-w-4xl space-y-8">
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
            <span className="text-sm font-medium text-accent">Adhery Navigator</span>
            <span className="text-2xl font-bold text-accent">80%+ <span className="text-sm font-normal text-text-muted">PDC</span></span>
          </div>
          <div className="h-12 bg-surface border border-border-light flex">
            <div className="h-full bg-[#0d7377] flex items-center justify-center" style={{ width: '40%' }}>
              <span className="text-xs text-white font-medium">AI Voice</span>
            </div>
            <div className="h-full bg-[#22c55e] flex items-center justify-center" style={{ width: '35%' }}>
              <span className="text-xs text-white font-medium">Async</span>
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
              Patients go from missing every other dose to staying above the 80% threshold that CMS Star Ratings require.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ROISlide() {
  const tiers = [
    { patients: '500', saved: '$59K', ftes: '~1.5', monthly: '$6,000', pdc: '80%+' },
    { patients: '2,000', saved: '$236K', ftes: '~6', monthly: '$20,000', pdc: '80%+', highlight: true },
    { patients: '5,000', saved: '$590K', ftes: '~15', monthly: '$40,000', pdc: '80%+' },
  ];

  return (
    <div className="flex flex-col justify-center h-full px-20">
      <h2 className="font-serif text-5xl text-foreground mb-4 leading-tight max-w-4xl">
        A 2,000-patient pharmacy saves $236K and gains 30 points of adherence
      </h2>
      <p className="text-lg text-text-secondary mb-10 max-w-3xl">
        Cost drops from $130 to $18 per patient. PDC goes from ~50% to 80%+. The savings fund redeployment to clinical work.
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
    <div className="flex flex-col justify-center h-full px-20">
      <h2 className="font-serif text-5xl text-foreground mb-4 leading-tight max-w-4xl">
        Every morning, your lead pharmacist opens this
      </h2>
      <p className="text-lg text-text-secondary mb-10 max-w-2xl">
        Adherence rates, open alerts, cost savings. One screen, real-time.
      </p>
      <div className="bg-surface border border-border-light p-10 max-w-4xl">
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Avg Adherence', value: '82%', color: 'text-accent' },
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
            Patient timelines, escalation logs, and side-effect trends.
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
    { range: 'Up to 500', pmpm: '$12' },
    { range: '500 - 5,000', pmpm: '$10', highlight: true },
    { range: '5,000+', pmpm: '$8' },
  ];

  return (
    <div className="flex flex-col justify-center h-full px-20">
      <h2 className="font-serif text-5xl text-foreground mb-12 leading-tight max-w-4xl">
        $15K setup, $8-12 per patient per month, ROI in the first quarter
      </h2>
      <div className="flex gap-8 max-w-4xl items-start">
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
    <div className="flex flex-col justify-center h-full px-20">
      <h2 className="font-serif text-5xl text-foreground mb-10 leading-tight max-w-4xl">
        Recurring revenue per patient, compounding with retention
      </h2>
      <div className="max-w-4xl space-y-8">
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-surface border border-border-light p-6">
            <p className="text-sm text-text-muted mb-2">Revenue per patient</p>
            <p className="text-3xl font-bold text-accent">$120/yr</p>
            <p className="text-xs text-text-secondary mt-2">$10 PMPM avg blended rate</p>
          </div>
          <div className="bg-surface border border-border-light p-6">
            <p className="text-sm text-text-muted mb-2">Gross margin</p>
            <p className="text-3xl font-bold text-foreground">85%+</p>
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
            <p className="text-2xl font-bold text-accent">$735K</p>
            <p className="text-xs text-text-secondary mt-1">$15K setup + $240K ARR x 3yr avg tenure</p>
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
    <div className="flex flex-col justify-center h-full px-20">
      <h2 className="font-serif text-5xl text-foreground mb-10 leading-tight max-w-4xl">
        For every $1 spent on <span className="text-accent">Adhery</span>, pharma gets $50+ back
      </h2>
      <div className="max-w-4xl space-y-8">
        {/* Side-by-side: They pay vs They get */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-surface border border-border-light p-8">
            <p className="text-xs text-text-muted uppercase tracking-wider mb-4">They pay</p>
            <p className="text-4xl font-bold text-foreground mb-2">$10</p>
            <p className="text-sm text-text-secondary">per patient per month</p>
            <div className="border-t border-border-light mt-6 pt-4">
              <p className="text-sm text-text-secondary">For 50K patients:</p>
              <p className="text-xl font-bold text-foreground">$6M/yr</p>
            </div>
          </div>
          <div className="bg-accent/5 border-2 border-accent/30 p-8">
            <p className="text-xs text-text-muted uppercase tracking-wider mb-4">They get back</p>
            <div className="space-y-4">
              <div>
                <p className="text-4xl font-bold text-accent mb-1">$5.6M/yr</p>
                <p className="text-sm text-text-secondary">in call center savings ($130 → $18 per patient)</p>
              </div>
              <div className="border-t border-accent/20 pt-4">
                <p className="text-3xl font-bold text-accent mb-1">$250M+</p>
                <p className="text-sm text-text-secondary">in retained drug revenue from patients who stay on therapy</p>
              </div>
            </div>
          </div>
        </div>
        {/* ROI callout */}
        <div className="bg-accent/10 border border-accent/30 p-6 flex items-center justify-between">
          <div>
            <p className="text-lg text-foreground">
              <span className="font-semibold text-accent">Adhery pays for itself</span> in call center savings alone. The retained drug revenue is pure upside.
            </p>
            <p className="text-sm text-text-secondary mt-1">
              At ~50% adherence, half of 50K patients eventually drop off. Each lost patient = $50K-$500K/yr in drug spend gone.
            </p>
          </div>
          <div className="text-right pl-8 shrink-0">
            <p className="text-5xl font-bold text-accent">50x</p>
            <p className="text-xs text-text-muted">ROI</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarketSizeSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-20">
      <h2 className="font-serif text-5xl text-foreground mb-10 leading-tight max-w-4xl">
        50M specialty patients in the US, growing 8% per year
      </h2>
      <div className="max-w-4xl space-y-8">
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-surface border border-border-light p-6">
            <p className="text-sm text-text-muted mb-2">TAM</p>
            <p className="text-3xl font-bold text-foreground">$6B</p>
            <p className="text-xs text-text-secondary mt-2">50M specialty patients x $120/yr</p>
          </div>
          <div className="bg-surface border border-border-light p-6">
            <p className="text-sm text-text-muted mb-2">SAM</p>
            <p className="text-3xl font-bold text-foreground">$1.2B</p>
            <p className="text-xs text-text-secondary mt-2">Top 10 therapeutic areas, US only</p>
          </div>
          <div className="bg-accent/5 border-2 border-accent/30 p-6">
            <p className="text-sm text-text-muted mb-2">SOM (Year 3)</p>
            <p className="text-3xl font-bold text-accent">$24M</p>
            <p className="text-xs text-text-secondary mt-2">200K patients across 40 pharmacies</p>
          </div>
        </div>
        <div className="border-l-4 border-accent/30 pl-6 space-y-3">
          <p className="text-lg text-foreground">
            Specialty pharmacy is the fastest-growing segment in US healthcare. Drugs cost $50K-$500K/year per patient. Adherence directly determines whether the drug works and whether the pharmacy keeps the patient.
          </p>
          <p className="text-text-secondary">
            Non-adherence costs specialty pharmacies $30B+ in lost revenue per year. Every patient who drops off is $50K-$500K in lost drug spend.
          </p>
        </div>
      </div>
    </div>
  );
}

function RevenueProjectionSlide() {
  const years = [
    { year: 'Year 1', pharmacies: '5', patients: '5K', arr: '$600K', note: 'Pilot phase' },
    { year: 'Year 2', pharmacies: '20', patients: '40K', arr: '$4.8M', note: 'Expansion', highlight: false },
    { year: 'Year 3', pharmacies: '40', patients: '200K', arr: '$24M', note: 'Scale', highlight: true },
    { year: 'Year 5', pharmacies: '150', patients: '1M', arr: '$120M', note: 'Market leader', highlight: false },
  ];

  return (
    <div className="flex flex-col justify-center h-full px-20">
      <h2 className="font-serif text-5xl text-foreground mb-10 leading-tight max-w-4xl">
        Path to $120M ARR with 85%+ margins
      </h2>
      <div className="max-w-4xl">
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
              Healthcare SaaS companies trade at 15-25x ARR. At $24M ARR (Year 3), that puts Adhery at a $360M-$600M valuation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Slides Array ───
const slides = [
  TitleSlide,       // 1: What if every patient had their own AI navigator
  RealitySlide,     // 2: Call centers reach less than half
  GapSlide,         // 3: Patients need support their way
  EvidenceSlide,    // 4: AI-driven outreach 2-3x better
  IntroducingSlide, // 5: Autonomous navigator - AI Voice forward
  PatientStorySlide,// 6: Maria's navigator catches every concern
  ResultsSlide,     // 7: Adherence 78% → 87%
  ROISlide,         // 8: $236K saved, 6 FTEs redeployed
  DashboardSlide,   // 9: One dashboard every morning
  GettingStartedSlide, // 10: Live in 4 weeks
  PricingSlide,     // 11: $15K + $8-12 PMPM
  CTASlide,         // 12: Which 100 patients?
  // ─── Appendix ───
  AppendixDividerSlide, // 13: Appendix divider
  BusinessModelSlide,   // 14: Revenue model and unit economics
  PharmaValueSlide,     // 15: Value to pharma companies
  MarketSizeSlide,      // 16: TAM/SAM/SOM
  RevenueProjectionSlide, // 17: Path to $120M ARR
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
