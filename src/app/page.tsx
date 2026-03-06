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
          <a
            href="#demo"
            className="text-sm font-semibold text-white bg-accent hover:bg-accent-dark px-5 py-2.5 transition-colors"
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
          <a href="#demo" className="block text-sm font-semibold text-white bg-accent px-5 py-2.5  text-center" onClick={() => setMobileOpen(false)}>See Adhery in Action</a>
        </div>
      )}
    </nav>
  );
}

/* ─── 2. Hero ─── */
function Hero() {
  return (
    <section className="pt-32 pb-24 px-6 bg-white border-b border-border-light">
      <div className="max-w-4xl mx-auto">
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-accent mb-6">
          Autonomous GLP-1 Adherence
        </p>
        <h1 className="font-serif text-5xl md:text-6xl leading-[1.08] mb-6 text-foreground">
          An Autonomous Voice Agent<br />
          for Every Patient
        </h1>

        <p className="text-base text-text-secondary max-w-xl mb-10 leading-relaxed">
          Most GLP-1 patients stop therapy within a year. Adhery is a voice agent that calls them, catches early warning signs, and keeps them on track. It handles the routine 80% so your pharmacists focus on cases that need clinical judgment.
        </p>

        <div className="flex items-center gap-4 mb-14">
          <a
            href="#demo"
            className="text-sm font-semibold text-white bg-accent hover:bg-accent-dark px-7 py-3 transition-colors"
          >
            See Adhery in Action
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-text-secondary hover:text-foreground px-6 py-3 border border-border-light hover:border-foreground/20 transition-colors"
          >
            How It Works
          </a>
        </div>

        <div className="flex items-center gap-6 text-text-muted text-[11px] tracking-wide uppercase">
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            HIPAA Compliant
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            SOC-2 Ready
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
              <path d="M9 12l2 2 4-4" />
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            MLR-Approved Scripts
          </span>
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
    <section id="why-adhery" className="py-20 px-6 bg-surface-warm border-b border-border-light">
      <div className="max-w-4xl mx-auto">
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-accent mb-4">
          The Adhery Standard
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-14">
          The clinical intelligence of a specialist.<br />
          The scale of an autonomous platform.
        </h2>

        <div className="grid md:grid-cols-3 gap-px bg-border-light">
          {pillars.map((p) => (
            <div key={p.number} className="bg-white p-6">
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-text-muted mb-4 block">{p.number}</span>
              <h3 className="font-semibold text-foreground mb-4">{p.title}</h3>
              <ul className="space-y-2.5">
                {p.items.map((item) => (
                  <li key={item} className="text-sm text-text-secondary leading-relaxed pl-4 border-l-2 border-border-light">
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
    <section className="py-20 px-6 bg-white border-b border-border-light" id="how-it-works">
      <div className="max-w-4xl mx-auto">
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-accent mb-4">
          How It Works
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3">
          Live in 3 weeks
        </h2>
        <p className="text-sm text-text-secondary mb-14 max-w-lg">
          Start with your hardest-to-retain GLP-1 patients. Pre-built cadences by drug class. No custom development.
        </p>

        <div className="space-y-0">
          {steps.map((s, i) => (
            <div key={i} className={`border border-border-light p-8 ${i > 0 ? '-mt-px' : ''} ${i % 2 === 0 ? 'bg-surface-warm' : 'bg-white'}`}>
              <div className="grid md:grid-cols-[1fr_auto] gap-6 items-start">
                <div>
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-text-muted">{s.step}</span>
                    <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-xl mb-2">{s.description}</p>
                  <p className="text-sm text-accent font-medium">{s.result}</p>
                </div>
                <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-text-muted self-start hidden md:block">{s.timeline}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 5. Case Study Cards (GLP-1) ─── */
function CaseStudyCards() {
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
    <section className="py-20 px-6 bg-surface-warm border-b border-border-light">
      <div className="max-w-4xl mx-auto">
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-accent mb-4">
          GLP-1 Patient Outcomes
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-14">
          Real scenarios, real outcomes
        </h2>

        <div className="grid md:grid-cols-3 gap-px bg-border-light">
          {studies.map((study, i) => (
            <div key={i} className="bg-white p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-accent/10 flex items-center justify-center text-accent font-semibold text-xs">
                  {study.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{study.name}</p>
                  <p className="text-[11px] text-text-muted">{study.drug}</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-foreground mb-3">{study.headline}</p>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">{study.summary}</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(study.metrics).map(([key, val]) => (
                  <span key={key} className="text-[11px] text-text-muted">
                    {val}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 6. Impact Metrics ─── */
function ImpactMetrics() {
  return (
    <section className="py-16 px-6 bg-[#0d1117]">
      <div className="max-w-4xl mx-auto grid md:grid-cols-4 gap-px">
        {[
          { value: '3.5x', label: 'Engagement increase', sub: 'AI voice outreach vs. call center' },
          { value: '80%+', label: 'PDC achievement', sub: 'Crossing the CMS quality threshold' },
          { value: '90-day', label: 'Cliff crossed', sub: 'Where most GLP-1 patients drop off' },
          { value: '3 wks', label: 'Time to launch', sub: 'From contract to go-live' },
        ].map((m, i) => (
          <div key={i} className="text-center py-8 px-4">
            <p className="text-4xl font-bold text-white mb-2">{m.value}</p>
            <p className="text-sm font-medium text-white/80 mb-1">{m.label}</p>
            <p className="text-xs text-white/40">{m.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── 7. Who We Serve ─── */
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
    <section className="py-20 px-6 bg-white border-b border-border-light" id="who-we-serve">
      <div className="max-w-4xl mx-auto">
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-accent mb-4">
          Who We Serve
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-14">
          Built for the GLP-1 ecosystem
        </h2>

        <div className="grid sm:grid-cols-2 gap-px bg-border-light">
          {segments.map((seg, i) => (
            <div key={i} className="bg-surface-warm p-6">
              <div className="w-10 h-10 bg-accent/10 flex items-center justify-center mb-4">
                {seg.icon}
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-2">{seg.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{seg.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 9. Demo Request Form ─── */
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
          <div className="w-16 h-16  bg-accent/20 flex items-center justify-center mx-auto mb-6">
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
              className="bg-white/10 text-white px-4 py-3  border border-white/10 focus:border-accent outline-none text-sm placeholder:text-white/30"
            />
            <input
              type="email"
              placeholder="Work email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="bg-white/10 text-white px-4 py-3  border border-white/10 focus:border-accent outline-none text-sm placeholder:text-white/30"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Company"
              required
              value={form.company}
              onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
              className="bg-white/10 text-white px-4 py-3  border border-white/10 focus:border-accent outline-none text-sm placeholder:text-white/30"
            />
            <select
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
              required
              className="bg-white/10 text-white px-4 py-3  border border-white/10 focus:border-accent outline-none text-sm appearance-none"
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
            className="w-full bg-white/10 text-white px-4 py-3  border border-white/10 focus:border-accent outline-none text-sm placeholder:text-white/30 resize-none"
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3.5  transition-all  disabled:opacity-50"
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

/* ─── 10. Footer ─── */
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
      <CaseStudyCards />
      <ImpactMetrics />
      <WhoWeServe />
      <DemoRequestForm />
      <Footer />
    </main>
  );
}
