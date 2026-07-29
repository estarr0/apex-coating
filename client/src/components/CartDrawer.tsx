import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { formatKES } from "@/lib/products";
import { X, Minus, Plus, Trash2, MessageCircle, Mail, ShoppingBag } from "lucide-react";

const WHATSAPP_NUMBER = "254700000000"; // Apex Coating official WhatsApp line
const SALES_EMAIL = "sales@apexcoating.co.ke";

export default function CartDrawer() {
  const { items, isCartOpen, setCartOpen, removeItem, updateQuantity, subtotal, clearCart } = useCart();
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailForm, setEmailForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
  });

  const handleWhatsAppCheckout = () => {
    let message = "🧱 *APEX COATING EAST AFRICA LTD*\n📦 *ORDER REQUEST*\n\n";
    items.forEach((item, idx) => {
      message += `${idx + 1}. *${item.productName}*\n`;
      message += `   Size: ${item.sizeVolume}\n`;
      message += `   Color: ${item.bsCode} - ${item.colorName}\n`;
      message += `   Qty: ${item.quantity}\n`;
      message += `   Price: ${formatKES(item.price * item.quantity)}\n\n`;
    });
    message += `━━━━━━━━━━━━━━━\n`;
    message += `*TOTAL: ${formatKES(subtotal)}*\n\n`;
    message += `Please confirm availability and delivery terms.`;

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
    body += `Email: ${emailForm.email}\n`;
    body += `Location: ${emailForm.location}\n\n`;
    body += `ORDER ITEMS:\n`;
    items.forEach((item, idx) => {
      body += `${idx + 1}. ${item.productName}\n`;
      body += `   Size: ${item.sizeVolume}\n`;
      body += `   Color: ${item.bsCode} - ${item.colorName}\n`;
      body += `   Quantity: ${item.quantity}\n`;
      body += `   Price: ${formatKES(item.price * item.quantity)}\n\n`;
    });
    body += `TOTAL ESTIMATED: ${formatKES(subtotal)}\n\n`;
    body += `Please confirm availability, delivery, and payment terms.\n\n`;
    body += `Thank you.`;

    const mailto = `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setShowEmailModal(false);
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-[#0A1B3D]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-white" />
            <h2 className="font-display font-bold text-lg text-white">
              Your Cart
            </h2>
            <span className="text-sm text-blue-200">({items.length})</span>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-slate-300" />
              </div>
              <p className="text-slate-400 font-medium mb-1">Your cart is empty</p>
              <p className="text-sm text-slate-400 mb-6">Add some colors or products to get started</p>
              <button
                onClick={() => setCartOpen(false)}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-slate-50 rounded-xl p-3"
                >
                  {/* Product image */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-800 truncate">
                      {item.productName}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div
                        className="w-3 h-3 rounded-full border border-slate-200"
                        style={{ backgroundColor: item.colorHex }}
                      />
                      <span className="font-mono text-xs text-slate-500">
                        {item.bsCode}
                      </span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs text-slate-500">{item.sizeLabel}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors"
                        >
                          <Minus className="w-3 h-3 text-slate-600" />
                        </button>
                        <span className="text-sm font-medium text-slate-700 w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors"
                        >
                          <Plus className="w-3 h-3 text-slate-600" />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-[#0A1B3D]">
                          {formatKES(item.price * item.quantity)}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-red-500 hover:text-red-600 flex items-center gap-0.5 mt-0.5"
                        >
                          <Trash2 className="w-3 h-3" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="text-xs text-slate-400 hover:text-red-500 transition-colors"
              >
                Clear all items
              </button>
            </div>
          )}
        </div>

        {/* Footer with Checkout */}
        {items.length > 0 && (
          <div className="border-t border-slate-100 p-5 space-y-4 bg-white">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Subtotal</span>
              <span className="font-display font-bold text-2xl text-[#0A1B3D]">
                {formatKES(subtotal)}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Final pricing confirmed upon order verification. Delivery fees calculated based on location.
            </p>

            {/* Dual Checkout */}
            <div className="space-y-2">
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#1FB855] text-white font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] hover:shadow-[0_6px_16px_rgba(37,211,102,0.3)]"
              >
                <MessageCircle className="w-5 h-5" />
                Send Order via WhatsApp
              </button>
              <button
                onClick={() => setShowEmailModal(true)}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#0A1B3D] hover:bg-[#15294f] text-white font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] hover:shadow-[0_6px_16px_rgba(10,27,61,0.3)]"
              >
                <Mail className="w-5 h-5" />
                Request Quote via Email
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowEmailModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-fade-up overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-slate-100">
              <h3 className="font-display font-bold text-lg text-[#0A1B3D]">
                Request Quote via Email
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                We'll format your order and send it to {SALES_EMAIL}
              </p>
            </div>
            <div className="p-5 space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Full Name</label>
                <input
                  type="text"
                  value={emailForm.name}
                  onChange={(e) => setEmailForm({ ...emailForm, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-400 text-sm text-slate-700"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Phone</label>
                  <input
                    type="tel"
                    value={emailForm.phone}
                    onChange={(e) => setEmailForm({ ...emailForm, phone: e.target.value })}
                    placeholder="+254 700 000 000"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-400 text-sm text-slate-700"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Email</label>
                  <input
                    type="email"
                    value={emailForm.email}
                    onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-400 text-sm text-slate-700"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Location</label>
                <input
                  type="text"
                  value={emailForm.location}
                  onChange={(e) => setEmailForm({ ...emailForm, location: e.target.value })}
                  placeholder="Nairobi, Kenya"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-400 text-sm text-slate-700"
                />
              </div>
            </div>
            <div className="p-5 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => setShowEmailModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEmailCheckout}
                className="flex-1 py-2.5 rounded-xl bg-[#0A1B3D] text-white text-sm font-semibold hover:bg-[#15294f] transition-colors"
              >
                Send Order
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
