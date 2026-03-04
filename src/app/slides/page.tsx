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
        What if your pharmacists only talked to patients who{' '}
        <span className="text-accent">actually need them?</span>
      </h1>
      <p className="text-xl text-text-secondary max-w-2xl">
        Automated multichannel adherence for specialty pharmacy
      </p>
      <div className="mt-20 flex items-center gap-3 text-text-muted text-sm">
        <span>Press</span>
        <kbd className="px-2 py-1 border border-border-light rounded text-xs font-mono">
          &rarr;
        </kbd>
        <span>to navigate</span>
      </div>
      <span className="absolute bottom-6 right-8 text-[10px] text-text-muted/50">
        v2.0
      </span>
    </div>
  );
}

function RealitySlide() {
  return (
    <div className="flex flex-col justify-center h-full px-20">
      <p className="text-xs font-medium text-accent uppercase tracking-[0.2em] mb-4">
        The Reality Today
      </p>
      <h2 className="font-serif text-5xl text-foreground mb-6 leading-tight max-w-4xl">
        This is what adherence looks like at most specialty pharmacies
      </h2>
      <p className="text-lg text-text-secondary mb-10 max-w-2xl">
        Your team makes 13 calls per patient per year. Here&apos;s what that actually looks like.
      </p>
      {/* Wall of calls visualization */}
      <div className="max-w-4xl">
        <div className="grid grid-cols-13 gap-1 mb-8">
          {Array.from({ length: 13 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className="w-full aspect-square rounded-sm flex items-center justify-center text-white text-xs font-bold"
                style={{
                  backgroundColor:
                    i < 8
                      ? '#94a3b8' // voicemail gray
                      : i < 11
                        ? '#e2e8f0' // routine - light
                        : ACCENT, // important
                  color: i < 8 ? '#fff' : i < 11 ? '#64748b' : '#fff',
                }}
              >
                {i + 1}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-[#94a3b8]" />
            <span className="text-text-secondary">8 go to voicemail</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-[#e2e8f0]" />
            <span className="text-text-secondary">3 are routine check-ins</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: ACCENT }} />
            <span className="text-text-secondary">2 actually matter</span>
          </div>
        </div>
      </div>
      <p className="text-base text-text-muted mt-8 max-w-2xl italic">
        The calls that need real clinical attention get buried under the ones that don&apos;t.
      </p>
    </div>
  );
}

function RealCostSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-20">
      <p className="text-xs font-medium text-accent uppercase tracking-[0.2em] mb-4">
        The Real Cost
      </p>
      <h2 className="font-serif text-5xl text-foreground mb-10 leading-tight max-w-4xl">
        The real cost isn&apos;t <span className="text-accent">$130 per patient</span>
      </h2>
      <div className="max-w-4xl space-y-8">
        <div className="border-l-4 border-accent/30 pl-8">
          <p className="text-2xl text-foreground mb-2">
            Yes, it&apos;s $130/patient/year in direct costs.
          </p>
          <p className="text-lg text-text-secondary">
            6+ FTEs per 1,000 patients just running the call center.
          </p>
        </div>
        <div className="border-l-4 border-accent pl-8">
          <p className="text-2xl text-foreground mb-2">
            But the real cost is your best pharmacists spending{' '}
            <span className="font-semibold">85% of their time</span> on calls any system could handle.
          </p>
          <p className="text-lg text-text-secondary">
            The patients who actually need clinical attention? They wait.
          </p>
        </div>
        <div className="mt-6 bg-surface-warm border border-border-light p-6">
          <p className="text-xl text-foreground font-medium">
            The villain isn&apos;t cost. It&apos;s <span className="text-accent font-semibold">misallocation of expertise</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

function PatientNeedsSlide() {
  const needs = [
    {
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      need: 'A reminder at the right time',
      channel: 'SMS',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
        </svg>
      ),
      need: 'Help when the copay jumps',
      channel: 'Voice',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      ),
      need: 'Someone who notices they stopped refilling',
      channel: 'Mail',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
        </svg>
      ),
      need: 'Encouragement when they hit a milestone',
      channel: 'SMS',
    },
  ];

  return (
    <div className="flex flex-col justify-center h-full px-20">
      <p className="text-xs font-medium text-accent uppercase tracking-[0.2em] mb-4">
        What Patients Actually Need
      </p>
      <h2 className="font-serif text-5xl text-foreground mb-4 leading-tight max-w-3xl">
        Not 13 phone calls
      </h2>
      <p className="text-lg text-text-secondary mb-12 max-w-2xl">
        Each need is a different channel. No single channel works.
      </p>
      <div className="grid grid-cols-2 gap-6 max-w-4xl">
        {needs.map((n) => (
          <div key={n.need} className="flex items-start gap-5 bg-surface border border-border-light p-6">
            <div className="w-12 h-12 bg-accent/10 flex items-center justify-center flex-shrink-0">
              {n.icon}
            </div>
            <div>
              <p className="text-lg text-foreground font-medium">{n.need}</p>
              <p className="text-sm text-text-muted mt-1">Best via {n.channel}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EvidenceSlide() {
  const stats = [
    {
      value: 'RR 1.23',
      label: 'Two-way SMS vs. one-way',
      detail: '23% better adherence when patients can reply',
    },
    {
      value: 'SMD 0.89',
      label: 'SMS + Voice combined',
      detail: 'Large effect size for multichannel outreach',
    },
    {
      value: '3.56x',
      label: 'Brief pharmacist calls',
      detail: 'Continuation rate vs. no intervention',
    },
  ];

  return (
    <div className="flex flex-col justify-center h-full px-20">
      <p className="text-xs font-medium text-accent uppercase tracking-[0.2em] mb-4">
        The Evidence Is Clear
      </p>
      <h2 className="font-serif text-5xl text-foreground mb-12 leading-tight max-w-4xl">
        The research says multichannel wins
      </h2>
      <div className="flex gap-6 max-w-4xl mb-10">
        {stats.map((s) => (
          <div key={s.value} className="flex-1 border-l-2 border-accent/30 pl-6">
            <p className="text-4xl font-bold text-accent mb-2">{s.value}</p>
            <p className="font-medium text-foreground mb-1">{s.label}</p>
            <p className="text-sm text-text-secondary">{s.detail}</p>
          </div>
        ))}
      </div>
      <div className="bg-surface-warm border border-border-light p-6 max-w-4xl">
        <p className="text-lg text-foreground">
          The problem is nobody&apos;s built it for specialty pharmacy.{' '}
          <span className="text-accent font-medium">Until now.</span>
        </p>
      </div>
    </div>
  );
}

function MultimodalImpactSlide() {
  const callCenter = [
    { label: 'Phone call', pct: 45, color: '#94a3b8', result: '~45% reached' },
    { label: 'Voicemail', pct: 55, color: '#cbd5e1', result: '~55% missed' },
  ];
  const multichannel = [
    { label: 'SMS', pct: 92, color: '#22c55e', result: '92% delivered' },
    { label: 'AI Voice', pct: 78, color: ACCENT, result: '78% reached' },
    { label: 'Mail', pct: 99, color: '#f59e0b', result: '99% delivered' },
    { label: 'Combined', pct: 96, color: '#8b5cf6', result: '96% engaged' },
  ];

  return (
    <div className="flex flex-col justify-center h-full px-20">
      <p className="text-xs font-medium text-accent uppercase tracking-[0.2em] mb-4">
        Why Multichannel Wins
      </p>
      <h2 className="font-serif text-5xl text-foreground mb-12 leading-tight max-w-4xl">
        One channel is a guess. Multiple channels are a{' '}
        <span className="text-accent">system</span>.
      </h2>
      <div className="grid grid-cols-2 gap-12 max-w-5xl">
        {/* Call Center Only */}
        <div>
          <p className="text-sm font-medium text-text-muted uppercase tracking-wider mb-6">
            Call Center Only
          </p>
          <div className="space-y-4">
            {callCenter.map((c) => (
              <div key={c.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-foreground">{c.label}</span>
                  <span className="text-sm text-text-secondary">{c.result}</span>
                </div>
                <div className="h-6 bg-border-light">
                  <div
                    className="h-full"
                    style={{ width: `${c.pct}%`, backgroundColor: c.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t border-border-light pt-4">
            <p className="text-2xl font-bold text-text-secondary">~45%</p>
            <p className="text-sm text-text-muted">effective reach</p>
          </div>
        </div>

        {/* Multichannel Automated */}
        <div>
          <p className="text-sm font-medium text-accent uppercase tracking-wider mb-6">
            Multichannel Automated
          </p>
          <div className="space-y-4">
            {multichannel.map((c) => (
              <div key={c.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-foreground">{c.label}</span>
                  <span className="text-sm text-text-secondary">{c.result}</span>
                </div>
                <div className="h-6 bg-border-light">
                  <div
                    className="h-full"
                    style={{ width: `${c.pct}%`, backgroundColor: c.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t border-border-light pt-4">
            <p className="text-2xl font-bold text-accent">96%</p>
            <p className="text-sm text-text-muted">effective reach</p>
          </div>
        </div>
      </div>
      {/* AI Voice Advantages */}
      <div className="mt-8 max-w-5xl">
        <p className="text-xs font-medium text-accent uppercase tracking-wider mb-4">
          Why AI Voice Beats Manual Calls
        </p>
        <div className="flex gap-3">
          {[
            'Calls when the patient is available',
            'Every call, every patient',
            'Detects subtle signals in conversation',
            'Style adapted per patient',
            'Learns preferred engagement over time',
          ].map((adv) => (
            <div key={adv} className="flex-1 bg-surface border border-border-light px-3 py-2">
              <p className="text-xs text-foreground">{adv}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function IntroducingSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <img src="/logo.svg" alt="Adhery" className="w-16 h-16 mb-8" />
      <h2 className="font-serif text-5xl text-foreground mb-6 leading-tight">
        Automated multichannel adherence<br />for specialty pharmacy
      </h2>
      <div className="flex items-center gap-10 mt-10 mb-12">
        {[
          {
            label: 'SMS',
            icon: (
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
              </svg>
            ),
          },
          {
            label: 'AI Voice',
            icon: (
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
            ),
          },
          {
            label: 'Mail',
            icon: (
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            ),
          },
        ].map((ch) => (
          <div key={ch.label} className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-accent/10 flex items-center justify-center text-accent">
              {ch.icon}
            </div>
            <span className="text-sm font-medium text-foreground">{ch.label}</span>
          </div>
        ))}
      </div>
      <div className="bg-surface-warm border border-border-light px-8 py-5 max-w-xl">
        <p className="text-lg text-foreground">
          <span className="text-accent font-semibold">95%</span> handled automatically.
          Your pharmacists handle the <span className="text-accent font-semibold">5%</span> that matters.
        </p>
      </div>
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
        { from: 'ai', text: 'Great! I\'ll check in around your dose times. When do you usually take it?' },
        { from: 'pt', text: 'Mornings around 8' },
      ],
      note: 'Opt-out default. Fast activation. Learns her schedule.',
    },
    {
      day: 'Day 3',
      channel: 'SMS',
      color: '#f59e0b',
      messages: [
        { from: 'ai', text: 'Good morning Maria! How was your Humira dose yesterday?' },
        { from: 'pt', text: 'I noticed redness at the injection site' },
        { from: 'ai', text: 'Is it bigger than a quarter, or any swelling?' },
        { from: 'pt', text: 'No pretty small' },
        { from: 'ai', text: 'That\'s normal. Cold compress 10 min before next dose helps. I\'ll check back tomorrow.' },
      ],
      note: 'Multi-step triage. Asks follow-ups a voicemail never could.',
    },
    {
      day: 'Day 5',
      channel: 'Voice',
      color: ACCENT,
      messages: [
        { from: 'ai', text: 'Hi Maria, calling to check on the injection site redness you mentioned.' },
        { from: 'pt', text: 'Oh it went away, but I\'ve been really tired.' },
        { from: 'ai', text: 'Fatigue can happen in the first weeks. Is it affecting your daily activities?' },
        { from: 'pt', text: 'A little, I\'m napping more' },
        { from: 'ai', text: 'I\'m noting that for your pharmacist. It often improves by week 3. Want me to schedule a call with them?' },
      ],
      note: 'Catches new symptom. Adapted tone. Pharmacist notified.',
    },
    {
      day: 'Day 14',
      channel: 'SMS',
      color: '#22c55e',
      messages: [
        { from: 'ai', text: 'Refill on the way! Expected Thursday. How\'s the fatigue?' },
        { from: 'pt', text: 'Actually much better this week!' },
        { from: 'ai', text: 'That\'s great progress. You\'re 2 weeks in, right on track.' },
      ],
      note: 'Follows up on prior symptom. Habit-formation loop.',
    },
    {
      day: 'Day 30',
      channel: 'SMS',
      color: '#8b5cf6',
      messages: [
        { from: 'ai', text: 'One month on Humira! You\'ve taken every dose. That\'s a real milestone.' },
        { from: 'pt', text: 'Thank you! Feeling so much better' },
        { from: 'ai', text: 'Your pharmacist will love hearing that. Any questions before your next refill?' },
      ],
      note: 'Milestone recognition (+7pp retention). Competence-focused.',
    },
  ];

  return (
    <div className="flex flex-col justify-center h-full px-20">
      <p className="text-xs font-medium text-accent uppercase tracking-[0.2em] mb-4">
        See It In Action
      </p>
      <h2 className="font-serif text-4xl text-foreground mb-10 leading-tight max-w-3xl">
        Maria starts Humira. Here&apos;s what happens.
      </h2>
      <div className="max-w-4xl space-y-4">
        {steps.map((s) => (
          <div key={s.day} className="flex items-start gap-4">
            <div className="w-16 flex-shrink-0 text-right">
              <span className="text-sm font-semibold text-foreground">{s.day}</span>
            </div>
            <div className="w-1 flex-shrink-0 relative">
              <div className="w-3 h-3 rounded-full -ml-1" style={{ backgroundColor: s.color }} />
              <div className="w-px h-full bg-border-light absolute left-0 top-3" />
            </div>
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-xs font-medium px-2 py-0.5 text-white"
                  style={{ backgroundColor: s.color }}
                >
                  {s.channel}
                </span>
                <span className="text-[10px] text-text-muted">{s.note}</span>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {s.messages.map((m, i) => (
                  <span
                    key={i}
                    className={`text-xs px-2 py-0.5 ${
                      m.from === 'ai'
                        ? 'bg-accent/10 text-accent'
                        : 'bg-border-light text-text-secondary'
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
      <p className="text-sm text-text-muted mt-6 max-w-2xl">
        Your pharmacist&apos;s involvement: zero. Maria is adherent, supported, and confident.
      </p>
    </div>
  );
}

function EscalationSlide() {
  const levels = [
    { channel: 'SMS', pct: 60, label: 'Resolved at first touch', color: '#22c55e' },
    { channel: 'AI Voice', pct: 25, label: 'Escalated to conversation', color: ACCENT },
    { channel: 'Mail', pct: 10, label: 'Physical follow-up', color: '#f59e0b' },
    { channel: 'Pharmacist', pct: 5, label: 'Human intervention', color: '#dc2626' },
  ];

  return (
    <div className="flex flex-col justify-center h-full px-20">
      <p className="text-xs font-medium text-accent uppercase tracking-[0.2em] mb-4">
        The Escalation Engine
      </p>
      <h2 className="font-serif text-5xl text-foreground mb-12 leading-tight max-w-4xl">
        From 13 calls to <span className="text-accent">~1 meaningful conversation</span>
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
            <div className="w-48">
              <span className="text-sm text-text-secondary">{l.label}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-base text-text-muted mt-10 max-w-3xl">
        Your pharmacists go from 13 calls to ~1 meaningful conversation per patient per year.
      </p>
    </div>
  );
}

function NumbersSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-20">
      <p className="text-xs font-medium text-accent uppercase tracking-[0.2em] mb-4">
        What Changes
      </p>
      <h2 className="font-serif text-5xl text-foreground mb-12 leading-tight">
        Before and after Adhery
      </h2>
      <div className="max-w-4xl">
        <div className="grid grid-cols-3 gap-8">
          {[
            {
              metric: 'Adherence (PDC)',
              before: '78%',
              after: '87%',
              note: '83% of patients above Star Rating threshold',
            },
            {
              metric: 'Manual calls',
              before: '13/patient',
              after: '~2 escalations',
              note: '85% fewer calls for your team',
            },
            {
              metric: 'Cost per patient',
              before: '$130/year',
              after: '$12/year',
              note: '91% cost reduction',
            },
          ].map((m) => (
            <div key={m.metric} className="bg-surface border border-border-light p-8">
              <p className="text-sm text-text-muted uppercase tracking-wider mb-4">
                {m.metric}
              </p>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl text-text-secondary line-through decoration-1">
                  {m.before}
                </span>
                <span className="text-text-muted">&rarr;</span>
                <span className="text-3xl font-bold text-accent">{m.after}</span>
              </div>
              <p className="text-sm text-text-secondary">{m.note}</p>
            </div>
          ))}
        </div>
      </div>
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
      <p className="text-xs font-medium text-accent uppercase tracking-[0.2em] mb-4">
        ROI For Your Pharmacy
      </p>
      <h2 className="font-serif text-5xl text-foreground mb-12 leading-tight max-w-4xl">
        The math works at every scale
      </h2>
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
      <p className="text-sm text-text-muted mt-8 max-w-3xl">
        That&apos;s not headcount reduction. That&apos;s redeployment to clinical work.
      </p>
    </div>
  );
}

function DashboardSlide() {
  return (
    <div className="flex flex-col justify-center h-full px-20">
      <p className="text-xs font-medium text-accent uppercase tracking-[0.2em] mb-4">
        What Your Team Sees
      </p>
      <h2 className="font-serif text-5xl text-foreground mb-4 leading-tight max-w-4xl">
        Every morning, your lead pharmacist opens this
      </h2>
      <p className="text-lg text-text-secondary mb-10 max-w-2xl">
        Real-time visibility. Every interaction logged. Every outcome measured.
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
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">
                {stat.label}
              </p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-border-light pt-4">
          <p className="text-sm text-text-muted">
            Alerts, patient timelines, escalation history - all in one place.
          </p>
        </div>
      </div>
    </div>
  );
}

function GettingStartedSlide() {
  const steps = [
    {
      week: 'Week 1',
      title: 'We configure your protocols',
      desc: 'You tell us your rules, we build them',
    },
    {
      week: 'Week 2-3',
      title: 'Patients start receiving outreach',
      desc: 'You watch the dashboard',
    },
    {
      week: 'Week 4',
      title: 'Review results together',
      desc: 'You decide whether to continue',
    },
  ];

  return (
    <div className="flex flex-col justify-center h-full px-20">
      <p className="text-xs font-medium text-accent uppercase tracking-[0.2em] mb-4">
        Getting Started Is Simple
      </p>
      <h2 className="font-serif text-5xl text-foreground mb-4 leading-tight max-w-3xl">
        Start with 100 patients who churned or are about to
      </h2>
      <p className="text-lg text-text-secondary mb-12 max-w-2xl">
        The hardest cohort. If it works there, it works everywhere. Results in 30 days.
      </p>
      <div className="flex items-start gap-6 max-w-4xl">
        {steps.map((step, i) => (
          <div key={step.week} className="flex items-start gap-6 flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className="w-16 h-16 flex items-center justify-center text-white text-sm font-bold mb-5"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_LIGHT})`,
                }}
              >
                {step.week}
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2 text-center">
                {step.title}
              </h3>
              <p className="text-sm text-text-secondary text-center">{step.desc}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="pt-7 text-text-muted text-2xl">&rarr;</div>
            )}
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
      <p className="text-xs font-medium text-accent uppercase tracking-[0.2em] mb-4">
        Pricing
      </p>
      <h2 className="font-serif text-5xl text-foreground mb-12 leading-tight">
        Simple, transparent, per-member pricing
      </h2>
      <div className="flex gap-8 max-w-4xl items-start">
        {/* Setup fee */}
        <div className="bg-surface-warm border-2 border-accent/20 p-8 w-56 flex-shrink-0">
          <p className="text-sm text-text-secondary mb-2">One-time setup</p>
          <p className="text-4xl font-bold text-foreground mb-2">$10K</p>
          <p className="text-xs text-text-secondary leading-relaxed">
            Protocol configuration, EHR integration, patient onboarding, team training
          </p>
        </div>

        {/* PMPM tiers */}
        <div className="flex-1">
          <p className="text-sm text-text-muted mb-4">+ monthly per member</p>
          <div className="grid grid-cols-3 gap-4">
            {tiers.map((t) => (
              <div
                key={t.range}
                className={`p-6 text-center ${
                  t.highlight
                    ? 'bg-accent/5 border-2 border-accent/30'
                    : 'bg-surface border border-border-light'
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
      <div className="max-w-4xl mt-8 space-y-2">
        <p className="text-foreground font-medium">
          No long-term contracts. Cancel anytime after pilot.
        </p>
        <p className="text-sm text-text-secondary">
          Setup fee covers full implementation. ROI payback typically within the first quarter.
        </p>
      </div>
    </div>
  );
}

function CTASlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <img src="/logo.svg" alt="Adhery" className="w-16 h-16 mb-10" />
      <h2 className="font-serif text-5xl text-foreground mb-6 leading-tight max-w-3xl">
        Which 100 churned patients should we start with?
      </h2>
      <p className="text-xl text-text-secondary max-w-xl mb-16">
        Give us your hardest cohort. Patients who already dropped off or are about to. 30 days, measurable results.
      </p>
      <div className="space-y-3 text-lg text-foreground">
        <p>
          <span className="font-semibold">adhery.com</span>
        </p>
        <p className="text-text-secondary">hello@adhery.com</p>
      </div>
    </div>
  );
}

// ─── Slides Array ───
const slides = [
  TitleSlide,
  RealitySlide,
  RealCostSlide,
  PatientNeedsSlide,
  EvidenceSlide,
  MultimodalImpactSlide,
  IntroducingSlide,
  PatientStorySlide,
  EscalationSlide,
  NumbersSlide,
  ROISlide,
  DashboardSlide,
  GettingStartedSlide,
  PricingSlide,
  CTASlide,
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
      <div key={current} className="h-full w-full animate-slide-in">
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
