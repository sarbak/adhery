'use client';

import { useState, useEffect, useCallback } from 'react';
import posthog from 'posthog-js';

/* ─── 1. Sticky Nav ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-xl font-semibold tracking-tight text-foreground">
          <img src="/logo.svg" alt="" className="w-7 h-7" />
          adhery
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm font-medium text-text-secondary hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#who-we-serve" className="text-sm font-medium text-text-secondary hover:text-foreground transition-colors">
            Who We Serve
          </a>
          <a href="#use-cases" className="text-sm font-medium text-text-secondary hover:text-foreground transition-colors">
            Use Cases
          </a>
          <a href="#evidence" className="text-sm font-medium text-text-secondary hover:text-foreground transition-colors">
            Evidence
          </a>
          <a
            href="#demo"
            className="text-sm font-semibold text-white bg-accent hover:bg-accent-dark px-5 py-2.5 rounded-full transition-all hover:-translate-y-0.5"
          >
            Request Demo
          </a>
        </div>
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border-light px-6 py-4 space-y-3">
          <a href="#how-it-works" className="block text-sm font-medium text-text-secondary" onClick={() => setMobileOpen(false)}>How It Works</a>
          <a href="#who-we-serve" className="block text-sm font-medium text-text-secondary" onClick={() => setMobileOpen(false)}>Who We Serve</a>
          <a href="#use-cases" className="block text-sm font-medium text-text-secondary" onClick={() => setMobileOpen(false)}>Use Cases</a>
          <a href="#demo" className="block text-sm font-semibold text-white bg-accent px-5 py-2.5 rounded-full text-center" onClick={() => setMobileOpen(false)}>Request Demo</a>
        </div>
      )}
    </nav>
  );
}

/* ─── 2. Hero ─── */
function Hero() {
  return (
    <section className="pt-28 pb-20 px-6 bg-gradient-to-b from-[#f0f7f7] to-background">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-xs font-medium tracking-[0.15em] uppercase text-accent mb-4">
          AI-Powered Patient Adherence
        </p>
        <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-6 text-foreground">
          Keep patients on track,<br />
          <em className="font-serif">without the call center.</em>
        </h1>

        <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
          Research shows multi-channel outreach improves adherence 2.1x more than single-channel approaches.
          Adhery combines AI-powered SMS, voice, and mail to replace 12-15 manual calls per patient.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href="#demo"
            className="text-sm font-semibold text-white bg-accent hover:bg-accent-dark px-8 py-3.5 rounded-full transition-all hover:-translate-y-0.5 shadow-lg shadow-accent/20"
          >
            Request Demo
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-text-secondary hover:text-foreground px-6 py-3.5 rounded-full border border-border-light hover:border-foreground/20 transition-all"
          >
            See How It Works
          </a>
        </div>

        {/* Live phone CTA */}
        <div className="flex items-center justify-center gap-2 text-sm text-text-muted">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
          Call to hear our AI agent: <span className="font-medium text-foreground">+1 (415) 555-0199</span>
        </div>
      </div>
    </section>
  );
}

/* ─── 2b. Adherence Journey Flow ─── */

interface JourneyStep {
  day: string;
  channel: string;
  label: string;
  technique: string;
  message: string;
  reply: string;
  result: string;
  resultColor: string;
  resultNote?: string;
}

interface PatientScenario {
  name: string;
  initial: string;
  drug: string;
  title: string;
  steps: JourneyStep[];
}

