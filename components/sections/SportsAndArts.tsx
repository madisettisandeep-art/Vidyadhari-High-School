'use client';

import { Trophy, Palette, Shield, Users, Activity, Music, Flame } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function SportsAndArts() {
  const sportsCards = [
    {
      icon: Activity,
      title: "Daily Physical Discipline",
      badge: "Track & Calisthenics",
      description: "Cardiovascular stamina, speed agility drills, and flexibility routines designed for developing young physiology.",
      gradient: "from-amber-500 to-orange-500",
      accentBorder: "border-t-4 border-orange-500",
      pillBg: "bg-orange-50 border-orange-200 text-orange-700",
      glow: "card-glow-gold",
    },
    {
      icon: Users,
      title: "Team Dynamics & Strategy",
      badge: "Inter-House Leagues",
      description: "Inter-house tournaments in cricket, kho-kho, volleyball, and kabaddi teaching collective coordination and tactical instincts.",
      gradient: "from-[#00A3E0] to-[#002B66]",
      accentBorder: "border-t-4 border-[#00A3E0]",
      pillBg: "bg-sky-50 border-sky-200 text-[#002B66]",
      glow: "card-glow-blue",
    },
    {
      icon: Shield,
      title: "Character & Sportsmanship",
      badge: "Ethical Athletics",
      description: "Honoring the referee's whistle, respecting opposing teams, and celebrating peers' personal bests with humility.",
      gradient: "from-emerald-500 to-teal-600",
      accentBorder: "border-t-4 border-emerald-500",
      pillBg: "bg-emerald-50 border-emerald-200 text-emerald-700",
      glow: "card-glow-emerald",
    },
  ];

  const artsCards = [
    {
      icon: Flame,
      title: "Telangana Cultural Festivities",
      badge: "Bathukamma & Folk Lore",
      description: "Bathukamma floral arrangements, folk song traditions, and harvest festivals instilling pride in regional heritage and community harmony.",
      gradient: "from-amber-500 to-yellow-600",
      accentBorder: "border-t-4 border-amber-500",
      pillBg: "bg-amber-50 border-amber-200 text-amber-800",
      glow: "card-glow-gold",
    },
    {
      icon: Palette,
      title: "Fine Arts & Drawing",
      badge: "Visual Arts Studio",
      description: "Pencil sketching, watercolor theory, clay modeling, and student craft exhibitions celebrating visual expression.",
      gradient: "from-purple-500 to-indigo-600",
      accentBorder: "border-t-4 border-purple-500",
      pillBg: "bg-purple-50 border-purple-200 text-purple-700",
      glow: "card-glow-purple",
    },
    {
      icon: Music,
      title: "Music, Dance & Theatre",
      badge: "Stage & Performance",
      description: "Vocal training, rhythm exploration, classical dance foundations, and annual theatrical performances fostering fearless stage presence.",
      gradient: "from-rose-500 to-pink-600",
      accentBorder: "border-t-4 border-rose-500",
      pillBg: "bg-rose-50 border-rose-200 text-rose-700",
      glow: "card-glow-rose",
    },
  ];

  return (
    <section id="sports-and-arts" className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-transparent text-slate-800 scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* ================= Part 1: SPORTS ================= */}
        <div>
          {/* Header Card with Clean Frosted Backing to prevent clashing with background */}
          <ScrollReveal direction="down">
            <div className="max-w-3xl mb-12 p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-white/80 shadow-xl shadow-sky-900/5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-300 text-xs font-bold uppercase tracking-widest text-orange-700 mb-4 shadow-sm">
                <Trophy className="w-4 h-4 text-orange-500" />
                <span>ATHLETICS & PHYSICAL EDUCATION</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#002B66] mb-3">
                BUILDING CONFIDENCE <span className="cyan-gradient-text">BEYOND THE CLASSROOM</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                Resilience, endurance, and grace in victory or defeat are forged on the sports field. Our physical education curriculum balances competitive rigor with inclusive daily fitness.
              </p>
            </div>
          </ScrollReveal>

          {/* 3 Sports Cards with Colorful Gradients & Motion */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sportsCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <ScrollReveal key={idx} direction="up" delay={idx * 150}>
                  <div
                    className={`p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-white/70 ${card.accentBorder} ${card.glow} transition-all duration-300 hover:-translate-y-2 shadow-lg flex flex-col justify-between group h-full`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                        >
                          <Icon className="w-7 h-7" />
                        </div>
                        <span className={`text-[11px] font-mono px-3 py-1 rounded-full border font-bold uppercase tracking-wide ${card.pillBg}`}>
                          {card.badge}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl font-bold text-[#002B66] group-hover:text-[#00A3E0] transition-colors mb-3">
                        {card.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-semibold">Active Coaching Program</span>
                      <span className="text-xs font-bold text-[#00A3E0] group-hover:translate-x-1 transition-transform">Explore →</span>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* ================= Part 2: ARTS & CULTURE ================= */}
        <div className="pt-8 border-t border-sky-100/60">
          {/* Header Card with Clean Frosted Backing */}
          <ScrollReveal direction="down">
            <div className="max-w-3xl mb-12 p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-white/80 shadow-xl shadow-sky-900/5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-300 text-xs font-bold uppercase tracking-widest text-purple-700 mb-4 shadow-sm">
                <Palette className="w-4 h-4 text-purple-600" />
                <span>CREATIVE ARTS & TELANGANA HERITAGE</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#002B66] mb-3">
                EDUCATION IS MORE THAN <span className="cyan-gradient-text">EXAMINATION</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                Vidyadhari celebrates deep rooted cultural heritage alongside modern fine arts. From traditional Bathukamma festivities to vocal music and expressive theatrical storytelling.
              </p>
            </div>
          </ScrollReveal>

          {/* 3 Arts Cards with Vibrant Color Accent Themes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {artsCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <ScrollReveal key={idx} direction="up" delay={idx * 150}>
                  <div
                    className={`p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-white/70 ${card.accentBorder} ${card.glow} transition-all duration-300 hover:-translate-y-2 shadow-lg flex flex-col justify-between group h-full`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                        >
                          <Icon className="w-7 h-7" />
                        </div>
                        <span className={`text-[11px] font-mono px-3 py-1 rounded-full border font-bold uppercase tracking-wide ${card.pillBg}`}>
                          {card.badge}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl font-bold text-[#002B66] group-hover:text-[#00A3E0] transition-colors mb-3">
                        {card.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-semibold">Creative Studio Workshop</span>
                      <span className="text-xs font-bold text-[#00A3E0] group-hover:translate-x-1 transition-transform">View Gallery →</span>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
