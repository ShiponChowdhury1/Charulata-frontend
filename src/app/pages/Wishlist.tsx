import { Link } from "react-router";
import { Heart, ShoppingBag, X } from "lucide-react";
import { useShop, formatTk } from "../lib/store";
import { PRODUCTS } from "../lib/data";
import { ProductCard } from "../components/ProductCard";
import { toast } from "sonner";

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useShop();
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));
  const recs = PRODUCTS.filter((p) => !wishlist.includes(p.id)).slice(0, 4);

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-10">
      <h1 className="font-display text-white text-4xl md:text-5xl">Your Wishlist</h1>
      <p className="text-white/60 mt-1">{items.length} pieces saved for later</p>

      {items.length === 0 ? (
        <div className="glass rounded-3xl p-16 text-center mt-10">
          <Heart className="w-12 h-12 text-[#c9a96a] mx-auto" />
          <div className="font-display text-white text-2xl mt-4">No saved pieces yet</div>
          <p className="text-white/60 mt-2">Tap the heart on anything you love to keep it here.</p>
          <Link to="/shop" className="inline-flex mt-6 px-6 h-11 rounded-full btn-gold">Discover Pieces</Link>
        </div>
      ) : (
        <div className="space-y-3 mt-8">
          {items.map((p) => (
            <div key={p.id} className="glass rounded-2xl p-4 flex gap-4 items-center">
              <Link to={`/product/${p.slug}`} className="shrink-0">
                <img src={p.image} className="w-24 h-32 object-cover rounded-xl" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${p.slug}`} className="font-display text-white text-lg block truncate">{p.name}</Link>
                <div className="text-xs text-white/50 font-bengali">{p.bn}</div>
                <div className="text-[#c9a96a] mt-1">{formatTk(p.price)}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { addToCart(p); toast.success("Moved to bag"); }} className="px-4 h-10 rounded-full btn-gold text-sm flex items-center gap-2"><ShoppingBag className="w-4 h-4" /> Move to Bag</button>
                <button onClick={() => toggleWishlist(p.id)} className="w-10 h-10 grid place-items-center rounded-full glass text-white/70 hover:text-white"><X className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-16">
        <h2 className="font-display text-white text-2xl md:text-3xl mb-6">You might also love</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {recs.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </div>
  );
}
