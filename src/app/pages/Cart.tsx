import { Link } from "react-router";
import { Minus, Plus, Trash2, Tag, ShoppingBag, ArrowRight } from "lucide-react";
import { useShop, formatTk } from "../lib/store";
import { PRODUCTS } from "../lib/data";
import { ProductCard } from "../components/ProductCard";
import { useState } from "react";
import { toast } from "sonner";

export default function Cart() {
  const { cart, updateQty, removeFromCart, cartTotal, addToCart } = useShop();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const shipping = cartTotal > 5000 || cart.length === 0 ? 0 : 120;
  const total = Math.max(0, cartTotal - discount + shipping);

  const apply = () => {
    if (coupon.toUpperCase() === "CHARU10") { setDiscount(Math.round(cartTotal * 0.1)); toast.success("CHARU10 applied — 10% off"); }
    else toast.error("Invalid coupon");
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-16">
        <div className="glass rounded-3xl p-12 md:p-20 text-center">
          <div className="w-20 h-20 rounded-full glass mx-auto grid place-items-center mb-6"><ShoppingBag className="w-9 h-9 text-[#c9a96a]" /></div>
          <h1 className="font-display text-white text-4xl">Your bag is empty</h1>
          <p className="text-white/60 mt-3 max-w-md mx-auto">Begin your journey through the Charulata maison — curated for every ceremony, every day.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 mt-7 px-6 h-12 rounded-full btn-gold glow-soft">Browse Collections <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-10">
      <h1 className="font-display text-white text-4xl md:text-5xl">Shopping Bag</h1>
      <p className="text-white/60 mt-1">{cart.length} pieces · curated by you</p>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8 mt-10">
        <div className="space-y-3">
          {cart.map((i) => (
            <div key={i.product.id} className="glass rounded-2xl p-4 flex gap-4">
              <Link to={`/product/${i.product.slug}`} className="shrink-0">
                <img src={i.product.image} className="w-24 h-32 object-cover rounded-xl" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-display text-white text-lg truncate">{i.product.name}</div>
                    <div className="text-xs text-white/50 font-bengali">{i.product.bn}</div>
                    <div className="text-xs text-white/50 mt-1">{i.color && `Color: ${i.color}`} {i.size && `· Size: ${i.size}`}</div>
                  </div>
                  <button onClick={() => removeFromCart(i.product.id)} className="text-white/50 hover:text-white"><Trash2 className="w-4 h-4" /></button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="glass rounded-full flex items-center">
                    <button onClick={() => updateQty(i.product.id, i.qty - 1)} className="w-9 h-9 grid place-items-center text-white"><Minus className="w-3 h-3" /></button>
                    <span className="w-8 text-center text-white text-sm">{i.qty}</span>
                    <button onClick={() => updateQty(i.product.id, i.qty + 1)} className="w-9 h-9 grid place-items-center text-white"><Plus className="w-3 h-3" /></button>
                  </div>
                  <div className="text-[#c9a96a]">{formatTk(i.product.price * i.qty)}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Cross-sell */}
          <div className="mt-12">
            <h3 className="font-display text-white text-2xl mb-5">Pairs beautifully with</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {PRODUCTS.slice(0, 4).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 h-fit">
          <div className="glass-strong rounded-3xl p-6">
            <div className="font-display text-white text-2xl mb-5">Order Summary</div>

            <div className="flex gap-2 mb-5">
              <div className="glass rounded-xl flex items-center gap-2 px-3 flex-1">
                <Tag className="w-4 h-4 text-white/60" />
                <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon (try CHARU10)" className="bg-transparent outline-none text-sm text-white py-3 flex-1 placeholder:text-white/40" />
              </div>
              <button onClick={apply} className="px-4 rounded-xl btn-gold text-sm">Apply</button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-white/80"><span>Subtotal</span><span>{formatTk(cartTotal)}</span></div>
              <div className="flex justify-between text-white/80"><span>Discount</span><span className="text-emerald-400">−{formatTk(discount)}</span></div>
              <div className="flex justify-between text-white/80"><span>Delivery</span><span>{shipping === 0 ? "Complimentary" : formatTk(shipping)}</span></div>
              <div className="border-t border-white/10 pt-3 flex justify-between text-white text-lg font-display">
                <span>Total</span><span className="gradient-text">{formatTk(total)}</span>
              </div>
            </div>

            <Link to="/checkout" className="mt-6 w-full h-12 rounded-full btn-gold flex items-center justify-center gap-2 glow-soft">
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/shop" className="mt-3 w-full h-11 rounded-full glass text-white flex items-center justify-center text-sm">Continue Shopping</Link>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-white/50">
              <span className="px-2 py-1 rounded glass">bKash</span><span className="px-2 py-1 rounded glass">Nagad</span><span className="px-2 py-1 rounded glass">VISA</span><span className="px-2 py-1 rounded glass">COD</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
