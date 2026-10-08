import { NextResponse } from 'next/server';
import { getStore } from '@/lib/devStore';
import { VERIFY_HOURS, clientIp, hashPassword, hashToken, isEmail, newToken, siteUrl, tooMany } from '@/lib/authUtil';
import { sendVerificationEmail } from '@/lib/mailer';

const DONE = { ok: true, message: 'Check your inbox. We have sent a link to confirm your email.' };

export async function POST(req: Request) {
  if (tooMany(`signup:${clientIp(req)}`, 5, 10 * 60 * 1000)) return NextResponse.json({ ok: false, message: 'Too many attempts. Please try again in a few minutes.' }, { status: 429 });
  let body: { email?: string; password?: string; name?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 }); }
  const email = (body.email ?? '').trim().toLowerCase(), password = body.password ?? '', name = (body.name ?? '').trim().slice(0, 80) || null;
  if (!isEmail(email)) return NextResponse.json({ ok: false, message: 'Enter a valid email address.' }, { status: 400 });
  if (password.length < 8 || password.length > 200) return NextResponse.json({ ok: false, message: 'Use a password of at least 8 characters.' }, { status: 400 });

  try {
    const store = await getStore();
    const token = newToken(), tokenHash = hashToken(token), tokenExpires = new Date(Date.now() + VERIFY_HOURS * 3600 * 1000);
    const existing = await store.findByEmail(email);
    // The same reply is given whether or not the email is already registered, so accounts cannot be discovered here.
    if (existing?.verifiedAt) return NextResponse.json(DONE);
    if (existing) await store.setVerifyToken(existing.id, tokenHash, tokenExpires);
    else await store.create({ email, passwordHash: await hashPassword(password), name, tokenHash, tokenExpires });
    await sendVerificationEmail(email, `${siteUrl(req)}/verify?token=${token}`);
    return NextResponse.json(DONE);
  } catch (e) {
    console.error('[signup] failed', e);
    return NextResponse.json({ ok: false, message: 'We could not create your account just now. Please try again.' }, { status: 500 });
  }
}
