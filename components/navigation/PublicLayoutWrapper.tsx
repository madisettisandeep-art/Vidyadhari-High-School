'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from '@/components/footer/Footer';
import WhatsAppWidget from '@/components/whatsapp/WhatsAppWidget';
import AskVidyadhariAI from '@/components/ai/AskVidyadhariAI';
import MobileStickyCTA from './MobileStickyCTA';

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
