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
        <a href="#" className="text-xl font-semibold tracking-tight text-foreground">
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

        {/* Flow pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <span className="text-sm font-medium text-accent-dark bg-accent/10 px-4 py-1.5 rounded-full">
            Configure Program
          </span>
          <span className="text-text-muted">&rarr;</span>
          <span className="text-sm font-medium text-accent-dark bg-accent/10 px-4 py-1.5 rounded-full">
            Enroll Patients
          </span>
          <span className="text-text-muted">&rarr;</span>
          <span className="text-sm font-medium text-accent-dark bg-accent/10 px-4 py-1.5 rounded-full">
            Monitor &amp; Optimize
          </span>
        </div>

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
          <div className="text-xs text-white/40 text-center mb-4">Today, 9:15 AM</div>
          <div className="space-y-3">
            <div className="bg-accent/90 text-white text-sm px-4 py-2.5 rounded-2xl rounded-br-md max-w-[80%] ml-auto">
              Hi Maria! Quick check-in on your Humira. Did you take your dose this morning?
            </div>
            <div className="bg-white/10 text-white text-sm px-4 py-2.5 rounded-2xl rounded-bl-md max-w-[80%]">
              Yes I did! But I noticed some redness at the injection site
            </div>
            <div className="bg-accent/90 text-white text-sm px-4 py-2.5 rounded-2xl rounded-br-md max-w-[80%] ml-auto">
              Thanks for letting me know. Some redness is common and usually goes away in 1-2 days. If it spreads or you notice swelling, please call your pharmacist. How are you feeling otherwise?
            </div>
            <div className="bg-white/10 text-white text-sm px-4 py-2.5 rounded-2xl rounded-bl-md max-w-[80%]">
              Much better actually, thank you!
            </div>
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
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                <path d="M19 10v2a7 7 0 01-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </div>
            <p className="text-white font-medium">AI Agent Speaking</p>
            <p className="text-white/40 text-xs">Call duration: 2:34</p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-accent text-xs font-medium mt-0.5">AI</span>
              <p className="text-white/80">Hi James, this is your medication support team. How have you been feeling since starting Eliquis?</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-white/40 text-xs font-medium mt-0.5">PT</span>
              <p className="text-white/60">Pretty good, but I&apos;ve been getting some nosebleeds...</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">Side effect detected</span>
            <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">Escalation triggered</span>
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
            <p className="text-white font-semibold text-lg mb-3">adhery</p>
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
          <p>Built with Claude Code</p>
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
