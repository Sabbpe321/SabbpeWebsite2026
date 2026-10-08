import { NextResponse } from 'next/server';
import { getStore } from '@/lib/devStore';
import { SESSION_COOKIE, SESSION_HOURS, createSessionValue } from '@/lib/docsAuth';
import { clientIp, hashPassword, hashToken, tooMany } from '@/lib/authUtil';

export async function POST(req: Request) {
  if (tooMany(`complete:${clientIp(req)}`, 10, 10 * 60 * 1000)) return NextResponse.json({ ok: false, message: 'Too many attempts. Please try again in a few minutes.' }, { status: 429 });
  let body: { token?: string; password?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 }); }
  const token = body.token ?? '', password = body.password ?? '';
  if (!token) return NextResponse.json({ ok: false, message: 'This link is invalid or has expired. Sign up again to get a new one.' }, { status: 400 });
  if (password.length < 8 || password.length > 200) return NextResponse.json({ ok: false, message: 'Use a password of at least 8 characters.' }, { status: 400 });

  try {
    const store = await getStore();
    const pending = await store.findPendingByTokenHash(hashToken(token));
    if (!pending) return NextResponse.json({ ok: false, message: 'This link is invalid or has expired. Sign up again to get a new one.' }, { status: 400 });
    const dev = await store.promotePending(pending.id, await hashPassword(password));
    if (!dev) return NextResponse.json({ ok: false, message: 'This link is invalid or has expired. Sign up again to get a new one.' }, { status: 400 });
    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE, createSessionValue(dev.email), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: SESSION_HOURS * 3600 });
    return response;
  } catch (e) {
    console.error('[complete] failed', e);
    return NextResponse.json({ ok: false, message: 'We could not finish your sign-up just now. Please try again.' }, { status: 500 });
  }
}
