import { useState, useMemo, useCallback } from "react";
import { FlaskConical, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { BS4800_COLORS, BSColor } from "@/lib/bs4800";
import { formatKES, PRODUCTS } from "@/lib/products";
import OrderThisShadeModal from "./OrderThisShadeModal";

interface MixerColor {
  hex: string;
  name: string;
  weight: number; // 0-100
}

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((x) => {
    const h = Math.max(0, Math.min(255, Math.round(x))).toString(16);
    return h.length === 1 ? "0" + h : h;
  }).join("");
}

function colorDistance(c1: [number, number, number], c2: [number, number, number]): number {
  const dr = c1[0] - c2[0];
  const dg = c1[1] - c2[1];
  const db = c1[2] - c2[2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function findClosestMatch(blendHex: string): { color: BSColor; matchPercent: number } {
  const [br, bg, bb] = hexToRgb(blendHex);
  let bestMatch: BSColor = BS4800_COLORS[0];
  let bestDist = Infinity;

  for (const c of BS4800_COLORS) {
    const dist = colorDistance([br, bg, bb], [c.r, c.g, c.b]);
    if (dist < bestDist) {
      bestDist = dist;
      bestMatch = c;
    }
  }

  // Max possible distance is ~441 (sqrt(255^2 * 3))
  const matchPercent = Math.max(0, Math.round(100 - (bestDist / 441) * 100));
  return { color: bestMatch, matchPercent };
}

// Finish types for the mixer modal
const MIXER_FINISH_OPTIONS = [
  { id: "plastic-emulsion", name: "Plastic Emulsion" },
  { id: "gloss-enamel", name: "Gloss Enamel" },
  { id: "vinyl-wall-sheen", name: "Vinyl Wall Sheen (Silk)" },
  { id: "texstar-emulsion", name: "Texstar Emulsion" },
  { id: "weathershield", name: "Weathershield (Silicon Based)" },
  { id: "textured-wall-master", name: "Textured Wall Master / Ruff & Tuff" },
];

export default function CustomPaintMixer() {
  const [mixerColors, setMixerColors] = useState<MixerColor[]>([
    { hex: "#ffffff", name: "Base White", weight: 70 },
    { hex: "#1B5299", name: "Apex Blue", weight: 30 },
  ]);
  const [customHex, setCustomHex] = useState("");
  const [customName, setCustomName] = useState("");
  const [orderShade, setOrderShade] = useState<BSColor | null>(null);

  const addMixerColor = () => {
    if (mixerColors.length >= 5) return;
    const hue = Math.floor(Math.random() * 360);
    const hex = rgbToHex(
      Math.floor(128 + 127 * Math.cos((hue * Math.PI) / 180)),
      Math.floor(128 + 127 * Math.cos((hue * Math.PI) / 180 - 2.094)),
      Math.floor(128 + 127 * Math.cos((hue * Math.PI) / 180 + 2.094))
    );
    setMixerColors((prev) => [...prev, { hex, name: `Custom ${prev.length + 1}`, weight: 50 }]);
  };

  const removeMixerColor = (idx: number) => {
    setMixerColors((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateColorHex = (idx: number, hex: string) => {
    setMixerColors((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, hex } : c))
    );
  };

  const updateColorWeight = (idx: number, weight: number) => {
    setMixerColors((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, weight } : c))
    );
  };

  const updateColorName = (idx: number, name: string) => {
    setMixerColors((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, name } : c))
    );
  };

  // Calculate blended color
  const blendedColor = useMemo(() => {
    if (mixerColors.length === 0) return "#ffffff";
    let totalWeight = mixerColors.reduce((s, c) => s + c.weight, 0);
    if (totalWeight === 0) return "#ffffff";

    let r = 0, g = 0, b = 0;
    for (const c of mixerColors) {
      const [cr, cg, cb] = hexToRgb(c.hex);
      const w = c.weight / totalWeight;
      r += cr * w;
      g += cg * w;
      b += cb * w;
    }
    return rgbToHex(r, g, b);
  }, [mixerColors]);

  const closestMatch = useMemo(() => findClosestMatch(blendedColor), [blendedColor]);

  const addCustomShade = useCallback(() => {
    if (!customHex.trim()) return;
    const hex = customHex.startsWith("#") ? customHex : "#" + customHex;
    if (hex.length !== 7) return;
    const name = customName.trim() || hex.toUpperCase();
    setMixerColors((prev) => [
      ...prev,
      { hex, name, weight: 50 },
    ]);
    setCustomHex("");
    setCustomName("");
  }, [customHex, customName]);

  const customColorHex = useMemo(() => {
    if (!customHex.trim()) return null;
    const h = customHex.startsWith("#") ? customHex : "#" + customHex;
    if (h.length !== 7) return null;
    return h;
  }, [customHex]);

  return (
    <section id="mixer" className="py-20 lg:py-28 bg-white">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1B3D]/5 border border-[#0A1B3D]/10 mb-4">
            <FlaskConical className="w-3 h-3 text-[#0A1B3D]" />
            <span className="font-mono text-[10px] text-[#0A1B3D] tracking-widest uppercase">
              Custom Paint Mixer
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[#0A1B3D] mb-4">
            Create Your Own Blend
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-base">
            Mix any combination of catalog shades or custom HEX colors. We'll find the closest catalog match and let you order instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Mixer Controls */}
          <div className="lg:col-span-3 space-y-4">
            {/* Color Inputs */}
            <div className="bg-white rounded-2xl border border-slate-150 p-5 swatch-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-base text-[#0A1B3D]">
                  Mixer Colors
                </h3>
                <button
                  onClick={addMixerColor}
                  disabled={mixerColors.length >= 5}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    mixerColors.length >= 5
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-[#0A1B3D] text-white hover:bg-[#15294f] active:scale-95"
                  }`}
                >
                  <Plus className="w-3 h-3" />
                  Add Color
                </button>
              </div>

              <div className="space-y-3">
                {mixerColors.map((mc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    {/* HTML5 Color Wheel */}
                    <div className="relative flex-shrink-0">
                      <input
                        type="color"
                        value={mc.hex}
                        onChange={(e) => updateColorHex(idx, e.target.value)}
                        className="w-10 h-10 rounded-lg border-0 cursor-pointer bg-transparent"
                        style={{ padding: 0 }}
                      />
                    </div>
                    {/* Name */}
                    <input
                      type="text"
                      value={mc.name}
                      onChange={(e) => updateColorName(idx, e.target.value)}
                      className="flex-1 min-w-0 px-2 py-1.5 text-xs font-medium text-slate-700 bg-white rounded-lg border border-slate-200 outline-none focus:border-[#0A1B3D]"
                      placeholder="Color name"
                    />
                    {/* Weight Slider */}
                    <div className="flex items-center gap-2 w-28">
                      <button
                        onClick={() => updateColorWeight(idx, Math.max(0, mc.weight - 10))}
                        className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100"
                      >
                        <Minus className="w-3 h-3 text-slate-500" />
                      </button>
                      <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${mc.weight}%`,
                            backgroundColor: mc.hex,
                          }}
                        />
                      </div>
                      <button
                        onClick={() => updateColorWeight(idx, Math.min(100, mc.weight + 10))}
                        className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100"
                      >
                        <Plus className="w-3 h-3 text-slate-500" />
                      </button>
                    </div>
                    {/* Remove */}
                    <button
                      onClick={() => removeMixerColor(idx)}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom HEX Input */}
            <div className="bg-white rounded-2xl border border-slate-150 p-5 swatch-shadow">
              <h3 className="font-display font-bold text-base text-[#0A1B3D] mb-4">
                Add Custom HEX Shade
              </h3>
              <div className="flex items-center gap-3">
                {customColorHex && (
                  <div
                    className="w-10 h-10 rounded-lg border border-slate-200 flex-shrink-0"
                    style={{ backgroundColor: customColorHex }}
                  />
                )}
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Color name (optional)"
                    className="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-200 outline-none focus:border-[#0A1B3D] text-slate-700"
                  />
                  <input
                    type="text"
                    value={customHex}
                    onChange={(e) => setCustomHex(e.target.value)}
                    placeholder="#HEX code"
                    className="w-28 px-3 py-2 text-sm font-mono rounded-lg border border-slate-200 outline-none focus:border-[#0A1B3D] text-slate-700"
                  />
                </div>
                <button
                  onClick={addCustomShade}
                  disabled={!customColorHex}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    customColorHex
                      ? "bg-[#0A1B3D] text-white hover:bg-[#15294f] active:scale-95"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-150 p-5 swatch-shadow sticky top-24">
              {/* Blended Result */}
              <div className="text-center mb-5">
                <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-2">
                  Your Blend
                </div>
                <div
                  className="w-full h-32 rounded-xl mx-auto mb-3 shadow-inner border border-slate-200"
                  style={{ backgroundColor: blendedColor }}
                />
                <div className="font-mono text-lg font-bold text-[#0A1B3D]">
                  {blendedColor.toUpperCase()}
                </div>
              </div>

              {/* Closest Match */}
              <div className="border-t border-slate-100 pt-5">
                <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-3">
                  Closest Catalog Match
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div
                    className="w-14 h-14 rounded-xl border-2 border-white shadow-inner"
                    style={{ backgroundColor: closestMatch.color.hex }}
                  />
                  <div className="flex-1">
                    <div className="font-mono text-sm font-bold text-[#0A1B3D]">
                      {closestMatch.color.code}
                    </div>
                    <div className="text-sm font-medium text-slate-700">
                      {closestMatch.color.name}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${closestMatch.matchPercent}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs font-semibold text-emerald-600">
                        {closestMatch.matchPercent}% match
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order This Custom Blend */}
              <button
                onClick={() => setOrderShade(closestMatch.color)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 mt-5 bg-[#0A1B3D] hover:bg-[#15294f] text-white font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] hover:shadow-[0_6px_16px_rgba(10,27,61,0.3)]"
              >
                <ShoppingCart className="w-4 h-4" />
                Order This Custom Blend
              </button>

              <div className="flex items-center justify-center gap-2 mt-3">
                <div
                  className="w-3 h-3 rounded-full border border-slate-200"
                  style={{ backgroundColor: blendedColor }}
                />
                <span className="text-[10px] font-mono text-slate-400">
                  {blendedColor.toUpperCase()}
                </span>
                <span className="text-slate-300">→</span>
                <div
                  className="w-3 h-3 rounded-full border border-slate-200"
                  style={{ backgroundColor: closestMatch.color.hex }}
                />
                <span className="text-[10px] font-mono text-slate-400">
                  {closestMatch.color.code}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order This Custom Blend Modal */}
      {orderShade && (
        <OrderThisShadeModal
          color={orderShade}
          onClose={() => setOrderShade(null)}
          source="mixer"
        />
      )}
    </section>
  );
}
