// Industrial Luxury style reminder: keep the chrome restrained, navy-led, and editorial so every functional hub feels like one considered Apex system.
import { useEffect, type ReactNode } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import CartDrawer from "@/components/CartDrawer";

interface SiteShellProps {
  children: ReactNode;
}

export default function SiteShell({ children }: SiteShellProps) {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location]);

  const handleSearch = (query: string) => {
    const trimmed = query.trim();
    setLocation(trimmed ? `/bs-4800?search=${encodeURIComponent(trimmed)}` : "/bs-4800");
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar onSearch={handleSearch} />
      <main>{children}</main>
      <ContactFooter />
      <CartDrawer />
    </div>
  );
}
