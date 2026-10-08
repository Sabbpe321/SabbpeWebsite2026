'use client';

import { motion } from 'framer-motion';
import { Linkedin, ExternalLink } from 'lucide-react';

const team = [
  {
    name: 'Dr. Hemanth Veeramalla',
    role: 'Managing Director',
    experience: 'ICICI Bank · HDFC · First Data · Reliance Jio · PayTm · Innoviti',
    bio: 'A Ph.D. in Management with CPISI certification from SISA and 18 years of deep expertise in e-commerce, merchant acquiring, and retail sales. A seasoned fintech leader with a proven track record of building and scaling financial infrastructure across India.',
    linkedin: 'https://www.linkedin.com/in/dr-hemanth-veeramalla',
    initials: 'HV',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Suresh Sabbani',
    role: 'Chief Financial Officer',
    experience: 'ICICI Bank · HDFC · SBI · RBL',
    bio: 'A CAIIB-certified banking professional with 25+ years across all functional areas of retail banking. Holds certifications in IPGDRM, CTF, AML KYC, AMFI, and IRDA. Expert in financial planning, risk management, and regulatory compliance.',
    linkedin: 'https://www.linkedin.com/in/suresh-sabbani-bb464139/',
    initials: 'SS',
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Suman Babu',
    role: 'VP — Engineering',
    experience: 'International Banking · Singapore · Middle East · Fintech',
    bio: 'A technology architect with 15+ years of international experience scaling core banking platforms across Singapore and the Middle East. Brings rare depth in building resilient, high-throughput financial systems that operate at enterprise scale.',
    linkedin: 'https://www.linkedin.com/in/sampostbox83',
    initials: 'SB',
    color: 'from-orange-500 to-red-500',
  },
  {
    name: 'Shubhang Balodi',
    role: 'Head of Product',
    experience: 'Amazon · Samsung · LG · Innoviti · TCS',
    bio: '12+ years of product leadership across consumer electronics and fintech. Launched 100+ products across 5,000+ retail touchpoints at LG, Samsung, and Amazon, transforming customer experience for over 10,000 daily shoppers.',
    linkedin: 'https://www.linkedin.com/in/shubhang-balodi',
    initials: 'SHB',
    color: 'from-cyan-500 to-blue-600',
  },
];

export default function AboutTeamLayer() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl"
      >
        <p className="text-xs uppercase tracking-widest text-sabbpe-cyan font-bold mb-3">The People Behind SabbPe</p>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
          Leadership Team
        </h2>
        <p className="text-slate-400 text-lg">
          Built on the pillars of trust and empathy — our team brings together decades of collective experience across banking, technology, and product innovation.
        </p>
      </motion.div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300"
          >
            {/* Avatar */}
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center font-black text-white text-lg flex-shrink-0 shadow-lg`}>
                {member.initials}
              </div>
              <div>
                <h3 className="text-white font-bold text-base leading-tight">{member.name}</h3>
                <p className={`text-xs font-bold bg-gradient-to-r ${member.color} bg-clip-text text-transparent mt-0.5`}>{member.role}</p>
              </div>
            </div>

            {/* Experience */}
            <p className="text-[10px] text-white/30 font-semibold uppercase tracking-wider mb-3">{member.experience}</p>

            {/* Bio */}
            <p className="text-sm text-slate-400 leading-relaxed mb-4">{member.bio}</p>

            {/* LinkedIn */}
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/40 hover:text-sabbpe-cyan transition-colors group/link"
            >
              <Linkedin className="w-3.5 h-3.5" />
              LinkedIn Profile
              <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
