'use client';

import { useState } from 'react';
import { GalleryItem } from '@/lib/db/types';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight, Instagram, ExternalLink } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface GallerySectionProps {
  items: GalleryItem[];
}

export default function GallerySection({ items }: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Campus', 'Classrooms', 'Sports', 'Science', 'Arts', 'Celebrations'];

  const getCategoryColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'campus': return 'bg-blue-500 text-white';
      case 'classrooms': return 'bg-cyan-600 text-white';
      case 'sports': return 'bg-orange-500 text-white';
      case 'science': return 'bg-emerald-600 text-white';
      case 'arts': return 'bg-purple-600 text-white';
      case 'celebrations': return 'bg-rose-500 text-white';
      default: return 'bg-[#002B66] text-white';
    }
  };

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="life-at-vidyadhari" className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-transparent text-slate-800 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header Card with Frosted Backing */}
        <ScrollReveal direction="down">
          <div className="text-center max-w-3xl mx-auto mb-14 p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-white/80 shadow-xl shadow-sky-900/5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 via-rose-500/10 to-amber-500/10 border border-purple-400/40 text-xs font-bold uppercase tracking-widest text-[#002B66] mb-4 shadow-sm">
              <Camera className="w-4 h-4 text-purple-600" />
              <span>VISUAL CAMPUS CHRONICLES</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#002B66] mb-4">
              LIFE @ <span className="bg-gradient-to-r from-purple-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">VIDYADHARI</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
              A glimpse into everyday energy, campus atmosphere, hands-on discoveries, athletic matches, and vibrant cultural celebrations at Bhimaram.
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
                        ? 'bg-[#002B66] text-white shadow-lg shadow-[#002B66]/25 scale-105 ring-2 ring-purple-400'
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

        {/* Masonry / Dynamic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <ScrollReveal key={item.id} direction="up" delay={idx * 60}>
              <div
                onClick={() => openLightbox(idx)}
                className="relative h-80 rounded-3xl overflow-hidden border-2 border-white/80 group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001D47]/90 via-[#001D47]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#002B66] opacity-0 group-hover:opacity-100 shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Maximize2 className="w-4 h-4 text-[#00A3E0]" />
                </div>

                <div className="absolute bottom-5 left-5 right-5 z-10">
                  <span className={`text-[10px] font-mono px-3 py-1 rounded-full font-bold shadow-md inline-block mb-2 ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white mb-1 leading-snug group-hover:text-amber-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-sky-100 line-clamp-1 font-medium">
                    {item.caption}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Instagram Connection Callout Card */}
        <ScrollReveal direction="up" delay={150}>
          <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-md border-2 border-white/80 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-pink-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-5 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF543E] via-[#FD1D1D] to-[#833AB4] flex items-center justify-center text-white shadow-xl flex-shrink-0 animate-pulse">
                <Instagram className="w-7 h-7" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-[#00A3E0] font-bold">
                  FOLLOW OUR JOURNEY
                </div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#002B66]">
                  @vidyadhari_school on Instagram
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  Stay updated with ongoing campus events, science experiments, student celebrations, and live announcements.
                </p>
              </div>
            </div>

            <a
              href="https://www.instagram.com/vidyadhari_school/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase text-white bg-gradient-to-r from-[#833AB4] to-[#FD1D1D] hover:opacity-90 shadow-xl shadow-pink-900/20 transition-all flex-shrink-0 group"
            >
              <span>Visit Official Instagram</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <button
            onClick={closeLightbox}
            aria-label="Close lightbox"
            className="absolute top-6 right-6 p-2.5 rounded-full bg-white/20 text-white hover:bg-white/30 z-50 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevLightbox}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 z-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center">
            <img
              src={filteredItems[lightboxIndex]?.imageUrl}
              alt={filteredItems[lightboxIndex]?.title}
              className="max-h-[70vh] w-auto object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-4 text-center text-white">
              <span className={`text-[10px] font-mono px-3 py-1 rounded-full font-bold inline-block mb-1 ${getCategoryColor(filteredItems[lightboxIndex]?.category)}`}>
                {filteredItems[lightboxIndex]?.category}
              </span>
              <h3 className="font-serif text-lg font-bold">{filteredItems[lightboxIndex]?.title}</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">{filteredItems[lightboxIndex]?.caption}</p>
            </div>
          </div>

          <button
            onClick={nextLightbox}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 z-50 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}
