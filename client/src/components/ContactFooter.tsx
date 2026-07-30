import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Droplets } from "lucide-react";

export default function ContactFooter() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Custom Quote Request - ${form.name}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`;
    window.location.href = `mailto:sales@apexcoating.co.ke?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-28 bg-slate-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Info */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1B3D]/5 border border-[#0A1B3D]/10 mb-4">
                <span className="font-mono text-[10px] text-[#0A1B3D] tracking-widest uppercase">
                  Contact & Inquiry
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-[#0A1B3D] mb-4">
                Request a Custom Quote
              </h2>
              <p className="text-slate-600 text-lg mb-8">
                Need a bulk order, custom color match, or project consultation? Our team is ready to help.
              </p>

              <div className="space-y-4">
                {[
                  { icon: MapPin, label: "Head Office", value: "Industrial Area, Mombasa Road, Nairobi, Kenya" },
                  { icon: Phone, label: "Phone / WhatsApp", value: "+254 700 000 000" },
                  { icon: Mail, label: "Email", value: "sales@apexcoating.co.ke" },
                  { icon: Clock, label: "Business Hours", value: "Mon - Sat: 8:00 AM - 6:00 PM" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#0A1B3D] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-0.5">{label}</div>
                      <div className="text-sm font-medium text-slate-700">{value}</div>
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
            <div className="bg-white rounded-2xl p-8 swatch-shadow-lg border border-slate-100">
              <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-1">REF: Q-2026</div>
              <h3 className="font-display font-bold text-xl text-[#0A1B3D] mb-6">
                Send Us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#0A1B3D] focus:ring-1 focus:ring-[#0A1B3D]/10 text-sm text-slate-700 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#0A1B3D] focus:ring-1 focus:ring-[#0A1B3D]/10 text-sm text-slate-700 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your project..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#0A1B3D] focus:ring-1 focus:ring-[#0A1B3D]/10 text-sm text-slate-700 resize-none transition-all"
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
      <footer className="bg-[#0A1B3D] text-white relative overflow-hidden">
        {/* Paint drop accent in footer corner */}
        <div className="absolute -bottom-8 -right-8 w-40 h-40 opacity-5">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M50 5 C65 25, 85 45, 85 60 C85 76 68 90 50 90 C32 90 15 76 15 60 C15 45 35 25 50 5Z" fill="white" />
          </svg>
        </div>

        <div className="container py-14">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <svg viewBox="0 0 48 48" className="w-9 h-9">
                  <path d="M24 4 C28 10, 32 14, 32 20 C32 24.4 28.4 28 24 28 C19.6 28 16 24.4 16 20 C16 14 20 10 24 4Z" fill="#60A5FA" opacity="0.9" />
                  <path d="M24 10 L42 42 L6 42 Z" fill="none" stroke="white" strokeWidth="1.5" strokeLinejoin="round" opacity="0.4" />
                  <text x="24" y="36" textAnchor="middle" fill="white" fontSize="9" fontWeight="800">A</text>
                </svg>
                <div>
                  <div className="font-display font-extrabold text-base tracking-tight">APEX COATING</div>
                  <div className="text-[9px] tracking-widest uppercase text-blue-300/60">E.A Ltd</div>
                </div>
              </div>
              <p className="text-sm text-blue-200/60 leading-relaxed">
                Premium industrial and decorative coatings engineered for East Africa. Every shade, every surface, every standard.
              </p>
              {/* Color strip */}
              <div className="flex gap-0.5 mt-4">
                {["#2563EB", "#0A1B3D", "#DC2626", "#16A34A", "#CA8A04", "#7C3AED"].map((color) => (
                  <div key={color} className="w-5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-blue-400 mb-4">
                Product Lines
              </h4>
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
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-blue-400 mb-4">
                Resources
              </h4>
              <ul className="space-y-2 text-sm text-blue-200/70">
                <li><a href="#shade-card" className="hover:text-white transition-colors">BS 4800 Shade Card</a></li>
                <li><a href="#visualizer" className="hover:text-white transition-colors">Color Visualizer</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Request a Quote</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Find a Dealer</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Technical Data Sheets</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-blue-400 mb-4">
                Contact
              </h4>
              <ul className="space-y-2 text-sm text-blue-200/70">
                <li>Industrial Area, Mombasa Road</li>
                <li>Nairobi, Kenya</li>
                <li>+254 700 000 000</li>
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
