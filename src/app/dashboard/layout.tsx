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

interface NavItem {
  href: string;
  label: string;
  icon: string;
  roles: Role[];
}

const navItems: NavItem[] = [
  {
    href: '/dashboard/overview',
    label: 'Overview',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4',
    roles: ['pharma_admin', 'care_coordinator'],
  },
  {
    href: '/dashboard/programs',
    label: 'Programs',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    roles: ['pharma_admin'],
  },
  {
    href: '/dashboard/patients',
    label: 'Patients',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    roles: ['pharma_admin', 'care_coordinator'],
  },
  {
    href: '/dashboard/alerts',
    label: 'Interventions',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    roles: ['pharma_admin', 'care_coordinator'],
  },
  {
    href: '/dashboard/voice-analytics',
    label: 'Voice Analytics',
    icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m-4-1h8M12 1a3 3 0 00-3 3v4a3 3 0 006 0V4a3 3 0 00-3-3z',
    roles: ['pharma_admin'],
  },
];

// Patient sees a simplified companion nav
const patientNavItems: NavItem[] = [
  {
    href: '/dashboard/overview',
    label: 'My Medications',
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    roles: ['patient'],
  },
  {
    href: '/dashboard/patients',
    label: 'My Timeline',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    roles: ['patient'],
  },
];

function MockLogin({ onLogin }: { onLogin: (role: Role) => void }) {
  const roles = [
    {
      role: 'pharma_admin' as Role,
      title: 'Pharma Admin',
      description: 'Full dashboard with program management, analytics, voice insights, and patient oversight.',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    },
    {
      role: 'care_coordinator' as Role,
      title: 'Care Coordinator',
      description: 'Patient-focused view with alerts, interaction timelines, and escalation management.',
      icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    },
    {
      role: 'patient' as Role,
      title: 'Patient',
      description: 'Your medication companion with dose tracking, communication history, and support.',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-xl w-full">
        <div className="text-center mb-10">
          <Link href="/" className="flex items-center gap-2 text-2xl font-semibold text-foreground tracking-tight">
            <img src="/logo.svg" alt="" className="w-8 h-8" />
            adhery
          </Link>
          <p className="text-sm text-text-secondary mt-2">Select a role to explore the dashboard</p>
        </div>
        <div className="space-y-3">
          {roles.map((r) => (
            <button
              key={r.role}
              onClick={() => onLogin(r.role)}
              className="w-full flex items-start gap-4 bg-white border border-border-light rounded-xl hover:border-accent hover:shadow-md p-5 text-left transition-all group"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-accent/10 text-accent flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d={r.icon} />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground group-hover:text-accent transition-colors">
                  Log in as {r.title}
                </p>
                <p className="text-xs text-text-secondary mt-1">{r.description}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-2 text-text-muted group-hover:text-accent transition-colors">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
        <p className="text-center text-xs text-text-muted mt-8">
          This is a prototype. No real authentication required.
        </p>
      </div>
    </div>
  );
}

function Sidebar() {
  const pathname = usePathname();
  const { role, setRole } = useRole();

  const isPatient = role === 'patient';
  const items = isPatient ? patientNavItems : navItems.filter((item) => item.roles.includes(role!));

  const roleLabels: Record<string, string> = {
    pharma_admin: 'Administrator',
    care_coordinator: 'Care Coordinator',
    patient: 'Patient Portal',
  };

  return (
    <aside className="w-56 bg-white border-r border-border-light flex flex-col h-screen fixed left-0 top-0">
      <div className="p-4 border-b border-border-light">
        <Link href="/dashboard/overview" className="flex items-center gap-2 text-lg font-semibold text-foreground tracking-tight">
          <img src="/logo.svg" alt="" className="w-6 h-6" />
          adhery
        </Link>
        <p className="text-[10px] text-accent mt-0.5 font-medium uppercase tracking-wider">
          {roleLabels[role || '']}
        </p>
      </div>

      <nav className="flex-1 py-3">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'text-accent bg-accent/5 border-l-2 border-accent'
                  : 'text-text-secondary hover:text-foreground hover:bg-surface-warm border-l-2 border-transparent'
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

      <div className="p-4 border-t border-border-light">
        {!isPatient ? (
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-xs font-bold">
              BV
            </div>
            <div>
              <p className="text-xs text-foreground font-medium">BioVista Pharmacy</p>
              <p className="text-[10px] text-text-muted">Specialty</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-xs font-bold">
              MG
            </div>
            <div>
              <p className="text-xs text-foreground font-medium">Maria Garcia</p>
              <p className="text-[10px] text-text-muted">GLP-1 Program</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setRole(null)}
          className="text-[10px] text-text-muted hover:text-accent transition-colors"
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
      <div className="min-h-screen bg-background text-foreground">
        <Sidebar />
        <main className="ml-56 p-6">{children}</main>
      </div>
    </RoleContext.Provider>
  );
}
