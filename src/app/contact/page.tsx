'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import {
  Mail,
  Phone,
  Clock,
  Send,
  MessageSquare,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Headphones,
} from 'lucide-react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/premium/Footer';
import { Wrap, FOCUS } from '@/components/redesign/ui';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Online payments',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#0F172A]">
      <Navbar />

      <main className="pt-32 pb-24 sm:pt-40">
        {/* Page Header */}
        <section className="border-b border-slate-100 bg-gradient-to-b from-[#F0F7FF] via-[#F8FAFC] to-white pb-16 pt-8">
          <Wrap className="flex flex-col items-center text-center gap-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0457F1] shadow-2xs">
              <Headphones className="h-3.5 w-3.5 text-[#0457F1]" />
              Get in Touch
            </div>
            <h1 className="max-w-[760px] font-display text-4xl font-bold tracking-tight text-[#0F172A] sm:text-5xl lg:text-6xl leading-[1.1]">
              Let&apos;s Talk About{' '}
              <span className="bg-gradient-to-r from-[#0457F1] via-[#0284C7] to-[#00A3FF] bg-clip-text text-transparent">
                Your Payment Needs
              </span>
            </h1>
            <p className="max-w-[620px] text-base leading-relaxed text-[#475569] sm:text-lg">
              Have questions about our products or services? Our dedicated team is here to help you find the perfect solution for your business.
            </p>
          </Wrap>
        </section>

        {/* Contact Info & Interactive Form Section */}
        <section className="py-16">
          <Wrap>
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              {/* Left Column: 3 Contact Detail Cards */}
              <div className="flex flex-col gap-6 lg:col-span-5">
                {/* 1. Email Us Card */}
                <div className="group rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all hover:border-[#0457F1]/40 hover:shadow-md sm:p-7">
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#0457F1] group-hover:bg-[#0457F1] group-hover:text-white transition-colors">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-[#0F172A]">Email Us</h3>
                      <p className="text-xs text-slate-500">Get in touch via email</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 text-sm">
                    <a
                      href="mailto:contact@sabbpe.com"
                      className="flex items-center justify-between rounded-xl bg-[#F8FAFC] px-3.5 py-2.5 font-medium text-[#0F172A] hover:bg-blue-50 hover:text-[#0457F1] transition-colors"
                    >
                      <span>contact@sabbpe.com</span>
                      <span className="text-xs text-slate-400">General</span>
                    </a>
                    <a
                      href="mailto:support@sabbpe.com"
                      className="flex items-center justify-between rounded-xl bg-[#F8FAFC] px-3.5 py-2.5 font-medium text-[#0F172A] hover:bg-blue-50 hover:text-[#0457F1] transition-colors"
                    >
                      <span>support@sabbpe.com</span>
                      <span className="text-xs text-slate-400">Technical Support</span>
                    </a>
                    <a
                      href="mailto:careers@sabbpe.com"
                      className="flex items-center justify-between rounded-xl bg-[#F8FAFC] px-3.5 py-2.5 font-medium text-[#0F172A] hover:bg-blue-50 hover:text-[#0457F1] transition-colors"
                    >
                      <span>careers@sabbpe.com</span>
                      <span className="text-xs text-slate-400">Careers</span>
                    </a>
                  </div>
                </div>

                {/* 2. Call Us Card */}
                <div className="group rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all hover:border-[#0457F1]/40 hover:shadow-md sm:p-7">
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-[#0F172A]">Call Us</h3>
                      <p className="text-xs text-slate-500">Speak with our team</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 pt-2 border-t border-slate-100">
                    <div>
                      <a
                        href="tel:+918247017667"
                        className="font-display text-2xl font-bold tracking-tight text-[#0457F1] hover:underline"
                      >
                        +91 8247017667
                      </a>
                      <div className="text-xs text-slate-500 mt-1">Mon-Sat 9AM-8PM IST</div>
                    </div>

                    <a
                      href="https://wa.me/918247017667"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#0457F1] hover:text-[#0339A8] transition-colors"
                    >
                      <span>Start a Conversation</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                {/* 3. Business Hours Card */}
                <div className="group rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all hover:border-[#0457F1]/40 hover:shadow-md sm:p-7">
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-[#0F172A]">Business Hours</h3>
                      <p className="text-xs text-slate-500">When we&apos;re available</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center justify-between py-1.5 text-slate-700">
                      <span className="font-medium">Monday - Friday:</span>
                      <span className="font-bold text-[#0F172A]">9AM - 8PM</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 text-slate-700">
                      <span className="font-medium">Saturday:</span>
                      <span className="font-bold text-[#0F172A]">9AM - 6PM</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 text-slate-700">
                      <span className="font-medium">Sunday:</span>
                      <span className="font-bold text-rose-600">Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Send Message Form */}
              <div className="lg:col-span-7">
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_15px_50px_-10px_rgba(15,23,42,0.08)] sm:p-10">
                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      <div>
                        <h2 className="font-display text-2xl font-bold text-[#0F172A]">Send Us a Message</h2>
                        <p className="mt-1 text-sm text-[#64748B]">
                          Fill in your details below and a SabbPe payment specialist will get in touch within 2 business hours.
                        </p>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        {/* Name */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Your Name <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Suhas S"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={clsx(
                              'w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] placeholder-slate-400 transition-colors focus:border-[#0457F1] focus:bg-white focus:outline-none',
                              FOCUS,
                            )}
                          />
                        </div>

                        {/* Work Email */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Work Email <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="name@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={clsx(
                              'w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] placeholder-slate-400 transition-colors focus:border-[#0457F1] focus:bg-white focus:outline-none',
                              FOCUS,
                            )}
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        {/* Phone Number */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Phone Number <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className={clsx(
                              'w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] placeholder-slate-400 transition-colors focus:border-[#0457F1] focus:bg-white focus:outline-none',
                              FOCUS,
                            )}
                          />
                        </div>

                        {/* Company Name */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Company Name
                          </label>
                          <input
                            type="text"
                            placeholder="Acme Payments Pvt Ltd"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className={clsx(
                              'w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] placeholder-slate-400 transition-colors focus:border-[#0457F1] focus:bg-white focus:outline-none',
                              FOCUS,
                            )}
                          />
                        </div>
                      </div>

                      {/* Service Requirement */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Primary Service of Interest
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className={clsx(
                            'w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] transition-colors focus:border-[#0457F1] focus:bg-white focus:outline-none',
                            FOCUS,
                          )}
                        >
                          <option value="Online payments">Online payments (UPI, Cards, NetBanking)</option>
                          <option value="Collections and recurring">Collections and recurring (UPI AutoPay)</option>
                          <option value="UPI and QR">UPI and QR (Dynamic/Static QR, DeepLink)</option>
                          <option value="Disbursements">Disbursements (Instant single & bulk payouts)</option>
                          <option value="Gift360">Gift360 (CRM & Loyalty Engine)</option>
                          <option value="Full Orchestration Platform">Full SabbPe Orchestration Platform</option>
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          How can we help you?
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Tell us about your monthly transaction volume or integration requirements..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className={clsx(
                            'w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] placeholder-slate-400 transition-colors focus:border-[#0457F1] focus:bg-white focus:outline-none',
                            FOCUS,
                          )}
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className={clsx(
                          'mt-2 flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#0457F1] py-4 text-sm font-bold text-white shadow-[0_4px_16px_rgba(4,87,241,0.25)] transition-all hover:bg-[#0339A8] hover:shadow-[0_6px_22px_rgba(4,87,241,0.35)]',
                          FOCUS,
                        )}
                      >
                        <Send className="h-4 w-4" />
                        <span>Submit Inquiry</span>
                      </button>

                      <div className="flex items-center justify-center gap-4 text-xs text-slate-400 pt-2 text-center">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> ISO 27001 Certified
                        </span>
                        <span>•</span>
                        <span>Zero Spam Policy</span>
                        <span>•</span>
                        <span>Encrypted Communication</span>
                      </div>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-md">
                        <CheckCircle2 className="h-9 w-9" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-[#0F172A]">Thank You, {formData.name}!</h3>
                      <p className="mt-2 max-w-[420px] text-sm text-[#475569]">
                        Your inquiry regarding <strong>{formData.service}</strong> has been received. Our team will reach out to <strong>{formData.email}</strong> shortly.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-bold text-[#0F172A] hover:bg-slate-100"
                      >
                        Send Another Inquiry
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </Wrap>
        </section>
      </main>

      <Footer />
    </div>
  );
}
