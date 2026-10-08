'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader2 } from 'lucide-react';

export default function AuthForm({ mode, next }: { mode: 'login' | 'signup'; next: string }) {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [done, setDone] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const payload = mode === 'signup' ? { email: form.email } : { email: form.email, password: form.password };
      const res = await fetch(`/api/auth/${mode}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        if (mode === 'login') { router.push(next); router.refresh(); return; }
        setDone(data.message ?? 'Check your inbox for a link to confirm your email.');
      } else setError(data.message ?? 'Something went wrong. Please try again.');
    } catch { setError('Something went wrong. Please try again.'); }
    setBusy(false);
  }

  if (done) return <p role="status" className="rounded-lg border border-[#BBF7D0] bg-[#F0FDF4] px-4 py-3 text-[15px] leading-relaxed text-[#166534]">{done}</p>;
  const input = 'mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-[15px] text-[#0F172A] outline-none focus:border-[#0457F1] focus:ring-2 focus:ring-[#0457F1]/20';
  const label = 'text-[14px] font-semibold text-[#0F172A]';
  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <div><label htmlFor="email" className={label}>Email</label><input id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={set('email')} className={input} /></div>
      {mode === 'login' && <div><label htmlFor="password" className={label}>Password</label><input id="password" name="password" type="password" autoComplete="current-password" required value={form.password} onChange={set('password')} className={input} /></div>}
      {error && <p role="alert" className="rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-3.5 py-2.5 text-[14px] text-[#B91C1C]">{error}</p>}
      <button type="submit" disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0457F1] px-4 py-3 text-[15px] font-semibold text-white hover:bg-[#0346C4] disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0457F1]">
        {busy ? <><Loader2 className="h-4 w-4 animate-spin" />Please wait</> : <>{mode === 'signup' ? 'Send verification link' : 'Log in'}<ArrowRight className="h-4 w-4" /></>}
      </button>
    </form>
  );
}
