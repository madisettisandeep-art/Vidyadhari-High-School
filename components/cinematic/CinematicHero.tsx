'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const VIDEOS = [
  '/videos/video-1.mp4',
  '/videos/video-2.mp4',
  '/videos/video-3.mp4',
  '/videos/video-4.mp4',
  '/videos/video-5.mp4',
  '/videos/video-6.mp4',
  '/videos/video-7.mp4',
  '/videos/video-8.mp4',
  '/videos/video-9.mp4',
];

interface CinematicHeroProps {
  onEnterCampus?: () => void;
}

export default function CinematicHero(_props: CinematicHeroProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const [isMuted, setIsMuted] = useState(true);
  const isMutedRef = useRef(true);
  const [inHeroView, setInHeroView] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const lastScrollTimeRef = useRef(0);

  // Keep refs synchronized with state
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // Autoplay first video on mount
  useEffect(() => {
    const firstVid = videoRefs.current[0];
    if (firstVid) {
      firstVid.muted = true;
      firstVid.play().catch(() => {});
    }
  }, []);

  // Manage video playback & audio
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === activeIndex) {
        video.muted = isMuted;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      } else {
        video.muted = true;
        if (!video.paused) {
          video.pause();
        }
      }
    });
  }, [activeIndex, isMuted]);

  // Hero visibility check for navbar & sleek indicator
  useEffect(() => {
    const checkVisibility = () => {
      if (window.scrollY <= 10) {
        setInHeroView(true);
        return;
      }
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      setInHeroView(rect.bottom > 80);
    };

    window.addEventListener('scroll', checkVisibility, { passive: true });
    checkVisibility();
    return () => window.removeEventListener('scroll', checkVisibility);
  }, []);

  // Strict Wheel Interceptor: NEVER allows scrolling down to next section until all 9 videos are finished!
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // If user has already scrolled past the hero into the application body, allow standard scrolling
      if (window.scrollY > 20) {
        return;
      }

      const delta = e.deltaY;
      const now = Date.now();
      const currentIdx = activeIndexRef.current;

      // While on videos 1 to 8: ALWAYS lock page scroll and advance the video
      if (currentIdx < VIDEOS.length - 1) {
        e.preventDefault();

        if (delta > 15) {
          // Scroll DOWN -> Advance video slide
          if (now - lastScrollTimeRef.current > 380) {
            lastScrollTimeRef.current = now;
            const nextIdx = currentIdx + 1;
            activeIndexRef.current = nextIdx;
            setActiveIndex(nextIdx);
          }
        } else if (delta < -15) {
          // Scroll UP -> Go to previous video slide
          if (currentIdx > 0 && now - lastScrollTimeRef.current > 380) {
            lastScrollTimeRef.current = now;
            const prevIdx = currentIdx - 1;
            activeIndexRef.current = prevIdx;
            setActiveIndex(prevIdx);
          }
        }
        return;
      }

      // We ARE on the 9th video (the final video slide)!
      if (currentIdx === VIDEOS.length - 1) {
        if (delta < -15 && window.scrollY <= 10) {
          // Scrolling UP from the last video goes back to video 8
          e.preventDefault();
          if (now - lastScrollTimeRef.current > 380) {
            lastScrollTimeRef.current = now;
            const prevIdx = currentIdx - 1;
            activeIndexRef.current = prevIdx;
            setActiveIndex(prevIdx);
          }
        }
        // If delta > 0 on the 9th video, do NOT preventDefault!
        // All videos are finished, so the user can now naturally scroll down into the next section!
      }
    };

    // Attach listener permanently without recreating on state change
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Touch Swipe Handler for mobile devices
  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY > 20) return;

      const currentY = e.touches[0].clientY;
      const diff = touchStartY - currentY;
      const now = Date.now();
      const currentIdx = activeIndexRef.current;

      if (currentIdx < VIDEOS.length - 1) {
        if (e.cancelable) {
          e.preventDefault();
        }

        if (diff > 35) {
          // Swiping UP = scroll DOWN
          if (now - lastScrollTimeRef.current > 400) {
            lastScrollTimeRef.current = now;
            touchStartY = currentY;
            const nextIdx = currentIdx + 1;
            activeIndexRef.current = nextIdx;
            setActiveIndex(nextIdx);
          }
        } else if (diff < -35) {
          // Swiping DOWN = scroll UP
          if (currentIdx > 0 && now - lastScrollTimeRef.current > 400) {
            lastScrollTimeRef.current = now;
            touchStartY = currentY;
            const prevIdx = currentIdx - 1;
            activeIndexRef.current = prevIdx;
            setActiveIndex(prevIdx);
          }
        }
        return;
      }

      // On video 9: swiping down reverses to video 8 if at the top
      if (currentIdx === VIDEOS.length - 1 && diff < -35 && window.scrollY <= 10) {
        if (e.cancelable) e.preventDefault();
        if (now - lastScrollTimeRef.current > 400) {
          lastScrollTimeRef.current = now;
          touchStartY = currentY;
          const prevIdx = currentIdx - 1;
          activeIndexRef.current = prevIdx;
          setActiveIndex(prevIdx);
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Keyboard navigation (Arrow keys / Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.scrollY > 40) return;
      const currentIdx = activeIndexRef.current;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
        if (currentIdx < VIDEOS.length - 1) {
          e.preventDefault();
          const nextIdx = currentIdx + 1;
          activeIndexRef.current = nextIdx;
          setActiveIndex(nextIdx);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        if (currentIdx > 0 && window.scrollY <= 10) {
          e.preventDefault();
          const prevIdx = currentIdx - 1;
          activeIndexRef.current = prevIdx;
          setActiveIndex(prevIdx);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Toggle Mute
  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      const currentVideo = videoRefs.current[activeIndexRef.current];
      if (currentVideo) {
        currentVideo.muted = next;
        if (!next) {
          currentVideo.volume = 1;
          currentVideo.play().catch(() => {});
        }
      }
      return next;
    });
  };

  // Click any slide notch
  const handleSlideClick = (index: number) => {
    activeIndexRef.current = index;
    setActiveIndex(index);
  };

  return (
    <section
      id="hero-section"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black select-none"
    >
      {/* 9 Stacked Videos with Smooth Cross-Dissolve */}
      {VIDEOS.map((src, index) => {
        const isActive = activeIndex === index;
        return (
          <video
            key={src}
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            src={src}
            playsInline
            loop
            muted={isMuted}
            autoPlay
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover scale-[1.08] origin-top-left transition-opacity duration-600 ease-in-out will-change-transform ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          />
        );
      })}

      {/* Subtle top vignette for transparent navbar readability */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 via-black/20 to-transparent pointer-events-none z-20" />

      {/* Bottom right subtle gradient vignette to ensure no watermark/corner artifacts show whether chat is open or closed */}
      <div className="absolute bottom-0 right-0 w-64 h-36 bg-gradient-to-tl from-black/80 via-black/30 to-transparent pointer-events-none z-20" />

      {/* Sleek Line Indicator & Mute Button on the right edge */}
      <div
        className={`fixed right-4 sm:right-7 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center transition-all duration-500 ease-out ${
          inHeroView ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
      >
        {/* Simple Sleek Line with 9 Micro Notches */}
        <div className="flex flex-col items-center gap-1.5 py-2">
          {VIDEOS.map((_, i) => {
            const isActive = activeIndex === i;
            return (
              <button
                key={i}
                onClick={() => handleSlideClick(i)}
                aria-label={`Jump to video slide ${i + 1}`}
                className="group py-1 px-1 flex items-center justify-center focus:outline-none"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ease-out ${
                    isActive
                      ? 'w-[3px] h-6 bg-white shadow-[0_0_10px_rgba(255,255,255,1)]'
                      : 'w-[1.5px] h-2.5 bg-white/25 group-hover:bg-white/70 group-hover:h-4'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Minimalist Mute / Unmute Button at the bottom of the slide line */}
        <div className="pt-3">
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/35 hover:bg-black/65 backdrop-blur-md border border-white/25 text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-90 shadow-lg focus:outline-none"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#00A3E0]" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
