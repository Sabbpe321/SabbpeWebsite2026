import {
  Code2,
  Cpu,
  Smartphone,
  Palette,
  Lightbulb,
  Users,
  Briefcase,
  Target,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Server,
  Globe,
  TrendingUp,
} from 'lucide-react';

export interface TechItem {
  slug: string;
  category: 'DEVELOPMENT' | 'DESIGN & STRATEGY' | 'RECRUITMENT';
  name: string;
  tagline: string;
  description: string;
  icon: any;
  deliverables: { title: string; desc: string }[];
  techStack: string[];
  metrics: { label: string; value: string }[];
}

export const TECH_ITEMS: Record<string, TechItem> = {
  'custom-app-development': {
    slug: 'custom-app-development',
    category: 'DEVELOPMENT',
    name: 'Custom App Development',
    tagline: 'Tailored enterprise web, backend & mobile applications engineered for extreme scale',
    description: 'We engineer bespoke enterprise applications, microservice payment gateways, and merchant management dashboards tailored specifically to your transaction workflows and compliance requirements.',
    icon: Code2,
    deliverables: [
      { title: 'Full-Stack Web & SaaS', desc: 'Modern React/Next.js frontends powered by Node.js, Go, or Java backends.' },
      { title: 'High-Throughput APIs', desc: 'RESTful and gRPC microservices processing thousands of requests per second.' },
      { title: 'Payment Gateway Integrations', desc: 'Deep custom integrations with NPCI UPI, banking APIs, and global card networks.' },
      { title: 'Merchant Portals', desc: 'Real-time telemetry, transaction tracking, ledger settlement, and dispute portals.' },
    ],
    techStack: ['Next.js', 'React', 'Node.js', 'Go', 'Java Spring Boot', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    metrics: [
      { label: 'Uptime SLA', value: '99.99%' },
      { label: 'Latency', value: '<50ms' },
      { label: 'Daily TPS', value: '10K+' },
    ],
  },
  'digital-transformation': {
    slug: 'digital-transformation',
    category: 'DEVELOPMENT',
    name: 'Digital Transformation',
    tagline: 'Modernizing core architectures with cloud-native scalability and zero downtime',
    description: 'Accelerate your digital evolution by migrating legacy core systems to resilient cloud-native architectures, automating manual compliance checks, and integrating AI-driven transaction routing.',
    icon: Cpu,
    deliverables: [
      { title: 'Legacy Modernization', desc: 'Deconstruct monoliths into event-driven cloud microservices with zero downtime.' },
      { title: 'Cloud Infrastructure & DevOps', desc: 'Automated CI/CD pipelines, Kubernetes orchestration, and multi-region failover.' },
      { title: 'Automated Data Pipelines', desc: 'Real-time ETL pipelines feeding settlement engines and financial reporting.' },
      { title: 'AI & Automation', desc: 'Automated digital KYC verification, fraud detection, and transaction scoring.' },
    ],
    techStack: ['Kubernetes', 'Terraform', 'AWS / GCP', 'Kafka', 'Apache Flink', 'Python', 'Prometheus'],
    metrics: [
      { label: 'Deployment Speed', value: '10x Faster' },
      { label: 'Infra Cost Savings', value: '35%' },
      { label: 'Failover Time', value: '<1s' },
    ],
  },
  'enterprise-mobility': {
    slug: 'enterprise-mobility',
    category: 'DEVELOPMENT',
    name: 'Enterprise Mobility',
    tagline: 'Secure cross-platform digital infrastructure, merchant apps, and field SDKs',
    description: 'Build secure, high-performance Android and iOS mobile applications, POS terminal software, soundbox firmware interfaces, and merchant companion apps.',
    icon: Smartphone,
    deliverables: [
      { title: 'Merchant & POS Apps', desc: 'Lightweight Android & iOS apps with instant soundbox and Bluetooth printer sync.' },
      { title: 'UPI Intent Mobile SDKs', desc: 'Embed seamless 1-click in-app UPI payments into your mobile apps.' },
      { title: 'Offline Transaction Handling', desc: 'Secure offline store-and-forward queueing with biometric authentication.' },
      { title: 'App Security & Tokenization', desc: 'Zero-trust device binding, biometric login, and encrypted payload handling.' },
    ],
    techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Android POS SDKs', 'BLE', 'WebSockets'],
    metrics: [
      { label: 'App Store Rating', value: '4.8★' },
      { label: 'Crash-Free Rate', value: '99.9%' },
      { label: 'SDK Bundle Size', value: '<3MB' },
    ],
  },
  'ui-ux-design': {
    slug: 'ui-ux-design',
    category: 'DESIGN & STRATEGY',
    name: 'UI/UX Design Thinking',
    tagline: 'User-centric interfaces engineered for friction-free conversion and trust',
    description: 'We design high-converting checkout flows, intuitive financial dashboards, and delightful mobile customer experiences backed by rigorous behavioral research and usability benchmarks.',
    icon: Palette,
    deliverables: [
      { title: 'Checkout UX Optimization', desc: 'Frictionless multi-step payment flows designed to minimize drop-offs.' },
      { title: 'Design Systems & Tokens', desc: 'Scalable design component libraries for web, iOS, and Android applications.' },
      { title: 'User Research & Journey Maps', desc: 'In-depth merchant interviews, usability testing, and conversion funnel audits.' },
      { title: 'Interactive Prototypes', desc: 'Pixel-perfect, testable Figma prototypes with micro-interactions and motion.' },
    ],
    techStack: ['Figma', 'Storybook', 'Tailwind CSS', 'Framer Motion', 'Hotjar', 'Lottie'],
    metrics: [
      { label: 'Conversion Lift', value: '+28%' },
      { label: 'Checkout Time', value: '-40%' },
      { label: 'Design Tokens', value: '200+' },
    ],
  },
  'consulting': {
    slug: 'consulting',
    category: 'DESIGN & STRATEGY',
    name: 'Technology Consulting',
    tagline: 'Fintech strategy, cloud architecture & compliance advisory for fast-growing businesses',
    description: 'Partner with seasoned fintech architects to evaluate regulatory compliance (RBI guidelines, ISO 27001, PCI-DSS), design scalable payment topologies, and optimize transaction unit economics.',
    icon: Lightbulb,
    deliverables: [
      { title: 'Payment Architecture Audits', desc: 'Comprehensive reviews of gateway routing, gateway costs, and success rates.' },
      { title: 'Security & Compliance Roadmap', desc: 'Readiness consulting for ISO 27001, data localization, and tokenization.' },
      { title: 'Vendor & Bank Partner Strategy', desc: 'Selecting and negotiating optimal merchant acquiring and payout partners.' },
      { title: 'Cloud Cost Optimization', desc: 'Right-sizing cloud infrastructure to reduce operational burn.' },
    ],
    techStack: ['RBI Master Directions', 'PCI-DSS v4.0', 'ISO 27001', 'Cloud Architecture', 'FinOps'],
    metrics: [
      { label: 'Cost Reduction', value: '30%' },
      { label: 'Compliance Score', value: '100%' },
      { label: 'Success Rate Gain', value: '+4.5%' },
    ],
  },
  'staff-augmentation': {
    slug: 'staff-augmentation',
    category: 'DESIGN & STRATEGY',
    name: 'IT Staff Augmentation',
    tagline: 'Dedicated vetted senior engineering teams embedded into your technical roadmap',
    description: 'Scale your engineering bandwidth on demand with pre-vetted senior software engineers, fintech developers, DevOps specialists, and QA automation experts.',
    icon: Users,
    deliverables: [
      { title: 'Senior Full-Stack Engineers', desc: 'Proficient in modern TypeScript, React, Go, Java, and cloud microservices.' },
      { title: 'Fintech Domain Specialists', desc: 'Engineers experienced with UPI rails, reconciliation, and payment gateways.' },
      { title: 'DevOps & SRE Leads', desc: 'Kubernetes, Terraform, and cloud infrastructure reliability engineering.' },
      { title: 'Flexible Engagement', desc: 'Ramp up or down within 7 business days with zero hiring overhead.' },
    ],
    techStack: ['Full-Stack', 'Cloud SRE', 'Fintech QA', 'Data Engineering', 'Mobile Leads'],
    metrics: [
      { label: 'Time-to-Deploy', value: '48 Hours' },
      { label: 'Vetting Pass Rate', value: '<3%' },
      { label: 'Retention Rate', value: '96%' },
    ],
  },
  'managed-recruitment': {
    slug: 'managed-recruitment',
    category: 'RECRUITMENT',
    name: 'Managed Recruitment',
    tagline: 'End-to-end specialized technical talent acquisition for engineering teams',
    description: 'Outsource your technical recruitment pipeline. We source, screen, technically evaluate, and onboard top-tier software engineers and engineering managers.',
    icon: Briefcase,
    deliverables: [
      { title: 'Executive & Tech Leadership', desc: 'Headhunting VPs of Engineering, Principal Architects, and Tech Leads.' },
      { title: 'Rigorous Technical Screening', desc: 'Live coding interviews and architectural system design evaluations.' },
      { title: 'Pipeline Management', desc: 'Dedicated recruiting managers handling scheduling, offers, and onboarding.' },
      { title: 'Zero Hire Risk', desc: 'Replacement guarantee on all placed technical candidates.' },
    ],
    techStack: ['Tech Headhunting', 'Technical Vetting', 'Executive Search', 'ATS Sync'],
    metrics: [
      { label: 'Interview-to-Offer', value: '3:1' },
      { label: 'Average Time to Hire', value: '14 Days' },
      { label: 'Offer Acceptance', value: '91%' },
    ],
  },
  'talent-solutions': {
    slug: 'talent-solutions',
    category: 'RECRUITMENT',
    name: 'Talent Solutions',
    tagline: 'Expert hiring for specialized fintech, blockchain, and security roles',
    description: 'Find niche talent in high demand: payment protocol engineers, compliance officers, cryptographers, data scientists, and fraud detection engineers.',
    icon: Target,
    deliverables: [
      { title: 'Niche Domain Experts', desc: 'Payment orchestration engineers, tokenization leads, and core banking developers.' },
      { title: 'Compliance & Risk Officers', desc: 'Regulatory specialists with proven track records in RBI compliance.' },
      { title: 'Security & Pen-Testers', desc: 'Certified ethical hackers and cloud security architects.' },
      { title: 'Data & AI Scientists', desc: 'ML engineers specialized in anomaly detection and smart routing optimization.' },
    ],
    techStack: ['Fintech Specialists', 'Security Leads', 'ML Engineers', 'Core Banking'],
    metrics: [
      { label: 'Candidate Pool', value: '50K+' },
      { label: 'Domain Experience', value: '5+ Years' },
      { label: 'Placement Success', value: '98%' },
    ],
  },
  'strategic-staffing': {
    slug: 'strategic-staffing',
    category: 'RECRUITMENT',
    name: 'Strategic Staffing',
    tagline: 'Flexible scaling for high-growth tech initiatives and seasonal sprint deadlines',
    description: 'Align staffing capacity with your product roadmap milestones. Deploy specialized sprint squads for rapid feature rollouts and new market expansion.',
    icon: Users,
    deliverables: [
      { title: 'Project-Based Squads', desc: 'Self-sufficient pods: 1 Tech Lead, 3 Developers, 1 QA, and 1 Product Designer.' },
      { title: 'Contract-to-Hire', desc: 'Evaluate engineers in your live codebase before extending full-time offers.' },
      { title: 'Surge Capacity', desc: 'Boost development speed before product launches and festive sales.' },
      { title: 'Managed Payroll & Compliance', desc: 'Full vendor management with all legal and statutory compliances handled.' },
    ],
    techStack: ['Sprint Pods', 'Contract-to-Hire', 'Surge Teams', 'Global Payroll'],
    metrics: [
      { label: 'Squad Deployment', value: '<5 Days' },
      { label: 'Sprint Velocity', value: '+45%' },
      { label: 'Cost Flexibility', value: '100%' },
    ],
  },
};
