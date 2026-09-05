// Industrial Luxury style reminder: editorial content should feel like a trade journal—specific, useful, and quiet; never manufacture testimonials, ratings, or performance claims beyond the established catalogue language.
import { ArrowUpRight, BookOpen, FileText, Megaphone } from "lucide-react";
import PageIntro from "@/components/PageIntro";

const stories = [
  {
    label: "Range note",
    title: "One catalogue for every surface in the brief.",
    excerpt: "Move from wall emulsions to industrial coatings, wood care, adhesives, and solvents without losing the pack and shade detail that makes an order usable.",
    image: "/manus-storage/hero-paint-application_3efc0a71.jpg",
    icon: FileText,
  },
  {
    label: "Colour practice",
    title: "Specify colour in context, not in isolation.",
    excerpt: "The BS 4800 explorer and room visualizer work together so a shade decision begins with a reference and ends with a considered finish.",
    image: "/manus-storage/hero-palette_52df31ee.jpg",
    icon: BookOpen,
  },
  {
    label: "Apex / Premier Coat",
    title: "Two brands, one clear route to the right finish.",
    excerpt: "Our digital tools bring the decorative and technical range into one place, with the Apex team available for quantities, specification, and trade enquiries.",
    image: "/manus-storage/hero-paint-facade_529dd26e.jpg",
    icon: Megaphone,
  },
];

export default function News() {
  return (
    <>
      <PageIntro
        eyebrow="News & media / field notes"
        title="Useful context for better coating decisions."
        description="Read short notes about colour, range selection, and the working relationship between Apex Coating and Premier Coat. This is a practical editorial desk, not a wall of filler."
        meta="Range notes · colour practice · trade context"
      />
      <section className="bg-white py-14 lg:py-24">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-3">
            {stories.map((story) => {
              const Icon = story.icon;
              return (
                <article key={story.title} className="group border border-slate-200 bg-white transition-shadow hover:shadow-[0_18px_55px_rgba(10,27,61,0.1)]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img src={story.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute left-4 top-4 flex items-center gap-2 bg-[#0A1B3D]/90 px-3 py-2 text-[10px] font-mono uppercase tracking-[0.16em] text-white"><Icon className="h-3.5 w-3.5 text-blue-300" />{story.label}</div>
                  </div>
                  <div className="p-7">
                    <h2 className="font-display text-2xl font-bold leading-tight tracking-[-0.03em] text-[#0A1B3D]">{story.title}</h2>
                    <p className="mt-4 text-sm leading-6 text-slate-600">{story.excerpt}</p>
                    <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#2d75d7]">Read field note <ArrowUpRight className="h-4 w-4" /></div>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mt-14 border-t border-slate-200 pt-6 text-sm text-slate-500">For current stock, quantities, or a project conversation, contact the head office on <a href="tel:+254722252134" className="font-semibold text-[#0A1B3D] hover:text-[#2d75d7]">+254 722 252 134</a>.</div>
        </div>
      </section>
    </>
  );
}
