// Industrial Luxury style reminder: the visualizer is a quiet studio—large preview, controlled selectors, and a single confident ordering action.
import { ArrowRight, Eye, Lightbulb } from "lucide-react";
import { useLocation } from "wouter";
import PageIntro from "@/components/PageIntro";
import ColorVisualizer from "@/components/ColorVisualizer";

export default function Visualizer() {
  const [, setLocation] = useLocation();
  return (
    <>
      <PageIntro
        eyebrow="Visual studio / room scenes"
        title="Put the colour in context."
        description="Compare a selected BS 4800 shade across room scenes, lighting presets, and finish treatments before you specify the pack you need."
        meta="Daylight · warm indoor · evening presets"
      />
      <section className="border-b border-slate-200 bg-white py-6">
        <div className="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <Lightbulb className="mt-0.5 h-4 w-4 text-[#b46a2d]" />
            <p className="max-w-2xl text-sm leading-6 text-slate-600">Use the visualizer for direction, then confirm the final shade on a physical sample before a large specification.</p>
          </div>
          <button onClick={() => setLocation("/bs-4800")} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#0A1B3D] hover:text-[#2d75d7]">
            Open palette <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
      <ColorVisualizer />
    </>
  );
}
