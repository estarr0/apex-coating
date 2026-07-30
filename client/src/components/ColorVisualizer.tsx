import { useState } from "react";
import { ROOM_SCENES, FINISHES } from "@/lib/products";
import { BS4800_COLORS, BSColor } from "@/lib/bs4800";
import { Check, Palette, Eye } from "lucide-react";

export default function ColorVisualizer() {
  const [activeRoom, setActiveRoom] = useState(ROOM_SCENES[0]);
  const [selectedColor, setSelectedColor] = useState<BSColor | null>(null);
  const [activeFinish, setActiveFinish] = useState("matte");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colorSearch, setColorSearch] = useState("");

  const filteredColors = BS4800_COLORS.filter((c) => {
    if (!colorSearch.trim()) return true;
    const q = colorSearch.toLowerCase().trim();
    return c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q);
  });

  const getFinishStyle = (finishId: string) => {
    switch (finishId) {
      case "matte":
        return "none";
      case "silk":
        return "saturate(1.1) brightness(1.05)";
      case "eggshell":
        return "saturate(1.05) brightness(1.02)";
      case "gloss":
        return "saturate(1.2) brightness(1.15) contrast(1.05)";
      case "weather-guard":
        return "saturate(0.95) brightness(0.98)";
      default:
        return "none";
    }
  };

  return (
    <section id="visualizer" className="py-20 lg:py-28 bg-slate-50">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1B3D]/5 border border-[#0A1B3D]/10 mb-4">
            <Eye className="w-3 h-3 text-[#0A1B3D]" />
            <span className="font-mono text-[10px] text-[#0A1B3D] tracking-widest uppercase">
              Color Visualizer Tool
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[#0A1B3D] mb-4">
            See It Before You Buy
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-base">
            Apply any BS 4800 shade to real room scenes. Visualize exactly how your space will look before making a purchase.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Room Preview */}
          <div className="lg:col-span-2">
            <div className="relative rounded-xl overflow-hidden swatch-shadow-lg bg-slate-200">
              {/* Room Image */}
              <div className="relative aspect-[16/10] w-full">
                <img
                  src={activeRoom.image}
                  alt={activeRoom.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Wall overlay for paint color */}
                {selectedColor && (
                  <div
                    className="absolute inset-0 mix-blend-multiply transition-all duration-500"
                    style={{
                      backgroundColor: selectedColor.hex,
                      filter: getFinishStyle(activeFinish),
                      opacity: 0.65,
                    }}
                  />
                )}
                {/* Room label */}
                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg glass-overlay">
                  <span className="text-xs font-medium text-white">
                    {activeRoom.name}
                  </span>
                </div>
                {/* Active color indicator */}
                {selectedColor && (
                  <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-lg glass-overlay">
                    <div
                      className="w-3.5 h-3.5 rounded-full border border-white/40"
                      style={{ backgroundColor: selectedColor.hex }}
                    />
                    <span className="font-mono text-[10px] text-white">
                      {selectedColor.code}
                    </span>
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
                    activeRoom.id === room.id
                      ? "border-[#0A1B3D] shadow-md"
                      : "border-transparent hover:border-slate-200"
                  }`}
                >
                  <div className="relative aspect-[16/10]">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-[10px] font-medium text-slate-600 py-1.5 px-1 text-center bg-white">
                    {room.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Controls Panel */}
          <div className="space-y-4">
            {/* Selected Color */}
            <div className="bg-white rounded-xl p-5 border border-slate-100 swatch-shadow">
              <h3 className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-4">
                Selected Color
              </h3>
              {selectedColor ? (
                <div className="space-y-3">
                  <div
                    className="h-16 rounded-lg border border-slate-200"
                    style={{ backgroundColor: selectedColor.hex }}
                  />
                  <div>
                    <div className="font-mono text-xs text-slate-400">{selectedColor.code}</div>
                    <div className="font-display font-semibold text-lg text-[#0A1B3D]">
                      {selectedColor.name}
                    </div>
                    <div className="font-mono text-[10px] text-slate-400 mt-0.5">
                      {selectedColor.hex.toUpperCase()}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedColor(null);
                      setShowColorPicker(true);
                    }}
                    className="w-full py-2 text-sm font-medium text-[#0A1B3D] hover:text-blue-600 transition-colors border border-slate-200 rounded-lg hover:border-blue-300"
                  >
                    Change Color
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowColorPicker(true)}
                  className="w-full py-6 border-2 border-dashed border-slate-300 rounded-lg text-slate-400 hover:border-[#0A1B3D] hover:text-[#0A1B3D] transition-colors"
                >
                  <Palette className="w-5 h-5 mx-auto mb-2" />
                  <span className="text-xs font-medium">Select a Color</span>
                </button>
              )}
            </div>

            {/* Finish Selector */}
            <div className="bg-white rounded-xl p-5 border border-slate-100 swatch-shadow">
              <h3 className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-4">
                Finish Type
              </h3>
              <div className="space-y-1.5">
                {FINISHES.map((finish) => (
                  <button
                    key={finish.id}
                    onClick={() => setActiveFinish(finish.id)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-left transition-all duration-200 ${
                      activeFinish === finish.id
                        ? "bg-[#0A1B3D] text-white"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div>
                      <div className="text-sm font-medium">{finish.name}</div>
                      <div className={`text-[10px] ${activeFinish === finish.id ? "text-blue-200" : "text-slate-400"}`}>
                        {finish.description}
                      </div>
                    </div>
                    {activeFinish === finish.id && (
                      <Check className="w-4 h-4 text-blue-400" />
                    )}
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
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl animate-fade-up flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 border-b border-slate-100">
                <h3 className="font-display font-bold text-lg text-[#0A1B3D] mb-3">
                  Select a BS 4800 Color
                </h3>
                <input
                  type="text"
                  value={colorSearch}
                  onChange={(e) => setColorSearch(e.target.value)}
                  placeholder="Search by code or name..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#0A1B3D] text-sm text-slate-700"
                />
              </div>
              <div className="flex-1 overflow-y-auto p-5">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {filteredColors.map((color) => (
                    <button
                      key={color.code}
                      onClick={() => {
                        setSelectedColor(color);
                        setShowColorPicker(false);
                        setColorSearch("");
                      }}
                      className="group rounded-lg overflow-hidden border border-slate-100 hover:border-[#0A1B3D] transition-all duration-200 hover:shadow-md"
                    >
                      <div
                        className="h-14 w-full transition-transform group-hover:scale-105"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="p-1.5 text-left">
                        <div className="font-mono text-[9px] text-slate-400">{color.code}</div>
                        <div className="text-[10px] font-medium text-slate-700 truncate">{color.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
