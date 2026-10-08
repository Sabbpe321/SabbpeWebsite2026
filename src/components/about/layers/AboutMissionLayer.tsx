'use client';

import { motion } from 'framer-motion';
import { Target, Lightbulb, Users, Globe, CheckCircle } from 'lucide-react';
import { useRef, useState } from 'react';

const missions = [
  {
    title: 'Our Mission',
    desc: 'Simplify and unify the financial ecosystem for everyone — making digital payments accessible to every merchant and consumer across India.',
    icon: Target,
    color: 'from-blue-900/20 to-indigo-900/20',
    accent: 'text-blue-400',
  },
  {
    title: 'Our Vision',
    desc: 'Become India\'s most trusted digital payments partner — empowering businesses with innovative, secure, and human-centric financial solutions.',
    icon: Lightbulb,
    color: 'from-yellow-900/20 to-orange-900/20',
    accent: 'text-yellow-400',
  },
  {
    title: 'Our Values',
    desc: 'Innovation, Trust, and Human-Centric Design. We understand real-world pain points and solve them with integrity, empathy, and technology.',
    icon: Users,
    color: 'from-purple-900/20 to-pink-900/20',
    accent: 'text-purple-400',
  },
  {
    title: 'What We Solve',
    desc: 'Fragmented payment infrastructure, high integration costs, settlement delays, manual reconciliation, and limited access to financial tools for small and mid-size merchants.',
    icon: Globe,
    color: 'from-cyan-900/20 to-teal-900/20',
    accent: 'text-cyan-400',
  },
];

function MissionCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 flex flex-col justify-between h-[260px] group transition-transform hover:-translate-y-1 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(34,211,238,0.12), transparent 40%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

export default function AboutMissionLayer() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-16">

      {/* Founding Story */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full max-w-4xl"
      >
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-sabbpe-cyan font-bold mb-3">How It All Started</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Our Founding Story</h2>
        </div>

        <div className="relative p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sabbpe-blue via-sabbpe-cyan to-sabbpe-teal opacity-60" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-sabbpe-blue/10 rounded-full blur-[80px]" />

          <div className="relative z-10 space-y-5 text-slate-300 text-base md:text-lg leading-relaxed">
            <p>
              <span className="text-white font-bold">SabbPe was born from a simple but powerful observation:</span> India's
              payment landscape was deeply fragmented. Merchants struggled with multiple disconnected systems,
              settlement delays drained their working capital, and the technology to fix it existed — but no one had unified it.
            </p>
            <p>
              In <span className="text-sabbpe-cyan font-semibold">2023</span>, a team of seasoned banking and fintech professionals
              — with combined experience spanning ICICI Bank, HDFC, First Data, PayTm, HUL, and global banking institutions
              in Singapore and the Middle East — came together with one goal: <span className="text-white font-semibold">simplify and unify India's financial ecosystem.</span>
            </p>
            <p>
              We started with UPI SoundBox devices, listening closely to merchants at the ground level. That human-centric
              approach shaped everything — from our payment gateway to our gift voucher platform to our AI-powered operations stack.
              Today, SabbPe serves <span className="text-white font-semibold">500+ merchants</span> across India, backed by{' '}
              <span className="text-white font-semibold">50+ banking and fintech alliances</span>, recognized by{' '}
              <span className="text-white font-semibold">DPIIT</span> and the{' '}
              <span className="text-white font-semibold">Government of Karnataka</span>, and certified{' '}
              <span className="text-white font-semibold">ISO 27001:2022</span>.
            </p>
            <p>
              We are not just building payment infrastructure — we are building the financial operating system
              for the next generation of Indian businesses.
            </p>
          </div>

          {/* Founder Video */}
          <div className="relative z-10 mt-8">
            <p className="text-xs uppercase tracking-widest text-sabbpe-cyan font-bold mb-3">In His Own Words</p>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black">
              <iframe
                className="w-full h-full"
                src="https://drive.google.com/file/d/1fPJaXTnB5hofR8JjDu4eOn5ipbarfG9C/preview"
                title="SabbPe intro video"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          <div className="relative z-10 mt-8 flex flex-wrap gap-4">
            {[
              'DPIIT Recognized',
              'ISO 27001:2022 Certified',
              'Karnataka Startup Cell',
              'IIM Lucknow Incubated',
              'PCI-DSS Compliant Stack',
            ].map((badge, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-white/60">
                <CheckCircle className="w-3 h-3 text-sabbpe-cyan" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Mission/Vision/Values Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full"
      >
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-sabbpe-cyan font-bold mb-3">What Drives Us</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white">Our Purpose & Values</h2>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {missions.map((mission, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <MissionCard>
                <div className={`absolute inset-0 ${mission.color} opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-2xl`} />
                <div className="relative z-20 flex justify-between items-start">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white group-hover:bg-white/10">
                    <mission.icon className={`w-5 h-5 ${mission.accent}`} />
                  </div>
                </div>
                <div className="relative z-20 mt-auto">
                  <h3 className="text-lg font-bold text-white mb-2">{mission.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{mission.desc}</p>
                </div>
              </MissionCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
