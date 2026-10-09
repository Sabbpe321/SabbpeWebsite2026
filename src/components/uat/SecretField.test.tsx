import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SecretField from '@/components/uat/SecretField';
import { MASK } from '@/lib/uat';

afterEach(() => vi.useRealTimers());

describe('SecretField', () => {
  it('masks by default and reveals on toggle', () => {
    render(<SecretField value="hunter2" />);
    expect(screen.getByText(MASK)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /reveal value/i }));
    expect(screen.getByText('hunter2')).toBeInTheDocument();
    expect(screen.queryByText(MASK)).not.toBeInTheDocument();
  });

  it('auto re-masks 30 seconds after being revealed', () => {
    vi.useFakeTimers();
    render(<SecretField value="hunter2" />);
    fireEvent.click(screen.getByRole('button', { name: /reveal value/i }));
    expect(screen.getByText('hunter2')).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(30_000); });
    expect(screen.queryByText('hunter2')).not.toBeInTheDocument();
    expect(screen.getByText(MASK)).toBeInTheDocument();
  });
});
