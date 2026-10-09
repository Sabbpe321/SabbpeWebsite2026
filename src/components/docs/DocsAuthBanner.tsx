import { ArrowRight, Lock } from 'lucide-react';
import { LOGIN_URL } from '@/lib/docsAuth';

export default function DocsAuthBanner({ session }: { session: { email: string } | null }) {
  if (session) {
    return (
      <form action="/api/auth/logout" method="post" className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#BBF7D0] bg-[#F0FDF4] px-5 py-4">
        <p className="text-[15px] text-[#166534]">
          Logged in as <span className="font-semibold">{session.email}</span>. Full API details and endpoints are unlocked.
        </p>
        <button
          type="submit"
          className="rounded-lg border border-[#86EFAC] bg-white px-3.5 py-2 text-[14px] font-semibold text-[#166534] hover:bg-[#DCFCE7] transition-colors"
        >
          Log out
        </button>
      </form>
    );
  }

  return (
    <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-5 shadow-2xs sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100/80 text-[#0457F1]">
          <Lock className="h-4 w-4 text-[#0457F1]" />
        </div>
        <p className="text-[15px] leading-relaxed text-[#1E3A8A]">
          Guides and videos are open to everyone. API details are shown to developers after they sign up and log in.
        </p>
      </div>
      <div className="flex shrink-0 gap-2.5">
        <a
          href="/signup?next=/docs"
          className="inline-flex items-center justify-center rounded-xl border border-[#0457F1] bg-white px-4 py-2.5 text-[14px] font-semibold text-[#0457F1] hover:bg-[#EEF5FF] transition-colors"
        >
          Sign up
        </a>
        <a
          href={`${LOGIN_URL}?next=/docs`}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0457F1] px-4 py-2.5 text-[14px] font-semibold text-white shadow-2xs hover:bg-[#0346C4] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0457F1]"
        >
          <span>Log in</span>
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
