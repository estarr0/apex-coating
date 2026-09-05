// Industrial Luxury style reminder: the homepage is a confident three-stage entry point—welcome, context, then a vivid working dashboard with swatch-led accents and direct routes.
import { ArrowRight, Eye, Hash, Info, Palette, ShoppingBag, Sparkles } from "lucide-react";
import { useLocation } from "wouter";
import HeroCarousel from "@/components/HeroCarousel";

const modules = [
  {
    number: "01",
    title: "Color Visualizer",
    description: "Test a BS 4800 shade in realistic room scenes, lighting conditions, and finish types.",
    href: "/visualizer",
    icon: Eye,
    accent: "#238b68",
    code: "SURFACE / ROOM",
  },
  {
    number: "02",
    title: "Color Chart",
    description: "Search the standardized collection by code, family, or named shade and send it straight to an order.",
    href: "/bs-4800",
    icon: Hash,
    accent: "#b46a2d",
    code: "BS 4800 / PALETTE",
  },
  {
    number: "03",
    title: "Color Mixer",
    description: "Build a custom HEX shade, compare the closest standard colour, and add a mixed finish to your cart.",
    href: "/mixer",
    icon: Palette,
    accent: "#7b3f77",
    code: "CUSTOM / MATCH",
  },
  {
    number: "04",
    title: "Products Catalog",
    description: "Browse decorative, industrial, automotive, adhesive, wood-care, and solvent ranges with live pack pricing.",
    href: "/products",
    icon: ShoppingBag,
    accent: "#2d75d7",
    code: "RANGE / PRICING",
  },
  {
    number: "05",
    title: "Info / About",
    description: "Understand the Apex and Premier Coat range, head-office support, and how to bring a clear brief to the team.",
    href: "/about",
    icon: Info,
    accent: "#8e5a38",
    code: "COMPANY / SUPPORT",
  },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const handleNavigate = (target: string) => {
    const routeMap: Record<string, string> = {
      hero: "/",
      visualizer: "/visualizer",
      mixer: "/mixer",
      shades: "/bs-4800",
      "shade-card": "/bs-4800",
      products: "/products",
      about: "/about",
      contact: "/#contact",
    };
    setLocation(routeMap[target] || "/");
  };

  const scrollToHub = () => {
    document.getElementById("feature-hub")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <section id="welcome" className="scroll-mt-20">
        <HeroCarousel onNavigate={handleNavigate} />
      </section>

      <section id="introduction" className="scroll-mt-20 border-b border-slate-200 bg-white py-14 lg:py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.24em] text-[#2d75d7]">
              <span className="h-px w-9 bg-[#2d75d7]" />
              02 / Introduction
            </div>
            <h1 className="max-w-xl font-display text-3xl font-extrabold leading-tight tracking-[-0.04em] text-[#0A1B3D] md:text-5xl">
              Two trusted brands. One considered finish.
            </h1>
          </div>
          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-lg leading-8 text-slate-600">
              Apex Coating East Africa Ltd develops dependable decorative, industrial, automotive, adhesive, and wood-care coatings for the region’s demanding surfaces. Explore a clear digital catalogue, test colour with confidence, and send a precise order without losing the human support behind it.
            </p>
            <button
              onClick={scrollToHub}
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-[#0A1B3D] transition-colors hover:text-[#2d75d7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d75d7] focus-visible:ring-offset-4"
            >
              Open the feature dashboard <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section id="feature-hub" className="scroll-mt-20 bg-[#f7f8fa] py-16 lg:py-24">
        <div className="container">
          <div className="mb-10 flex flex-col justify-between gap-5 border-b border-slate-200 pb-6 md:flex-row md:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-slate-500">
                <Sparkles className="h-3.5 w-3.5 text-[#2d75d7]" />
                03 / Interactive hub
              </div>
              <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-[#0A1B3D] md:text-4xl">Choose your next move.</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-slate-500">Start with the tool that matches the surface, shade, or brief in front of you.</p>
          </div>

          <div className="grid gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-2 xl:grid-cols-5">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <button
                  key={module.href}
                  onClick={() => setLocation(module.href)}
                  className="group min-h-[270px] bg-white p-6 text-left transition-colors hover:bg-[#0A1B3D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d75d7] focus-visible:ring-inset lg:p-7"
                >
                  <div className="mb-6 h-1.5 w-full" style={{ backgroundColor: module.accent }} aria-hidden="true" />
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-xs tracking-[0.18em] text-slate-400 transition-colors group-hover:text-blue-200">{module.number}</span>
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-slate-200 transition-colors group-hover:border-white/20" style={{ color: module.accent }}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-10">
                    <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400 transition-colors group-hover:text-blue-200/70">{module.code}</div>
                    <h3 className="mt-3 font-display text-xl font-bold leading-tight text-[#0A1B3D] transition-colors group-hover:text-white">{module.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500 transition-colors group-hover:text-blue-100/70">{module.description}</p>
                  </div>
                  <ArrowRight className="mt-6 h-5 w-5 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-white" />
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
