import { useState, useMemo } from "react";
import { Search, Plus, X } from "lucide-react";
import { BS4800_COLORS, SHADE_FAMILIES, BSColor } from "@/lib/bs4800";
import { useCart } from "@/contexts/CartContext";
import { PRODUCTS } from "@/lib/products";

interface ShadeCardProps {
  externalSearch?: string;
}

export default function ShadeCard({ externalSearch = "" }: ShadeCardProps) {
  const [search, setSearch] = useState("");
  const [activeFamily, setActiveFamily] = useState("All");
  const [selectedColor, setSelectedColor] = useState<BSColor | null>(null);
  const { addItem } = useCart();

  const effectiveSearch = externalSearch || search;

  const filteredColors = useMemo(() => {
    let result = BS4800_COLORS;
    if (activeFamily !== "All") {
      result = result.filter((c) => c.family === activeFamily);
    }
    if (effectiveSearch.trim()) {
      const q = effectiveSearch.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.code.toLowerCase().includes(q) ||
          c.name.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeFamily, effectiveSearch]);

  const handleAddToCart = (color: BSColor) => {
    const product = PRODUCTS[0]; // Default to WeatherShield for color cart
    addItem({
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      sizeLabel: "1L",
      sizeVolume: "1 Litre",
      price: product.sizes[0].price,
      bsCode: color.code,
      colorName: color.name,
      colorHex: color.hex,
    });
  };

  return (
    <section id="shade-card" className="py-20 lg:py-28 bg-slate-50">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
            <span className="text-xs font-mono text-blue-600 tracking-wider uppercase">
              BS 4800 Standard
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[#0A1B3D] mb-4">
            The Complete Shade Card
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Explore the full British Standard BS 4800 color collection. Search by code, filter by family, and add any shade directly to your cart.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 space-y-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-center rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm focus-within:border-blue-400 transition-colors">
              <Search className="w-5 h-5 text-slate-400 ml-4" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by BS code (e.g. 00 E 55) or name..."
                className="flex-1 px-3 py-3 text-sm bg-transparent outline-none text-slate-700"
              />
              {search && (
                <button onClick={() => setSearch("")} className="px-3 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Family Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {SHADE_FAMILIES.map((family) => (
              <button
                key={family}
                onClick={() => setActiveFamily(family)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 active:scale-95 ${
                  activeFamily === family
                    ? "bg-[#0A1B3D] text-white shadow-md"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                }`}
              >
                {family}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="text-center mb-6">
          <span className="text-sm text-slate-500 font-mono">
            {filteredColors.length} shades {activeFamily !== "All" && `in ${activeFamily}`}
          </span>
        </div>

        {/* Swatch Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-4">
          {filteredColors.map((color) => (
            <div
              key={color.code}
              className="group relative bg-white rounded-xl overflow-hidden swatch-shadow hover:swatch-shadow-lg transition-all duration-200 cursor-pointer"
              onClick={() => setSelectedColor(color)}
            >
              {/* Color Swatch */}
              <div
                className="h-24 md:h-28 w-full transition-transform duration-200 group-hover:scale-105"
                style={{ backgroundColor: color.hex }}
              />
              {/* Info */}
              <div className="p-2.5 md:p-3">
                <div className="font-mono text-[10px] md:text-xs text-slate-500 mb-0.5">
                  {color.code}
                </div>
                <div className="text-xs md:text-sm font-medium text-slate-800 truncate">
                  {color.name}
                </div>
              </div>
              {/* Quick Add Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(color);
                }}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-blue-600 hover:text-white active:scale-90"
                title="Add to cart"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {filteredColors.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg">No shades found. Try a different search.</p>
          </div>
        )}
      </div>

      {/* Color Detail Modal */}
      {selectedColor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedColor(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Full Color Preview */}
            <div
              className="h-48 w-full relative"
              style={{ backgroundColor: selectedColor.hex }}
            >
              <button
                onClick={() => setSelectedColor(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Details */}
            <div className="p-6">
              <div className="font-mono text-xs text-slate-500 mb-1">
                BS 4800
              </div>
              <div className="font-mono text-lg font-semibold text-[#0A1B3D] mb-1">
                {selectedColor.code}
              </div>
              <h3 className="font-display font-bold text-xl text-slate-800 mb-4">
                {selectedColor.name}
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="text-xs text-slate-500 mb-1">HEX</div>
                  <div className="font-mono text-sm font-semibold text-slate-800">
                    {selectedColor.hex.toUpperCase()}
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="text-xs text-slate-500 mb-1">RGB</div>
                  <div className="font-mono text-sm font-semibold text-slate-800">
                    {selectedColor.r}, {selectedColor.g}, {selectedColor.b}
                  </div>
                </div>
              </div>
              <div className="text-sm text-slate-600 mb-6">
                <span className="font-medium">Family:</span> {selectedColor.family}
              </div>
              <button
                onClick={() => {
                  handleAddToCart(selectedColor);
                  setSelectedColor(null);
                }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] hover:shadow-[0_8px_24px_rgba(37,99,235,0.3)]"
              >
                <Plus className="w-5 h-5" />
                Add Color to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
