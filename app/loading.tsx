export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#001D47]/90 backdrop-blur-md text-white transition-opacity">
      <div className="relative flex flex-col items-center">
        {/* Animated Vidyadhari Emblem Pulse */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#00A3E0] to-cyan-200 animate-ping opacity-30 absolute" />
        <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-cyan-400 flex items-center justify-center relative shadow-2xl shadow-cyan-500/50">
          <div className="w-8 h-8 rounded-full border-2 border-t-cyan-400 border-r-transparent border-b-cyan-200 border-l-transparent animate-spin" />
        </div>
        <div className="mt-6 text-center space-y-1.5">
          <div className="font-serif font-bold tracking-widest text-sm text-cyan-200 uppercase">
            VIDYADHARI HIGH SCHOOL
          </div>
          <div className="text-[11px] text-sky-200/80 font-medium tracking-wide">
            Preparing your campus walkthrough...
          </div>
        </div>
      </div>
    </div>
  );
}

