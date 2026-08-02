import { useState, useMemo } from "react";
import { Search, X, Hash, ShoppingCart, Star } from "lucide-react";
import { BS4800_COLORS, SHADE_FAMILIES, BSColor } from "@/lib/bs4800";
import OrderThisShadeModal from "./OrderThisShadeModal";
import { useTheme } from "@/contexts/ThemeContext";

interface ShadeCardProps {
  externalSearch?: string;
}

export default function ShadeCard({ externalSearch = "" }: ShadeCardProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [search, setSearch] = useState("");
  const [activeFamily, setActiveFamily] = useState("All");
  const [selectedColor, setSelectedColor] = useState<BSColor | null>(null);
  const [orderShade, setOrderShade] = useState<BSColor | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

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

  const toggleFavorite = (code: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  };

  const sectionBg = isDark ? "bg-slate-900" : "bg-white";
  const sectionText = isDark ? "text-slate-100" : "text-[#0A1B3D]";
  const subText = isDark ? "text-slate-400" : "text-slate-500";
  const badgeBg = isDark ? "bg-blue-500/10 border-blue-400/20" : "bg-[#0A1B3D]/5 border-[#0A1B3D]/10";
  const badgeText = isDark ? "text-blue-400" : "text-[#0A1B3D]";
  const pillActive = isDark ? "bg-blue-600 text-white" : "bg-[#0A1B3D] text-white";
  const pillInactive = isDark ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200";
  const swatchBorder = isDark ? "border-slate-600 hover:border-blue-500" : "border-slate-100 hover:border-[#0A1B3D]";
  const swatchBg = isDark ? "bg-slate-800" : "bg-white";
  const codeColor = isDark ? "text-slate-500" : "text-slate-400";
  const nameColor = isDark ? "text-slate-300" : "text-slate-700";
  const inputBorder = isDark ? "border-slate-600 bg-slate-800 text-slate-200 placeholder:text-slate-500 focus:border-blue-500" : "border-slate-200 bg-white text-slate-700 focus:border-[#0A1B3D]";
  const modalBg = isDark ? "bg-slate-800" : "bg-white";

  return (
    <section id="shade-card" className={`py-20 lg:py-28 ${sectionBg} relative transition-colors duration-500`}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-10">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-4 ${badgeBg}`}>
            <Hash className={`w-3 h-3 ${badgeText}`} />
            <span className={`font-mono text-[10px] tracking-widest uppercase ${badgeText}`}>
              BS 4800 Standard Collection
            </span>
          </div>
          <h2 className={`font-display font-bold text-3xl md:text-4xl lg:text-5xl ${sectionText} mb-4 transition-colors`}>
            The Complete Shade Card
          </h2>
          <p className={`${subText} max-w-2xl mx-auto text-base`}>
            Explore {BS4800_COLORS.length} British Standard colors. Search by BS code or color name, filter by family, and order any shade with your preferred finish.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 space-y-4">
          <div className="max-w-lg mx-auto">
            <div className={`flex items-center rounded-xl overflow-hidden border swatch-shadow focus-within:border-[#0A1B3D] transition-colors ${inputBorder}`}>
              <Search className={`w-4 h-4 ml-4 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by BS code (e.g. 10 B 17) or name (e.g. Mistletoe, Sky Blue)..."
                className={`flex-1 px-3 py-3 text-sm bg-transparent outline-none ${isDark ? "text-slate-200 placeholder:text-slate-500" : "text-slate-700 placeholder:text-slate-400"}`}
              />
              {search && (
                <button onClick={() => setSearch("")} className={`px-3 ${isDark ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600"}`}>
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
                  activeFamily === family ? pillActive : pillInactive
                }`}
              >
                {family}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className={`font-mono text-xs ${codeColor}`}>{filteredColors.length} shades</span>
          {activeFamily !== "All" && (
            <>
              <span className="text-slate-300">|</span>
              <span className={`font-mono text-[10px] uppercase tracking-wider ${codeColor}`}>{activeFamily}</span>
            </>
          )}
        </div>

        {/* Swatch Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 md:gap-3">
          {filteredColors.map((color) => {
            const isFav = favorites.has(color.code);
            return (
              <div
                key={color.code}
                className={`group relative rounded-lg overflow-hidden swatch-shadow hover:swatch-shadow-lg transition-all duration-200 cursor-pointer border ${swatchBorder} ${swatchBg}`}
                onClick={() => setSelectedColor(color)}
              >
                {/* Color Swatch */}
                <div
                  className="h-20 md:h-24 w-full transition-transform duration-200 group-hover:scale-105"
                  style={{ backgroundColor: color.hex }}
                />
                {/* Info */}
                <div className="p-2">
                  <div className={`font-mono text-[9px] mb-0.5 ${codeColor}`}>{color.code}</div>
                  <div className={`text-[11px] font-medium truncate ${nameColor}`}>{color.name}</div>
                </div>
                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(color.code);
                  }}
                  className={`absolute top-1.5 left-1.5 w-6 h-6 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-200 active:scale-90 ${
                    isFav
                      ? "bg-amber-400/90 text-amber-900 shadow-sm"
                      : "bg-white/90 text-slate-300 opacity-0 group-hover:opacity-100 hover:text-amber-500"
                  }`}
                  title={isFav ? "Remove from favorites" : "Add to favorites"}
                >
                  <Star className={`w-3 h-3 ${isFav ? "fill-current" : ""}`} />
                </button>
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
            );
          })}
        </div>

        {filteredColors.length === 0 && (
          <div className="text-center py-16">
            <p className={`${subText} text-lg`}>No shades found. Try a different search.</p>
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
            className={`rounded-2xl max-w-md w-full overflow-hidden shadow-2xl animate-fade-up ${modalBg}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-44 w-full relative" style={{ backgroundColor: selectedColor.hex }}>
              <button
                onClick={() => setSelectedColor(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className={`font-mono text-[10px] uppercase tracking-wider mb-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>BS 4800</div>
              <div className={`font-mono text-lg font-semibold ${isDark ? "text-slate-200" : "text-[#0A1B3D]"} mb-1`}>{selectedColor.code}</div>
              <h3 className={`font-display font-bold text-xl mb-4 ${isDark ? "text-white" : "text-slate-800"}`}>{selectedColor.name}</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className={`rounded-lg p-3 border ${isDark ? "bg-slate-700 border-slate-600" : "bg-slate-50 border-slate-100"}`}>
                  <div className={`text-[9px] font-mono uppercase tracking-wider mb-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>HEX</div>
                  <div className={`font-mono text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>{selectedColor.hex.toUpperCase()}</div>
                </div>
                <div className={`rounded-lg p-3 border ${isDark ? "bg-slate-700 border-slate-600" : "bg-slate-50 border-slate-100"}`}>
                  <div className={`text-[9px] font-mono uppercase tracking-wider mb-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>RGB</div>
                  <div className={`font-mono text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>{selectedColor.r}, {selectedColor.g}, {selectedColor.b}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <span className={`text-[9px] font-mono uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-400"}`}>Family:</span>
                <span className={`text-xs font-medium ${isDark ? "text-slate-300" : "text-slate-600"}`}>{selectedColor.family}</span>
              </div>
              <button
                onClick={() => { setOrderShade(selectedColor); setSelectedColor(null); }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#0A1B3D] hover:bg-[#15294f] text-white font-semibold rounded-xl transition-all duration-200 active:scale-[0.98]"
              >
                <ShoppingCart className="w-4 h-4" />
                Order This Shade
              </button>
            </div>
          </div>
        </div>
      )}

      {orderShade && (
        <OrderThisShadeModal color={orderShade} onClose={() => setOrderShade(null)} source="shade-card" />
      )}
    </section>
  );
}
