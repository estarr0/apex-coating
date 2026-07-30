import { useState, useMemo } from "react";
import { PRODUCTS, PRODUCT_CATEGORIES, formatKES } from "@/lib/products";
import { BS4800_COLORS, BSColor } from "@/lib/bs4800";
import { useCart } from "@/contexts/CartContext";
import { Plus, Check, ChevronDown, Package, Tag } from "lucide-react";

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
    const product = PRODUCTS.find((p) => p.id === productId);
    const defaultColor = BS4800_COLORS.find((c) => c.code === product?.defaultColor);
    return defaultColor || BS4800_COLORS[0];
  };

  const getSizeForProduct = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId)!;
    const sizeLabel = selectedSizes[productId] || product.sizes[0].label;
    return product.sizes.find((s) => s.label === sizeLabel) || product.sizes[0];
  };

  const filteredColors = BS4800_COLORS.filter((c) => {
    if (!colorSearch.trim()) return true;
    const q = colorSearch.toLowerCase().trim();
    return c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q);
  });

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
    });
  };

  return (
    <section id="products" className="py-20 lg:py-28 bg-slate-50">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
            <Package className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs font-mono text-blue-600 tracking-wider uppercase">
              Product Catalog
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[#0A1B3D] mb-4">
            Complete Price List
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
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
            const color = getColorForProduct(product.id);
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
                  {/* Color indicator */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm shadow-sm">
                    <div
                      className="w-3 h-3 rounded-full border border-slate-200"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="font-mono text-[10px] text-slate-600">
                      {color.code}
                    </span>
                  </div>
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

                  {/* Size Selector */}
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

                  {/* Color Selector */}
                  <div className="mb-4 relative">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">
                      BS 4800 Shade
                    </label>
                    <button
                      onClick={() =>
                        setColorPickers((prev) => ({
                          ...prev,
                          [product.id]: !prev[product.id],
                        }))
                      }
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors bg-white"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded border border-slate-200"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="font-mono text-xs text-slate-600">
                          {color.code}
                        </span>
                        <span className="text-[10px] text-slate-400">·</span>
                        <span className="text-xs text-slate-600 truncate max-w-[120px]">{color.name}</span>
                      </div>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    </button>

                    {/* Color Picker Dropdown */}
                    {colorPickers[product.id] && (
                      <div className="absolute z-30 mt-1 w-full bg-white rounded-xl border border-slate-200 shadow-xl max-h-60 overflow-hidden flex flex-col">
                        <div className="p-2 border-b border-slate-100">
                          <input
                            type="text"
                            value={colorSearch}
                            onChange={(e) => setColorSearch(e.target.value)}
                            placeholder="Search BS code..."
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 outline-none focus:border-blue-400"
                            autoFocus
                          />
                        </div>
                        <div className="overflow-y-auto flex-1">
                          <div className="grid grid-cols-4 gap-0.5 p-1">
                            {filteredColors.slice(0, 40).map((c) => (
                              <button
                                key={c.code}
                                onClick={() => {
                                  setSelectedColors((prev) => ({ ...prev, [product.id]: c }));
                                  setColorPickers((prev) => ({ ...prev, [product.id]: false }));
                                  setColorSearch("");
                                }}
                                className="group/swatch flex flex-col items-center p-1 rounded hover:bg-slate-50 transition-colors"
                                title={`${c.code} - ${c.name}`}
                              >
                                <div
                                  className="w-full aspect-square rounded border border-slate-200 mb-0.5 transition-transform group-hover/swatch:scale-110"
                                  style={{ backgroundColor: c.hex }}
                                />
                                <span className="font-mono text-[8px] text-slate-500 leading-none">{c.code}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

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
                      className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 active:scale-95 hover:shadow-[0_6px_16px_rgba(37,99,235,0.3)]"
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
    </section>
  );
}
