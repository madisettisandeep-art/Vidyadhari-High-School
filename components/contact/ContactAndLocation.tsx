'use client';

import { MapPin, Phone, MessageSquare, Navigation, Clock } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp/whatsappHelper';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function ContactAndLocation() {
  return (
    <section id="contact" className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-transparent text-slate-800 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header Card with Frosted Backing */}
        <ScrollReveal direction="down">
          <div className="text-center max-w-3xl mx-auto mb-16 p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-white/80 shadow-xl shadow-sky-900/5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500/10 via-amber-500/10 to-blue-500/10 border border-red-400/30 text-xs font-bold uppercase tracking-widest text-[#002B66] mb-4 shadow-sm">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>CAMPUS LOCATION & ACCESS</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#002B66] mb-4">
              FIND US IN <span className="bg-gradient-to-r from-rose-500 via-[#00A3E0] to-blue-600 bg-clip-text text-transparent">BHIMARAM</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
              Conveniently situated in Vidyadhari Colony, Bhimaram Rural, Telangana. Our campus provides a tranquil, focused academic atmosphere with safe student access.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Verified Contact Card */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="left" delay={100}>
              <div className="p-8 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-md border-2 border-white/80 shadow-2xl flex flex-col justify-between space-y-6 relative overflow-hidden card-glow-blue h-full">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-[#00A3E0] to-emerald-500" />

                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#002B66] to-[#00A3E0] text-white flex items-center justify-center font-serif font-bold text-2xl shadow-lg">
                      V
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#002B66]">
                        Vidyadhari High School
                      </h3>
                      <p className="text-xs text-[#00A3E0] uppercase tracking-widest font-bold">
                        Bhimaram Rural, Telangana
                      </p>
                    </div>
                  </div>

                  {/* Verified Details with Colorful Icons */}
                  <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                    <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-rose-50/70 border border-rose-200 shadow-sm">
                      <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-[#002B66] block">Campus Address</span>
                        <span className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                          Vidyadhari Colony, Bhimaram Rural, Telangana 506015, India
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-sm">
                      <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-[#002B66] block">Publicly Listed Phone</span>
                        <a href="tel:+919100901966" className="text-emerald-700 hover:text-emerald-900 font-bold transition-colors text-xs sm:text-sm">
                          +91 91009 01966
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-sm">
                      <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-[#002B66] block">Office & Counseling Hours</span>
                        <span className="text-slate-600 text-xs sm:text-sm">
                          Monday to Saturday: 8:30 AM – 4:30 PM
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="space-y-3 pt-4 border-t border-slate-200/80">
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href="tel:+919100901966"
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-[#002B66] transition-all shadow-sm group"
                    >
                      <Phone className="w-4 h-4 text-[#00A3E0] group-hover:scale-110 transition-transform" />
                      <span>Call Office</span>
                    </a>

                    <a
                      href={buildWhatsAppUrl("Hello Vidyadhari School, I would like directions and visitor assistance.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-900/20 group"
                    >
                      <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>WhatsApp</span>
                    </a>
                  </div>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Vidyadhari+High+School+Bhimaram+Telangana+506015"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#002B66] via-[#003B8E] to-[#002B66] hover:brightness-110 text-white text-xs font-bold uppercase tracking-wider shadow-xl shadow-[#002B66]/25 transition-all group"
                  >
                    <Navigation className="w-4 h-4 text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    <span>Get Driving Directions</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Google Maps Interactive Embed Frame */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right" delay={150}>
              <div className="h-[420px] sm:h-[480px] lg:h-full min-h-[420px] sm:min-h-[480px] rounded-3xl overflow-hidden border-2 border-white/80 shadow-2xl relative bg-slate-100">
                <iframe
                  title="Vidyadhari High School Location Map"
                  src="https://maps.google.com/maps?q=Vidyadhari+High+School+Bhimaram+Warangal+Telangana+506015&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
                <div className="absolute top-5 left-5 z-10 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-xs text-[#002B66] font-bold flex items-center gap-2 shadow-xl pointer-events-none">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>Verified Campus: Bhimaram Rural, TS</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
