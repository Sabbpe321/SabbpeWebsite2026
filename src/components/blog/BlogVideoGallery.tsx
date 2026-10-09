'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Play,
  Film,
  Search,
  Sparkles,
  ExternalLink,
  Clock,
  Layers,
  CheckCircle2,
  Filter,
} from 'lucide-react';

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  duration?: string;
  videoSrc: string;
  description: string;
  keyFeatures: string[];
  docsUrl?: string;
}

export const ALL_BLOG_VIDEOS: VideoItem[] = [
  {
    id: 'tech-stack-architecture',
    title: 'SabbPe Orchestration Engine & Architecture',
    category: 'Architecture & Engine',
    duration: '0:40',
    videoSrc: '/tech_stack_video.mp4',
    description:
      'Watch how SabbPe moves money across payment channels, orchestrates intelligent multi-bank routing (<150ms switch), settles funds instantly, and activates Gift360 CRM loyalty.',
    keyFeatures: ['<150ms Gateway Failover', '10K+ TPS Cloud Core', 'T+0 Clearing Rails', '99.998% Uptime SLA'],
    docsUrl: '/technology',
  },
  {
    id: 'merchant-onboarding',
    title: 'Merchant Onboarding & Autonomous Agents',
    category: 'Onboarding & Ops',
    duration: '1:20',
    videoSrc: '/videos/merchant_onboarding.mp4',
    description:
      'Six specialized agents guide merchants from digital application and automated document OCR to real-time video KYC, business checks, and legal e-signing in minutes.',
    keyFeatures: ['Zero Physical Paperwork', 'Aadhaar / PAN Instant OCR', 'Live Video KYC', 'Instant e-Sign'],
    docsUrl: '/docs/merchant-onboarding',
  },
  {
    id: 'settlement-liquidity',
    title: 'Automated Bank Settlement & Liquidity',
    category: 'Settlement & Ops',
    duration: '1:15',
    videoSrc: '/videos/settlement.mp4',
    description:
      'Configure bank accounts once and choose your settlement cycle. Automated agents clear funds on schedule (T+0 or T+1) with full ledger visibility on your merchant dashboard.',
    keyFeatures: ['Instant T+0 Intraday Settlement', 'Automated Penny Drop', 'Bank Alliance Rails', 'Automated Payout Reports'],
    docsUrl: '/docs/settlement',
  },
  {
    id: '3-way-reconciliation',
    title: 'Automated 3-Way Reconciliation Engine',
    category: 'Settlement & Ops',
    duration: '1:10',
    videoSrc: '/videos/reconciliation.mp4',
    description:
      'Upload orders, gateway transactions, and bank settlement sheets. Our autonomous reconciliation agent matches every record, highlights discrepancies, and traces UTRs across files.',
    keyFeatures: ['3-Way Automated Matching', 'Anomaly & Missing Entry Flagging', 'Cross-File UTR Tracing', 'One-Click Audit CSV Export'],
    docsUrl: '/docs/reconciliation',
  },
  {
    id: 'merchant-dashboard',
    title: 'Merchant Command Center & Analytics',
    category: 'Onboarding & Ops',
    duration: '1:30',
    videoSrc: '/videos/merchant_dashboard.mp4',
    description:
      'Centralized command center to monitor live payment collections, initiate vendor payouts, view success rate metrics, and manage business products in one view.',
    keyFeatures: ['Live Transaction Stream', 'Instant Payout Dispatch', 'Volume & Success Telemetry', 'Granular Access Roles'],
    docsUrl: '/docs/merchant-dashboard',
  },
  {
    id: 'distributor-dashboard',
    title: 'Distributor & Partner Ecosystem Portal',
    category: 'Onboarding & Ops',
    duration: '1:25',
    videoSrc: '/videos/distributor_dashboard.mp4',
    description:
      'Channel partner dashboard to onboard merchants, track onboarding approvals, monitor sub-merchant payment volumes, and calculate automated commission splits.',
    keyFeatures: ['Sub-Merchant Onboarding', 'Real-Time Approval Tracking', 'Automated Commission Ledgers', 'Volume Analytics'],
    docsUrl: '/docs/distributor-dashboard',
  },
  {
    id: 'checkout-page',
    title: 'High-Conversion Hosted Checkout & SDK',
    category: 'Payments & Checkout',
    duration: '1:15',
    videoSrc: '/videos/checkout_page.mp4',
    description:
      'Seamless web and mobile checkout supporting UPI, Credit/Debit cards, Net Banking, and Wallets with dynamic retry logic and high conversion optimization.',
    keyFeatures: ['All-in-One Payment Methods', 'Sub-Second Redirection', 'Customizable CSS/Themes', 'Encrypted Token Auth'],
    docsUrl: '/docs/checkout-page',
  },
  {
    id: 'pay-by-link',
    title: 'Instant Pay By Link (WhatsApp & SMS)',
    category: 'Payments & Checkout',
    duration: '1:05',
    videoSrc: '/videos/pay_by_link.mp4',
    description:
      'Generate instant payment links with custom amounts and descriptions. SabbPe dispatches links directly via WhatsApp, SMS, and email with live payment status tracking.',
    keyFeatures: ['No Website / App Required', 'Multi-Channel WhatsApp & SMS', 'Automatic Expiry & Reminders', 'Live Payment Callbacks'],
    docsUrl: '/docs/pay-by-link',
  },
  {
    id: 'split-payment',
    title: 'Split Payments & Marketplace Escrow',
    category: 'Payments & Checkout',
    duration: '1:10',
    videoSrc: '/videos/split_payment.mp4',
    description:
      'Define rules to automatically divide incoming payments between sellers, platform commissions, and vendor partners with compliant nodal account distribution.',
    keyFeatures: ['Multi-Party Automated Splits', 'Nodal Account Compliance', 'Custom Commission Rules', 'Independent Settlements'],
    docsUrl: '/docs/split-payment',
  },
  {
    id: 'smartpay',
    title: 'SmartPay No-Code Branded Payment Pages',
    category: 'Payments & Checkout',
    duration: '1:00',
    videoSrc: '/videos/Smartpay.mp4',
    description:
      'Design custom payment collection pages with custom logos, themes, and input fields. Publish instantly on a custom vanity link without writing code.',
    keyFeatures: ['Zero Coding Required', 'Custom Merchant Branding', 'Custom Form Fields', 'Instant Receipt Generation'],
    docsUrl: '/docs/smartpay',
  },
  {
    id: 'discount-coupons',
    title: 'Discount Coupons & Gift360 Checkout Vouchers',
    category: 'Loyalty & Gift360',
    duration: '1:15',
    videoSrc: '/videos/discount_coupons.mp4',
    description:
      'Convert checkout discounts into Gift360 voucher budgets. Shoppers unlock brand rewards and redeem SuperCoins directly inside the payment flow.',
    keyFeatures: ['Checkout Gamification', 'SuperCoins Redemption', '400+ Brand Vouchers', 'Repeat Purchase Booster'],
    docsUrl: '/docs/discount-coupons',
  },
  {
    id: 'upi-autopay',
    title: 'UPI AutoPay Recurring Billing Mandates',
    category: 'UPI & Collections',
    duration: '1:35',
    videoSrc: '/videos/UPI_Autopay.mp4',
    description:
      'One-click mandate authentication in any UPI app for subscriptions, EMIs, and recurring utility bills with automated debit schedules and retries.',
    keyFeatures: ['NPCI UPI 2.0 Spec', 'Pre-Debit Notifications', 'Automated Retry Logic', 'Instant Mandate Pause/Revoke'],
    docsUrl: '/docs/upi-autopay',
  },
  {
    id: 'easy-collect',
    title: 'Easy Collect Bulk Payment Demands',
    category: 'UPI & Collections',
    duration: '1:10',
    videoSrc: '/videos/easy_collect.mp4',
    description:
      'Upload a single spreadsheet with customer contacts, invoice amounts, and due dates. Automated payment links and reminders are sent across WhatsApp and SMS.',
    keyFeatures: ['Single Spreadsheet Ingestion', 'Automated Scheduled Reminders', 'Bulk Status Reconciliation', 'Zero Setup Time'],
    docsUrl: '/docs/easy-collect',
  },
  {
    id: 'sub-merchant',
    title: 'Sub-Merchant & Multi-Outlet QR Orchestration',
    category: 'UPI & Collections',
    duration: '1:20',
    videoSrc: '/videos/Sub-merchant.mp4',
    description:
      'Deploy static and dynamic UPI QRs for retail chains, franchises, and regional agents while centralizing collection analytics into a single master account.',
    keyFeatures: ['Hierarchical Store Tree', 'Unique Dynamic QR per Till', 'Consolidated Settlement Rollup', 'Branch-Level Analytics'],
    docsUrl: '/docs/sub-merchant',
  },
  {
    id: 'upi-deeplink',
    title: 'UPI Intent & Native App Deeplinking',
    category: 'UPI & Collections',
    duration: '0:55',
    videoSrc: '/videos/UPI_Deeplink.mp4',
    description:
      'Invoke Google Pay, PhonePe, Paytm, and BHIM natively on mobile with pre-populated VPA and amounts for frictionless 1-tap checkout experiences.',
    keyFeatures: ['Native App Switching', 'High Intent Conversion', 'Instant Server Webhooks', 'Zero UPI VPA Typing'],
    docsUrl: '/docs/upi-deeplink',
  },
  {
    id: 'payouts',
    title: 'Instant Bulk Payouts & Disbursements Engine',
    category: 'Disbursements & KYC',
    duration: '1:25',
    videoSrc: '/videos/Payouts.mp4',
    description:
      'Disburse funds 24x7 via IMPS, NEFT, RTGS, and UPI directly from your API or dashboard with pre-validation penny drops and balance protection.',
    keyFeatures: ['24x7 Sub-Second Clearing', 'Bulk Excel & API Disbursal', 'Name & Bank Verification', 'Real-Time UTR Callbacks'],
    docsUrl: '/docs/payouts',
  },
  {
    id: 'kyc-apis',
    title: 'KYC & Identity Verification APIs',
    category: 'Disbursements & KYC',
    duration: '1:30',
    videoSrc: '/videos/KYC_APIs.mp4',
    description:
      'Plug into unified APIs for Aadhaar OTP, PAN OCR, Bank Account Penny Drop validation, GSTIN lookup, and Aadhaar legal e-signatures.',
    keyFeatures: ['Govt Rail Verification', 'Instant Document OCR', 'Penny Drop Bank Check', 'Legally Binding e-Sign'],
    docsUrl: '/docs/kyc-apis',
  },
  {
    id: 'gift360-api-integration',
    title: 'Gift360 Reseller API Integration',
    category: 'Loyalty & Gift360',
    duration: '1:15',
    videoSrc: '/videos/Gift360-API_Integration.mp4',
    description:
      'Integrate brand vouchers directly into your app or fintech platform. Issue real-time codes for Amazon, Flipkart, Myntra, Swiggy, and 400+ top brands.',
    keyFeatures: ['Real-Time Voucher Issuance', '400+ Brand Catalog', 'Automated Margin Discounts', 'Instant Code Delivery'],
    docsUrl: '/docs/gift360-reseller-api',
  },
  {
    id: 'gift360-distributor',
    title: 'Gift360 Distributor Voucher Purchasing',
    category: 'Loyalty & Gift360',
    duration: '1:20',
    videoSrc: '/videos/GIFT360-Distributor.mp4',
    description:
      'Wholesale distributor portal for high-volume brand voucher purchasing with tiered discounts, credit limits, and custom denomination batches.',
    keyFeatures: ['Tier-Based Bulk Pricing', 'Custom Denomination Packs', 'Instant Digital Delivery', 'Partner Margin Reports'],
    docsUrl: '/docs/gift360-distributor',
  },
  {
    id: 'gift360-corporate',
    title: 'Gift360 Corporate & Employee Gifting',
    category: 'Loyalty & Gift360',
    duration: '1:10',
    videoSrc: '/videos/Gift360_corporate.mp4',
    description:
      'Bulk corporate reward allocation tool for HR and enterprise teams to disburse custom gift vouchers to thousands of employees in seconds.',
    keyFeatures: ['One-Upload Excel Workflow', 'Custom Branded Greetings', 'Automated Employee Delivery', 'Tax-Compliant Invoicing'],
    docsUrl: '/docs/gift360-corporate',
  },
  {
    id: 'gift360-loyalty',
    title: 'Gift360 Merchant Loyalty & CRM Engine',
    category: 'Loyalty & Gift360',
    duration: '1:35',
    videoSrc: '/videos/Gift360.mp4',
    description:
      'Turn standard payment transactions into repeat customer loops with automated cashbacks, loyalty points, and merchant CRM activation in one click.',
    keyFeatures: ['1-Click CRM Activation', 'Automated Cashback Rules', 'Customer Purchase Profiling', 'Brand Reward Exchange'],
    docsUrl: '/saas/gift360',
  },
];

