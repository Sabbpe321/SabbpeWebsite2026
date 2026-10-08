'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Users, Zap, Award, Shield, Star, CheckCircle } from 'lucide-react';
import Image from 'next/image';

const impacts = [
  { metric: '500+', label: 'Merchants Served', icon: Users, color: 'from-blue-500 to-cyan-500' },
  { metric: '50+', label: 'Banking & Fintech Alliances', icon: Award, color: 'from-purple-500 to-pink-500' },
  { metric: '99.9%', label: 'System Uptime', icon: Zap, color: 'from-orange-500 to-red-500' },
  { metric: '2023', label: 'Company Founded', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
];

const TABS = ['Partners', 'Incubators', 'Certifications'];

const partners = [
  { name: 'Yes Bank', logo: '/yes-bank.png' },
  { name: 'NTT Data', logo: '/ntt-data.png' },
  { name: 'Mswipe', logo: '/mswipe.png' },
  { name: 'Vi', logo: '/vi.png' },
  { name: 'Innoviti', logo: '/innoviti.png' },
  { name: 'ValueDesign', logo: '/valuedesign.png' },
  { name: 'PAX', logo: '/pax.png' },
  { name: 'Aisino', logo: '/aisino.png' },
  { name: 'Augmont', logo: '/augmont.png' },
  { name: 'Google Workspace', logo: '/google-workspace.png' },
];

const incubators = [
  { name: 'IIM Lucknow Incubator', logo: '/iim-lucknow.png', desc: 'Academic incubation backing our financial inclusion mission' },
  { name: 'NASSCOM Startups', logo: '/nasscom.png', desc: 'Industry incubation shaping our technology strategy' },
  { name: 'Wadhwani Foundation', logo: '/wadhwani.png', desc: 'Foundation support driving entrepreneurship and scale' },
];

const certifications = [
  {
    icon: Award,
    title: 'DPIIT — Startup India',
    subtitle: 'Certificate No. DIPP139027',
    desc: 'Recognized by the Department for Promotion of Industry and Internal Trade as a startup in Finance Technology & Payment Platforms.',
    issued: '17 Jul 2023',
    valid: '04 Jul 2033',
    color: 'from-blue-500 to-cyan-500',
    image: '/dpiit.png',
  },
  {
    icon: Star,
    title: 'Government of Karnataka',
    subtitle: 'No. KITS/SK-REGN/2024-25/3243',
    desc: 'Registered as a Startup with the Karnataka Startup Cell. Directorate of Electronics, Information Technology & Biotechnology.',
    issued: '05 Jul 2023',
    valid: '10 years from incorporation',
    color: 'from-purple-500 to-pink-500',
    image: '/karnataka.png',
  },
  {
    icon: Shield,
    title: 'ISO 27001:2022',
    subtitle: 'Cert No. IN/34524448/7198',
    desc: 'Certified by ICV Assessments (IAF & EGAC accredited) for Information Security Management Systems covering Payment Solutions, Gift Vouchers, and SME Technology Infrastructure.',
    issued: '13 Apr 2026',
    valid: '12 Apr 2029',
    color: 'from-green-500 to-emerald-500',
    image: '/iso-27001.png',
  },
  {
    icon: Zap,
    title: 'M2M Telecom License',
    subtitle: 'Reg No. KTK/M/100425/0325',
    desc: 'Registered as M2M Service Provider by the Ministry of Communication, Department of Telecommunications, Government of India.',
    issued: '10 Mar 2025',
    valid: 'Active',
    color: 'from-orange-500 to-red-500',
    image: '/m2m-telecom.png',
  },
  {
    icon: CheckCircle,
    title: 'PCI-DSS Compliant',
    subtitle: 'Payment Card Industry Standard',
    desc: 'Our technology stack is built to be fully compliant with the Payment Card Industry Data Security Standard, ensuring the highest level of cardholder data protection.',
    issued: 'In Progress',
    valid: 'Coming Soon',
    color: 'from-cyan-500 to-blue-600',
    image: null,
  },
];

export default function AboutImpactLayer() {
  const [activeTab, setActiveTab] = useState('Partners');
  const [expandedCert, setExpandedCert] = useState<number | null>(null);

  return (
    <div id="our-impact" className="w-full h-full flex flex-col items-center justify-center space-y-12">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl">
        <p className="text-xs uppercase tracking-widest text-sabbpe-cyan font-bold mb-3">What We've Built</p>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Our Impact by Numbers</h2>
        <p className="text-slate-400 text-lg">Since 2023, transforming India's digital payments landscape with innovative solutions.</p>
      </motion.div>

      {/* Stats */}
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
        {impacts.map((impact, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.05] transition-all"
          >
            <div className={`absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br ${impact.color} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity`} />
            <div className="relative z-10">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${impact.color} flex items-center justify-center mb-3`}>
                <impact.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-display font-bold text-white mb-1">{impact.metric}</div>
              <p className="text-slate-400 text-xs">{impact.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="w-full">
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-6">Trusted By & Recognized For</h3>
          <div className="inline-flex bg-white/5 border border-white/10 rounded-2xl p-1 gap-1">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-sabbpe-blue to-sabbpe-cyan text-white shadow-lg'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >

            {/* Partners - scrolling marquee with logos */}
            {activeTab === 'Partners' && (
              <div className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-sabbpe-navy-dark to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-sabbpe-navy-dark to-transparent z-10" />
                <div className="flex gap-4" style={{ animation: 'marquee 25s linear infinite', width: 'max-content' }}>
                  {[...partners, ...partners].map((p, i) => (
                    <div key={i} className="flex-shrink-0 flex flex-col items-center justify-center gap-2 px-6" style={{ minWidth: '120px' }}>
                      <div className="relative w-24 h-12">
                        <Image src={p.logo} alt={p.name} fill className="object-contain drop-shadow-lg hover:brightness-125 transition-all" />
                      </div>
                      <span className="text-[10px] text-white/30 font-medium whitespace-nowrap">{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Incubators with logos */}
            {activeTab === 'Incubators' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {incubators.map((inc, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all text-center flex flex-col items-center gap-4"
                  >
                    <div className="relative w-36 h-16 bg-white/10 rounded-xl p-2">
                      <Image src={inc.logo} alt={inc.name} fill className="object-contain p-1" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">{inc.name}</h4>
                      <p className="text-slate-400 text-sm">{inc.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Certifications with actual certificate images */}
            {activeTab === 'Certifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all overflow-hidden group cursor-pointer"
                    onClick={() => setExpandedCert(expandedCert === i ? null : i)}
                  >
                    {/* Certificate image preview */}
                    {cert.image && (
                      <div className="relative w-full h-40 bg-white/5 overflow-hidden">
                        <Image
                          src={cert.image}
                          alt={cert.title}
                          fill
                          className="object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0d1829]/90" />
                      </div>
                    )}
                    {!cert.image && (
                      <div className={`w-full h-40 bg-gradient-to-br ${cert.color} opacity-10 flex items-center justify-center`}>
                        <cert.icon className="w-16 h-16 text-white/20" />
                      </div>
                    )}

                    {/* Details */}
                    <div className="p-5">
                      <div className="flex items-start gap-3 mb-2">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${cert.color} flex items-center justify-center flex-shrink-0`}>
                          <cert.icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-sm leading-tight">{cert.title}</h4>
                          <p className={`text-[10px] font-semibold bg-gradient-to-r ${cert.color} bg-clip-text text-transparent`}>{cert.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed mb-3">{cert.desc}</p>
                      <div className="flex items-center gap-3 text-[10px] text-white/30 mb-2">
                        <span>Issued: <span className="text-white/50 font-semibold">{cert.issued}</span></span>
                        <span>•</span>
                        <span>Valid: <span className="text-white/50 font-semibold">{cert.valid}</span></span>
                      </div>
                      {cert.image && (
                        <span className="text-[9px] text-sabbpe-cyan/50 font-medium">Click to view certificate →</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Certificate Lightbox */}
      <AnimatePresence>
        {expandedCert !== null && certifications[expandedCert]?.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setExpandedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative max-w-2xl w-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={certifications[expandedCert].image!}
                alt={certifications[expandedCert].title}
                className="w-full h-full object-contain bg-white"
              />
              <button
                onClick={() => setExpandedCert(null)}
                className="absolute top-3 right-3 w-8 h-8 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors"
              >
                ✕
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-4 text-center">
                <p className="text-white font-bold text-sm">{certifications[expandedCert].title}</p>
                <p className="text-white/50 text-xs">{certifications[expandedCert].subtitle}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
