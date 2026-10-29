'use client';

import { useState } from 'react';
import { AchievementItem, FacultyMember } from '@/lib/db/types';
import { Trophy, Users, UserCheck, CheckCircle2, Quote, Medal } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface VoicesAndAchievementsProps {
  achievements: AchievementItem[];
  faculty: FacultyMember[];
}

export default function VoicesAndAchievements({ achievements, faculty }: VoicesAndAchievementsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'ACADEMICS', 'SPORTS', 'CULTURAL', 'COMPETITIONS'];

  const filteredAchievements = selectedCategory === 'ALL'
    ? achievements
    : achievements.filter(a => a.category === selectedCategory);

  // Category visual themes
  const getCategoryStyle = (cat: string) => {
    switch (cat.toUpperCase()) {
      case 'ACADEMICS':
        return {
          gradient: 'from-blue-600 to-indigo-600',
          pill: 'bg-blue-50 border-blue-200 text-blue-700',
          borderTop: 'border-t-4 border-blue-500',
          glow: 'card-glow-blue',
          iconColor: 'text-blue-500'
        };
      case 'SPORTS':
        return {
          gradient: 'from-amber-500 to-orange-600',
          pill: 'bg-amber-50 border-amber-200 text-amber-700',
          borderTop: 'border-t-4 border-amber-500',
          glow: 'card-glow-gold',
          iconColor: 'text-amber-500'
        };
      case 'CULTURAL':
        return {
          gradient: 'from-purple-600 to-rose-500',
          pill: 'bg-purple-50 border-purple-200 text-purple-700',
          borderTop: 'border-t-4 border-purple-500',
          glow: 'card-glow-purple',
          iconColor: 'text-purple-500'
        };
      case 'COMPETITIONS':
      default:
        return {
          gradient: 'from-emerald-500 to-teal-600',
          pill: 'bg-emerald-50 border-emerald-200 text-emerald-700',
          borderTop: 'border-t-4 border-emerald-500',
          glow: 'card-glow-emerald',
          iconColor: 'text-emerald-500'
        };
    }
  };

  return (
    <section id="achievements" className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-transparent text-slate-800 scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* ================= Part 1: ACHIEVEMENTS WALL ================= */}
        <div>
          {/* Header Card with Frosted Backing */}
          <ScrollReveal direction="down">
            <div className="text-center max-w-3xl mx-auto mb-14 p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-white/80 shadow-xl shadow-sky-900/5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-blue-500/10 border border-amber-400/40 text-xs font-bold uppercase tracking-widest text-[#002B66] mb-4 shadow-sm">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>HONORS & DISTINCTION</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#002B66] mb-4">
                THE ACHIEVEMENTS <span className="bg-gradient-to-r from-amber-500 via-[#00A3E0] to-purple-600 bg-clip-text text-transparent">WALL</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                Celebrating verified scholastic accomplishments, athletic podiums, Olympiad recognitions, and cultural distinctions earned by Vidyadhari students.
              </p>

              {/* Category Filter Pills */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-sm ${
                        isSelected
                          ? 'bg-[#002B66] text-white shadow-lg shadow-[#002B66]/25 scale-105 ring-2 ring-[#00A3E0]'
                          : 'bg-white/90 text-slate-600 border border-slate-200 hover:text-[#002B66] hover:border-slate-300'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Achievements Grid with Color-Themed Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAchievements.map((item, idx) => {
              const style = getCategoryStyle(item.category);
              return (
                <ScrollReveal key={item.id} direction="up" delay={idx * 60}>
                  <div
                    className={`p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-white/80 hover:border-slate-300 transition-all duration-300 shadow-md hover:shadow-2xl flex flex-col justify-between group h-full ${style.borderTop} ${style.glow} hover:-translate-y-1`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-[10px] font-mono px-3 py-1 rounded-full border font-bold tracking-wider ${style.pill}`}>
                          {item.category}
                        </span>
                        <span className="text-xs font-mono text-slate-500 font-bold bg-slate-100 px-2.5 py-0.5 rounded-full">{item.year}</span>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-[#002B66] group-hover:text-[#00A3E0] transition-colors mb-2">
                        {item.title}
                      </h3>

                      <p className="text-xs text-slate-600 font-normal leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-bold">
                      <Medal className={`w-4 h-4 flex-shrink-0 ${style.iconColor}`} />
                      <span className="line-clamp-1 text-[#002B66]">{item.badge}</span>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* ================= Part 2: PEOPLE BEHIND LEARNING (FACULTY) ================= */}
        <div id="faculty" className="pt-8 border-t border-slate-200/80 scroll-mt-24">
          {/* Header Card */}
          <ScrollReveal direction="down">
            <div className="text-center max-w-3xl mx-auto mb-14 p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-white/80 shadow-xl shadow-sky-900/5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-teal-500/10 to-indigo-500/10 border border-sky-400/40 text-xs font-bold uppercase tracking-widest text-[#002B66] mb-4 shadow-sm">
                <Users className="w-4 h-4 text-[#00A3E0]" />
                <span>ACADEMIC LEADERSHIP & MENTORS</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#002B66] mb-4">
                THE PEOPLE BEHIND <span className="bg-gradient-to-r from-[#002B66] via-[#00A3E0] to-teal-500 bg-clip-text text-transparent">THE LEARNING</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                Devoted, certified educators who guide students with intellectual passion, individual mentoring, and strong moral character.
              </p>

              <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Faculty profiles verified for curriculum standards & certifications</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Faculty Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {faculty.map((member, idx) => (
              <ScrollReveal key={member.id} direction="up" delay={idx * 70}>
                <div
                  className="rounded-3xl bg-white/90 backdrop-blur-md border-2 border-white/80 overflow-hidden hover:border-slate-300 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 h-full"
                >
                  <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={member.photoUrl}
                      alt={member.role}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-[10px] text-[#002B66] font-mono font-bold shadow-sm">
                      {member.subject}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-base font-bold text-[#002B66] mb-1">
                        {member.role}
                      </h3>
                      <p className="text-xs text-[#00A3E0] font-mono mb-3 font-semibold">
                        {member.qualification}
                      </p>
                      <p className="text-xs text-slate-600 font-normal leading-relaxed line-clamp-3">
                        {member.bio}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
                      <span className="font-semibold text-slate-700">{member.experience}</span>
                      <UserCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* ================= Part 3: VOICES OF VIDYADHARI (STUDENT STORIES) ================= */}
        <ScrollReveal direction="up" delay={100}>
          <div className="p-8 sm:p-12 rounded-3xl bg-white/90 backdrop-blur-md border-2 border-white/80 shadow-2xl relative overflow-hidden">
            {/* Colorful subtle background auras */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-purple-500/10 via-pink-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-amber-500/10 via-sky-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl mb-8 relative z-10">
              <span className="text-xs uppercase tracking-widest text-purple-600 font-bold flex items-center gap-2">
                <Quote className="w-4 h-4 text-purple-600" />
                <span>VOICES OF VIDYADHARI</span>
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#002B66] mt-1">
                Student Journeys & Family Reflections
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-2">
                Genuine stories of growth, confidence, and curiosity nurtured within our campus.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <div className="p-6 rounded-2xl bg-white/95 border-t-4 border-cyan-500 border border-slate-100 shadow-md hover:shadow-xl transition-all relative card-glow-blue">
                <Quote className="w-8 h-8 text-cyan-400/30 absolute top-4 right-4" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal mb-6 relative z-10 italic">
                  "Before joining Vidyadhari, science felt like a collection of textbook answers to remember. Being able to experiment in the laboratory and present our prototypes made me truly understand why concepts work."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                    S
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#002B66]">[Student Story — Class 9]</div>
                    <div className="text-[11px] text-slate-500">Science Club & Olympiad Participant</div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/95 border-t-4 border-amber-500 border border-slate-100 shadow-md hover:shadow-xl transition-all relative card-glow-gold">
                <Quote className="w-8 h-8 text-amber-400/30 absolute top-4 right-4" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal mb-6 relative z-10 italic">
                  "What we value most as parents is the discipline and personal attention our children receive. The teachers know their strengths and constantly encourage them to speak up with confidence."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                    P
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#002B66]">[Parent Reflection — Primary Section]</div>
                    <div className="text-[11px] text-slate-500">Bhimaram, Telangana</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
