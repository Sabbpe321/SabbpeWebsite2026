import { NextResponse } from 'next/server';
import { getStore } from '@/lib/devStore';
import { VERIFY_HOURS, clientIp, hashToken, isEmail, newToken, siteUrl, tooMany } from '@/lib/authUtil';
import { sendVerificationEmail } from '@/lib/mailer';

const DONE = { ok: true, message: 'Check your inbox. We have sent a link to confirm your email.' };

export async function POST(req: Request) {
  if (tooMany(`signup:${clientIp(req)}`, 5, 10 * 60 * 1000)) return NextResponse.json({ ok: false, message: 'Too many attempts. Please try again in a few minutes.' }, { status: 429 });
  let body: { email?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 }); }
  const email = (body.email ?? '').trim().toLowerCase();
  if (!isEmail(email)) return NextResponse.json({ ok: false, message: 'Enter a valid email address.' }, { status: 400 });

  try {
    const store = await getStore();
    const existing = await store.findByEmail(email);
    // The same reply is given whether or not the email is already registered, so accounts cannot be discovered here.
    if (existing) return NextResponse.json(DONE);
    // No account is created yet: only the email is staged until the link is opened and a password is chosen.
    const token = newToken(), tokenHash = hashToken(token), tokenExpires = new Date(Date.now() + VERIFY_HOURS * 3600 * 1000);
    await store.createPending({ email, tokenHash, tokenExpires });
    await sendVerificationEmail(email, `${siteUrl(req)}/verify?token=${token}`);
    return NextResponse.json(DONE);
  } catch (e) {
    console.error('[signup] failed', e);
    return NextResponse.json({ ok: false, message: 'We could not create your account just now. Please try again.' }, { status: 500 });
  }
}
