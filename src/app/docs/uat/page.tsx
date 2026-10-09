import { ArrowRight, Lock } from 'lucide-react';
import { getSession, LOGIN_URL } from '@/lib/docsAuth';
import UatCredentialsClient from '@/components/uat/UatCredentialsClient';

export const metadata = { title: 'UAT Credentials | SabbPe Developer Docs', description: 'Sandbox credentials for testing SabbPe products. Do not use in production.' };
export const dynamic = 'force-dynamic';

export default async function UatPage() {
  const session = await getSession();

  if (!session) {
    return (
      <article className="max-w-2xl">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0457F1]">UAT</p>
        <h1 className="mt-2 text-[34px] font-semibold leading-tight tracking-tight sm:text-[40px]">UAT Credentials</h1>
        <div className="mt-5 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6">
          <div className="flex items-start gap-3">
            <Lock className="mt-0.5 h-5 w-5 shrink-0 text-[#0457F1]" />
            <div>
              <p className="text-[16px] font-semibold">Sign up or log in to see the test credentials</p>
              <p className="mt-1 text-[14px] leading-relaxed text-[#475569]">UAT merchant and API credentials are available with a free developer account.</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href="/signup?next=/docs/uat" className="inline-flex min-h-[44px] items-center rounded-lg bg-[#0457F1] px-4 py-2.5 text-[14px] font-semibold text-white hover:bg-[#0346C4] sm:min-h-0">Create developer account</a>
            <a href={`${LOGIN_URL}?next=/docs/uat`} className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-[14px] font-semibold text-[#0F172A] hover:border-[#0457F1] sm:min-h-0">Log in<ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
          </div>
        </div>
      </article>
    );
  }

  return <UatCredentialsClient />;
}
