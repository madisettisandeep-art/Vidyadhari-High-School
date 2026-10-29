'use client';

import { useState } from 'react';
import {
  FlaskConical,
  Atom,
  Binary,
  Cpu,
  Microscope,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  Zap
} from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function ScienceSection() {
  const [activeCard, setActiveCard] = useState<number>(0);

  const pillars = [
    {
      id: 0,
      title: "Physical & Chemical Phenomena",
      icon: FlaskConical,
      headline: "Observing the Laws of Nature",
      description: "Students witness dynamic chemical reactions, verify electrical circuits, measure thermodynamic laws, and explore optical wave optics under safe, guided laboratory protocols.",
      badge: "Scientific Method & Physics",
      gradient: "from-amber-500 to-orange-600",
      accentBorder: "border-l-4 border-amber-500",
      pillBg: "bg-amber-50 border-amber-300 text-amber-800",
      glow: "card-glow-gold",
      accentColor: "text-amber-600",
      bgGlow: "from-amber-500/20 to-orange-500/5",
      stats: [
        { label: "Experiment Methodology", val: "Hypothesize & Test" },
        { label: "Safety Standard", val: "100% Lab Verified" }
      ]
    },
    {
      id: 1,
      title: "Biological Inquiry & Ecology",
      icon: Microscope,
      headline: "Exploring Living Ecosystems",
      description: "High-magnification microscopic observation of cellular structures, botanical specimens, ecological interdependence, and regional Telangana biodiversity.",
      badge: "Hands-on Botany & Zoology",
      gradient: "from-emerald-500 to-teal-600",
      accentBorder: "border-l-4 border-emerald-500",
      pillBg: "bg-emerald-50 border-emerald-300 text-emerald-800",
      glow: "card-glow-emerald",
      accentColor: "text-emerald-600",
      bgGlow: "from-emerald-500/20 to-teal-500/5",
      stats: [
        { label: "Practical Sessions", val: "Microscopy & Specimens" },
        { label: "Ecological Focus", val: "Biodiversity & Plants" }
      ]
    },
    {
      id: 2,
      title: "Logical Reasoning & Mathematics",
      icon: Binary,
      headline: "The Language of Patterns",
      description: "From 3D geometry manipulation to number theory puzzles, students develop deductive clarity, algorithmic thinking, spatial intuition, and systematic problem decomposition.",
      badge: "Applied Math Laboratory",
      gradient: "from-indigo-600 to-cyan-500",
      accentBorder: "border-l-4 border-indigo-500",
      pillBg: "bg-indigo-50 border-indigo-300 text-indigo-800",
      glow: "card-glow-purple",
      accentColor: "text-indigo-600",
      bgGlow: "from-indigo-500/20 to-cyan-500/5",
      stats: [
        { label: "Cognitive Skill", val: "Pattern Decomposition" },
        { label: "Foundation", val: "Olympiad & Logic Readiness" }
      ]
    },
    {
      id: 3,
      title: "Science Exhibitions & Robotics",
      icon: Cpu,
      headline: "Constructing Working Prototypes",
      description: "Annual innovation competitions where students engineer functioning prototypes addressing real-world challenges such as clean solar energy, automated irrigation, and water conservation.",
      badge: "Innovation Showcase",
      gradient: "from-purple-600 to-rose-500",
      accentBorder: "border-l-4 border-purple-500",
      pillBg: "bg-purple-50 border-purple-300 text-purple-800",
      glow: "card-glow-rose",
      accentColor: "text-purple-600",
      bgGlow: "from-purple-500/20 to-rose-500/5",
      stats: [
        { label: "Student Projects", val: "Working Models" },
        { label: "Core Competency", val: "Creative Engineering" }
      ]
    }
  ];

  const current = pillars[activeCard];

  return (
    <section id="science" className="relative w-full py-28 px-4 sm:px-6 lg:px-8 bg-transparent text-slate-800 overflow-hidden scroll-mt-24">
      {/* Soft Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-400/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header Card with Frosted Glass Shield */}
        <ScrollReveal direction="down">
          <div className="text-center max-w-3xl mx-auto mb-16 p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-white/80 shadow-xl shadow-sky-900/5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-amber-500/10 border border-cyan-400/40 text-xs font-bold uppercase tracking-widest text-[#002B66] mb-4 shadow-sm">
              <Atom className="w-4 h-4 text-[#00A3E0] animate-spin" />
              <span>SCIENCE & INNOVATION HUB</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#002B66] mb-4">
              ASK. <span className="bg-gradient-to-r from-[#00A3E0] via-purple-600 to-amber-500 bg-clip-text text-transparent">EXPERIMENT.</span> DISCOVER.
            </h2>

            <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
              True scientific understanding is born in the laboratory of inquiry. At Vidyadhari, students don’t simply memorize textbook formulas — they observe, hypothesize, test, and innovate.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Dedicated Physics, Chemistry, Biology & Applied Mathematics laboratories</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Interactive Grid Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Pillar Selector List */}
          <div className="lg:col-span-5 space-y-4">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isSelected = activeCard === pillar.id;
              return (
                <ScrollReveal key={pillar.id} direction="left" delay={idx * 80}>
                  <button
                    onClick={() => setActiveCard(pillar.id)}
                    className={`w-full p-5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between group backdrop-blur-md ${
                      isSelected
                        ? `bg-white/95 border-2 border-slate-300 ring-2 ring-slate-400/20 shadow-2xl scale-[1.02] ${pillar.accentBorder} ${pillar.glow}`
                        : 'bg-white/80 border-white/60 hover:border-slate-300 hover:bg-white/95 shadow-md hover:translate-x-1'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                          isSelected
                            ? `bg-gradient-to-br ${pillar.gradient} text-white shadow-lg`
                            : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-[#002B66]'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                          {pillar.badge}
                        </div>
                        <h4 className={`font-serif text-base font-bold transition-colors ${
                          isSelected ? 'text-[#002B66]' : 'text-slate-700 group-hover:text-[#002B66]'
                        }`}>
                          {pillar.title}
                        </h4>
                      </div>
                    </div>
                    <ArrowRight
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isSelected ? `${pillar.accentColor} translate-x-1 font-bold` : 'text-slate-400'
                      }`}
                    />
                  </button>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Active Pillar Featured Display */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right" delay={150}>
              <div className={`relative p-8 sm:p-12 rounded-3xl bg-white/90 backdrop-blur-md border-2 border-white/80 shadow-2xl overflow-hidden transition-all duration-500 ${current.glow}`}>
                {/* Dynamic Glowing Accent Aura */}
                <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl ${current.bgGlow} rounded-full blur-3xl pointer-events-none transition-all duration-500`} />
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${current.gradient}`} />

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className={`inline-block px-3.5 py-1.5 rounded-full border text-xs font-mono font-bold shadow-sm ${current.pillBg}`}>
                      {current.badge}
                    </div>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${current.gradient} flex items-center justify-center text-white shadow-md`}>
                      <Zap className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#002B66] leading-tight">
                    {current.headline}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                    {current.description}
                  </p>

                  {/* Highlights Grid with Visual Separation */}
                  <div className="pt-4 border-t border-slate-200/80 grid grid-cols-2 gap-4">
                    {current.stats.map((st, sidx) => (
                      <div key={sidx} className="p-4 rounded-xl bg-slate-50/90 border border-slate-200 shadow-sm hover:shadow transition-shadow">
                        <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{st.label}</div>
                        <div className="text-sm font-bold text-[#002B66] mt-1">{st.val}</div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-200/80">
                    <a
                      href="#campus-visit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#002B66] hover:bg-[#001D47] shadow-md shadow-[#002B66]/20 transition-all group"
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span>Tour Laboratories During Visit</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <div className="text-[11px] text-slate-500 font-medium">
                      Equipped for State Board & Olympiad standards
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
