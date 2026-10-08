'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Wrap } from './ui';

const PARTNERS = [
  { name: 'Yes Bank', category: 'Banking' },
  { name: 'NTT Data', category: 'Processing' },
  { name: 'Mswipe', category: 'POS Network' },
  { name: 'Vi', category: 'Telecom' },
  { name: 'Innoviti', category: 'Payment Tech' },
  { name: 'ValueDesign', category: 'Gift Cards' },
  { name: 'PAX Global', category: 'Terminals' },
  { name: 'Google Workspace', category: 'Enterprise' },
];

function Logo({ name, category }: { name: string; category: string }) {
  return (
    <div className="flex h-11 items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-4 py-2 shadow-2xs">
      <span className="h-2 w-2 rounded-full bg-[#0457F1]" />
      <span className="text-xs font-bold text-[#0F172A]">{name}</span>
      <span className="text-[10px] text-slate-400 font-mono">({category})</span>
    </div>
  );
}

export default function PartnerMarquee() {
  const reduce = useReducedMotion();

  return (
    <section className="border-y border-slate-100 bg-[#F8FAFC]/60 text-[#0F172A]">
      <Wrap className="flex flex-col items-center gap-5 py-10">
        <div className="text-[13px] font-bold uppercase tracking-wider text-slate-500">
          Built with leading banks and payment networks
        </div>
        {reduce ? (
          <div className="flex flex-wrap items-center justify-center gap-4">
            {PARTNERS.map((partner) => (
              <Logo key={partner.name} {...partner} />
            ))}
          </div>
        ) : (
          <div className="w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
            <motion.div
              className="flex w-max items-center gap-6"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
            >
              {[...PARTNERS, ...PARTNERS].map((partner, index) => (
                <Logo key={`${partner.name}-${index}`} {...partner} />
              ))}
            </motion.div>
          </div>
        )}
      </Wrap>
    </section>
  );
}
