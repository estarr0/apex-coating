import { Shield, Award, Truck, Leaf, Factory, Clock } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const features = [
  { icon: Shield, title: "10-Year Guarantee", code: "WS-2026", description: "WeatherShield exterior range backed by our decade-long color and performance guarantee." },
  { icon: Award, title: "BS 4800 Certified", code: "BS-4800:92", description: "Full compliance with British Standard 4800 color specifications for consistent, accurate shades." },
  { icon: Factory, title: "Industrial Grade", code: "IG-HD-01", description: "Heavy-duty formulations trusted by East Africa's leading industrial and commercial projects." },
  { icon: Leaf, title: "Eco-Conscious", code: "ECO-LOW-VOC", description: "Low-VOC formulations and RoofGuard thermal-reflective technology for sustainable building." },
  { icon: Truck, title: "East Africa Wide", code: "DIST-5N", description: "Distribution network across Kenya, Uganda, Tanzania, Rwanda, and Ethiopia." },
  { icon: Clock, title: "Fast Turnaround", code: "SLA-48H", description: "Custom color mixing and order fulfillment within 48 hours across the region." },
];

export default function Features() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className={`py-20 lg:py-24 relative overflow-hidden transition-colors duration-500 ${isDark ? "bg-slate-950" : "bg-[#0A1B3D]"}`}>
      {/* Decorative paint-drop accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-400/6 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container relative">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="font-mono text-[10px] text-blue-300 tracking-widest uppercase">
              Why Apex Coating
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Engineered for Excellence
          </h2>
          <p className="text-blue-200/70 max-w-2xl mx-auto text-lg">
            Six pillars that make Apex Coating the trusted choice for professionals and homeowners across East Africa.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feat, idx) => (
            <div
              key={feat.title}
              className="group relative p-6 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
            >
              <div className="absolute top-4 right-4 font-mono text-[9px] text-blue-400/50 tracking-wider">
                {feat.code}
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-blue-500/10 border border-blue-400/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-blue-500/15 transition-all duration-300">
                  <feat.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-base text-white mb-1.5">{feat.title}</h3>
                  <p className="text-sm text-blue-200/60 leading-relaxed">{feat.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-8">
          {["WeatherShield", "Silk Emulsion", "Industrial Primer", "Gloss Enamel", "Wood Finish", "RoofGuard"].map((line) => (
            <span key={line} className="font-mono text-[10px] text-blue-300/30 tracking-wider uppercase hidden lg:block">
              {line}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
