import { useState, useEffect, useCallback } from "react";
import { ArrowRight, Palette, Palette as Mixer } from "lucide-react";

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
    cta1: "Interactive Color Visualizer",
    cta1Target: "visualizer",
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

// Apex Coating logo SVG
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

// Premier Coat oval badge SVG
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

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="hero" className="relative">
      {/* Hero Carousel */}
      <div className="h-screen min-h-[600px] max-h-[900px] overflow-hidden bg-[#0A1B3D]">
        {/* Slides */}
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === current ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div
              className={`absolute inset-0 bg-cover bg-center ${idx === current ? "animate-ken-burns" : ""}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1B3D]/90 via-[#0A1B3D]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1B3D]/80 via-transparent to-transparent" />
          </div>
        ))}

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="container">
            <div className="max-w-2xl">
              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`transition-all duration-700 ${
                    idx === current
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8 absolute pointer-events-none"
                  }`}
                >
                  {idx === current && (
                    <>
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-overlay mb-6">
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
                      <div className="flex flex-wrap gap-4">
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
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-3 z-10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === current ? "w-10 bg-white" : "w-3 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Arrow Controls */}
        <button
          onClick={prev}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full glass-overlay text-white hover:bg-white/25 transition-all active:scale-95"
          aria-label="Previous slide"
        >
          <ArrowRight className="w-5 h-5 rotate-180" />
        </button>
        <button
          onClick={next}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full glass-overlay text-white hover:bg-white/25 transition-all active:scale-95"
          aria-label="Next slide"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
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
