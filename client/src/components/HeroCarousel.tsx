import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowLeft, ArrowRight, Palette, Palette as Mixer } from "lucide-react";

interface HeroCarouselProps {
  onNavigate: (section: string) => void;
}

const slides = [
  {
    image: "/manus-storage/hero-paint-facade_529dd26e.jpg",
    title: "Color Engineered for East Africa",
    subtitle: "Premium coatings that withstand the harshest climates while delivering uncompromising quality.",
    cta1: "Interactive Color Visualizer",
    cta1Target: "visualizer",
    cta2: "Request Instant Quote",
    cta2Target: "contact",
  },
  {
    image: "/manus-storage/hero-color-palette_52df31ee.jpg",
    title: "Every Shade. Every Surface. Every Standard.",
    subtitle: "The complete BS 4800 color collection at your fingertips. Find your perfect shade.",
    cta1: "Explore BS 4800 Swatches",
    cta1Target: "shades",
    cta2: "Custom Paint Mixer",
    cta2Target: "mixer",
  },
  {
    image: "/manus-storage/hero-paint-application_3efc0a71.jpg",
    title: "Industrial Grade. Consumer Friendly.",
    subtitle: "From heavy-duty industrial primers to luxurious silk emulsions — one trusted source.",
    cta1: "View Products",
    cta1Target: "products",
    cta2: "Request Instant Quote",
    cta2Target: "contact",
  },
];

const ApexLogoSVG = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 120 100" className={className} fill="none">
    <path d="M60 5 L95 45 L80 45 L60 18 L40 45 L25 45 Z" fill="#1B5299" />
    <path d="M30 45 L45 70 L15 70 Z" fill="#1B5299" />
    <path d="M90 45 L105 70 L75 70 Z" fill="#1B5299" />
    <path d="M60 72 L72 85 L60 98 L48 85 Z" fill="#1B5299" />
    <path d="M35 72 L48 85 L35 98 L22 85 Z" fill="#2E8B3E" />
    <path d="M85 72 L98 85 L85 98 L72 85 Z" fill="#D42020" />
  </svg>
);

const PremierCoatBadge = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 120 80" className={className}>
    <ellipse cx="60" cy="40" rx="58" ry="36" fill="#2D1B69" />
    <text x="60" y="32" textAnchor="middle" fill="white" fontSize="16" fontWeight="900" fontFamily="Arial, sans-serif" letterSpacing="2">PREMIER</text>
    <path d="M15 40 Q60 32 105 40" fill="none" stroke="#D42020" strokeWidth="3" />
    <text x="60" y="58" textAnchor="middle" fill="white" fontSize="16" fontStyle="italic" fontWeight="700" fontFamily="Georgia, serif">Coat</text>
  </svg>
);

