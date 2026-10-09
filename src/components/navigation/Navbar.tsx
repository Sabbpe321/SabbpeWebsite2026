'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  CreditCard,
  QrCode,
  Repeat,
  Receipt,
  Layers,
  Code2,
  Cpu,
  Smartphone,
  Palette,
  Lightbulb,
  Users,
  Briefcase,
  Target,
  LayoutDashboard,
  Key,
  BarChart3,
  RefreshCw,
  Gift,
  ShieldCheck,
  Send,
  FileText,
  Boxes,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DemoModal from '@/components/modals/DemoModal';
import { FOCUS } from '@/components/redesign/ui';

/* =========================================================================
   NAVIGATION DATA DEFINITIONS
   ========================================================================= */

const SERVICES_DATA = {
  title: 'Services',
  sections: [
    {
      group: 'Payments & Collections',
      items: [
        {
          name: 'Online payments',
          desc: 'UPI, cards, net banking and wallets in one integration',
          href: '/services/online-payments',
          icon: CreditCard,
          badge: null,
        },
        {
          name: 'Collections and recurring',
          desc: 'UPI Autopay mandates and scheduled collections',
          href: '/services/collections-recurring',
          icon: Repeat,
          badge: null,
        },
        {
          name: 'UPI and QR',
          desc: 'In-store QR and assisted payments',
          href: '/services/upi-qr',
          icon: QrCode,
          badge: null,
        },
        {
          name: 'Disbursements',
          desc: 'Single and bulk payouts to vendors and customers',
          href: '/services/disbursements',
          icon: Send,
          badge: null,
        },
      ],
    },
    {
      group: 'Settlement & Operations',
      items: [
        {
          name: 'Settlement and reporting',
          desc: 'T+0 and T+1 settlement with downloadable reports',
          href: '/services/settlement-reporting',
          icon: Receipt,
          badge: null,
        },
        {
          name: 'Reconciliation',
          desc: 'Payments matched to settlements automatically',
          href: '/services/reconciliation',
          icon: RefreshCw,
          badge: null,
        },
        {
          name: 'Dashboard and analytics',
          desc: 'Collections, payouts and settlements in one view',
          href: '/services/dashboard',
          icon: LayoutDashboard,
          badge: null,
        },
        {
          name: 'Gift360 Engine',
          desc: 'CRM and loyalty for your customers, on in one click',
          href: '/services/gift360',
          icon: Gift,
          badge: 'NEW',
        },
      ],
    },
  ],
};

const TECHNOLOGY_DATA = {
  title: 'Technology',
  sections: [
    {
      group: 'DEVELOPMENT',
      items: [
        {
          name: 'Custom App Development',
          desc: 'Tailored enterprise web and mobile applications',
          href: '/technology/custom-app-development',
          icon: Code2,
        },
        {
          name: 'Digital Transformation',
          desc: 'Modernizing core architectures with high scalability',
          href: '/technology/digital-transformation',
          icon: Cpu,
        },
        {
          name: 'Enterprise Mobility',
          desc: 'Secure cross-platform digital infrastructure',
          href: '/technology/enterprise-mobility',
          icon: Smartphone,
        },
      ],
    },
    {
      group: 'DESIGN & STRATEGY',
      items: [
        {
          name: 'UI/UX Design Thinking',
          desc: 'User-centric interfaces engineered for conversion',
          href: '/technology/ui-ux-design',
          icon: Palette,
        },
        {
          name: 'Technology Consulting',
          desc: 'Fintech strategy, cloud architecture & compliance advisory',
          href: '/technology/consulting',
          icon: Lightbulb,
        },
        {
          name: 'IT Staff Augmentation',
          desc: 'Dedicated vetted senior engineering teams',
          href: '/technology/staff-augmentation',
          icon: Users,
        },
      ],
    },
    {
      group: 'RECRUITMENT',
      items: [
        {
          name: 'Managed Recruitment',
          desc: 'End-to-end specialized technical talent acquisition',
          href: '/technology/managed-recruitment',
          icon: Briefcase,
        },
        {
          name: 'Talent Solutions',
          desc: 'Expert hiring for specialized fintech roles',
          href: '/technology/talent-solutions',
          icon: Target,
        },
        {
          name: 'Strategic Staffing',
          desc: 'Flexible scaling for high-growth tech initiatives',
          href: '/technology/strategic-staffing',
          icon: Users,
        },
      ],
    },
  ],
};

