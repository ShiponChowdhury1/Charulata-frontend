import { Link } from "react-router";
import { Heart, Eye, ShoppingBag, Star } from "lucide-react";
import { motion } from "motion/react";
import { type Product } from "../lib/data";
import { useShop, formatTk } from "../lib/store";
import { toast } from "sonner";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const saved = wishlist.includes(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
      className="group relative"
    >
      <div className="relative rounded-3xl overflow-hidden glass aspect-[4/5] glow-soft">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14110f] via-[#14110f]/20 to-transparent" />
        </Link>

        {/* badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="px-2.5 py-1 text-[10px] tracking-wide rounded-full btn-gold">
              {product.badge}
            </span>
          )}
          {product.discount && (
            <span className="px-2.5 py-1 text-[10px] rounded-full bg-[#14110f]/70 text-[#c9a96a] border border-[#c9a96a]/30 backdrop-blur">
              −{product.discount}%
            </span>
          )}
        </div>

        {/* hover actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition duration-300">
          <button
            onClick={() => { toggleWishlist(product.id); toast.success(saved ? "Removed from wishlist" : "Added to wishlist"); }}
            className={`w-9 h-9 grid place-items-center rounded-full glass-strong text-white hover:glow-soft ${saved ? "text-[#c9a96a]" : ""}`}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
          </button>
          <Link to={`/product/${product.slug}`} className="w-9 h-9 grid place-items-center rounded-full glass-strong text-white hover:glow-soft">
            <Eye className="w-4 h-4" />
          </Link>
        </div>

        {/* quick add */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300">
          <button
            onClick={() => { addToCart(product); toast.success(`${product.name} added to bag`); }}
            className="w-full h-10 rounded-full btn-gold text-sm flex items-center justify-center gap-2 glow-soft"
          >
            <ShoppingBag className="w-4 h-4" /> Quick Add
          </button>
        </div>
      </div>

      <div className="pt-4 px-1">
        <div className="flex items-center justify-between text-[11px] text-white/50 mb-1">
          <span className="uppercase tracking-wider">{product.category}</span>
          <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-[#c9a96a] text-[#c9a96a]" /> {product.rating} <span className="text-white/40">({product.reviews})</span></span>
        </div>
        <Link to={`/product/${product.slug}`} className="block">
          <h3 className="font-display text-white text-lg leading-tight truncate">{product.name}</h3>
          <div className="text-[11px] text-white/40 font-bengali">{product.bn}</div>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[#c9a96a]">{formatTk(product.price)}</span>
          {product.oldPrice && <span className="text-xs text-white/40 line-through">{formatTk(product.oldPrice)}</span>}
          {product.colors && (
            <div className="ml-auto flex -space-x-1">
              {product.colors.slice(0, 4).map((c) => (
                <span key={c.hex} className="w-3.5 h-3.5 rounded-full border border-white/30" style={{ background: c.hex }} title={c.name} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
