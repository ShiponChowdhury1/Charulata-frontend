import { useState } from "react";
import { Link } from "react-router";
import { User, MapPin, Package, Heart, Settings, Bell, LogOut, ChevronRight, Edit, Plus, CheckCircle2 } from "lucide-react";
import { useShop, formatTk } from "../lib/store";
import { PRODUCTS } from "../lib/data";

const TABS = [
  { id: "profile", t: "Profile", I: User },
  { id: "orders", t: "Orders", I: Package },
  { id: "addresses", t: "Addresses", I: MapPin },
  { id: "wishlist", t: "Wishlist", I: Heart },
  { id: "notifications", t: "Notifications", I: Bell },
  { id: "settings", t: "Settings", I: Settings },
] as const;

const ORDERS = [
  { id: "CHARU-9821", date: "May 28, 2026", total: 24990, items: 2, status: "Delivered" },
  { id: "CHARU-9744", date: "May 10, 2026", total: 8450, items: 1, status: "Shipped" },
  { id: "CHARU-9602", date: "Apr 18, 2026", total: 18900, items: 3, status: "Delivered" },
];

export default function Account() {
  const [tab, setTab] = useState<typeof TABS[number]["id"]>("profile");
  const { wishlist } = useShop();

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-10">
      <h1 className="font-display text-white text-4xl md:text-5xl">My Maison</h1>
      <p className="text-white/60 mt-1">Welcome back, Mahdi.</p>

      <div className="grid lg:grid-cols-[280px_1fr] gap-8 mt-10">
        <aside className="glass rounded-3xl p-4 h-fit">
          <div className="p-4 flex items-center gap-3 border-b border-white/10 mb-3">
            <div className="w-12 h-12 rounded-full btn-gold grid place-items-center text-[#14110f] font-display">MH</div>
            <div>
              <div className="text-white">Mahdi Hasan</div>
              <div className="text-xs text-[#c9a96a]">VIP Gold · Tier 2</div>
            </div>
          </div>
          <nav className="space-y-1">
            {TABS.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition ${tab === t.id ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"}`}>
                <t.I className="w-4 h-4" /> {t.t}
                <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
              </button>
            ))}
            <Link to="/auth/login" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:bg-white/5"><LogOut className="w-4 h-4" /> Sign out</Link>
          </nav>
        </aside>

        <div>
          {tab === "profile" && (
            <div className="space-y-6">
              <div className="glass rounded-3xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="font-display text-white text-xl">Profile Details</div>
                  <button className="text-[#c9a96a] text-sm flex items-center gap-1"><Edit className="w-3 h-3" /> Edit</button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  {[["Full Name", "Mahdi Hasan"],["Email","mahdi@charulata.bd"],["Phone","+880 1700 000 000"],["Date of Birth","12 March 1992"],["Gender","Male"],["Language","English / বাংলা"]].map(([k, v]) => (
                    <div key={k} className="glass rounded-xl p-4">
                      <div className="text-xs uppercase tracking-widest text-white/50">{k}</div>
                      <div className="text-white mt-1">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {[{ l: "Lifetime Spend", v: formatTk(184500) }, { l: "Orders Placed", v: "23" }, { l: "VIP Points", v: "8,420" }].map((s) => (
                  <div key={s.l} className="glass-strong rounded-3xl p-6">
                    <div className="text-xs uppercase tracking-widest text-white/50">{s.l}</div>
                    <div className="font-display text-3xl gradient-text mt-1">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "orders" && (
            <div className="space-y-3">
              {ORDERS.map((o) => (
                <div key={o.id} className="glass rounded-2xl p-5 flex flex-wrap items-center gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <div className="text-xs text-white/50">{o.date}</div>
                    <div className="font-display text-white text-lg">{o.id}</div>
                    <div className="text-xs text-white/60">{o.items} items · {formatTk(o.total)}</div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full ${o.status === "Delivered" ? "bg-emerald-500/20 text-emerald-300" : "bg-[#c9a96a]/20 text-[#c9a96a]"}`}>{o.status}</span>
                  <Link to="/track" className="px-4 h-10 rounded-full glass text-white text-sm flex items-center">Track</Link>
                  <button className="px-4 h-10 rounded-full btn-gold text-sm">Reorder</button>
                </div>
              ))}
            </div>
          )}

          {tab === "addresses" && (
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { t: "Home", a: "House 42, Road 11, Gulshan 2, Dhaka 1212", d: true },
                { t: "Office", a: "Level 8, Bashundhara City, Panthapath, Dhaka", d: false },
              ].map((x) => (
                <div key={x.t} className="glass rounded-3xl p-6 relative">
                  {x.d && <span className="absolute top-4 right-4 text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Default</span>}
                  <div className="font-display text-white text-xl">{x.t}</div>
                  <div className="text-white/70 mt-2 text-sm">{x.a}</div>
                  <div className="flex gap-2 mt-4 text-sm">
                    <button className="px-3 h-9 rounded-full glass text-white">Edit</button>
                    <button className="px-3 h-9 rounded-full glass text-white/70">Remove</button>
                  </div>
                </div>
              ))}
              <button className="glass rounded-3xl p-6 text-white/70 flex items-center justify-center gap-2 hover:bg-white/5 min-h-[160px]"><Plus className="w-4 h-4" /> Add new address</button>
            </div>
          )}

          {tab === "wishlist" && (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {PRODUCTS.filter(p => wishlist.includes(p.id)).map((p) => (
                <Link key={p.id} to={`/product/${p.slug}`} className="glass rounded-2xl p-3">
                  <img src={p.image} className="w-full h-48 object-cover rounded-xl" />
                  <div className="mt-3">
                    <div className="text-white text-sm">{p.name}</div>
                    <div className="text-[#c9a96a] text-sm">{formatTk(p.price)}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {tab === "notifications" && (
            <div className="space-y-3">
              {[
                { t: "Order CHARU-9821 delivered", s: "Loved it? Leave a review.", time: "2h ago" },
                { t: "New drop: Eid Festive ’26", s: "Preview reserved for VIPs.", time: "Yesterday" },
                { t: "Heritage Gold Chain back in stock", s: "Only 6 pieces available.", time: "3d ago" },
              ].map((n, i) => (
                <div key={i} className="glass rounded-2xl p-5 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full btn-gold grid place-items-center text-[#14110f]"><Bell className="w-4 h-4" /></div>
                  <div className="flex-1">
                    <div className="text-white">{n.t}</div>
                    <div className="text-white/60 text-sm">{n.s}</div>
                  </div>
                  <div className="text-white/40 text-xs">{n.time}</div>
                </div>
              ))}
            </div>
          )}

          {tab === "settings" && (
            <div className="glass rounded-3xl p-6 space-y-4">
              {[
                ["Email notifications", true],
                ["WhatsApp order updates", true],
                ["Marketing & new drops", false],
                ["Two-factor authentication", true],
              ].map(([k, v]) => (
                <div key={String(k)} className="flex items-center justify-between border-b border-white/10 pb-4 last:border-0">
                  <div className="text-white">{k}</div>
                  <div className={`w-11 h-6 rounded-full relative transition ${v ? "btn-gold" : "bg-white/15"}`}>
                    <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition ${v ? "left-5" : "left-0.5"}`} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
