'use client';

import Link from 'next/link';
import { X, Phone, MessageSquare, ChevronRight } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp/whatsappHelper';
import VidyadhariLogo from '@/components/brand/VidyadhariLogo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white/98 backdrop-blur-2xl flex flex-col justify-between p-6 overflow-y-auto animate-fade-in text-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-sky-100 pb-4">
        <VidyadhariLogo size="sm" variant="navbar" />
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="p-2 text-slate-500 hover:text-[#002B66] rounded-full bg-sky-50 border border-sky-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="py-6 space-y-6">
        <div>
          <div className="text-xs uppercase font-bold tracking-widest text-[#00A3E0] mb-3">
            EXPLORE
          </div>
          <div className="space-y-1">
            <Link
              href="#campus"
              onClick={onClose}
              className="flex items-center justify-between py-2 text-base text-slate-700 hover:text-[#002B66] font-medium"
            >
              <span>Interactive Campus (9 Zones)</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="#day-at-vidyadhari"
              onClick={onClose}
              className="flex items-center justify-between py-2 text-base text-slate-700 hover:text-[#002B66] font-medium"
            >
              <span>A Day at Vidyadhari</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="#life-at-vidyadhari"
              onClick={onClose}
              className="flex items-center justify-between py-2 text-base text-slate-700 hover:text-[#002B66] font-medium"
            >
              <span>Campus Gallery (Life @ Vidyadhari)</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </div>

        <div className="border-t border-sky-100 pt-4">
          <div className="text-xs uppercase font-bold tracking-widest text-[#00A3E0] mb-3">
            DISCOVER
          </div>
          <div className="space-y-1">
            <Link
              href="#academics"
              onClick={onClose}
              className="flex items-center justify-between py-2 text-base text-slate-700 hover:text-[#002B66] font-medium"
            >
              <span>Academics & Pedagogy</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="#science"
              onClick={onClose}
              className="flex items-center justify-between py-2 text-base text-slate-700 hover:text-[#002B66] font-medium"
            >
              <span>Science & Innovation Hub</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="#sports-and-arts"
              onClick={onClose}
              className="flex items-center justify-between py-2 text-base text-slate-700 hover:text-[#002B66] font-medium"
            >
              <span>Sports, Arts & Telangana Culture</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="#achievements"
              onClick={onClose}
              className="flex items-center justify-between py-2 text-base text-slate-700 hover:text-[#002B66] font-medium"
            >
              <span>Achievements Wall</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </div>

        <div className="border-t border-sky-100 pt-4">
          <div className="text-xs uppercase font-bold tracking-widest text-[#00A3E0] mb-3">
            JOIN & CONNECT
          </div>
          <div className="space-y-1">
            <Link
              href="#admissions"
              onClick={onClose}
              className="flex items-center justify-between py-2 text-base text-slate-700 hover:text-[#002B66] font-medium"
            >
              <span>Admissions 2026–2027</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-100 text-[#002B66] font-bold">Open</span>
            </Link>
            <Link
              href="#campus-visit"
              onClick={onClose}
              className="flex items-center justify-between py-2 text-base text-slate-700 hover:text-[#002B66] font-medium"
            >
              <span>Book Campus Walkthrough</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="#contact"
              onClick={onClose}
              className="flex items-center justify-between py-2 text-base text-slate-700 hover:text-[#002B66] font-medium"
            >
              <span>Location & Contact</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/admin/login"
              onClick={onClose}
              className="flex items-center justify-between py-2 text-xs text-slate-500 hover:text-[#002B66]"
            >
              <span>School Administration Login</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions Footer */}
      <div className="pt-4 border-t border-sky-100 space-y-3">
        <a
          href="tel:+919100901966"
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-sky-50 border border-sky-200 text-sm font-bold text-[#002B66]"
        >
          <Phone className="w-4 h-4 text-[#00A3E0]" />
          <span>Call +91 91009 01966</span>
        </a>
        <a
          href={buildWhatsAppUrl("Hello Vidyadhari High School, I am interested in admission information for 2026-2027.")}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#002B66] text-sm font-bold text-white shadow-lg shadow-[#002B66]/20"
        >
          <MessageSquare className="w-4 h-4 text-[#00A3E0]" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
