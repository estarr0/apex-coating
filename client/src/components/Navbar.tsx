import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Search, ShoppingCart, Menu, X, ChevronDown, Phone, Sun, Moon } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useTheme } from "@/contexts/ThemeContext";

interface NavbarProps {
  onSearch: (query: string) => void;
  onNavigate?: (section: string) => void;
}

// Transparent logo frames keep the official marks integrated into both light and deep-blue navigation surfaces.
// The image treatment is defined globally in index.css: multiply in light mode, normal blend plus a soft white shadow in dark mode.
const ApexLogo = ({ scrolled = false, size = "h-10 lg:h-12" }: { scrolled?: boolean; size?: string }) => (
  <div className="brand-logo-frame flex items-center justify-center shrink-0">
    <img src="/manus-storage/apex-coating-logo-transparent_efef8c63.png" alt="Apex Coating Logo" className={`${scrolled ? "brand-image" : "brand-image brand-image--dark-surface"} ${size} object-contain`} />
  </div>
);

const PremierCoatBadge = ({ scrolled = false, size = "h-9 lg:h-11" }: { scrolled?: boolean; size?: string }) => (
  <div className="brand-logo-frame flex items-center justify-center shrink-0">
    <img src="/manus-storage/logo-premier-coat-hires_3e8fa752.png" alt="Premier Coat Logo" className={`${scrolled ? "brand-image" : "brand-image brand-image--dark-surface"} ${size} object-contain`} />
  </div>
);

