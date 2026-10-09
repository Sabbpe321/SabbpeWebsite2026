// Dummy data for LOCAL DEVELOPMENT and tests only.
// Imported by the API route only when UAT_USE_MOCK=true and NODE_ENV !== 'production'.
import type { UatCredentialsResponse } from '@/lib/uat';

export const MOCK_UAT: UatCredentialsResponse = {
  environment: 'UAT',
  products: [
    { key: 'upi_deeplink', name: 'UPI Deeplink', description: 'Create a UPI payment request and open the customer’s UPI app.', fields: [
      { label: 'sabbpe_merchantid', value: 'MOCK_MERCHANT', secret: false },
      { label: 'sabbpe_password', value: 'mock-secret', secret: true },
    ] },
    { key: 'payouts', name: 'Payouts', description: 'Send money to bank accounts and UPI IDs.', fields: [
      { label: 'merchantId', value: 'MOCK_MERCHANT', secret: false },
      { label: 'merchantPassword', value: 'mock-secret', secret: true },
    ] },
  ],
};
