'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const milestones = [
    {
        year: "2023",
        title: "Company Founded",
        desc: "SabbPe launched with a mission to simplify and unify India's financial ecosystem",
        icon: "🚀"
    },
    {
        year: "2023",
        title: "UPI SoundBox Launch",
        desc: "Starting with our innovative UPI SoundBox devices, focusing on understanding real-world pain points",
        icon: "📱"
    },
    {
        year: "2024",
        title: "DPIIT Recognition",
        desc: "Recognized by DPIIT as an innovative startup driving meaningful change in India's financial ecosystem",
        icon: "🏆"
    },
    {
        year: "2024",
        title: "Payment Solutions Expansion",
        desc: "Expanded our suite of integrated payment solutions with human-centric design principles at the core",
        icon: "💳"
    },
    {
        year: "2025",
        title: "Merchant Growth & Expansion",
        desc: "Grew to serve 500+ merchants across India with our comprehensive payment platform",
        icon: "📈"
    }
];

export default function AboutJourneyLayer() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center max-w-3xl mb-16"
            >
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                    Our Journey
                </h2>
                <p className="text-lg text-slate-400">
                    From a bold vision to building the future of payments.
                </p>
            </motion.div>

            {/* Timeline */}
            <div className="w-full relative">
                {/* Vertical Line */}
                <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-sabbpe-cyan to-purple-600 origin-top"
                    style={{ top: 0, bottom: 0 }}
                />

                {/* Timeline Items */}
                <div className="space-y-12 relative z-10">
                    {milestones.map((milestone, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: i * 0.1 }}
                            className={`flex gap-8 items-center ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                        >
                            {/* Content */}
                            <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                <motion.div
                                    className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] hover:from-white/[0.08] hover:to-white/[0.04] transition-all"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <span className="text-sabbpe-cyan font-bold text-lg">{milestone.year}</span>
                                    <h3 className="text-xl font-bold text-white mt-2">{milestone.title}</h3>
                                    <p className="text-slate-400 text-sm mt-2">{milestone.desc}</p>
                                </motion.div>
                            </div>

                            {/* Timeline Dot */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 + 0.2 }}
                                className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-sabbpe-cyan to-purple-600 flex items-center justify-center border-4 border-sabbpe-navy-dark shadow-lg shadow-sabbpe-cyan/50"
                            >
                                <span className="text-lg">{milestone.icon}</span>
                            </motion.div>

                            {/* Spacer */}
                            <div className="flex-1" />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Future Vision */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full mt-20 p-12 rounded-3xl border border-sabbpe-cyan/30 bg-gradient-to-r from-sabbpe-cyan/10 to-purple-600/10 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-sabbpe-cyan/20 rounded-full blur-[100px] -z-10" />

                <div className="relative z-10 text-center max-w-2xl mx-auto">
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                        The Future
                    </h3>
                    <p className="text-slate-300 text-lg mb-6">
                        Continuing to expand services with the guiding principle: 'simplify and unify' the financial ecosystem for everyone. SabbPe is committed to being India's most trusted digital payments partner.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sabbpe-cyan font-bold">
                        <CheckCircle className="w-5 h-5" />
                        Empowering India's Digital Economy
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
