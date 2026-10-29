'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from '@/components/footer/Footer';
import MobileStickyCTA from './MobileStickyCTA';

// Split non-critical interactive floating widgets into deferred client chunks
const WhatsAppWidget = dynamic(() => import('@/components/whatsapp/WhatsAppWidget'), {
  ssr: false,
});
const AskVidyadhariAI = dynamic(() => import('@/components/ai/AskVidyadhariAI'), {
  ssr: false,
});

export default function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return <main className="flex-1 w-full bg-[#F0F7FF]">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full bg-transparent">
        {children}
      </main>
      <Footer />
      <WhatsAppWidget />
      <AskVidyadhariAI />
      <MobileStickyCTA />
    </>
  );
}
