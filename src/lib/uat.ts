// Shared types and pure helpers for the UAT credentials page.
// No credential values live here: they are read from the database per developer.

export type UatField = { label: string; value: string; secret: boolean };
export type UatProduct = { key: string; name: string; description: string; fields: UatField[] };
export type UatCredentialsResponse = { environment: 'UAT'; products: UatProduct[] };

export type UatProductMeta = { key: string; name: string; description: string };

// The JSON keys stored in developers.uat_credentials, mapped to display metadata.
export const UAT_PRODUCT_META: Record<string, UatProductMeta> = {
  upideeplinkcredentials: { key: 'upi_deeplink', name: 'UPI Deeplink', description: 'Create a UPI payment request and open the customer’s UPI app.' },
  enach_mandates: { key: 'enach_mandates', name: 'eNACH Mandates', description: 'Bank mandates for recurring collections.' },
  upi_autopay: { key: 'upi_autopay', name: 'UPI AutoPay', description: 'Recurring payments your customer approves once.' },
  checkout_page: { key: 'checkout_page', name: 'Checkout Page', description: 'Take payments on your website or app.' },
  pay_by_link: { key: 'pay_by_link', name: 'Pay By Link', description: 'Collect without a website or app.' },
  payouts: { key: 'payouts', name: 'Payouts', description: 'Send money to bank accounts and UPI IDs.' },
};

/** A field whose label looks like a secret is masked in the UI. */
export const isSecretLabel = (label: string) => /pass(word)?|secret|token|pin/i.test(label);

export const MASK = '••••••••';
export const maskValue = (field: Pick<UatField, 'secret' | 'value'>) => (field.secret ? MASK : field.value);

// Known labels → env variable names. Falls back to an uppercased label.
const ENV_KEYS: Record<string, string> = {
  sabbpe_userid: 'SABBPE_USER_ID',
  sabbpe_merchantid: 'SABBPE_MERCHANT_ID',
  sabbpe_password: 'SABBPE_PASSWORD',
  merchantId: 'SABBPE_MERCHANT_ID',
  merchantPassword: 'SABBPE_MERCHANT_PASSWORD',
};

export const toEnvKey = (label: string) => ENV_KEYS[label] ?? label.replace(/[^A-Za-z0-9]+/g, '_').toUpperCase();

/** KEY=value lines for a .env file (real values, never masked). */
export const buildEnvBlock = (fields: UatField[]) => fields.map((f) => `${toEnvKey(f.label)}=${f.value}`).join('\n');

/** label=value lines for a plain "copy all" block (real values, never masked). */
export const buildCopyAll = (fields: UatField[]) => fields.map((f) => `${f.label}=${f.value}`).join('\n');

/** Matches a product against a search query (name, description or any field label). */
export const productMatches = (product: UatProduct, query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return product.name.toLowerCase().includes(q)
    || product.description.toLowerCase().includes(q)
    || product.fields.some((f) => f.label.toLowerCase().includes(q));
};
