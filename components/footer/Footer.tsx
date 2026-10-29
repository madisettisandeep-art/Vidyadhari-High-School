'use client';

import Link from 'next/link';
import { Phone, MapPin, Instagram, ArrowUp } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp/whatsappHelper';
import VidyadhariLogo from '@/components/brand/VidyadhariLogo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-transparent border-t border-white/40 text-slate-800 pt-16 pb-24 lg:pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1 & 2: School Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <VidyadhariLogo size="md" />

            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed max-w-sm">
              "Your Future Begins Here." Fostering academic mastery, creative confidence, traditional values, and disciplined character in Bhimaram Rural, Telangana.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-700">
              <a
                href="https://www.instagram.com/vidyadhari_school/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/90 hover:bg-white border border-white/80 flex items-center justify-center text-[#002B66] hover:text-[#00A3E0] transition-colors shadow-sm"
                aria-label="Vidyadhari Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <span className="text-xs text-slate-700 font-semibold">Follow @vidyadhari_school</span>
            </div>
          </div>

          {/* Col 3: Explore */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#002B66] uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#campus" className="text-slate-700 hover:text-[#00A3E0] font-medium transition-colors">
                  Interactive Campus (9 Zones)
                </Link>
              </li>
              <li>
                <Link href="#academics" className="text-slate-700 hover:text-[#00A3E0] font-medium transition-colors">
                  Academics & Pedagogy
                </Link>
              </li>
              <li>
                <Link href="#science" className="text-slate-700 hover:text-[#00A3E0] font-medium transition-colors">
                  Science & Innovation Hub
                </Link>
              </li>
              <li>
                <Link href="#sports-and-arts" className="text-slate-700 hover:text-[#00A3E0] font-medium transition-colors">
                  Athletics & Cultural Arts
                </Link>
              </li>
              <li>
                <Link href="#day-at-vidyadhari" className="text-slate-700 hover:text-[#00A3E0] font-medium transition-colors">
                  A Day at Vidyadhari
                </Link>
              </li>
              <li>
                <Link href="#achievements" className="text-slate-700 hover:text-[#00A3E0] font-medium transition-colors">
                  Achievements Wall
                </Link>
              </li>
              <li>
                <Link href="#life-at-vidyadhari" className="text-slate-700 hover:text-[#00A3E0] font-medium transition-colors">
                  Life @ Vidyadhari Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Admissions */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#002B66] uppercase tracking-wider mb-4">
              Admissions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#admissions" className="text-slate-700 hover:text-[#00A3E0] font-medium transition-colors">
                  Apply for 2026–2027
                </Link>
              </li>
              <li>
                <Link href="#campus-visit" className="text-slate-700 hover:text-[#00A3E0] font-medium transition-colors">
                  Book a Campus Walkthrough
                </Link>
              </li>
              <li>
                <a
                  href={buildWhatsAppUrl("Hello Vidyadhari Admissions, I would like document details for admission.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-700 hover:text-[#00A3E0] font-medium transition-colors"
                >
                  Admission WhatsApp Desk
                </a>
              </li>
              <li>
                <Link href="/admin/login" className="text-slate-600 hover:text-[#002B66] font-semibold transition-colors">
                  Admin Management Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Verified Contact Info */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#002B66] uppercase tracking-wider mb-4">
              Contact
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2 text-slate-700 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#00A3E0] flex-shrink-0 mt-0.5" />
                <span>Vidyadhari Colony, Bhimaram Rural, Telangana 506015, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#00A3E0] flex-shrink-0" />
                <a href="tel:+919100901966" className="text-[#002B66] hover:text-[#00A3E0] font-bold">
                  +91 91009 01966
                </a>
              </div>
              <div className="pt-2 text-[11px] text-slate-600 font-medium">
                School Website: <span className="text-[#002B66] font-bold">vidyadharischool.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-white/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-700 font-medium">
          <div>
            © {currentYear} Vidyadhari High School. All Rights Reserved.
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <span>Privacy Policy (School Records)</span>
            <span>Terms of Admission</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#002B66] hover:text-[#00A3E0] font-bold hover:underline"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3 text-[#00A3E0]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
