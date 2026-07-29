import { useState, useEffect } from "react";
import { Search, ShoppingCart, Menu, X, Palette } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface NavbarProps {
  onSearch: (query: string) => void;
  onNavigate: (section: string) => void;
}

export default function Navbar({ onSearch, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { itemCount, setCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const categories = [
    { label: "Decorative", section: "products" },
    { label: "Industrial", section: "products" },
    { label: "Automotive", section: "products" },
    { label: "Wood Finishes", section: "products" },
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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass-nav shadow-[0_2px_20px_rgba(10,27,61,0.08)]"
            : "bg-[#0A1B3D]"
        }`}
      >
        <nav className="container flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNav("hero")}
            className="flex items-center gap-2 group"
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <path d="M20 4 L36 34 L4 34 Z" fill="none" stroke={scrolled ? "#0A1B3D" : "#FFFFFF"} strokeWidth="2.5" strokeLinejoin="round" />
                <circle cx="20" cy="14" r="3" fill={scrolled ? "#2563EB" : "#60A5FA"} />
                <path d="M20 17 L20 34" stroke={scrolled ? "#2563EB" : "#60A5FA"} strokeWidth="2" />
              </svg>
            </div>
            <div className="hidden sm:block text-left">
              <div className={`font-display font-bold text-lg leading-none ${scrolled ? "text-[#0A1B3D]" : "text-white"}`}>
                APEX
              </div>
              <div className={`text-[10px] tracking-widest uppercase ${scrolled ? "text-slate-500" : "text-blue-200"}`}>
                Coating EA
              </div>
            </div>
          </button>

          {/* Desktop Categories */}
          <div className="hidden lg:flex items-center gap-6">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => handleNav(cat.section)}
                className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                  scrolled ? "text-slate-700" : "text-blue-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
            <button
              onClick={() => handleNav("shade-card")}
              className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                scrolled ? "text-slate-700" : "text-blue-100"
              }`}
            >
              Color Selector
            </button>
            <button
              onClick={() => handleNav("visualizer")}
              className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                scrolled ? "text-slate-700" : "text-blue-100"
              }`}
            >
              Visualizer
            </button>
          </div>

          {/* Search + Cart */}
          <div className="flex items-center gap-3">
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className={`flex items-center rounded-full overflow-hidden border transition-all ${
                scrolled ? "border-slate-200 bg-white" : "border-white/20 bg-white/10"
              }`}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search BS code..."
                  className={`w-32 lg:w-40 px-3 py-1.5 text-sm bg-transparent outline-none ${
                    scrolled ? "text-slate-700 placeholder:text-slate-400" : "text-white placeholder:text-blue-200"
                  }`}
                />
                <button type="submit" className={`px-2.5 ${scrolled ? "text-slate-500" : "text-blue-200"}`}>
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            <button
              onClick={() => handleNav("shade-card")}
              className={`hidden md:flex p-2 rounded-full transition-colors ${
                scrolled ? "text-slate-700 hover:bg-slate-100" : "text-blue-100 hover:bg-white/10"
              }`}
              title="Color Selector"
            >
              <Palette className="w-5 h-5" />
            </button>

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

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-full ${
                scrolled ? "text-slate-700" : "text-white"
              }`}
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
                Color Selector
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
