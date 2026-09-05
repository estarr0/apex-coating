import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { formatKES } from "@/lib/products";
import { X, Minus, Plus, Trash2, MessageCircle, Mail, ShoppingBag, Droplets } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const WHATSAPP_NUMBER = "254722252134";
const SALES_EMAIL = "sales@apexcoating.co.ke";

export default function CartDrawer() {
  const { items, isCartOpen, setCartOpen, removeItem, updateQuantity, subtotal, clearCart } = useCart();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailForm, setEmailForm] = useState({ name: "", phone: "", email: "" });

  const handleWhatsAppCheckout = () => {
    let message = "🧱 *APEX COATING EAST AFRICA LTD*\n📦 *ORDER REQUEST*\n\n";
    items.forEach((item, idx) => {
      message += `${idx + 1}. *${item.productName}*\n`;
      message += `   Shade: ${item.colorName} (${item.bsCode})\n`;
      message += `   Finish: ${item.finishType || "Standard"}\n`;
      message += `   Size: ${item.sizeVolume}\n`;
      message += `   Qty: ${item.quantity}\n`;
      message += `   Subtotal: ${formatKES(item.price * item.quantity)}\n\n`;
    });
    message += `━━━━━━━━━━━━━━━\n`;
    message += `*ORDER TOTAL: ${formatKES(subtotal)}*\n`;
    message += `\nPlease confirm availability, pricing, and fulfilment terms directly with our team.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
  };

  const handleEmailCheckout = () => {
    const subject = `Order Request - Apex Coating East Africa Ltd`;
    let body = `Dear Apex Coating Team,\n\n`;
    body += `I would like to place the following order:\n\n`;
    body += `CUSTOMER DETAILS:\n`;
    body += `Name: ${emailForm.name}\n`;
    body += `Phone: ${emailForm.phone}\n`;
    body += `Email: ${emailForm.email}\n\n`;
    body += `ORDER ITEMS:\n`;
    items.forEach((item, idx) => {
      body += `${idx + 1}. ${item.productName}\n`;
      body += `   Shade: ${item.colorName} (${item.bsCode})\n`;
      body += `   Finish: ${item.finishType || "Standard"}\n`;
      body += `   Size: ${item.sizeVolume}\n`;
      body += `   Qty: ${item.quantity}\n`;
      body += `   Price: ${formatKES(item.price * item.quantity)}\n\n`;
    });
    body += `ORDER TOTAL: ${formatKES(subtotal)}\n\n`;
    body += `Please confirm availability, pricing, and fulfilment terms.\n\nThank you.`;
    const mailto = `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setShowEmailModal(false);
  };

  if (!isCartOpen) return null;

  const headerBg = isDark ? "bg-slate-800 border-slate-700" : "bg-[#0A1B3D]";
  const bodyBg = isDark ? "bg-slate-900" : "bg-white";
  const cardBg = isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100";
  const footerBg = isDark ? "bg-slate-800 border-slate-700" : "border-slate-100";
  const footerGradient = isDark ? "from-slate-800 to-slate-900" : "from-white to-slate-50";
  const itemBg = isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100";
  const itemHoverBorder = isDark ? "hover:border-slate-600" : "hover:border-slate-200";
  const nameColor = isDark ? "text-slate-100" : "text-slate-800";
  const subColor = isDark ? "text-slate-400" : "text-slate-500";
  const accentText = isDark ? "text-blue-400" : "text-[#0A1B3D]";

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setCartOpen(false)} />

      {/* Drawer */}
      <div className={`fixed right-0 top-0 bottom-0 z-50 w-full max-w-lg shadow-2xl animate-slide-in-right flex flex-col transition-colors duration-500 ${bodyBg}`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-5 border-b ${headerBg}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white leading-tight">Your Cart</h2>
              <span className="text-xs text-blue-300 font-medium">{items.length} item{items.length !== 1 ? "s" : ""}</span>
            </div>
          </div>
          <button onClick={() => setCartOpen(false)} className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center text-white/80 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-5 ${isDark ? "bg-slate-800" : "bg-slate-50"}`}>
                <ShoppingBag className={`w-12 h-12 ${isDark ? "text-slate-600" : "text-slate-300"}`} />
              </div>
              <p className={`font-semibold text-lg mb-1 ${isDark ? "text-slate-200" : "text-slate-600"}`}>Your cart is empty</p>
              <p className={`text-sm mb-6 max-w-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                Select a shade from the BS 4800 card or browse products to add items.
              </p>
              <button onClick={() => setCartOpen(false)} className="px-6 py-3 bg-[#0A1B3D] hover:bg-[#15294f] text-white text-sm font-semibold rounded-xl transition-colors">
                Browse Products
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className={`relative rounded-xl p-3.5 transition-colors ${itemBg} border ${itemHoverBorder}`} style={{ boxShadow: isDark ? "0 1px 3px rgba(0,0,0,0.2)" : "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <div className="flex gap-3">
                    <div className="w-[68px] h-[68px] rounded-lg overflow-hidden bg-slate-50 flex-shrink-0 border border-slate-100">
                      <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-bold leading-tight ${nameColor}`}>{item.productName}</div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className="w-3 h-3 rounded-full border border-slate-200 shadow-sm" style={{ backgroundColor: item.colorHex }} />
                        <span className="font-mono text-[11px] font-semibold text-slate-700">{item.bsCode}</span>
                        <span className={`text-[11px] truncate ${isDark ? "text-slate-400" : "text-slate-500"}`}>{item.colorName}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {item.finishType && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 rounded text-[10px] font-medium text-blue-700">
                            <Droplets className="w-2.5 h-2.5" />
                            {item.finishType}
                          </span>
                        )}
                        <span className={`text-[11px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>{item.sizeVolume}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${isDark ? "bg-slate-700 border border-slate-600 hover:bg-slate-600" : "bg-slate-50 border border-slate-200 hover:bg-slate-100"}`}>
                            <Minus className={`w-3 h-3 ${isDark ? "text-slate-400" : "text-slate-500"}`} />
                          </button>
                          <span className={`text-sm font-semibold w-6 text-center ${isDark ? "text-slate-200" : "text-slate-700"}`}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${isDark ? "bg-slate-700 border border-slate-600 hover:bg-slate-600" : "bg-slate-50 border border-slate-200 hover:bg-slate-100"}`}>
                            <Plus className={`w-3 h-3 ${isDark ? "text-slate-400" : "text-slate-500"}`} />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-bold ${accentText}`}>{formatKES(item.price * item.quantity)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors" title="Remove">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button onClick={clearCart} className={`text-xs ${isDark ? "text-slate-500 hover:text-red-400" : "text-slate-400 hover:text-red-500"} transition-colors mt-2`}>
                Clear all items
              </button>
            </div>
          )}
        </div>

        {/* Footer with Checkout */}
        {items.length > 0 && (
          <div className={`border-t p-5 space-y-3 bg-gradient-to-b ${footerBg} ${footerGradient} transition-colors`}>
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className={`text-sm ${subColor}`}>Subtotal</span>
              <span className={`font-display font-bold text-2xl ${accentText}`}>{formatKES(subtotal)}</span>
            </div>

            <p className={`text-[11px] ${isDark ? "text-slate-500" : "text-slate-400"} leading-relaxed`}>
              Delivery and collection details will be confirmed directly with our team after you submit your order.
            </p>

            {/* Dual Checkout */}
            <div className="space-y-2">
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#25D366] hover:bg-[#1FB855] text-white font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] hover:shadow-[0_6px_16px_rgba(37,211,102,0.3)]"
              >
                <MessageCircle className="w-5 h-5" />
                Instant WhatsApp Order
              </button>
              <button
                onClick={() => setShowEmailModal(true)}
                className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#0A1B3D] hover:bg-[#15294f] text-white font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] hover:shadow-[0_6px_16px_rgba(10,27,61,0.3)]"
              >
                <Mail className="w-5 h-5" />
                Request Official Quote
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowEmailModal(false)}>
          <div className={`rounded-2xl max-w-md w-full shadow-2xl animate-fade-up overflow-hidden transition-colors ${isDark ? "bg-slate-800" : "bg-white"}`} onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-slate-100 bg-[#0A1B3D]">
              <h3 className="font-display font-bold text-lg text-white">Request Official Quote</h3>
              <p className="text-xs text-blue-200 mt-1">We'll send your order details to {SALES_EMAIL}</p>
            </div>
            <div className="p-5 space-y-3">
              <div>
                <label className={`text-xs font-medium mb-1 block ${isDark ? "text-slate-400" : "text-slate-500"}`}>Full Name</label>
                <input type="text" value={emailForm.name} onChange={(e) => setEmailForm({ ...emailForm, name: e.target.value })} placeholder="John Doe" className={`w-full px-4 py-2.5 rounded-xl border outline-none text-sm ${isDark ? "border-slate-600 bg-slate-700 text-slate-200 placeholder:text-slate-500 focus:border-blue-500" : "border-slate-200 text-slate-700 focus:border-[#0A1B3D]"}`} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-xs font-medium mb-1 block ${isDark ? "text-slate-400" : "text-slate-500"}`}>Phone</label>
                  <input type="tel" value={emailForm.phone} onChange={(e) => setEmailForm({ ...emailForm, phone: e.target.value })} placeholder="+254 722 252 134" className={`w-full px-4 py-2.5 rounded-xl border outline-none text-sm ${isDark ? "border-slate-600 bg-slate-700 text-slate-200 placeholder:text-slate-500 focus:border-blue-500" : "border-slate-200 text-slate-700 focus:border-[#0A1B3D]"}`} />
                </div>
                <div>
                  <label className={`text-xs font-medium mb-1 block ${isDark ? "text-slate-400" : "text-slate-500"}`}>Email</label>
                  <input type="email" value={emailForm.email} onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })} placeholder="john@example.com" className={`w-full px-4 py-2.5 rounded-xl border outline-none text-sm ${isDark ? "border-slate-600 bg-slate-700 text-slate-200 placeholder:text-slate-500 focus:border-blue-500" : "border-slate-200 text-slate-700 focus:border-[#0A1B3D]"}`} />
                </div>
              </div>
            </div>
            <div className={`p-5 border-t flex gap-3 ${isDark ? "border-slate-700" : "border-slate-100"}`}>
              <button onClick={() => setShowEmailModal(false)} className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-colors ${isDark ? "border-slate-600 text-slate-400 hover:bg-slate-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>Cancel</button>
              <button onClick={handleEmailCheckout} className="flex-1 py-2.5 rounded-xl bg-[#0A1B3D] text-white text-sm font-semibold hover:bg-[#15294f] transition-colors">Send Order</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
