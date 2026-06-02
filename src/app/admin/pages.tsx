import { useState } from "react";
import { motion } from "motion/react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";
import {
  TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Package,
  ArrowUpRight, MoreHorizontal, Search, Filter, Download, Plus, Eye,
  Edit3, Trash2, Star, CheckCircle2, Clock, XCircle, Truck, MapPin,
  Mail, Phone, Calendar, Tag, Percent, Image as ImageIcon, Bell,
  Shield, CreditCard, Globe, Sparkles,
} from "lucide-react";
import { PRODUCTS, CATEGORIES } from "../lib/data";
import { formatTk } from "../lib/store";

/* ────────────────────── shared bits ────────────────────── */

const PageHead = ({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) => (
  <div className="flex items-end justify-between gap-4 mb-6 flex-wrap">
    <div>
      <h1 className="font-display text-white text-3xl md:text-4xl">{title}</h1>
      {sub && <p className="text-white/55 mt-1 text-sm">{sub}</p>}
    </div>
    {action}
  </div>
);

const Card = ({ children, className = "" }: any) => (
  <div className={`surface rounded-2xl ${className}`}>{children}</div>
);

const Pill = ({ tone = "gold", children }: any) => {
  const tones: any = {
    gold: "bg-[#c9a96a]/15 text-[#c9a96a] border-[#c9a96a]/30",
    green: "bg-[#7a9e7e]/15 text-[#7a9e7e] border-[#7a9e7e]/30",
    rose: "bg-[#c98a85]/15 text-[#c98a85] border-[#c98a85]/30",
    muted: "bg-white/5 text-white/60 border-white/10",
    red: "bg-[#c95a5a]/15 text-[#c95a5a] border-[#c95a5a]/30",
  };
  return <span className={`text-[10px] px-2 py-0.5 rounded-md border ${tones[tone]}`}>{children}</span>;
};

const GOLD = "#c9a96a";
const ROSE = "#c98a85";
const GREEN = "#7a9e7e";
const MUTED = "#a39a8c";

const revenueData = [
  { d: "Mon", v: 42000, o: 28 }, { d: "Tue", v: 58000, o: 41 },
  { d: "Wed", v: 49000, o: 33 }, { d: "Thu", v: 71000, o: 52 },
  { d: "Fri", v: 95000, o: 68 }, { d: "Sat", v: 124000, o: 89 },
  { d: "Sun", v: 108000, o: 76 },
];
const monthly = [
  { m: "Jan", sales: 420 }, { m: "Feb", sales: 510 }, { m: "Mar", sales: 680 },
  { m: "Apr", sales: 590 }, { m: "May", sales: 820 }, { m: "Jun", sales: 940 },
];
const catShare = [
  { name: "Saree", value: 38 }, { name: "Panjabi", value: 22 },
  { name: "Jewelry", value: 18 }, { name: "Beauty", value: 14 }, { name: "Gadgets", value: 8 },
];
const CHART_COLORS = [GOLD, ROSE, "#d8bd87", GREEN, MUTED];

/* ────────────────────── DASHBOARD ────────────────────── */

const STATS = [
  { label: "Revenue (7d)", value: "৳5,47,000", delta: "+12.4%", up: true, I: DollarSign, tone: GOLD },
  { label: "Orders", value: "387", delta: "+8.2%", up: true, I: ShoppingBag, tone: ROSE },
  { label: "Customers", value: "2,418", delta: "+3.1%", up: true, I: Users, tone: GREEN },
  { label: "Avg. Order", value: "৳14,120", delta: "-1.8%", up: false, I: Package, tone: MUTED },
];

const RECENT_ORDERS = [
  { id: "CHARU-9821", name: "Tahmina Akter", item: "Jamdani · Indigo", total: 24990, status: "Delivered", time: "2 min ago" },
  { id: "CHARU-9820", name: "Rashed Khan", item: "Panjabi · Pearl", total: 8900, status: "Shipped", time: "12 min ago" },
  { id: "CHARU-9819", name: "Naila Rahman", item: "Gold Tikli Set", total: 18500, status: "Processing", time: "44 min ago" },
  { id: "CHARU-9818", name: "Sabina Yasmin", item: "Silk Katan", total: 32400, status: "Delivered", time: "1 hr ago" },
  { id: "CHARU-9817", name: "Imran Hossain", item: "Wireless Earbuds Pro", total: 6200, status: "Cancelled", time: "2 hr ago" },
];

const statusTone = (s: string): any =>
  s === "Delivered" ? "green" : s === "Shipped" ? "gold" : s === "Processing" ? "muted" : "red";

export function AdminDashboard() {
  return (
    <div>
      <PageHead
        title="Good afternoon, Mahdi"
        sub="Here's how Charulata is performing today."
        action={
          <div className="flex gap-2">
            <button className="btn-ghost h-10 px-4 rounded-lg text-sm flex items-center gap-2"><Download className="w-4 h-4" /> Export</button>
            <button className="btn-gold h-10 px-4 rounded-lg text-sm flex items-center gap-2"><Plus className="w-4 h-4" /> New Product</button>
          </div>
        }
      />

      {/* stat cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {STATS.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl grid place-items-center" style={{ background: `${s.tone}22`, color: s.tone }}>
                  <s.I className="w-5 h-5" />
                </div>
                <span className={`text-xs flex items-center gap-1 ${s.up ? "text-[#7a9e7e]" : "text-[#c95a5a]"}`}>
                  {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />} {s.delta}
                </span>
              </div>
              <div className="mt-4 text-white text-2xl font-display">{s.value}</div>
              <div className="text-white/50 text-xs mt-0.5">{s.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* charts row */}
      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-4 mb-6">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-white font-display text-lg">Revenue Overview</div>
              <div className="text-white/50 text-xs">Last 7 days · BDT</div>
            </div>
            <div className="flex gap-1 text-xs">
              {["7d", "30d", "90d"].map((t, i) => (
                <button key={t} className={`px-3 h-8 rounded-md ${i === 0 ? "btn-gold" : "text-white/60 hover:bg-white/5"}`}>{t}</button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={GOLD} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={GOLD} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2c2823" vertical={false} />
              <XAxis dataKey="d" stroke="#a39a8c" fontSize={11} />
              <YAxis stroke="#a39a8c" fontSize={11} />
              <Tooltip contentStyle={{ background: "#1c1916", border: "1px solid #2c2823", borderRadius: 12 }} labelStyle={{ color: "#fff" }} />
              <Area type="monotone" dataKey="v" stroke={GOLD} strokeWidth={2} fill="url(#g1)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <div className="mb-4">
            <div className="text-white font-display text-lg">Sales by Category</div>
            <div className="text-white/50 text-xs">This month</div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={catShare} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={3}>
                {catShare.map((_, i) => <Cell key={i} fill={CHART_COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#1c1916", border: "1px solid #2c2823", borderRadius: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {catShare.map((c, i) => (
              <div key={c.name} className="flex items-center gap-2 text-xs text-white/70">
                <span className="w-2 h-2 rounded-full" style={{ background: CHART_COLORS[i] }} />
                {c.name} <span className="text-white/40 ml-auto">{c.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* monthly + recent */}
      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-4">
        <Card className="p-5">
          <div className="mb-4">
            <div className="text-white font-display text-lg">Monthly Sales</div>
            <div className="text-white/50 text-xs">Orders fulfilled</div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2c2823" vertical={false} />
              <XAxis dataKey="m" stroke="#a39a8c" fontSize={11} />
              <YAxis stroke="#a39a8c" fontSize={11} />
              <Tooltip contentStyle={{ background: "#1c1916", border: "1px solid #2c2823", borderRadius: 12 }} />
              <Bar dataKey="sales" fill={GOLD} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-white font-display text-lg">Recent Orders</div>
              <div className="text-white/50 text-xs">Real-time order feed</div>
            </div>
            <button className="text-xs text-[#c9a96a] hover:underline flex items-center gap-1">View all <ArrowUpRight className="w-3 h-3" /></button>
          </div>
          <div className="space-y-2">
            {RECENT_ORDERS.map((o) => (
              <div key={o.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition">
                <div className="w-9 h-9 rounded-full btn-gold grid place-items-center text-[#14110f] text-xs">{o.name.split(" ").map((n) => n[0]).join("")}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm truncate">{o.name}</div>
                  <div className="text-white/50 text-xs truncate">{o.id} · {o.item}</div>
                </div>
                <div className="text-right">
                  <div className="text-white text-sm">{formatTk(o.total)}</div>
                  <div className="mt-0.5"><Pill tone={statusTone(o.status)}>{o.status}</Pill></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ────────────────────── ORDERS ────────────────────── */

const ORDERS = Array.from({ length: 14 }, (_, i) => ({
  id: `CHARU-${9821 - i}`,
  customer: ["Tahmina Akter", "Rashed Khan", "Naila Rahman", "Sabina Yasmin", "Imran Hossain", "Farah Begum", "Arif Chowdhury"][i % 7],
  date: `May ${30 - i}, 2026`,
  items: 1 + (i % 4),
  total: 5000 + i * 1800,
  payment: ["bKash", "COD", "Card", "Nagad"][i % 4],
  status: ["Delivered", "Shipped", "Processing", "Pending", "Cancelled"][i % 5],
}));

export function AdminOrders() {
  const [tab, setTab] = useState("All");
  const tabs = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
  const filtered = tab === "All" ? ORDERS : ORDERS.filter((o) => o.status === tab);

  return (
    <div>
      <PageHead
        title="Orders"
        sub={`${ORDERS.length} total · 12 awaiting action`}
        action={
          <div className="flex gap-2">
            <button className="btn-ghost h-10 px-4 rounded-lg text-sm flex items-center gap-2"><Download className="w-4 h-4" /> Export CSV</button>
            <button className="btn-gold h-10 px-4 rounded-lg text-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Create order</button>
          </div>
        }
      />

      <Card className="p-2 mb-4">
        <div className="flex flex-wrap gap-1">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-3 h-9 rounded-lg text-sm transition ${tab === t ? "btn-gold" : "text-white/70 hover:bg-white/5"}`}>
              {t}
            </button>
          ))}
        </div>
      </Card>

      <Card className="p-4 mb-4 flex gap-3 items-center">
        <div className="flex-1 flex items-center gap-2 px-3 h-10 rounded-lg bg-[#24201c] border border-[#2c2823]">
          <Search className="w-4 h-4 text-white/50" />
          <input placeholder="Search by order ID, customer, phone…" className="bg-transparent outline-none text-sm text-white flex-1 placeholder:text-white/40" />
        </div>
        <button className="btn-ghost h-10 px-4 rounded-lg text-sm flex items-center gap-2"><Filter className="w-4 h-4" /> Filters</button>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#24201c] text-white/60 text-xs uppercase tracking-wider">
              <tr>
                <th className="text-left px-5 py-3"><input type="checkbox" className="accent-[#c9a96a]" /></th>
                <th className="text-left px-5 py-3">Order</th>
                <th className="text-left px-5 py-3">Customer</th>
                <th className="text-left px-5 py-3">Date</th>
                <th className="text-left px-5 py-3">Items</th>
                <th className="text-left px-5 py-3">Total</th>
                <th className="text-left px-5 py-3">Payment</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-right px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-t border-[#2c2823] hover:bg-white/[0.02]">
                  <td className="px-5 py-3"><input type="checkbox" className="accent-[#c9a96a]" /></td>
                  <td className="px-5 py-3 text-[#c9a96a]">{o.id}</td>
                  <td className="px-5 py-3 text-white">{o.customer}</td>
                  <td className="px-5 py-3 text-white/60">{o.date}</td>
                  <td className="px-5 py-3 text-white/70">{o.items}</td>
                  <td className="px-5 py-3 text-white">{formatTk(o.total)}</td>
                  <td className="px-5 py-3 text-white/70">{o.payment}</td>
                  <td className="px-5 py-3"><Pill tone={statusTone(o.status)}>{o.status}</Pill></td>
                  <td className="px-5 py-3 text-right">
                    <button className="w-8 h-8 grid place-items-center rounded-md hover:bg-white/5 text-white/60 inline-grid"><Eye className="w-4 h-4" /></button>
                    <button className="w-8 h-8 grid place-items-center rounded-md hover:bg-white/5 text-white/60 inline-grid"><MoreHorizontal className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-4 border-t border-[#2c2823] text-xs text-white/60">
          <div>Showing 1–{filtered.length} of {ORDERS.length}</div>
          <div className="flex gap-1">
            <button className="px-3 h-8 rounded-md hover:bg-white/5">Previous</button>
            <button className="px-3 h-8 rounded-md btn-gold">1</button>
            <button className="px-3 h-8 rounded-md hover:bg-white/5">2</button>
            <button className="px-3 h-8 rounded-md hover:bg-white/5">Next</button>
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ────────────────────── PRODUCTS ────────────────────── */

export function AdminProducts() {
  return (
    <div>
      <PageHead
        title="Products"
        sub={`${PRODUCTS.length} items in catalogue · 4 low stock`}
        action={
          <div className="flex gap-2">
            <button className="btn-ghost h-10 px-4 rounded-lg text-sm flex items-center gap-2"><Download className="w-4 h-4" /> Import</button>
            <button className="btn-gold h-10 px-4 rounded-lg text-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Add Product</button>
          </div>
        }
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PRODUCTS.map((p) => (
          <Card key={p.id} className="overflow-hidden group">
            <div className="aspect-[4/5] relative overflow-hidden">
              <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              {p.badge && <span className="absolute top-3 left-3 px-2 py-1 rounded-md btn-gold text-[10px]">{p.badge}</span>}
              <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                <button className="w-8 h-8 grid place-items-center rounded-md bg-[#14110f]/80 text-white"><Edit3 className="w-3.5 h-3.5" /></button>
                <button className="w-8 h-8 grid place-items-center rounded-md bg-[#14110f]/80 text-[#c95a5a]"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <div className="p-4">
              <div className="text-white truncate">{p.name}</div>
              <div className="text-xs text-white/50 capitalize mt-0.5">{p.category}</div>
              <div className="flex items-center justify-between mt-3">
                <div className="text-[#c9a96a]">{formatTk(p.price)}</div>
                <Pill tone={p.stock > 5 ? "green" : p.stock > 0 ? "gold" : "red"}>
                  {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
                </Pill>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────── CATEGORIES ────────────────────── */

export function AdminCategories() {
  return (
    <div>
      <PageHead
        title="Categories"
        sub="Organize your catalogue by collection"
        action={<button className="btn-gold h-10 px-4 rounded-lg text-sm flex items-center gap-2"><Plus className="w-4 h-4" /> New Category</button>}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map((c) => {
          const count = PRODUCTS.filter((p) => p.category === c.slug).length;
          return (
            <Card key={c.slug} className="overflow-hidden">
              <div className="aspect-[16/9] relative">
                <img src={c.image} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14110f] to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="font-display text-white text-xl">{c.name}</div>
                  <div className="text-xs text-white/70 font-bengali">{c.bn}</div>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="text-white/60 text-sm">{count} products</div>
                <div className="flex gap-1">
                  <button className="w-8 h-8 grid place-items-center rounded-md hover:bg-white/5 text-white/60"><Edit3 className="w-4 h-4" /></button>
                  <button className="w-8 h-8 grid place-items-center rounded-md hover:bg-white/5 text-[#c95a5a]"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ────────────────────── CUSTOMERS ────────────────────── */

const CUSTOMERS = [
  { name: "Tahmina Akter", email: "tahmina@gmail.com", phone: "+880 1711 002 233", orders: 14, spent: 248900, vip: true, since: "Jan 2023" },
  { name: "Rashed Khan", email: "rashed@outlook.com", phone: "+880 1712 445 667", orders: 8, spent: 92400, vip: false, since: "Mar 2024" },
  { name: "Naila Rahman", email: "naila.r@yahoo.com", phone: "+880 1713 889 012", orders: 22, spent: 412800, vip: true, since: "Nov 2022" },
  { name: "Sabina Yasmin", email: "sabina@gmail.com", phone: "+880 1714 334 556", orders: 5, spent: 64200, vip: false, since: "Feb 2025" },
  { name: "Imran Hossain", email: "imran.h@gmail.com", phone: "+880 1715 778 990", orders: 11, spent: 158400, vip: true, since: "Aug 2023" },
  { name: "Farah Begum", email: "farah@protonmail.com", phone: "+880 1716 224 668", orders: 3, spent: 28900, vip: false, since: "Apr 2026" },
];

export function AdminCustomers() {
  return (
    <div>
      <PageHead
        title="Customers"
        sub={`${CUSTOMERS.length} total · 3 VIP members`}
        action={<button className="btn-gold h-10 px-4 rounded-lg text-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Add Customer</button>}
      />

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <Card className="p-5">
          <div className="text-white/50 text-xs uppercase tracking-wider">Total Customers</div>
          <div className="font-display text-white text-3xl mt-2">2,418</div>
          <div className="text-xs text-[#7a9e7e] mt-1">+124 this month</div>
        </Card>
        <Card className="p-5">
          <div className="text-white/50 text-xs uppercase tracking-wider">VIP Members</div>
          <div className="font-display text-[#c9a96a] text-3xl mt-2">218</div>
          <div className="text-xs text-[#7a9e7e] mt-1">+18 this month</div>
        </Card>
        <Card className="p-5">
          <div className="text-white/50 text-xs uppercase tracking-wider">Avg. Lifetime Value</div>
          <div className="font-display text-white text-3xl mt-2">৳1,42,000</div>
          <div className="text-xs text-[#7a9e7e] mt-1">+6.2% vs last quarter</div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#24201c] text-white/60 text-xs uppercase tracking-wider">
              <tr>
                <th className="text-left px-5 py-3">Customer</th>
                <th className="text-left px-5 py-3">Contact</th>
                <th className="text-left px-5 py-3">Orders</th>
                <th className="text-left px-5 py-3">Total Spent</th>
                <th className="text-left px-5 py-3">Tier</th>
                <th className="text-left px-5 py-3">Since</th>
                <th className="text-right px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {CUSTOMERS.map((c) => (
                <tr key={c.email} className="border-t border-[#2c2823] hover:bg-white/[0.02]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full btn-gold grid place-items-center text-[#14110f] text-xs">{c.name.split(" ").map((n) => n[0]).join("")}</div>
                      <div className="text-white">{c.name}</div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-white/70">
                    <div className="flex items-center gap-1 text-xs"><Mail className="w-3 h-3" /> {c.email}</div>
                    <div className="flex items-center gap-1 text-xs mt-0.5"><Phone className="w-3 h-3" /> {c.phone}</div>
                  </td>
                  <td className="px-5 py-3 text-white">{c.orders}</td>
                  <td className="px-5 py-3 text-[#c9a96a]">{formatTk(c.spent)}</td>
                  <td className="px-5 py-3">{c.vip ? <Pill tone="gold">VIP</Pill> : <Pill tone="muted">Regular</Pill>}</td>
                  <td className="px-5 py-3 text-white/60 text-xs">{c.since}</td>
                  <td className="px-5 py-3 text-right">
                    <button className="w-8 h-8 grid place-items-center rounded-md hover:bg-white/5 text-white/60 inline-grid"><Eye className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ────────────────────── REVIEWS ────────────────────── */

const REVIEWS = [
  { name: "Tahmina A.", product: "Jamdani · Indigo", rating: 5, text: "Absolutely breathtaking craftsmanship. The weave is exquisite and the colours are deeper than the photos.", date: "May 28", status: "Published" },
  { name: "Rashed K.", product: "Panjabi · Pearl", rating: 4, text: "Beautiful fabric and stitching. Fit was slightly loose so I exchanged — service was effortless.", date: "May 26", status: "Published" },
  { name: "Naila R.", product: "Gold Tikli Set", rating: 5, text: "Wore this to my sister's holud — got endless compliments. Packaging felt like a gift in itself.", date: "May 24", status: "Pending" },
  { name: "Imran H.", product: "Wireless Earbuds", rating: 3, text: "Sound is great but case scratched easily. Could be more premium for the price.", date: "May 22", status: "Pending" },
];

export function AdminReviews() {
  return (
    <div>
      <PageHead title="Reviews" sub="Moderate customer feedback across the catalogue" />
      <div className="space-y-3">
        {REVIEWS.map((r, i) => (
          <Card key={i} className="p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-full btn-gold grid place-items-center text-[#14110f] text-xs shrink-0">{r.name[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="text-white">{r.name}</div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className={`w-3 h-3 ${s < r.rating ? "fill-[#c9a96a] text-[#c9a96a]" : "text-white/20"}`} />
                      ))}
                    </div>
                    <span className="text-xs text-white/40">· {r.date}</span>
                    <Pill tone={r.status === "Published" ? "green" : "gold"}>{r.status}</Pill>
                  </div>
                  <div className="text-xs text-[#c9a96a] mt-0.5">{r.product}</div>
                  <p className="text-white/75 text-sm mt-2 leading-relaxed">{r.text}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {r.status === "Pending" && <button className="btn-gold h-9 px-3 rounded-lg text-xs flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Approve</button>}
                <button className="btn-ghost h-9 px-3 rounded-lg text-xs flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Reject</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────── COUPONS ────────────────────── */

const COUPONS = [
  { code: "EID2026", off: "25% off", min: "৳5,000+", uses: "412 / 1000", expires: "Jul 15, 2026", active: true },
  { code: "VIP100", off: "৳1,000 off", min: "VIP only", uses: "88 / ∞", expires: "Never", active: true },
  { code: "WELCOME10", off: "10% off", min: "First order", uses: "1,247 / ∞", expires: "Never", active: true },
  { code: "FLASH50", off: "50% off", min: "৳10,000+", uses: "200 / 200", expires: "Apr 30, 2026", active: false },
];

export function AdminCoupons() {
  return (
    <div>
      <PageHead
        title="Coupons"
        sub="Promote drops, reward loyalty, recover carts"
        action={<button className="btn-gold h-10 px-4 rounded-lg text-sm flex items-center gap-2"><Plus className="w-4 h-4" /> New Coupon</button>}
      />
      <div className="grid md:grid-cols-2 gap-4">
        {COUPONS.map((c) => (
          <Card key={c.code} className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl grid place-items-center" style={{ background: `${GOLD}22`, color: GOLD }}>
                  <Percent className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display text-white text-xl tracking-wider">{c.code}</div>
                  <div className="text-[#c9a96a] text-sm">{c.off}</div>
                </div>
              </div>
              <Pill tone={c.active ? "green" : "muted"}>{c.active ? "Active" : "Expired"}</Pill>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-5 text-xs">
              <div><div className="text-white/50">Condition</div><div className="text-white mt-0.5">{c.min}</div></div>
              <div><div className="text-white/50">Used</div><div className="text-white mt-0.5">{c.uses}</div></div>
              <div><div className="text-white/50">Expires</div><div className="text-white mt-0.5">{c.expires}</div></div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="btn-ghost h-9 px-3 rounded-lg text-xs flex items-center gap-1"><Edit3 className="w-3.5 h-3.5" /> Edit</button>
              <button className="btn-ghost h-9 px-3 rounded-lg text-xs flex items-center gap-1"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────── BANNERS ────────────────────── */

const BANNERS = [
  { title: "Eid Collection 2026", sub: "Limited edition Jamdani drops", placement: "Homepage Hero", active: true },
  { title: "VIP Pre-sale", sub: "48 hours early access", placement: "Sticky Top Bar", active: true },
  { title: "Free Shipping Tk 5000+", sub: "All across Bangladesh", placement: "Announcement Bar", active: false },
];

export function AdminBanners() {
  return (
    <div>
      <PageHead
        title="Banners & Promotions"
        sub="Manage what greets your visitors"
        action={<button className="btn-gold h-10 px-4 rounded-lg text-sm flex items-center gap-2"><Plus className="w-4 h-4" /> New Banner</button>}
      />
      <div className="space-y-3">
        {BANNERS.map((b, i) => (
          <Card key={i} className="p-4 flex items-center gap-4 flex-wrap">
            <div className="w-24 h-16 rounded-lg bg-[#24201c] grid place-items-center text-white/30"><ImageIcon className="w-5 h-5" /></div>
            <div className="flex-1 min-w-[200px]">
              <div className="text-white">{b.title}</div>
              <div className="text-xs text-white/55">{b.sub}</div>
              <div className="text-[10px] text-[#c9a96a] mt-1">{b.placement}</div>
            </div>
            <Pill tone={b.active ? "green" : "muted"}>{b.active ? "Live" : "Paused"}</Pill>
            <div className="flex gap-1">
              <button className="w-9 h-9 grid place-items-center rounded-md hover:bg-white/5 text-white/60"><Edit3 className="w-4 h-4" /></button>
              <button className="w-9 h-9 grid place-items-center rounded-md hover:bg-white/5 text-[#c95a5a]"><Trash2 className="w-4 h-4" /></button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────── DELIVERY ────────────────────── */

const ZONES = [
  { name: "Dhaka Metro", time: "Same day · 4 hrs", fee: 80, free: 3000 },
  { name: "Dhaka Suburbs", time: "Next day", fee: 120, free: 4000 },
  { name: "Chittagong", time: "1–2 days", fee: 150, free: 5000 },
  { name: "Sylhet · Rajshahi", time: "2–3 days", fee: 180, free: 5000 },
  { name: "Outside Bangladesh", time: "5–10 days", fee: 2500, free: 25000 },
];

export function AdminDelivery() {
  return (
    <div>
      <PageHead
        title="Delivery Zones"
        sub="Configure shipping rates across Bangladesh"
        action={<button className="btn-gold h-10 px-4 rounded-lg text-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Add Zone</button>}
      />
      <div className="grid md:grid-cols-2 gap-4">
        {ZONES.map((z) => (
          <Card key={z.name} className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl grid place-items-center" style={{ background: `${GOLD}22`, color: GOLD }}>
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-white font-display text-lg">{z.name}</div>
                  <div className="text-xs text-white/55 flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" /> {z.time}</div>
                </div>
              </div>
              <button className="w-8 h-8 grid place-items-center rounded-md hover:bg-white/5 text-white/60"><Edit3 className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
              <div className="surface-2 rounded-lg p-3">
                <div className="text-white/50 text-xs">Standard fee</div>
                <div className="text-white mt-1">{formatTk(z.fee)}</div>
              </div>
              <div className="surface-2 rounded-lg p-3">
                <div className="text-white/50 text-xs">Free over</div>
                <div className="text-[#c9a96a] mt-1">{formatTk(z.free)}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────── ANALYTICS ────────────────────── */

const growthData = Array.from({ length: 12 }, (_, i) => ({
  m: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  customers: 800 + i * 130 + Math.round(Math.random() * 100),
  revenue: 200 + i * 45 + Math.round(Math.random() * 30),
}));

export function AdminAnalytics() {
  return (
    <div>
      <PageHead
        title="Analytics"
        sub="The story behind your numbers"
        action={<button className="btn-ghost h-10 px-4 rounded-lg text-sm flex items-center gap-2"><Calendar className="w-4 h-4" /> Last 12 months</button>}
      />

      <div className="grid lg:grid-cols-2 gap-4 mb-4">
        <Card className="p-5">
          <div className="text-white font-display text-lg mb-1">Customer Growth</div>
          <div className="text-white/50 text-xs mb-4">New customers per month</div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2c2823" vertical={false} />
              <XAxis dataKey="m" stroke="#a39a8c" fontSize={11} />
              <YAxis stroke="#a39a8c" fontSize={11} />
              <Tooltip contentStyle={{ background: "#1c1916", border: "1px solid #2c2823", borderRadius: 12 }} />
              <Line type="monotone" dataKey="customers" stroke={ROSE} strokeWidth={2.5} dot={{ fill: ROSE }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <div className="text-white font-display text-lg mb-1">Revenue Trend</div>
          <div className="text-white/50 text-xs mb-4">In thousands · BDT</div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={growthData}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={GOLD} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={GOLD} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2c2823" vertical={false} />
              <XAxis dataKey="m" stroke="#a39a8c" fontSize={11} />
              <YAxis stroke="#a39a8c" fontSize={11} />
              <Tooltip contentStyle={{ background: "#1c1916", border: "1px solid #2c2823", borderRadius: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke={GOLD} strokeWidth={2} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-5">
        <div className="text-white font-display text-lg mb-1">Top Products</div>
        <div className="text-white/50 text-xs mb-4">By units sold this month</div>
        <div className="space-y-2">
          {PRODUCTS.slice(0, 6).map((p, i) => {
            const sold = 240 - i * 28;
            const pct = (sold / 240) * 100;
            return (
              <div key={p.id} className="flex items-center gap-3">
                <img src={p.image} className="w-10 h-12 object-cover rounded-md" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-sm">
                    <div className="text-white truncate">{p.name}</div>
                    <div className="text-white/60">{sold} sold</div>
                  </div>
                  <div className="h-1.5 mt-1 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full btn-gold" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

/* ────────────────────── NOTIFICATIONS ────────────────────── */

const NOTIFS = [
  { I: ShoppingBag, title: "New order received", body: "CHARU-9821 · Tahmina Akter · ৳24,990", time: "2 min ago", unread: true },
  { I: Star, title: "New 5★ review", body: "Naila Rahman reviewed Gold Tikli Set", time: "44 min ago", unread: true },
  { I: Package, title: "Low stock alert", body: "Silk Katan · Crimson is down to 2 units", time: "2 hr ago", unread: true },
  { I: Users, title: "VIP milestone", body: "Imran Hossain crossed ৳1,50,000 lifetime spend", time: "5 hr ago", unread: true },
  { I: Truck, title: "Delivery update", body: "Sundarban Express delivered 14 orders today", time: "Yesterday", unread: false },
  { I: Tag, title: "Coupon expiring soon", body: "EID2026 expires in 12 days", time: "Yesterday", unread: false },
];

export function AdminNotifications() {
  return (
    <div>
      <PageHead
        title="Notifications"
        sub="Stay on top of every signal across your store"
        action={<button className="btn-ghost h-10 px-4 rounded-lg text-sm">Mark all as read</button>}
      />
      <Card>
        {NOTIFS.map((n, i) => (
          <div key={i} className={`flex items-start gap-4 p-5 border-b border-[#2c2823] last:border-0 ${n.unread ? "bg-white/[0.02]" : ""}`}>
            <div className="w-10 h-10 rounded-xl grid place-items-center shrink-0" style={{ background: `${GOLD}22`, color: GOLD }}>
              <n.I className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="text-white">{n.title}</div>
                {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96a]" />}
              </div>
              <div className="text-sm text-white/60 mt-0.5">{n.body}</div>
            </div>
            <div className="text-xs text-white/40 shrink-0">{n.time}</div>
          </div>
        ))}
      </Card>
    </div>
  );
}

/* ────────────────────── SETTINGS ────────────────────── */

const SETTING_TABS = [
  { k: "store", label: "Store", I: Globe },
  { k: "payment", label: "Payment", I: CreditCard },
  { k: "shipping", label: "Shipping", I: Truck },
  { k: "team", label: "Team", I: Users },
  { k: "security", label: "Security", I: Shield },
];

export function AdminSettings() {
  const [tab, setTab] = useState("store");
  return (
    <div>
      <PageHead title="Settings" sub="Configure your storefront, payments, team, and security" />
      <div className="grid lg:grid-cols-[220px_1fr] gap-4">
        <Card className="p-2 h-fit">
          {SETTING_TABS.map((t) => (
            <button key={t.k} onClick={() => setTab(t.k)}
              className={`w-full flex items-center gap-3 px-3 h-10 rounded-lg text-sm transition ${tab === t.k ? "btn-gold" : "text-white/70 hover:bg-white/5"}`}>
              <t.I className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </Card>
        <Card className="p-6">
          {tab === "store" && (
            <div className="space-y-5 max-w-xl">
              <div className="font-display text-white text-xl">Store Information</div>
              <Field label="Store Name" value="Charulata Lifestyle" />
              <Field label="Tagline" value="Heritage. Refined." />
              <Field label="Support Email" value="care@charulata.bd" />
              <Field label="Phone" value="+880 1700 000 000" />
              <Field label="Address" value="House 42, Gulshan 2, Dhaka 1212" />
              <button className="btn-gold h-10 px-5 rounded-lg text-sm">Save changes</button>
            </div>
          )}
          {tab === "payment" && (
            <div className="space-y-4">
              <div className="font-display text-white text-xl mb-2">Payment Methods</div>
              {["bKash", "Nagad", "Visa / Mastercard", "Cash on Delivery"].map((m) => (
                <div key={m} className="surface-2 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="text-white">{m}</div>
                    <div className="text-xs text-white/50 mt-0.5">Enabled · 2.4% fee</div>
                  </div>
                  <div className="w-10 h-6 rounded-full bg-[#c9a96a] relative"><span className="absolute right-0.5 top-0.5 w-5 h-5 rounded-full bg-[#14110f]" /></div>
                </div>
              ))}
            </div>
          )}
          {tab === "shipping" && <div className="text-white/60">Manage zones in the Delivery section.</div>}
          {tab === "team" && (
            <div>
              <div className="font-display text-white text-xl mb-4">Team Members</div>
              {[{ n: "Mahdi Hasan", r: "Owner" }, { n: "Sara Ahmed", r: "Operations" }, { n: "Rakib Chowdhury", r: "Support" }].map((p) => (
                <div key={p.n} className="surface-2 rounded-xl p-4 flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full btn-gold grid place-items-center text-[#14110f] text-xs">{p.n.split(" ").map((x) => x[0]).join("")}</div>
                  <div className="flex-1">
                    <div className="text-white">{p.n}</div>
                    <div className="text-xs text-white/50">{p.r}</div>
                  </div>
                  <button className="btn-ghost h-9 px-3 rounded-lg text-xs">Manage</button>
                </div>
              ))}
            </div>
          )}
          {tab === "security" && (
            <div className="space-y-4 max-w-xl">
              <div className="font-display text-white text-xl">Security</div>
              <div className="surface-2 rounded-xl p-4">
                <div className="text-white">Two-factor authentication</div>
                <div className="text-xs text-white/55 mt-1">Add an extra layer to protect your account.</div>
                <button className="btn-gold h-9 px-4 rounded-lg text-sm mt-3">Enable 2FA</button>
              </div>
              <div className="surface-2 rounded-xl p-4">
                <div className="text-white">Session timeout</div>
                <div className="text-xs text-white/55 mt-1">Currently set to 30 minutes of inactivity.</div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-xs text-white/55 uppercase tracking-wider">{label}</label>
      <input defaultValue={value} className="mt-1.5 w-full surface-2 rounded-lg px-3 h-10 text-sm text-white outline-none focus:border-[#c9a96a]" />
    </div>
  );
}
