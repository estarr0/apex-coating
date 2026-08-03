/**
 * Product Showcase Banner + Collage Grid
 * - Master composite banner (all product lines together) framed and centered
 * - 9 core product photos in a balanced grid below
 * - Fixed container aspect-ratios for easy photo swapping
 * - Dark mode support
 */
import { useTheme } from "@/contexts/ThemeContext";

const products = [
  {
    name: "Acrylic Matt",
    image: "/manus-storage/product-bucket-white_6e5a51e1.jpg",
    alt: "Acrylic Matt Emulsion",
    brand: "Apex Coating",
    category: "Decorative Coatings",
    isChemical: false,
  },
  {
    name: "Texstar Coat",
    image: "/manus-storage/product-bucket-navy_86a37cf6.jpg",
    alt: "Texstar Coat Emulsion",
    brand: "Apex Coating",
    category: "Decorative Coatings",
    isChemical: false,
  },
  {
    name: "WeatherShield",
    image: "/manus-storage/product-bucket-navy_86a37cf6.jpg",
    alt: "WeatherShield Exterior Coating",
    brand: "Apex Coating",
    category: "Decorative Coatings",
    isChemical: false,
  },
  {
    name: "Silk Vinyl",
    image: "/manus-storage/silk4ltrskyblue_f0212e90.png",
    alt: "Premier Coat Silk Vinyl Wall Sheen",
    brand: "Premier Coat",
    category: "Decorative Coatings",
    isChemical: false,
  },
  {
    name: "Super Gloss",
    image: "/manus-storage/gloss_enamel_69231713.jpg",
    alt: "Apex Paints Gloss Enamel",
    brand: "Apex Coating",
    category: "Decorative Coatings",
    isChemical: false,
  },
  {
    name: "Synthetic Varnish",
    image: "/manus-storage/synthetic_varnish_53665b46.png",
    alt: "Apex Synthetic Varnish",
    brand: "Apex Coating",
    category: "Decorative Coatings",
    isChemical: false,
  },
  {
    name: "Serafric 101",
    image: "/manus-storage/product-bucket-primer_42c70537.jpg",
    alt: "Serafric 101 Special Adhesive",
    brand: "Apex Coating",
    category: "Serafric Adhesives",
    isChemical: true,
  },
  {
    name: "Serafric 202",
    image: "/manus-storage/product-bucket-primer_42c70537.jpg",
    alt: "Serafric 202 PVC Pipe Adhesive",
    brand: "Apex Coating",
    category: "Serafric Adhesives",
    isChemical: true,
  },
  {
    name: "Serafric 103",
    image: "/manus-storage/product-bucket-primer_42c70537.jpg",
    alt: "Serafric 103 Leather Adhesive",
    brand: "Apex Coating",
    category: "Serafric Adhesives",
    isChemical: true,
  },
];

export default function ProductCollage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className={`py-20 lg:py-24 transition-colors duration-500 ${isDark ? "bg-slate-900" : "bg-slate-50"}`}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-4 ${isDark ? "bg-blue-500/10 border-blue-400/20" : "bg-[#0A1B3D]/5 border-[#0A1B3D]/10"}`}>
            <span className={`text-xs font-mono tracking-wider uppercase ${isDark ? "text-blue-400" : "text-[#0A1B3D]"}`}>
              Product Showcase
            </span>
          </div>
          <h2 className={`font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4 transition-colors ${isDark ? "text-slate-100" : "text-[#0A1B3D]"}`}>
            Our Core Product Range
          </h2>
          <p className={`max-w-2xl mx-auto text-base ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            Nine flagship products trusted across East Africa — from decorative emulsions to industrial-grade adhesives.
          </p>
        </div>

        {/* Master Composite Banner — framed and centered */}
        <div className={`relative rounded-2xl overflow-hidden mb-12 border ${isDark ? "border-slate-700" : "border-slate-200"} shadow-lg`}>
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
            <img
              src="/manus-storage/product-showcase-banner_c3b496c3.jpg"
              alt="Apex Coating Product Showcase — All Product Lines"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className={`absolute inset-0 rounded-2xl ring-1 ${isDark ? "ring-white/5" : "ring-black/5"}`} />
          </div>
        </div>

        {/* Product Collage Grid */}
        <div className="product-collage-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product, idx) => (
            <div
              key={product.name}
              className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:swatch-shadow-lg ${
                isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"
              }`}
            >
              {/* Fixed aspect-ratio image container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Product name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-blue-200 mb-0.5">
                        {product.brand}
                      </div>
                      <h3 className="font-display font-bold text-lg text-white drop-shadow-md">
                        {product.name}
                      </h3>
                    </div>
                    {product.isChemical && (
                      <div className="px-2.5 py-1 rounded-full bg-amber-500/90 backdrop-blur-sm">
                        <span className="font-mono text-[9px] text-white font-semibold uppercase">Chemical</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card footer */}
              <div className={`px-4 py-3 flex items-center justify-between ${isDark ? "bg-slate-800/50" : "bg-slate-50"}`}>
                <span className={`text-[10px] font-mono uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                  {product.category}
                </span>
                <a
                  href="#products"
                  className={`text-xs font-semibold transition-colors ${isDark ? "text-blue-400 hover:text-blue-300" : "text-[#0A1B3D] hover:text-blue-700"}`}
                >
                  View Details →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom accent bar */}
        <div className="mt-8 flex items-center justify-center gap-1">
          {["#2563EB", "#0A1B3D", "#DC2626", "#16A34A", "#CA8A04", "#7C3AED"].map((color) => (
            <div key={color} className="w-12 h-1 rounded-full" style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>
    </section>
  );
}
