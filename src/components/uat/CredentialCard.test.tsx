import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import CredentialCard from '@/components/uat/CredentialCard';
import { copyText } from '@/lib/clipboard';
import type { UatProduct } from '@/lib/uat';

vi.mock('@/lib/clipboard', () => ({ copyText: vi.fn() }));
const mockCopy = vi.mocked(copyText);

const product: UatProduct = {
  key: 'upi_deeplink',
  name: 'UPI Deeplink',
  description: 'Create a UPI payment request.',
  fields: [
    { label: 'sabbpe_merchantid', value: 'MERCHANT1', secret: false },
    { label: 'sabbpe_password', value: 'Secret#1', secret: true },
  ],
};

describe('CredentialCard', () => {
  beforeEach(() => { mockCopy.mockReset(); mockCopy.mockResolvedValue(true); });

  it('shows the product name and masks passwords', () => {
    render(<CredentialCard product={product} />);
    expect(screen.getByRole('heading', { name: 'UPI Deeplink' })).toBeInTheDocument();
    expect(screen.getByText('MERCHANT1')).toBeInTheDocument();
    expect(screen.queryByText('Secret#1')).not.toBeInTheDocument();
  });

  it('copies the real values with Copy all, never the mask', async () => {
    render(<CredentialCard product={product} />);
    await userEvent.click(screen.getByRole('button', { name: /copy all upi deeplink fields/i }));
    expect(mockCopy).toHaveBeenCalledWith('sabbpe_merchantid=MERCHANT1\nsabbpe_password=Secret#1');
  });

  it('builds .env keys with Copy as .env', async () => {
    render(<CredentialCard product={product} />);
    await userEvent.click(screen.getByRole('button', { name: /copy upi deeplink as .env/i }));
    expect(mockCopy).toHaveBeenCalledWith('SABBPE_MERCHANT_ID=MERCHANT1\nSABBPE_PASSWORD=Secret#1');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<CredentialCard product={product} />);
    // These rules need a canvas, which jsdom does not implement.
    expect(await axe(container, { rules: { 'color-contrast': { enabled: false }, 'label-content-name-mismatch': { enabled: false } } })).toHaveNoViolations();
  });
});
