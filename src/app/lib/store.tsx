import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "./data";

type CartItem = { product: Product; qty: number; size?: string; color?: string };
type Ctx = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (p: Product, opts?: { size?: string; color?: string; qty?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  toggleWishlist: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
};

const ShopCtx = createContext<Ctx | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(["p2", "p8", "p11"]);

  const addToCart: Ctx["addToCart"] = (p, opts) =>
    setCart((c) => {
      const found = c.find((i) => i.product.id === p.id);
      if (found) return c.map((i) => (i.product.id === p.id ? { ...i, qty: i.qty + (opts?.qty ?? 1) } : i));
      return [...c, { product: p, qty: opts?.qty ?? 1, size: opts?.size, color: opts?.color }];
    });
  const removeFromCart = (id: string) => setCart((c) => c.filter((i) => i.product.id !== id));
  const updateQty = (id: string, qty: number) =>
    setCart((c) => c.map((i) => (i.product.id === id ? { ...i, qty: Math.max(1, qty) } : i)));
  const toggleWishlist = (id: string) =>
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.qty * i.product.price, 0);

  const value = useMemo(
    () => ({ cart, wishlist, addToCart, removeFromCart, updateQty, toggleWishlist, clearCart, cartCount, cartTotal }),
    [cart, wishlist, cartCount, cartTotal]
  );
  return <ShopCtx.Provider value={value}>{children}</ShopCtx.Provider>;
}

export const useShop = () => {
  const c = useContext(ShopCtx);
  if (!c) throw new Error("useShop outside provider");
  return c;
};

export const formatTk = (n: number) =>
  "৳" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
