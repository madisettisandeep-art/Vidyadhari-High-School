'use client';

import { useState } from 'react';
import { BookOpen, Lightbulb, CheckCircle, Award, Target } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function AcademicsSection() {
  const [activeTab, setActiveTab] = useState<'philosophy' | 'levels' | 'method'>('philosophy');

  return (
    <section id="academics" className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-transparent text-slate-800 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header Card with Frosted Backing */}
        <ScrollReveal direction="down">
          <div className="text-center max-w-3xl mx-auto mb-16 p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-white/80 shadow-xl shadow-sky-900/5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-[#00A3E0]/30 text-xs font-bold uppercase tracking-widest text-[#002B66] mb-4 shadow-sm">
              <BookOpen className="w-3.5 h-3.5 text-[#00A3E0]" />
              <span>ACADEMIC RIGOR & PEDAGOGY</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#002B66] mb-4">
              LEARNING BEYOND THE <span className="cyan-gradient-text">TEXTBOOK</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
              At Vidyadhari High School, education is not passive memorization. We cultivate conceptual clarity, critical questioning, and lifelong intellectual curiosity across all grade stages.
            </p>

            {/* Navigation Pill Tabs */}
            <div className="mt-8 flex flex-wrap sm:inline-flex justify-center gap-2 p-1.5 rounded-2xl sm:rounded-full bg-white/90 backdrop-blur-md border border-sky-100 shadow-md max-w-full">
              <button
                onClick={() => setActiveTab('philosophy')}
                className={`px-5 py-2.5 rounded-xl sm:rounded-full text-xs font-bold tracking-wider transition-all duration-300 ${
                  activeTab === 'philosophy'
                    ? 'bg-gradient-to-r from-[#002B66] to-[#00A3E0] text-white shadow-md shadow-sky-900/20 scale-[1.02]'
                    : 'text-slate-600 hover:text-[#002B66] hover:bg-sky-50'
                }`}
              >
                Learning Philosophy
              </button>
              <button
                onClick={() => setActiveTab('levels')}
                className={`px-5 py-2.5 rounded-xl sm:rounded-full text-xs font-bold tracking-wider transition-all duration-300 ${
                  activeTab === 'levels'
                    ? 'bg-gradient-to-r from-[#002B66] to-[#00A3E0] text-white shadow-md shadow-sky-900/20 scale-[1.02]'
                    : 'text-slate-600 hover:text-[#002B66] hover:bg-sky-50'
                }`}
              >
                School Stages (Primary to High)
              </button>
              <button
                onClick={() => setActiveTab('method')}
                className={`px-5 py-2.5 rounded-xl sm:rounded-full text-xs font-bold tracking-wider transition-all duration-300 ${
                  activeTab === 'method'
                    ? 'bg-gradient-to-r from-[#002B66] to-[#00A3E0] text-white shadow-md shadow-sky-900/20 scale-[1.02]'
                    : 'text-slate-600 hover:text-[#002B66] hover:bg-sky-50'
                }`}
              >
                Teaching Methodology
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Tab 1: Philosophy */}
        {activeTab === 'philosophy' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            <ScrollReveal direction="up" delay={0}>
              <div className="p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-white/70 border-t-4 border-amber-500 card-glow-gold hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group shadow-lg h-full">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white mb-6 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <Lightbulb className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#002B66] mb-3">
                    Inquiry-Driven Understanding
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Rather than teaching formulas in isolation, educators prompt students with the "why" and "how". Children dissect real-world problems before generalizing mathematical and scientific principles.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-amber-700 font-bold uppercase tracking-wider">
                  Conceptual Rigor
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150}>
              <div className="p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-white/70 border-t-4 border-purple-500 card-glow-purple hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group shadow-lg h-full">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white mb-6 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <Award className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#002B66] mb-3">
                    Comprehensive Assessment
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Continuous formative evaluation tracks foundational grasp, oral communication, and analytical homework rather than single high-stress annual exams.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-purple-700 font-bold uppercase tracking-wider">
                  Continuous Feedback
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300}>
              <div className="p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-white/70 border-t-4 border-emerald-500 card-glow-emerald hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group shadow-lg h-full">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white mb-6 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <Target className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#002B66] mb-3">
                    Academic Remediation & Support
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Dedicated revision slots provide tailored guidance for students who need additional reinforcement in language literacy and quantitative problem sets.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-emerald-700 font-bold uppercase tracking-wider">
                  Inclusive Learning
                </div>
              </div>
            </ScrollReveal>
          </div>
        )}

        {/* Tab 2: Stages */}
        {activeTab === 'levels' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            {/* Primary School (Warm Amber) */}
            <ScrollReveal direction="up" delay={0}>
              <div className="p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-white/70 border-t-4 border-amber-500 card-glow-gold hover:-translate-y-2 transition-all duration-300 shadow-xl h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold px-3 py-1 rounded-full bg-amber-50 border border-amber-200">
                      FOUNDATIONAL YEARS
                    </span>
                    <span className="text-xs font-mono text-slate-500">Grades 1–5</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#002B66] mt-1 mb-3">
                    Primary School
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    Emphasis on phonics, numeracy intuition, observational nature studies, moral ethics, and playful creative expression that builds a love for coming to school.
                  </p>
                  <ul className="space-y-3 text-xs text-slate-700">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span>Activity-integrated math and storytelling</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span>Bilingual language immersion (English & Telugu)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span>Gross motor and creative art development</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700">
                  <span>Explore Primary</span>
                  <span>→</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Middle School (Electric Cyan) */}
            <ScrollReveal direction="up" delay={150}>
              <div className="p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-white/70 border-t-4 border-[#00A3E0] card-glow-blue hover:-translate-y-2 transition-all duration-300 shadow-xl h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#00A3E0] font-bold px-3 py-1 rounded-full bg-sky-50 border border-sky-200">
                      EXPLORATORY STAGE
                    </span>
                    <span className="text-xs font-mono text-slate-500">Grades 6–8</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#002B66] mt-1 mb-3">
                    Middle School
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    Transitioning into structured scientific branches, algebraic concepts, historical timelines, and debate forums encouraging reasoned argument.
                  </p>
                  <ul className="space-y-3 text-xs text-slate-700">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#00A3E0] flex-shrink-0" />
                      <span>Structured laboratory demonstrations</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#00A3E0] flex-shrink-0" />
                      <span>Grammar precision and essay rhetoric</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#00A3E0] flex-shrink-0" />
                      <span>Inter-house scholastic and quiz competitions</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#00A3E0]">
                  <span>Explore Middle</span>
                  <span>→</span>
                </div>
              </div>
            </ScrollReveal>

            {/* High School (Royal Purple & Gold) */}
            <ScrollReveal direction="up" delay={300}>
              <div className="p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-white/70 border-t-4 border-purple-600 card-glow-purple hover:-translate-y-2 transition-all duration-300 shadow-xl h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-purple-700 font-bold px-3 py-1 rounded-full bg-purple-50 border border-purple-200">
                      MASTERY & ASPIRATION
                    </span>
                    <span className="text-xs font-mono text-slate-500">Grades 9–10</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#002B66] mt-1 mb-3">
                    High School
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    Advanced academic mastery, intensive board exam preparation, leadership responsibilities, and guidance for higher secondary streams.
                  </p>
                  <ul className="space-y-3 text-xs text-slate-700">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      <span>Thorough syllabus coverage and test series</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      <span>Individual performance analysis and doubt solving</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      <span>Career counseling and stream guidance</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700">
                  <span>Explore High School</span>
                  <span>→</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        )}

        {/* Tab 3: Method */}
        {activeTab === 'method' && (
          <ScrollReveal direction="up">
            <div className="p-8 sm:p-12 rounded-3xl bg-white/90 backdrop-blur-md border border-white/80 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-2xl animate-fade-in">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs uppercase tracking-widest text-[#002B66] font-bold mb-3">
                  STUDENT-CENTERED PEDAGOGY
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#002B66] mb-4">
                  How Our Teachers Transform Information into Wisdom
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 font-normal">
                  Every classroom interaction is designed to encourage students to voice their interpretations. Teachers act as mentors who scaffold difficult topics with clear analogies and tactile representations.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Special emphasis is placed on writing discipline, neatness, and articulate verbal articulation so Vidyadhari students grow with immense self-confidence.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-200">
                  <h4 className="font-serif font-bold text-[#002B66] text-base mb-1">
                    1. Direct Mentor Scaffolding
                  </h4>
                  <p className="text-xs text-slate-600">
                    Step-by-step guidance ensuring no learner falls behind in core numeracy and scientific terminology.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-r from-[#00A3E0]/10 to-transparent border border-sky-200">
                  <h4 className="font-serif font-bold text-[#002B66] text-base mb-1">
                    2. Experiential Real-World Context
                  </h4>
                  <p className="text-xs text-slate-600">
                    Field projects, campus botanical observations, and science laboratory experiments connecting theory to life.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-200">
                  <h4 className="font-serif font-bold text-[#002B66] text-base mb-1">
                    3. Confident Public Elocution
                  </h4>
                  <p className="text-xs text-slate-600">
                    Daily assembly talks, class presentations, and debate sessions shaping fearless communicators.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
