import { useState } from "react";
import { ROOM_SCENES, FINISHES } from "@/lib/products";
import { BS4800_COLORS, BSColor } from "@/lib/bs4800";
import { Check, Palette, Eye, ShoppingCart } from "lucide-react";
import OrderThisShadeModal from "./OrderThisShadeModal";
import { useTheme } from "@/contexts/ThemeContext";

// Each scene uses one continuous wall plane, then restores the natural image over
// windows, furniture, floor, ceiling, doors, cabinetry, and other foreground details.
// The normalized 0–100 viewBox keeps the masks aligned with the responsive preview.
type WallMask = { wall: string; exclusions: string[] };

const WALL_MASKS: Record<string, WallMask> = {
  living: {
    wall: "M-3 8H103V73H-3Z",
    exclusions: [
      "M-3 -3H103V10H-3Z", // ceiling
      "M69 13H97V50H69Z", // window
      "M9 29H29V55H9Z", // television
      "M-3 12H9V61H-3Z", // shelving edge
      "M-3 58H27V88H-3Z", // armchair
      "M57 53C69 50 87 52 103 59V91H57Z", // sofa
      "M34 67H61V84H34Z", // coffee table
      "M-3 78H103V103H-3Z", // floor
    ],
  },
  bedroom: {
    wall: "M-3 8H103V74H-3Z",
    exclusions: [
      "M-3 -3H103V10H-3Z", // ceiling
      "M6 15H32V47H6Z", // window
      "M35 42H70V70H35Z", // bed
      "M69 50H103V86H69Z", // foreground furniture
      "M-3 79H103V103H-3Z", // floor
    ],
  },
  kitchen: {
    wall: "M-3 7H103V72H-3Z",
    exclusions: [
      "M-3 -3H103V9H-3Z", // ceiling
      "M7 13H34V43H7Z", // window
      "M52 29H103V66H52Z", // cabinetry and counter
      "M-3 78H103V103H-3Z", // floor
    ],
  },
  office: {
    wall: "M-3 7H103V72H-3Z",
    exclusions: [
      "M-3 -3H103V9H-3Z", // ceiling
      "M7 13H34V43H7Z", // window
      "M52 29H103V66H52Z", // desk and cabinetry
      "M-3 78H103V103H-3Z", // floor
    ],
  },
  exterior: {
    wall: "M-3 5H103V84H-3Z",
    exclusions: [
      "M-3 -3H103V7H-3Z", // sky/roof line
      "M15 29H33V70H15Z", // door/window
      "M42 24H59V68H42Z", // central opening
      "M68 28H91V70H68Z", // right opening
      "M-3 82H103V103H-3Z", // ground
    ],
  },
};

const getWallMask = (roomId: string) => WALL_MASKS[roomId] || WALL_MASKS.living;

