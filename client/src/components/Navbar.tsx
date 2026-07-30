import { useState, useEffect, useRef } from "react";
import { Search, ShoppingCart, Menu, X, ChevronDown, Droplets } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface NavbarProps {
  onSearch: (query: string) => void;
  onNavigate: (section: string) => void;
}

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

  // Apex logo SVG with paint-drop accent
  const ApexLogo = ({ size = "w-9 h-9", textColor }: { size?: string; textColor: string }) => (
    <svg viewBox="0 0 48 48" className={size}>
      {/* Paint drop accent */}
      <path d="M24 4 C28 10, 32 14, 32 20 C32 24.4 28.4 28 24 28 C19.6 28 16 24.4 16 20 C16 14 20 10 24 4Z" fill={scrolled ? "#2563EB" : "#60A5FA"} opacity="0.9" />
      {/* Apex triangle frame */}
      <path d="M24 10 L42 42 L6 42 Z" fill="none" stroke={textColor} strokeWidth="2" strokeLinejoin="round" opacity="0.6" />
      <text x="24" y="36" textAnchor="middle" fill={textColor} fontSize="10" fontWeight="800" fontFamily="system-ui">A</text>
    </svg>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass-nav shadow-[0_2px_20px_rgba(10,27,61,0.08)]"
            : "bg-[#0A1B3D]"
        }`}
      >
        <nav className="container flex items-center justify-between h-16 lg:h-[72px]">
          {/* Dual Branding */}
          <div className="flex items-center gap-3 lg:gap-5">
            {/* Apex Logo */}
            <button
              onClick={() => handleNav("hero")}
              className="flex items-center gap-2.5 group"
            >
              <ApexLogo size="w-10 h-10 lg:w-11 lg:h-11" textColor={scrolled ? "#0A1B3D" : "#FFFFFF"} />
              <div className="hidden sm:block text-left">
                <div className={`font-display font-extrabold text-sm lg:text-[15px] tracking-tight leading-none ${scrolled ? "text-[#0A1B3D]" : "text-white"}`}>
                  APEX COATING
                </div>
                <div className={`text-[9px] tracking-widest uppercase ${scrolled ? "text-slate-500" : "text-blue-200/80"}`}>
                  E.A Ltd
                </div>
              </div>
            </button>

            {/* Divider */}
            <div className={`w-px h-9 mx-1 ${scrolled ? "bg-slate-200" : "bg-white/20"}`} />

            {/* Premier Coat Badge */}
            <button
              onClick={() => handleNav("hero")}
              className="flex items-center gap-2"
            >
              <div className="w-9 h-13 flex items-center justify-center">
                <div className={`w-8 h-11 rounded-[50%] border-[1.5px] flex flex-col items-center justify-center px-1 ${scrolled ? "border-[#0A1B3D]" : "border-white/50"}`}>
                  <span className={`text-[6px] font-extrabold leading-[1.1] tracking-wider text-center ${scrolled ? "text-[#0A1B3D]" : "text-white/90"}`}>
                    PREMIER<br />COAT
                  </span>
                </div>
              </div>
              <div className="hidden sm:block text-left">
                <div className={`text-[11px] font-bold leading-none ${scrolled ? "text-slate-700" : "text-white/90"}`}>
                  Premier Coat
                </div>
                <div className={`text-[9px] ${scrolled ? "text-slate-400" : "text-blue-200/60"}`}>
                  by Apex
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-5">
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
              Color Palette
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

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className={`relative p-2 rounded-full transition-colors ${
                scrolled ? "text-slate-700 hover:bg-slate-100" : "text-blue-100 hover:bg-white/10"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
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
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
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
                Color Palette
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
