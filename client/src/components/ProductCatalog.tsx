import { useState, useMemo } from "react";
import { PRODUCTS, PRODUCT_CATEGORIES, formatKES } from "@/lib/products";
import { BS4800_COLORS, BSColor } from "@/lib/bs4800";
import { useCart } from "@/contexts/CartContext";
import { Plus, Check, ChevronDown } from "lucide-react";

export default function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedColors, setSelectedColors] = useState<Record<string, BSColor>>({});
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [colorPickers, setColorPickers] = useState<Record<string, boolean>>({});
  const [colorSearch, setColorSearch] = useState("");
  const { addItem } = useCart();

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const getColorForProduct = (productId: string): BSColor => {
    if (selectedColors[productId]) return selectedColors[productId];
    const defaultColor = BS4800_COLORS.find((c) => c.code === PRODUCTS.find((p) => p.id === productId)?.defaultColor);
    return defaultColor || BS4800_COLORS[0];
  };

  const getSizeForProduct = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId)!;
    const sizeLabel = selectedSizes[productId] || product.sizes[1].label;
    return product.sizes.find((s) => s.label === sizeLabel) || product.sizes[1];
  };

  const filteredColors = BS4800_COLORS.filter((c) => {
    if (!colorSearch.trim()) return true;
    const q = colorSearch.toLowerCase().trim();
    return c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q);
  });

  return (
    <section id="products" className="py-20 lg:py-28 bg-slate-50">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
            <span className="text-xs font-mono text-blue-600 tracking-wider uppercase">
              Product Catalog
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[#0A1B3D] mb-4">
            Premium Coatings for Every Surface
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            From exterior weather shields to industrial primers. Select your size, choose your BS 4800 shade, and add to cart.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 active:scale-95 ${
                activeCategory === cat
                  ? "bg-[#0A1B3D] text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const color = getColorForProduct(product.id);
            const size = getSizeForProduct(product.id);

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden swatch-shadow hover:swatch-shadow-lg transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative aspect-[3/4] bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0A1B3D] text-white text-xs font-semibold">
                      {product.badge}
                    </div>
                  )}
                  {/* Color indicator */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm">
                    <div
                      className="w-3 h-3 rounded-full border border-slate-200"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="font-mono text-[10px] text-slate-600">
                      {color.code}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                    {product.category}
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#0A1B3D] mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {product.features.map((feat) => (
                      <span
                        key={feat}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Size Selector */}
                  <div className="mb-4">
                    <label className="text-xs font-medium text-slate-500 mb-1.5 block">
                      Size
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s.label}
                          onClick={() =>
                            setSelectedSizes((prev) => ({ ...prev, [product.id]: s.label }))
                          }
                          className={`py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
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

                  {/* Color Selector */}
                  <div className="mb-4 relative">
                    <label className="text-xs font-medium text-slate-500 mb-1.5 block">
                      BS 4800 Shade
                    </label>
                    <button
                      onClick={() =>
                        setColorPickers((prev) => ({
                          ...prev,
                          [product.id]: !prev[product.id],
                        }))
                      }
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-5 h-5 rounded border border-slate-200"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="font-mono text-xs text-slate-600">
                          {color.code}
                        </span>
                        <span className="text-xs text-slate-400">·</span>
                        <span className="text-xs text-slate-600">{color.name}</span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    </button>

                    {/* Color Picker Dropdown */}
                    {colorPickers[product.id] && (
                      <div className="absolute z-20 mt-1 w-full bg-white rounded-xl border border-slate-200 shadow-lg max-h-64 overflow-hidden flex flex-col">
                        <div className="p-2 border-b border-slate-100">
                          <input
                            type="text"
                            value={colorSearch}
                            onChange={(e) => setColorSearch(e.target.value)}
                            placeholder="Search..."
                            className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 outline-none focus:border-blue-400"
                          />
                        </div>
                        <div className="overflow-y-auto p-2">
                          {filteredColors.map((c) => (
                            <button
                              key={c.code}
                              onClick={() => {
                                setSelectedColors((prev) => ({ ...prev, [product.id]: c }));
                                setColorPickers((prev) => ({ ...prev, [product.id]: false }));
                                setColorSearch("");
                              }}
                              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-50 transition-colors text-left"
                            >
                              <div
                                className="w-5 h-5 rounded border border-slate-200 flex-shrink-0"
                                style={{ backgroundColor: c.hex }}
                              />
                              <span className="font-mono text-xs text-slate-500">{c.code}</span>
                              <span className="text-xs text-slate-700 truncate">{c.name}</span>
                              {c.code === color.code && (
                                <Check className="w-3.5 h-3.5 text-blue-500 ml-auto flex-shrink-0" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Price + Add to Cart */}
                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                    <div>
                      <div className="text-xs text-slate-400">Price</div>
                      <div className="font-display font-bold text-xl text-[#0A1B3D]">
                        {formatKES(size.price)}
                      </div>
                    </div>
                    <button
                      onClick={() =>
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
                        })
                      }
                      className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 active:scale-95 hover:shadow-[0_6px_16px_rgba(37,99,235,0.3)]"
                    >
                      <Plus className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
