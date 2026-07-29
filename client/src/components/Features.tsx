import { Shield, Award, Truck, Leaf, Factory, Clock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "10-Year Guarantee",
    description: "WeatherShield exterior range backed by our decade-long color and performance guarantee.",
  },
  {
    icon: Award,
    title: "BS 4800 Certified",
    description: "Full compliance with British Standard 4800 color specifications for consistent, accurate shades.",
  },
  {
    icon: Factory,
    title: "Industrial Grade",
    description: "Heavy-duty formulations trusted by East Africa's leading industrial and commercial projects.",
  },
  {
    icon: Leaf,
    title: "Eco-Conscious",
    description: "Low-VOC formulations and RoofGuard thermal-reflective technology for sustainable building.",
  },
  {
    icon: Truck,
    title: "East Africa Wide",
    description: "Distribution network across Kenya, Uganda, Tanzania, Rwanda, and Ethiopia.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "Custom color mixing and order fulfillment within 48 hours across the region.",
  },
];

export default function Features() {
  return (
    <section className="py-20 lg:py-24 bg-[#0A1B3D] relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 mb-4">
            <span className="text-xs font-mono text-blue-300 tracking-wider uppercase">
              Why Apex
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Engineered for Excellence
          </h2>
          <p className="text-blue-200 max-w-2xl mx-auto text-lg">
            Six pillars that make Apex Coating the trusted choice for professionals and homeowners across East Africa.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feat.icon className="w-6 h-6 text-blue-300" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white mb-2">
                {feat.title}
              </h3>
              <p className="text-sm text-blue-200 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
