import { describe, it, expect } from 'vitest';
import { isSecretLabel, toEnvKey, buildCopyAll, buildEnvBlock, productMatches, maskValue, MASK, type UatProduct } from '@/lib/uat';

describe('isSecretLabel', () => {
  it('flags password-like labels', () => {
    expect(isSecretLabel('sabbpe_password')).toBe(true);
    expect(isSecretLabel('merchantPassword')).toBe(true);
    expect(isSecretLabel('api_token')).toBe(true);
    expect(isSecretLabel('card_pin')).toBe(true);
  });
  it('leaves ids visible', () => {
    expect(isSecretLabel('sabbpe_merchantid')).toBe(false);
    expect(isSecretLabel('sabbpe_userid')).toBe(false);
    expect(isSecretLabel('merchantId')).toBe(false);
  });
});

describe('toEnvKey', () => {
  it('maps known labels', () => {
    expect(toEnvKey('sabbpe_merchantid')).toBe('SABBPE_MERCHANT_ID');
    expect(toEnvKey('sabbpe_userid')).toBe('SABBPE_USER_ID');
    expect(toEnvKey('sabbpe_password')).toBe('SABBPE_PASSWORD');
    expect(toEnvKey('merchantId')).toBe('SABBPE_MERCHANT_ID');
    expect(toEnvKey('merchantPassword')).toBe('SABBPE_MERCHANT_PASSWORD');
  });
  it('falls back to an uppercased label', () => {
    expect(toEnvKey('some_field')).toBe('SOME_FIELD');
  });
});

describe('copy builders', () => {
  const fields = [
    { label: 'sabbpe_merchantid', value: 'M1', secret: false },
    { label: 'sabbpe_password', value: 'secret', secret: true },
  ];
  it('uses real values, never masked', () => {
    expect(buildCopyAll(fields)).toBe('sabbpe_merchantid=M1\nsabbpe_password=secret');
    expect(buildEnvBlock(fields)).toBe('SABBPE_MERCHANT_ID=M1\nSABBPE_PASSWORD=secret');
  });
});

describe('maskValue', () => {
  it('masks secrets only', () => {
    expect(maskValue({ secret: true, value: 'x' })).toBe(MASK);
    expect(maskValue({ secret: false, value: 'x' })).toBe('x');
  });
});

describe('productMatches', () => {
  const p: UatProduct = { key: 'pay_by_link', name: 'Pay By Link', description: 'Collect without a website.', fields: [{ label: 'sabbpe_password', value: 'x', secret: true }] };
  it('matches an empty query', () => expect(productMatches(p, '')).toBe(true));
  it('matches by name', () => expect(productMatches(p, 'link')).toBe(true));
  it('matches by field label', () => expect(productMatches(p, 'password')).toBe(true));
  it('rejects unknown text', () => expect(productMatches(p, 'zzz')).toBe(false));
});
