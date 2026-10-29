'use client';

import { useState } from 'react';
import { DayTimelineItem } from '@/lib/db/types';
import {
  Sun,
  BookOpen,
  FlaskConical,
  Coffee,
  Palette,
  Trophy,
  Clock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface DayTimelineProps {
  timeline: DayTimelineItem[];
}

export default function DayTimeline({ timeline }: DayTimelineProps) {
  const [activeStep, setActiveStep] = useState<number>(0);

  // Phase color theme metadata
  const phaseThemes: Record<number, {
    gradient: string;
    pillBg: string;
    glow: string;
    accentColor: string;
    borderTop: string;
  }> = {
    0: {
      gradient: "from-amber-500 to-orange-500",
      pillBg: "bg-amber-50 border-amber-300 text-amber-800",
      glow: "card-glow-gold",
      accentColor: "text-amber-500",
      borderTop: "border-t-4 border-amber-500",
    },
    1: {
      gradient: "from-blue-600 to-indigo-600",
      pillBg: "bg-blue-50 border-blue-300 text-blue-800",
      glow: "card-glow-blue",
      accentColor: "text-blue-500",
      borderTop: "border-t-4 border-blue-500",
    },
    2: {
      gradient: "from-emerald-500 to-teal-600",
      pillBg: "bg-emerald-50 border-emerald-300 text-emerald-800",
      glow: "card-glow-emerald",
      accentColor: "text-emerald-500",
      borderTop: "border-t-4 border-emerald-500",
    },
    3: {
      gradient: "from-rose-500 to-pink-500",
      pillBg: "bg-rose-50 border-rose-300 text-rose-800",
      glow: "card-glow-rose",
      accentColor: "text-rose-500",
      borderTop: "border-t-4 border-rose-500",
    },
    4: {
      gradient: "from-purple-600 to-indigo-600",
      pillBg: "bg-purple-50 border-purple-300 text-purple-800",
      glow: "card-glow-purple",
      accentColor: "text-purple-500",
      borderTop: "border-t-4 border-purple-500",
    },
    5: {
      gradient: "from-orange-500 to-amber-600",
      pillBg: "bg-orange-50 border-orange-300 text-orange-800",
      glow: "card-glow-gold",
      accentColor: "text-orange-500",
      borderTop: "border-t-4 border-orange-500",
    },
    6: {
      gradient: "from-[#00A3E0] to-blue-600",
      pillBg: "bg-sky-50 border-sky-300 text-sky-800",
      glow: "card-glow-blue",
      accentColor: "text-sky-500",
      borderTop: "border-t-4 border-sky-500",
    },
  };

  const currentTheme = phaseThemes[activeStep % 7];

  const renderIcon = (name: string, isCurrent: boolean) => {
    const iconClass = `w-5 h-5 ${isCurrent ? 'text-white' : 'text-slate-600 group-hover:text-[#002B66]'}`;
    switch (name) {
      case 'Sun': return <Sun className={iconClass} />;
      case 'BookOpen': return <BookOpen className={iconClass} />;
      case 'FlaskConical': return <FlaskConical className={iconClass} />;
      case 'Coffee': return <Coffee className={iconClass} />;
      case 'Palette': return <Palette className={iconClass} />;
      case 'Trophy': return <Trophy className={iconClass} />;
      default: return <Clock className={iconClass} />;
    }
  };

  return (
    <section id="day-at-vidyadhari" className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-transparent text-slate-800 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header Card with Clean Frosted Backing */}
        <ScrollReveal direction="down">
          <div className="text-center max-w-3xl mx-auto mb-16 p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-white/80 shadow-xl shadow-sky-900/5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-blue-500/10 to-purple-500/10 border border-amber-400/40 text-xs font-bold uppercase tracking-widest text-[#002B66] mb-4 shadow-sm">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>THE STUDENT EXPERIENCE</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#002B66] mb-4">
              A DAY AT <span className="bg-gradient-to-r from-amber-500 via-[#00A3E0] to-purple-600 bg-clip-text text-transparent">VIDYADHARI</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
              Every day is thoughtfully structured to balance concentrated intellectual focus, creative release, social bonding, physical exertion, and reflective synthesis.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs text-sky-800 font-semibold shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#00A3E0]" />
              <span>Full-day holistic schedule engineered for adolescent energy & attention</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Timeline Desktop Horizontal & Mobile Vertical Layout */}
        <div className="relative">
          {/* Mobile & Tablet Horizontal Scrollable Step Pills */}
          <div className="flex lg:hidden items-center gap-2.5 overflow-x-auto pb-4 mb-6 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {timeline.map((item, idx) => {
              const isSelected = activeStep === idx;
              const theme = phaseThemes[idx % 7];
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveStep(idx)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 shadow-sm ${
                    isSelected
                      ? `bg-gradient-to-r ${theme.gradient} text-white shadow-lg scale-105`
                      : 'bg-white/90 backdrop-blur-md border border-slate-200 text-slate-700 hover:border-slate-400'
                  }`}
                >
                  <span className={`font-mono text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#002B66]'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="whitespace-nowrap font-medium">{item.time}</span>
                </button>
              );
            })}
          </div>

          {/* Timeline Navigation Dots Bar (Desktop) */}
          <ScrollReveal direction="up" delay={100}>
            <div className="hidden lg:flex items-center justify-between relative mb-14 px-8">
              {/* Connecting line */}
              <div className="absolute top-1/2 left-10 right-10 h-[3px] bg-gradient-to-r from-amber-300 via-sky-300 to-purple-300 -translate-y-1/2 z-0 rounded-full" />
              
              {timeline.map((item, idx) => {
                const isSelected = activeStep === idx;
                const theme = phaseThemes[idx % 7];
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveStep(idx)}
                    className={`relative z-10 flex flex-col items-center group focus:outline-none transition-all duration-300 ${
                      isSelected ? 'scale-115' : 'opacity-80 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 ${
                        isSelected
                          ? `bg-gradient-to-br ${theme.gradient} border-white text-white shadow-xl shadow-slate-900/15 ring-4 ring-white/60`
                          : 'bg-white/95 border-slate-300 text-slate-600 group-hover:border-slate-400 shadow-md'
                      }`}
                    >
                      {renderIcon(item.iconName, isSelected)}
                    </div>
                    <span className={`mt-2.5 font-mono text-xs font-bold transition-colors ${
                      isSelected ? 'text-[#002B66]' : 'text-slate-600'
                    }`}>
                      {item.time}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium max-w-[80px] text-center truncate">
                      {item.phase}
                    </span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Active Timeline Item Highlight Card */}
          <ScrollReveal direction="up" delay={200}>
            <div className={`max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-white/90 backdrop-blur-md border-2 border-white/80 shadow-2xl relative overflow-hidden transition-all duration-500 ${currentTheme.borderTop} ${currentTheme.glow}`}>
              {/* Soft colorful accent glow */}
              <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl ${currentTheme.gradient} opacity-10 rounded-full blur-3xl pointer-events-none transition-all duration-500`} />

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-200/80 pb-6 mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentTheme.gradient} flex items-center justify-center shadow-lg text-white`}>
                      {renderIcon(timeline[activeStep]?.iconName, true)}
                    </div>
                    <div>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-2 border shadow-sm ${currentTheme.pillBg}`}>
                        Phase {activeStep + 1}: {timeline[activeStep]?.phase}
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#002B66]">
                        {timeline[activeStep]?.title}
                      </h3>
                    </div>
                  </div>

                  <div className="px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-sm font-bold text-[#002B66] flex items-center gap-2 shadow-sm">
                    <Clock className="w-4 h-4 text-[#00A3E0]" />
                    <span>{timeline[activeStep]?.time}</span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed mb-8">
                  {timeline[activeStep]?.description}
                </p>

                {/* Stepper controls */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200/80">
                  <button
                    onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                    disabled={activeStep === 0}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-[#002B66] hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Phase</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    {timeline.map((_, dotIdx) => (
                      <span
                        key={dotIdx}
                        onClick={() => setActiveStep(dotIdx)}
                        className={`h-2 rounded-full cursor-pointer transition-all ${
                          activeStep === dotIdx
                            ? 'w-6 bg-[#002B66]'
                            : 'w-2 bg-slate-300 hover:bg-slate-400'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveStep((prev) => Math.min(timeline.length - 1, prev + 1))}
                    disabled={activeStep === timeline.length - 1}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#002B66] hover:bg-[#001D47] shadow-md shadow-[#002B66]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
                  >
                    <span>Next Phase</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