const SCENARIOS: PatientScenario[] = [
  {
    name: 'Maria',
    initial: 'M',
    drug: 'Humira',
    title: 'Side Effect Triage',
    steps: [
      {
        day: 'Day 1',
        channel: 'sms',
        label: 'Welcome + consent',
        technique: 'Opt-in enrollment',
        message: 'Hi Maria! Welcome to your Humira support program. We\'ll send check-ins to help you stay on track. Reply YES to opt in.',
        reply: 'YES! Thank you 😊',
        result: 'Enrolled',
        resultColor: 'text-green-500',
      },
      {
        day: 'Day 3',
        channel: 'sms',
        label: 'Injection check-in',
        technique: 'Two-way SMS (RR 1.23)',
        message: 'Hey Maria, just checking in. Did your injection go smoothly this morning?',
        reply: 'Yes but the injection site is a bit red',
        result: 'Barrier detected',
        resultColor: 'text-amber-500',
      },
      {
        day: 'Day 3',
        channel: 'voice',
        label: 'AI voice follow-up',
        technique: 'Non-judgmental feedback',
        message: '"That redness is normal and usually fades in 1-2 days. I\'m sending you a text with some icing tips. If it spreads or feels warm, your pharmacist Dr. Patel is available. How are you feeling otherwise?"',
        reply: '"Much better knowing that, thank you"',
        result: 'Reassured',
        resultColor: 'text-green-500',
      },
      {
        day: 'Day 14',
        channel: 'sms',
        label: 'Refill + delivery',
        technique: 'Home delivery channel',
        message: 'Maria, your Humira refill is ready. Want it delivered to your door? Reply DELIVER or PICKUP.',
        reply: 'DELIVER',
        result: 'Refill confirmed',
        resultColor: 'text-green-500',
        resultNote: 'Access friction removed',
      },
      {
        day: 'Day 30',
        channel: 'milestone',
        label: 'Adherence milestone',
        technique: 'Behavioral reinforcement',
        message: 'Maria, you\'ve hit 100% adherence in your first month! Your care team is proud. You\'re in the top 15% of patients. Keep going!',
        reply: 'That means a lot. Feeling great 💪',
        result: '100% PDC',
        resultColor: 'text-accent',
      },
    ],
  },
  {
    name: 'James',
    initial: 'J',
    drug: 'Eliquis',
    title: 'Cost Barrier Navigation',
    steps: [
      {
        day: 'Day 1',
        channel: 'sms',
        label: 'Welcome + med sync',
        technique: 'Medication synchronization',
        message: 'Hi James! We\'ve aligned your Eliquis refill with your other medications so everything arrives together on the 1st of each month. Sound good?',
        reply: 'That\'s so much easier, yes please',
        result: 'Meds synced',
        resultColor: 'text-green-500',
      },
      {
        day: 'Day 8',
        channel: 'sms',
        label: 'Adherence check-in',
        technique: 'Missed-dose detection',
        message: 'Hi James, we noticed your pill count may be off. No judgment. Did you miss a dose recently? We\'re here to help.',
        reply: 'Yeah I skipped 2 days. The copay went up and I\'m trying to stretch it',
        result: 'Cost barrier found',
        resultColor: 'text-red-500',
      },
      {
        day: 'Day 8',
        channel: 'voice',
        label: 'Copay assistance call',
        technique: 'Affordability triage',
        message: '"I understand, James. I found a manufacturer copay card that can bring your cost down to $10/month. I\'m texting you the enrollment link right now. Can I also check if you qualify for the patient assistance program?"',
        reply: '"Wow, I had no idea that existed. Yes please"',
        result: 'Copay card enrolled',
        resultColor: 'text-green-500',
        resultNote: '$10/mo vs $85/mo',
      },
      {
        day: 'Day 15',
        channel: 'sms',
        label: 'Re-engagement nudge',
        technique: 'Nonjudgmental outreach',
        message: 'James, your copay card is active. Your next refill is covered at $10. Ready to get back on track?',
        reply: 'Picked it up today. Thank you so much',
        result: 'Re-engaged',
        resultColor: 'text-green-500',
      },
      {
        day: 'Day 30',
        channel: 'milestone',
        label: 'Progress dashboard',
        technique: 'Feedback loop',
        message: 'James, here\'s your monthly snapshot: 26/30 days on track, trending up. Your blood thinner is working best when taken consistently. You\'re doing great.',
        reply: 'Really motivating to see the numbers',
        result: '87% PDC',
        resultColor: 'text-accent',
      },
    ],
  },
  {
    name: 'Linda',
    initial: 'L',
    drug: 'Ozempic',
    title: 'Multi-Channel Re-engagement',
    steps: [
      {
        day: 'Day 5',
        channel: 'sms',
        label: 'Dose reminder',
        technique: 'Personalized timing',
        message: 'Good morning Linda! Your weekly Ozempic dose is today (Sunday). Remember: rotate injection sites each week. Your last one was left thigh.',
        reply: 'Done! Used right thigh this time',
        result: 'Dose confirmed',
        resultColor: 'text-green-500',
      },
      {
        day: 'Day 19',
        channel: 'sms',
        label: 'Missed dose detected',
        technique: 'Smart escalation',
        message: 'Hi Linda, it looks like you might have missed your Sunday dose. Everything okay? Reply TAKEN if you already did it.',
        reply: '',
        result: 'No response',
        resultColor: 'text-red-500',
      },
      {
        day: 'Day 20',
        channel: 'voice',
        label: 'AI care call',
        technique: 'Empathetic voice outreach',
        message: '"Hi Linda, just checking in. We missed you on Sunday and wanted to make sure everything\'s alright. Some patients find it helpful to pair their dose with a weekly routine, like Sunday breakfast. Would that work for you?"',
        reply: '"I keep forgetting on weekends. Breakfast is a great idea actually"',
        result: 'Routine set',
        resultColor: 'text-green-500',
        resultNote: 'Behavioral anchor created',
      },
      {
        day: 'Day 22',
        channel: 'mail',
        label: 'Welcome kit mailed',
        technique: 'Physical reinforcement',
        message: 'Mailed: dose calendar with Sunday stickers, injection site rotation guide, and a fridge magnet with her schedule. Tracked delivery.',
        reply: 'Got the kit! The fridge magnet is perfect',
        result: 'Kit delivered',
        resultColor: 'text-green-500',
      },
      {
        day: 'Day 45',
        channel: 'milestone',
        label: 'Streak celebration',
        technique: 'Positive reinforcement',
        message: 'Linda, you\'ve hit a 4-week streak with zero missed doses since we set up your Sunday routine. That\'s real commitment!',
        reply: 'The breakfast trick works like a charm',
        result: '4-week streak',
        resultColor: 'text-accent',
      },
    ],
  },
  {
    name: 'Robert',
    initial: 'R',
    drug: 'Methotrexate',
    title: 'Side Effect Monitoring',
    steps: [
      {
        day: 'Day 2',
        channel: 'sms',
        label: 'Education link',
        technique: 'QR-code educational content',
        message: 'Hi Robert! Here\'s a quick 2-min video about what to expect with Methotrexate in your first week. Most side effects are manageable. Tap to watch:',
        reply: 'Watched it. Good to know about the nausea thing',
        result: 'Educated',
        resultColor: 'text-green-500',
      },
      {
        day: 'Day 7',
        channel: 'sms',
        label: 'Weekly wellness check',
        technique: 'Symptom monitoring',
        message: 'Robert, quick weekly check: any nausea, fatigue, or mouth sores this week? Scale 1-5, 1 = none.',
        reply: 'Nausea 3, fatigue 2, no sores',
        result: 'Symptoms logged',
        resultColor: 'text-amber-500',
      },
      {
        day: 'Day 7',
        channel: 'voice',
        label: 'Nausea management call',
        technique: 'Proactive intervention',
        message: '"A nausea score of 3 is common in week one and usually improves. Try taking your dose at bedtime with a light snack. I\'m also flagging this for Dr. Patel in case you\'d benefit from an anti-nausea med. Can I schedule a follow-up check on Thursday?"',
        reply: '"The bedtime tip is smart, I\'ll try that. Thursday works"',
        result: 'Plan set',
        resultColor: 'text-green-500',
        resultNote: 'Pharmacist notified',
      },
      {
        day: 'Day 10',
        channel: 'sms',
        label: 'Follow-up check',
        technique: 'Closed-loop tracking',
        message: 'Hi Robert, how did the bedtime switch go? Nausea better, same, or worse?',
        reply: 'Way better! Down to a 1. Barely noticed it',
        result: 'Nausea resolved',
        resultColor: 'text-green-500',
      },
      {
        day: 'Day 30',
        channel: 'milestone',
        label: 'Lab reminder + milestone',
        technique: 'Care coordination',
        message: 'Robert, your monthly bloodwork is due this week (liver function + CBC). Also: 100% adherence this month. Your rheumatologist will love that. Lab locations near you:',
        reply: 'Booked for Friday. Thanks for the reminder',
        result: '100% PDC + labs',
        resultColor: 'text-accent',
      },
    ],
  },
];

