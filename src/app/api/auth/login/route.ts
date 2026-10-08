import { NextResponse } from 'next/server';
import { SESSION_COOKIE, SESSION_HOURS, createSessionValue } from '@/lib/docsAuth';
import { getStore } from '@/lib/devStore';
import { checkPassword, clientIp, tooMany } from '@/lib/authUtil';

export async function POST(req: Request) {
  if (tooMany(`login:${clientIp(req)}`, 8, 10 * 60 * 1000)) return NextResponse.json({ ok: false, message: 'Too many attempts. Please try again in a few minutes.' }, { status: 429 });
  let body: { email?: string; password?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 }); }
  const email = (body.email ?? '').trim().toLowerCase(), password = body.password ?? '';
  if (!email || !password) return NextResponse.json({ ok: false, message: 'Enter your email and password.' }, { status: 400 });

  try {
    const store = await getStore();
    const dev = await store.findByEmail(email);
    // Only confirmed accounts exist in `developers`, so a match here is always a finished sign-up.
    if (!dev || !(await checkPassword(password, dev.passwordHash))) return NextResponse.json({ ok: false, message: 'That email and password do not match an account.' }, { status: 401 });
    await store.touchLogin(dev.id);
    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE, createSessionValue(dev.email), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: SESSION_HOURS * 3600 });
    return response;
  } catch (e) {
    console.error('[login] failed', e);
    return NextResponse.json({ ok: false, message: 'We could not log you in just now. Please try again.' }, { status: 500 });
  }
}
