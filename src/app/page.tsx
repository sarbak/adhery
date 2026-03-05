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
          <a href="#why-adhery" className="text-sm font-medium text-text-secondary hover:text-foreground transition-colors">
            Why Adhery
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-text-secondary hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#who-we-serve" className="text-sm font-medium text-text-secondary hover:text-foreground transition-colors">
            Who We Serve
          </a>
          <a href="#use-cases" className="text-sm font-medium text-text-secondary hover:text-foreground transition-colors">
            Use Cases
          </a>
          <a
            href="#demo"
            className="text-sm font-semibold text-white bg-accent hover:bg-accent-dark px-5 py-2.5 rounded-sm transition-all"
          >
            See Adhery in Action
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
          <a href="#why-adhery" className="block text-sm font-medium text-text-secondary" onClick={() => setMobileOpen(false)}>Why Adhery</a>
          <a href="#how-it-works" className="block text-sm font-medium text-text-secondary" onClick={() => setMobileOpen(false)}>How It Works</a>
          <a href="#who-we-serve" className="block text-sm font-medium text-text-secondary" onClick={() => setMobileOpen(false)}>Who We Serve</a>
          <a href="#use-cases" className="block text-sm font-medium text-text-secondary" onClick={() => setMobileOpen(false)}>Use Cases</a>
          <a href="#demo" className="block text-sm font-semibold text-white bg-accent px-5 py-2.5 rounded-sm text-center" onClick={() => setMobileOpen(false)}>See Adhery in Action</a>
        </div>
      )}
    </nav>
  );
}

