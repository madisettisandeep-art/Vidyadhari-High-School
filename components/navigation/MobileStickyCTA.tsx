'use client';

import Link from 'next/link';
import { MessageSquare, GraduationCap } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp/whatsappHelper';

export default function MobileStickyCTA() {
  return (
    <aside aria-label="Mobile Quick Actions" className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-sky-200 p-2.5 px-4 flex items-center gap-3 shadow-2xl">
      <a
        href={buildWhatsAppUrl("Hello Vidyadhari High School, I would like to inquire about admissions.")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-sky-50 border border-sky-200 text-[#002B66] text-xs font-bold hover:bg-sky-100 transition-colors shadow-sm"
      >
        <MessageSquare className="w-4 h-4 text-[#00A3E0]" />
        <span>WHATSAPP</span>
      </a>

      <Link
        href="#admissions"
        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#002B66] text-white text-xs font-bold shadow-md shadow-[#002B66]/20 hover:bg-[#001D47] transition-all"
      >
        <GraduationCap className="w-4 h-4 text-cyan-300" />
        <span>APPLY NOW</span>
      </Link>
    </aside>
  );
}