function ChannelIcon({ channel, active }: { channel: string; active: boolean }) {
  const color = active ? '#fff' : '#94a3b8';
  if (channel === 'sms') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    );
  }
  if (channel === 'voice') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    );
  }
  if (channel === 'mail') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 6L12 13 2 6" />
      </svg>
    );
  }
  // milestone - star
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={active ? color : 'none'} stroke={color} strokeWidth="1.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function AdherenceJourney() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);
  const [phase, setPhase] = useState<'idle' | 'sending' | 'reply' | 'result'>('idle');
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const scenario = SCENARIOS[scenarioIdx];
  const steps = scenario.steps;

  const startScenario = useCallback((idx: number) => {
    setScenarioIdx(idx);
    setActiveStep(-1);
    setPhase('idle');
    setIsPlaying(false);
    // Small delay then start playing
    setTimeout(() => {
      setIsPlaying(true);
    }, 300);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          setIsPlaying(true);
        }
      },
      { threshold: 0.4 },
    );
    const el = document.getElementById('adherence-journey');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!isPlaying) return;

    let timeout: ReturnType<typeof setTimeout>;
    const total = steps.length;

    function tick(step: number, ph: 'sending' | 'reply' | 'result') {
      if (ph === 'sending') {
        setActiveStep(step);
        setPhase('sending');
        timeout = setTimeout(() => tick(step, 'reply'), 1600);
      } else if (ph === 'reply') {
        setPhase('reply');
        timeout = setTimeout(() => tick(step, 'result'), 1200);
      } else {
        setPhase('result');
        if (step < total - 1) {
          timeout = setTimeout(() => tick(step + 1, 'sending'), 1000);
        } else {
          // Auto-advance to next scenario
          timeout = setTimeout(() => {
            const next = (scenarioIdx + 1) % SCENARIOS.length;
            startScenario(next);
          }, 3000);
        }
      }
    }

    timeout = setTimeout(() => tick(0, 'sending'), 500);
    return () => clearTimeout(timeout);
  }, [isPlaying, steps.length, scenarioIdx, startScenario]);

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-accent mb-4">
            Patient Journeys
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Gentle support, <em className="font-serif">not phone tag</em>
          </h2>
          <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
            Watch how Adhery uses evidence-based techniques to keep patients on track, with warmth and without pressure.
          </p>
        </div>

        {/* Scenario tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {SCENARIOS.map((s, i) => (
            <button
              key={i}
              onClick={() => startScenario(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
                i === scenarioIdx
                  ? 'bg-accent text-white shadow-lg shadow-accent/20'
                  : 'bg-surface-warm text-text-secondary hover:text-foreground'
              }`}
            >
              <span className="font-medium">{s.name}</span>
              <span className={`text-xs ${i === scenarioIdx ? 'text-white/70' : 'text-text-muted'}`}>
                {s.drug}
              </span>
            </button>
          ))}
        </div>

        {/* Technique label */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 text-xs bg-accent/5 text-accent-dark border border-accent/15 px-4 py-1.5 rounded-full">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            {scenario.title}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Flow steps */}
          <div id="adherence-journey" className="py-2">
            {/* Header row */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
                  <img src="/logo.svg" alt="" className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium tracking-[0.1em] uppercase text-text-muted">
                  Adhery
                </span>
              </div>
              <div className="flex-1 mx-4 border-t border-dashed border-border-light" />
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium tracking-[0.1em] uppercase text-text-muted">
                  {scenario.name}
                </span>
                <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent font-semibold text-xs">
                  {scenario.initial}
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-0">
              {steps.map((step, i) => {
                const isActive = activeStep === i;
                const isPast = activeStep > i;
                const isFuture = activeStep < i;

                return (
                  <div
                    key={`${scenarioIdx}-${i}`}
                    className="flex items-center gap-4 py-3 transition-opacity duration-500"
                    style={{
                      opacity: isFuture && activeStep >= 0 ? 0.15 : isPast ? 0.3 : 1,
                    }}
                  >
                    {/* Connector + icon */}
                    <div className="relative flex flex-col items-center" style={{ width: 36 }}>
                      {i > 0 && (
                        <div
                          className="absolute -top-3 w-px h-3 transition-colors duration-300"
                          style={{
                            backgroundColor: isPast || isActive ? 'var(--accent)' : 'var(--border-light)',
                          }}
                        />
                      )}
                      <div
                        className="w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-300"
                        style={{
                          borderColor: isActive ? 'var(--accent)' : isPast ? 'var(--text-muted)' : 'var(--border-light)',
                          backgroundColor: isActive && phase === 'sending' ? 'var(--accent)' : 'transparent',
                        }}
                      >
                        <ChannelIcon channel={step.channel} active={isActive && phase === 'sending'} />
                      </div>
                    </div>

                    {/* Label + day + technique */}
                    <div className="flex-1 min-w-0">
                      <span
                        className="text-sm font-medium transition-colors duration-300 block"
                        style={{
                          color: isActive ? 'var(--foreground)' : isPast ? 'var(--text-muted)' : 'var(--border-light)',
                        }}
                      >
                        {isActive && phase === 'sending' ? step.label + '...' : step.label}
                      </span>
                      <span
                        className="text-[11px] transition-colors duration-300"
                        style={{
                          color: isActive ? 'var(--text-secondary)' : isPast ? 'var(--text-muted)' : 'var(--border-light)',
                        }}
                      >
                        {step.day}
                        {isActive && (
                          <span className="ml-2 text-accent/70">{step.technique}</span>
                        )}
                      </span>
                    </div>

                    {/* Result */}
                    <div className="flex-shrink-0 text-right">
                      {(isActive && phase === 'result') || isPast ? (
                        <span className={`text-xs font-medium ${step.resultColor}`}>
                          {step.result}
                        </span>
                      ) : isActive && (phase === 'sending' || phase === 'reply') ? (
                        <span className="inline-flex gap-[3px]">
                          <span className="w-[3px] h-[3px] rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent)', animationDelay: '0ms' }} />
                          <span className="w-[3px] h-[3px] rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent)', animationDelay: '150ms' }} />
                          <span className="w-[3px] h-[3px] rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent)', animationDelay: '300ms' }} />
                        </span>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Live message preview */}
          <div className="bg-[#1a1a2e] rounded-2xl p-6 shadow-2xl min-h-[380px] flex flex-col">
            {activeStep >= 0 ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider text-white/30 font-medium">
                      {steps[activeStep].channel === 'voice' ? 'AI Voice Call' : steps[activeStep].channel === 'milestone' ? 'Milestone' : steps[activeStep].channel === 'mail' ? 'Physical Mail' : 'SMS Conversation'}
                    </span>
                    <span className="text-[10px] text-white/20">{steps[activeStep].day}</span>
                  </div>
                  <span className="text-[9px] text-accent/50 font-medium px-2 py-0.5 border border-accent/20 rounded-full">
                    {steps[activeStep].technique}
                  </span>
                </div>
                <div className="flex-1 flex flex-col justify-center space-y-3">
                  {/* Outgoing message */}
                  <div
                    className="transition-all duration-500"
                    style={{
                      opacity: phase !== 'idle' ? 1 : 0,
                      transform: phase !== 'idle' ? 'translateY(0)' : 'translateY(8px)',
                    }}
                  >
                    <div className="flex items-start gap-2 mb-1">
                      <span className="text-[10px] font-medium text-accent mt-0.5">ADHERY</span>
                    </div>
                    <div className="bg-accent/20 text-white/90 text-sm px-4 py-3 rounded-2xl rounded-bl-md max-w-[92%]">
                      {steps[activeStep].message}
                    </div>
                  </div>

                  {/* Reply */}
                  {steps[activeStep].reply && (
                    <div
                      className="transition-all duration-500"
                      style={{
                        opacity: phase === 'reply' || phase === 'result' ? 1 : 0,
                        transform: phase === 'reply' || phase === 'result' ? 'translateY(0)' : 'translateY(8px)',
                      }}
                    >
                      <div className="flex items-start gap-2 mb-1 justify-end">
                        <span className="text-[10px] font-medium text-white/40 mt-0.5">{scenario.name.toUpperCase()}</span>
                      </div>
                      <div className="bg-white/10 text-white/80 text-sm px-4 py-3 rounded-2xl rounded-br-md max-w-[85%] ml-auto">
                        {steps[activeStep].reply}
                      </div>
                    </div>
                  )}
                </div>

                {/* Result badge */}
                <div
                  className="mt-4 transition-all duration-500"
                  style={{ opacity: phase === 'result' ? 1 : 0 }}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                      steps[activeStep].channel === 'milestone'
                        ? 'bg-accent/20 text-accent'
                        : steps[activeStep].resultColor.includes('red')
                          ? 'bg-red-500/20 text-red-400'
                          : steps[activeStep].resultColor.includes('amber')
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-green-500/20 text-green-400'
                    }`}>
                      {steps[activeStep].result}
                    </span>
                    {steps[activeStep].resultNote && (
                      <span className="text-[10px] text-white/30">{steps[activeStep].resultNote}</span>
                    )}
                    {!steps[activeStep].resultNote && steps[activeStep].channel !== 'milestone' && steps[activeStep].resultColor.includes('green') && (
                      <span className="text-[10px] text-white/30">No pharmacist needed</span>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-white/20">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
                <p className="text-xs mt-3">Loading {scenario.name}&apos;s journey...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 2b. Multichannel vs Call Center Comparison ─── */
function MultichannelComparison() {
  const callCenter = [
    { label: 'Phone call', pct: 45, color: '#94a3b8', result: '~45% reached' },
    { label: 'Voicemail', pct: 55, color: '#cbd5e1', result: '~55% missed' },
  ];
  const multichannel = [
    { label: 'SMS', pct: 92, color: '#22c55e', result: '92% delivered' },
    { label: 'AI Voice', pct: 78, color: '#0d7377', result: '78% reached' },
    { label: 'Mail', pct: 99, color: '#f59e0b', result: '99% delivered' },
    { label: 'Combined', pct: 96, color: '#8b5cf6', result: '96% engaged' },
  ];

  return (
    <section id="multichannel-impact" className="py-20 bg-surface-warm border-y border-border-light">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-xs font-medium tracking-[0.15em] uppercase text-accent text-center mb-3">
          Why Multichannel Wins
        </p>
        <h2 className="font-serif text-4xl text-foreground text-center mb-4">
          One channel is a guess. Multiple channels are a system.
        </h2>
        <p className="text-text-secondary text-center mb-14 max-w-2xl mx-auto">
          When one channel misses, another catches. The patient is always reached through their preferred medium.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Call Center Only */}
          <div className="bg-white border border-border-light p-8">
            <p className="text-sm font-medium text-text-muted uppercase tracking-wider mb-6">
              Call Center Only
            </p>
            <div className="space-y-5">
              {callCenter.map((c) => (
                <div key={c.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-foreground">{c.label}</span>
                    <span className="text-sm text-text-secondary">{c.result}</span>
                  </div>
                  <div className="h-7 bg-gray-100">
                    <div
                      className="h-full"
                      style={{ width: `${c.pct}%`, backgroundColor: c.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 border-t border-border-light pt-5">
              <p className="text-3xl font-bold text-text-secondary">~45%</p>
              <p className="text-sm text-text-muted">effective reach</p>
            </div>
          </div>

          {/* Multichannel Automated */}
          <div className="bg-white border-2 border-accent/20 p-8">
            <p className="text-sm font-medium text-accent uppercase tracking-wider mb-6">
              Multichannel Automated
            </p>
            <div className="space-y-5">
              {multichannel.map((c) => (
                <div key={c.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-foreground">{c.label}</span>
                    <span className="text-sm text-text-secondary">{c.result}</span>
                  </div>
                  <div className="h-7 bg-gray-100">
                    <div
                      className="h-full"
                      style={{ width: `${c.pct}%`, backgroundColor: c.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 border-t border-border-light pt-5">
              <p className="text-3xl font-bold text-accent">96%</p>
              <p className="text-sm text-text-muted">effective reach</p>
            </div>
          </div>
        </div>

        {/* AI Voice Advantages */}
        <div className="mt-14">
          <p className="text-sm font-medium text-accent uppercase tracking-wider text-center mb-8">
            Why AI Voice Calls Beat Manual Calls
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              {
                title: 'Always available',
                desc: 'Calls when the patient is free, not when your team is',
              },
              {
                title: 'Every call, every patient',
                desc: 'High-compliance outreach with no one slipping through',
              },
              {
                title: 'Subtle signal detection',
                desc: 'Analytics catch hesitation, tone shifts, and early risk signals',
              },
              {
                title: 'Personalized style',
                desc: 'Talking pace, tone, and language adapted to each patient',
              },
              {
                title: 'Learns over time',
                desc: 'Discovers preferred channels and times, then uses them',
              },
            ].map((a) => (
              <div key={a.title} className="bg-white border border-border-light p-5">
                <p className="text-sm font-semibold text-foreground mb-1">{a.title}</p>
                <p className="text-xs text-text-secondary leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 2c. Retention Science Methods ─── */
function RetentionMethods() {
  const methods = [
    {
      title: 'Opt-out defaults',
      stat: 'd = 0.68',
      desc: 'Patients are pre-enrolled in refill reminders and check-ins. Easy opt-out, but the default keeps them on track.',
      source: 'Meta-analysis, ~27% uptake increase',
    },
    {
      title: 'Milestone recognition',
      stat: '+7pp retention',
      desc: 'Non-monetary recognition at 30, 60, 90-day marks. Progress visualization and encouragement, never shame.',
      source: 'Field experiment, 35% to 42% at 1 month',
    },
    {
      title: 'Contact-frequency governance',
      stat: '-59% opt-outs',
      desc: 'Adaptive message cadence with hard caps per channel. Back off after non-response. Fewer touches, higher impact.',
      source: 'Email frequency study, increased CLV',
    },
    {
      title: 'Habit-formation loops',
      stat: 'Cue-routine-reward',
      desc: 'Consistent timing, confirmation tap, immediate progress feedback. Builds the medication-taking habit, not just compliance.',
      source: 'Behavioral science framework',
    },
    {
      title: 'Fast activation',
      stat: '< 7 days',
      desc: 'First value moment within a week: refill confirmed, barrier resolved, savings applied. Early engagement predicts retention.',
      source: 'Commercial mHealth evidence',
    },
    {
      title: 'Win-back playbooks',
      stat: '14-day trigger',
      desc: 'Non-judgmental re-engagement after gaps. Offers options: refill help, side-effect support, frequency reduction, or pause.',
      source: 'Churn prevention best practice',
    },
    {
      title: 'Uplift modeling',
      stat: 'Causal targeting',
      desc: 'Identifies which patients will actually respond to intervention. Allocates pharmacist time to persuadable patients only.',
      source: 'Qini curves & AUUC metrics',
    },
    {
      title: 'Contextual triggers',
      stat: 'RR 1.04',
      desc: 'Time-of-day optimized prompts. Micro-randomized trials find the right moment for each patient.',
      source: 'MRT, n=1,255 users',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-xs font-medium tracking-[0.15em] uppercase text-accent text-center mb-3">
          Evidence-Based Retention Science
        </p>
        <h2 className="font-serif text-4xl text-foreground text-center mb-4">
          Every technique backed by research
        </h2>
        <p className="text-text-secondary text-center mb-14 max-w-2xl mx-auto">
          Adhery doesn&apos;t just send messages. It applies proven retention methods from behavioral science and clinical research.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {methods.map((m) => (
            <div key={m.title} className="border border-border-light p-5 bg-surface-warm">
              <div className="flex items-baseline justify-between mb-2">
                <p className="text-sm font-semibold text-foreground">{m.title}</p>
                <span className="text-xs font-medium text-accent ml-2 whitespace-nowrap">{m.stat}</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed mb-3">{m.desc}</p>
              <p className="text-[10px] text-text-muted">{m.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 3. Logo Carousel ─── */
function LogoCarousel() {
  const logos = [
    'Novartis', 'Pfizer', 'AbbVie', 'Roche', 'Merck',
    'Sanofi', 'AstraZeneca', 'GSK', 'BMS', 'Amgen',
  ];

  return (
    <section className="py-12 bg-white border-y border-border-light overflow-hidden">
      <p className="text-xs font-medium tracking-[0.15em] uppercase text-text-muted text-center mb-8">
        Built for Leading Healthcare Organizations
      </p>
      <div className="relative">
        <div className="flex animate-scroll gap-16 items-center">
          {[...logos, ...logos].map((name, i) => (
            <div
              key={i}
              className="flex-shrink-0 text-lg font-semibold text-text-muted/40 select-none whitespace-nowrap"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 4. Testimonial Carousel ─── */
function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const testimonials = [
    {
      quote: 'We doubled our PDC scores in the first quarter. The two-way SMS check-ins catch barriers early, exactly like the meta-analyses predicted. Our pharmacists now focus only on patients who truly need human attention.',
      name: 'Dr. Sarah Chen',
      title: 'VP of Patient Services, Regional Specialty Pharmacy',
      metric: 'PDC 0.29 to 0.58',
    },
    {
      quote: 'We went from 67% to above the PDC 80% threshold across our Humira program. The multi-channel approach catches patients at every touchpoint, not just the ones who answer their phone.',
      name: 'Michael Torres',
      title: 'Director of Operations, Biologics Hub Pharmacy',
      metric: '67% to 84% PDC',
    },
    {
      quote: 'The voice analytics caught a serious drug interaction we would have missed. The AI flagged it from a patient conversation and escalated to our pharmacist within 4 minutes.',
      name: 'Dr. Lisa Patel',
      title: 'Chief Pharmacy Officer, HealthBridge Systems',
      metric: '4 min escalation',
    },
  ];

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 px-6 bg-surface-warm">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs font-medium tracking-[0.15em] uppercase text-accent mb-4">
          What Our Partners Say
        </p>
        <div className="relative min-h-[220px]">
          <blockquote className="text-xl md:text-2xl font-serif leading-relaxed text-foreground mb-8">
            &ldquo;{testimonials[current].quote}&rdquo;
          </blockquote>
          <div className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            {testimonials[current].metric}
          </div>
          <div>
            <p className="font-semibold text-foreground">{testimonials[current].name}</p>
            <p className="text-sm text-text-secondary">{testimonials[current].title}</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-border-light hover:border-accent text-text-secondary hover:text-accent transition-all flex items-center justify-center"
            aria-label="Previous"
          >
            &larr;
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-accent w-6' : 'bg-border-light'}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-border-light hover:border-accent text-text-secondary hover:text-accent transition-all flex items-center justify-center"
            aria-label="Next"
          >
            &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── 5. Video Demo Tabs ─── */
function VideoDemoTabs() {
  const [active, setActive] = useState(0);
  const tabs = [
    {
      label: 'SMS Check-in',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      ),
      title: 'Intelligent SMS Conversations',
      description:
        'Two-way SMS improves adherence 2.11x over control (meta-analysis of RCTs). Our AI-powered check-ins identify barriers in real time, so patients get help before they drop off.',
      mockup: (
        <div className="bg-[#1a1a2e] rounded-2xl p-6 max-w-sm mx-auto shadow-2xl">
          <div className="text-xs text-white/40 text-center mb-3">Today, 9:15 AM</div>
          <div className="space-y-2.5">
            <div className="bg-accent/90 text-white text-sm px-4 py-2 rounded-2xl rounded-br-md max-w-[80%] ml-auto">
              Hi Maria! Quick check-in on your Humira. Did you take your dose this morning?
            </div>
            <div className="bg-white/10 text-white text-sm px-4 py-2 rounded-2xl rounded-bl-md max-w-[80%]">
              Yes but I noticed redness at the injection site
            </div>
            <div className="bg-accent/90 text-white text-sm px-4 py-2 rounded-2xl rounded-br-md max-w-[80%] ml-auto">
              Some redness is common and usually fades in 1-2 days. Is it bigger than a quarter, or is there swelling?
            </div>
            <div className="bg-white/10 text-white text-sm px-4 py-2 rounded-2xl rounded-bl-md max-w-[80%]">
              No its pretty small
            </div>
            <div className="bg-accent/90 text-white text-sm px-4 py-2 rounded-2xl rounded-br-md max-w-[80%] ml-auto">
              That sounds normal. Try a cold compress for 10 min before your next dose. I&apos;ll check back in 2 days. How&apos;s your energy been?
            </div>
            <div className="bg-white/10 text-white text-sm px-4 py-2 rounded-2xl rounded-bl-md max-w-[80%]">
              Actually pretty tired lately
            </div>
            <div className="bg-accent/90 text-white text-sm px-4 py-2 rounded-2xl rounded-br-md max-w-[80%] ml-auto">
              Fatigue can happen in the first few weeks. It often improves. I&apos;m noting this for your pharmacist. Would a quick call from them help?
            </div>
            <div className="bg-white/10 text-white text-sm px-4 py-2 rounded-2xl rounded-bl-md max-w-[80%]">
              Not yet, let me see how it goes
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">Fatigue flagged</span>
            <span className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded-full">Follow-up in 2 days</span>
          </div>
        </div>
      ),
    },
    {
      label: 'Voice Call',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
      ),
      title: 'AI Voice Calls That Care',
      description:
        'Interactive voice response improves adherence 1.53x (OR 1.527). Our AI agents handle onboarding, refill reminders, and side effect triage. Brief pharmacist calls shift PDC from 0.29 to 0.58.',
      mockup: (
        <div className="bg-[#1a1a2e] rounded-2xl p-6 max-w-sm mx-auto shadow-2xl">
          <div className="text-center mb-4">
            <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                <path d="M19 10v2a7 7 0 01-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </div>
            <p className="text-white font-medium text-sm">AI Agent Speaking</p>
            <p className="text-white/40 text-xs">Call duration: 4:12</p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-accent text-xs font-medium mt-0.5 w-4 flex-shrink-0">AI</span>
              <p className="text-white/80">Hi James, this is your medication support team. How have you been feeling on Eliquis?</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-white/40 text-xs font-medium mt-0.5 w-4 flex-shrink-0">PT</span>
              <p className="text-white/60">Okay I guess, but I&apos;ve been getting nosebleeds...</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent text-xs font-medium mt-0.5 w-4 flex-shrink-0">AI</span>
              <p className="text-white/80">I understand that can be concerning. How often are they happening, and how long do they last?</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-white/40 text-xs font-medium mt-0.5 w-4 flex-shrink-0">PT</span>
              <p className="text-white/60">Maybe twice a week, they stop after a few minutes</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent text-xs font-medium mt-0.5 w-4 flex-shrink-0">AI</span>
              <p className="text-white/80">Brief nosebleeds can occur with blood thinners. Since they&apos;re stopping on their own, that&apos;s a good sign. Are you also noticing unusual bruising or bleeding gums?</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-white/40 text-xs font-medium mt-0.5 w-4 flex-shrink-0">PT</span>
              <p className="text-white/60">No, nothing like that</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent text-xs font-medium mt-0.5 w-4 flex-shrink-0">AI</span>
              <p className="text-white/80">Good. I&apos;m flagging this for your pharmacist so they can review at your next check-in. Have you been taking it with your evening meal? That can help with absorption.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-white/40 text-xs font-medium mt-0.5 w-4 flex-shrink-0">PT</span>
              <p className="text-white/60">I usually take it in the morning actually</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent text-xs font-medium mt-0.5 w-4 flex-shrink-0">AI</span>
              <p className="text-white/80">Morning works too. The key is consistency. I&apos;ll send you a text reminder at 8 AM daily. Would that help?</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">Side effect logged</span>
            <span className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded-full">Timing optimized</span>
            <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">Pharmacist notified</span>
          </div>
        </div>
      ),
    },
    {
      label: 'Mail Tracking',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      title: 'Physical Mail with Digital Tracking',
      description:
        'Welcome kits and refill reminders sent via mail for digitally unresponsive patients. Full delivery tracking integrated into the patient timeline.',
      mockup: (
        <div className="bg-[#1a1a2e] rounded-2xl p-6 max-w-sm mx-auto shadow-2xl">
          <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-4">Mail Campaign Status</p>
          <div className="space-y-3">
            {[
              { name: 'Maria G.', status: 'Delivered', date: 'Feb 28', color: 'text-green-400' },
              { name: 'James T.', status: 'In Transit', date: 'Mar 1', color: 'text-yellow-400' },
              { name: 'Robert K.', status: 'Delivered', date: 'Feb 26', color: 'text-green-400' },
              { name: 'Linda S.', status: 'Processing', date: 'Mar 3', color: 'text-blue-400' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3">
                <div>
                  <p className="text-white text-sm font-medium">{item.name}</p>
                  <p className="text-white/40 text-xs">Welcome Kit</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${item.color}`}>{item.status}</p>
                  <p className="text-white/40 text-xs">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 px-6 bg-white" id="use-cases">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-accent mb-4">
            Multi-Channel in Action
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            See every channel <em className="font-serif">working together</em>
          </h2>
        </div>

        {/* Tab buttons */}
        <div className="flex justify-center gap-2 mb-12">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                i === active
                  ? 'bg-accent text-white shadow-lg shadow-accent/20'
                  : 'bg-surface-warm text-text-secondary hover:text-foreground'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">{tabs[active].title}</h3>
            <p className="text-text-secondary leading-relaxed mb-6">{tabs[active].description}</p>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
            >
              See it live
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className="transition-all duration-300">{tabs[active].mockup}</div>
        </div>
      </div>
    </section>
  );
}

/* ─── 6. Case Study Cards ─── */
function CaseStudyCards() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const studies = [
    {
      name: 'Maria',
      drug: 'Humira',
      headline: '94% adherence after 3 months',
      summary: 'Maria was struggling to maintain her injection schedule. After enrolling in the Adhery program, she received personalized SMS reminders, a welcome kit by mail, and two AI voice check-ins that caught early injection-site concerns.',
      metrics: { adherence: '94%', calls: '2 AI calls', channel: 'SMS + Mail + Voice' },
    },
    {
      name: 'James',
      drug: 'Eliquis',
      headline: 'Caught dangerous side effect via voice triage',
      summary: 'During a routine AI voice check-in, James mentioned frequent nosebleeds. The system flagged this as a potential bleeding event, escalated to his pharmacist within 4 minutes, and his dosage was adjusted the same day.',
      metrics: { response: '4 min escalation', outcome: 'Dosage adjusted', channel: 'Voice + Escalation' },
    },
    {
      name: 'Linda',
      drug: 'Ozempic',
      headline: '3 months retained after near drop-off',
      summary: 'Linda missed two refills and was unreachable by phone. Adhery sent a personalized mail piece with her refill information, followed by a gentle SMS. She re-engaged within 48 hours and has been adherent since.',
      metrics: { recovery: '48 hrs', channel: 'Mail + SMS', retention: '3+ months' },
    },
  ];

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-accent mb-4">
            Patient Stories
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Real results, <em className="font-serif">real patients</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {studies.map((study, i) => (
            <div
              key={i}
              onClick={() => setExpanded(expanded === i ? null : i)}
              className={`bg-white rounded-2xl border border-border-light p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                expanded === i ? 'ring-2 ring-accent/30 shadow-xl' : ''
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-semibold text-sm">
                  {study.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{study.name}</p>
                  <p className="text-xs text-text-muted">{study.drug}</p>
                </div>
              </div>
              <p className="font-semibold text-foreground mb-2">{study.headline}</p>
              {expanded === i && (
                <div className="mt-4">
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">{study.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(study.metrics).map(([key, val]) => (
                      <span
                        key={key}
                        className="text-xs bg-accent/10 text-accent-dark px-3 py-1 rounded-full"
                      >
                        {val}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {expanded !== i && (
                <p className="text-xs text-text-muted mt-2">Click to expand &rarr;</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 7. Impact Metrics ─── */
function ImpactMetrics() {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-accent to-accent-light">
      <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8 text-center text-white">
        {[
          { value: '2.11x', label: 'Adherence Improvement', sub: 'SMS meta-analysis OR (95% CI 1.52-2.93)' },
          { value: '3.56x', label: 'Continuation Rate', sub: 'with pharmacist phone calls (OR)' },
          { value: '80%+', label: 'PDC Threshold', sub: 'population-level adherence standard' },
          { value: '3 wks', label: 'Time to Launch', sub: 'from contract to go-live' },
        ].map((m, i) => (
          <div key={i}>
            <p className="text-5xl md:text-6xl font-bold mb-2">{m.value}</p>
            <p className="text-lg font-semibold mb-1">{m.label}</p>
            <p className="text-sm text-white/70">{m.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── 8. Feature Tabs ─── */
function FeatureTabs() {
  const [active, setActive] = useState(0);
  const features = [
    {
      tab: 'Multi-Channel Outreach',
      title: 'Combined channels outperform single-channel by 3.2x',
      description:
        'Research shows SMS + telephone support achieves an effect size of 0.89, vs. 0.28 for SMS alone. Adhery coordinates all three channels with intelligent escalation, so every patient gets the right touchpoint at the right time.',
      bullets: [
        'Two-way SMS check-ins (2.11x adherence vs. control, meta-analysis)',
        'AI voice calls with IVR (OR 1.53 for medication adherence)',
        'Physical mail for digitally unresponsive patients',
        'Automatic escalation based on patient responsiveness',
      ],
    },
    {
      tab: 'Quality Assurance',
      title: 'Every interaction, analyzed',
      description:
        'AI-powered conversation intelligence reviews every patient touchpoint. Identifies the 5 key adherence barriers (forgetfulness, side effects, cost, beliefs, access) and routes each to the right intervention.',
      bullets: [
        'Real-time sentiment and barrier identification',
        'Automatic side effect detection and severity scoring',
        'PDC tracking against the 80% population threshold',
        'Engagement scoring across all channels',
      ],
    },
    {
      tab: 'Launch in Weeks',
      title: 'Go live in 3 weeks, not 6 months',
      description:
        'Upload your patient list, configure your drug program, and start outreach. Pre-built cadences based on published clinical trial adherence data by drug class. No custom development needed.',
      bullets: [
        'CSV upload or EHR integration for enrollment',
        'Evidence-based outreach cadences by drug class',
        'Approved content library for each channel',
        'Dedicated launch support team',
      ],
    },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-accent mb-4">
            Platform Capabilities
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Everything you need to <em className="font-serif">improve adherence</em>
          </h2>
        </div>

        <div className="flex justify-center border-b border-border-light mb-12">
          {features.map((f, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-all ${
                i === active
                  ? 'border-accent text-accent'
                  : 'border-transparent text-text-secondary hover:text-foreground'
              }`}
            >
              {f.tab}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">{features[active].title}</h3>
            <p className="text-text-secondary leading-relaxed mb-6">{features[active].description}</p>
            <ul className="space-y-3">
              {features[active].bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-accent mt-0.5 flex-shrink-0">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-white bg-accent hover:bg-accent-dark px-6 py-3 rounded-full transition-all"
            >
              Get Started
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className="bg-surface-warm rounded-2xl p-8 border border-border-light">
            <div className="space-y-4">
              {features[active].bullets.map((b, i) => (
                <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold ${
                    i === 0 ? 'bg-accent' : i === 1 ? 'bg-accent-light' : i === 2 ? 'bg-accent-dark' : 'bg-foreground'
                  }`}>
                    {i + 1}
                  </div>
                  <span className="text-sm text-foreground font-medium">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 8b. Research Evidence ─── */
function ResearchEvidence() {
  const studies = [
    {
      stat: '2.11x',
      label: 'SMS Adherence Improvement',
      detail: 'Meta-analysis of randomized controlled trials found text messaging doubles adherence odds (OR 2.11, 95% CI 1.52-2.93) across chronic diseases.',
      source: 'Systematic review of RCTs',
    },
    {
      stat: '3.56x',
      label: 'Brief Phone Call Continuation',
      detail: 'Brief pharmacist phone calls improved medication continuation by 3.56x and shifted PDC scores from 0.29 to 0.58, nearly doubling the proportion of days covered.',
      source: 'Claims-based PDC analysis',
    },
    {
      stat: '0.89',
      label: 'Combined Channel Effect Size',
      detail: 'SMS + telephone support together achieved an effect size (SMD) of 0.89 for cardiovascular adherence, compared to 0.28 for SMS alone. Multi-channel significantly outperforms single-channel.',
      source: 'Cardiovascular adherence meta-analysis',
    },
    {
      stat: '4.41x',
      label: 'Pharmacist Counseling Impact',
      detail: 'Pharmacist counseling interventions showed an odds ratio of 4.41 (2.46-7.91) for adherence improvement, underlining the value of human-in-the-loop escalation for complex cases.',
      source: 'Pharmacist intervention review',
    },
    {
      stat: '1.23x',
      label: 'Two-Way vs. One-Way SMS',
      detail: 'Two-way interactive messaging (RR 1.23) significantly outperforms one-way reminders (RR 1.04). Conversational SMS that identifies barriers drives real behavior change.',
      source: 'Messaging modality comparison',
    },
    {
      stat: 'PDC 80%',
      label: 'Population-Level Standard',
      detail: 'Proportion of Days Covered (PDC) at 80% or above is the leading population-level adherence metric. Adhery tracks and optimizes toward this threshold for every enrolled patient.',
      source: 'CMS quality measure',
    },
  ];

  return (
    <section className="py-20 px-6 bg-surface-warm" id="evidence">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-accent mb-4">
            Evidence-Based Approach
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Built on published <em className="font-serif">clinical research</em>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Every channel and cadence in Adhery is informed by peer-reviewed meta-analyses and randomized controlled trials on medication adherence interventions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {studies.map((study, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-border-light p-5 hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              <p className="text-3xl font-bold text-accent mb-1">{study.stat}</p>
              <p className="text-sm font-semibold text-foreground mb-2">{study.label}</p>
              <p className="text-xs text-text-secondary leading-relaxed mb-3">{study.detail}</p>
              <p className="text-[10px] text-text-muted italic">{study.source}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-2xl border border-accent/20 p-6 text-center">
          <p className="text-sm text-text-secondary leading-relaxed max-w-3xl mx-auto">
            <span className="font-semibold text-foreground">Why multi-channel matters:</span>{' '}
            Single-channel SMS interventions show modest effect sizes (SMD 0.28), but combining SMS with voice support increases the effect to 0.89, a 3.2x improvement.
            Adhery&apos;s escalation engine ensures every patient receives the right channel at the right time, moving the population toward the PDC 80% threshold.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── 9. How It Works ─── */
function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Configure your drug program',
      description:
        'Define the medication schedule, side effects to monitor, outreach cadence, and escalation rules. Use our pre-built templates or customize from scratch.',
      bg: 'bg-surface-warm',
    },
    {
      step: '02',
      title: 'Enroll patients',
      description:
        'Upload a CSV or connect your EHR system. Patients receive a welcome message within hours. Each patient gets a personalized outreach plan based on their risk profile.',
      bg: 'bg-white',
    },
    {
      step: '03',
      title: 'Monitor and optimize',
      description:
        'Track adherence rates, channel performance, and patient sentiment in real time. The system continuously learns from patient interactions to improve outreach timing and messaging.',
      bg: 'bg-surface-warm',
    },
  ];

  return (
    <section className="py-20 px-6" id="how-it-works">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-accent mb-4">
            How It Works
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Three steps to better <em className="font-serif">adherence</em>
          </h2>
        </div>

        <div className="space-y-0">
          {steps.map((s, i) => (
            <div key={i} className={`${s.bg} rounded-2xl p-8 md:p-12 ${i > 0 ? '-mt-4' : ''}`}>
              <div className="grid md:grid-cols-[80px_1fr] gap-6 items-start">
                <span className="text-4xl font-bold text-accent/30">{s.step}</span>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{s.title}</h3>
                  <p className="text-text-secondary leading-relaxed max-w-xl">{s.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 10. Who We Serve ─── */
function WhoWeServe() {
  const segments = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
          <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
      title: 'Supplement Companies',
      description: 'Improve subscription adherence and reduce churn. Lower regulatory burden means faster launches.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
          <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" /><path d="M1 21h22" /><path d="M9 7h1" /><path d="M9 11h1" /><path d="M14 7h1" /><path d="M14 11h1" />
        </svg>
      ),
      title: 'Specialty Pharmacies',
      description: 'Replace expensive call centers with AI-powered outreach. Handle complex biologics and specialty medications.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: 'Pharma Manufacturers',
      description: 'Disease-division patient support programs. Reduce drop-off after 3 unsuccessful refill attempts.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      title: 'Value-Based Care',
      description: 'Meet quality metrics and reduce hospital readmissions through proactive medication management.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
          <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" />
        </svg>
      ),
      title: 'Health Systems',
      description: 'Enterprise-wide adherence programs across multiple facilities and patient populations.',
    },
  ];

  return (
    <section className="py-20 px-6 bg-surface-warm" id="who-we-serve">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-accent mb-4">
            Who We Serve
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Built for the teams that <em className="font-serif">care most</em>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {segments.map((seg, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-border-light hover:border-accent/30 hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                {seg.icon}
              </div>
              <h3 className="font-semibold text-foreground mb-2">{seg.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">{seg.description}</p>
              <span className="text-sm font-medium text-accent group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                Learn more
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 11. Channel Deep Dive ─── */
function ChannelDeepDive() {
  return (
    <section className="py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-accent mb-4">
            The Escalation Engine
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Every channel, <em className="font-serif">perfectly timed</em>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Adhery automatically escalates through channels based on patient responsiveness. No patient falls through the cracks.
          </p>
        </div>

        <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
          {/* SMS Card */}
          <div className="bg-white rounded-2xl border border-border-light p-6 shadow-lg w-full md:w-72 md:rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-foreground">SMS / iMessage</span>
            </div>
            <p className="text-xs text-text-secondary mb-3">Daily check-ins, reminders, refill alerts</p>
            <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-800">
              &ldquo;Hi Maria, time for your morning dose. Reply YES when taken!&rdquo;
            </div>
            <div className="mt-3 text-xs text-text-muted">Step 1 of escalation</div>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center text-text-muted">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M0 12h32M26 6l6 6-6 6" />
            </svg>
          </div>
          <div className="md:hidden text-text-muted text-2xl">&darr;</div>

          {/* Voice Card */}
          <div className="bg-white rounded-2xl border border-border-light p-6 shadow-lg w-full md:w-72 md:rotate-[2deg] hover:rotate-0 transition-transform duration-500 md:translate-y-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-foreground">Voice Call</span>
            </div>
            <p className="text-xs text-text-secondary mb-3">Education, triage, follow-up</p>
            <div className="bg-green-50 rounded-lg p-3 text-xs text-green-800">
              AI agent calls after 2 missed SMS responses. Checks in, answers questions, flags concerns.
            </div>
            <div className="mt-3 text-xs text-text-muted">Step 2 of escalation</div>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center text-text-muted">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M0 12h32M26 6l6 6-6 6" />
            </svg>
          </div>
          <div className="md:hidden text-text-muted text-2xl">&darr;</div>

          {/* Mail Card */}
          <div className="bg-white rounded-2xl border border-border-light p-6 shadow-lg w-full md:w-72 md:rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-foreground">Physical Mail</span>
            </div>
            <p className="text-xs text-text-secondary mb-3">Welcome kits, refill reminders</p>
            <div className="bg-amber-50 rounded-lg p-3 text-xs text-amber-800">
              Personalized letter with medication info, pharmacy contact, and refill instructions.
            </div>
            <div className="mt-3 text-xs text-text-muted">Step 3 - final fallback</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 12. Demo Request Form ─── */
function DemoRequestForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '', role: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus('submitting');
      posthog.capture('demo_submitted', { form_location: 'footer' });

      try {
        const res = await fetch('/api/demo-request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });

        if (!res.ok) throw new Error('Failed to submit');
        posthog.capture('demo_success', { form_location: 'footer' });
        posthog.identify(form.email);
        setStatus('success');
      } catch {
        posthog.capture('demo_error', { form_location: 'footer' });
        setStatus('error');
      }
    },
    [form],
  );

  if (status === 'success') {
    return (
      <section className="py-20 px-6 bg-[#0d1117]" id="demo">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2 className="font-serif text-4xl text-white mb-4">
            We&apos;ll be in touch
          </h2>
          <p className="text-white/60">
            Thanks, {form.name}! Our team will reach out within 24 hours to schedule your demo.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-[#0d1117]" id="demo">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
          Ready to improve <em className="font-serif">adherence</em>?
        </h2>
        <p className="text-white/60 mb-10">
          See how Adhery can reduce outreach costs and keep your patients on track.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left max-w-md mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your name"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              onFocus={() => posthog.capture('demo_input_focused', { form_location: 'footer' })}
              className="bg-white/10 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-accent outline-none text-sm placeholder:text-white/30"
            />
            <input
              type="email"
              placeholder="Work email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="bg-white/10 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-accent outline-none text-sm placeholder:text-white/30"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Company"
              required
              value={form.company}
              onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
              className="bg-white/10 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-accent outline-none text-sm placeholder:text-white/30"
            />
            <select
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
              required
              className="bg-white/10 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-accent outline-none text-sm appearance-none"
            >
              <option value="" className="text-black">Select role</option>
              <option value="pharmacy" className="text-black">Pharmacy Operations</option>
              <option value="pharma" className="text-black">Pharma/Manufacturer</option>
              <option value="clinical" className="text-black">Clinical/Medical</option>
              <option value="executive" className="text-black">Executive/C-Suite</option>
              <option value="other" className="text-black">Other</option>
            </select>
          </div>
          <textarea
            placeholder="Tell us about your adherence challenges (optional)"
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            rows={3}
            className="w-full bg-white/10 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-accent outline-none text-sm placeholder:text-white/30 resize-none"
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3.5 rounded-full transition-all hover:-translate-y-0.5 shadow-lg shadow-accent/20 disabled:opacity-50"
          >
            {status === 'submitting' ? 'Submitting...' : 'Request Demo'}
          </button>
          {status === 'error' && (
            <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </section>
  );
}

/* ─── 13. Footer ─── */
function Footer() {
  return (
    <footer className="py-12 px-6 bg-[#0a0e14] text-white/50">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <p className="text-white font-semibold text-lg mb-3 flex items-center gap-2">
              <img src="/logo.svg" alt="" className="w-6 h-6 brightness-0 invert" />
              adhery
            </p>
            <p className="text-sm leading-relaxed">
              AI-powered medication adherence platform for pharma companies and specialty pharmacies.
            </p>
          </div>
          <div>
            <p className="text-white/70 font-medium text-sm mb-3">Product</p>
            <div className="space-y-2 text-sm">
              <a href="#how-it-works" className="block hover:text-white transition-colors">How It Works</a>
              <a href="#use-cases" className="block hover:text-white transition-colors">Use Cases</a>
              <a href="/dashboard" className="block hover:text-white transition-colors">Dashboard</a>
            </div>
          </div>
          <div>
            <p className="text-white/70 font-medium text-sm mb-3">Company</p>
            <div className="space-y-2 text-sm">
              <a href="#" className="block hover:text-white transition-colors">About</a>
              <a href="#" className="block hover:text-white transition-colors">Careers</a>
              <a href="#" className="block hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div>
            <p className="text-white/70 font-medium text-sm mb-3">Legal</p>
            <div className="space-y-2 text-sm">
              <a href="#" className="block hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="block hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="block hover:text-white transition-colors">HIPAA Compliance</a>
              <a href="#" className="block hover:text-white transition-colors">BAA</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; 2026 Adhery. All rights reserved.</p>
          <p>HIPAA Compliant</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <AdherenceJourney />
      <MultichannelComparison />
      <RetentionMethods />
      <LogoCarousel />
      <TestimonialCarousel />
      <VideoDemoTabs />
      <CaseStudyCards />
      <ImpactMetrics />
      <FeatureTabs />
      <ResearchEvidence />
      <HowItWorks />
      <WhoWeServe />
      <ChannelDeepDive />
      <DemoRequestForm />
      <Footer />
    </main>
  );
}