export default function Navbar({ onSearch, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [, setLocation] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const { itemCount, setCartOpen } = useCart();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
        setCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const categories = [
    { label: "Decorative & Specialty", section: "products", sub: "Emulsions, Enamels, Varnishes" },
    { label: "Serafric Glues", section: "products", sub: "Industrial Adhesives" },
    { label: "Industrial & Heavy Duty", section: "products", sub: "Epoxy, Chlorinated Rubber" },
    { label: "Thinners & Spirits", section: "products", sub: "Solvents" },
    { label: "Wall Finishes & Coatings", section: "products", sub: "Putty, Sealers, Textured" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    if (onNavigate) onNavigate("shade-card");
    else setLocation(`/bs-4800${searchQuery.trim() ? `?search=${encodeURIComponent(searchQuery.trim())}` : ""}`);
    setMobileOpen(false);
  };

  const handleNav = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    } else {
      const routeMap: Record<string, string> = {
        hero: "/",
        products: "/products",
        "shade-card": "/bs-4800",
        visualizer: "/visualizer",
        mixer: "/mixer",
        tools: "/tools",
        news: "/news",
        about: "/about",
      };
      setLocation(routeMap[section] || "/");
    }
    setMobileOpen(false);
  };

  const brandTextColor = scrolled ? (isDark ? "#E2E8F0" : "#0A1B3D") : "#FFFFFF";
  const brandSubTextColor = scrolled ? (isDark ? "#64748B" : "#64748B") : "rgba(191,219,254,0.8)";
  const navTextColor = scrolled ? (isDark ? "#CBD5E1" : "#334155") : "rgba(191,219,254,0.9)";
  const searchBorderColor = scrolled ? (isDark ? "border-slate-700" : "border-slate-200") : "border-white/20";
  const searchBg = scrolled ? (isDark ? "bg-slate-800" : "bg-white") : "bg-white/10";
  const searchInputColor = scrolled ? (isDark ? "text-slate-200 placeholder:text-slate-500" : "text-slate-700 placeholder:text-slate-400") : "text-white placeholder:text-blue-200";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? (isDark ? "bg-slate-900/95 backdrop-blur-lg shadow-[0_2px_20px_rgba(0,0,0,0.3)]" : "bg-white/95 backdrop-blur-lg shadow-[0_2px_20px_rgba(10,27,61,0.08)]")
            : "bg-[#0A1B3D]"
        }`}
      >
        <nav className="container flex items-center justify-between h-16 lg:h-[72px]">
          {/* Dual Branding — modern, premium logo treatment */}
          <div className="flex items-center gap-3 lg:gap-4">
            <button
              onClick={() => handleNav("hero")}
              className="flex items-center gap-3 group"
            >
              <ApexLogo scrolled={scrolled} size="h-10 lg:h-12" />
              <div className="hidden sm:block">
                <div
                  className="font-display font-extrabold text-sm lg:text-[15px] tracking-tight leading-none transition-colors"
                  style={{ color: brandTextColor }}
                >
                  Apex Coating E.A Ltd
                </div>
                <div
                  className="text-[8px] tracking-wider italic leading-none mt-0.5 transition-colors"
                  style={{ color: scrolled ? "#2E8B3E" : "#4ade80" }}
                >
                  Colours true to Nature
                </div>
              </div>
            </button>

            {/* Elegant divider between brands */}
            <div className={`transition-colors ${scrolled ? (isDark ? "bg-slate-700" : "bg-slate-200") : "bg-white/20"}`} style={{ width: 1, height: 32 }} />

            <button
              onClick={() => handleNav("hero")}
              className="flex items-center gap-3"
            >
              <PremierCoatBadge scrolled={scrolled} size="h-9 lg:h-11" />
              <div className="hidden sm:block">
                <div
                  className={`text-[11px] font-bold leading-none transition-colors ${scrolled ? (isDark ? "text-blue-400" : "text-[#2D1B69]") : "text-white/90"}`}
                >
                  Premier Coat
                </div>
                <div
                  className={`text-[9px] transition-colors ${scrolled ? (isDark ? "text-slate-500" : "text-slate-400") : "text-blue-200/60"}`}
                >
                  by Apex
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => handleNav("hero")}
              className={`text-sm font-medium transition-colors ${
                scrolled ? (isDark ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-blue-500") : "text-blue-100 hover:text-white"
              }`}
            >
              Home
            </button>
            <div ref={categoryRef} className="relative">
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                  scrolled ? (isDark ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-[#0A1B3D]") : "text-blue-100 hover:text-white"
                }`}
              >
                Products
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${categoryOpen ? "rotate-180" : ""}`} />
              </button>
              {categoryOpen && (
                <div className={`absolute top-full left-0 mt-2 w-64 rounded-xl shadow-xl py-2 z-50 ${isDark ? "bg-slate-800 border border-slate-700" : "bg-white border border-slate-100"}`}>
                  {categories.map((cat) => (
                    <button
                      key={cat.label}
                      onClick={() => { handleNav(cat.section); setCategoryOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 transition-colors ${isDark ? "hover:bg-slate-700" : "hover:bg-slate-50"}`}
                    >
                      <div className={`text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}>{cat.label}</div>
                      <div className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>{cat.sub}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav("tools")}
              className={`text-sm font-medium transition-colors ${
                scrolled ? (isDark ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-blue-500") : "text-blue-100 hover:text-white"
              }`}
            >
              Tools
            </button>
            <button
              onClick={() => handleNav("news")}
              className={`text-sm font-medium transition-colors ${
                scrolled ? (isDark ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-blue-500") : "text-blue-100 hover:text-white"
              }`}
            >
              News
            </button>
            <button
              onClick={() => handleNav("about")}
              className={`text-sm font-medium transition-colors ${
                scrolled ? (isDark ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-blue-500") : "text-blue-100 hover:text-white"
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNav("shade-card")}
              className={`text-sm font-medium transition-colors ${
                scrolled ? (isDark ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-blue-500") : "text-blue-100 hover:text-white"
              }`}
            >
              BS 4800 Swatches
            </button>
            <button
              onClick={() => handleNav("visualizer")}
              className={`text-sm font-medium transition-colors ${
                scrolled ? (isDark ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-blue-500") : "text-blue-100 hover:text-white"
              }`}
            >
              Visualizer
            </button>
            <button
              onClick={() => handleNav("mixer")}
              className={`text-sm font-medium transition-colors ${
                scrolled ? (isDark ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-blue-500") : "text-blue-100 hover:text-white"
              }`}
            >
              Color Mixer
            </button>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex items-center">
              <div className={`flex items-center rounded-full overflow-hidden border transition-all ${searchBorderColor} ${searchBg}`}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search BS code..."
                  className={`w-32 xl:w-40 px-3 py-1.5 text-sm bg-transparent outline-none ${searchInputColor}`}
                />
                <button type="submit" className={`px-2.5 ${scrolled ? (isDark ? "text-slate-400" : "text-slate-500") : "text-blue-200"}`}>
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Contact Placeholder */}
            <a
              href="tel:+254722252134"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors ${
                scrolled ? (isDark ? "border-slate-700 text-slate-400 hover:bg-slate-800" : "border-slate-200 text-slate-600 hover:bg-slate-50") : "border-white/20 text-blue-100 hover:bg-white/10"
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Call Us</span>
            </a>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${
                scrolled ? (isDark ? "text-amber-400 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-100") : "text-blue-100 hover:bg-white/10"
              }`}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className={`relative p-2 rounded-full transition-colors ${
                scrolled ? (isDark ? "text-slate-300 hover:bg-slate-800" : "text-slate-700 hover:bg-slate-100") : "text-blue-100 hover:bg-white/10"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${
                scrolled ? (isDark ? "text-amber-400" : "text-slate-600") : "text-white"
              }`}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className={`relative p-2 rounded-full ${scrolled ? (isDark ? "text-slate-300" : "text-slate-700") : "text-white"}`}
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 rounded-full ${scrolled ? (isDark ? "text-slate-300" : "text-slate-700") : "text-white"}`}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className={`lg:hidden border-t shadow-lg transition-colors duration-300 ${isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-100"}`}>
            <div className="container py-4 space-y-3">
              <form onSubmit={handleSearch} className={`flex items-center rounded-full overflow-hidden border ${isDark ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-slate-50"}`}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search BS code..."
                  className={`flex-1 px-4 py-2 text-sm bg-transparent outline-none ${isDark ? "text-slate-200 placeholder:text-slate-500" : "text-slate-700"}`}
                />
                <button type="submit" className={`px-3 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  <Search className="w-4 h-4" />
                </button>
              </form>
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => handleNav(cat.section)}
                  className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isDark ? "text-slate-200 hover:bg-slate-800" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
              <button
                onClick={() => handleNav("products")}
                className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isDark ? "text-slate-200 hover:bg-slate-800" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                Product catalogue
              </button>
              <button
                onClick={() => handleNav("tools")}
                className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isDark ? "text-slate-200 hover:bg-slate-800" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                Tools hub
              </button>
              <button
                onClick={() => handleNav("news")}
                className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isDark ? "text-slate-200 hover:bg-slate-800" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                News & media
              </button>
              <button
                onClick={() => handleNav("about")}
                className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isDark ? "text-slate-200 hover:bg-slate-800" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                About Apex
              </button>
              <button
                onClick={() => handleNav("shade-card")}
                className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isDark ? "text-slate-200 hover:bg-slate-800" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                BS 4800 Swatches
              </button>
              <button
                onClick={() => handleNav("visualizer")}
                className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isDark ? "text-slate-200 hover:bg-slate-800" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                Color Visualizer
              </button>
              <button
                onClick={() => handleNav("mixer")}
                className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isDark ? "text-slate-200 hover:bg-slate-800" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                Color Mixer
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
