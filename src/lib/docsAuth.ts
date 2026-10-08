import { cookies } from 'next/headers';
import { createHmac, randomBytes, timingSafeEqual } from 'crypto';

/**
 * Developer sessions for the website.
 *
 * A developer signs up with an email and password, confirms the emailed link, then logs in on /login.
 * On success the server sets a signed, httpOnly session cookie. The cookie is read on the server, so locked
 * content (the API reference on /docs) is never sent to visitors who are not logged in.
 *
 * DOCS_SESSION_SECRET: long random string used to sign the session cookie. Required in production.
 */
export const SESSION_COOKIE = 'sabbpe_session';
export const SESSION_HOURS = 8;
export const LOGIN_URL = '/login';

const devSecret = randomBytes(32).toString('hex');
function secret(): string {
  const s = process.env.DOCS_SESSION_SECRET;
  if (s && s.length >= 32) return s;
  if (process.env.NODE_ENV === 'production') throw new Error('DOCS_SESSION_SECRET must be set (32+ characters) in production');
  return devSecret;
}
const sign = (data: string) => createHmac('sha256', secret()).update(data).digest('base64url');

export function createSessionValue(email: string): string {
  const payload = Buffer.from(JSON.stringify({ m: email, exp: Date.now() + SESSION_HOURS * 3600 * 1000 })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

export function readSessionValue(value: string | undefined): { email: string } | null {
  if (!value) return null;
  const [payload, mac] = value.split('.');
  if (!payload || !mac) return null;
  let expected: string;
  try { expected = sign(payload); } catch { return null; }
  const a = Buffer.from(mac), b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (typeof data.m !== 'string' || typeof data.exp !== 'number' || data.exp < Date.now()) return null;
    return { email: data.m };
  } catch { return null; }
}

export async function getSession(): Promise<{ email: string } | null> {
  const store = await cookies();
  return readSessionValue(store.get(SESSION_COOKIE)?.value);
}

export async function isLoggedIn(): Promise<boolean> {
  return (await getSession()) !== null;
}

/** Only allow redirects back into this site. */
export function safeNext(next: string | null | undefined): string {
  return next && next.startsWith('/') && !next.startsWith('//') && !next.includes('\\') ? next : '/docs';
}
