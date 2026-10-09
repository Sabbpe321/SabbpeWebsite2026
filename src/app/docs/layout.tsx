import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/premium/Footer';
import DocsSidebar from '@/components/docs/DocsSidebar';
import DocsAuthBanner from '@/components/docs/DocsAuthBanner';
import { getSession } from '@/lib/docsAuth';
import { hasUatCredentials } from '@/lib/devStore';

export const metadata = {
  title: 'Developer Docs | SabbPe',
  description: 'Guides, videos and API reference for every SabbPe product.',
};

export default async function DocsLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const showUat = session ? await hasUatCredentials(session.email) : false;

  return (
    <div className="min-h-screen bg-white text-[#0F172A]">
      <Navbar />
      <div className="pt-20 sm:pt-24">
        <div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row">
          <DocsSidebar showUat={showUat} />
          <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
            <DocsAuthBanner session={session} />
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
