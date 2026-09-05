// Industrial Luxury style reminder: the palette page treats colour as a specification system—precise labels, clear hierarchy, and a restrained gallery rather than a playful swatch wall.
import { useMemo } from "react";
import { BookOpen, Search, SlidersHorizontal } from "lucide-react";
import PageIntro from "@/components/PageIntro";
import ShadeCard from "@/components/ShadeCard";
import { BS4800_COLORS, SHADE_FAMILIES } from "@/lib/bs4800";

export default function BS4800() {
  const initialSearch = useMemo(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("search") || "";
  }, []);

  return (
    <>
      <PageIntro
        eyebrow="Colour intelligence / BS 4800"
        title="A standard palette for decisive colour choices."
        description="Search by code, named shade, or family. When a shade is right, choose the finish and pack size without leaving the palette."
        meta={`${BS4800_COLORS.length} indexed shades · ${SHADE_FAMILIES.length} colour families`}
      />
      <section className="border-b border-slate-200 bg-white">
        <div className="container grid gap-4 py-6 md:grid-cols-3">
          <div className="flex items-start gap-3 border-l-2 border-[#2d75d7] pl-4">
            <Search className="mt-0.5 h-4 w-4 text-[#2d75d7]" />
            <div><p className="text-sm font-bold text-[#0A1B3D]">Search by code or name</p><p className="mt-1 text-xs leading-5 text-slate-500">Try “10 B 17”, “Mistletoe”, or “Blue”.</p></div>
          </div>
          <div className="flex items-start gap-3 border-l-2 border-[#238b68] pl-4">
            <SlidersHorizontal className="mt-0.5 h-4 w-4 text-[#238b68]" />
            <div><p className="text-sm font-bold text-[#0A1B3D]">Filter by family</p><p className="mt-1 text-xs leading-5 text-slate-500">Move from quiet neutrals to fresh greens and blues.</p></div>
          </div>
          <div className="flex items-start gap-3 border-l-2 border-[#b46a2d] pl-4">
            <BookOpen className="mt-0.5 h-4 w-4 text-[#b46a2d]" />
            <div><p className="text-sm font-bold text-[#0A1B3D]">Order the specification</p><p className="mt-1 text-xs leading-5 text-slate-500">Every order retains the shade code, finish, and pack detail.</p></div>
          </div>
        </div>
      </section>
      <ShadeCard externalSearch={initialSearch} />
    </>
  );
}
