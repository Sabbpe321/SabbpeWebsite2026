import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/premium/Footer';
import CompleteSignupForm from '@/app/verify/CompleteSignupForm';
import { getStore } from '@/lib/devStore';
import { hashToken } from '@/lib/authUtil';

export const metadata = { title: 'Confirm Email | SabbPe' };
export const dynamic = 'force-dynamic';

export default async function VerifyPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const token = (await searchParams).token ?? '';
  let pendingId: string | null = null;
  if (token) { try { pendingId = (await (await getStore()).findPendingByTokenHash(hashToken(token)))?.id ?? null; } catch (e) { console.error('[verify] failed', e); } }
  const valid = pendingId !== null;
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Navbar />
      <main className="flex justify-center px-5 pb-20 pt-32 sm:pt-40">
        <div className="w-full max-w-[420px] rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm sm:p-8">
          <h1 className="text-[26px] font-semibold tracking-tight">{valid ? 'Email confirmed' : 'This link did not work'}</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-[#475569]">{valid ? 'Your email is confirmed. Choose a password to finish creating your developer account.' : 'The link is invalid or has expired. Sign up again with your email and we will send you a new one.'}</p>
          {valid
            ? <div className="mt-6"><CompleteSignupForm token={token} /></div>
            : <a href="/signup" className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#0457F1] px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-[#0346C4]">Sign up</a>}
        </div>
      </main>
      <Footer />
    </div>
  );
}
