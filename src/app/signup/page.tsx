import { redirect } from 'next/navigation';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/premium/Footer';
import AuthForm from '@/app/login/LoginForm';
import { isLoggedIn, safeNext } from '@/lib/docsAuth';

export const metadata = { title: 'Developer Sign Up | SabbPe', description: 'Create a SabbPe developer account.' };

export default async function Page({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const next = safeNext((await searchParams).next);
  if (await isLoggedIn()) redirect(next);
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Navbar />
      <main className="flex justify-center px-5 pb-20 pt-32 sm:pt-40">
        <div className="w-full max-w-[420px] rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
          <h1 className="text-[26px] font-semibold tracking-tight">Create a developer account</h1>
          <p className="mt-2 text-[15px] leading-relaxed text-[#475569]">Enter your email and we will send you a link to confirm it. After confirming, you will choose a password to finish signing up.</p>
          <div className="mt-6"><AuthForm mode="signup" next={next} /></div>
          <p className="mt-6 border-t border-slate-100 pt-5 text-[14px] text-[#475569]">Already have an account? <a href={`/login?next=${encodeURIComponent(next)}`} className="font-semibold text-[#0457F1] hover:underline">Log in</a></p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
