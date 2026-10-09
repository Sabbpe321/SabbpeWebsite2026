import { NextResponse } from 'next/server';
import { getSession } from '@/lib/docsAuth';
import { getUatCredentials } from '@/lib/devStore';
import { UAT_PRODUCT_META, isSecretLabel, type UatCredentialsResponse } from '@/lib/uat';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'no-store, max-age=0' };

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'unauthenticated' }, { status: 401, headers: NO_STORE });

  // Local development without a database can run against mock data.
  if (process.env.NODE_ENV !== 'production' && process.env.UAT_USE_MOCK === 'true') {
    const { MOCK_UAT } = await import('@/lib/uat.mock');
    return NextResponse.json(MOCK_UAT, { headers: NO_STORE });
  }

  const sections = await getUatCredentials(session.email);
  const products = sections.map((s) => {
    const meta = UAT_PRODUCT_META[s.key];
    return {
      key: meta?.key ?? s.key,
      name: meta?.name ?? s.title,
      description: meta?.description ?? '',
      fields: s.fields.map((f) => ({ label: f.name, value: f.value, secret: isSecretLabel(f.name) })),
    };
  });

  const body: UatCredentialsResponse = { environment: 'UAT', products };
  return NextResponse.json(body, { headers: NO_STORE });
}
