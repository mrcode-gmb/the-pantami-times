import React from 'react';
import logo from "@/assets/logo__Copy_-removebg-preview.png"

interface PantamiLogoProps {
  className?: string;
  showText?: boolean;
}

// Full logo for homepage/footer
export const PantamiLogo: React.FC<PantamiLogoProps> = ({ className = '', showText = true }) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full max-w-2xl mx-auto ${className}`}>
      {/* Logo Image */}
      <div className="w-full flex justify-center mb-3 md:mb-4">
        <img 
          src={logo} 
          alt="Pantami Times Logo" 
          className="h-20 md:h-28 lg:h-32 w-auto object-contain"
        />
      </div>

      {/* Text Logo */}
      {showText && (
        <div className="w-full max-w-xl border-3 md:border-4 border-[#f0a500] rounded-sm px-4 py-2 md:px-6 md:py-3">
          <h1 className="text-center font-serif text-2xl md:text-4xl lg:text-5xl font-bold tracking-wide text-foreground transition-colors">
            Pantami Times
          </h1>
          <p className="text-center text-xs md:text-sm lg:text-base mt-1 text-foreground/80 transition-colors">
            Truth, Humanity, & Progress
          </p>
        </div>
      )}
    </div>
  );
};

// Compact version for header - Mobile Responsive
export const PantamiLogoCompact: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-2 md:gap-3 ${className}`}>
      {/* Logo Image */}
      <img 
        src={logo} 
        alt="Pantami Times Logo" 
        className="h-10 md:h-12 lg:h-14 w-auto object-contain"
      />

      {/* Text */}
      <div className="border-2 border-[#f0a500] rounded px-2 py-1 md:px-4 md:py-1.5">
        <h1 className="font-serif text-sm md:text-xl lg:text-2xl font-bold tracking-wide text-foreground transition-colors whitespace-nowrap">
          Pantami Times
        </h1>
        <p className="text-[8px] md:text-[10px] lg:text-xs text-center text-foreground/70 transition-colors leading-tight">
          Truth, Humanity, & Progress
        </p>
      </div>
    </div>
  );
};
