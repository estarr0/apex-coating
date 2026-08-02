import { useState, useMemo } from "react";
import { PRODUCTS, PRODUCT_CATEGORIES, formatKES, isNoColorProduct } from "@/lib/products";
import { BS4800_COLORS, BSColor } from "@/lib/bs4800";
import { useCart } from "@/contexts/CartContext";
import { Plus, Check, Package, Tag, Droplets, FlaskConical } from "lucide-react";

export default function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedColors, setSelectedColors] = useState<Record<string, BSColor>>({});
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [shadePickerOpen, setShadePickerOpen] = useState<string | null>(null);
  const [shadeSearch, setShadeSearch] = useState("");
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

  // For chemical products: default color (no user selection needed)
  const DEFAULT_COLOR: BSColor = { code: "—", name: "Standard", hex: "#8B7355", r: 139, g: 115, b: 85, family: "Browns" };

  return (
    <section id="products" className="py-20 lg:py-28 bg-slate-50">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1B3D]/5 border border-[#0A1B3D]/10 mb-4">
            <Package className="w-3.5 h-3.5 text-[#0A1B3D]" />
            <span className="text-xs font-mono text-[#0A1B3D] tracking-wider uppercase">
              Product Catalog
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[#0A1B3D] mb-4">
            Complete Price List
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-base">
            42+ products across 5 categories. Hardcoded pricing effective July 2026. Select your size, choose your BS 4800 shade, and add to cart.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-10">
          <div className="flex overflow-x-auto gap-1 p-1 bg-white rounded-xl border border-slate-200 shadow-sm">
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-[#0A1B3D] text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-50"
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
                className="group bg-white rounded-2xl overflow-hidden swatch-shadow hover:swatch-shadow-lg transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
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
                  {/* Color indicator — only for non-chemical products */}
                  {!noColor && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm shadow-sm">
                      <div
                        className="w-3 h-3 rounded-full border border-slate-200"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="font-mono text-[10px] text-slate-600">
                        {color.code}
                      </span>
                    </div>
                  )}
                  {/* Chemical product badge */}
                  {noColor && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 backdrop-blur-sm shadow-sm border border-amber-200">
                      <FlaskConical className="w-3 h-3 text-amber-600" />
                      <span className="font-mono text-[10px] text-amber-700 font-semibold">
                        Chemical
                      </span>
                    </div>
                  )}
                  {/* Price badge */}
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-[#0A1B3D] text-white">
                    <span className="font-display font-bold text-sm">{formatKES(size.price)}</span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                    <Tag className="w-3 h-3" />
                    {product.subcategory}
                  </div>
                  <h3 className="font-display font-bold text-base text-[#0A1B3D] mb-1.5">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 mb-3 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Size Selector — always shown */}
                  <div className="mb-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">
                      Container Size
                    </label>
                    <div className={`grid ${product.sizes.length <= 3 ? "grid-cols-3" : product.sizes.length <= 5 ? "grid-cols-4" : "grid-cols-5"} gap-1.5`}>
                      {product.sizes.map((s) => (
                        <button
                          key={s.label}
                          onClick={() =>
                            setSelectedSizes((prev) => ({ ...prev, [product.id]: s.label }))
                          }
                          className={`py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                            size.label === s.label
                              ? "bg-[#0A1B3D] text-white"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Choose Shade Button (Path B) — ONLY for non-chemical products */}
                  {!noColor && (
                    <div className="mb-4">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">
                        BS 4800 Shade
                      </label>
                      <button
                        onClick={() => setShadePickerOpen(product.id)}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border-2 border-slate-200 hover:border-[#0A1B3D] transition-all duration-200 bg-white group/btn"
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-5 h-5 rounded-md border border-slate-200 shadow-sm"
                            style={{ backgroundColor: color.hex }}
                          />
                          <div className="text-left">
                            <span className="font-mono text-xs font-semibold text-slate-700">
                              {color.code}
                            </span>
                            <span className="text-[10px] text-slate-400 ml-1.5">{color.name}</span>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-blue-600 group-hover/btn:text-[#0A1B3D] transition-colors">
                          Choose Shade →
                        </span>
                      </button>
                    </div>
                  )}

                  {/* Chemical product info — no shade selection */}
                  {noColor && (
                    <div className="mb-4 p-3 rounded-xl bg-amber-50/50 border border-amber-100">
                      <div className="flex items-center gap-2 mb-1">
                        <FlaskConical className="w-3.5 h-3.5 text-amber-600" />
                        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                          Chemical Product
                        </span>
                      </div>
                      <p className="text-[11px] text-amber-600/80 leading-relaxed">
                        Standard formulation — no color selection required. Select container size above.
                      </p>
                    </div>
                  )}

                  {/* Price + Add to Cart */}
                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Unit Price</div>
                      <div className="font-display font-bold text-xl text-[#0A1B3D]">
                        {formatKES(size.price)}
                      </div>
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
            <p className="text-slate-400 text-lg">No products in this category.</p>
          </div>
        )}
      </div>

      {/* Spacious Shade Picker Modal (Path B) — only for non-chemical products */}
      {shadePickerOpen && !isNoColorProduct(PRODUCTS.find(p => p.id === shadePickerOpen)!) && (() => {
        const activeProduct = PRODUCTS.find(p => p.id === shadePickerOpen)!;
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShadePickerOpen(null)}
          >
            <div
              className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-fade-up overflow-hidden flex flex-col"
              style={{ maxHeight: "70vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-slate-100 bg-[#0A1B3D] flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                      <Droplets className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-white">
                        Choose Shade
                      </h3>
                      <p className="text-xs text-blue-200">
                        for {activeProduct.name} — {getSizeForProduct(shadePickerOpen).label}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShadePickerOpen(null)}
                    className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70 transition-colors"
                  >
                    <Check className="w-5 h-5 rotate-45" />
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="p-4 border-b border-slate-100 bg-slate-50 flex-shrink-0">
                <input
                  type="text"
                  value={shadeSearch}
                  onChange={(e) => setShadeSearch(e.target.value)}
                  placeholder="Search by BS code (e.g. 10 B 17) or name (e.g. Mistletoe, Sky Blue)..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#0A1B3D] text-sm text-slate-700 bg-white"
                  autoFocus
                />
                <div className="flex items-center justify-between mt-1.5 px-1">
                  <span className="text-[10px] font-mono text-slate-400">
                    {filteredShades.length} shades available
                  </span>
                </div>
              </div>

              {/* Shade Grid */}
              <div className="overflow-y-auto flex-1 p-4" style={{ maxHeight: "380px" }}>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                  {filteredShades.map((c) => {
                    const isSelected = selectedColors[shadePickerOpen!]?.code === c.code;
                    return (
                      <button
                        key={c.code}
                        onClick={() => {
                          setSelectedColors((prev) => ({
                            ...prev,
                            [shadePickerOpen!]: c,
                          }));
                          setShadePickerOpen(null);
                          setShadeSearch("");
                        }}
                        className={`group relative rounded-lg overflow-hidden border-2 transition-all duration-200 hover:shadow-md ${
                          isSelected
                            ? "border-[#0A1B3D] ring-2 ring-blue-200"
                            : "border-slate-100 hover:border-slate-300"
                        }`}
                      >
                        <div
                          className="h-12 w-full transition-transform group-hover:scale-105"
                          style={{ backgroundColor: c.hex }}
                        />
                        <div className="p-1 text-left">
                          <div className="font-mono text-[9px] font-semibold text-slate-600 leading-none">{c.code}</div>
                          <div className="text-[9px] text-slate-400 truncate leading-tight mt-0.5">{c.name}</div>
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
                  <p className="text-slate-400 text-sm">No shades match your search.</p>
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </section>
  );
}
