'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle, ChevronRight, Heart, Users, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

const highlights = [
    {
        id: 'vision',
        title: 'Our Vision',
        desc: 'Democratizing financial infrastructure for the internet.',
        icon: Zap,
        color: 'from-blue-400 to-cyan-500',
        visual: (
            <div className="relative flex items-center justify-center h-full w-full">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-500/20 flex items-center justify-center border border-blue-400/50"
                >
                    <div className="text-4xl">🌍</div>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-t-2 border-blue-400"
                    />
                </motion.div>
            </div>
        )
    },
    {
        id: 'mission',
        title: 'Our Mission',
        desc: 'Enable businesses to thrive with world-class payments.',
        icon: Heart,
        color: 'from-pink-400 to-red-500',
        visual: (
            <div className="relative flex items-center justify-center h-full w-full">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-40 h-40 rounded-full bg-gradient-to-br from-pink-400/20 to-red-500/20 flex items-center justify-center border border-pink-400/50"
                >
                    <Heart className="w-16 h-16 text-pink-400 fill-pink-400" />
                </motion.div>
            </div>
        )
    },
    {
        id: 'culture',
        title: 'Our Culture',
        desc: 'Built on innovation, trust, and customer obsession.',
        icon: Users,
        color: 'from-purple-400 to-pink-500',
        visual: (
            <div className="relative flex items-center justify-center h-full w-full px-12">
                <div className="w-full flex items-center justify-center gap-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400/50 to-pink-500/50 flex items-center justify-center border border-purple-400/50"
                        >
                            <span className="text-lg font-bold text-white">{i}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        )
    }
];

export default function AboutHeroLayer() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % highlights.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-sabbpe-navy-dark">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-sabbpe-blue/20 rounded-full blur-[120px] -z-10 opacity-50" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-sabbpe-cyan/10 rounded-full blur-[120px] -z-10 opacity-30" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <div className="space-y-8 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-sabbpe-border backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer group"
                        >
                            <span className="flex h-2 w-2 rounded-full bg-sabbpe-cyan animate-pulse"></span>
                            <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                                About SabbPe
                            </span>
                            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-display font-bold leading-[1.1] text-white tracking-tight"
                        >
                            Building the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sabbpe-cyan via-blue-500 to-purple-600">
                                future of payments
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg md:text-xl text-sabbpe-text-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed"
                        >
                            India's Digital Payments Partner. SabbPe is simplifying and unifying the financial ecosystem for everyone. From UPI SoundBox devices to integrated payment solutions, we're driving meaningful change.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-wrap justify-center lg:justify-start gap-4"
                        >
                            <Link href="/contact" className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-sabbpe-blue hover:bg-blue-600 transition-all hover:scale-105 shadow-lg shadow-blue-900/20">
                                Join Our Team
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <button
                                onClick={() => {
                                    const el = document.getElementById('our-impact');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="px-8 py-4 rounded-xl font-medium text-slate-300 border border-white/10 hover:bg-white/5 hover:text-white transition-all"
                            >
                                Our Impact
                            </button>
                        </motion.div>

                        <div className="pt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-sabbpe-text-tertiary font-medium">
                            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-sabbpe-cyan" /> Founded 2023</span>
                            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-sabbpe-cyan" /> 500+ Merchants</span>
                            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-sabbpe-cyan" /> 99.9% Uptime</span>
                        </div>
                    </div>

                    {/* Right: Feature Carousel */}
                    <div className="relative hidden lg:block h-[500px]">
                        <div className="absolute inset-0 flex items-center justify-end">
                            {/* Card Container */}
                            <div className="w-[450px] h-[500px] rounded-[40px] border border-sabbpe-border bg-sabbpe-navy-light/80 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col">
                                {/* Visual Area */}
                                <div className="flex-1 relative overflow-hidden p-8">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={active}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 1.1 }}
                                            transition={{ duration: 0.5 }}
                                            className="w-full h-full"
                                        >
                                            {highlights[active].visual}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Controls Area */}
                                <div className="p-6 bg-white/5 border-t border-white/5">
                                    <div className="flex gap-4">
                                        {highlights.map((h, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setActive(i)}
                                                className={`flex-1 p-3 rounded-xl transition-all text-left group ${active === i ? 'bg-white/10 ring-1 ring-white/20' : 'hover:bg-white/5'}`}
                                            >
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h.icon className={`w-4 h-4 ${active === i ? 'text-sabbpe-cyan' : 'text-slate-500'} transition-colors`} />
                                                    <span className={`text-xs font-bold ${active === i ? 'text-white' : 'text-slate-400'}`}>{h.title}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