export default function HeroCarousel({ onNavigate }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  // Autoplay
  useEffect(() => {
    autoplayRef.current = setInterval(next, 5000);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [next]);

  // Touch / Swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    // Restart autoplay
    autoplayRef.current = setInterval(next, 5000);
  };

  // Mouse drag support for desktop
  const [isDragging, setIsDragging] = useState(false);
  const mouseStartX = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
    setIsDragging(true);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = mouseStartX.current - e.clientX;
    if (Math.abs(diff) > 80) {
      if (diff > 0) next();
      else prev();
    }
    autoplayRef.current = setInterval(next, 5000);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      autoplayRef.current = setInterval(next, 5000);
    }
  };

  return (
    <section id="hero" className="relative">
      {/* Hero Carousel - Owl-style horizontal sliding */}
      <div
        className="h-screen min-h-[600px] max-h-[900px] overflow-hidden bg-[#0A1B3D] relative select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {/* Horizontal Sliding Track */}
        <div className="absolute inset-0 flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
          {slides.map((slide, idx) => (
            <div key={idx} className="relative flex-shrink-0 w-full h-full">
              {/* Background Image with Ken Burns */}
              <div
                className={`absolute inset-0 bg-cover bg-center ${idx === current ? "animate-ken-burns" : ""}`}
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              {/* Gradient Overlays for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A1B3D]/90 via-[#0A1B3D]/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1B3D]/80 via-transparent to-transparent" />
            </div>
          ))}
        </div>

        {/* Content Layer (slides horizontally with the track) */}
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div className="container pointer-events-none">
            <div className="max-w-2xl">
              {/* We render all slides in a flex track matching the image slides */}
              <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
                {slides.map((slide, idx) => (
                  <div key={idx} className="flex-shrink-0 w-full">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-overlay mb-6 pointer-events-auto">
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                      <span className="text-xs font-mono text-white tracking-wider uppercase">
                        Apex Coating East Africa Ltd
                      </span>
                    </div>
                    <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                      {slide.title}
                    </h1>
                    <p className="text-lg text-blue-100 mb-8 max-w-lg leading-relaxed">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-4 pointer-events-auto">
                      <button
                        onClick={() => onNavigate(slide.cta1Target)}
                        className="group inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-[0_8px_24px_rgba(37,99,235,0.4)] active:scale-[0.97]"
                      >
                        <Palette className="w-4 h-4" />
                        {slide.cta1}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button
                        onClick={() => onNavigate(slide.cta2Target)}
                        className="group inline-flex items-center gap-2 px-6 py-3 glass-overlay text-white font-semibold rounded-lg transition-all duration-200 hover:bg-white/25 active:scale-[0.97]"
                      >
                        {slide.cta2}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Left Arrow - Visible on all screen sizes */}
        <button
          onClick={prev}
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white hover:bg-white/30 transition-all duration-200 active:scale-95 shadow-lg"
          aria-label="Previous slide"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Right Arrow - Visible on all screen sizes */}
        <button
          onClick={next}
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white hover:bg-white/30 transition-all duration-200 active:scale-95 shadow-lg"
          aria-label="Next slide"
        >
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-2.5 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === current
                  ? "w-10 h-2.5 bg-white shadow-md"
                  : "w-2.5 h-2.5 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-8 right-4 md:right-8 z-20 text-white/60 text-xs font-mono">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>
      </div>

      {/* Brand Emblem Marquee Strip */}
      <div className="bg-white border-b border-slate-100">
        <div className="container py-5">
          <div className="flex items-center justify-center gap-4 md:gap-6 lg:gap-10 flex-wrap">
            {/* Apex Coating Logo */}
            <div className="flex items-center gap-3">
              <ApexLogoSVG className="w-12 h-10" />
              <div className="hidden sm:block">
                <div className="text-xs font-bold text-[#0A1B3D] leading-tight">Apex Coating</div>
                <div className="text-[10px] text-slate-400">E.A Ltd</div>
              </div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            {/* Premier Coat Badge */}
            <div className="flex items-center gap-3">
              <PremierCoatBadge className="h-10" />
              <div className="hidden sm:block">
                <div className="text-xs font-bold text-[#2D1B69] leading-tight">Premier Coat</div>
                <div className="text-[10px] text-slate-400">By Apex</div>
              </div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            {/* BS 4800 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <span className="text-xs font-mono font-bold text-blue-600">BS</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-semibold text-slate-700">BS 4800</div>
                <div className="text-[10px] text-slate-400">Standard Certified</div>
              </div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            {/* Computerised */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-semibold text-slate-700">Computerised</div>
                <div className="text-[10px] text-slate-400">Colour Matching</div>
              </div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            {/* Unlimited Custom */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                <Mixer className="w-5 h-5 text-amber-600" />
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-semibold text-slate-700">Unlimited</div>
                <div className="text-[10px] text-slate-400">Custom Shades</div>
              </div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            {/* Premium Kenyan Quality */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-red-600" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-semibold text-slate-700">Premium</div>
                <div className="text-[10px] text-slate-400">Kenyan Quality</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
