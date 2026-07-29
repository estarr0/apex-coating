import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import Features from "@/components/Features";
import ShadeCard from "@/components/ShadeCard";
import ColorVisualizer from "@/components/ColorVisualizer";
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
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSearch={setSearchQuery} onNavigate={handleNavigate} />
      <main>
        <HeroCarousel onNavigate={handleNavigate} />
        <Features />
        <ShadeCard externalSearch={searchQuery} />
        <ColorVisualizer />
        <ProductCatalog />
        <ContactFooter />
      </main>
      <CartDrawer />
    </div>
  );
}
