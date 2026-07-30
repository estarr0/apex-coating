import { useState, useMemo } from "react";
import { Search, X, Hash, ShoppingCart, Plus } from "lucide-react";
import { BS4800_COLORS, SHADE_FAMILIES, BSColor } from "@/lib/bs4800";
import OrderThisShadeModal from "./OrderThisShadeModal";

interface ShadeCardProps {
  externalSearch?: string;
}

export default function ShadeCard({ externalSearch = "" }: ShadeCardProps) {
  const [search, setSearch] = useState("");
  const [activeFamily, setActiveFamily] = useState("All");
  const [selectedColor, setSelectedColor] = useState<BSColor | null>(null);
  const [orderShade, setOrderShade] = useState<BSColor | null>(null);

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
          c.name.toLowerCase().includes(q) ||
          c.family.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeFamily, effectiveSearch]);

  return (
    <section id="shade-card" className="py-20 lg:py-28 bg-white relative">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1B3D]/5 border border-[#0A1B3D]/10 mb-4">
            <Hash className="w-3 h-3 text-[#0A1B3D]" />
            <span className="font-mono text-[10px] text-[#0A1B3D] tracking-widest uppercase">
              BS 4800 Standard Collection
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[#0A1B3D] mb-4">
            The Complete Shade Card
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-base">
            Explore {BS4800_COLORS.length} British Standard colors. Search by BS code or color name, filter by family, and order any shade with your preferred finish.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 space-y-4">
          <div className="max-w-lg mx-auto">
            <div className="flex items-center rounded-xl overflow-hidden border border-slate-200 bg-white swatch-shadow focus-within:border-[#0A1B3D] transition-colors">
              <Search className="w-4 h-4 text-slate-400 ml-4" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by BS code (e.g. 10 B 17) or name (e.g. Mistletoe, Sky Blue)..."
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
          <div className="flex flex-wrap justify-center gap-1.5">
            {SHADE_FAMILIES.map((family) => (
              <button
                key={family}
                onClick={() => setActiveFamily(family)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  activeFamily === family
                    ? "bg-[#0A1B3D] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {family}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="font-mono text-xs text-slate-400">
            {filteredColors.length} shades
          </span>
          {activeFamily !== "All" && (
            <>
              <span className="text-slate-300">|</span>
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">{activeFamily}</span>
            </>
          )}
        </div>

        {/* Swatch Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 md:gap-3">
          {filteredColors.map((color) => (
            <div
              key={color.code}
              className="group relative bg-white rounded-lg overflow-hidden swatch-shadow hover:swatch-shadow-lg transition-all duration-200 cursor-pointer border border-slate-100"
              onClick={() => setSelectedColor(color)}
            >
              {/* Color Swatch */}
              <div
                className="h-20 md:h-24 w-full transition-transform duration-200 group-hover:scale-105"
                style={{ backgroundColor: color.hex }}
              />
              {/* Info */}
              <div className="p-2">
                <div className="font-mono text-[9px] text-slate-400 mb-0.5">
                  {color.code}
                </div>
                <div className="text-[11px] font-medium text-slate-700 truncate">
                  {color.name}
                </div>
              </div>
              {/* Order Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOrderShade(color);
                }}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-[#0A1B3D] hover:text-white active:scale-90 shadow-sm"
                title="Order this shade"
              >
                <ShoppingCart className="w-3 h-3" />
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
      {selectedColor && !orderShade && (
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
              className="h-44 w-full relative"
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
              <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">
                BS 4800
              </div>
              <div className="font-mono text-lg font-semibold text-[#0A1B3D] mb-1">
                {selectedColor.code}
              </div>
              <h3 className="font-display font-bold text-xl text-slate-800 mb-4">
                {selectedColor.name}
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                  <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-1">HEX</div>
                  <div className="font-mono text-sm font-semibold text-slate-800">
                    {selectedColor.hex.toUpperCase()}
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                  <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-1">RGB</div>
                  <div className="font-mono text-sm font-semibold text-slate-800">
                    {selectedColor.r}, {selectedColor.g}, {selectedColor.b}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Family:</span>
                <span className="text-xs font-medium text-slate-600">{selectedColor.family}</span>
              </div>
              <button
                onClick={() => {
                  setOrderShade(selectedColor);
                  setSelectedColor(null);
                }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#0A1B3D] hover:bg-[#15294f] text-white font-semibold rounded-xl transition-all duration-200 active:scale-[0.98]"
              >
                <ShoppingCart className="w-4 h-4" />
                Order This Shade
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order This Shade Modal (Path A) */}
      {orderShade && (
        <OrderThisShadeModal
          color={orderShade}
          onClose={() => setOrderShade(null)}
          source="shade-card"
        />
      )}
    </section>
  );
}
