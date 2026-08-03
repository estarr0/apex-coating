/**
 * Hero Carousel — Single-slide full-width Owl-style layout
 * - Strictly ONE slide at a time across all screen sizes
 * - Full-bleed background image per slide
 * - Single headline, concise subtext, tag badge, primary/secondary CTAs
 * - Sleek circular floating Left/Right arrows on screen edges
 * - Smooth CSS transitions, touch/swipe support, bottom pagination dots
 */
import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowLeft, ArrowRight, Palette } from "lucide-react";

interface HeroCarouselProps {
  onNavigate: (section: string) => void;
}

const slides = [
  {
    image: "/manus-storage/hero-paint-facade_529dd26e.jpg",
    tag: "APEX COATING EAST AFRICA LTD",
    title: "Color Engineered for East Africa",
    subtitle: "Premium coatings that withstand the harshest climates while delivering uncompromising quality.",
    cta1: "Interactive Color Visualizer",
    cta1Target: "visualizer",
    cta2: "Request Instant Quote",
    cta2Target: "contact",
  },
  {
    image: "/manus-storage/hero-color-palette_52df31ee.jpg",
    tag: "APEX COATING EAST AFRICA LTD",
    title: "Every Shade. Every Surface. Every Standard.",
    subtitle: "The complete BS 4800 color collection at your fingertips. Find your perfect shade.",
    cta1: "Explore BS 4800 Swatches",
    cta1Target: "shades",
    cta2: "Custom Paint Mixer",
    cta2Target: "mixer",
  },
  {
    image: "/manus-storage/hero-paint-application_3efc0a71.jpg",
    tag: "APEX COATING EAST AFRICA LTD",
    title: "Industrial Grade. Consumer Friendly.",
    subtitle: "From heavy-duty industrial primers to luxurious silk emulsions — one trusted source.",
    cta1: "View Products",
    cta1Target: "products",
    cta2: "Request Instant Quote",
    cta2Target: "contact",
  },
];

// Hi-res logo images instead of inline SVGs
const ApexLogoSVG = ({ className = "" }: { className?: string }) => (
  <img src="/manus-storage/apex-logo-official_e7e227be.jpeg" alt="Apex Coating" className={`${className} object-contain`} />
);

const PremierCoatBadge = ({ className = "" }: { className?: string }) => (
  <img src="/manus-storage/logo-premier-coat-hires_3e8fa752.png" alt="Premier Coat" className={`${className} object-contain`} />
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
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  // Autoplay — pause on hover/touch, resume after 8s
  useEffect(() => {
    autoplayRef.current = setInterval(next, 6000);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [next]);

  const pauseAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  const resumeAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(next, 6000);
  };

  // Touch / Swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    pauseAutoplay();
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
    resumeAutoplay();
  };

  const slide = slides[current];

  return (
    <section id="hero" className="relative">
      {/* ── SINGLE-SLIDE HERO (strictly 1 slide visible) ── */}
      <div
        className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden bg-[#0A1B3D]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={pauseAutoplay}
        onMouseLeave={resumeAutoplay}
      >
        {/* Full-bleed background image — single slide with crossfade */}
        <div
          key={current}
          className="absolute inset-0 bg-cover bg-center animate-fade-in"
          style={{ backgroundImage: `url(${slide.image})` }}
        />
        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1B3D]/85 via-[#0A1B3D]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1B3D]/70 via-transparent to-[#0A1B3D]/30" />

        {/* ── Content — single headline, subtext, tag badge, CTAs ── */}
        <div className="absolute inset-0 flex items-center z-10">
          <div className="container">
            <div key={current} className="max-w-2xl animate-fade-slide-up">
              {/* Tag Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-xs font-mono text-white tracking-wider uppercase">
                  {slide.tag}
                </span>
              </div>

              {/* Single Headline */}
              <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-6 drop-shadow-lg">
                {slide.title}
              </h1>

              {/* Concise Subtext */}
              <p className="text-base sm:text-lg text-blue-100/90 mb-8 max-w-lg leading-relaxed">
                {slide.subtitle}
              </p>

              {/* Primary + Secondary CTAs */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate(slide.cta1Target)}
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-[0_8px_28px_rgba(37,99,235,0.45)] active:scale-[0.97]"
                >
                  <Palette className="w-4 h-4" />
                  {slide.cta1}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => onNavigate(slide.cta2Target)}
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-xl border border-white/15 transition-all duration-200 active:scale-[0.97]"
                >
                  {slide.cta2}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Sleek circular floating arrows ── */}
        <button
          onClick={() => { pauseAutoplay(); prev(); resumeAutoplay(); }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/25 transition-all duration-200 active:scale-90 shadow-xl"
          aria-label="Previous slide"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => { pauseAutoplay(); next(); resumeAutoplay(); }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/25 transition-all duration-200 active:scale-90 shadow-xl"
          aria-label="Next slide"
        >
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* ── Bottom pagination dots ── */}
        <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-3 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`transition-all duration-400 rounded-full ${
                idx === current
                  ? "w-12 h-2.5 bg-white shadow-lg"
                  : "w-2.5 h-2.5 bg-white/35 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div className="absolute bottom-8 right-4 md:right-8 z-20 text-white/50 text-xs font-mono tracking-wider">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>
      </div>

      {/* ── Brand Emblem Marquee Strip ── */}
      <div className="bg-white border-b border-slate-100">
        <div className="container py-5">
          <div className="flex items-center justify-center gap-4 md:gap-6 lg:gap-10 flex-wrap">
            <div className="flex items-center gap-3">
              <ApexLogoSVG className="w-12 h-10" />
              <div className="hidden sm:block">
                <div className="text-xs font-bold text-[#0A1B3D] leading-tight">Apex Coating</div>
                <div className="text-[10px] text-slate-400">E.A Ltd</div>
              </div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="flex items-center gap-3">
              <PremierCoatBadge className="h-10" />
              <div className="hidden sm:block">
                <div className="text-xs font-bold text-[#2D1B69] leading-tight">Premier Coat</div>
                <div className="text-[10px] text-slate-400">By Apex</div>
              </div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
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
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                <Palette className="w-5 h-5 text-amber-600" />
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-semibold text-slate-700">Unlimited</div>
                <div className="text-[10px] text-slate-400">Custom Shades</div>
              </div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
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
