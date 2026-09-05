// Industrial Luxury style reminder: the About page is a calm, high-trust company brief with navy anchors, precise technical labels, and one clear route into contact.
import { ArrowRight, Clock3, MapPin, ShieldCheck } from "lucide-react";
import { useLocation } from "wouter";
import PageIntro from "@/components/PageIntro";

const pillars = [
  {
    label: "01 / Built for the region",
    title: "Coatings that respect East African surfaces.",
    text: "From decorative walls to industrial steel, wood, roads, and specialist substrates, Apex Coating develops dependable finishes for the conditions our customers actually work in.",
  },
  {
    label: "02 / Two brands",
    title: "Apex Coating and Premier Coat, clearly connected.",
    text: "Apex brings the technical range. Premier Coat brings a refined decorative language. Together they make specification, colour selection, and ordering easier to navigate.",
  },
  {
    label: "03 / Human support",
    title: "Digital tools, backed by a real team.",
    text: "Use the catalogue, palette, visualizer, or mixer to prepare a brief, then reach the head office for quantities, availability, and trade guidance.",
  },
];

export default function About() {
  const [, setLocation] = useLocation();

  return (
    <>
      <PageIntro
        eyebrow="Apex Coating / company brief"
        title="A dependable finish starts with a clear specification."
        description="Apex Coating East Africa Ltd serves decorative, industrial, automotive, adhesive, and wood-care needs from Nairobi, pairing a considered digital catalogue with practical local support."
        meta="Industrial Area · Lusingeti Road · Nairobi"
      />

      <section className="bg-white py-14 lg:py-24">
        <div className="container">
          <div className="grid gap-px border border-slate-200 bg-slate-200 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article key={pillar.label} className="bg-white p-7 lg:p-9">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#2d75d7]">{pillar.label}</div>
                <h2 className="mt-12 font-display text-2xl font-bold leading-tight tracking-[-0.03em] text-[#0A1B3D]">{pillar.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{pillar.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 grid gap-10 border-t border-slate-200 pt-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                <ShieldCheck className="h-4 w-4 text-[#238b68]" />
                Head office
              </div>
              <h2 className="max-w-2xl font-display text-3xl font-bold tracking-[-0.03em] text-[#0A1B3D] md:text-4xl">Bring the right brief to the right finish.</h2>
            </div>
            <div className="grid gap-4 text-sm text-slate-600 sm:grid-cols-2 lg:justify-self-end">
              <div className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 text-[#2d75d7]" /><span>Industrial Area, Lusingeti Road<br />Nairobi, Kenya</span></div>
              <div className="flex gap-3"><Clock3 className="mt-0.5 h-4 w-4 text-[#b46a2d]" /><span>Mon–Sat<br />7:30 AM – 5:30 PM</span></div>
            </div>
          </div>

          <button
            onClick={() => setLocation("/#contact")}
            className="mt-10 inline-flex items-center gap-2 bg-[#0A1B3D] px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#17356d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d75d7] focus-visible:ring-offset-2"
          >
            Talk to the head office <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </>
  );
}
