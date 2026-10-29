'use client';

import {
  Compass,
  ShieldCheck,
  Award,
  Users,
  Lightbulb,
  HeartHandshake,
  Target,
  ArrowRight
} from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function WhyVidyadhari() {
  const pillars = [
    {
      icon: Lightbulb,
      title: "Conceptual Clarity Over Rote Learning",
      description: "Education rooted in scientific understanding, language expression, and logical reasoning instead of mechanical memory.",
      badge: "Pedagogy",
      gradient: "from-amber-400 to-amber-600",
      topBorder: "border-t-4 border-amber-500",
      pillBg: "bg-amber-50 border-amber-200 text-amber-800",
      glow: "card-glow-gold",
    },
    {
      icon: ShieldCheck,
      title: "Safe, Tree-Canopied Bhimaram Campus",
      description: "A secure, tranquil campus in Vidyadhari Colony designed for children to concentrate away from highway distractions.",
      badge: "Campus Environment",
      gradient: "from-emerald-400 to-teal-600",
      topBorder: "border-t-4 border-emerald-500",
      pillBg: "bg-emerald-50 border-emerald-200 text-emerald-800",
      glow: "card-glow-emerald",
    },
    {
      icon: HeartHandshake,
      title: "Values, Discipline & Cultural Roots",
      description: "Instilling mutual respect, civic responsibility, and active celebration of regional Telangana traditions like Bathukamma.",
      badge: "Character",
      gradient: "from-rose-500 to-pink-600",
      topBorder: "border-t-4 border-rose-500",
      pillBg: "bg-rose-50 border-rose-200 text-rose-800",
      glow: "card-glow-rose",
    },
    {
      icon: Award,
      title: "Holistic Mind & Body Development",
      description: "Co-curricular balance with daily outdoor physical education, vocal and fine arts, and regional project exhibitions.",
      badge: "Wellness",
      gradient: "from-[#00A3E0] to-[#002B66]",
      topBorder: "border-t-4 border-[#00A3E0]",
      pillBg: "bg-sky-50 border-sky-200 text-[#002B66]",
      glow: "card-glow-blue",
    },
    {
      icon: Users,
      title: "Approachable Teacher Mentorship",
      description: "Dedicated educators who maintain open dialogues with parents, nurturing each child according to their learning pace.",
      badge: "Mentorship",
      gradient: "from-purple-500 to-indigo-600",
      topBorder: "border-t-4 border-purple-500",
      pillBg: "bg-purple-50 border-purple-200 text-purple-800",
      glow: "card-glow-purple",
    },
    {
      icon: Target,
      title: "Future-Ready Scholastic Aptitude",
      description: "Preparing high school students for competitive academic challenges with structured periodic assessments.",
      badge: "Aspiration",
      gradient: "from-orange-500 to-amber-500",
      topBorder: "border-t-4 border-orange-500",
      pillBg: "bg-orange-50 border-orange-200 text-orange-800",
      glow: "card-glow-gold",
    }
  ];

  return (
    <section id="why-vidyadhari" className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-transparent text-slate-800 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header Card with Frosted Glass */}
        <ScrollReveal direction="down">
          <div className="text-center max-w-3xl mx-auto mb-16 p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-white/80 shadow-xl shadow-sky-900/5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-[#00A3E0]/30 text-xs font-bold uppercase tracking-widest text-[#002B66] mb-4 shadow-sm">
              <Compass className="w-3.5 h-3.5 text-[#00A3E0]" />
              <span>INSTITUTIONAL VALUES</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#002B66] mb-4">
              WHY <span className="cyan-gradient-text">VIDYADHARI</span>?
            </h2>

            <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
              Positioned as a modern, student-focused school where academic learning, confidence, creativity, discipline, and holistic growth converge.
            </p>
          </div>
        </ScrollReveal>

        {/* 6 Core Value Pillars with Distinct Colors & Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <ScrollReveal key={idx} direction="up" delay={idx * 100}>
                <div
                  className={`p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-white/70 ${p.topBorder} ${p.glow} hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group shadow-lg h-full`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.gradient} flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className={`text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full border font-bold ${p.pillBg}`}>
                        {p.badge}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#002B66] group-hover:text-[#00A3E0] transition-colors mb-2.5">
                      {p.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#00A3E0]">
                    <span>Learn philosophy</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
