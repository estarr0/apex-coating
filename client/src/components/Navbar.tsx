import { useState, useEffect, useRef } from "react";
import { Search, ShoppingCart, Menu, X, ChevronDown, Phone } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface NavbarProps {
  onSearch: (query: string) => void;
  onNavigate: (section: string) => void;
}

// Apex Coating logo SVG matching the actual brand
const ApexLogoSVG = ({ size = "w-12 h-12" }: { size?: string }) => (
  <svg viewBox="0 0 120 100" className={size} fill="none">
    <path d="M60 5 L95 45 L80 45 L60 18 L40 45 L25 45 Z" fill="#1B5299" />
    <path d="M30 45 L45 70 L15 70 Z" fill="#1B5299" />
    <path d="M90 45 L105 70 L75 70 Z" fill="#1B5299" />
    <path d="M60 72 L72 85 L60 98 L48 85 Z" fill="#1B5299" />
    <path d="M35 72 L48 85 L35 98 L22 85 Z" fill="#2E8B3E" />
    <path d="M85 72 L98 85 L85 98 L72 85 Z" fill="#D42020" />
  </svg>
);

// Premier Coat oval badge SVG
const PremierCoatBadge = ({ size = "h-12" }: { size?: string }) => (
  <svg viewBox="0 0 120 80" className={size}>
    <ellipse cx="60" cy="40" rx="58" ry="36" fill="#2D1B69" />
    <text x="60" y="32" textAnchor="middle" fill="white" fontSize="16" fontWeight="900" fontFamily="Arial, sans-serif" letterSpacing="2">PREMIER</text>
    <path d="M15 40 Q60 32 105 40" fill="none" stroke="#D42020" strokeWidth="3" />
    <text x="60" y="58" textAnchor="middle" fill="white" fontSize="16" fontStyle="italic" fontWeight="700" fontFamily="Georgia, serif">Coat</text>
  </svg>
);

export default function Navbar({ onSearch, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const { itemCount, setCartOpen } = useCart();

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
    { label: "Seraphic Glues", section: "products", sub: "Industrial Adhesives" },
    { label: "Industrial & Heavy Duty", section: "products", sub: "Epoxy, Chlorinated Rubber" },
    { label: "Thinners & Spirits", section: "products", sub: "Solvents" },
    { label: "Wall Finishes & Coatings", section: "products", sub: "Putty, Sealers, Textured" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    onNavigate("shade-card");
  };

  const handleNav = (section: string) => {
    onNavigate(section);
    setMobileOpen(false);
  };

  const brandTextColor = scrolled ? "#0A1B3D" : "#FFFFFF";
  const brandSubTextColor = scrolled ? "#64748B" : "rgba(191,219,254,0.8)";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-lg shadow-[0_2px_20px_rgba(10,27,61,0.08)]"
            : "bg-[#0A1B3D]"
        }`}
      >
        <nav className="container flex items-center justify-between h-16 lg:h-[72px]">
          {/* Dual Branding */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Apex Logo + Text */}
            <button
              onClick={() => handleNav("hero")}
              className="flex items-center gap-2 group"
            >
              <ApexLogoSVG size="w-10 h-9 lg:w-12 lg:h-10" />
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

            {/* Divider */}
            <div className={`w-px h-9 mx-1 transition-colors ${scrolled ? "bg-slate-200" : "bg-white/20"}`} />

            {/* Premier Coat Badge */}
            <button
              onClick={() => handleNav("hero")}
              className="flex items-center gap-2"
            >
              <PremierCoatBadge size="h-11" />
              <div className="hidden sm:block">
                <div
                  className={`text-[11px] font-bold leading-none transition-colors ${scrolled ? "text-[#2D1B69]" : "text-white/90"}`}
                >
                  Premier Coat
                </div>
                <div
                  className={`text-[9px] transition-colors ${scrolled ? "text-slate-400" : "text-blue-200/60"}`}
                >
                  by Apex
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Category Dropdown */}
            <div ref={categoryRef} className="relative">
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                  scrolled ? "text-slate-700" : "text-blue-100"
                }`}
              >
                Products
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${categoryOpen ? "rotate-180" : ""}`} />
              </button>
              {categoryOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                  {categories.map((cat) => (
                    <button
                      key={cat.label}
                      onClick={() => { handleNav(cat.section); setCategoryOpen(false); }}
                      className="w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors"
                    >
                      <div className="text-sm font-medium text-slate-700">{cat.label}</div>
                      <div className="text-xs text-slate-400">{cat.sub}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav("shade-card")}
              className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                scrolled ? "text-slate-700" : "text-blue-100"
              }`}
            >
              BS 4800 Swatches
            </button>
            <button
              onClick={() => handleNav("visualizer")}
              className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                scrolled ? "text-slate-700" : "text-blue-100"
              }`}
            >
              Visualizer
            </button>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex items-center">
              <div className={`flex items-center rounded-full overflow-hidden border transition-all ${
                scrolled ? "border-slate-200 bg-white" : "border-white/20 bg-white/10"
              }`}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search BS code..."
                  className={`w-32 xl:w-40 px-3 py-1.5 text-sm bg-transparent outline-none ${
                    scrolled ? "text-slate-700 placeholder:text-slate-400" : "text-white placeholder:text-blue-200"
                  }`}
                />
                <button type="submit" className={`px-2.5 ${scrolled ? "text-slate-500" : "text-blue-200"}`}>
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Contact Placeholder */}
            <a
              href="tel:+254XXXXXXXXX"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors ${
                scrolled ? "border-slate-200 text-slate-600 hover:bg-slate-50" : "border-white/20 text-blue-100 hover:bg-white/10"
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Call Us</span>
            </a>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className={`relative p-2 rounded-full transition-colors ${
                scrolled ? "text-slate-700 hover:bg-slate-100" : "text-blue-100 hover:bg-white/10"
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
            <button
              onClick={() => setCartOpen(true)}
              className={`relative p-2 rounded-full ${scrolled ? "text-slate-700" : "text-white"}`}
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
              className={`p-2 rounded-full ${scrolled ? "text-slate-700" : "text-white"}`}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg">
            <div className="container py-4 space-y-3">
              <form onSubmit={handleSearch} className="flex items-center rounded-full overflow-hidden border border-slate-200 bg-slate-50">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search BS code..."
                  className="flex-1 px-4 py-2 text-sm bg-transparent outline-none text-slate-700"
                />
                <button type="submit" className="px-3 text-slate-500">
                  <Search className="w-4 h-4" />
                </button>
              </form>
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => handleNav(cat.section)}
                  className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  {cat.label}
                </button>
              ))}
              <button
                onClick={() => handleNav("shade-card")}
                className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                BS 4800 Swatches
              </button>
              <button
                onClick={() => handleNav("visualizer")}
                className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                Visualizer
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
