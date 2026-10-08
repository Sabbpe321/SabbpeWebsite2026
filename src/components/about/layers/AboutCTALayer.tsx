'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ctas = [
    {
        title: "Get Started",
        desc: "Start accepting payments with SabbPe's integrated payment solutions.",
        link: "/contact",
        icon: "⚡",
        color: "from-sabbpe-cyan to-blue-600"
    },
    {
        title: "Contact Sales",
        desc: "Reach out to our team for partnerships and enterprise solutions.",
        link: "mailto:contact@sabbpe.com",
        icon: "📧",
        color: "from-blue-600 to-blue-700"
    },
    {
        title: "About SabbPe",
        desc: "Learn more about our mission to transform India's financial ecosystem.",
        link: "/about",
        icon: "🌟",
        color: "from-purple-600 to-purple-700"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function AboutCTALayer() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-16">
            {/* Main CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center max-w-3xl"
            >
                <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                    Join Us in Transforming Payments
                </h2>
                <p className="text-lg text-slate-400 mb-10">
                    Be part of India's digital payments revolution. Contact us to learn how SabbPe can help your business thrive.
                </p>
            </motion.div>

            {/* CTA Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="w-full grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                {ctas.map((cta, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        className={`relative overflow-hidden rounded-2xl p-8 cursor-pointer group border border-white/10 bg-gradient-to-br ${cta.color} transition-all`}
                    >
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all" />

                        <div className="relative z-10 space-y-4 h-full flex flex-col justify-between">
                            <div>
                                <div className="text-4xl mb-4">{cta.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-2">{cta.title}</h3>
                                <p className="text-white/80 text-sm">{cta.desc}</p>
                            </div>

                            <button className="flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                                Learn More
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Gradient overlay on hover */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Bottom CTA */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-full"
            >
                <div className="max-w-2xl mx-auto p-12 rounded-3xl border-2 border-sabbpe-cyan/50 bg-gradient-to-br from-sabbpe-cyan/10 to-purple-600/10 text-center relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-sabbpe-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-4">Contact SabbPe</h3>
                        <p className="text-slate-300 mb-8">
                            Get in touch with our team to learn more about SabbPe and how we can help your business.
                        </p>
                        <div className="space-y-2 text-slate-300 mb-8">
                            <p className="font-semibold">📧 contact@sabbpe.com</p>
                            <p className="font-semibold">📞 +91 8247017667</p>
                            <p className="font-semibold">📍 Bengaluru, India</p>
                        </div>
                        <Link href="/contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="px-8 py-3 rounded-xl font-bold text-white bg-sabbpe-blue hover:bg-blue-600 transition-all shadow-lg shadow-blue-900/20"
                            >
                                Get Started Today
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
