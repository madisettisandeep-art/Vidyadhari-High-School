'use client';

import { useState } from 'react';
import {
  GraduationCap,
  Compass,
  ShieldCheck,
  BookOpen,
  CalendarCheck
} from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

type JourneyType = 'parent' | 'student' | 'admission';

export default function ChooseJourney() {
  const [activeJourney, setActiveJourney] = useState<JourneyType>('parent');

  return (
    <section id="journey" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-transparent text-slate-800 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading Card with Frosted Backing */}
        <ScrollReveal direction="down">
          <div className="text-center max-w-2xl mx-auto mb-12 p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-white/80 shadow-xl shadow-sky-900/5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-purple-500/10 border border-[#00A3E0]/30 text-xs font-bold uppercase tracking-widest text-[#002B66] mb-3 shadow-sm">
              <Compass className="w-3.5 h-3.5 text-[#00A3E0]" />
              <span>PERSONALIZED PATHWAY</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#002B66] mb-3">
              WHAT BRINGS YOU TO <span className="cyan-gradient-text">VIDYADHARI</span>?
            </h2>
            <p className="text-sm text-slate-700 font-medium">
              Select your perspective to reveal tailored insights, campus features, and recommended next steps.
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Interactive Cards Selector with Colorful Gradients & Hover Lift */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Option 1: PARENT (Emerald / Teal Theme) */}
          <ScrollReveal direction="up" delay={0}>
            <button
              onClick={() => setActiveJourney('parent')}
              className={`w-full h-full p-6 sm:p-8 rounded-3xl text-left border-2 transition-all duration-300 relative overflow-hidden group backdrop-blur-md hover:-translate-y-2 ${
                activeJourney === 'parent'
                  ? 'bg-white/95 border-emerald-500 shadow-2xl shadow-emerald-500/20 ring-2 ring-emerald-500/20'
                  : 'bg-white/85 border-white/70 hover:border-emerald-400 hover:bg-white/95 shadow-lg'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white mb-5 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div className="text-xs uppercase tracking-widest text-emerald-600 font-bold mb-1">
                For Families & Guardians
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#002B66] mb-2">
                I'M A PARENT
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Seeking a secure, disciplined, value-driven environment with scholastic excellence and dedicated teacher mentorship.
              </p>
            </button>
          </ScrollReveal>

          {/* Option 2: STUDENT (Purple / Indigo Theme) */}
          <ScrollReveal direction="up" delay={150}>
            <button
              onClick={() => setActiveJourney('student')}
              className={`w-full h-full p-6 sm:p-8 rounded-3xl text-left border-2 transition-all duration-300 relative overflow-hidden group backdrop-blur-md hover:-translate-y-2 ${
                activeJourney === 'student'
                  ? 'bg-white/95 border-purple-500 shadow-2xl shadow-purple-500/20 ring-2 ring-purple-500/20'
                  : 'bg-white/85 border-white/70 hover:border-purple-400 hover:bg-white/95 shadow-lg'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white mb-5 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <BookOpen className="w-7 h-7" />
              </div>
              <div className="text-xs uppercase tracking-widest text-purple-600 font-bold mb-1">
                For Learners & Dreamers
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#002B66] mb-2">
                I'M A STUDENT
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Eager to explore hands-on science, competitive sports, arts, cultural celebrations, and exciting club activities.
              </p>
            </button>
          </ScrollReveal>

          {/* Option 3: ADMISSION SEEKER (Amber / Sunset Theme) */}
          <ScrollReveal direction="up" delay={300}>
            <button
              onClick={() => setActiveJourney('admission')}
              className={`w-full h-full p-6 sm:p-8 rounded-3xl text-left border-2 transition-all duration-300 relative overflow-hidden group backdrop-blur-md hover:-translate-y-2 ${
                activeJourney === 'admission'
                  ? 'bg-white/95 border-amber-500 shadow-2xl shadow-amber-500/20 ring-2 ring-amber-500/20'
                  : 'bg-white/85 border-white/70 hover:border-amber-400 hover:bg-white/95 shadow-lg'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white mb-5 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-1">
                Admissions 2026–2027
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#002B66] mb-2">
                LOOKING FOR ADMISSION
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Ready to understand seat availability, required documents, class stages, and book a direct campus walkthrough.
              </p>
            </button>
          </ScrollReveal>
        </div>

        {/* Dynamically Prioritized Showcase Content with Vibrant Colored Cards */}
        <ScrollReveal direction="up">
          <div className="p-8 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-md border border-white/80 shadow-2xl animate-fade-in">
            {activeJourney === 'parent' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-emerald-600 font-bold">
                      Curated For Parents
                    </span>
                    <h4 className="font-serif text-2xl font-bold text-[#002B66] mt-1">
                      Safe, Disciplined & Intellectually Rigorous Schooling
                    </h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href="#campus-visit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/25 transition-all"
                    >
                      <CalendarCheck className="w-3.5 h-3.5 text-white" />
                      <span>Book Campus Walkthrough</span>
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 shadow-sm hover:shadow-md transition-shadow">
                    <h5 className="font-serif font-bold text-emerald-900 text-base mb-2">
                      1. Holistic Development
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Balance between competitive examination readiness and character formation, self-confidence, and communicative competence.
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-teal-50/70 border border-teal-200/60 shadow-sm hover:shadow-md transition-shadow">
                    <h5 className="font-serif font-bold text-teal-900 text-base mb-2">
                      2. Secure Environment
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Round-the-clock security monitoring, safe entry protocol at Bhimaram gates, and dedicated parent communication desks.
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-sky-50/70 border border-sky-200/60 shadow-sm hover:shadow-md transition-shadow">
                    <h5 className="font-serif font-bold text-[#002B66] text-base mb-2">
                      3. Faculty Mentorship
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Accessible, approachable teachers who track each child's foundational mastery rather than relying on rote memorization.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeJourney === 'student' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-100 pb-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-purple-600 font-bold">
                      Curated For Students
                    </span>
                    <h4 className="font-serif text-2xl font-bold text-[#002B66] mt-1">
                      Where Curiosity Meets Hands-On Discovery
                    </h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href="#science"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-600/25 transition-all"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-white" />
                      <span>Explore Science Hub</span>
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="p-6 rounded-2xl bg-purple-50/70 border border-purple-200/60 shadow-sm hover:shadow-md transition-shadow">
                    <h5 className="font-serif font-bold text-purple-900 text-base mb-2">
                      1. Innovation & Labs
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Weekly hands-on experiments in composite laboratories where students build prototypes and present models.
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-indigo-50/70 border border-indigo-200/60 shadow-sm hover:shadow-md transition-shadow">
                    <h5 className="font-serif font-bold text-indigo-900 text-base mb-2">
                      2. Athletics & Tournaments
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Inter-house leagues in cricket, kho-kho, volleyball, and track athletics fostering team spirit and fitness.
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-pink-50/70 border border-pink-200/60 shadow-sm hover:shadow-md transition-shadow">
                    <h5 className="font-serif font-bold text-pink-900 text-base mb-2">
                      3. Stage & Celebrations
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Bathukamma celebrations, annual sports days, science fairs, and elocution competitions giving every child a platform.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeJourney === 'admission' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-100 pb-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-amber-600 font-bold">
                      Admissions Information 2026–2027
                    </span>
                    <h4 className="font-serif text-2xl font-bold text-[#002B66] mt-1">
                      Enrolling Now Across Grades Primary to High School
                    </h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href="#admissions"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-amber-600 text-white hover:bg-amber-700 shadow-lg shadow-amber-600/25 transition-all"
                    >
                      <GraduationCap className="w-3.5 h-3.5 text-white" />
                      <span>Start Admission Enquiry</span>
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/60 shadow-sm hover:shadow-md transition-shadow">
                    <h5 className="font-serif font-bold text-amber-900 text-base mb-2">
                      1. Transparent Process
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Direct walkthroughs, zero hidden fees, and transparent counselor guidance on class capacities and eligibility.
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-orange-50/70 border border-orange-200/60 shadow-sm hover:shadow-md transition-shadow">
                    <h5 className="font-serif font-bold text-orange-900 text-base mb-2">
                      2. Required Documents
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Birth certificate, transfer certificate (TC), previous academic progress reports, and student passport photos.
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-sky-50/70 border border-sky-200/60 shadow-sm hover:shadow-md transition-shadow">
                    <h5 className="font-serif font-bold text-[#002B66] text-base mb-2">
                      3. Fast Assistance
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Admissions desk actively responds within 24 business hours via WhatsApp (+91 91009 01966) and on-campus visit slots.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
