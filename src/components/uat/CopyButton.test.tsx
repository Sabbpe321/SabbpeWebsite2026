import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CopyButton from '@/components/uat/CopyButton';
import { copyText } from '@/lib/clipboard';

vi.mock('@/lib/clipboard', () => ({ copyText: vi.fn() }));
const mockCopy = vi.mocked(copyText);

describe('CopyButton', () => {
  beforeEach(() => { mockCopy.mockReset(); mockCopy.mockResolvedValue(true); });

  it('copies the given value and reports success', async () => {
    const onCopied = vi.fn();
    render(<CopyButton value="VALUE123" label="sabbpe_password" onCopied={onCopied} />);
    await userEvent.click(screen.getByRole('button', { name: /copy sabbpe_password/i }));
    expect(mockCopy).toHaveBeenCalledWith('VALUE123');
    expect(onCopied).toHaveBeenCalledWith('Copied');
  });

  it('renders an accessible name in the text variant', () => {
    render(<CopyButton value="x" label="all fields">Copy all</CopyButton>);
    expect(screen.getByRole('button', { name: /copy all fields/i })).toBeInTheDocument();
  });
});