/* ─── 2. Hero ─── */
function Hero() {
  return (
    <section className="pt-28 pb-20 px-6 bg-gradient-to-b from-[#e8eef5] to-background">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-xs font-medium tracking-[0.15em] uppercase text-accent mb-4">
          Autonomous GLP-1 Adherence
        </p>
        <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-6 text-foreground">
          An Autonomous Voice Agent<br />
          <em className="font-serif">for Every Patient.</em>
        </h1>

        <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
          Most GLP-1 patients stop therapy within a year. Adhery is a voice agent that calls them, catches early warning signs, and keeps them on track. It handles the routine 80% of patient support so your pharmacists focus on cases that need clinical judgment.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
            href="#demo"
            className="text-sm font-semibold text-white bg-accent hover:bg-accent-dark px-8 py-3.5 rounded-sm transition-all shadow-lg shadow-accent/20"
          >
            See Adhery in Action
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-text-secondary hover:text-foreground px-6 py-3.5 rounded-sm border border-border-light hover:border-foreground/20 transition-all"
          >
            How It Works
          </a>
        </div>

        {/* HIPAA + SOC-2 badges */}
        <div className="flex items-center justify-center gap-6 text-text-muted">
          <div className="flex items-center gap-2 text-xs">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            HIPAA Compliant
          </div>
          <div className="flex items-center gap-2 text-xs">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            SOC-2 Ready
          </div>
          <div className="flex items-center gap-2 text-xs">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
              <path d="M9 12l2 2 4-4" />
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            MLR-Approved Scripts
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 3. The Adhery Standard (Three Pillars) ─── */
function AdheryStandard() {
  const pillars = [
    {
      number: '01',
      title: 'Clinical Intelligence that Listens',
      items: [
        'Vocal Biomarker Analysis',
        'Each patient gets messages matched to their situation',
        'Support on patient\'s terms, not intrusive robocalls',
        'Prioritizes patients most likely to drop off',
      ],
    },
    {
      number: '02',
      title: 'Zero-Hallucination Safety & Compliance',
      items: [
        'Knowledge-Grounded Guardrails (MLR-approved scripts)',
        'Autonomous Pharmacovigilance (real-time AE detection)',
        'Clinical Safety Net (warm handoff to live pharmacist)',
      ],
    },
    {
      number: '03',
      title: 'Fits Into Your Stack',
      items: [
        'Syncs with Veeva Vault and Salesforce Health Cloud',
        'Same patient context across voice, SMS, and escalation',
        'Tracks the 90-day drop-off cliff where most patients quit',
      ],
    },
  ];

  return (
    <section id="why-adhery" className="py-20 px-6 bg-white border-y border-border-light">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-accent mb-3">
            The Adhery Standard
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            The clinical intelligence of a specialist.<br />
            <em className="font-serif">The scale of an autonomous platform.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div key={p.number} className="bg-surface-warm border border-border-light p-6">
              <span className="text-3xl font-bold text-accent/20 mb-4 block">{p.number}</span>
              <h3 className="font-semibold text-foreground text-lg mb-4">{p.title}</h3>
              <ul className="space-y-3">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-text-secondary leading-relaxed">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent flex-shrink-0 mt-0.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 4. How Adhery Works ─── */
function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Integrate & Ground',
      description: 'Connect your data, define guardrails. We ingest your MLR-approved scripts, sync with Veeva Vault and Salesforce Health Cloud, and configure adverse event detection rules.',
      result: 'Audit-ready infrastructure that passes MLR review in weeks.',
      timeline: 'Week 1',
      bg: 'bg-surface-warm',
    },
    {
      step: '02',
      title: 'Engage & Triage',
      description: 'Monitor patient milestones and predict the 90-day cliff. Voice AI handles barrier conversations, SMS manages routine check-ins. Warm handoff routes high-risk patients to your pharmacists.',
      result: '3.5x increase in patient engagement.',
      timeline: 'Week 2-3',
      bg: 'bg-white',
    },
    {
      step: '03',
      title: 'Measure & Optimize',
      description: 'Track first fill, 30-day, 90-day, and PDC scores in real time. Auto-coded pharmacovigilance events. Sentiment analysis across every interaction.',
      result: 'You see exactly what is working and what is not.',
      timeline: 'Week 4+',
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
            Live in 3 weeks
          </h2>
          <p className="text-text-secondary mt-4 max-w-xl mx-auto">
            Start with your hardest-to-retain GLP-1 patients. Pre-built cadences by drug class. No custom development.
          </p>
        </div>

        <div className="space-y-0">
          {steps.map((s, i) => (
            <div key={i} className={`${s.bg} border border-border-light p-8 md:p-12 ${i > 0 ? '-mt-px' : ''}`}>
              <div className="grid md:grid-cols-[80px_1fr_auto] gap-6 items-start">
                <span className="text-4xl font-bold text-accent/30">{s.step}</span>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{s.title}</h3>
                  <p className="text-text-secondary leading-relaxed max-w-xl mb-2">{s.description}</p>
                  <p className="text-sm text-accent font-medium italic">{s.result}</p>
                </div>
                <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-sm self-start hidden md:block">{s.timeline}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 5. Adherence Journey Flow (GLP-1) ─── */

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
    name: 'Sarah',
    initial: 'S',
    drug: 'Ozempic',
    title: 'Positive Check-in',
    steps: [
      {
        day: 'Day 1',
        channel: 'voice',
        label: 'AI Voice onboarding',
        technique: 'Empathetic onboarding',
        message: '"Hi Sarah, I\'m your Ozempic support navigator. I\'d like to learn about your schedule and walk you through what to expect in the first few weeks, especially around nausea. When do you usually take your dose?"',
        reply: '"Sunday mornings, before breakfast. I\'m a little nervous about the nausea."',
        result: 'Onboarded',
        resultColor: 'text-green-500',
      },
      {
        day: 'Day 5',
        channel: 'sms',
        label: 'Nausea triage',
        technique: 'Adverse event screening',
        message: 'Hi Sarah, how are you feeling after your first dose? Any nausea or stomach discomfort?',
        reply: 'Yes, pretty nauseous since Tuesday. Is that normal?',
        result: 'AE detected',
        resultColor: 'text-amber-500',
      },
      {
        day: 'Day 5',
        channel: 'voice',
        label: 'Pharmacist warm handoff',
        technique: 'Clinical safety net',
        message: '"I\'m collecting some details about your nausea for your pharmacist. On a scale of 1-5, how severe? Are you able to eat and stay hydrated? I\'m routing this to Dr. Patel for a dosage review."',
        reply: '"About a 3. I can eat small meals. Thank you for checking."',
        result: 'Routed to RPh',
        resultColor: 'text-green-500',
        resultNote: 'Dosage review initiated',
      },
      {
        day: 'Day 14',
        channel: 'voice',
        label: 'Two-week check-in',
        technique: 'Behavioral reinforcement',
        message: '"Sarah, just checking in. How has the nausea been since the dosage adjustment? And how are you feeling overall?"',
        reply: '"Much better! Down to a 1. And I\'ve already lost 8 lbs. Feeling motivated."',
        result: 'Improving',
        resultColor: 'text-green-500',
      },
      {
        day: 'Day 30',
        channel: 'milestone',
        label: 'First refill milestone',
        technique: 'Refill confirmation',
        message: 'Sarah, your Ozempic refill is due this week. Your first month is complete, and you\'re on track. Ready to confirm your refill?',
        reply: 'Yes, confirmed! Feeling great about this.',
        result: '30-day milestone',
        resultColor: 'text-accent',
      },
    ],
  },
  {
    name: 'Michael',
    initial: 'M',
    drug: 'Wegovy',
    title: 'Adverse Event Calming',
    steps: [
      {
        day: 'Day 3',
        channel: 'sms',
        label: 'Post-dose check-in',
        technique: 'Proactive monitoring',
        message: 'Hi Michael, how did your first Wegovy injection go? Any reactions at the injection site or stomach issues?',
        reply: 'The injection was fine but I have really bad stomach cramps',
        result: 'Side effect flagged',
        resultColor: 'text-amber-500',
      },
      {
        day: 'Day 3',
        channel: 'voice',
        label: 'AI voice follow-up',
        technique: 'AE severity assessment',
        message: '"I want to make sure you\'re okay, Michael. Can you tell me more about the cramps? When did they start, and are you experiencing any other symptoms like vomiting or diarrhea? I\'m going to collect some details for your care team."',
        reply: '"Started yesterday. Some diarrhea too. It\'s pretty uncomfortable."',
        result: 'Details collected',
        resultColor: 'text-green-500',
        resultNote: 'AE auto-coded',
      },
      {
        day: 'Day 4',
        channel: 'voice',
        label: 'Pharmacist escalation',
        technique: 'Warm handoff',
        message: '"Michael, Dr. Patel reviewed your symptoms and wants to talk you through some strategies. I\'m connecting you now. These GI effects are common in the first few weeks and usually improve."',
        reply: '"Good to know it\'s normal. I was worried I needed to stop."',
        result: 'RPh connected',
        resultColor: 'text-green-500',
      },
      {
        day: 'Day 14',
        channel: 'sms',
        label: 'Symptom follow-up',
        technique: 'Closed-loop tracking',
        message: 'Michael, how are the stomach cramps now compared to last week? Better, same, or worse?',
        reply: 'Way better! Almost gone now. Glad I stuck with it',
        result: 'Symptoms resolved',
        resultColor: 'text-green-500',
      },
      {
        day: 'Day 30',
        channel: 'milestone',
        label: 'Adherence milestone',
        technique: 'Positive reinforcement',
        message: 'Michael, one month on Wegovy and 100% adherent. Your side effects have resolved and you\'re past the toughest part. Your care team is impressed.',
        reply: 'Feeling great. Lost 12 lbs already!',
        result: '100% PDC',
        resultColor: 'text-accent',
      },
    ],
  },
  {
    name: 'Lisa',
    initial: 'L',
    drug: 'Mounjaro',
    title: 'Re-engaging a Dropped Patient',
    steps: [
      {
        day: 'Day 60',
        channel: 'sms',
        label: 'Missed refill detected',
        technique: 'Gap detection',
        message: 'Hi Lisa, we noticed your Mounjaro refill is overdue. Everything okay? We\'re here if you need anything.',
        reply: '',
        result: 'No response',
        resultColor: 'text-red-500',
      },
      {
        day: 'Day 63',
        channel: 'voice',
        label: 'AI re-engagement call',
        technique: 'Non-judgmental outreach',
        message: '"Hi Lisa, just checking in. We noticed you haven\'t refilled your Mounjaro recently and wanted to make sure everything is alright. Is there something we can help with?"',
        reply: '"Honestly, I\'ve lost 20 lbs and I feel great. I was thinking maybe I don\'t need it anymore."',
        result: 'Drop-off reason found',
        resultColor: 'text-amber-500',
      },
      {
        day: 'Day 63',
        channel: 'voice',
        label: 'Rebound education',
        technique: 'Evidence-based counseling',
        message: '"That\'s fantastic progress, Lisa. I want to share something important though. Studies show that patients who stop GLP-1 therapy regain 60-70% of lost weight within a year due to hormone rebound. Would it help to talk this through with your doctor?"',
        reply: '"I had no idea about the rebound. Yes, I\'d like to talk to my doctor."',
        result: 'Telehealth scheduled',
        resultColor: 'text-green-500',
        resultNote: 'Re-engaged',
      },
      {
        day: 'Day 65',
        channel: 'sms',
        label: 'Refill coordination',
        technique: 'Barrier removal',
        message: 'Lisa, your doctor confirmed continuing Mounjaro. Your refill is ready. Want to confirm pickup or delivery?',
        reply: 'Delivery please. Thank you for reaching out.',
        result: 'Refill confirmed',
        resultColor: 'text-green-500',
      },
      {
        day: 'Day 90',
        channel: 'milestone',
        label: '90-day cliff crossed',
        technique: 'Milestone celebration',
        message: 'Lisa, you\'ve crossed the 90-day mark, the point where most GLP-1 patients drop off. You\'re in the top 20% who maintain therapy long-term. That takes real commitment.',
        reply: 'So glad I didn\'t quit. Down 28 lbs total!',
        result: '90-day milestone',
        resultColor: 'text-accent',
      },
    ],
  },
  {
    name: 'David',
    initial: 'D',
    drug: 'Zepbound',
    title: 'Insurance Friction Navigation',
    steps: [
      {
        day: 'Day 25',
        channel: 'sms',
        label: 'Refill reminder',
        technique: 'Proactive refill',
        message: 'Hi David, your Zepbound refill is coming up next week. Want me to start processing it?',
        reply: 'Actually my insurance denied the renewal. I don\'t know what to do.',
        result: 'Insurance barrier',
        resultColor: 'text-red-500',
      },
      {
        day: 'Day 25',
        channel: 'voice',
        label: 'Prior auth assistance',
        technique: 'Affordability triage',
        message: '"I understand how frustrating that is, David. Let me help. I can walk you through the prior authorization appeal process. I\'ll also check if you qualify for the manufacturer\'s copay assistance program. Can you tell me what the denial reason was?"',
        reply: '"It says step therapy required. They want me to try something else first."',
        result: 'Appeal initiated',
        resultColor: 'text-green-500',
        resultNote: 'PA support started',
      },
      {
        day: 'Day 27',
        channel: 'sms',
        label: 'Copay card enrollment',
        technique: 'Financial support',
        message: 'David, while we work on the prior auth appeal, I found a manufacturer savings card that can cover your next fill. I\'m texting you the enrollment link. Your out-of-pocket could drop to $25.',
        reply: 'Just enrolled. This is a lifesaver.',
        result: 'Copay card active',
        resultColor: 'text-green-500',
      },
      {
        day: 'Day 30',
        channel: 'sms',
        label: 'Refill confirmed',
        technique: 'Gap prevention',
        message: 'Good news, David. Your Zepbound is ready for pickup at $25 with the savings card. Prior auth appeal is also in progress.',
        reply: 'Picking it up today. Thank you!',
        result: 'No gap in therapy',
        resultColor: 'text-green-500',
      },
      {
        day: 'Day 45',
        channel: 'milestone',
        label: 'Prior auth approved',
        technique: 'Barrier resolved',
        message: 'David, your prior auth appeal was approved. Your insurance will cover Zepbound going forward. No more out-of-pocket surprises.',
        reply: 'Amazing news. I was ready to give up.',
        result: 'PA approved',
        resultColor: 'text-accent',
        resultNote: 'Full coverage restored',
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
    <section className="py-20 px-6 bg-white" id="use-cases">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-accent mb-4">
            Voice Agent in Action
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Watch the AI navigator <em className="font-serif">manage GLP-1 patients</em>
          </h2>
          <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
            Four real scenarios: positive check-in, adverse event calming, re-engaging a dropped patient, and insurance friction navigation.
          </p>
        </div>

        {/* Scenario tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {SCENARIOS.map((s, i) => (
            <button
              key={i}
              onClick={() => startScenario(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-sm text-sm transition-all ${
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
          <span className="inline-flex items-center gap-2 text-xs bg-accent/5 text-accent-dark border border-accent/15 px-4 py-1.5 rounded-sm">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            {scenario.title}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Flow steps */}
          <div id="adherence-journey" className="py-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm bg-accent/10 border border-accent/30 flex items-center justify-center">
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
                <div className="w-8 h-8 rounded-sm bg-accent/10 border border-accent/30 flex items-center justify-center text-accent font-semibold text-xs">
                  {scenario.initial}
                </div>
              </div>
            </div>

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
                        className="w-9 h-9 flex items-center justify-center rounded-sm border transition-all duration-300"
                        style={{
                          borderColor: isActive ? 'var(--accent)' : isPast ? 'var(--text-muted)' : 'var(--border-light)',
                          backgroundColor: isActive && phase === 'sending' ? 'var(--accent)' : 'transparent',
                        }}
                      >
                        <ChannelIcon channel={step.channel} active={isActive && phase === 'sending'} />
                      </div>
                    </div>

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
          <div className="bg-[#1a1a2e] rounded-sm p-6 shadow-2xl min-h-[380px] flex flex-col">
            {activeStep >= 0 ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider text-white/30 font-medium">
                      {steps[activeStep].channel === 'voice' ? 'AI Voice Call' : steps[activeStep].channel === 'milestone' ? 'Milestone' : 'SMS Conversation'}
                    </span>
                    <span className="text-[10px] text-white/20">{steps[activeStep].day}</span>
                  </div>
                  <span className="text-[9px] text-accent/50 font-medium px-2 py-0.5 border border-accent/20 rounded-sm">
                    {steps[activeStep].technique}
                  </span>
                </div>
                <div className="flex-1 flex flex-col justify-center space-y-3">
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
                    <div className="bg-accent/20 text-white/90 text-sm px-4 py-3 rounded-sm max-w-[92%]">
                      {steps[activeStep].message}
                    </div>
                  </div>

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
                      <div className="bg-white/10 text-white/80 text-sm px-4 py-3 rounded-sm max-w-[85%] ml-auto">
                        {steps[activeStep].reply}
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className="mt-4 transition-all duration-500"
                  style={{ opacity: phase === 'result' ? 1 : 0 }}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-3 py-1 rounded-sm ${
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
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
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

/* ─── 6. Case Study Cards (GLP-1) ─── */
function CaseStudyCards() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const studies = [
    {
      name: 'Sarah',
      drug: 'Ozempic',
      headline: '90-day cliff crossed with zero therapy gaps',
      summary: 'Sarah experienced early nausea that almost caused her to quit. Adhery\'s voice agent detected the adverse event, routed her to a pharmacist for dosage review, and provided ongoing support through the first 90 days.',
      metrics: { adherence: '100% PDC', retention: '90+ days', channel: 'Voice + SMS' },
    },
    {
      name: 'Lisa',
      drug: 'Mounjaro',
      headline: 'Re-engaged after considering stopping therapy',
      summary: 'Lisa lost 20 lbs and thought she no longer needed medication. Adhery\'s voice agent educated her about hormone rebound and weight regain risk, connecting her with her doctor to confirm continued therapy.',
      metrics: { recovery: 'Re-engaged day 63', outcome: 'Continued therapy', channel: 'Voice' },
    },
    {
      name: 'David',
      drug: 'Zepbound',
      headline: 'Insurance denial navigated, zero gap in therapy',
      summary: 'David\'s insurance denied his refill renewal. Adhery helped him enroll in a manufacturer copay card within 48 hours while initiating a prior authorization appeal that was ultimately approved.',
      metrics: { response: '48 hr resolution', savings: '$25 copay', channel: 'Voice + SMS' },
    },
  ];

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-accent mb-4">
            GLP-1 Patient Outcomes
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Real scenarios, <em className="font-serif">real outcomes</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {studies.map((study, i) => (
            <div
              key={i}
              onClick={() => setExpanded(expanded === i ? null : i)}
              className={`bg-white border border-border-light p-6 cursor-pointer transition-all duration-300 ${
                expanded === i ? 'ring-2 ring-accent/30 shadow-xl' : 'hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center text-accent font-semibold text-sm">
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
                        className="text-xs bg-accent/10 text-accent-dark px-3 py-1 rounded-sm"
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
          { value: '3.5x', label: 'Engagement Increase', sub: 'AI voice outreach vs. call center' },
          { value: '80%+', label: 'PDC Achievement', sub: 'crossing the CMS quality threshold' },
          { value: '90-day', label: 'Cliff Crossed', sub: 'where most GLP-1 patients drop off' },
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

/* ─── 8. Retention Science Methods ─── */
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
          Adhery applies retention methods from behavioral science and clinical research to every patient interaction.
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

/* ─── 9. Video Demo Tabs ─── */
function VideoDemoTabs() {
  const [active, setActive] = useState(0);
  const tabs = [
    {
      label: 'Voice Call',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
      ),
      title: 'AI Voice Agent for GLP-1 Patients',
      description:
        'The voice agent calls patients, walks them through onboarding, screens for adverse events, and follows up on missed doses. When it detects a problem it can\'t resolve, it routes to your pharmacist with full context.',
      mockup: (
        <div className="bg-[#1a1a2e] rounded-sm p-6 max-w-sm mx-auto shadow-2xl">
          <div className="text-center mb-4">
            <div className="w-14 h-14 rounded-sm bg-accent/20 flex items-center justify-center mx-auto mb-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                <path d="M19 10v2a7 7 0 01-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </div>
            <p className="text-white font-medium text-sm">AI Agent Speaking</p>
            <p className="text-white/40 text-xs">GLP-1 Adherence Check-in</p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-accent text-xs font-medium mt-0.5 w-4 flex-shrink-0">AI</span>
              <p className="text-white/80">Hi Sarah, how have you been feeling on your Ozempic this week? Any nausea or stomach discomfort?</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-white/40 text-xs font-medium mt-0.5 w-4 flex-shrink-0">PT</span>
              <p className="text-white/60">The nausea has been better this week, but I&apos;m thinking about stopping since I already lost 15 lbs...</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent text-xs font-medium mt-0.5 w-4 flex-shrink-0">AI</span>
              <p className="text-white/80">That&apos;s great progress, Sarah. I want to share something important: studies show 60-70% of patients who stop GLP-1 therapy regain the weight within a year. Would you like to discuss this with your doctor?</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-sm">Nausea improving</span>
            <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-sm">Drop-off risk detected</span>
            <span className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded-sm">Rebound education</span>
          </div>
        </div>
      ),
    },
    {
      label: 'SMS Triage',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      ),
      title: 'Async SMS for Routine Check-ins',
      description:
        'Two-way SMS handles refill reminders, dosage confirmations, and quick symptom checks. When the AI detects a barrier or adverse event, it escalates to a voice call or pharmacist.',
      mockup: (
        <div className="bg-[#1a1a2e] rounded-sm p-6 max-w-sm mx-auto shadow-2xl">
          <div className="text-xs text-white/40 text-center mb-3">Today, 9:15 AM</div>
          <div className="space-y-2.5">
            <div className="bg-accent/90 text-white text-sm px-4 py-2 rounded-sm max-w-[80%] ml-auto">
              Hi Sarah! Your weekly Ozempic dose is today. How did last week&apos;s injection go?
            </div>
            <div className="bg-white/10 text-white text-sm px-4 py-2 rounded-sm max-w-[80%]">
              Good! Nausea was way better this time
            </div>
            <div className="bg-accent/90 text-white text-sm px-4 py-2 rounded-sm max-w-[80%] ml-auto">
              Great to hear! Your refill is due in 5 days. Want me to process it now?
            </div>
            <div className="bg-white/10 text-white text-sm px-4 py-2 rounded-sm max-w-[80%]">
              Yes please
            </div>
            <div className="bg-accent/90 text-white text-sm px-4 py-2 rounded-sm max-w-[80%] ml-auto">
              Done! Your Ozempic will be ready for pickup on Friday. You&apos;re at 100% adherence this month.
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-sm">Refill confirmed</span>
            <span className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded-sm">100% PDC</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-accent mb-4">
            Voice-First, Multi-Channel
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Voice AI leads. <em className="font-serif">SMS supports.</em>
          </h2>
        </div>

        <div className="flex justify-center gap-2 mb-12">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-medium transition-all ${
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

/* ─── 10. Who We Serve ─── */
function WhoWeServe() {
  const segments = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
          <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
      title: 'Consumer Health',
      description: 'Hims & Hers, Ro, and telehealth platforms. Weeks to go live with pre-built GLP-1 cadences and lower regulatory burden.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: 'Pharma Manufacturers',
      description: 'Eli Lilly, Novo Nordisk, and other GLP-1 makers. Disease-division patient support programs with MLR-compliant scripts.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
          <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" /><path d="M1 21h22" /><path d="M9 7h1" /><path d="M9 11h1" /><path d="M14 7h1" /><path d="M14 11h1" />
        </svg>
      ),
      title: 'Specialty Pharmacies',
      description: 'Augment call center teams with autonomous voice agents. Handle the routine 80% so pharmacists focus on complex cases.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      title: 'Telehealth Platforms',
      description: 'Extend your GLP-1 prescribing with post-prescription adherence support. Reduce churn and improve long-term patient outcomes.',
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
            Built for the GLP-1 <em className="font-serif">ecosystem</em>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {segments.map((seg, i) => (
            <div
              key={i}
              className="bg-white p-6 border border-border-light hover:border-accent/30 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-sm bg-accent/10 flex items-center justify-center mb-4">
                {seg.icon}
              </div>
              <h3 className="font-semibold text-foreground mb-2">{seg.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{seg.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 11. Demo Request Form ─── */
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
          <div className="w-16 h-16 rounded-sm bg-accent/20 flex items-center justify-center mx-auto mb-6">
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
          See Adhery <em className="font-serif">in action</em>
        </h2>
        <p className="text-white/60 mb-10">
          See how Adhery keeps GLP-1 patients on therapy past the 90-day cliff.
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
              className="bg-white/10 text-white px-4 py-3 rounded-sm border border-white/10 focus:border-accent outline-none text-sm placeholder:text-white/30"
            />
            <input
              type="email"
              placeholder="Work email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="bg-white/10 text-white px-4 py-3 rounded-sm border border-white/10 focus:border-accent outline-none text-sm placeholder:text-white/30"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Company"
              required
              value={form.company}
              onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
              className="bg-white/10 text-white px-4 py-3 rounded-sm border border-white/10 focus:border-accent outline-none text-sm placeholder:text-white/30"
            />
            <select
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
              required
              className="bg-white/10 text-white px-4 py-3 rounded-sm border border-white/10 focus:border-accent outline-none text-sm appearance-none"
            >
              <option value="" className="text-black">Select role</option>
              <option value="consumer-health" className="text-black">Consumer Health</option>
              <option value="pharma" className="text-black">Pharma/Manufacturer</option>
              <option value="pharmacy" className="text-black">Specialty Pharmacy</option>
              <option value="telehealth" className="text-black">Telehealth</option>
              <option value="clinical" className="text-black">Clinical/Medical</option>
              <option value="executive" className="text-black">Executive/C-Suite</option>
              <option value="other" className="text-black">Other</option>
            </select>
          </div>
          <textarea
            placeholder="Tell us about your GLP-1 adherence challenges (optional)"
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            rows={3}
            className="w-full bg-white/10 text-white px-4 py-3 rounded-sm border border-white/10 focus:border-accent outline-none text-sm placeholder:text-white/30 resize-none"
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3.5 rounded-sm transition-all shadow-lg shadow-accent/20 disabled:opacity-50"
          >
            {status === 'submitting' ? 'Submitting...' : 'See Adhery in Action'}
          </button>
          {status === 'error' && (
            <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </section>
  );
}

/* ─── 12. Footer ─── */
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
              Autonomous voice agent for GLP-1 adherence. Built for consumer health, pharma manufacturers, and specialty pharmacies.
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
            <p className="text-white/70 font-medium text-sm mb-3">Compliance</p>
            <div className="space-y-2 text-sm">
              <a href="#" className="block hover:text-white transition-colors">HIPAA Compliance</a>
              <a href="#" className="block hover:text-white transition-colors">SOC-2</a>
              <a href="#" className="block hover:text-white transition-colors">BAA</a>
              <a href="#" className="block hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="block hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; 2026 Adhery. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              HIPAA Compliant
            </span>
            <span className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              SOC-2 Ready
            </span>
          </div>
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
      <AdheryStandard />
      <HowItWorks />
      <AdherenceJourney />
      <CaseStudyCards />
      <ImpactMetrics />
      <RetentionMethods />
      <VideoDemoTabs />
      <WhoWeServe />
      <DemoRequestForm />
      <Footer />
    </main>
  );
}
