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
      <p className="text-sm uppercase tracking-[0.3em] text-text-muted mb-6">Patient support, reimagined</p>
      <h1 className="font-serif text-6xl text-foreground mb-8 leading-tight max-w-4xl">
        Every patient is a{' '}
        <span className="text-accent italic">patient&nbsp;of&nbsp;one</span>
      </h1>
      <p className="text-xl text-text-secondary max-w-2xl">
        Personalized voice conversations that adapt to each patient&rsquo;s
        journey, symptoms, and motivations.
      </p>
      <div className="mt-20 flex items-center gap-3 text-text-muted text-sm">
        <span>Press</span>
        <kbd className="px-2 py-1 border border-border-light rounded text-xs font-mono">
          &rarr;
        </kbd>
        <span>to navigate</span>
      </div>
      <span className="absolute bottom-6 right-8 text-[10px] text-text-muted/50">
        v8.0
      </span>
    </div>
  );
}

function ScaleProblemSlide() {
  return (
    <SlideLayout title="Your patient support programs weren't built for this scale">
      <div className="max-w-4xl w-full">
        <div className="flex items-end gap-12 mb-10">
          {/* Small bar */}
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-text-muted mb-2">2020</span>
            <div className="w-24 bg-border-light" style={{ height: '60px' }} />
            <span className="text-sm text-text-secondary mt-2">2M patients</span>
          </div>
          {/* Large bar */}
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-accent mb-2">2025</span>
            <div className="w-24" style={{ height: '240px', backgroundColor: ACCENT }} />
            <span className="text-sm font-semibold text-foreground mt-2">15M patients</span>
          </div>
          {/* Projected */}
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-accent/50 mb-2">2028</span>
            <div className="w-24 border-2 border-dashed border-accent/30" style={{ height: '360px' }} />
            <span className="text-sm text-text-secondary mt-2">30M+ projected</span>
          </div>

          {/* Right side text */}
          <div className="flex-1 pl-8 space-y-4">
            <div className="border-l-2 border-[#dc2626]/30 pl-6">
              <p className="text-base text-foreground">50% stop therapy within 12 months</p>
              <p className="text-sm text-text-secondary mt-1">Side effects, expectations, support gaps</p>
            </div>
            <div className="border-l-2 border-[#dc2626]/30 pl-6">
              <p className="text-base text-foreground">Nurse teams can&rsquo;t keep up</p>
              <p className="text-sm text-text-secondary mt-1">Reactive, expensive, limited hours</p>
            </div>
            <div className="border-l-2 border-accent/30 pl-6">
              <p className="text-base text-foreground font-semibold">Every lost patient is $2K-$5K in annual revenue</p>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}

function EightyTwentySlide() {
  const maxH = 320;
  const barW = 200;

  return (
    <SlideLayout title="80% of your patients need support, not a nurse">
      <div className="max-w-4xl w-full flex items-end gap-6">
        {/* 80% bar */}
        <div className="flex flex-col items-center">
          <span className="text-5xl font-bold mb-3" style={{ color: ACCENT }}>80%</span>
          <div className="relative" style={{ width: `${barW}px`, height: `${maxH}px` }}>
            <div
              className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
              style={{ backgroundColor: ACCENT }}
            >
              <p className="text-white text-lg font-semibold mb-3">Routine support</p>
              <div className="space-y-2 text-white/80 text-sm">
                <p>Side effect reassurance</p>
                <p>Refill reminders</p>
                <p>Motivation check-ins</p>
                <p>Expectation setting</p>
              </div>
            </div>
          </div>
          <div className="mt-4 bg-accent/10 px-4 py-2 text-center" style={{ width: `${barW}px` }}>
            <p className="text-sm font-bold text-accent">Adhery handles this</p>
            <p className="text-xs text-text-secondary mt-0.5">24/7, personalized, at scale</p>
          </div>
        </div>

        {/* Divider */}
        <div className="flex flex-col items-center self-stretch justify-center px-4">
          <div className="w-px bg-border-light flex-1" />
        </div>

        {/* 20% bar */}
        <div className="flex flex-col items-center">
          <span className="text-5xl font-bold text-[#22c55e] mb-3">20%</span>
          <div className="relative" style={{ width: `${barW}px`, height: `${maxH * 0.25}px` }}>
            <div
              className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center bg-[#22c55e]"
            >
              <p className="text-white text-lg font-semibold mb-1">Complex care</p>
              <div className="text-white/80 text-sm">
                <p>Dose changes, adverse events</p>
              </div>
            </div>
          </div>
          <div className="mt-4 bg-[#22c55e]/10 px-4 py-2 text-center" style={{ width: `${barW}px` }}>
            <p className="text-sm font-bold text-[#22c55e]">Your nurses focus here</p>
            <p className="text-xs text-text-secondary mt-0.5">With full context from Adhery</p>
          </div>
        </div>

        {/* Right callout */}
        <div className="flex-1 pl-6">
          <div className="bg-surface-warm border border-border-light p-6">
            <p className="text-base text-foreground font-semibold mb-3">The result</p>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-accent mt-0.5">&#9654;</span>
                <p className="text-sm text-text-secondary">Nurses handle fewer, higher-acuity patients</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-accent mt-0.5">&#9654;</span>
                <p className="text-sm text-text-secondary">Every patient gets proactive outreach</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-accent mt-0.5">&#9654;</span>
                <p className="text-sm text-text-secondary">Escalations arrive with full conversation history</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}

function PatientOfOneSlide() {
  return (
    <SlideLayout title="Patient of one: every conversation is different">
      <div className="max-w-5xl w-full">
        {/* Three patient columns */}
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              name: 'Patient A',
              profile: 'Week 3, first-time GLP-1, anxious',
              conversations: [
                { day: 'Day 5', msg: 'Proactive check-in on nausea', tone: 'Warm, reassuring' },
                { day: 'Day 12', msg: 'Responds to "is this normal?" text', tone: 'Clinical, specific' },
                { day: 'Day 21', msg: 'Celebrates 6 lb milestone', tone: 'Encouraging' },
              ],
              color: ACCENT,
            },
            {
              name: 'Patient B',
              profile: 'Month 2, experienced, overconfident',
              conversations: [
                { day: 'Day 35', msg: '"I feel great, do I still need this?"', tone: 'Educational' },
                { day: 'Day 48', msg: 'Rebound risk conversation', tone: 'Direct, evidence-based' },
                { day: 'Day 60', msg: 'Refill confirmed after hesitation', tone: 'Supportive' },
              ],
              color: ACCENT_LIGHT,
            },
            {
              name: 'Patient C',
              profile: 'Week 6, side effects, considering stopping',
              conversations: [
                { day: 'Day 14', msg: 'Severe nausea flagged', tone: 'Empathetic, urgent' },
                { day: 'Day 28', msg: 'Follow-up after dose adjustment', tone: 'Checking in' },
                { day: 'Day 42', msg: '"Feeling much better now"', tone: 'Reinforcing' },
              ],
              color: '#22c55e',
            },
          ].map((patient) => (
            <div key={patient.name} className="border border-border-light">
              <div className="px-4 py-3 border-b border-border-light" style={{ backgroundColor: `${patient.color}08` }}>
                <p className="text-sm font-bold text-foreground">{patient.name}</p>
                <p className="text-xs text-text-secondary mt-0.5">{patient.profile}</p>
              </div>
              <div className="p-4 space-y-4">
                {patient.conversations.map((c) => (
                  <div key={c.day}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold" style={{ color: patient.color }}>{c.day}</span>
                    </div>
                    <p className="text-sm text-foreground">{c.msg}</p>
                    <p className="text-[10px] text-text-muted mt-0.5 italic">Tone: {c.tone}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-sm text-text-secondary mt-6">
        Same platform. Three completely different journeys. Each grounded in{' '}
        <span className="font-semibold text-foreground">your MLR-approved scripts</span>.
      </p>
    </SlideLayout>
  );
}

function HowItWorksSlide() {
  const phases = [
    {
      title: 'Engage',
      desc: 'Proactive outreach timed to each patient\u2019s risk window',
      color: ACCENT,
    },
    {
      title: 'Triage',
      desc: 'Clinically grounded responses adapted to their history',
      color: ACCENT_LIGHT,
    },
    {
      title: 'Escalate',
      desc: 'Pre-populated summaries to your nurse team',
      color: '#22c55e',
    },
  ];

  return (
    <SlideLayout title="How Adhery works">
      <div className="max-w-4xl w-full">
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
      <div className="mt-10 max-w-4xl w-full grid grid-cols-3 gap-6">
        <div className="bg-surface-warm border border-border-light px-4 py-3">
          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Grounding</p>
          <p className="text-sm text-foreground">MLR-approved scripts only. Zero hallucination.</p>
        </div>
        <div className="bg-surface-warm border border-border-light px-4 py-3">
          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Safety</p>
          <p className="text-sm text-foreground">Never diagnoses, prescribes, or adjusts dosage.</p>
        </div>
        <div className="bg-surface-warm border border-border-light px-4 py-3">
          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Pharmacovigilance</p>
          <p className="text-sm text-foreground">Adverse events auto-detected and routed.</p>
        </div>
      </div>
    </SlideLayout>
  );
}

function PatientStorySlide() {
  const timeline = [
    {
      day: 'Day 3',
      event: 'Onboarding call: sets expectations, learns preferences',
      detail: 'Asks about schedule, concerns, preferred contact time',
      tag: 'Personalization',
    },
    {
      day: 'Day 8',
      event: '"I\u2019m really nauseous, is this normal?"',
      detail: 'Reassures based on their specific medication and dose',
      tag: 'Side effects',
    },
    {
      day: 'Day 22',
      event: '"I\u2019ve lost 8 lbs, maybe I can stop"',
      detail: 'Explains rebound risk using language calibrated to this patient',
      tag: 'Expectations',
    },
    {
      day: 'Day 45',
      event: 'Refill window approaching, no pharmacy confirmation',
      detail: 'Proactive call to resolve before the gap becomes a stop',
      tag: 'Refill',
    },
    {
      day: 'Day 67',
      event: '"Do I really need to keep doing this?"',
      detail: 'References their own progress and original goals',
      tag: 'Motivation',
    },
    {
      day: 'Day 90',
      event: 'Still on therapy. Still engaged.',
      detail: '',
      tag: '',
    },
  ];

  return (
    <div className="flex flex-col h-full px-16 pt-20 pb-16">
      <h2 className="font-serif text-4xl text-foreground mb-6 leading-tight">
        One patient, 90 days, five moments that matter
      </h2>
      <div className="max-w-4xl w-full">
        {timeline.map((t, i) => (
          <div key={t.day} className="flex items-start gap-6 relative">
            <div className="flex flex-col items-center">
              <div
                className="w-3.5 h-3.5 rounded-full z-10 flex-shrink-0"
                style={{ backgroundColor: i === timeline.length - 1 ? '#22c55e' : ACCENT }}
              />
              {i < timeline.length - 1 && (
                <div className="w-0.5 bg-border-light" style={{ height: '48px' }} />
              )}
            </div>
            <div className="flex-1 -mt-1 pb-4">
              <div className="flex items-baseline gap-3">
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
              {t.detail && (
                <p className="text-xs text-text-muted mt-1 ml-[68px]">{t.detail}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="text-sm text-text-secondary mt-2">
        Five conversations. Each one different. Each one <span className="font-semibold text-foreground">personalized to this patient</span>.
      </p>
    </div>
  );
}

function NurseAmplificationSlide() {
  return (
    <SlideLayout title="Your nurses, amplified">
      <div className="max-w-5xl w-full">
        <div className="grid grid-cols-2 gap-8">
          {/* Before */}
          <div className="border border-border-light p-6">
            <p className="text-xs uppercase tracking-wider text-[#dc2626] font-bold mb-4">Today</p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-[#dc2626] mt-0.5">&#10005;</span>
                <p className="text-sm text-text-secondary">Nurses triage routine questions alongside complex cases</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#dc2626] mt-0.5">&#10005;</span>
                <p className="text-sm text-text-secondary">Silent churners never reach support</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#dc2626] mt-0.5">&#10005;</span>
                <p className="text-sm text-text-secondary">Callbacks happen days later, after the patient has decided to stop</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#dc2626] mt-0.5">&#10005;</span>
                <p className="text-sm text-text-secondary">No context on patient history when the call connects</p>
              </div>
            </div>
          </div>

          {/* After */}
          <div className="border-2 border-accent p-6" style={{ backgroundColor: 'rgba(30, 58, 95, 0.04)' }}>
            <p className="text-xs uppercase tracking-wider text-accent font-bold mb-4">With Adhery</p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-[#22c55e] mt-0.5">&#10003;</span>
                <p className="text-sm text-foreground">Adhery handles 80% of patient interactions autonomously</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#22c55e] mt-0.5">&#10003;</span>
                <p className="text-sm text-foreground">Proactive outreach catches patients before they disengage</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#22c55e] mt-0.5">&#10003;</span>
                <p className="text-sm text-foreground">Real-time conversations, not next-Tuesday callbacks</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#22c55e] mt-0.5">&#10003;</span>
                <p className="text-sm text-foreground">Nurses get pre-populated summaries for every escalation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 max-w-3xl bg-surface-warm border border-border-light px-6 py-3">
        <p className="text-sm text-foreground">
          Your nurses become <span className="font-bold">specialists</span>, not call center agents.
        </p>
      </div>
    </SlideLayout>
  );
}

function BehavioralDataSlide() {
  const signals = [
    { signal: 'First response time', timing: 'Day 1-3', meaning: 'Engagement baseline', conf: '85%' },
    { signal: 'Voice call sentiment', timing: 'Every call', meaning: 'Emotional trajectory', conf: '82%' },
    { signal: 'Cost/insurance questions', timing: 'Weeks 2-4', meaning: 'Financial friction risk', conf: '88%' },
    { signal: 'Side effect mentions', timing: 'Weeks 1-6', meaning: 'Tolerance trajectory', conf: '80%' },
    { signal: 'Missed refill window', timing: 'Monthly', meaning: 'Highest churn signal', conf: '92%' },
    { signal: '"I feel better" / "lost enough"', timing: 'Weeks 4-12', meaning: 'Premature stop risk', conf: '90%' },
  ];

  return (
    <SlideLayout title="Every conversation generates signal">
      <div className="max-w-4xl w-full">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-foreground">
              <th className="py-3 pr-4 text-xs text-text-muted uppercase tracking-wider">Behavioral signal</th>
              <th className="py-3 px-4 text-xs text-text-muted uppercase tracking-wider">When</th>
              <th className="py-3 px-4 text-xs text-text-muted uppercase tracking-wider">What it means</th>
              <th className="py-3 px-4 text-xs text-text-muted uppercase tracking-wider text-right">Confidence</th>
            </tr>
          </thead>
          <tbody>
            {signals.map((s) => (
              <tr key={s.signal} className="border-b border-border-light">
                <td className="py-3 pr-4 text-sm text-foreground font-medium">{s.signal}</td>
                <td className="py-3 px-4 text-sm text-text-secondary">{s.timing}</td>
                <td className="py-3 px-4 text-sm text-text-secondary">{s.meaning}</td>
                <td className="py-3 px-4 text-sm font-bold text-accent text-right">{s.conf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 bg-surface-warm border border-border-light px-6 py-3 max-w-3xl">
        <p className="text-sm text-foreground">
          Traditional patient support is blind between calls. Adhery builds a{' '}
          <span className="font-bold">continuous behavioral profile</span> for every patient.
        </p>
      </div>
    </SlideLayout>
  );
}

function RetentionImpactSlide() {
  const baseline = 50;
  const adhery = 80;
  const maxH = 300;
  const barW = 160;

  return (
    <SlideLayout title="From 50% to 80%+ adherence">
      <div className="max-w-4xl w-full flex items-end gap-16">
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
          <p className="text-sm text-text-secondary mt-4">Industry average</p>
          <p className="text-xs text-text-muted">12-mo PDC</p>
        </div>

        {/* Adhery bar */}
        <div className="flex flex-col items-center">
          <span className="text-5xl font-bold text-[#22c55e] mb-3">{adhery}%+</span>
          <div className="relative" style={{ width: `${barW}px`, height: `${(adhery / 100) * maxH}px` }}>
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{
                height: `${(baseline / 100) * maxH}px`,
                backgroundColor: '#e2e8f0',
              }}
            />
            <div
              className="absolute left-0 right-0 flex items-center justify-center text-white text-sm font-bold"
              style={{
                bottom: `${(baseline / 100) * maxH}px`,
                height: `${((adhery - baseline) / 100) * maxH}px`,
                backgroundColor: '#22c55e',
              }}
            >
              +30pp
            </div>
          </div>
          <p className="text-sm font-semibold text-foreground mt-4">With Adhery</p>
          <p className="text-xs text-text-muted">12-mo PDC</p>
        </div>

        {/* Right callout */}
        <div className="flex-1 space-y-4">
          <div className="bg-surface-warm border border-border-light p-5">
            <p className="text-xs text-text-muted mb-1">Per 10,000 patients</p>
            <p className="text-2xl font-bold text-[#22c55e]">+3,000</p>
            <p className="text-sm text-text-secondary">additional patients retained on therapy</p>
          </div>
          <div className="bg-surface-warm border border-border-light p-5">
            <p className="text-xs text-text-muted mb-1">Evidence base</p>
            <p className="text-sm text-foreground">3.56x boost from AI voice (Taitel 2020), SMD 0.89 combined channels (Palmer 2024)</p>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}

function IntegrationSlide() {
  return (
    <SlideLayout title="Fits into your existing infrastructure">
      <div className="max-w-5xl w-full">
        <div className="grid grid-cols-3 gap-6">
          {/* Inbound */}
          <div className="border border-border-light">
            <div className="px-5 py-3 border-b border-border-light bg-surface-warm">
              <p className="text-xs text-text-muted uppercase tracking-wider">Adhery reads from</p>
            </div>
            <div className="p-5 space-y-4">
              {[
                { system: 'Salesforce Health Cloud', data: 'Patient roster, demographics, care plans' },
                { system: 'Veeva Vault PromoMats', data: 'MLR-approved scripts, guardrails' },
                { system: 'Veeva Vault Safety', data: 'AE definitions, severity coding' },
              ].map((s) => (
                <div key={s.system}>
                  <p className="text-sm font-semibold text-foreground">{s.system}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{s.data}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Center: Adhery */}
          <div className="border-2 border-accent flex flex-col" style={{ backgroundColor: 'rgba(30, 58, 95, 0.04)' }}>
            <div className="px-5 py-3 border-b border-accent/20 bg-accent">
              <p className="text-xs text-white uppercase tracking-wider font-bold">Adhery</p>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-center space-y-3">
              {[
                'Personalized voice conversations',
                'SMS triage for quick questions',
                'Behavioral signal detection',
                'Adverse event flagging',
                'Real-time escalation routing',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="text-accent text-xs">&#9654;</span>
                  <p className="text-sm text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Outbound */}
          <div className="border border-border-light">
            <div className="px-5 py-3 border-b border-border-light bg-surface-warm">
              <p className="text-xs text-text-muted uppercase tracking-wider">Adhery writes back</p>
            </div>
            <div className="p-5 space-y-4">
              {[
                { system: 'Salesforce Health Cloud', data: 'Call outcomes, PDC scores, risk flags' },
                { system: 'Veeva Vault Safety', data: 'Auto-populated AE reports, MedWatch' },
                { system: 'Your Dashboard', data: 'Retention metrics, sentiment, alerts' },
              ].map((s) => (
                <div key={s.system}>
                  <p className="text-sm font-semibold text-foreground">{s.system}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{s.data}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-text-secondary mt-6">
        Standard OAuth 2.0 + REST APIs. No custom middleware. Every team keeps their existing tools.
      </p>
    </SlideLayout>
  );
}

function GoLiveSlide() {
  return (
    <SlideLayout title="Go live in 4 weeks">
      <p className="text-lg text-text-secondary mb-10">
        Start with one therapy area. 500 patients. Measure in 30 days.
      </p>
      <div className="max-w-3xl w-full space-y-4">
        {[
          { week: 'Wk 1', task: 'Integration mapping + MLR script ingestion' },
          { week: 'Wk 2', task: 'Conversation design + brand voice calibration' },
          { week: 'Wk 3', task: 'Pilot cohort selection + nurse escalation workflow' },
          { week: 'Wk 4', task: 'Go live + daily check-ins with your team' },
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
          After 30 days: patient-level retention data, conversation analytics, escalation reports.
        </p>
      </div>
    </SlideLayout>
  );
}

function CTASlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-16">
      <h2 className="font-serif text-5xl text-foreground mb-10 leading-tight max-w-4xl">
        Which 500 patients should get a personalized journey first?
      </h2>
      <div className="max-w-2xl space-y-4 text-left">
        {[
          'Pick your highest-churn therapy area',
          'We configure to your MLR-approved scripts',
          '30 days to patient-level retention data',
          'Your nurses get full context on every escalation',
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

// ─── Slides Array ───
const slides = [
  TitleSlide,             // 1
  ScaleProblemSlide,      // 2
  EightyTwentySlide,      // 3
  PatientOfOneSlide,      // 4
  HowItWorksSlide,        // 5
  PatientStorySlide,      // 6
  NurseAmplificationSlide,// 7
  BehavioralDataSlide,    // 8
  RetentionImpactSlide,   // 9
  IntegrationSlide,       // 10
  GoLiveSlide,            // 11
  CTASlide,               // 12
];

// ─── Main Page ───
export default function PharmaPage() {
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
          <span className="text-xs text-text-muted">adhery.com</span>
        </div>
      </div>
    </div>
  );
}
