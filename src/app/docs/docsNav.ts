// Public content for /docs: the sidebar, and each product's narration, steps and video.
// Nothing in this file is sensitive. API request and response details live in apiData.ts (server only).

export type DocsProduct = {
  slug: string;
  name: string;
  tagline: string;
  narration: string;
  whoFor: string[];
  steps: string[];
  video?: string;
  /** 'api' = API reference available after login. 'soon' = reference not published yet. 'dashboard' = set up from the dashboard, no API needed. */
  access: 'api' | 'soon' | 'dashboard';
  /** Endpoint names shown (locked) to visitors who are not logged in. */
  endpointNames?: string[];
};
export type DocsGroup = { title: string; products: DocsProduct[] };

export const DOCS_GROUPS: DocsGroup[] = [
  {
    title: 'Online payments',
    products: [
      { slug: 'checkout-page', name: 'Checkout Page', tagline: 'Take payments on your website or app.', access: 'api', video: '/videos/checkout_page.mp4',
        narration: 'Add SabbPe checkout to your website or app. Your customer clicks Buy, pays by UPI, card, net banking or wallet, and returns to your site with the result.',
        whoFor: ['E-commerce stores', 'Apps', 'Online service businesses'],
        steps: ['Generate a token', 'Start the payment and send the customer to the payment page', 'Check the payment status', 'Read the result when the customer returns'],
        endpointNames: ['Generate Token', 'Initiate Payment', 'Check Status', 'Decrypt Token'] },
      { slug: 'pay-by-link', name: 'Pay By Link', tagline: 'Collect without a website or app.', access: 'api', video: '/videos/pay_by_link.mp4',
        narration: 'Create a payment link and SabbPe sends it to your customer by email and WhatsApp. You can track every link until it is paid. No website or app is needed.',
        whoFor: ['Businesses without a website', 'Phone and social orders', 'Invoices and advances'],
        steps: ['Generate a token', 'Create the link with the customer, amount and purpose', 'SabbPe sends it by email and WhatsApp', 'Check the status, or list all your links'],
        endpointNames: ['Generate Token', 'Generate Link', 'Link Status', 'List Links'] },
      { slug: 'split-payment', name: 'Split Payment', tagline: 'One payment, divided between everyone who earns from it.', access: 'soon', video: '/videos/split_payment.mp4',
        narration: 'Set a rule for how each payment is shared between the seller, the agent and your platform. The customer pays once and every party is settled.',
        whoFor: ['Marketplaces', 'Aggregators', 'Platforms with agents or partners'],
        steps: ['Set your split rule', 'The customer pays once', 'SabbPe divides the payment', 'Each party is settled'] },
      { slug: 'smartpay', name: 'SmartPay', tagline: 'Your own branded payment page.', access: 'dashboard', video: '/videos/Smartpay.mp4',
        narration: 'Build a payment page with your name, colour and title, publish it on your own link, and collect without writing any code.',
        whoFor: ['Coaching and schools', 'Clinics', 'Event organisers', 'NGOs'],
        steps: ['Design your page', 'Give it your own link', 'Customers pay on your page', 'See every payment in your dashboard'] },
      { slug: 'discount-coupons', name: 'Discount Coupons', tagline: 'Festive codes that unlock Gift360 vouchers at checkout.', access: 'soon', video: '/videos/discount_coupons.mp4',
        narration: 'Create a coupon code that turns a share of the cart into a Gift360 voucher budget. The shopper picks a voucher within that budget and can use SuperCoins to bring its price down.',
        whoFor: ['Online stores running festive offers', 'Brands that want repeat purchases'],
        steps: ['Create a coupon code', 'The shopper enters it at checkout', 'Vouchers within the budget appear', 'SuperCoins reduce the voucher price'] },
    ],
  },
  {
    title: 'Collections and recurring',
    products: [
      { slug: 'upi-autopay', name: 'UPI AutoPay', tagline: 'Recurring payments your customer approves once.', access: 'api', video: '/videos/UPI_Autopay.mp4',
        narration: 'Your customer approves a mandate once in their UPI app. After that, each payment is collected on its due date without any action from them.',
        whoFor: ['Subscriptions', 'Fees and EMIs', 'Memberships'],
        steps: ['Create a mandate', 'The customer approves it in their UPI app', 'Debit the mandate each cycle', 'Or set up a subscription to run the cycle for you'],
        endpointNames: ['Generate Token', 'Validate UPI ID', 'Create Mandate', 'Mandate Status', 'Pre-debit Notification', 'Execute Debit', 'Revoke Mandate', 'Refund', 'Subscriptions'] },
      { slug: 'enach', name: 'eNACH Mandates', tagline: 'Bank mandates for recurring collections.', access: 'api',
        narration: 'Register a mandate that your customer approves on their bank\'s page, then present debits against it on schedule.',
        whoFor: ['Lenders', 'Insurers', 'Larger recurring amounts'],
        steps: ['Register the mandate', 'The customer approves it with their bank', 'Present each debit', 'Check the result'],
        endpointNames: ['Generate Token', 'Register Mandate', 'Register by Link', 'Mandate Status', 'Cancel Mandate', 'Present Debit', 'Debit Inquiry'] },
      { slug: 'easy-collect', name: 'Easy Collect', tagline: 'Collect from hundreds of customers with one upload.', access: 'dashboard', video: '/videos/easy_collect.mp4',
        narration: 'Upload one file with each customer, amount and due date. Every customer gets a payment link, reminders go out automatically, and you see who has paid.',
        whoFor: ['Schools and coaching', 'Housing societies', 'Distributors collecting dues'],
        steps: ['Upload your customer list', 'Send every link in one go', 'Reminders go out automatically', 'See who has paid'] },
      { slug: 'sub-merchant', name: 'Sub-merchant Management', tagline: 'One master account. A QR for every outlet.', access: 'soon', video: '/videos/Sub-merchant.mp4',
        narration: 'Create sub-merchants under your master account. Each one gets its own static QR, and you see every outlet\'s collections from one dashboard.',
        whoFor: ['Retail and franchise chains', 'Distributors', 'Marketplaces', 'Collection teams'],
        steps: ['Create sub-merchants', 'Each one gets its own static QR', 'Accept payments offline or online', 'See everyone from one dashboard'] },
    ],
  },
  {
    title: 'UPI and QR',
    products: [
      { slug: 'upi-deeplink', name: 'UPI Intent and Deeplink', tagline: 'One tap opens the customer\'s UPI app.', access: 'api', video: '/videos/UPI_Deeplink.mp4',
        narration: 'Create a UPI payment request and receive a upi:// link. On mobile, one tap opens the customer\'s own UPI app with the amount filled in.',
        whoFor: ['Mobile checkouts', 'Apps', 'One-click UPI payments'],
        steps: ['Generate a token', 'Register the payment and receive the deeplink', 'The customer approves in their UPI app', 'Check the status'],
        endpointNames: ['Generate Token', 'Register Intent', 'Transaction Status'] },
    ],
  },
  {
    title: 'Disbursements',
    products: [
      { slug: 'payouts', name: 'Payouts', tagline: 'Pay one person or a thousand from one wallet.', access: 'api', video: '/videos/Payouts.mp4',
        narration: 'Top up your SabbPe Wallet, then send money to bank accounts and UPI IDs by IMPS, NEFT, RTGS or UPI, one at a time or in bulk.',
        whoFor: ['Salary disbursal', 'Agent payouts', 'Vendor payments', 'Refunds and cashback'],
        steps: ['Top up your SabbPe Wallet', 'Generate a token', 'Send the transfer', 'Confirm the result by callback or status enquiry'],
        endpointNames: ['Generate Token', 'Fund Transfer', 'UPI Pay', 'Transaction Status', 'UPI Status'] },
    ],
  },
  {
    title: 'KYC',
    products: [
      { slug: 'kyc-apis', name: 'KYC APIs', tagline: 'Verify people and businesses through one integration.', access: 'api', video: '/videos/KYC_APIs.mp4',
        narration: 'Run identity, bank account, credit and document checks, and send agreements for e-signature, all through one integration.',
        whoFor: ['Payment aggregators', 'Lenders and NBFCs', 'Marketplaces', 'Fintech apps'],
        steps: ['Generate a token', 'Send the check you need', 'Read the status in the response'],
        endpointNames: ['Generate Token', 'Aadhaar OTP', 'Bank Account Validation', 'UPI ID Validation', 'Credit Report', 'Document OCR', 'e-Sign'] },
    ],
  },
  {
    title: 'Gift360',
    products: [
      { slug: 'gift360-reseller-api', name: 'Reseller API', tagline: 'Sell brand vouchers inside your own product.', access: 'soon', video: '/videos/Gift360-API_Integration.mp4',
        narration: 'Register as a reseller, fund your wallet, and buy brand vouchers by API. The voucher code comes back ready for your customer.',
        whoFor: ['Apps and platforms', 'Loyalty programmes', 'Fintechs'],
        steps: ['Register as a reseller', 'Fund your wallet', 'Buy vouchers by API', 'Pass the code to your customer'] },
      { slug: 'gift360-distributor', name: 'Distributor', tagline: 'Buy vouchers in bulk at partner pricing.', access: 'dashboard', video: '/videos/GIFT360-Distributor.mp4',
        narration: 'Register as a distributor, receive your Distributor ID, and order vouchers in bulk at partner pricing.',
        whoFor: ['Bulk voucher buyers', 'Channel partners'],
        steps: ['Submit your registration', 'Receive your Distributor ID', 'Choose the discount and denomination', 'Pay and receive your vouchers'] },
      { slug: 'gift360-corporate', name: 'Corporate Gifting', tagline: 'Reward every employee with one upload.', access: 'dashboard', video: '/videos/Gift360_corporate.mp4',
        narration: 'Upload your requirements in one Excel sheet, confirm the allocation, and vouchers are delivered for every employee.',
        whoFor: ['HR and people teams', 'Employers'],
        steps: ['Register your organisation', 'Upload your requirements', 'Confirm denominations and allocation', 'Pay and receive the vouchers'] },
    ],
  },
];

export const ALL_PRODUCTS: DocsProduct[] = DOCS_GROUPS.flatMap((g) => g.products);
export const findProduct = (slug: string) => ALL_PRODUCTS.find((p) => p.slug === slug);
export const groupOf = (slug: string) => DOCS_GROUPS.find((g) => g.products.some((p) => p.slug === slug))?.title ?? '';
