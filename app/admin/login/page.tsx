'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, ArrowLeft, ShieldCheck, KeyRound } from 'lucide-react';
import VidyadhariLogo from '@/components/brand/VidyadhariLogo';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok) {
        router.push('/admin');
      } else {
        setErrorMsg(data.error || 'Authentication failed. Please check credentials.');
      }
    } catch {
      setErrorMsg('Network or server connection error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F0F7FF] flex items-center justify-center p-4 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00A3E0]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-white border-2 border-sky-100 shadow-2xl relative z-10 text-slate-800">
        {/* Top return link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#002B66] font-semibold transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Vidyadhari Campus</span>
        </Link>

        <div className="text-center mb-8 flex flex-col items-center">
          <VidyadhariLogo size="lg" showText={false} className="mb-4" />

          <h1 className="font-serif text-2xl font-bold text-[#002B66]">
            Administrative Portal
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Vidyadhari High School • Secure Access
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#002B66] mb-1">
              Admin Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8FAFC] border border-sky-200 text-sm text-slate-800 placeholder-slate-400 focus:border-[#00A3E0] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#002B66] mb-1">
              Secure Passcode
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8FAFC] border border-sky-200 text-sm text-slate-800 placeholder-slate-400 focus:border-[#00A3E0] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#002B66] hover:bg-[#001D47] shadow-lg shadow-[#002B66]/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#00A3E0]" />
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            </button>
          </div>
        </form>

        <div className="mt-8 pt-4 border-t border-sky-100 text-center text-[11px] text-slate-500">
          Default administrative credentials: <br />
          Username: <span className="text-[#002B66] font-mono font-bold">admin</span> • Passcode: <span className="text-[#002B66] font-mono font-bold">Vidyadhari@2026</span>
        </div>
      </div>
    </div>
  );
}
