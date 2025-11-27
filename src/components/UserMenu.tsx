'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type SessionInfo = {
  authenticated: boolean;
  role: string | null;
};

export function UserMenu() {
  const router = useRouter();
  const [session, setSession] = useState<SessionInfo | null>(null);

  useEffect(() => {
    let active = true;
    fetch('/api/session')
      .then((res) => res.json())
      .then((data: SessionInfo) => {
        if (!active) return;
        setSession(data);
      })
      .catch(() => {
        if (!active) return;
        setSession({ authenticated: false, role: null });
      });
    return () => {
      active = false;
    };
  }, []);

  async function handleLogout() {
    try {
      await fetch('/api/session', { method: 'DELETE' });
    } catch {
      // ignore
    }
    router.push('/');
    router.refresh();
  }

  if (!session || !session.authenticated) {
    return (
      <a
        href="/auth/login"
        className="inline-flex items-center justify-center rounded-lg border-2 border-blue-600 bg-white px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-all"
      >
        Sign In
      </a>
    );
  }

  const label = session.role ? `${session.role}` : 'User';

  return (
    <div className="flex items-center gap-3">
      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
        <span className="text-xs font-semibold text-blue-700">{label}</span>
      </div>
      <button
        type="button"
        onClick={handleLogout}
        className="inline-flex items-center justify-center rounded-lg border-2 border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all"
      >
        Logout
      </button>
    </div>
  );
}

