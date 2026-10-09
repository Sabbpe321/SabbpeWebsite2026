'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Chip, Wrap } from './ui';

const STATEMENT =
  'Most payment platforms stop at the transaction. SabbPe collects and disburses your money across gateways, and Gift360 turns the same customers into repeat buyers in one click.';

const UNFILLED = '#94A3B8';
const FILLED = '#0F172A';

function Word({ text, progress, range }: { text: string; progress: MotionValue<number>; range: [number, number] }) {
  const color = useTransform(progress, range, [UNFILLED, FILLED]);
  return <motion.span style={{ color }}>{text} </motion.span>;
}

/** The statement fills in word by word as it scrolls through the viewport. */
export default function WhyStatement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = STATEMENT.split(' ');

  return (
    <section className="border-y border-slate-200/60 bg-[#F8FAFC]">
      <Wrap className="flex flex-col items-center gap-3.5 py-10 text-center sm:py-12">
        <Chip>Why SabbPe</Chip>
        <p ref={ref} className="max-w-[880px] font-display text-[24px] font-bold leading-[1.3] tracking-[-0.015em] sm:text-[32px] lg:text-[38px]">
          {reduce
            ? <span className="text-[#0F172A]">{STATEMENT}</span>
            : words.map((word, index) => <Word key={`${word}-${index}`} text={word} progress={scrollYProgress} range={[index / words.length, (index + 1) / words.length]} />)}
        </p>
      </Wrap>
    </section>
  );
}
