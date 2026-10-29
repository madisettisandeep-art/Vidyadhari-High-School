'use client';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'symbol' | 'badge' | 'navbar';
  showText?: boolean;
  isTransparent?: boolean;
}

export default function VidyadhariLogo({
  className = '',
  size = 'md',
  variant = 'full',
  showText = true,
  isTransparent = false,
}: LogoProps) {
  const sizeStyles = {
    sm: { height: 38, width: 110, symbolSize: 36, text: 'text-sm', sub: 'text-[9px]' },
    md: { height: 46, width: 140, symbolSize: 42, text: 'text-base', sub: 'text-[10px]' },
    lg: { height: 64, width: 200, symbolSize: 58, text: 'text-xl', sub: 'text-xs' },
    xl: { height: 88, width: 280, symbolSize: 80, text: 'text-2xl', sub: 'text-sm' },
  };

  const { height, symbolSize, text, sub } = sizeStyles[size];

  // Sleek, modern variant tailored specifically for the top navbar
  if (variant === 'navbar') {
    return (
      <div className={`inline-flex items-center gap-2.5 sm:gap-3 flex-shrink-0 ${className}`}>
        <div
          style={{ width: `${symbolSize}px`, height: `${symbolSize}px` }}
          className={`rounded-full p-0.5 shadow-md flex items-center justify-center overflow-hidden flex-shrink-0 transition-all duration-300 group-hover:scale-105 ${
            isTransparent
              ? 'bg-white/95 border-2 border-white/80 shadow-black/30'
              : 'bg-white border-2 border-[#00A3E0]/50 shadow-[#00A3E0]/20 group-hover:border-[#00A3E0]'
          }`}
        >
          <img
            src="/logo.png"
            alt="Vidyadhari Emblem"
            className="w-full h-full object-contain scale-125"
          />
        </div>

        {showText && (
          <div className="flex flex-col text-left">
            <span
              className={`font-serif font-black tracking-[0.12em] text-sm sm:text-base leading-tight transition-colors ${
                isTransparent
                  ? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
                  : 'text-[#002B66] group-hover:text-[#00A3E0]'
              }`}
            >
              VIDY<span className="text-[#00A3E0]">Λ</span>DH<span className="text-[#00A3E0]">Λ</span>RI
            </span>
            <span
              className={`font-sans tracking-[0.2em] uppercase font-bold text-[8.5px] sm:text-[9.5px] leading-tight mt-0.5 ${
                isTransparent
                  ? 'text-sky-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
                  : 'text-[#00A3E0]'
              }`}
            >
              HIGH SCHOOL
            </span>
          </div>
        )}
      </div>
    );
  }

  // Full official logo image
  if (variant === 'full') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <img
          src="/logo.png"
          alt="Vidyadhari High School — Your Future Begins Here"
          style={{ height: `${height}px`, width: 'auto' }}
          className="object-contain filter drop-shadow-sm transition-transform hover:scale-105 duration-300"
        />
      </div>
    );
  }

  // Circular emblem / symbol view
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div
        style={{ width: `${symbolSize}px`, height: `${symbolSize}px` }}
        className="rounded-full bg-white p-1 shadow-lg shadow-[#00A3E0]/20 border border-[#00A3E0]/40 flex items-center justify-center overflow-hidden flex-shrink-0"
      >
        <img
          src="/logo.png"
          alt="Vidyadhari Emblem"
          className="w-full h-full object-contain scale-125"
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-serif font-black tracking-[0.14em] text-[#002B66] ${text}`}>
            VIDY<span className="text-[#00A3E0]">Λ</span>DH<span className="text-[#00A3E0]">Λ</span>RI
          </span>
          <span className={`font-sans tracking-[0.24em] uppercase text-[#00A3E0] font-bold ${sub}`}>
            HIGH SCHOOL
          </span>
        </div>
      )}
    </div>
  );
}
