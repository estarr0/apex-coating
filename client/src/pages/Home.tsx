import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import Features from "@/components/Features";
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
                src="/manus-storage/brand-banner_e008b465.png"
                alt="Apex Coating & Premier Coat — Two Brands. One Commitment. Quality. Protection. Lasting Beauty."
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Trust badges row below the banner */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Trusted Quality", icon: "star" },
                { label: "Wide Range of Colours", icon: "paint" },
                { label: "Customer Satisfaction Guaranteed", icon: "check" },
                { label: "A Product of Apex Coating E.A Ltd", icon: "brand" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-[#0A1B3D] flex items-center justify-center flex-shrink-0">
                    {item.icon === "star" && (
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-400 fill-current">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    )}
                    {item.icon === "paint" && (
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-blue-400 fill-current">
                        <path d="M18 4V3c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6h1v4H9v11c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-9h8V4h-3z" />
                      </svg>
                    )}
                    {item.icon === "check" && (
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-emerald-400 fill-current">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    )}
                    {item.icon === "brand" && (
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-600 fill-current">
                        <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-slate-700">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Features />
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
