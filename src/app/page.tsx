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
      <section className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-4xl">
          <h1 className="font-serif text-6xl md:text-8xl leading-[1.05] text-white mb-8">
            The future of<br />patient support.
          </h1>
          <a
            href="mailto:emre@adhery.com"
            className="text-slate-400 hover:text-white transition-colors text-lg"
          >
            Get in touch &rarr;
          </a>
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
