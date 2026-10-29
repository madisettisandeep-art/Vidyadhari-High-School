'use client';

import { useState } from 'react';
import { CampusLocation } from '@/lib/db/types';
import {
  Compass,
  MapPin,
  Calendar,
  Camera,
  CheckCircle2
} from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface CampusExperienceProps {
  locations: CampusLocation[];
}

export default function CampusExperience({ locations }: CampusExperienceProps) {
  const [selectedId, setSelectedId] = useState<string>(locations[0]?.id || 'loc-1');
  const [activeHotspot, setActiveHotspot] = useState<{ label: string; info: string } | null>(null);

  const currentLocation = locations.find((l) => l.id === selectedId) || locations[0];

  // Colorful styling themes for the 9 destinations
  const zoneColors = [
    { gradient: "from-sky-500 to-blue-600", border: "border-sky-500", pill: "bg-sky-50 text-sky-800 border-sky-300", glow: "card-glow-blue" },
    { gradient: "from-emerald-500 to-teal-600", border: "border-emerald-500", pill: "bg-emerald-50 text-emerald-800 border-emerald-300", glow: "card-glow-emerald" },
    { gradient: "from-purple-500 to-indigo-600", border: "border-purple-500", pill: "bg-purple-50 text-purple-800 border-purple-300", glow: "card-glow-purple" },
    { gradient: "from-amber-500 to-orange-600", border: "border-amber-500", pill: "bg-amber-50 text-amber-800 border-amber-300", glow: "card-glow-gold" },
    { gradient: "from-rose-500 to-pink-600", border: "border-rose-500", pill: "bg-rose-50 text-rose-800 border-rose-300", glow: "card-glow-rose" },
    { gradient: "from-teal-500 to-cyan-600", border: "border-teal-500", pill: "bg-teal-50 text-teal-800 border-teal-300", glow: "card-glow-emerald" },
    { gradient: "from-indigo-500 to-purple-600", border: "border-indigo-500", pill: "bg-indigo-50 text-indigo-800 border-indigo-300", glow: "card-glow-purple" },
    { gradient: "from-orange-500 to-amber-600", border: "border-orange-500", pill: "bg-orange-50 text-orange-800 border-orange-300", glow: "card-glow-gold" },
    { gradient: "from-blue-600 to-cyan-500", border: "border-blue-500", pill: "bg-sky-50 text-blue-800 border-sky-300", glow: "card-glow-blue" },
  ];

  return (
    <section id="campus" className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-transparent text-slate-800 scroll-mt-24">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Badge & Title in Frosted Glass Container */}
        <ScrollReveal direction="down">
          <div className="text-center max-w-3xl mx-auto mb-14 p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-white/80 shadow-xl shadow-sky-900/5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 border border-sky-400/40 shadow-sm mb-4">
              <Compass className="w-4 h-4 text-[#00A3E0]" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#002B66]">
                CAMPUS WALKTHROUGH
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#002B66] mb-4">
              STEP INSIDE <span className="bg-gradient-to-r from-[#00A3E0] via-purple-600 to-emerald-500 bg-clip-text text-transparent">VIDYADHARI</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
              Experience the vibrant learning environments, science laboratories, athletic grounds, and creative spaces of our Bhimaram campus from any device.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs text-[#002B66] font-semibold shadow-sm">
              <Camera className="w-4 h-4 text-[#00A3E0]" />
              <span>Interactive Campus Showcase • Select any destination below</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Visual Showcase (Photographic Interactive Campus) */}
        <ScrollReveal direction="up" delay={100}>
          <div className="mb-12">
            <div className="relative w-full h-[450px] sm:h-[540px] rounded-3xl overflow-hidden border-2 border-white/80 shadow-2xl group">
              <img
                src={currentLocation.image}
                alt={currentLocation.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001D47]/85 via-[#001D47]/20 to-transparent" />

              {/* Hotspots Overlay */}
              {currentLocation.hotspots?.map((spot, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveHotspot(spot)}
                  style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group/pin z-20 flex items-center gap-2 focus:outline-none"
                  aria-label={`Hotspot: ${spot.label}`}
                >
                  <div className="relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <div className="relative w-8 h-8 rounded-full bg-white border-2 border-[#00A3E0] flex items-center justify-center text-[#002B66] shadow-xl">
                      <MapPin className="w-4 h-4 text-[#00A3E0]" />
                    </div>
                  </div>
                  <div className="hidden sm:block px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[11px] font-bold text-[#002B66] shadow-xl whitespace-nowrap">
                    {spot.label}
                  </div>
                </button>
              ))}

              {/* Photographic Mode Status Banner */}
              <div className="absolute top-5 left-5 z-20 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-xs text-[#002B66] font-bold flex items-center gap-2 shadow-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{currentLocation.statusLabel}</span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                <div className="max-w-xl">
                  <div className="text-xs uppercase tracking-widest text-sky-300 font-bold mb-1.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span>Zone {currentLocation.number}</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                    {currentLocation.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 line-clamp-2">
                    {currentLocation.description}
                  </p>
                </div>

                <a
                  href="#campus-visit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#002B66] bg-white hover:bg-sky-50 transition-all shadow-xl shadow-slate-900/20 group/btn"
                >
                  <Calendar className="w-4 h-4 text-[#00A3E0] group-hover/btn:scale-110 transition-transform" />
                  <span>Schedule In-Person Walkthrough</span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Interactive Hotspot Modal/Popover */}
        {activeHotspot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div className="max-w-md w-full bg-white border border-[#00A3E0]/40 rounded-3xl p-6 shadow-2xl text-slate-800 relative">
              <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#00A3E0]" />
                  <h4 className="font-serif text-lg font-bold text-[#002B66]">
                    {activeHotspot.label}
                  </h4>
                </div>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="text-slate-500 hover:text-slate-800 text-xs px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors font-bold"
                >
                  ✕ Close
                </button>
              </div>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                {activeHotspot.info}
              </p>
              <div className="flex items-center justify-end gap-3">
                <a
                  href="#campus-visit"
                  onClick={() => setActiveHotspot(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#002B66] hover:bg-[#003B8E] transition-colors"
                >
                  Visit This Zone
                </a>
              </div>
            </div>
          </div>
        )}

        {/* 9 Interactive Destinations Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm uppercase tracking-widest text-[#002B66] font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>EXPLORE THE 9 CAMPUS DESTINATIONS</span>
            </h3>
            <span className="text-xs text-[#00A3E0] font-semibold hidden sm:inline">Click to inspect each zone</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {locations.map((loc, idx) => {
              const isSelected = loc.id === selectedId;
              const theme = zoneColors[idx % zoneColors.length];
              return (
                <ScrollReveal key={loc.id} direction="up" delay={idx * 60}>
                  <button
                    onClick={() => setSelectedId(loc.id)}
                    className={`text-left p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between group backdrop-blur-md w-full h-full ${
                      isSelected
                        ? `bg-white/95 border-2 ${theme.border} shadow-2xl scale-[1.02] ${theme.glow}`
                        : 'bg-white/80 border-white/70 hover:border-slate-300 hover:bg-white/95 shadow-md hover:translate-y-[-2px]'
                    }`}
                  >
                    {/* Top gradient highlight strip for selected/hover */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.gradient} transition-opacity ${
                      isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                    }`} />

                    {/* Top Bar with Number & Badge */}
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-3 pt-1">
                        <span className={`font-mono text-xs font-bold tracking-widest px-2.5 py-0.5 rounded-full ${
                          isSelected ? 'bg-[#002B66] text-white' : 'bg-slate-100 text-[#002B66]'
                        }`}>
                          ZONE {loc.number}
                        </span>
                        <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-semibold ${theme.pill}`}>
                          {loc.statusLabel}
                        </span>
                      </div>

                      <h4 className="font-serif text-lg font-bold text-[#002B66] group-hover:text-[#00A3E0] transition-colors mb-2">
                        {loc.name}
                      </h4>

                      <p className="text-xs text-slate-600 font-normal mb-4 line-clamp-2 leading-relaxed">
                        {loc.tagline}
                      </p>
                    </div>

                    {/* Feature Pills */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5 w-full">
                      {loc.features.slice(0, 2).map((feat, fidx) => (
                        <span
                          key={fidx}
                          className="text-[10px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium"
                        >
                          • {feat}
                        </span>
                      ))}
                    </div>
                  </button>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
