import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Droplets } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function ContactFooter() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Custom Quote Request - ${form.name}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`;
    window.location.href = `mailto:sales@apexcoating.co.ke?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; // TODO: Replace email with real address
  };

  const contactBg = isDark ? "bg-slate-900" : "bg-slate-50";
  const contactTitle = isDark ? "text-slate-100" : "text-[#0A1B3D]";
  const contactSub = isDark ? "text-slate-400" : "text-slate-600";
  const contactValue = isDark ? "text-slate-300" : "text-slate-700";
  const contactLabel = isDark ? "text-slate-500" : "text-slate-400";
  const formBg = isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100";
  const formTitle = isDark ? "text-white" : "text-[#0A1B3D]";
  const inputBg = isDark ? "bg-slate-700 border-slate-600 text-slate-200 placeholder:text-slate-500 focus:border-blue-500" : "bg-white border-slate-200 text-slate-700 focus:border-[#0A1B3D]";
  const labelColor = isDark ? "text-slate-400" : "text-slate-400";

  return (
    <>
      {/* Contact Section */}
      <section id="contact" className={`py-20 lg:py-28 ${contactBg} transition-colors duration-500`}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Info */}
            <div>
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-4 ${isDark ? "bg-blue-500/10 border-blue-400/20" : "bg-[#0A1B3D]/5 border-[#0A1B3D]/10"}`}>
                <span className={`font-mono text-[10px] tracking-widest uppercase ${isDark ? "text-blue-400" : "text-[#0A1B3D]"}`}>
                  Contact & Inquiry
                </span>
              </div>
              <h2 className={`font-display font-bold text-3xl md:text-4xl ${contactTitle} mb-4 transition-colors`}>
                Request a Custom Quote
              </h2>
              <p className={`${contactSub} text-lg mb-8`}>
                Need a bulk order, custom color match, or project consultation? Our team is ready to help.
              </p>

              <div className="space-y-4">
                {[
                  { icon: MapPin, label: "Head Office", value: "Industrial Area, Mombasa Road, Nairobi, Kenya" },
                  { icon: Phone, label: "Phone / WhatsApp", value: "+254 7XX XXX XXX" },
                  { icon: Mail, label: "Email", value: "sales@apexcoating.co.ke" },
                  { icon: Clock, label: "Business Hours", value: "Mon - Sat: 8:00 AM - 6:00 PM" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? "bg-blue-600" : "bg-[#0A1B3D]"}`}>
                      <Icon className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div>
                      <div className={`text-xs font-mono uppercase tracking-wider mb-0.5 ${contactLabel}`}>{label}</div>
                      <div className={`text-sm font-medium ${contactValue}`}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Product line accent strip */}
              <div className="mt-8 flex gap-1">
                {["#2563EB", "#0A1B3D", "#DC2626", "#16A34A", "#CA8A04", "#7C3AED"].map((color) => (
                  <div key={color} className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div className={`rounded-2xl p-8 swatch-shadow-lg border transition-colors ${formBg}`}>
              <div className={`font-mono text-[10px] uppercase tracking-wider mb-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>REF: Q-2026</div>
              <h3 className={`font-display font-bold text-xl ${formTitle} mb-6`}>
                Send Us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 block ${labelColor}`}>Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 rounded-xl border outline-none text-sm transition-all ${inputBg}`}
                  />
                </div>
                <div>
                  <label className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 block ${labelColor}`}>Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3 rounded-xl border outline-none text-sm transition-all ${inputBg}`}
                  />
                </div>
                <div>
                  <label className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 block ${labelColor}`}>Message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your project..."
                    className={`w-full px-4 py-3 rounded-xl border outline-none text-sm resize-none transition-all ${inputBg}`}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0A1B3D] hover:bg-[#15294f] text-white font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] hover:shadow-[0_8px_24px_rgba(10,27,61,0.2)]"
                >
                  <Send className="w-4 h-4" />
                  Send Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`text-white relative overflow-hidden transition-colors ${isDark ? "bg-slate-950" : "bg-[#0A1B3D]"}`}>
        {/* Paint splash accent */}
        <div className="absolute -bottom-8 -right-8 w-60 h-60 opacity-[0.04]">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path d="M100 10 Q130 50, 160 60 Q180 70, 170 90 Q160 120, 140 150 Q120 180, 100 185 Q80 180, 60 150 Q40 120, 30 90 Q20 70, 40 60 Q70 50, 100 10Z" fill="white" />
            <path d="M100 40 Q120 60, 130 70 Q140 80, 135 90 Q125 105, 110 115 Q95 125, 100 10Z" fill="#D42020" opacity="0.5" />
          </svg>
        </div>
        {/* Two Brands tagline */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="container py-3 flex items-center justify-center gap-2 border-b border-white/5">
          <span className="text-[10px] font-mono text-blue-300/40 tracking-wider">
            Two Brands. One Commitment. Quality. Protection. Lasting Beauty.
          </span>
        </div>

        <div className="container py-14">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <svg viewBox="0 0 120 100" className="w-12 h-10">
                  <path d="M60 5 L95 45 L80 45 L60 18 L40 45 L25 45 Z" fill="#1B5299" />
                  <path d="M30 45 L45 70 L15 70 Z" fill="#1B5299" />
                  <path d="M90 45 L105 70 L75 70 Z" fill="#1B5299" />
                  <path d="M60 72 L72 85 L60 98 L48 85 Z" fill="#1B5299" />
                  <path d="M35 72 L48 85 L35 98 L22 85 Z" fill="#2E8B3E" />
                  <path d="M85 72 L98 85 L85 98 L72 85 Z" fill="#D42020" />
                </svg>
                <div>
                  <div className="font-display font-extrabold text-base tracking-tight">Apex Coating</div>
                  <div className="text-[9px] tracking-widest uppercase text-blue-300/60">E.A Ltd</div>
                </div>
              </div>
              <p className="text-sm text-blue-200/60 leading-relaxed">
                Premium industrial and decorative coatings engineered for East Africa. Every shade, every surface, every standard.
              </p>
              <div className="flex gap-0.5 mt-4">
                {["#2563EB", "#0A1B3D", "#DC2626", "#16A34A", "#CA8A04", "#7C3AED"].map((color) => (
                  <div key={color} className="w-5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-blue-400 mb-4">Product Lines</h4>
              <ul className="space-y-2 text-sm text-blue-200/70">
                <li><a href="#products" className="hover:text-white transition-colors">WeatherShield Exterior</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Silk Emulsion</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Industrial Primer</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Gloss Enamel</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Wood Finish</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">RoofGuard</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-blue-400 mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-blue-200/70">
                <li><a href="#shade-card" className="hover:text-white transition-colors">BS 4800 Shade Card</a></li>
                <li><a href="#visualizer" className="hover:text-white transition-colors">Color Visualizer</a></li>
                <li><a href="#mixer" className="hover:text-white transition-colors">Paint Mixer</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Request a Quote</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Technical Data Sheets</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-blue-400 mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-blue-200/70">
                <li>Industrial Area, Mombasa Road</li>
                <li>Nairobi, Kenya</li>
                <li>+254 7XX XXX XXX</li>
                <li>sales@apexcoating.co.ke</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-blue-300/50">
              © {new Date().getFullYear()} Apex Coating East Africa Ltd. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-blue-300/50">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Warranty</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
