// Industrial Luxury style reminder: the tools hub is a compact control room—each utility is clearly named, lightly ornamented, and one click from the working surface.
import { ArrowRight, Eye, Hash, Palette } from "lucide-react";
import { useLocation } from "wouter";
import PageIntro from "@/components/PageIntro";

const tools = [
  { title: "Colour visualizer", label: "ROOM / LIGHT", description: "Paint realistic room scenes with a BS 4800 shade and compare finish behavior under three lighting conditions.", href: "/visualizer", icon: Eye, color: "#2d75d7" },
  { title: "Custom colour mixer", label: "HEX / MATCH", description: "Create a custom shade, find its closest standard reference, and prepare a finish for ordering.", href: "/mixer", icon: Palette, color: "#7b3f77" },
  { title: "BS 4800 palette", label: "CODE / FAMILY", description: "Browse the full indexed shade library with family filters, favorites, and shade-to-cart ordering.", href: "/bs-4800", icon: Hash, color: "#b46a2d" },
];

export default function Tools() {
  const [, setLocation] = useLocation();
  return (
    <>
      <PageIntro
        eyebrow="Tools / specification desk"
        title="From first impression to final specification."
        description="Use the visual tools together: find a reference shade, see it in a room, or build a custom tint before sending a complete enquiry to the Apex team."
        meta="Three tools · one persistent cart"
      />
      <section className="bg-white py-14 lg:py-24">
        <div className="container">
          <div className="grid gap-px overflow-hidden border border-slate-200 bg-slate-200 lg:grid-cols-3">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <button key={tool.href} onClick={() => setLocation(tool.href)} className="group min-h-[330px] bg-white p-8 text-left transition-colors hover:bg-[#0A1B3D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d75d7] focus-visible:ring-inset">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs tracking-[0.18em] text-slate-400 group-hover:text-blue-200">0{index + 1}</span>
                    <span className="flex h-11 w-11 items-center justify-center border border-slate-200 group-hover:border-white/20" style={{ color: tool.color }}><Icon className="h-5 w-5" /></span>
                  </div>
                  <div className="mt-24">
                    <div className="mb-3 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 group-hover:text-blue-200/70">{tool.label}</div>
                    <h2 className="font-display text-2xl font-bold text-[#0A1B3D] group-hover:text-white">{tool.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-500 group-hover:text-blue-100/70">{tool.description}</p>
                    <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#2d75d7] group-hover:text-white">Open tool <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
