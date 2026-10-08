'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2, Sparkles, Send, Calendar, Clock, Building2, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { FOCUS } from '@/components/redesign/ui';

interface DemoModalProps {
  trigger?: React.ReactNode;
}

export default function DemoModal({ trigger }: DemoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    interest: 'Payment Orchestration',
    message: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate instantaneous lead submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        interest: 'Payment Orchestration',
        message: '',
      });
    }, 200);
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 text-[#0F172A] shadow-[0_25px_70px_rgba(15,23,42,0.25)] z-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-title"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4 shadow-sm animate-bounce">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#0F172A]">
                  Demo Request Received!
                </h3>
                <p className="mt-2 text-sm text-[#475569] max-w-xs">
                  Thank you, <strong className="text-[#0F172A]">{formData.name || 'there'}</strong>. Our solutions team will reach out via <span className="text-[#0457F1]">{formData.email || 'email'}</span> within 24 hours to schedule your live walkthrough.
                </p>

                <div className="mt-6 flex w-full flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full rounded-xl bg-[#0457F1] py-3 text-sm font-bold text-white shadow-md hover:bg-[#0339A8] transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0457F1] mb-2">
                  <Sparkles className="h-4 w-4" />
                  Live Platform Demonstration
                </div>

                <h3 id="demo-modal-title" className="font-display text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
                  Schedule a SabbPe Demo
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Discover how SabbPe smart routing, T+0 settlements, and Gift360 loyalty transform your payment operations.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3.5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-3.5 py-2.5 text-xs sm:text-sm text-[#0F172A] placeholder-slate-400 focus:bg-white focus:border-[#0457F1] focus:ring-2 focus:ring-[#0457F1]/20 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Email and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-1">
                        Work Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-3.5 py-2.5 text-xs sm:text-sm text-[#0F172A] placeholder-slate-400 focus:bg-white focus:border-[#0457F1] focus:ring-2 focus:ring-[#0457F1]/20 focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-1">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-3.5 py-2.5 text-xs sm:text-sm text-[#0F172A] placeholder-slate-400 focus:bg-white focus:border-[#0457F1] focus:ring-2 focus:ring-[#0457F1]/20 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Company and Product Interest */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-1">
                        Company Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Acme FinTech Ltd"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-3.5 py-2.5 text-xs sm:text-sm text-[#0F172A] placeholder-slate-400 focus:bg-white focus:border-[#0457F1] focus:ring-2 focus:ring-[#0457F1]/20 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-1">
                        Area of Interest
                      </label>
                      <select
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-3.5 py-2.5 text-xs sm:text-sm text-[#0F172A] focus:bg-white focus:border-[#0457F1] focus:ring-2 focus:ring-[#0457F1]/20 focus:outline-none transition-all"
                      >
                        <option value="Payment Orchestration">Payment Orchestration</option>
                        <option value="UPI Autopay & Mandates">UPI Autopay & Mandates</option>
                        <option value="Instant Settlements & Recon">Instant Settlements & Recon</option>
                        <option value="Gift360 Loyalty CRM">Gift360 Loyalty CRM</option>
                        <option value="Disbursements & Payouts">Disbursements & Payouts</option>
                        <option value="Full Enterprise Suite">Full Enterprise Suite</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-1">
                      Notes / Monthly Volume (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. ₹50L+ monthly GMV, looking for T+0 settlement and multi-bank routing..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-3.5 py-2.5 text-xs sm:text-sm text-[#0F172A] placeholder-slate-400 focus:bg-white focus:border-[#0457F1] focus:ring-2 focus:ring-[#0457F1]/20 focus:outline-none resize-none transition-all"
                    />
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0457F1] py-3.5 text-sm font-bold text-white shadow-[0_4px_14px_rgba(4,87,241,0.3)] transition-all hover:bg-[#0339A8] disabled:opacity-70 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Scheduling Demo...</span>
                    ) : (
                      <>
                        <span>Confirm Demo Booking</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {trigger ? (
        <div
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsOpen(true);
            }
          }}
          className="inline-block cursor-pointer"
        >
          {trigger}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-xl bg-[#0457F1] px-6 py-3.5 font-semibold text-white transition-all hover:bg-[#0339A8]"
        >
          Book a demo
        </button>
      )}

      {mounted && typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null}
    </>
  );
}
