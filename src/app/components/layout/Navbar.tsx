import { Link, NavLink, useNavigate } from "react-router";
import { Search, Heart, ShoppingBag, User, Menu, X, Sparkles, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { useShop } from "../../lib/store";
import { CATEGORIES, BRAND } from "../../lib/data";

const NAV = [
  { label: "Shop", to: "/shop", mega: true },
  { label: "Saree", to: "/shop?category=saree" },
  { label: "Panjabi", to: "/shop?category=panjabi" },
  { label: "Jewelry", to: "/shop?category=jewelry" },
  { label: "Beauty", to: "/shop?category=beauty" },
  { label: "Gadgets", to: "/shop?category=gadgets" },
  { label: "Track Order", to: "/track" },
];

export function Navbar() {
  const { cartCount, wishlist } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) nav(`/shop?q=${encodeURIComponent(search)}`);
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="hidden md:block bg-gradient-to-r from-[#c9a96a]/15 via-[#c98a85]/10 to-[#c9a96a]/10 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 py-2 text-xs flex items-center justify-between text-white/80">
          <span className="flex items-center gap-2"><Sparkles className="w-3 h-3 text-[#c9a96a]" /> Free luxury delivery on orders above ৳5,000 inside Bangladesh</span>
          <div className="flex items-center gap-5">
            <Link to="/track" className="hover:text-white">Track Order</Link>
            <Link to="/delivery" className="hover:text-white">Delivery Info</Link>
            <span className="text-white/40">EN · বাংলা</span>
          </div>
        </div>
      </div>

      <motion.header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#14110f]/80 border-b border-white/10" : "bg-transparent"
        } backdrop-blur-2xl`}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center gap-6">
          <button className="md:hidden text-white" onClick={() => setMobile(true)}>
            <Menu className="w-6 h-6" />
          </button>

          <Link to="/" className="flex items-center gap-2 mr-2">
            <div className="relative w-9 h-9 rounded-xl btn-gold grid place-items-center glow-soft">
              <span className="font-display text-[#14110f]">C</span>
            </div>
            <div className="leading-tight">
              <div className="font-display tracking-wide text-white">{BRAND.name}</div>
              <div className="text-[10px] text-white/50 -mt-0.5">{BRAND.bengali} · Lifestyle</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 ml-4">
            {NAV.slice(0, 6).map((n) => (
              <div
                key={n.label}
                className="relative"
                onMouseEnter={() => n.mega && setOpenMega(true)}
                onMouseLeave={() => n.mega && setOpenMega(false)}
              >
                <NavLink
                  to={n.to}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm flex items-center gap-1 rounded-full transition ${
                      isActive ? "text-[#c9a96a]" : "text-white/80 hover:text-white"
                    }`
                  }
                >
                  {n.label}
                  {n.mega && <ChevronDown className="w-3 h-3 opacity-60" />}
                </NavLink>
                {n.mega && (
                  <AnimatePresence>
                    {openMega && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 top-full pt-3"
                      >
                        <div className="glass-strong rounded-2xl p-6 w-[640px] grid grid-cols-3 gap-4 shadow-2xl">
                          {CATEGORIES.slice(0, 5).map((c) => (
                            <Link key={c.slug} to={`/shop?category=${c.slug}`} className="group rounded-xl overflow-hidden relative h-28">
                              <img src={c.image} alt={c.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#14110f] via-[#14110f]/40 to-transparent" />
                              <div className="absolute bottom-2 left-3 right-3">
                                <div className="text-white text-sm">{c.name}</div>
                                <div className="text-white/60 text-[10px]">{c.count} pieces</div>
                              </div>
                            </Link>
                          ))}
                          <div className="rounded-xl p-4 bg-gradient-to-br from-[#c9a96a]/20 to-[#c98a85]/15 flex flex-col justify-between">
                            <div>
                              <div className="text-xs text-white/70">Limited Edition</div>
                              <div className="font-display text-white text-lg leading-tight mt-1">Eid Festive Drop ’26</div>
                            </div>
                            <Link to="/shop" className="text-xs text-white underline underline-offset-4">Explore →</Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          <form onSubmit={submitSearch} className="flex-1 max-w-md ml-auto hidden md:block">
            <div className="glass rounded-full flex items-center gap-2 px-4 h-10">
              <Search className="w-4 h-4 text-white/60" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search sarees, panjabi, attar…"
                className="bg-transparent outline-none text-sm text-white/90 placeholder:text-white/40 flex-1"
              />
              <kbd className="hidden lg:block text-[10px] text-white/40 border border-white/10 rounded px-1.5 py-0.5">⌘K</kbd>
            </div>
          </form>

          <div className="flex items-center gap-1 md:gap-2 ml-auto md:ml-0">
            <Link to="/wishlist" className="relative w-10 h-10 grid place-items-center rounded-full hover:bg-white/5 text-white">
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 rounded-full text-[10px] grid place-items-center btn-gold px-1">{wishlist.length}</span>
              )}
            </Link>
            <Link to="/cart" className="relative w-10 h-10 grid place-items-center rounded-full hover:bg-white/5 text-white">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 rounded-full text-[10px] grid place-items-center btn-gold px-1">{cartCount}</span>
              )}
            </Link>
            <Link to="/account" className="hidden md:grid w-10 h-10 place-items-center rounded-full hover:bg-white/5 text-white">
              <User className="w-5 h-5" />
            </Link>
            <Link to="/auth/login" className="hidden md:inline-flex items-center px-4 h-10 rounded-full btn-gold text-sm glow-soft hover:brightness-110 transition">
              Sign in
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobile && (
          <motion.div className="fixed inset-0 z-[60] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobile(false)} />
            <motion.aside
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-[#1c1916] border-r border-white/10 p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <Link to="/" onClick={() => setMobile(false)} className="font-display text-white text-xl">{BRAND.name}</Link>
                <button onClick={() => setMobile(false)} className="text-white/60"><X /></button>
              </div>
              <form onSubmit={(e) => { submitSearch(e); setMobile(false); }} className="glass rounded-full flex items-center gap-2 px-4 h-11 mb-6">
                <Search className="w-4 h-4 text-white/60" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search…" className="bg-transparent outline-none text-sm text-white flex-1" />
              </form>
              <nav className="space-y-1">
                {NAV.map((n) => (
                  <Link key={n.label} to={n.to} onClick={() => setMobile(false)} className="block px-4 py-3 rounded-xl text-white hover:bg-white/5">
                    {n.label}
                  </Link>
                ))}
                <Link to="/account" onClick={() => setMobile(false)} className="block px-4 py-3 rounded-xl text-white hover:bg-white/5">Account</Link>
                <Link to="/auth/login" onClick={() => setMobile(false)} className="block mt-4 text-center py-3 rounded-full btn-gold">Sign in</Link>
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
