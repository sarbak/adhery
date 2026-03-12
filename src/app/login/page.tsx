'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const next = searchParams.get('next') || '/';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(false);
    setSubmitting(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push(next);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <div className="flex items-center gap-2 mb-12 justify-center">
        <img src="/logo.svg" alt="" className="w-7 h-7 brightness-0 invert" />
        <span className="text-white text-xl font-semibold tracking-tight">adhery</span>
      </div>

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        required
        className="w-full bg-white/5 text-white px-4 py-3 border border-white/10 focus:border-white/30 outline-none text-sm placeholder:text-white/30 mb-4"
      />

      {error && (
        <p className="text-red-400 text-sm mb-4">Incorrect password.</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-white/10 hover:bg-white/15 text-white text-sm font-medium py-3 transition-colors disabled:opacity-50"
      >
        {submitting ? 'Verifying...' : 'Enter'}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] flex items-center justify-center px-6">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
