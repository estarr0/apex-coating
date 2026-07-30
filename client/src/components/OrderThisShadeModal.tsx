import { useState, useMemo } from "react";
import { X, ShoppingCart, Droplets, Package } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { PRODUCTS, formatKES, type Product } from "@/lib/products";
import { type BSColor } from "@/lib/bs4800";

interface OrderThisShadeModalProps {
  color: BSColor;
  onClose: () => void;
  source?: "shade-card" | "visualizer" | "mixer";
}

// Finish types mapped to product categories
const FINISH_OPTIONS = [
  { id: "texstar-emulsion", name: "Texstar Emulsion", product: PRODUCTS.find(p => p.id === "texstar-emulsion")! },
  { id: "plastic-emulsion", name: "Plastic Emulsion", product: PRODUCTS.find(p => p.id === "plastic-emulsion")! },
  { id: "gloss-enamel", name: "Gloss Enamel", product: PRODUCTS.find(p => p.id === "gloss-enamel")! },
  { id: "gloss-texstar", name: "Gloss Texstar", product: PRODUCTS.find(p => p.id === "gloss-texstar")! },
  { id: "vinyl-wall-sheen", name: "Vinyl Wall Sheen (Silk)", product: PRODUCTS.find(p => p.id === "vinyl-wall-sheen")! },
  { id: "acrylic-emulsion", name: "Acrylic Emulsion (Vinyl Matt)", product: PRODUCTS.find(p => p.id === "acrylic-emulsion")! },
  { id: "weathershield", name: "Weathershield (Silicon Based)", product: PRODUCTS.find(p => p.id === "weathershield")! },
  { id: "textured-wall-master", name: "Textured Wall Master / Ruff & Tuff", product: PRODUCTS.find(p => p.id === "textured-wall-master")! },
];

export default function OrderThisShadeModal({ color, onClose, source = "shade-card" }: OrderThisShadeModalProps) {
  const { addItem } = useCart();
  const [selectedFinish, setSelectedFinish] = useState<null | { id: string; name: string; product: Product }>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const sourceLabel = source === "mixer" ? "Custom Blend" : "BS 4800 Shade";

  // When finish changes, reset size
  const handleFinishSelect = (finish: typeof selectedFinish) => {
    setSelectedFinish(finish);
    setSelectedSize(null);
  };

  const handleAddToCart = () => {
    if (!selectedFinish || !selectedSize) return;
    const size = selectedFinish.product.sizes.find(s => s.label === selectedSize);
    if (!size) return;

    addItem({
      productId: selectedFinish.product.id,
      productName: selectedFinish.product.name,
      productImage: selectedFinish.product.image,
      sizeLabel: size.label,
      sizeVolume: size.volume,
      price: size.price,
      bsCode: color.code,
      colorName: color.name,
      colorHex: color.hex,
      finishType: selectedFinish.name,
    });
    onClose();
  };

  const totalPrice = useMemo(() => {
    if (!selectedFinish || !selectedSize) return 0;
    const size = selectedFinish.product.sizes.find(s => s.label === selectedSize);
    return size ? size.price : 0;
  }, [selectedFinish, selectedSize]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl animate-fade-up overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-[#0A1B3D] flex-shrink-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl border-2 border-white/20 shadow-inner"
                style={{ backgroundColor: color.hex }}
              />
              <div>
                <div className="font-mono text-[10px] text-blue-300 tracking-wider uppercase">{sourceLabel}</div>
                <div className="font-mono text-sm font-semibold text-white">{color.code}</div>
                <div className="text-sm text-blue-100 font-medium">{color.name}</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body - scrollable */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Step 1: Select Finish */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5" />
              Step 1 — Select Finish Type
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {FINISH_OPTIONS.map((finish) => (
                <button
                  key={finish.id}
                  onClick={() => handleFinishSelect(finish)}
                  className={`p-3 rounded-xl text-left border-2 transition-all duration-200 ${
                    selectedFinish?.id === finish.id
                      ? "border-[#0A1B3D] bg-[#0A1B3D]/5 shadow-sm"
                      : "border-slate-150 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className={`text-xs font-semibold leading-tight ${
                    selectedFinish?.id === finish.id ? "text-[#0A1B3D]" : "text-slate-700"
                  }`}>
                    {finish.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Select Size */}
          {selectedFinish && (
            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5" />
                Step 2 — Select Container Size
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedFinish.product.sizes.map((size) => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(size.label)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all duration-200 ${
                      selectedSize === size.label
                        ? "border-[#0A1B3D] bg-[#0A1B3D] text-white shadow-md"
                        : "border-slate-150 hover:border-slate-300 bg-white text-slate-700"
                    }`}
                  >
                    <span className="text-sm font-semibold">{size.label}</span>
                    <span className={`text-xs font-mono ${
                      selectedSize === size.label ? "text-blue-200" : "text-slate-400"
                    }`}>
                      {formatKES(size.price)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 p-5 bg-slate-50 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-500">Total</span>
            <span className="font-display font-bold text-xl text-[#0A1B3D]">
              {totalPrice > 0 ? formatKES(totalPrice) : "—"}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!selectedFinish || !selectedSize}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 ${
              selectedFinish && selectedSize
                ? "bg-[#0A1B3D] hover:bg-[#15294f] text-white active:scale-[0.98] hover:shadow-[0_6px_16px_rgba(10,27,61,0.3)]"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {selectedFinish && selectedSize ? "Add to Cart" : "Select Finish & Size"}
          </button>
        </div>
      </div>
    </div>
  );
}
