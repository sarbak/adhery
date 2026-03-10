import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-warm">
      {/* Top bar */}
      <header className="bg-white border-b border-border-light px-8 py-4 flex items-center gap-3">
        <Link href="/dashboard-new" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Adhery" width={24} height={24} />
          <span className="text-sm font-semibold text-foreground tracking-tight">adhery</span>
        </Link>
        <span className="text-[10px] font-medium text-accent uppercase tracking-widest">Dashboard</span>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {children}
      </main>
    </div>
  );
}
