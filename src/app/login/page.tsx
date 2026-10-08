import { redirect } from 'next/navigation';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/premium/Footer';
import AuthForm from '@/app/login/LoginForm';
import { isLoggedIn, safeNext } from '@/lib/docsAuth';

export const metadata = { title: 'Developer Login | SabbPe', description: 'Log in to the SabbPe developer docs.' };

export default async function Page({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const next = safeNext((await searchParams).next);
  if (await isLoggedIn()) redirect(next);
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Navbar />
      <main className="flex justify-center px-5 pb-20 pt-32 sm:pt-40">
        <div className="w-full max-w-[420px] rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
          <h1 className="text-[26px] font-semibold tracking-tight">Developer login</h1>
          <p className="mt-2 text-[15px] leading-relaxed text-[#475569]">Log in to see the API reference in the developer docs.</p>
          <div className="mt-6"><AuthForm mode="login" next={next} /></div>
          <p className="mt-6 border-t border-slate-100 pt-5 text-[14px] text-[#475569]">New here? <a href={`/signup?next=${encodeURIComponent(next)}`} className="font-semibold text-[#0457F1] hover:underline">Create a developer account</a></p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
