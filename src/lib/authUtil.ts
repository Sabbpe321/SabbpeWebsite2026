import { createHash, randomBytes, scrypt as _scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt) as (pw: string, salt: Buffer, len: number) => Promise<Buffer>;

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  return `scrypt$${salt.toString('base64')}$${(await scrypt(password, salt, 64)).toString('base64')}`;
}
export async function checkPassword(password: string, stored: string): Promise<boolean> {
  const [algo, salt, hash] = stored.split('$');
  if (algo !== 'scrypt' || !salt || !hash) return false;
  const want = Buffer.from(hash, 'base64');
  const got = await scrypt(password, Buffer.from(salt, 'base64'), want.length);
  return got.length === want.length && timingSafeEqual(got, want);
}
export const newToken = () => randomBytes(32).toString('base64url');
export const hashToken = (token: string) => createHash('sha256').update(token).digest('hex');
export const VERIFY_HOURS = 24;
export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) && s.length <= 254;

// In-memory attempt limit per key. Use a shared store if you run more than one server.
const hits = new Map<string, { count: number; reset: number }>();
export function tooMany(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now(); const r = hits.get(key);
  if (!r || r.reset < now) { hits.set(key, { count: 1, reset: now + windowMs }); return false; }
  r.count += 1; return r.count > limit;
}
export const clientIp = (req: Request) => (req.headers.get('x-forwarded-for') ?? 'local').split(',')[0].trim();
export const siteUrl = (req: Request) => (process.env.SITE_URL ?? new URL(req.url).origin).replace(/\/$/, '');
