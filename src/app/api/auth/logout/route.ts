import { NextResponse } from 'next/server';
import { SESSION_COOKIE } from '@/lib/docsAuth';

export async function POST(req: Request) {
  const response = NextResponse.redirect(new URL('/docs', req.url), { status: 303 });
  response.cookies.set(SESSION_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
  return response;
}
