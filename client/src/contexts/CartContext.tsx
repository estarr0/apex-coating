import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  sizeLabel: string;
  sizeVolume: string;
  price: number;
  quantity: number;
  bsCode: string;
  colorName: string;
  colorHex: string;
  finishType?: string; // e.g. "Plastic Emulsion", "Gloss Enamel", etc.
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id" | "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);

  const addItem = useCallback((item: Omit<CartItem, "id" | "quantity">) => {
    const id = `${item.productId}-${item.sizeLabel}-${item.bsCode}-${item.finishType || ""}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, id, quantity: 1 }];
    });
    setCartOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        itemCount,
        isCartOpen,
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
