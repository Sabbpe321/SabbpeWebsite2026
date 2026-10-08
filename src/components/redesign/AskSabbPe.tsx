'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import clsx from 'clsx';
import { ArrowUp } from 'lucide-react';
import { Chip, FOCUS, H2, Wrap } from './ui';

/** Show only questions the live assistant can answer. The answers below are scripted samples. */
const QUESTIONS = [
  {
    text: 'Why is yesterday\u2019s settlement lower than my sales?',
    answer:
      'Three payments from late last night are still with the bank and will settle in the next cycle. Two refunds were also deducted. Open the settlement report to see each one.',
  },
  {
    text: 'Show failed UPI payments from the last 7 days.',
    answer:
      'Here are the failed UPI payments for the past week, grouped by reason. Most failed because the customer\u2019s bank did not respond in time. You can resend a payment link to each customer from this list.',
  },
  {
    text: 'Which customers have not come back in 60 days?',
    answer: 'Here is the list from Gift360, sorted by how much each customer has spent with you. You can send all of them a cashback offer from this screen.',
  },
  {
    text: 'Create a payment link for 2,500 rupees.',
    answer: 'Your payment link for 2,500 rupees is ready. Share it by WhatsApp, SMS or email, and you will be notified when it is paid.',
  },
];

const HOLD_MS = 2600;

/** Questions play in turn: the answer types out, holds, then the next question starts. Clicking one stops the rotation. */
export default function AskSabbPe() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [typed, setTyped] = useState(0);
  const [auto, setAuto] = useState(true);
  const answer = QUESTIONS[active].answer;
  const done = reduce || typed >= answer.length;

  useEffect(() => {
    if (!inView || reduce) return;
    if (typed < answer.length) {
      const timer = setTimeout(() => setTyped((count) => Math.min(answer.length, count + 3)), 22);
      return () => clearTimeout(timer);
    }
    if (!auto) return;
    const timer = setTimeout(() => {
      setTyped(0);
      setActive((index) => (index + 1) % QUESTIONS.length);
    }, HOLD_MS);
    return () => clearTimeout(timer);
  }, [typed, answer.length, inView, reduce, auto]);

  const pick = (index: number) => {
    setAuto(false);
    setTyped(0);
    setActive(index);
  };

  return (
    <section className="border-t border-slate-100 bg-white py-24">
      <Wrap>
        <div className="flex flex-col gap-9 text-[#0F172A]">
          <div className="flex flex-col items-center gap-4 text-center">
            <Chip>SabbPe AI</Chip>
            <h2 className={clsx(H2, 'max-w-[720px] text-[#0F172A]')}>
              Ask anything. <span className="text-[#0457F1]">SabbPe AI</span> already knows your payments.
            </h2>
          </div>

          <div ref={ref} className="grid gap-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
            <div className="flex flex-col gap-2.5">
              {QUESTIONS.map((question, index) => (
                <button
                  key={question.text}
                  type="button"
                  aria-pressed={index === active}
                  onClick={() => pick(index)}
                  className={clsx(
                    'relative min-h-[56px] overflow-hidden rounded-xl border px-4 py-3.5 text-left transition-all',
                    FOCUS,
                    index === active
                      ? 'border-[#0457F1] bg-[#EFF6FF] font-bold text-[#0F172A] shadow-2xs'
                      : 'border-slate-200 bg-white text-[#334155] hover:border-slate-300',
                  )}
                >
                  {question.text}
                  {index === active && auto && !reduce && (
                    <motion.span
                      key={`${active}-${done}`}
                      className="absolute bottom-0 left-0 h-[3px] bg-[#0457F1]"
                      initial={{ width: done ? '55%' : '0%' }}
                      animate={{ width: done ? '100%' : '55%' }}
                      transition={{ duration: done ? HOLD_MS / 1000 : (answer.length / 3) * 0.022, ease: 'linear' }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="flex min-h-[360px] flex-col gap-4 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm sm:p-7">
              <div className="max-w-[85%] self-end rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm font-semibold text-[#0F172A] shadow-2xs">
                {QUESTIONS[active].text}
              </div>
              <div className="text-[12px] font-bold uppercase tracking-wider text-[#0457F1]">Sample answer</div>
              <p className="max-w-[540px] text-[15px] leading-relaxed text-[#334155]" aria-live="polite">
                {reduce ? answer : answer.slice(0, typed)}
                {!done && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-[#0457F1]" aria-hidden="true" />}
              </p>
              <div className="mt-auto flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-2xs">
                <span className="flex-1 text-sm text-[#64748B]">Ask a question about your payments...</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0457F1] text-white shadow-2xs" aria-hidden="true">
                  <ArrowUp className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
