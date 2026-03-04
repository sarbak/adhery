'use client';

import { useState, createContext, useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Role = 'pharma_admin' | 'care_coordinator' | 'patient' | null;

const RoleContext = createContext<{ role: Role; setRole: (r: Role) => void }>({
  role: null,
  setRole: () => {},
});

export function useRole() {
  return useContext(RoleContext);
}

const navItems = [
  { href: '/dashboard/overview', label: 'Overview', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4' },
  { href: '/dashboard/programs', label: 'Programs', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { href: '/dashboard/patients', label: 'Patients', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { href: '/dashboard/alerts', label: 'Alerts', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' },
  { href: '/dashboard/voice-analytics', label: 'Voice Analytics', icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m-4-1h8M12 1a3 3 0 00-3 3v4a3 3 0 006 0V4a3 3 0 00-3-3z' },
];

function MockLogin({ onLogin }: { onLogin: (role: Role) => void }) {
  const roles = [
    {
      role: 'pharma_admin' as Role,
      title: 'Pharma Admin',
      description: 'Full dashboard view with program management, analytics, and patient oversight.',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    },
    {
      role: 'care_coordinator' as Role,
      title: 'Care Coordinator',
      description: 'Patient-focused view with alerts, interactions, and escalation management.',
      icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    },
    {
      role: 'patient' as Role,
      title: 'Patient',
      description: 'Patient companion experience with medication tracking and communication history.',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    },
  ];

  return (
    <div className="min-h-screen bg-dash-bg flex items-center justify-center px-6">
      <div className="max-w-xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-semibold text-dash-text mb-2">adhery dashboard</h1>
          <p className="text-sm text-dash-text-secondary">Select a role to explore the prototype</p>
        </div>
        <div className="space-y-3">
          {roles.map((r) => (
            <button
              key={r.role}
              onClick={() => onLogin(r.role)}
              className="w-full flex items-start gap-4 bg-dash-bg-tertiary border border-dash-border hover:border-dash-accent p-5 text-left transition-all group"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-dash-accent/10 text-dash-accent flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d={r.icon} />
                </svg>
              </div>
              <div>
                <p className="font-medium text-dash-text group-hover:text-dash-accent transition-colors">
                  Log in as {r.title}
                </p>
                <p className="text-xs text-dash-text-secondary mt-1">{r.description}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto mt-2 text-dash-text-muted group-hover:text-dash-accent transition-colors">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
        <p className="text-center text-xs text-dash-text-muted mt-8">
          This is a prototype. No real authentication required.
        </p>
      </div>
    </div>
  );
}

function Sidebar() {
  const pathname = usePathname();
  const { role, setRole } = useRole();

  return (
    <aside className="w-56 bg-dash-bg-secondary border-r border-dash-border flex flex-col h-screen fixed left-0 top-0">
      <div className="p-4 border-b border-dash-border">
        <Link href="/dashboard/overview" className="text-lg font-semibold text-dash-text">
          adhery
        </Link>
        <p className="text-[10px] text-dash-text-muted mt-0.5 uppercase tracking-wider">
          {role === 'pharma_admin' ? 'Admin' : role === 'care_coordinator' ? 'Coordinator' : 'Patient'}
        </p>
      </div>

      <nav className="flex-1 py-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'text-dash-accent bg-dash-accent/10 border-l-2 border-dash-accent'
                  : 'text-dash-text-secondary hover:text-dash-text hover:bg-dash-bg-tertiary border-l-2 border-transparent'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d={item.icon} />
              </svg>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-dash-border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 bg-dash-accent/20 text-dash-accent flex items-center justify-center text-xs font-bold">
            BV
          </div>
          <div>
            <p className="text-xs text-dash-text font-medium">BioVista Pharmacy</p>
            <p className="text-[10px] text-dash-text-muted">Specialty</p>
          </div>
        </div>
        <button
          onClick={() => setRole(null)}
          className="text-[10px] text-dash-text-muted hover:text-dash-text transition-colors"
        >
          Switch role &rarr;
        </button>
      </div>
    </aside>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>(null);

  if (!role) {
    return (
      <RoleContext.Provider value={{ role, setRole }}>
        <MockLogin onLogin={setRole} />
      </RoleContext.Provider>
    );
  }

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      <div className="min-h-screen bg-dash-bg text-dash-text">
        <Sidebar />
        <main className="ml-56 p-6">{children}</main>
      </div>
    </RoleContext.Provider>
  );
}
