import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SabbPe - Payment Orchestration & Loyalty Platform',
  description: 'Collect payments. Pay out. Bring customers back with SabbPe and Gift360.',
  icons: {
    icon: '/sabbpe_logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-white text-[#0F172A] selection:bg-[#0457F1] selection:text-white">
        {children}
      </body>
    </html>
  );
}
