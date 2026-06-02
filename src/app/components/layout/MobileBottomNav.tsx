import { Link, useLocation } from "react-router";
import { Home, Search, Heart, ShoppingBag, User } from "lucide-react";
import { useShop } from "../../lib/store";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/shop", label: "Shop", icon: Search },
  { to: "/wishlist", label: "Saved", icon: Heart },
  { to: "/cart", label: "Cart", icon: ShoppingBag },
  { to: "/account", label: "Me", icon: User },
];

export function MobileBottomNav() {
  const { pathname } = useLocation();
  const { cartCount, wishlist } = useShop();
  return (
    <nav className="lg:hidden fixed bottom-3 left-3 right-3 z-50">
      <div className="glass-strong rounded-2xl px-2 py-2 flex items-center justify-around shadow-2xl">
        {items.map((i) => {
          const active = pathname === i.to;
          const Icon = i.icon;
          const badge = i.to === "/cart" ? cartCount : i.to === "/wishlist" ? wishlist.length : 0;
          return (
            <Link key={i.to} to={i.to} className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition ${active ? "bg-white/10 text-[#c9a96a]" : "text-white/70"}`}>
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{i.label}</span>
              {badge > 0 && (
                <span className="absolute top-1 right-2 min-w-4 h-4 text-[9px] grid place-items-center rounded-full btn-gold px-1">{badge}</span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
