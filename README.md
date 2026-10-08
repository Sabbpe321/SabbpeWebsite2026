# SabbPe — Payment Orchestration, SaaS & Loyalty Platform

> Modern, enterprise-grade web platform for **SabbPe** (Next-Gen Payment Orchestration) and **Gift360 Engine** (CRM & Customer Loyalty).

Built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## 🚀 Teammate Quick-Start Guide (Step-by-Step)

Follow these steps to run the project on your local machine:

### 1. Prerequisites
Before starting, make sure you have installed:
- **Node.js**: `v18.18.0` or higher (`v20.x` or `v22.x` LTS recommended)
  - Verify by running: `node -v`
- **npm** (comes bundled with Node.js)
  - Verify by running: `npm -v`

---

### 2. Unzip & Open Project
1. Extract the `sabbpe-homepage-redesign.zip` archive into your desired directory.
2. Open the extracted folder in your terminal or in your code editor (e.g. VS Code).

```bash
# In terminal, navigate to the project directory
cd sabbpe-homepage-redesign
```

---

### 3. Install Dependencies
Run the following command to download and install all required packages:

```bash
npm install
```

---

### 4. Start Development Server
Run the local dev server:

```bash
npm run dev
```

Once started, open your web browser and go to:
👉 **[http://localhost:3000](http://localhost:3000)**

The website will load with full interactive features, dynamic video player demos, live animations, and fast-refresh enabled.

---

### 5. Production Build & Test (Optional)
To test the optimized production build locally:

```bash
# 1. Compile TypeScript and generate 43 static pages (SSG)
npm run build

# 2. Start the production server
npm run start
```
Open **`http://localhost:3000`** to test the production build.

---

## 📁 Project Architecture & Directory Structure

```plaintext
sabbpe-homepage-redesign/
├── public/
│   ├── sabbpe_logo.png           # Official SabbPe brand logo
│   └── videos/                   # 13 system demonstration MP4 videos
│       ├── pay_by_link.mp4
│       ├── split_payment.mp4
│       ├── Smartpay.mp4
│       ├── UPI_Autopay.mp4
│       ├── easy_collect.mp4
│       ├── Sub-merchant.mp4
│       ├── UPI_Deeplink.mp4
│       ├── Payouts.mp4
│       ├── KYC_APIs.mp4
│       ├── Gift360.mp4
│       ├── Gift360_corporate.mp4
│       ├── Gift360-API_Integration.mp4
│       └── GIFT360-Distributor.mp4
│
├── src/
│   ├── app/                      # Next.js 15 App Router Routes
│   │   ├── page.tsx              # Homepage
│   │   ├── layout.tsx            # Root layout, metadata & favicon
│   │   ├── not-found.tsx         # Custom branded 404 handler
│   │   ├── services/
│   │   │   ├── page.tsx          # Services directory
│   │   │   └── [slug]/page.tsx   # Dynamic service routes & video player
│   │   ├── saas/
│   │   │   ├── page.tsx          # SaaS suite overview
│   │   │   ├── [slug]/page.tsx   # Dynamic SaaS module routes
│   │   │   └── saasData.ts       # Centralized SaaS data & specifications
│   │   ├── technology/
│   │   │   ├── page.tsx          # Technology consulting & development
│   │   │   ├── [slug]/page.tsx   # Dynamic technology service pages
│   │   │   └── techData.ts       # Technology service data definitions
│   │   ├── blog/page.tsx         # Engineering & FinTech Blog
│   │   ├── contact/page.tsx      # Contact & support inquiry form
│   │   ├── about/page.tsx        # Company, mission & recognitions
│   │   ├── privacy/page.tsx      # RBI & PCI-DSS privacy policy
│   │   └── terms/page.tsx        # Terms of service agreement
│   │
│   └── components/
│       ├── navigation/
│       │   └── Navbar.tsx        # Clean mega-menu dropdowns, drawer & CTA buttons
│       ├── premium/
│       │   └── Footer.tsx        # Global enterprise footer
│       ├── modals/
│       │   └── DemoModal.tsx     # React Portal modal with demo booking form
│       └── redesign/
│           ├── ServicesVideoSuite.tsx  # Interactive live MP4 video demo player with timebar scrubber
│           ├── SaasProductDetail.tsx   # Rich SaaS / Operations interactive view
│           ├── Hero.tsx                # Homepage hero banner & recognition badges
│           ├── PaymentFlow.tsx         # Visual payment lifecycle walkthrough
│           ├── ProductsIndex.tsx       # 2-column service catalog cards
│           ├── StatsCard.tsx           # Live animated metrics & SLA counters
│           ├── TechStackShowcase.tsx   # Automated 4-node animated architecture pipeline
│           └── ui.tsx                  # Standardized typography & focus helpers
│
├── next.config.ts                # Next.js settings & configurations
├── tailwind.config.ts            # Tailwind styling tokens & design system
└── tsconfig.json                 # Strict TypeScript configuration
```

---

## 🌟 Key Features & Highlights

### 1. Interactive Services Video Demonstration Suite (`/services/*`)
- **13 HD Video Demos** mapped across **5 categories**:
  - **Online Payments** (`/services/online-payments`): Pay-by-Link, Split Payment, Smartpay.
  - **Collections and Recurring** (`/services/collections-recurring`): UPI Autopay, Easy Collect, Sub-Merchant Collections.
  - **UPI and QR** (`/services/upi-qr`): UPI Deeplink, Smartpay.
  - **Disbursements** (`/services/disbursements`): Instant Payouts.
  - **Gift360 Engine** (`/services/gift360`): Loyalty & Rewards, Corporate Gifting, API Integration, Distributor Rewards.
- **Interactive Timebar Scrubber**: Full-width seekable progress bar with dynamic timestamps (`0:14 / 0:45`) and volume/fullscreen controls.

### 2. SaaS & Operations Platform (`/saas/*`)
- **Automated Reconciliation Engine** (`/saas/reconciliation`): 3-way matching table (Gateway ↔ Bank UTR ↔ ERP Ledger), exception tracking, and journal exports (Tally, SAP, Zoho Books).
- **Unified Dashboard & Analytics** (`/saas/dashboard`): Real-time GMV tracking, conversion funnel metrics, payment mode breakdown, and smart routing health monitor.
- **Settlement & Reporting** (`/services/settlement-reporting`): Interactive **T+0 Same-Day** vs **T+1 Morning** cycle simulator and downloadable report previews.

### 3. High-Tech Architecture Simulation
- Interactive 4-node automated stepper (Ingestion → Smart Routing → T+0 Settlement → Gift360 Engine) with live transaction telemetry stream, cybernetic scanlines, and click-to-inspect nodes.

---

## 📜 Available NPM Commands

| Script | Command | Description |
|---|---|---|
| **Development** | `npm run dev` | Runs the Next.js dev server on `http://localhost:3000` |
| **Build** | `npm run build` | Compiles TypeScript and generates 43 static SSG pages |
| **Start** | `npm run start` | Starts the optimized production HTTP server |
| **Lint** | `npm run lint` | Runs ESLint checks |

---

## 🛠️ Common Troubleshooting

- **Port 3000 is in use**:
  If port 3000 is taken, Next.js will automatically suggest `http://localhost:3001`, or you can run:
  ```bash
  npm run dev -- -p 3005
  ```
- **Node version mismatch**:
  Make sure you are running Node.js 18.18+ or 20+:
  ```bash
  node -v
  ```
- **Clean re-install**:
  If dependencies need a clean reset:
  ```bash
  # Windows PowerShell
  Remove-Item -Recurse -Force node_modules, .next
  npm install
  ```

---

## 🤝 Support & Inquiries
- **Company**: SabbPe Technologies Pvt Ltd
- **Website**: [https://www.sabbpe.com](https://www.sabbpe.com)
- **Onboarding Portal**: [https://onboarding.sabbpe.com](https://onboarding.sabbpe.com)
- **Gift360 Loyalty**: [https://www.gift360.io](https://www.gift360.io)
