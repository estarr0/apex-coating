import { useState, useMemo } from "react";
import { PRODUCTS, PRODUCT_CATEGORIES, formatKES, isNoColorProduct } from "@/lib/products";
import { BS4800_COLORS, BSColor } from "@/lib/bs4800";
import { useCart } from "@/contexts/CartContext";
import { Plus, Check, Package, Tag, Droplets, FlaskConical, Calculator, X, Square } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function ProductCatalog() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedColors, setSelectedColors] = useState<Record<string, BSColor>>({});
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [shadePickerOpen, setShadePickerOpen] = useState<string | null>(null);
  const [shadeSearch, setShadeSearch] = useState("");
  const [calcProduct, setCalcProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const { addItem } = useCart();

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const getColorForProduct = (productId: string): BSColor => {
    if (selectedColors[productId]) return selectedColors[productId];
    const product = PRODUCTS.find((p) => p.id === productId);
    const defaultColor = BS4800_COLORS.find((c) => c.code === product?.defaultColor);
    return defaultColor || BS4800_COLORS[0];
  };

  const getSizeForProduct = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId)!;
    const sizeLabel = selectedSizes[productId] || product.sizes[0].label;
    return product.sizes.find((s) => s.label === sizeLabel) || product.sizes[0];
  };

  const filteredShades = useMemo(() => {
    const q = shadeSearch.toLowerCase().trim();
    if (!q) return BS4800_COLORS;
    return BS4800_COLORS.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.family.toLowerCase().includes(q)
    );
  }, [shadeSearch]);

  const handleAddToCart = (product: typeof PRODUCTS[0], color: BSColor, size: typeof PRODUCTS[0]["sizes"][0]) => {
    addItem({
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      sizeLabel: size.label,
      sizeVolume: size.volume,
      price: size.price,
      bsCode: color.code,
      colorName: color.name,
      colorHex: color.hex,
      finishType: product.name,
    });
  };

  const DEFAULT_COLOR: BSColor = { code: "—", name: "Standard", hex: "#8B7355", r: 139, g: 115, b: 85, family: "Browns" };

  // Dark mode tokens
  const sectionBg = isDark ? "bg-slate-900" : "bg-slate-50";
  const sectionText = isDark ? "text-slate-100" : "text-[#0A1B3D]";
  const subText = isDark ? "text-slate-400" : "text-slate-500";
  const tabBg = isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200";
  const tabActive = isDark ? "bg-blue-600 text-white" : "bg-[#0A1B3D] text-white";
  const tabInactive = isDark ? "text-slate-300 hover:bg-slate-700" : "text-slate-600 hover:bg-slate-50";
  const cardBg = isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100";
  const cardTitle = isDark ? "text-white" : "text-[#0A1B3D]";
  const priceColor = isDark ? "text-white" : "text-[#0A1B3D]";
  const descColor = isDark ? "text-slate-400" : "text-slate-500";
  const sizeActive = isDark ? "bg-blue-600 text-white" : "bg-[#0A1B3D] text-white";
  const sizeInactive = isDark ? "bg-slate-700 text-slate-300 hover:bg-slate-600" : "bg-slate-100 text-slate-600 hover:bg-slate-200";
  const shadeBtnBg = isDark ? "bg-slate-700 border-slate-600 hover:border-blue-500" : "bg-white border-slate-200 hover:border-[#0A1B3D]";
  const modalBg = isDark ? "bg-slate-800" : "bg-white";
  const modalHeader = isDark ? "bg-slate-900 border-slate-700" : "bg-[#0A1B3D]";
  const inputBg = isDark ? "bg-slate-700 border-slate-600 text-slate-200 placeholder:text-slate-500 focus:border-blue-500" : "bg-white border-slate-200 text-slate-700 focus:border-[#0A1B3D]";

  return (
    <section id="products" className={`py-20 lg:py-28 ${sectionBg} transition-colors duration-500`}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-4 ${isDark ? "bg-blue-500/10 border-blue-400/20" : "bg-[#0A1B3D]/5 border-[#0A1B3D]/10"}`}>
            <Package className={`w-3.5 h-3.5 ${isDark ? "text-blue-400" : "text-[#0A1B3D]"}`} />
            <span className={`text-xs font-mono tracking-wider uppercase ${isDark ? "text-blue-400" : "text-[#0A1B3D]"}`}>
              Product Catalog
            </span>
          </div>
          <h2 className={`font-display font-bold text-3xl md:text-4xl lg:text-5xl ${sectionText} mb-4 transition-colors`}>
            Complete Price List
          </h2>
          <p className={`${subText} max-w-2xl mx-auto text-base`}>
            42+ products across 5 categories. Hardcoded pricing effective July 2026. Select your size, choose your BS 4800 shade where available, and add to cart.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-10">
          <div className={`flex overflow-x-auto gap-1 p-1 rounded-xl border shadow-sm ${tabBg}`}>
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeCategory === cat ? tabActive : tabInactive
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const noColor = isNoColorProduct(product);
            const color = noColor ? DEFAULT_COLOR : getColorForProduct(product.id);
            const size = getSizeForProduct(product.id);

            return (
              <div
                key={product.id}
                className={`group rounded-2xl overflow-hidden swatch-shadow hover:swatch-shadow-lg transition-all duration-300 border ${cardBg}`}
              >
                {/* Product Image */}
                <div className={`relative aspect-[4/3] overflow-hidden ${isDark ? "bg-gradient-to-br from-slate-700 to-slate-800" : "bg-gradient-to-br from-slate-50 to-slate-100"}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  {product.badge && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0A1B3D] text-white text-[10px] font-bold uppercase tracking-wider">
                      {product.badge}
                    </div>
                  )}
                  {!noColor && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm shadow-sm">
                      <div className="w-3 h-3 rounded-full border border-slate-200" style={{ backgroundColor: color.hex }} />
                      <span className="font-mono text-[10px] text-slate-600">{color.code}</span>
                    </div>
                  )}
                  {noColor && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 backdrop-blur-sm shadow-sm border border-amber-200">
                      <FlaskConical className="w-3 h-3 text-amber-600" />
                      <span className="font-mono text-[10px] text-amber-700 font-semibold">Chemical</span>
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-[#0A1B3D] text-white">
                    <span className="font-display font-bold text-sm">{formatKES(size.price)}</span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className={`flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider mb-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    <Tag className="w-3 h-3" />
                    {product.subcategory}
                  </div>
                  <h3 className={`font-display font-bold text-base ${cardTitle} mb-1.5`}>{product.name}</h3>
                  <p className={`text-xs mb-3 line-clamp-2 leading-relaxed ${descColor}`}>{product.description}</p>

                  {/* Size Selector */}
                  <div className="mb-3">
                    <label className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 block ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                      Container Size
                    </label>
                    <div className={`grid ${product.sizes.length <= 3 ? "grid-cols-3" : product.sizes.length <= 5 ? "grid-cols-4" : "grid-cols-5"} gap-1.5`}>
                      {product.sizes.map((s) => (
                        <button
                          key={s.label}
                          onClick={() => setSelectedSizes((prev) => ({ ...prev, [product.id]: s.label }))}
                          className={`py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                            size.label === s.label ? sizeActive : sizeInactive
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Coverage Calculator Button */}
                  <button
                    onClick={() => setCalcProduct(product)}
                    className={`w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all mb-3 ${isDark ? "border-slate-600 text-slate-400 hover:border-blue-500 hover:text-blue-400" : "border-slate-200 text-slate-500 hover:border-[#0A1B3D] hover:text-[#0A1B3D]"}`}
                  >
                    <Calculator className="w-3 h-3" />
                    Coverage Calculator
                  </button>

                  {/* Choose Shade Button — ONLY for non-chemical products */}
                  {!noColor && (
                    <div className="mb-4">
                      <label className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 block ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                        BS 4800 Shade
                      </label>
                      <button
                        onClick={() => setShadePickerOpen(product.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border-2 transition-all duration-200 ${shadeBtnBg} group/btn`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-5 h-5 rounded-md border border-slate-200 shadow-sm" style={{ backgroundColor: color.hex }} />
                          <div className="text-left">
                            <span className={`font-mono text-xs font-semibold ${isDark ? "text-slate-200" : "text-slate-700"}`}>{color.code}</span>
                            <span className={`text-[10px] ml-1.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>{color.name}</span>
                          </div>
                        </div>
                        <span className={`text-xs font-medium ${isDark ? "text-blue-400 group-hover/btn:text-blue-300" : "text-blue-600 group-hover/btn:text-[#0A1B3D]"} transition-colors`}>
                          Choose Shade →
                        </span>
                      </button>
                    </div>
                  )}

                  {/* Chemical product info */}
                  {noColor && (
                    <div className={`mb-4 p-3 rounded-xl border ${isDark ? "bg-amber-900/20 border-amber-800/30" : "bg-amber-50/50 border-amber-100"}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <FlaskConical className="w-3.5 h-3.5 text-amber-600" />
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-amber-400" : "text-amber-700"}`}>
                          Chemical Product
                        </span>
                      </div>
                      <p className={`text-[11px] leading-relaxed ${isDark ? "text-amber-400/70" : "text-amber-600/80"}`}>
                        Standard formulation — no color selection required. Select container size above.
                      </p>
                    </div>
                  )}

                  {/* Price + Add to Cart */}
                  <div className={`flex items-center justify-between gap-3 pt-3 border-t ${isDark ? "border-slate-700" : "border-slate-100"}`}>
                    <div>
                      <div className={`text-[10px] uppercase ${isDark ? "text-slate-500" : "text-slate-400"}`}>Unit Price</div>
                      <div className={`font-display font-bold text-xl ${priceColor}`}>{formatKES(size.price)}</div>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product, color, size)}
                      className="flex items-center gap-1.5 px-5 py-2.5 bg-[#0A1B3D] hover:bg-[#15294f] text-white text-sm font-semibold rounded-xl transition-all duration-200 active:scale-95 hover:shadow-[0_6px_16px_rgba(10,27,61,0.3)]"
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className={`${subText} text-lg`}>No products in this category.</p>
          </div>
        )}
      </div>

      {/* Coverage Calculator Modal */}
      {calcProduct && (
        <CoverageCalculatorModal
          product={calcProduct}
          onClose={() => setCalcProduct(null)}
        />
      )}

      {/* Spacious Shade Picker Modal (Path B) */}
      {shadePickerOpen && !isNoColorProduct(PRODUCTS.find(p => p.id === shadePickerOpen)!) && (() => {
        const activeProduct = PRODUCTS.find(p => p.id === shadePickerOpen)!;
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => { setShadePickerOpen(null); setShadeSearch(""); }}
          >
            <div
              className={`rounded-2xl w-full max-w-2xl shadow-2xl animate-fade-up overflow-hidden flex flex-col ${modalBg}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`p-5 border-b flex-shrink-0 ${modalHeader}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                      <Droplets className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-white">Choose Shade</h3>
                      <p className="text-xs text-blue-200">for {activeProduct.name} — {getSizeForProduct(shadePickerOpen).label}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setShadePickerOpen(null); setShadeSearch(""); }}
                    className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className={`p-4 border-b flex-shrink-0 ${isDark ? "bg-slate-700 border-slate-600" : "bg-slate-50 border-slate-100"}`}>
                <input
                  type="text"
                  value={shadeSearch}
                  onChange={(e) => setShadeSearch(e.target.value)}
                  placeholder="Search by BS code (e.g. 10 B 17) or name (e.g. Mistletoe, Sky Blue)..."
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none text-sm ${inputBg}`}
                  autoFocus
                />
                <div className="flex items-center justify-between mt-1.5 px-1">
                  <span className={`text-[10px] font-mono ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    {filteredShades.length} shades available
                  </span>
                </div>
              </div>

              <div className="overflow-y-auto flex-1 p-4" style={{ maxHeight: "380px" }}>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                  {filteredShades.map((c) => {
                    const isSelected = selectedColors[shadePickerOpen!]?.code === c.code;
                    return (
                      <button
                        key={c.code}
                        onClick={() => {
                          setSelectedColors((prev) => ({ ...prev, [shadePickerOpen!]: c }));
                          setShadePickerOpen(null);
                          setShadeSearch("");
                        }}
                        className={`group relative rounded-lg overflow-hidden border-2 transition-all duration-200 hover:shadow-md ${
                          isSelected ? "border-[#0A1B3D] ring-2 ring-blue-200" : isDark ? "border-slate-600 hover:border-blue-500" : "border-slate-100 hover:border-slate-300"
                        }`}
                      >
                        <div className="h-12 w-full transition-transform group-hover:scale-105" style={{ backgroundColor: c.hex }} />
                        <div className="p-1 text-left">
                          <div className={`font-mono text-[9px] font-semibold ${isDark ? "text-slate-400" : "text-slate-600"} leading-none`}>{c.code}</div>
                          <div className={`text-[9px] truncate leading-tight mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>{c.name}</div>
                        </div>
                        {isSelected && (
                          <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#0A1B3D] flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {filteredShades.length === 0 && (
                <div className="p-8 text-center">
                  <p className={`${isDark ? "text-slate-500" : "text-slate-400"} text-sm`}>No shades match your search.</p>
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </section>
  );
}

/* Coverage Calculator Modal */
function CoverageCalculatorModal({ product, onClose }: { product: typeof PRODUCTS[0]; onClose: () => void }) {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [coats, setCoats] = useState(2);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const coveragePerLiter = 12; // m² per liter (standard emulsion coverage)
  const w = parseFloat(width) || 0;
  const h = parseFloat(height) || 0;
  const totalArea = w * h;
  const totalLitersNeeded = Math.ceil((totalArea * coats) / coveragePerLiter);

  // Find the best size to recommend (smallest size >= totalLitersNeeded, or largest available)
  const bestSize = [...product.sizes].sort((a, b) => a.price - b.price).find(s => {
    const vol = parseFloat(s.label);
    return !isNaN(vol) && vol >= totalLitersNeeded;
  }) || product.sizes[product.sizes.length - 1];
  const bestVol = parseFloat(bestSize.label) || 1;
  // Price per liter from the selected size
  const pricePerLiter = bestSize.price / bestVol;
  const totalCost = totalLitersNeeded * pricePerLiter;

  const modalBg = isDark ? "bg-slate-800" : "bg-white";
  const titleColor = isDark ? "text-white" : "text-[#0A1B3D]";
  const labelColor = isDark ? "text-slate-400" : "text-slate-400";
  const inputBg = isDark ? "bg-slate-700 border-slate-600 text-slate-200 placeholder:text-slate-500 focus:border-blue-500" : "bg-white border-slate-200 text-slate-700 focus:border-[#0A1B3D]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className={`${modalBg} rounded-2xl w-full max-w-md shadow-2xl animate-fade-up overflow-hidden`} onClick={(e) => e.stopPropagation()}>
        <div className={`p-5 border-b ${isDark ? "bg-slate-900 border-slate-700" : "bg-[#0A1B3D]"}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                <Calculator className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white">Coverage Calculator</h3>
                <p className="text-xs text-blue-200">for {product.name}</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 block ${labelColor}`}>Room Width (m)</label>
              <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="5.0" className={`w-full px-3 py-2.5 rounded-xl border outline-none text-sm ${inputBg}`} />
            </div>
            <div>
              <label className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 block ${labelColor}`}>Room Height (m)</label>
              <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="3.0" className={`w-full px-3 py-2.5 rounded-xl border outline-none text-sm ${inputBg}`} />
            </div>
          </div>
          <div>
            <label className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 block ${labelColor}`}>Number of Coats</label>
            <div className="flex gap-2">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  onClick={() => setCoats(n)}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${coats === n ? "bg-[#0A1B3D] text-white" : isDark ? "bg-slate-700 text-slate-300 hover:bg-slate-600" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                >
                  {n} Coat{n > 1 ? "s" : ""}
                </button>
              ))}
            </div>
          </div>

          {totalArea > 0 && (
            <div className={`rounded-xl p-4 border ${isDark ? "bg-blue-900/20 border-blue-800/30" : "bg-blue-50 border-blue-100"}`}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className={`text-[9px] font-mono uppercase tracking-wider mb-1 ${isDark ? "text-blue-400" : "text-blue-600"}`}>Wall Area</div>
                  <div className={`font-display font-bold text-lg ${titleColor}`}>{totalArea.toFixed(1)} m²</div>
                </div>
                <div>
                  <div className={`text-[9px] font-mono uppercase tracking-wider mb-1 ${isDark ? "text-blue-400" : "text-blue-600"}`}>Paint Needed</div>
                  <div className={`font-display font-bold text-lg ${titleColor}`}>{totalLitersNeeded}L</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-blue-200/30">
                <div className={`text-[9px] font-mono uppercase tracking-wider mb-1 ${isDark ? "text-blue-400" : "text-blue-600"}`}>Estimated Cost</div>
                <div className={`font-display font-bold text-2xl text-[#0A1B3D]`}>{formatKES(Math.ceil(totalCost))}</div>
                <div className={`text-[10px] mt-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>Based on {product.sizes[0].label} at {formatKES(product.sizes[0].price)}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
