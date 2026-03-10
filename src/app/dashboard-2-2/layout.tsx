'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Overview', href: '/dashboard-2-2' },
  { label: 'Patients', href: '/dashboard-2-2/patients' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-surface-warm">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-56 bg-white border-r border-border-light flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-border-light">
          <Link href="/dashboard-2-2" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Adhery" width={22} height={22} />
            <span className="text-sm font-semibold text-foreground tracking-tight">adhery</span>
          </Link>
          <p className="text-[10px] font-medium text-accent uppercase tracking-widest mt-1">Dashboard</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3">
          {navItems.map((item) => {
            const isActive =
              item.href === '/dashboard-2-2'
                ? pathname === '/dashboard-2-2'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-5 py-2.5 text-sm transition-colors ${
                  isActive
                    ? 'text-accent bg-accent/5 border-l-2 border-accent font-medium'
                    : 'text-text-secondary hover:bg-surface-warm border-l-2 border-transparent'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border-light">
          <p className="text-[10px] text-text-muted">Adhery Platform v2.0</p>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-56 flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