const SAAS_DATA = {
  title: 'SaaS',
  featured: {
    badge: 'SaaS Platform',
    heading: 'Everything you need to manage payments',
    desc: 'A complete suite of SaaS tools to power your business operations and scale effortlessly.',
    cta: 'Explore platform',
    href: '/saas',
  },
  items: [
    {
      name: 'Unified Dashboard',
      desc: 'Single view for all transactions, balances, and analytics',
      href: '/saas/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'API Suite',
      desc: 'RESTful APIs and webhooks for seamless platform integration',
      href: '/saas/api',
      icon: Key,
    },
    {
      name: 'Analytics Engine',
      desc: 'Real-time insights, cohort tracking, and automated reporting',
      href: '/saas/analytics',
      icon: BarChart3,
    },
    {
      name: 'Reconciliation',
      desc: 'Automated settlement matching and two-way ledger verification',
      href: '/saas/reconciliation',
      icon: RefreshCw,
    },
  ],
};

/* =========================================================================
   LIGHT THEME NAVBAR
   ========================================================================= */

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Proactively prefetch all service routes so navigation is 0ms instant
    const routesToPrefetch = [
      '/services/online-payments',
      '/services/collections-recurring',
      '/services/upi-qr',
      '/services/disbursements',
      '/services/gift360',
      '/services/settlement-reporting',
      '/saas/reconciliation',
      '/saas/dashboard',
      '/contact',
      '/technology',
    ];
    routesToPrefetch.forEach((r) => {
      try {
        router.prefetch(r);
      } catch {}
    });
  }, [router]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  const toggleMobileSubmenu = (menu: string) => {
    setMobileSubmenu(mobileSubmenu === menu ? null : menu);
  };

  return (
    <header
      ref={navRef}
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)]'
          : 'bg-white/80 backdrop-blur-md border-b border-slate-200/50',
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-[1240px] items-center justify-between px-5 sm:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className={clsx(
            'flex items-center gap-2 rounded-lg py-1 transition-opacity hover:opacity-90',
            FOCUS,
          )}
        >
          <div className="relative h-9 w-32 sm:h-10 sm:w-36 flex items-center">
            <Image
              src="/sabbpe_logo.png"
              alt="SabbPe"
              fill
              sizes="144px"
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu('services')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button
              type="button"
              onClick={() => setActiveMenu(activeMenu === 'services' ? null : 'services')}
              aria-expanded={activeMenu === 'services'}
              className={clsx(
                'flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[14px] font-semibold transition-colors',
                FOCUS,
                activeMenu === 'services'
                  ? 'text-[#0457F1] bg-[#EFF6FF]'
                  : 'text-[#334155] hover:text-[#0457F1] hover:bg-[#F8FAFC]',
              )}
            >
              <span>Services</span>
              <ChevronDown
                className={clsx(
                  'h-4 w-4 transition-transform duration-200 text-[#0457F1]',
                  activeMenu === 'services' && 'rotate-180',
                )}
              />
            </button>

            <AnimatePresence>
              {activeMenu === 'services' && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: 'easeOut' }}
                  className="absolute left-1/2 -translate-x-1/3 top-full mt-2 w-[760px] rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.12)]"
                >
                  <div className="grid grid-cols-2 gap-6 divide-x divide-slate-100">
                    {SERVICES_DATA.sections.map((section, idx) => (
                      <div key={section.group} className={clsx(idx > 0 && 'pl-6')}>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#0457F1] mb-3">
                          {section.group}
                        </div>
                        <div className="flex flex-col gap-1.5">
                          {section.items.map((item) => {
                            const IconComponent = item.icon;
                            const isExternal = item.href.startsWith('http');
                            return (
                              <Link
                                key={item.name}
                                href={item.href}
                                prefetch={true}
                                onClick={() => setActiveMenu(null)}
                                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                className="group flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-[#F1F5F9]"
                              >
                                <div className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-md bg-[#EFF6FF] group-hover:bg-[#0457F1] text-[#0457F1] group-hover:text-white transition-colors">
                                  <IconComponent className="h-4 w-4" />
                                </div>
                                <div className="flex flex-col">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[13px] font-semibold text-[#0F172A] group-hover:text-[#0457F1]">
                                      {item.name}
                                    </span>
                                    {item.badge && (
                                      <span className="rounded bg-[#0457F1] px-1.5 py-0.2 text-[10px] font-bold uppercase tracking-wider text-white">
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[11.5px] leading-snug text-[#64748B]">
                                    {item.desc}
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Technology Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu('technology')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button
              type="button"
              onClick={() => setActiveMenu(activeMenu === 'technology' ? null : 'technology')}
              aria-expanded={activeMenu === 'technology'}
              className={clsx(
                'flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[14px] font-semibold transition-colors',
                FOCUS,
                activeMenu === 'technology'
                  ? 'text-[#0457F1] bg-[#EFF6FF]'
                  : 'text-[#334155] hover:text-[#0457F1] hover:bg-[#F8FAFC]',
              )}
            >
              <span>Technology</span>
              <ChevronDown
                className={clsx(
                  'h-4 w-4 transition-transform duration-200 text-[#0457F1]',
                  activeMenu === 'technology' && 'rotate-180',
                )}
              />
            </button>

            <AnimatePresence>
              {activeMenu === 'technology' && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: 'easeOut' }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[840px] rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.12)]"
                >
                  <div className="grid grid-cols-3 gap-6 divide-x divide-slate-100">
                    {TECHNOLOGY_DATA.sections.map((section, idx) => (
                      <div key={section.group} className={clsx(idx > 0 && 'pl-6')}>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#0457F1] mb-3">
                          {section.group}
                        </div>
                        <div className="flex flex-col gap-1.5">
                          {section.items.map((item) => {
                            const IconComponent = item.icon;
                            return (
                              <Link
                                key={item.name}
                                href={item.href}
                                prefetch={true}
                                onClick={() => setActiveMenu(null)}
                                className="group flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-[#F1F5F9]"
                              >
                                <div className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-md bg-[#EFF6FF] group-hover:bg-[#0457F1] text-[#0457F1] group-hover:text-white transition-colors">
                                  <IconComponent className="h-4 w-4" />
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[13px] font-semibold text-[#0F172A] group-hover:text-[#0457F1]">
                                    {item.name}
                                  </span>
                                  <span className="text-[11.5px] leading-snug text-[#64748B]">
                                    {item.desc}
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SaaS Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu('saas')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button
              type="button"
              onClick={() => setActiveMenu(activeMenu === 'saas' ? null : 'saas')}
              aria-expanded={activeMenu === 'saas'}
              className={clsx(
                'flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[14px] font-semibold transition-colors',
                FOCUS,
                activeMenu === 'saas'
                  ? 'text-[#0457F1] bg-[#EFF6FF]'
                  : 'text-[#334155] hover:text-[#0457F1] hover:bg-[#F8FAFC]',
              )}
            >
              <span>SaaS</span>
              <ChevronDown
                className={clsx(
                  'h-4 w-4 transition-transform duration-200 text-[#0457F1]',
                  activeMenu === 'saas' && 'rotate-180',
                )}
              />
            </button>

            <AnimatePresence>
              {activeMenu === 'saas' && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: 'easeOut' }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[760px] rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.12)]"
                >
                  <div className="grid grid-cols-12 gap-6">
                    {/* Left Highlight Box */}
                    <div className="col-span-5 flex flex-col justify-between rounded-xl bg-gradient-to-br from-[#EFF6FF] via-[#E0F2FE] to-[#F0FDF4] p-5 border border-[#BAE6FD]">
                      <div>
                        <span className="inline-block rounded-md bg-[#0457F1]/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0457F1]">
                          {SAAS_DATA.featured.badge}
                        </span>
                        <h4 className="mt-3 text-[16px] font-bold leading-snug text-[#0F172A]">
                          {SAAS_DATA.featured.heading}
                        </h4>
                        <p className="mt-2 text-[12px] leading-relaxed text-[#475569]">
                          {SAAS_DATA.featured.desc}
                        </p>
                      </div>
                      <Link
                        href={SAAS_DATA.featured.href}
                        prefetch={true}
                        onClick={() => setActiveMenu(null)}
                        className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#0457F1] hover:text-[#0339A8] transition-colors"
                      >
                        {SAAS_DATA.featured.cta} <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>

                    {/* Right SaaS Modules */}
                    <div className="col-span-7 grid grid-cols-2 gap-2.5">
                      {SAAS_DATA.items.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            prefetch={true}
                            onClick={() => setActiveMenu(null)}
                            className="group flex flex-col justify-between rounded-lg border border-slate-100 bg-[#F8FAFC] p-3.5 transition-all hover:border-[#0457F1] hover:bg-white hover:shadow-md"
                          >
                            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#EFF6FF] text-[#0457F1] group-hover:bg-[#0457F1] group-hover:text-white transition-colors">
                              <IconComponent className="h-4 w-4" />
                            </div>
                            <div className="mt-2.5">
                              <div className="text-[13px] font-semibold text-[#0F172A] group-hover:text-[#0457F1]">
                                {item.name}
                              </div>
                              <div className="mt-0.5 text-[11.5px] leading-snug text-[#64748B]">
                                {item.desc}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>



          {/* Developer docs */}
          <Link
            href="/docs"
            className={clsx(
              'rounded-lg px-3.5 py-2 text-[14px] font-semibold text-[#334155] transition-colors hover:text-[#0457F1] hover:bg-[#F8FAFC]',
              FOCUS,
            )}
          >
            Developers
          </Link>

          {/* Blog Link - Opens in new page/tab */}
          <Link
            href="/blog"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              'rounded-lg px-3.5 py-2 text-[14px] font-semibold text-[#334155] transition-colors hover:text-[#0457F1] hover:bg-[#F8FAFC]',
              FOCUS,
            )}
          >
            Blog
          </Link>

          {/* Contact Direct Link */}
          <Link
            href="/contact"
            className={clsx(
              'rounded-lg px-3.5 py-2 text-[14px] font-semibold text-[#334155] transition-colors hover:text-[#0457F1] hover:bg-[#F8FAFC]',
              FOCUS,
            )}
          >
            Contact
          </Link>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="/login"
            className={clsx(
              'text-[14px] font-semibold text-[#334155] transition-colors hover:text-[#0457F1]',
              FOCUS,
            )}
          >
            Sign In
          </a>

          <DemoModal
            trigger={
              <button
                type="button"
                className={clsx(
                  'rounded-lg bg-[#0457F1] px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_2px_12px_rgba(4,87,241,0.25)] transition-all hover:bg-[#0339A8]',
                  FOCUS,
                )}
              >
                Book a demo
              </button>
            }
          />
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-[#0F172A] hover:bg-slate-100 transition-colors"
            aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="lg:hidden border-t border-slate-200 bg-white px-5 py-6 shadow-xl max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-2">
              {/* Mobile Services Accordion */}
              <div className="border-b border-slate-100 pb-2">
                <button
                  type="button"
                  onClick={() => toggleMobileSubmenu('services')}
                  className="flex w-full items-center justify-between py-2.5 text-base font-semibold text-[#0F172A]"
                >
                  <span>Services</span>
                  <ChevronDown
                    className={clsx(
                      'h-4 w-4 text-[#0457F1] transition-transform',
                      mobileSubmenu === 'services' && 'rotate-180',
                    )}
                  />
                </button>
                {mobileSubmenu === 'services' && (
                  <div className="mt-2 flex flex-col gap-4 pl-3">
                    {SERVICES_DATA.sections.map((section) => (
                      <div key={section.group} className="flex flex-col gap-1.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#0457F1]">
                          {section.group}
                        </span>
                        {section.items.map((item) => {
                          const isExternal = item.href.startsWith('http');
                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              prefetch={true}
                              onClick={() => {
                                setMobileOpen(false);
                                setActiveMenu(null);
                              }}
                              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                              className="flex items-center justify-between py-1.5 text-sm text-[#475569] hover:text-[#0457F1]"
                            >
                              <span>{item.name}</span>
                              {item.badge && (
                                <span className="rounded bg-[#0457F1] px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Technology Accordion */}
              <div className="border-b border-slate-100 pb-2">
                <button
                  type="button"
                  onClick={() => toggleMobileSubmenu('technology')}
                  className="flex w-full items-center justify-between py-2.5 text-base font-semibold text-[#0F172A]"
                >
                  <span>Technology</span>
                  <ChevronDown
                    className={clsx(
                      'h-4 w-4 text-[#0457F1] transition-transform',
                      mobileSubmenu === 'technology' && 'rotate-180',
                    )}
                  />
                </button>
                {mobileSubmenu === 'technology' && (
                  <div className="mt-2 flex flex-col gap-4 pl-3">
                    {TECHNOLOGY_DATA.sections.map((section) => (
                      <div key={section.group} className="flex flex-col gap-1.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#0457F1]">
                          {section.group}
                        </span>
                        {section.items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            prefetch={true}
                            onClick={() => {
                              setMobileOpen(false);
                              setActiveMenu(null);
                            }}
                            className="py-1.5 text-sm text-[#475569] hover:text-[#0457F1]"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile SaaS Accordion */}
              <div className="border-b border-slate-100 pb-2">
                <button
                  type="button"
                  onClick={() => toggleMobileSubmenu('saas')}
                  className="flex w-full items-center justify-between py-2.5 text-base font-semibold text-[#0F172A]"
                >
                  <span>SaaS</span>
                  <ChevronDown
                    className={clsx(
                      'h-4 w-4 text-[#0457F1] transition-transform',
                      mobileSubmenu === 'saas' && 'rotate-180',
                    )}
                  />
                </button>
                {mobileSubmenu === 'saas' && (
                  <div className="mt-2 flex flex-col gap-2 pl-3">
                    <Link
                      href={SAAS_DATA.featured.href}
                      className="rounded-lg bg-[#EFF6FF] p-3 text-xs font-semibold text-[#0457F1]"
                    >
                      {SAAS_DATA.featured.heading} →
                    </Link>
                    {SAAS_DATA.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="py-1.5 text-sm text-[#475569] hover:text-[#0457F1]"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>



              {/* Mobile developer docs link */}
              <Link
                href="/docs"
                className="border-b border-slate-100 py-3 text-base font-semibold text-[#0F172A] hover:text-[#0457F1]"
              >
                Developers
              </Link>

              {/* Mobile Blog Link */}
              <Link
                href="/blog"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-slate-100 py-3 text-base font-semibold text-[#0F172A] hover:text-[#0457F1]"
              >
                Blog
              </Link>

              {/* Mobile Contact Link */}
              <Link
                href="/contact"
                className="border-b border-slate-100 py-3 text-base font-semibold text-[#0F172A] hover:text-[#0457F1]"
              >
                Contact
              </Link>

              {/* Mobile Buttons */}
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg border border-slate-200 py-3 text-center text-sm font-semibold text-[#0F172A] hover:bg-slate-50 transition-colors"
                >
                  Sign In
                </a>
                <DemoModal
                  trigger={
                    <button
                      type="button"
                      className="w-full rounded-lg bg-[#0457F1] py-3 text-center text-sm font-semibold text-white hover:bg-[#0339A8] transition-colors"
                    >
                      Book a demo
                    </button>
                  }
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
