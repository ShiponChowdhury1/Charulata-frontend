import { Link, NavLink, Outlet, useLocation } from "react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard, ShoppingCart, Package, FolderTree, Users, Star, Ticket,
  Image as ImageIcon, Truck, BarChart3, Bell, Settings, LogOut, Search,
  Menu, X, Plus, ChevronDown, Sun, Moon, Sparkles
} from "lucide-react";

const NAV = [
  { to: "/admin", label: "Dashboard", I: LayoutDashboard, end: true },
  { to: "/admin/orders", label: "Orders", I: ShoppingCart, badge: 12 },
  { to: "/admin/products", label: "Products", I: Package },
  { to: "/admin/categories", label: "Categories", I: FolderTree },
  { to: "/admin/customers", label: "Customers", I: Users },
  { to: "/admin/reviews", label: "Reviews", I: Star },
  { to: "/admin/coupons", label: "Coupons", I: Ticket },
  { to: "/admin/banners", label: "Banners", I: ImageIcon },
  { to: "/admin/delivery", label: "Delivery", I: Truck },
  { to: "/admin/analytics", label: "Analytics", I: BarChart3 },
  { to: "/admin/notifications", label: "Notifications", I: Bell, badge: 4 },
  { to: "/admin/settings", label: "Settings", I: Settings },
];

export function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const current = NAV.find((n) => n.end ? pathname === n.to : pathname.startsWith(n.to))?.label || "Admin";

  const SidebarBody = (
    <>
      <div className="px-4 py-5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl btn-gold grid place-items-center text-[#14110f] font-display shrink-0">C</div>
        {!collapsed && (
          <div className="min-w-0">
            <div className="text-white font-display tracking-wide truncate">Charulata</div>
            <div className="text-[10px] text-white/40 uppercase tracking-widest">Admin Suite</div>
          </div>
        )}
      </div>
      <div className="h-px hairline mx-4" />
      <nav className="flex-1 overflow-y-auto scrollbar-none px-3 py-4 space-y-0.5">
        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.end}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-3 h-10 rounded-lg text-sm transition group ${
                isActive ? "text-[#14110f] bg-[#c9a96a]" : "text-white/70 hover:text-white hover:bg-white/5"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span layoutId="adminActive" className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full bg-[#c9a96a]" />
                )}
                <n.I className="w-4 h-4 shrink-0" />
                {!collapsed && <span className="flex-1 truncate">{n.label}</span>}
                {!collapsed && n.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${isActive ? "bg-[#14110f]/20 text-[#14110f]" : "bg-white/10 text-white/70"}`}>{n.badge}</span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="px-3 py-3 border-t border-[#2c2823]">
        <Link to="/" className="flex items-center gap-3 px-3 h-10 rounded-lg text-white/70 hover:text-white hover:bg-white/5 text-sm">
          <LogOut className="w-4 h-4" /> {!collapsed && "Back to store"}
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-[#14110f] text-[#f5f0e8]">
      {/* Desktop sidebar */}
      <aside className={`hidden lg:flex flex-col fixed inset-y-0 left-0 z-40 transition-all duration-300 ${collapsed ? "w-[72px]" : "w-[248px]"} bg-[#1c1916] border-r border-[#2c2823]`}>
        {SidebarBody}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="fixed inset-0 z-50 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.aside initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 28, stiffness: 240 }} className="absolute left-0 top-0 bottom-0 w-[260px] bg-[#1c1916] border-r border-[#2c2823] flex flex-col">
              {SidebarBody}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`flex-1 min-w-0 transition-all duration-300 ${collapsed ? "lg:pl-[72px]" : "lg:pl-[248px]"}`}>
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-[#14110f]/85 backdrop-blur-xl border-b border-[#2c2823]">
          <div className="h-16 px-4 md:px-6 flex items-center gap-3">
            <button className="lg:hidden text-white" onClick={() => setMobileOpen(true)}><Menu className="w-5 h-5" /></button>
            <button onClick={() => setCollapsed(!collapsed)} className="hidden lg:grid w-9 h-9 place-items-center rounded-lg hover:bg-white/5 text-white/70">
              <Menu className="w-4 h-4" />
            </button>
            <div className="min-w-0">
              <div className="text-xs text-white/40">Admin</div>
              <div className="text-white text-sm truncate">{current}</div>
            </div>

            <div className="flex-1 max-w-md ml-auto hidden md:block">
              <div className="surface rounded-lg flex items-center gap-2 px-3 h-9">
                <Search className="w-4 h-4 text-white/50" />
                <input placeholder="Search orders, products, customers…" className="bg-transparent outline-none text-sm text-white/90 flex-1 placeholder:text-white/40" />
                <kbd className="text-[10px] text-white/40 border border-[#2c2823] rounded px-1.5">⌘K</kbd>
              </div>
            </div>

            <div className="flex items-center gap-1 ml-auto md:ml-0">
              <button className="px-3 h-9 rounded-lg btn-gold text-sm flex items-center gap-1.5 hover:brightness-105">
                <Plus className="w-4 h-4" /> <span className="hidden sm:inline">New</span>
              </button>
              <button className="w-9 h-9 grid place-items-center rounded-lg hover:bg-white/5 text-white/70"><Sun className="w-4 h-4" /></button>
              <button className="relative w-9 h-9 grid place-items-center rounded-lg hover:bg-white/5 text-white/70">
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#c9a96a]" />
              </button>
              <div className="ml-1 flex items-center gap-2 pl-2 border-l border-[#2c2823]">
                <div className="w-8 h-8 rounded-full btn-gold grid place-items-center text-[#14110f] text-xs">MH</div>
                <div className="hidden md:block leading-tight">
                  <div className="text-xs text-white">Mahdi</div>
                  <div className="text-[10px] text-white/50">Owner</div>
                </div>
                <ChevronDown className="w-3 h-3 text-white/50" />
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
