// Industrial Luxury style reminder: page introductions use an editorial left rail, quiet technical labels, and disciplined navy/stone contrast instead of oversized centered filler.
import { ArrowUpRight } from "lucide-react";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  meta?: string;
}

export default function PageIntro({ eyebrow, title, description, meta }: PageIntroProps) {
  return (
    <section className="border-b border-slate-200 bg-[#f7f8fa] pt-32 pb-14 lg:pt-40 lg:pb-20">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.24em] text-[#2d75d7]">
              <span className="h-px w-9 bg-[#2d75d7]" />
              {eyebrow}
            </div>
            <h1 className="max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-[#0A1B3D] md:text-6xl">
              {title}
            </h1>
          </div>
          <div className="lg:pb-1">
            <p className="max-w-xl text-base leading-7 text-slate-600 md:text-lg">{description}</p>
            {meta && (
              <div className="mt-6 inline-flex items-center gap-2 border-l-2 border-[#2d75d7] pl-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                {meta}
                <ArrowUpRight className="h-3.5 w-3.5 text-[#2d75d7]" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