const CATEGORIES = [
  'All',
  'Architecture & Engine',
  'Payments & Checkout',
  'Settlement & Ops',
  'UPI & Collections',
  'Disbursements & KYC',
  'Loyalty & Gift360',
  'Onboarding & Ops',
];

export default function BlogVideoGallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const filteredVideos = useMemo(() => {
    return ALL_BLOG_VIDEOS.filter((video) => {
      const matchesCategory =
        selectedCategory === 'All' || video.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.keyFeatures.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="videos" className="py-12 border-t border-slate-200/80 bg-[#F8FAFC]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0457F1] mb-2.5">
              <Film className="h-3.5 w-3.5 text-[#0457F1]" />
              Video Walkthroughs & Deep Dives
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
              See SabbPe in Action
            </h2>
            <p className="mt-1.5 max-w-2xl text-xs sm:text-sm text-[#475569]">
              Comprehensive video walkthroughs, system architectures, and step-by-step product demos across payment orchestration, UPI, settlements, and Gift360 CRM.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search all 21 videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white py-2 pl-10 pr-4 text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs focus:border-[#0457F1] focus:outline-none focus:ring-1 focus:ring-[#0457F1]"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto py-5 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const count =
              cat === 'All'
                ? ALL_BLOG_VIDEOS.length
                : ALL_BLOG_VIDEOS.filter((v) => v.category.toLowerCase() === cat.toLowerCase()).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0457F1] text-white shadow-2xs shadow-blue-500/20'
                    : 'border border-slate-200 bg-white text-[#475569] hover:border-slate-300 hover:text-[#0F172A]'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Video Grid */}
        {filteredVideos.length === 0 ? (
          <div className="my-12 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <Film className="mx-auto h-12 w-12 text-slate-300 mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No videos found</h3>
            <p className="mt-1 text-sm text-slate-500">
              Try adjusting your search query or filter category to find what you need.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 inline-flex items-center rounded-xl bg-[#0457F1] px-4 py-2 text-xs font-bold text-white shadow-2xs hover:bg-[#0346C4]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((video) => {
              const isPlaying = playingVideoId === video.id;

              return (
                <div
                  key={video.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xs transition-all duration-300 hover:border-[#0457F1]/50 hover:shadow-md"
                >
                  <div>
                    {/* Video Player / Interactive Poster Card */}
                    <div className="relative aspect-video w-full overflow-hidden bg-[#0A1120]">
                      {isPlaying ? (
                        <video
                          controls
                          autoPlay
                          playsInline
                          className="h-full w-full object-contain bg-black"
                          aria-label={`${video.title} video`}
                        >
                          <source src={`${video.videoSrc}#t=1`} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setPlayingVideoId(video.id)}
                          className="group/player relative flex h-full w-full flex-col justify-between p-4 text-left transition-all hover:bg-[#0E172A] cursor-pointer"
                          aria-label={`Play ${video.title}`}
                        >
                          {/* Ambient Tech Grid backdrop */}
                          <div
                            className="pointer-events-none absolute inset-0 opacity-20"
                            style={{
                              backgroundImage: 'radial-gradient(circle at 1px 1px, #38BDF8 1px, transparent 0)',
                              backgroundSize: '16px 16px',
                            }}
                          />

                          {/* Top pill */}
                          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-cyan-300">
                            <span className="flex items-center gap-1.5 rounded-md bg-blue-950/80 border border-blue-500/30 px-2 py-0.5 text-[10.5px]">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                              DEMO READY
                            </span>
                            {video.duration && (
                              <span className="flex items-center gap-1 text-slate-300">
                                <Clock className="h-3 w-3 text-cyan-400" />
                                {video.duration}
                              </span>
                            )}
                          </div>

                          {/* Center Play Button Overlay */}
                          <div className="relative z-10 my-auto flex flex-col items-center justify-center gap-2 text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0457F1] text-white shadow-[0_0_25px_rgba(4,87,241,0.7)] transition-all group-hover/player:scale-110 group-hover/player:bg-[#0284C7]">
                              <Play className="h-5 w-5 fill-white ml-0.5" />
                            </div>
                            <span className="text-[11px] font-bold text-slate-300 group-hover/player:text-white transition-colors">
                              Click to Watch Walkthrough
                            </span>
                          </div>

                          {/* Bottom title preview */}
                          <div className="relative z-10 truncate text-[11px] text-slate-400 font-medium">
                            {video.title}
                          </div>
                        </button>
                      )}
                    </div>

                    {/* Video Content & Metadata */}
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="rounded-md bg-blue-50 border border-blue-100/80 px-2.5 py-0.5 text-[11px] font-bold text-[#0457F1]">
                          {video.category}
                        </span>
                        {video.duration && (
                          <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                            <Clock className="h-3 w-3 text-slate-400" />
                            {video.duration}
                          </span>
                        )}
                      </div>

                      <h3 className="font-display text-base font-bold leading-snug text-[#0F172A] group-hover:text-[#0457F1] transition-colors">
                        {video.title}
                      </h3>

                      <p className="mt-2 text-xs leading-relaxed text-[#475569] line-clamp-2">
                        {video.description}
                      </p>

                      {/* Key Highlights */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5">
                        {video.keyFeatures.map((feat, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600 border border-slate-200/60"
                          >
                            <CheckCircle2 className="h-2.5 w-2.5 text-[#0457F1]" />
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer link */}
                  {video.docsUrl && (
                    <div className="px-5 pb-5 pt-0">
                      <Link
                        href={video.docsUrl}
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-[#F8FAFC] py-2 text-xs font-semibold text-[#0F172A] transition-colors hover:border-[#0457F1] hover:bg-[#EEF5FF] hover:text-[#0457F1]"
                      >
                        <span>Explore Technical Details</span>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