export default function ColorVisualizer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeRoom, setActiveRoom] = useState(ROOM_SCENES[0]);
  const [selectedColor, setSelectedColor] = useState<BSColor | null>(null);
  const [activeFinish, setActiveFinish] = useState("matte");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colorSearch, setColorSearch] = useState("");
  const [orderShade, setOrderShade] = useState<BSColor | null>(null);

  const filteredColors = BS4800_COLORS.filter((c) => {
    if (!colorSearch.trim()) return true;
    const q = colorSearch.toLowerCase().trim();
    return c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q);
  });

  const sectionBg = isDark ? "bg-slate-900" : "bg-slate-50";
  const sectionText = isDark ? "text-slate-100" : "text-[#0A1B3D]";
  const subText = isDark ? "text-slate-400" : "text-slate-500";
  const cardBg = isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100";
  const badgeBg = isDark ? "bg-blue-500/10 border-blue-400/20" : "bg-[#0A1B3D]/5 border-[#0A1B3D]/10";
  const badgeText = isDark ? "text-blue-400" : "text-[#0A1B3D]";
  const cardText = isDark ? "text-slate-200" : "text-slate-600";
  const mutedText = isDark ? "text-slate-500" : "text-slate-400";
  const selectBg = isDark ? "bg-slate-700 hover:bg-slate-600 text-slate-200" : "bg-slate-50 hover:bg-slate-100 text-slate-700";
  const selectActiveBg = isDark ? "bg-blue-600 text-white" : "bg-[#0A1B3D] text-white";
  const selectActiveText = isDark ? "text-blue-200" : "text-blue-200";
  const labelColor = isDark ? "text-slate-500" : "text-slate-400";
  const roomThumbBg = isDark ? "bg-slate-800" : "bg-white";
  const roomThumbBorder = isDark ? "border-slate-700" : "border-transparent";
  const roomThumbBorderActive = isDark ? "border-blue-500" : "border-[#0A1B3D]";
  const roomThumbText = isDark ? "text-slate-300" : "text-slate-600";

  return (
    <section id="visualizer" className={`py-20 lg:py-28 ${sectionBg} transition-colors duration-500`}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${badgeBg} mb-4`}>
            <Eye className={`w-3 h-3 ${badgeText}`} />
            <span className={`font-mono text-[10px] ${badgeText} tracking-widest uppercase`}>
              Color Visualizer Tool
            </span>
          </div>
          <h2 className={`font-display font-bold text-3xl md:text-4xl lg:text-5xl ${sectionText} mb-4 transition-colors`}>
            See It Before You Buy
          </h2>
          <p className={`${subText} max-w-2xl mx-auto text-base`}>
            Apply any BS 4800 shade to real room scenes. Visualize exactly how your space will look before making a purchase.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Room Preview */}
          <div className="lg:col-span-2">
            <div className={`relative rounded-xl overflow-hidden swatch-shadow-lg ${isDark ? "bg-slate-700" : "bg-slate-200"}`}>
              <div className="relative aspect-[16/10] w-full">
                <img
                  src={activeRoom.image}
                  alt={activeRoom.name}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                />
                {/* Dulux-style wall overlay: a single even-odd SVG path maps the wall plane and
                    protected foreground regions while the photograph remains visible beneath it. */}
                {selectedColor && (() => {
                  const mask = getWallMask(activeRoom.id);
                  const wallSurface = `${mask.wall} ${mask.exclusions.join(" ")}`;
                  return (
                    <svg
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 h-full w-full"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      <path
                        id="wall-surface"
                        d={wallSurface}
                        fill={selectedColor.hex}
                        fillRule="evenodd"
                        clipRule="evenodd"
                        stroke={selectedColor.hex}
                        strokeWidth="0.35"
                        strokeLinejoin="round"
                        style={{ mixBlendMode: "multiply", opacity: 0.72, transition: "fill 0.3s ease" }}
                      />
                    </svg>
                  );
                })()}
                {/* Room label */}
                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg glass-overlay">
                  <span className="text-xs font-medium text-white">{activeRoom.name}</span>
                </div>
                {/* Active color indicator */}
                {selectedColor && (
                  <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-lg glass-overlay">
                    <div className="w-3.5 h-3.5 rounded-full border border-white/40" style={{ backgroundColor: selectedColor.hex }} />
                    <span className="font-mono text-[10px] text-white">{selectedColor.code}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Room Selector */}
            <div className="flex gap-2 mt-4">
              {ROOM_SCENES.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(room)}
                  className={`flex-1 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    activeRoom.id === room.id ? `${roomThumbBorderActive} shadow-md` : `${roomThumbBorder} hover:border-slate-200`
                  }`}
                >
                  <div className="relative aspect-[16/10]">
                    <img src={room.image} alt={room.name} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                  <div className={`text-[10px] font-medium py-1.5 px-1 text-center ${roomThumbBg} ${roomThumbText}`}>
                    {room.name}
                  </div>
                </button>
              ))}
            </div>

          </div>

          {/* Controls Panel */}
          <div className="space-y-4">
            {/* Selected Color */}
            <div className={`rounded-xl p-5 border swatch-shadow transition-colors ${cardBg}`}>
              <h3 className={`font-mono text-[10px] ${labelColor} uppercase tracking-wider mb-4`}>Selected Color</h3>
              {selectedColor ? (
                <div className="space-y-3">
                  <div className="h-16 rounded-lg border border-slate-200" style={{ backgroundColor: selectedColor.hex }} />
                  <div>
                    <div className={`font-mono text-xs ${labelColor}`}>{selectedColor.code}</div>
                    <div className={`font-display font-semibold text-lg ${sectionText} transition-colors`}>{selectedColor.name}</div>
                    <div className={`font-mono text-[10px] ${labelColor} mt-0.5`}>{selectedColor.hex.toUpperCase()}</div>
                  </div>
                  <button
                    onClick={() => setOrderShade(selectedColor)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#0A1B3D] hover:bg-[#15294f] text-white text-sm font-semibold rounded-xl transition-all duration-200 active:scale-[0.98]"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Order This Shade
                  </button>
                  <button
                    onClick={() => { setSelectedColor(null); setShowColorPicker(true); }}
                    className={`w-full py-2 text-sm font-medium border rounded-lg transition-colors ${isDark ? "text-blue-400 border-slate-600 hover:border-blue-500" : "text-[#0A1B3D] border-slate-200 hover:border-blue-300"}`}
                  >
                    Change Color
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowColorPicker(true)}
                  className={`w-full py-6 border-2 border-dashed rounded-lg transition-colors ${isDark ? "border-slate-600 text-slate-500 hover:border-blue-500 hover:text-blue-400" : "border-slate-300 text-slate-400 hover:border-[#0A1B3D] hover:text-[#0A1B3D]"}`}
                >
                  <Palette className="w-5 h-5 mx-auto mb-2" />
                  <span className="text-xs font-medium">Select a Color</span>
                </button>
              )}
            </div>

            {/* Finish Selector */}
            <div className={`rounded-xl p-5 border swatch-shadow transition-colors ${cardBg}`}>
              <h3 className={`font-mono text-[10px] ${labelColor} uppercase tracking-wider mb-4`}>Finish Type</h3>
              <div className="space-y-1.5">
                {FINISHES.map((finish) => (
                  <button
                    key={finish.id}
                    onClick={() => setActiveFinish(finish.id)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-left transition-all duration-200 ${
                      activeFinish === finish.id ? selectActiveBg : selectBg
                    }`}
                  >
                    <div>
                      <div className="text-sm font-medium">{finish.name}</div>
                      <div className={`text-[10px] ${activeFinish === finish.id ? selectActiveText : labelColor}`}>
                        {finish.description}
                      </div>
                    </div>
                    {activeFinish === finish.id && <Check className="w-4 h-4 text-blue-400" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Color Picker Modal */}
        {showColorPicker && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowColorPicker(false)}
          >
            <div
              className={`rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl animate-fade-up flex flex-col ${isDark ? "bg-slate-800" : "bg-white"}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`p-5 border-b ${isDark ? "border-slate-700" : "border-slate-100"}`}>
                <h3 className={`font-display font-bold text-lg ${isDark ? "text-slate-100" : "text-[#0A1B3D]"} mb-3`}>Select a BS 4800 Color</h3>
                <input
                  type="text"
                  value={colorSearch}
                  onChange={(e) => setColorSearch(e.target.value)}
                  placeholder="Search by code (e.g. 10 B 17) or name (e.g. Mistletoe)..."
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none text-sm ${isDark ? "border-slate-600 bg-slate-700 text-slate-200 placeholder:text-slate-500 focus:border-blue-500" : "border-slate-200 text-slate-700 focus:border-[#0A1B3D]"}`}
                />
              </div>
              <div className="flex-1 overflow-y-auto p-5">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {filteredColors.map((color, idx) => (
                    <button
                      key={`${color.code}|${color.name}|${idx}`}
                      onClick={() => { setSelectedColor(color); setShowColorPicker(false); setColorSearch(""); }}
                      className={`group rounded-lg overflow-hidden border transition-all duration-200 hover:shadow-md ${isDark ? "border-slate-600 hover:border-blue-500" : "border-slate-100 hover:border-[#0A1B3D]"}`}
                    >
                      <div className="h-14 w-full transition-transform group-hover:scale-105" style={{ backgroundColor: color.hex }} />
                      <div className={`p-1.5 text-left ${isDark ? "bg-slate-700" : ""}`}>
                        <div className={`font-mono text-[9px] ${labelColor}`}>{color.code}</div>
                        <div className={`text-[10px] font-medium truncate ${isDark ? "text-slate-300" : "text-slate-700"}`}>{color.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order This Shade Modal (Path A from visualizer) */}
        {orderShade && (
          <OrderThisShadeModal color={orderShade} onClose={() => setOrderShade(null)} source="visualizer" />
        )}
      </div>
    </section>
  );
}
