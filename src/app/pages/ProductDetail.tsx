import { Link, useParams } from "react-router";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Heart, Minus, Plus, ShoppingBag, Star, Truck, ShieldCheck, RefreshCw, Share2, ChevronRight } from "lucide-react";
import { PRODUCTS } from "../lib/data";
import { useShop, formatTk } from "../lib/store";
import { ProductCard } from "../components/ProductCard";
import { toast } from "sonner";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const gallery = product.gallery || [product.image];
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [color, setColor] = useState(product.colors?.[0]?.name);
  const [size, setSize] = useState(product.sizes?.[0]);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"desc" | "specs" | "reviews">("desc");
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const saved = wishlist.includes(product.id);

  const related = useMemo(() => PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4), [product.id]);

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-8 md:pt-12">
      <nav className="text-xs text-white/50 mb-6 flex items-center gap-1">
        <Link to="/" className="hover:text-white">Home</Link><ChevronRight className="w-3 h-3" />
        <Link to="/shop" className="hover:text-white">Shop</Link><ChevronRight className="w-3 h-3" />
        <Link to={`/shop?category=${product.category}`} className="hover:text-white capitalize">{product.category}</Link><ChevronRight className="w-3 h-3" />
        <span className="text-white/70 truncate">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10">
        {/* Gallery */}
        <div className="grid grid-cols-[80px_1fr] gap-4">
          <div className="hidden md:flex flex-col gap-3">
            {gallery.map((g, i) => (
              <button key={i} onClick={() => setActive(i)} className={`relative aspect-[4/5] rounded-xl overflow-hidden transition ${active === i ? "ring-2 ring-[#c9a96a]" : "opacity-60 hover:opacity-100"}`}>
                <img src={g} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <motion.div layout className="relative aspect-[4/5] rounded-3xl overflow-hidden glass" onMouseEnter={() => setZoom(true)} onMouseLeave={() => setZoom(false)}>
            <motion.img key={active} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: zoom ? 1.18 : 1 }} transition={{ duration: 0.5 }} src={gallery[active]} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.badge && <span className="px-3 py-1 text-xs rounded-full btn-gold">{product.badge}</span>}
              {product.discount && <span className="px-3 py-1 text-xs rounded-full bg-[#14110f]/70 text-[#c9a96a] border border-[#c9a96a]/30 backdrop-blur">−{product.discount}%</span>}
            </div>
            <button className="absolute top-4 right-4 w-10 h-10 grid place-items-center rounded-full glass-strong text-white"><Share2 className="w-4 h-4" /></button>
          </motion.div>
          <div className="md:hidden col-span-2 flex gap-2 mt-2 scrollbar-none overflow-x-auto">
            {gallery.map((g, i) => (
              <button key={i} onClick={() => setActive(i)} className={`shrink-0 w-16 h-20 rounded-xl overflow-hidden transition ${active === i ? "ring-2 ring-[#c9a96a]" : "opacity-60"}`}>
                <img src={g} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-[#c9a96a]">{product.category}</div>
          <h1 className="font-display text-white text-3xl md:text-5xl mt-2 leading-tight">{product.name}</h1>
          <div className="text-white/50 mt-1 font-bengali">{product.bn}</div>

          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? "fill-[#c9a96a] text-[#c9a96a]" : "text-white/20"}`} />)}
              <span className="text-white/80 text-sm ml-1">{product.rating}</span>
            </div>
            <span className="text-white/40 text-sm">{product.reviews} reviews</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${product.stock > 10 ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`}>
              {product.stock > 10 ? "In Stock" : `Only ${product.stock} left`}
            </span>
          </div>

          <div className="mt-6 flex items-end gap-3">
            <div className="font-display text-4xl gradient-text">{formatTk(product.price)}</div>
            {product.oldPrice && <div className="text-white/40 line-through mb-1.5">{formatTk(product.oldPrice)}</div>}
            {product.discount && <span className="text-emerald-400 text-sm mb-1.5">Save {product.discount}%</span>}
          </div>

          <p className="text-white/70 mt-5 leading-relaxed">
            Handcrafted by Bangladesh’s most celebrated weavers, this {product.name.toLowerCase()} is a study in restraint and ritual.
            Every thread is placed with intention, from the gilded selvedge to the whisper-soft pallu.
          </p>

          {product.colors && (
            <div className="mt-6">
              <div className="text-xs uppercase tracking-widest text-white/50 mb-3">Color · <span className="text-white/80 normal-case">{color}</span></div>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <button key={c.hex} onClick={() => setColor(c.name)} className={`w-10 h-10 rounded-full p-0.5 ${color === c.name ? "ring-2 ring-[#c9a96a]" : "ring-1 ring-white/20"}`}>
                    <span className="block w-full h-full rounded-full" style={{ background: c.hex }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes && (
            <div className="mt-6">
              <div className="text-xs uppercase tracking-widest text-white/50 mb-3 flex items-center justify-between">
                <span>Size</span><a href="#" className="text-[#c9a96a] normal-case tracking-normal">Size guide</a>
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)} className={`min-w-12 h-11 px-4 rounded-xl text-sm transition ${size === s ? "btn-gold" : "glass text-white hover:bg-white/10"}`}>{s}</button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center gap-3">
            <div className="glass rounded-full flex items-center">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-11 h-12 grid place-items-center text-white"><Minus className="w-4 h-4" /></button>
              <span className="w-10 text-center text-white">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-11 h-12 grid place-items-center text-white"><Plus className="w-4 h-4" /></button>
            </div>
            <button
              onClick={() => { addToCart(product, { color, size, qty }); toast.success("Added to bag"); }}
              className="flex-1 h-12 rounded-full btn-gold inline-flex items-center justify-center gap-2 glow-soft"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Bag · {formatTk(product.price * qty)}
            </button>
            <button onClick={() => toggleWishlist(product.id)} className={`w-12 h-12 rounded-full glass grid place-items-center text-white ${saved ? "text-[#c9a96a]" : ""}`}>
              <Heart className={`w-5 h-5 ${saved ? "fill-current" : ""}`} />
            </button>
          </div>

          <button className="w-full h-12 mt-3 rounded-full glass text-white">Buy Now · Express Checkout</button>

          <div className="mt-7 grid grid-cols-3 gap-2 text-xs">
            {[
              { I: Truck, t: "Free Delivery", s: "Orders ৳5K+" },
              { I: ShieldCheck, t: "Authentic", s: "Charulata seal" },
              { I: RefreshCw, t: "7-Day Exchange", s: "Easy returns" },
            ].map((x) => (
              <div key={x.t} className="glass rounded-2xl p-3 text-center">
                <x.I className="w-4 h-4 text-[#c9a96a] mx-auto mb-1" />
                <div className="text-white">{x.t}</div>
                <div className="text-white/50">{x.s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-20">
        <div className="flex gap-2 border-b border-white/10">
          {(["desc", "specs", "reviews"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-5 py-3 text-sm relative ${tab === t ? "text-white" : "text-white/50"}`}>
              {t === "desc" ? "Description" : t === "specs" ? "Specifications" : `Reviews (${product.reviews})`}
              {tab === t && <motion.span layoutId="tab" className="absolute inset-x-0 -bottom-px h-0.5 btn-gold" />}
            </button>
          ))}
        </div>
        <div className="py-8">
          {tab === "desc" && (
            <div className="grid md:grid-cols-2 gap-10 text-white/75 leading-relaxed">
              <p>
                The {product.name} is woven on traditional pit looms in Rajshahi, Bangladesh, by artisans whose families have practiced
                this craft for six generations. Each piece takes 14 days of work — slow, intentional, and unrepeatable.
              </p>
              <ul className="space-y-2">
                <li>• 100% pure handloom silk</li>
                <li>• Natural mineral dyes, colorfast</li>
                <li>• Hand-finished selvedge with 24k zari accents</li>
                <li>• Includes Charulata authenticity seal & artisan card</li>
              </ul>
            </div>
          )}
          {tab === "specs" && (
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-3 text-sm">
              {[["Origin","Rajshahi, Bangladesh"],["Material","Pure mulberry silk"],["Length","6.5 yards"],["Weight","780g"],["Care","Dry clean only"],["Includes","Saree, blouse piece, fall"]].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-white/10 py-2"><span className="text-white/60">{k}</span><span className="text-white">{v}</span></div>
              ))}
            </div>
          )}
          {tab === "reviews" && (
            <div className="grid md:grid-cols-[1fr_2fr] gap-10">
              <div className="glass rounded-3xl p-6 h-fit">
                <div className="font-display text-5xl gradient-text">{product.rating}</div>
                <div className="flex gap-1 mt-2">{Array.from({length:5}).map((_,i)=><Star key={i} className="w-4 h-4 fill-[#c9a96a] text-[#c9a96a]"/>)}</div>
                <div className="text-white/60 text-sm mt-1">Based on {product.reviews} reviews</div>
                <div className="mt-4 space-y-2">
                  {[5,4,3,2,1].map((s) => (
                    <div key={s} className="flex items-center gap-2 text-xs">
                      <span className="text-white/60 w-6">{s}★</span>
                      <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden"><div className="h-full btn-gold" style={{ width: `${s === 5 ? 78 : s === 4 ? 16 : 3}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { n: "Sumaiya R.", t: "Worth every taka. The drape is exquisite and packaging felt like a gift.", r: 5 },
                  { n: "Nabila K.", t: "Color is exactly as shown. Wore it to my engagement — endless compliments.", r: 5 },
                  { n: "Mahmuda H.", t: "Beautiful piece. Delivery to Sylhet took 3 days, well-packed.", r: 4 },
                ].map((r, i) => (
                  <div key={i} className="glass rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-full btn-gold grid place-items-center text-[#14110f] text-sm">{r.n[0]}</div>
                      <div>
                        <div className="text-white text-sm">{r.n}</div>
                        <div className="flex gap-0.5">{Array.from({length:r.r}).map((_,j)=><Star key={j} className="w-3 h-3 fill-[#c9a96a] text-[#c9a96a]"/>)}</div>
                      </div>
                    </div>
                    <p className="text-white/75 text-sm">{r.t}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-20">
        <h2 className="font-display text-3xl md:text-4xl text-white mb-8">You may also love</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>

      {/* Sticky Add to Cart bar (mobile) */}
      <div className="lg:hidden fixed bottom-20 inset-x-3 z-40">
        <div className="glass-strong rounded-2xl p-3 flex items-center gap-3">
          <img src={product.image} className="w-12 h-12 rounded-xl object-cover" />
          <div className="flex-1 min-w-0">
            <div className="text-white text-sm truncate">{product.name}</div>
            <div className="text-[#c9a96a] text-sm">{formatTk(product.price)}</div>
          </div>
          <button onClick={() => { addToCart(product); toast.success("Added"); }} className="px-4 h-10 rounded-full btn-gold text-sm">Add</button>
        </div>
      </div>
    </div>
  );
}
