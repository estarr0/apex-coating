import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import Features from "@/components/Features";
import ProductCollage from "@/components/ProductCollage";
import ShadeCard from "@/components/ShadeCard";
import ColorVisualizer from "@/components/ColorVisualizer";
import CustomPaintMixer from "@/components/CustomPaintMixer";
import ProductCatalog from "@/components/ProductCatalog";
import ContactFooter from "@/components/ContactFooter";
import CartDrawer from "@/components/CartDrawer";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleNavigate = useCallback((section: string) => {
    if (section === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(section);
    if (el) {
      const navHeight = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSearch={setSearchQuery} onNavigate={handleNavigate} />
      <main>
        <HeroCarousel onNavigate={handleNavigate} />

        {/* Brand Banner — The actual dual-brand marketing image */}
        <section className="py-12 lg:py-16 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
          <div className="container">
            <div className="rounded-2xl overflow-hidden swatch-shadow-lg">
              <img
                src="/manus-storage/dual-brand-banner_3672e58c.png"
                alt="Apex Coating E.A Ltd & Premier Coat — Two Brands. One Commitment. Quality. Protection. Lasting Beauty."
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Trust badges row below the banner */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { label: "Superior Protection", icon: "shield" },
                { label: "Excellent Finish", icon: "paint" },
                { label: "Long Lasting Durability", icon: "clock" },
                { label: "Environmentally Friendly", icon: "leaf" },
                { label: "Trusted Quality", icon: "star" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 px-3 py-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-[#0A1B3D] flex items-center justify-center flex-shrink-0">
                    {item.icon === "shield" && (
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-blue-400 fill-current">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                      </svg>
                    )}
                    {item.icon === "paint" && (
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-blue-400 fill-current">
                        <path d="M18 4V3c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6h1v4H9v11c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-9h8V4h-3z" />
                      </svg>
                    )}
                    {item.icon === "clock" && (
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-emerald-400 fill-current">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                      </svg>
                    )}
                    {item.icon === "leaf" && (
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-emerald-400 fill-current">
                        <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
                      </svg>
                    )}
                    {item.icon === "star" && (
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-400 fill-current">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 leading-tight">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Features />
        <ProductCollage />
        <ShadeCard externalSearch={searchQuery} />
        <ColorVisualizer />
        <CustomPaintMixer />
        <ProductCatalog />
        <ContactFooter />
      </main>
      <CartDrawer />
    </div>
  );
}
