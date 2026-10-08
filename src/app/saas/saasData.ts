import React from 'react';
import {
  LayoutDashboard,
  RefreshCw,
  BarChart3,
  Key,
  Receipt,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
  Layers,
  FileSpreadsheet,
  Building2,
  Download,
  Clock,
  ArrowRight,
  Database,
  Search,
} from 'lucide-react';

export interface SaasModule {
  slug: string;
  name: string;
  category: string;
  badge: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  stats: { label: string; value: string; helper: string }[];
  keyHighlights: { title: string; desc: string; icon: React.ElementType }[];
  workflowSteps: { step: string; title: string; desc: string }[];
  technicalSpecs: { title: string; items: string[] }[];
  interactiveData?: any;
}

export const SAAS_MODULES: Record<string, SaasModule> = {
  'reconciliation': {
    slug: 'reconciliation',
    name: 'Automated Reconciliation Engine',
    category: 'SaaS Platform • Financial Operations',
    badge: 'Zero Manual Error',
    tagline: 'Match every penny across payment gateways, bank nodal accounts, and your ERP ledger automatically.',
    description: 'SabbPe Reconciliation replaces hours of manual spreadsheet matching with real-time 3-way automated matching. Detect exceptions, auto-tag refunds, and sync clean journals directly into Tally, SAP, Zoho Books, or Oracle NetSuite.',
    icon: RefreshCw,
    stats: [
      { label: 'Matching Accuracy', value: '99.98%', helper: 'Across 15M+ monthly transactions' },
      { label: 'Recon Speed', value: 'Real-time', helper: 'Instant matching on settlement credit' },
      { label: 'Hours Saved', value: '120+ hrs', helper: 'Per finance team every month' },
      { label: 'ERP Connectors', value: '10+ Ready', helper: 'Tally, SAP, Zoho, Oracle, QuickBooks' },
    ],
    keyHighlights: [
      {
        title: '3-Way Intelligent Matching',
        desc: 'Simultaneously cross-checks transaction logs from payment gateways, bank settlement UTR files, and internal order books to ensure zero discrepancy.',
        icon: Layers,
      },
      {
        title: 'Instant Exception & Dispute Alerts',
        desc: 'Automatically flags missing payouts, delayed settlements, double debits, and chargebacks with root-cause diagnostics.',
        icon: ShieldCheck,
      },
      {
        title: 'Automated ERP Journal Sync',
        desc: 'Generates double-entry accounting entries, GST breakdowns, and MDR fee ledger postings directly into your financial software.',
        icon: Database,
      },
      {
        title: 'Refund & Chargeback Tagging',
        desc: 'Maps customer refunds and chargeback deductions back to the original order ID without manual investigation.',
        icon: CheckCircle2,
      },
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Multi-Source Data Ingestion',
        desc: 'Pulls gateway webhooks, bank MT940/CAMT feeds, and order book databases continuously.',
      },
      {
        step: '02',
        title: 'Rules-Based Matching Algorithm',
        desc: 'Matches transactions on Order ID, RRN, Amount, and Settlement UTR with tolerance parameters.',
      },
      {
        step: '03',
        title: 'Exception Resolution & ERP Export',
        desc: 'Resolves edge cases automatically and pushes verified ledger entries straight to accounting.',
      },
    ],
    technicalSpecs: [
      {
        title: 'Data Sources Supported',
        items: ['All major Indian Bank Nodal / Escrow accounts', 'PG logs: SabbPe, Razorpay, PayU, Cashfree, Billdesk', 'UPI NPCI settlement logs & card network files'],
      },
      {
        title: 'Export & Integration formats',
        items: ['Direct REST API webhooks', 'Automated Daily SFTP export', 'Formatted CSV, Excel (XLSX), JSON & PDF reports'],
      },
    ],
  },

  'dashboard': {
    slug: 'dashboard',
    name: 'Unified Payments & Analytics Dashboard',
    category: 'SaaS Platform • Executive Command Center',
    badge: 'Live Intelligence',
    tagline: 'One centralized view for all collections, payouts, routing health, and settlement pipelines.',
    description: 'Gain real-time visibility across all payment rails, business entities, and merchant accounts. Track live conversion rates, investigate transaction drops, monitor gateway latency, and manage team permissions from a single intuitive console.',
    icon: LayoutDashboard,
    stats: [
      { label: 'Live Telemetry', value: '< 200ms', helper: 'Real-time WebSocket metric stream' },
      { label: 'Conversion Lift', value: '+4.2%', helper: 'Via dynamic gateway health alerts' },
      { label: 'Entities Supported', value: 'Unlimited', helper: 'Multi-brand & franchise hierarchy' },
      { label: 'Export Speed', value: '1-Click', helper: 'Export millions of rows in seconds' },
    ],
    keyHighlights: [
      {
        title: 'Comprehensive Financial Overview',
        desc: 'Real-time Gross Merchandise Value (GMV), net settlement pipelines, pending refunds, and active dispute tracking on one screen.',
        icon: TrendingUp,
      },
      {
        title: 'Gateway Health & Success Rate Monitor',
        desc: 'Live uptime and conversion tracking across SBI, HDFC, ICICI, Axis, and card networks to preempt bank downtime.',
        icon: Zap,
      },
      {
        title: 'Granular Role-Based Access Control',
        desc: 'Assign customized permissions for Finance, Operations, Developers, and Support agents with comprehensive audit logs.',
        icon: ShieldCheck,
      },
      {
        title: 'Deep Transaction Drill-Down',
        desc: 'Search any payment instantly by Customer Phone, VPA, Card BIN, RRN, or Bank Reference Number with timeline traces.',
        icon: Search,
      },
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Unified Stream Aggregation',
        desc: 'Ingests collections, payouts, and settlement events in real-time across all your payment accounts.',
      },
      {
        step: '02',
        title: 'Live Analytical Processing',
        desc: 'Computes conversion funnels, payment method splits, and settlement schedules dynamically.',
      },
      {
        step: '03',
        title: 'Actionable Intelligence & Reports',
        desc: 'Provides 1-click refunds, manual payout retries, custom data filtering, and automated executive email digests.',
      },
    ],
    technicalSpecs: [
      {
        title: 'Supported Visualizations',
        items: ['Hourly & Daily GMV Trendlines', 'Payment Mode Breakdown (UPI / Cards / Netbanking / Wallets)', 'Bank-wise Success vs Failure Heatmaps', 'Settlement Aging & Forecast Charts'],
      },
      {
        title: 'Security & Compliance',
        items: ['SOC2 Type II & ISO 27001 Certified', '2-Factor Authentication (2FA) & SSO (SAML/Okta)', 'Masked PII data & PCI-DSS Level 1 compliant'],
      },
    ],
  },

  'settlement-reporting': {
    slug: 'settlement-reporting',
    name: 'Settlement & Automated Reporting Engine',
    category: 'Services & Operations • Settlement Suite',
    badge: 'T+0 & T+1 Ready',
    tagline: 'Fast, predictable settlements with downloadable audit-ready tax and financial reports.',
    description: 'Never wait days for your money. SabbPe settlement engine provides T+0 same-day and T+1 morning settlements directly into your primary bank account, with granular breakdown of gross collections, MDR fees, GST, and net payouts.',
    icon: Receipt,
    stats: [
      { label: 'Settlement Cycles', value: 'T+0 / T+1', helper: 'Customizable intraday payout windows' },
      { label: 'Payout Reliability', value: '99.99%', helper: 'Direct nodal bank API integration' },
      { label: 'Tax Compliance', value: '100% Ready', helper: 'Automated monthly GST invoices' },
      { label: 'Report Formats', value: 'CSV, XLSX, PDF', helper: 'Scheduled email & SFTP delivery' },
    ],
    keyHighlights: [
      {
        title: 'Instant T+0 & T+1 Settlement Cycles',
        desc: 'Accelerate your cash flow with customizable settlement triggers, including hourly batches and weekend settlement support.',
        icon: Clock,
      },
      {
        title: 'Downloadable Audit-Ready Reports',
        desc: 'Export comprehensive settlement summaries, transaction-level fee breakdowns, and monthly GST tax invoices with one click.',
        icon: FileSpreadsheet,
      },
      {
        title: 'Automated Net Settlement Calculations',
        desc: 'Transparently calculates net payout after MDR deductions, chargeback reserves, and refunds with zero hidden charges.',
        icon: Receipt,
      },
      {
        title: 'Multi-Account Splitting',
        desc: 'Split daily settlements automatically across different branch accounts, vendor nodal accounts, or reserve pools.',
        icon: Building2,
      },
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Daily Cut-off & Net Calculation',
        desc: 'Aggregates settled customer transactions, adjusts refunds/fees, and creates net transfer instruction.',
      },
      {
        step: '02',
        title: 'Direct Bank Transfer via RTGS/NEFT/IMPS',
        desc: 'Dispatches funds directly to your registered bank account with an instant UTR reference.',
      },
      {
        step: '03',
        title: 'Automated Report Delivery',
        desc: 'Generates downloadable CSV/Excel settlement files and delivers them directly via email, SFTP, or dashboard.',
      },
    ],
    technicalSpecs: [
      {
        title: 'Settlement Options',
        items: ['Same-Day T+0 Express Settlement', 'Next-Day T+1 Standard Morning Batch', 'Custom Hourly / Event-Driven Settlement triggers', 'Multi-Vendor Split Settlement'],
      },
      {
        title: 'Reporting Fields Provided',
        items: ['UTR Reference Number', 'Order ID & Merchant Reference', 'Gross Amount, MDR Fee & GST Deducted', 'Net Settlement Amount & Timestamp'],
      },
    ],
  },

  'analytics': {
    slug: 'analytics',
    name: 'Advanced Analytics & Insights Engine',
    category: 'SaaS Platform • Intelligence',
    badge: 'AI-Powered Insights',
    tagline: 'Turn raw transaction logs into growth strategies with cohort tracking and drop-off analytics.',
    description: 'Understand customer purchasing behavior, identify checkout friction points, benchmark gateway costs, and optimize your conversion funnel with SabbPe deep payment analytics.',
    icon: BarChart3,
    stats: [
      { label: 'Data Retention', value: '5 Years', helper: 'Historical trend & seasonal analysis' },
      { label: 'Query Latency', value: '< 1.2s', helper: 'Blazing fast aggregation on big data' },
      { label: 'Custom Reports', value: 'Unlimited', helper: 'Drag-and-drop metrics builder' },
      { label: 'AI Anomaly Alerts', value: 'Real-time', helper: 'Proactive detection of conversion dips' },
    ],
    keyHighlights: [
      {
        title: 'Checkout Funnel Optimization',
        desc: 'Track drop-offs across OTP entry, UPI app switching, and bank 3DS verification to maximize checkout conversion.',
        icon: TrendingUp,
      },
      {
        title: 'Cost & MDR Optimization Insights',
        desc: 'Compare transaction processing costs across payment modes and gateways to negotiate better interchange rates.',
        icon: Receipt,
      },
      {
        title: 'Customer Cohort & Repeat Behavior',
        desc: 'Analyze repeat customer frequencies, average order values (AOV), and customer lifetime value (LTV) from payment telemetry.',
        icon: Layers,
      },
      {
        title: 'Scheduled Executive Digests',
        desc: 'Automate weekly and monthly PDF reports directly to leadership with key financial and operational KPIs.',
        icon: Download,
      },
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Continuous Telemetry Capture',
        desc: 'Captures every checkout touchpoint, device profile, and network outcome.',
      },
      {
        step: '02',
        title: 'Machine Learning Normalization',
        desc: 'Categorizes error codes and classifies failure causes into user, bank, or gateway issues.',
      },
      {
        step: '03',
        title: 'Actionable Dashboards & Automated Alerts',
        desc: 'Provides clear visual recommendations to reconfigure smart routing rules for higher revenue.',
      },
    ],
    technicalSpecs: [
      {
        title: 'Analytics Capabilities',
        items: ['Multi-dimensional slicing (Device, OS, Bank, Method, Location)', 'Time-series comparative analysis (Day-over-Day, Year-over-Year)', 'Payment failure categorization (Insufficient funds, Network timeout, OTP error)'],
      },
      {
        title: 'Integration & Exports',
        items: ['Snowflake, Google BigQuery, Amazon Redshift data connectors', 'Automated Daily CSV/Parquet dumps via AWS S3', 'Custom RESTful Analytics API endpoints'],
      },
    ],
  },

  'api': {
    slug: 'api',
    name: 'Developer API & Integration Suite',
    category: 'SaaS Platform • Developer Hub',
    badge: '99.99% Uptime',
    tagline: 'Modern REST APIs, webhooks, and mobile SDKs designed for frictionless integration.',
    description: 'Build custom payment experiences in minutes. SabbPe developer suite offers clean RESTful APIs, robust webhooks with HMAC signatures, client SDKs for Web, iOS, Android, Flutter, and React Native, alongside sandbox environments for end-to-end testing.',
    icon: Key,
    stats: [
      { label: 'API Uptime SLA', value: '99.99%', helper: 'Multi-region cloud infrastructure' },
      { label: 'Avg Latency', value: '85ms', helper: 'Optimized high-throughput endpoints' },
      { label: 'SDK Languages', value: '8+ SDKs', helper: 'Node, Python, Java, PHP, Go, React' },
      { label: 'Webhook Latency', value: '< 100ms', helper: 'Instant event push with retry queues' },
    ],
    keyHighlights: [
      {
        title: 'Standardized REST Architecture',
        desc: 'Consistent JSON payloads, standard HTTP status codes, and clear error schemas with developer-friendly messages.',
        icon: Zap,
      },
      {
        title: 'Robust Webhook Delivery & Retries',
        desc: 'Event notifications for payment success, refunds, settlements, and dispute updates with automatic exponential backoff retries.',
        icon: RefreshCw,
      },
      {
        title: 'Client SDKs & Ready Plugins',
        desc: 'Drop-in SDKs for React, Next.js, Android, iOS, Flutter, and pre-built plugins for WooCommerce, Shopify, and Magento.',
        icon: Layers,
      },
      {
        title: 'Isolated Sandbox Environment',
        desc: 'Simulate successful payments, bank OTP delays, card declines, and refunds without real money transactions.',
        icon: ShieldCheck,
      },
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Obtain API Credentials',
        desc: 'Generate public and secret API keys in the developer dashboard in under 30 seconds.',
      },
      {
        step: '02',
        title: 'Initialize SDK or API Client',
        desc: 'Create payment orders with 3 lines of code in your preferred backend language.',
      },
      {
        step: '03',
        title: 'Listen to Signed Webhooks',
        desc: 'Verify webhook signatures and update your internal fulfillment database securely.',
      },
    ],
    technicalSpecs: [
      {
        title: 'Security & Protocol',
        items: ['TLS 1.3 encryption for all in-transit communications', 'HMAC-SHA256 signature verification for webhooks', 'IP Whitelisting & API key scoping'],
      },
      {
        title: 'Supported Frameworks',
        items: ['Node.js, TypeScript, Python, Java, PHP, Go, Ruby', 'React, Next.js, Vue, Angular, React Native, Flutter, Swift, Kotlin'],
      },
    ],
  },
};
