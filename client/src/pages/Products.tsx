// Industrial Luxury style reminder: let product imagery and technical facts carry the page; use quiet structure, generous breathing room, and no decorative noise around the catalogue.
import { PackageCheck } from "lucide-react";
import PageIntro from "@/components/PageIntro";
import ProductCatalog from "@/components/ProductCatalog";

export default function Products() {
  return (
    <>
      <PageIntro
        eyebrow="Product catalogue / July 2026 pricing"
        title="Coatings specified for real work."
        description="Explore Apex, Premier Coat, Serafric, and partner product lines by application. Choose a pack, select a shade where applicable, and send an order with the details your team needs."
        meta="Decorative · Industrial · Automotive · Adhesives · Solvents"
      />
      <div className="border-b border-slate-200 bg-white">
        <div className="container flex flex-wrap items-center gap-3 py-5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          <PackageCheck className="h-4 w-4 text-[#2d75d7]" />
          <span>Pack sizes and availability vary by product</span>
          <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />
          <span className="text-slate-400">Contact +254 722 252 134 for trade quantities</span>
        </div>
      </div>
      <ProductCatalog />
    </>
  );
}
