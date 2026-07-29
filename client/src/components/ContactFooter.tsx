import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

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
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
                <span className="text-xs font-mono text-blue-600 tracking-wider uppercase">
                  Get In Touch
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-[#0A1B3D] mb-4">
                Request a Custom Quote
              </h2>
              <p className="text-slate-600 text-lg mb-8">
                Need a bulk order, custom color match, or project consultation? Our team is ready to help you find the perfect coating solution.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0A1B3D] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">Head Office</div>
                    <div className="text-sm text-slate-500">Industrial Area, Mombasa Road, Nairobi, Kenya</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0A1B3D] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">Phone / WhatsApp</div>
                    <div className="text-sm text-slate-500">+254 700 000 000</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0A1B3D] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">Email</div>
                    <div className="text-sm text-slate-500">sales@apexcoating.co.ke</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0A1B3D] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">Business Hours</div>
                    <div className="text-sm text-slate-500">Mon - Sat: 8:00 AM - 6:00 PM | Sun: Closed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white rounded-2xl p-8 swatch-shadow-lg">
              <h3 className="font-display font-bold text-xl text-[#0A1B3D] mb-6">
                Send Us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-400 text-sm text-slate-700"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-400 text-sm text-slate-700"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your project..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-400 text-sm text-slate-700 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] hover:shadow-[0_8px_24px_rgba(37,99,235,0.3)]"
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
      <footer className="bg-[#0A1B3D] text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <svg viewBox="0 0 40 40" className="w-9 h-9">
                  <path d="M20 4 L36 34 L4 34 Z" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinejoin="round" />
                  <circle cx="20" cy="14" r="3" fill="#60A5FA" />
                  <path d="M20 17 L20 34" stroke="#60A5FA" strokeWidth="2" />
                </svg>
                <div>
                  <div className="font-display font-bold text-lg">APEX</div>
                  <div className="text-[10px] tracking-widest uppercase text-blue-200">Coating EA</div>
                </div>
              </div>
              <p className="text-sm text-blue-200 leading-relaxed">
                Premium industrial and decorative coatings engineered for East Africa. Every shade, every surface, every standard.
              </p>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-blue-300 mb-4">
                Products
              </h4>
              <ul className="space-y-2 text-sm text-blue-200">
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
              <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-blue-300 mb-4">
                Resources
              </h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><a href="#shade-card" className="hover:text-white transition-colors">BS 4800 Shade Card</a></li>
                <li><a href="#visualizer" className="hover:text-white transition-colors">Color Visualizer</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Request a Quote</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Find a Dealer</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Technical Data Sheets</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-blue-300 mb-4">
                Contact
              </h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>Industrial Area, Mombasa Road</li>
                <li>Nairobi, Kenya</li>
                <li>+254 700 000 000</li>
                <li>sales@apexcoating.co.ke</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-blue-300">
              © {new Date().getFullYear()} Apex Coating East Africa Ltd. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-blue-300">
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
