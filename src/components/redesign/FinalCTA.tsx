'use client';

import clsx from 'clsx';
import DemoModal from '@/components/modals/DemoModal';
import { FOCUS, H2, Wrap } from './ui';

/** Answers reused from the FAQ already on the Services page. */
const FAQS = [
  {
    question: 'How fast can we go live?',
    answer: 'Most businesses can go live within 24-48 hours after completing KYC verification. Our onboarding team will guide you through the entire process.',
  },
  {
    question: 'How does settlement work?',
    answer:
      'We offer flexible settlement cycles including T+0 (same day) and T+1 (next day) options. All settlements are automatically reconciled and deposited to your registered bank account.',
  },
  {
    question: 'Do you support recurring payments?',
    answer: 'Yes. We support automated recurring payments, subscription management, and mandate-based collections for both UPI and cards.',
  },
  {
    question: 'Do you support API integration?',
    answer: 'Yes, we provide REST APIs with detailed documentation, SDKs for popular languages, and dedicated developer support to help you integrate.',
  },
];

export default function FinalCTA() {
  return (
    <section className="border-t border-slate-200/60 bg-white text-[#0F172A]">
      <Wrap className="grid gap-12 py-24 sm:py-28 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-5">
          <h2 className={clsx(H2, 'text-[#0F172A]')}>Still waiting days for your money?</h2>
          <p className="max-w-[460px] text-lg leading-relaxed text-[#475569]">
            Move to SabbPe for collections and disbursements, and switch on Gift360 when you want your customers to come back.
          </p>
          <DemoModal
            trigger={
              <button
                type="button"
                className={clsx(
                  'rounded-lg bg-[#0457F1] px-6 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-[#0339A8]',
                  FOCUS,
                )}
              >
                Book a demo
              </button>
            }
          />
        </div>
        <div className="border-t border-slate-200">
          {FAQS.map((faq) => (
            <details key={faq.question} className="group border-b border-slate-200 py-[18px]">
              <summary
                className={clsx(
                  'flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-bold text-[#0F172A] [&::-webkit-details-marker]:hidden',
                  FOCUS,
                )}
              >
                {faq.question}
                <span className="text-2xl font-normal leading-none text-[#0457F1] transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-2.5 text-sm leading-relaxed text-[#475569]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
