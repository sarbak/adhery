export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a1628] flex flex-col">
      {/* Nav */}
      <nav className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-xl font-semibold tracking-tight text-white">
            <img src="/logo.svg" alt="" className="w-7 h-7 brightness-0 invert" />
            adhery
          </a>
          <a
            href="mailto:emre@adhery.com"
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            Get in touch
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex items-center px-6 py-32">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-[1.2fr_1fr] gap-16 items-center">
          <div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-white mb-8">
              The future of<br />patient support.
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-xl mb-10">
              Autonomous voice agents that keep patients on therapy.
              Clinical-grade intelligence, delivered at population scale.
            </p>
            <a
              href="mailto:emre@adhery.com"
              className="text-slate-400 hover:text-white transition-colors text-lg"
            >
              Get in touch &rarr;
            </a>
          </div>

          {/* Signal pillars */}
          <div className="hidden md:flex flex-col gap-px">
            {[
              {
                label: 'Voice Intelligence',
                detail: 'Every conversation analyzed for clinical signals, emotional state, and adherence risk.',
              },
              {
                label: 'Autonomous Outreach',
                detail: 'Proactive engagement at the moments patients are most likely to discontinue.',
              },
              {
                label: 'Population Scale',
                detail: 'Thousands of concurrent patient relationships. Zero incremental headcount.',
              },
            ].map((item) => (
              <div key={item.label} className="border-l border-white/10 pl-6 py-5">
                <p className="text-white text-sm font-medium mb-1">{item.label}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thesis strip */}
      <section className="border-t border-white/10 py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          {[
            {
              stat: '50%',
              context: 'of GLP-1 patients discontinue within 12 months.',
            },
            {
              stat: '3.5x',
              context: 'engagement increase with autonomous voice outreach vs. call centers.',
            },
            {
              stat: '90 days',
              context: 'the critical adherence cliff. Cross it, and long-term retention follows.',
            },
          ].map((item) => (
            <div key={item.stat}>
              <p className="text-white text-3xl md:text-4xl font-serif mb-3">{item.stat}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{item.context}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <img src="/logo.svg" alt="" className="w-5 h-5 brightness-0 invert opacity-50" />
            <span>&copy; 2026 Adhery</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
