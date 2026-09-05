// Industrial Luxury style reminder: the mixer reads like a professional workbench—measured controls, clear output, and no decorative gradients competing with the colour.
import { ArrowRight, FlaskConical } from "lucide-react";
import { useLocation } from "wouter";
import PageIntro from "@/components/PageIntro";
import CustomPaintMixer from "@/components/CustomPaintMixer";

export default function Mixer() {
  const [, setLocation] = useLocation();
  return (
    <>
      <PageIntro
        eyebrow="Colour studio / custom tinting"
        title="Make the shade yours."
        description="Build a custom HEX shade, see the nearest BS 4800 reference, choose a paint base and pack size, then add the specification to your shared cart."
        meta="Custom HEX · closest standard match · live pack pricing"
      />
      <section className="border-b border-slate-200 bg-white py-6">
        <div className="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <FlaskConical className="mt-0.5 h-4 w-4 text-[#7b3f77]" />
            <p className="max-w-2xl text-sm leading-6 text-slate-600">Custom colours are mixed to order. Share the visual result with the Apex team when you need an exact production match.</p>
          </div>
          <button onClick={() => setLocation("/products")} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#0A1B3D] hover:text-[#2d75d7]">
            Browse products <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
      <CustomPaintMixer />
    </>
  );
}
