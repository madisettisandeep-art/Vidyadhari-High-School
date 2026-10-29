'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Menu,
  ChevronDown,
  MapPin,
  Clock,
  Camera,
  BookOpen,
  Atom,
  Trophy,
  Award,
  Users,
  Calendar
} from 'lucide-react';
import MobileMenu from './MobileMenu';
import VidyadhariLogo from '@/components/brand/VidyadhariLogo';

export default function Navbar() {
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('hero-section');
      const isPast = heroEl ? heroEl.getBoundingClientRect().bottom <= 80 : window.scrollY > 100;
      setIsScrolledPastHero(isPast);

      // Scrollspy detection
      const sections = [
        'campus',
        'academics',
        'science',
        'day-at-vidyadhari',
        'sports-and-arts',
        'achievements',
        'admissions',
        'campus-visit',
        'contact'
      ];

      const scrollPos = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          return;
        }
      }
      if (window.scrollY < 300) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isExploreActive = ['campus', 'day-at-vidyadhari', 'life-at-vidyadhari'].includes(activeSection);
  const isDiscoverActive = ['academics', 'science', 'sports-and-arts', 'achievements', 'faculty'].includes(activeSection);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolledPastHero
            ? 'bg-white/80 backdrop-blur-lg border-b border-white/60 py-2.5 shadow-md shadow-[#002B66]/5'
            : 'bg-transparent border-transparent py-4 sm:py-5 shadow-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center focus:outline-none">
            <VidyadhariLogo size="sm" variant="navbar" isTransparent={!isScrolledPastHero} />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Explore Dropdown */}
            <div
              className="relative group py-1.5"
              onMouseEnter={() => setActiveDropdown('explore')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'explore' ? null : 'explore')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs xl:text-[13px] font-bold tracking-wide transition-all ${
                  isExploreActive
                    ? isScrolledPastHero
                      ? 'bg-[#F0F7FF] text-[#002B66] border border-[#00A3E0]/30'
                      : 'bg-white/20 text-white border border-white/40'
                    : isScrolledPastHero
                    ? 'text-[#002B66] hover:text-[#00A3E0] hover:bg-[#F0F7FF]'
                    : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] hover:text-[#00A3E0] hover:bg-white/10'
                }`}
                aria-expanded={activeDropdown === 'explore'}
              >
                <span>EXPLORE</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${
                    activeDropdown === 'explore' ? 'rotate-180 text-[#00A3E0]' : ''
                  }`}
                />
              </button>

              {/* Hover bridge & Dropdown Menu */}
              <div
                className={`absolute top-full left-0 pt-2 w-72 z-50 transition-all duration-200 ${
                  activeDropdown === 'explore'
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="bg-white/98 backdrop-blur-xl border border-sky-100 rounded-2xl p-2 shadow-2xl shadow-[#002B66]/12 space-y-1">
                  <Link
                    href="#campus"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F0F7FF] text-[#002B66] hover:text-[#00A3E0] transition-colors group/item"
                  >
                    <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:border-[#00A3E0]">
                      <MapPin className="w-4 h-4 text-[#00A3E0]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold font-serif text-[#002B66] group-hover/item:text-[#00A3E0]">
                        Interactive Campus
                      </div>
                      <div className="text-[11px] text-slate-500 font-normal">
                        Step inside the 9 campus zones & tour
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="#day-at-vidyadhari"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F0F7FF] text-[#002B66] hover:text-[#00A3E0] transition-colors group/item"
                  >
                    <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:border-[#00A3E0]">
                      <Clock className="w-4 h-4 text-[#00A3E0]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold font-serif text-[#002B66] group-hover/item:text-[#00A3E0]">
                        A Day at Vidyadhari
                      </div>
                      <div className="text-[11px] text-slate-500 font-normal">
                        Daily rhythm, activities & student timeline
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="#life-at-vidyadhari"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F0F7FF] text-[#002B66] hover:text-[#00A3E0] transition-colors group/item"
                  >
                    <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:border-[#00A3E0]">
                      <Camera className="w-4 h-4 text-[#00A3E0]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold font-serif text-[#002B66] group-hover/item:text-[#00A3E0]">
                        Campus Chronicles Gallery
                      </div>
                      <div className="text-[11px] text-slate-500 font-normal">
                        Visual moments from classrooms & labs
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Discover Dropdown */}
            <div
              className="relative group py-1.5"
              onMouseEnter={() => setActiveDropdown('discover')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'discover' ? null : 'discover')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs xl:text-[13px] font-bold tracking-wide transition-all ${
                  isDiscoverActive
                    ? isScrolledPastHero
                      ? 'bg-[#F0F7FF] text-[#002B66] border border-[#00A3E0]/30'
                      : 'bg-white/20 text-white border border-white/40'
                    : isScrolledPastHero
                    ? 'text-[#002B66] hover:text-[#00A3E0] hover:bg-[#F0F7FF]'
                    : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] hover:text-[#00A3E0] hover:bg-white/10'
                }`}
                aria-expanded={activeDropdown === 'discover'}
              >
                <span>DISCOVER</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${
                    activeDropdown === 'discover' ? 'rotate-180 text-[#00A3E0]' : ''
                  }`}
                />
              </button>

              {/* Hover bridge & Dropdown Menu */}
              <div
                className={`absolute top-full left-0 xl:left-1/2 xl:-translate-x-1/2 pt-2 w-80 z-50 transition-all duration-200 ${
                  activeDropdown === 'discover'
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="bg-white/98 backdrop-blur-xl border border-sky-100 rounded-2xl p-2 shadow-2xl shadow-[#002B66]/12 space-y-1">
                  <Link
                    href="#academics"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-start gap-3 p-2 rounded-xl hover:bg-[#F0F7FF] text-[#002B66] hover:text-[#00A3E0] transition-colors group/item"
                  >
                    <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:border-[#00A3E0]">
                      <BookOpen className="w-4 h-4 text-[#00A3E0]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold font-serif text-[#002B66] group-hover/item:text-[#00A3E0]">
                        Academics & Pedagogy
                      </div>
                      <div className="text-[11px] text-slate-500 font-normal">
                        Learning beyond the textbook & grade stages
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="#science"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-start gap-3 p-2 rounded-xl hover:bg-[#F0F7FF] text-[#002B66] hover:text-[#00A3E0] transition-colors group/item"
                  >
                    <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:border-[#00A3E0]">
                      <Atom className="w-4 h-4 text-[#00A3E0]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold font-serif text-[#002B66] group-hover/item:text-[#00A3E0]">
                        Science & Innovation Hub
                      </div>
                      <div className="text-[11px] text-slate-500 font-normal">
                        Hands-on laboratory inquiry & experiments
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="#sports-and-arts"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-start gap-3 p-2 rounded-xl hover:bg-[#F0F7FF] text-[#002B66] hover:text-[#00A3E0] transition-colors group/item"
                  >
                    <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:border-[#00A3E0]">
                      <Trophy className="w-4 h-4 text-[#00A3E0]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold font-serif text-[#002B66] group-hover/item:text-[#00A3E0]">
                        Sports, Arts & Heritage
                      </div>
                      <div className="text-[11px] text-slate-500 font-normal">
                        Athletics, cultural roots & creative expression
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="#achievements"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-start gap-3 p-2 rounded-xl hover:bg-[#F0F7FF] text-[#002B66] hover:text-[#00A3E0] transition-colors group/item"
                  >
                    <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:border-[#00A3E0]">
                      <Award className="w-4 h-4 text-[#00A3E0]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold font-serif text-[#002B66] group-hover/item:text-[#00A3E0]">
                        Achievements Wall
                      </div>
                      <div className="text-[11px] text-slate-500 font-normal">
                        Scholastic honors, sports podiums & prizes
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="#faculty"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-start gap-3 p-2 rounded-xl hover:bg-[#F0F7FF] text-[#002B66] hover:text-[#00A3E0] transition-colors group/item"
                  >
                    <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:border-[#00A3E0]">
                      <Users className="w-4 h-4 text-[#00A3E0]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold font-serif text-[#002B66] group-hover/item:text-[#00A3E0]">
                        Our Educators & Mentors
                      </div>
                      <div className="text-[11px] text-slate-500 font-normal">
                        The passionate minds guiding every child
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="#admissions"
              className={`px-3.5 py-2 rounded-full text-xs xl:text-[13px] font-bold tracking-wide transition-all ${
                activeSection === 'admissions'
                  ? isScrolledPastHero
                    ? 'bg-[#F0F7FF] text-[#002B66] border border-[#00A3E0]/30'
                    : 'bg-white/20 text-white border border-white/40'
                  : isScrolledPastHero
                  ? 'text-[#002B66] hover:text-[#00A3E0] hover:bg-[#F0F7FF]'
                  : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] hover:text-[#00A3E0] hover:bg-white/10'
              }`}
            >
              ADMISSIONS
            </Link>

            <Link
              href="#contact"
              className={`px-3.5 py-2 rounded-full text-xs xl:text-[13px] font-bold tracking-wide transition-all ${
                activeSection === 'contact'
                  ? isScrolledPastHero
                    ? 'bg-[#F0F7FF] text-[#002B66] border border-[#00A3E0]/30'
                    : 'bg-white/20 text-white border border-white/40'
                  : isScrolledPastHero
                  ? 'text-[#002B66] hover:text-[#00A3E0] hover:bg-[#F0F7FF]'
                  : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] hover:text-[#00A3E0] hover:bg-white/10'
              }`}
            >
              CONTACT
            </Link>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/admin/login"
              className={`text-xs tracking-wider uppercase font-semibold px-3 py-2 rounded-full transition-colors ${
                isScrolledPastHero
                  ? 'text-slate-500 hover:text-[#002B66] hover:bg-sky-50'
                  : 'text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] hover:text-white hover:bg-white/10'
              }`}
            >
              Admin Portal
            </Link>

            <a
              href="#campus-visit"
              className={`inline-flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all transform hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shadow-md ${
                isScrolledPastHero
                  ? 'text-white bg-gradient-to-r from-[#00A3E0] via-[#0284C7] to-[#002B66] hover:brightness-110 shadow-[#00A3E0]/25'
                  : 'text-white bg-white/20 hover:bg-[#00A3E0] border border-white/30 backdrop-blur-md shadow-black/20'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book a Visit</span>
            </a>
          </div>

          {/* Mobile Menu Button & Quick Action */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="#campus-visit"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase text-white bg-[#00A3E0] shadow-sm active:scale-95"
            >
              <Calendar className="w-3 h-3" />
              <span>Visit</span>
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open Mobile Navigation Menu"
              className={`p-2 rounded-xl focus:outline-none transition-colors ${
                isScrolledPastHero
                  ? 'text-[#002B66] hover:text-[#00A3E0] hover:bg-sky-50'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
