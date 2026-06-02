import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { motion } from "motion/react";
import { Filter, Grid3x3, List, Search, SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "../lib/data";
import { ProductCard } from "../components/ProductCard";
import { formatTk } from "../lib/store";

const SORTS = ["Featured", "Price: Low to High", "Price: High to Low", "Newest", "Top Rated"];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const categoryParam = params.get("category");
  const q = params.get("q") || "";
  const [category, setCategory] = useState<string | null>(categoryParam);
  const [price, setPrice] = useState<[number, number]>([0, 40000]);
  const [sort, setSort] = useState("Featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState(q);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => p.price >= price[0] && p.price <= price[1]);
    if (category) list = list.filter((p) => p.category === category);
    if (search) list = list.filter((p) => (p.name + p.bn + p.category).toLowerCase().includes(search.toLowerCase()));
    switch (sort) {
      case "Price: Low to High": list = [...list].sort((a, b) => a.price - b.price); break;
      case "Price: High to Low": list = [...list].sort((a, b) => b.price - a.price); break;
      case "Top Rated": list = [...list].sort((a, b) => b.rating - a.rating); break;
      case "Newest": list = [...list].sort((a, b) => (b.badge === "New" ? 1 : 0) - (a.badge === "New" ? 1 : 0)); break;
    }
    return list;
  }, [category, price, sort, search]);

  const applyCategory = (slug: string | null) => {
    setCategory(slug);
    if (slug) setParams({ category: slug }); else setParams({});
  };

  const Sidebar = (
    <aside className="glass rounded-3xl p-6 h-fit lg:sticky lg:top-28">
      <div className="flex items-center justify-between mb-6">
        <div className="font-display text-white text-xl">Refine</div>
        <button onClick={() => { applyCategory(null); setPrice([0, 40000]); }} className="text-xs text-[#c9a96a]">Reset</button>
      </div>

      <div className="mb-6">
        <div className="text-xs uppercase tracking-widest text-white/50 mb-3">Search</div>
        <div className="glass rounded-full flex items-center gap-2 px-4 h-10">
          <Search className="w-4 h-4 text-white/60" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search…" className="bg-transparent outline-none text-sm text-white flex-1" />
        </div>
      </div>

      <div className="mb-6">
        <div className="text-xs uppercase tracking-widest text-white/50 mb-3">Category</div>
        <div className="space-y-1">
          <button onClick={() => applyCategory(null)} className={`w-full text-left px-3 py-2 rounded-xl text-sm transition ${!category ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"}`}>All Pieces <span className="text-white/40 float-right">{PRODUCTS.length}</span></button>
          {CATEGORIES.map((c) => (
            <button key={c.slug} onClick={() => applyCategory(c.slug)} className={`w-full text-left px-3 py-2 rounded-xl text-sm transition ${category === c.slug ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"}`}>
              {c.name} <span className="text-white/40 float-right">{PRODUCTS.filter(p => p.category === c.slug).length}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="text-xs uppercase tracking-widest text-white/50 mb-3">Price Range</div>
        <div className="flex items-center justify-between text-white/80 text-sm mb-2">
          <span>{formatTk(price[0])}</span><span>{formatTk(price[1])}</span>
        </div>
        <input type="range" min={0} max={40000} step={500} value={price[1]} onChange={(e) => setPrice([price[0], +e.target.value])} className="w-full accent-[#f0a8d0]" />
      </div>

      <div className="mb-2">
        <div className="text-xs uppercase tracking-widest text-white/50 mb-3">Color</div>
        <div className="flex flex-wrap gap-2">
          {["#f0a8d0","#9333ea","#e8c896","#f5ecf6","#1a0a20","#10b981","#ef4f7a"].map((c) => (
            <button key={c} className="w-7 h-7 rounded-full border border-white/20 hover:scale-110 transition" style={{ background: c }} />
          ))}
        </div>
      </div>
    </aside>
  );

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-10">
      <div className="text-xs text-white/50 mb-3">Home / Shop {category && `/ ${category}`}</div>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-4xl md:text-6xl text-white">{category ? CATEGORIES.find(c => c.slug === category)?.name : "All Collections"}</h1>
          <p className="text-white/60 mt-2">{filtered.length} pieces · curated by the Charulata atelier</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowFilters(true)} className="lg:hidden flex items-center gap-2 glass rounded-full px-4 h-10 text-white text-sm"><SlidersHorizontal className="w-4 h-4" /> Filters</button>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="glass rounded-full px-4 h-10 text-white text-sm bg-transparent outline-none">
            {SORTS.map(s => <option key={s} value={s} className="bg-[#1c1916]">{s}</option>)}
          </select>
          <div className="hidden sm:flex glass rounded-full p-1">
            <button onClick={() => setView("grid")} className={`w-9 h-9 grid place-items-center rounded-full ${view === "grid" ? "bg-white/10 text-white" : "text-white/60"}`}><Grid3x3 className="w-4 h-4" /></button>
            <button onClick={() => setView("list")} className={`w-9 h-9 grid place-items-center rounded-full ${view === "list" ? "bg-white/10 text-white" : "text-white/60"}`}><List className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-8">
        <div className="hidden lg:block">{Sidebar}</div>

        <div>
          {filtered.length === 0 ? (
            <div className="glass rounded-3xl p-16 text-center">
              <div className="w-16 h-16 rounded-full glass mx-auto mb-4 grid place-items-center"><Filter className="w-7 h-7 text-white/60" /></div>
              <div className="font-display text-2xl text-white">No pieces match</div>
              <p className="text-white/60 mt-2">Try widening the price range or clearing filters.</p>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="glass rounded-2xl p-4 flex gap-4 items-center">
                  <img src={p.image} alt={p.name} className="w-32 h-40 object-cover rounded-xl" />
                  <div className="flex-1">
                    <div className="text-xs text-white/50 uppercase">{p.category}</div>
                    <div className="font-display text-white text-xl">{p.name}</div>
                    <div className="text-xs text-white/40 font-bengali">{p.bn}</div>
                    <div className="text-[#c9a96a] mt-2">{formatTk(p.price)}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-12 flex items-center justify-center gap-2">
            {["‹", "1", "2", "3", "…", "8", "›"].map((p, i) => (
              <button key={i} className={`min-w-10 h-10 px-3 rounded-full glass text-sm ${p === "1" ? "btn-gold" : "text-white/70 hover:bg-white/10"}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile filters drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
          <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} className="absolute bottom-0 inset-x-0 bg-[#1c1916] rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="font-display text-white text-xl">Filters</div>
              <button onClick={() => setShowFilters(false)} className="text-white/70"><X /></button>
            </div>
            {Sidebar}
          </motion.div>
        </div>
      )}
    </div>
  );
}
