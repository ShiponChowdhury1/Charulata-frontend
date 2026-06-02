import { Link } from "react-router";
import { Instagram, Facebook, Youtube, Twitter, Mail, MapPin, Phone, Sparkles, LayoutDashboard, ArrowUpRight } from "lucide-react";
import { BRAND } from "../../lib/data";

const cols = [
  { title: "Shop", links: [["Saree", "/shop?category=saree"], ["Panjabi", "/shop?category=panjabi"], ["Jewelry", "/shop?category=jewelry"], ["Beauty", "/shop?category=beauty"], ["Gadgets", "/shop?category=gadgets"]] },
  { title: "Help", links: [["Track Order", "/track"], ["Delivery Info", "/delivery"], ["Returns", "/delivery"], ["FAQ", "/delivery"], ["Contact", "/delivery"]] },
  { title: "Company", links: [["About", "/"], ["Heritage", "/"], ["Press", "/"], ["VIP Club", "/auth/register"], ["Careers", "/"]] },
];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/10">
      <div className="absolute -top-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#c98a85]/60 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-6 pt-20 pb-10">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr] gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl btn-gold grid place-items-center glow-soft">
                <span className="font-display text-[#14110f]">C</span>
              </div>
              <div className="font-display text-white text-xl">{BRAND.full}</div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">{BRAND.tagline}. A modern Bangladeshi lifestyle house crafting heritage with contemporary soul.</p>
            <div className="flex gap-3 mt-6">
              {[Instagram, Facebook, Youtube, Twitter].map((I, i) => (
                <a key={i} href="#" className="w-10 h-10 grid place-items-center rounded-full glass hover:glow-soft transition text-white">
                  <I className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="font-display text-white mb-4">{c.title}</div>
              <ul className="space-y-3">
                {c.links.map(([l, h]) => (
                  <li key={l}><Link to={h} className="text-white/60 text-sm hover:text-white">{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <div className="font-display text-white mb-4 flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#c9a96a]" /> Join the VIP Club</div>
            <p className="text-white/60 text-sm mb-4">Private previews, complimentary alteration, first dibs on limited drops.</p>
            <form className="glass rounded-full flex items-center p-1 pl-4">
              <input placeholder="you@charulata.bd" className="bg-transparent outline-none text-sm text-white flex-1 placeholder:text-white/40" />
              <button className="px-4 h-9 rounded-full btn-gold text-sm">Subscribe</button>
            </form>
            <div className="mt-6 space-y-2 text-sm text-white/60">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#c9a96a]" /> House 42, Gulshan 2, Dhaka 1212</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#c9a96a]" /> +880 1700 000 000</div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#c9a96a]" /> care@charulata.bd</div>
            </div>
          </div>
        </div>
        <Link to="/admin" className="group surface rounded-2xl p-5 flex items-center gap-4 hover:border-[#c9a96a]/40 transition mb-8">
          <div className="w-12 h-12 rounded-xl btn-gold grid place-items-center text-[#14110f]"><LayoutDashboard className="w-5 h-5" /></div>
          <div className="flex-1">
            <div className="font-display text-white text-lg">Admin Dashboard · Live Demo</div>
            <div className="text-xs text-white/55">Explore the Charulata operator suite — orders, products, analytics, and more.</div>
          </div>
          <div className="text-[#c9a96a] text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Enter <ArrowUpRight className="w-4 h-4" /></div>
        </Link>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>© {new Date().getFullYear()} Charulata Lifestyle. Crafted in Dhaka with devotion.</div>
          <div className="flex gap-6">
            <a href="#">Privacy</a><a href="#">Terms</a><a href="#">Refund Policy</a>
          </div>
          <div className="flex gap-2 items-center text-white/70">
            <span className="px-2 py-1 rounded-md glass text-[10px]">bKash</span>
            <span className="px-2 py-1 rounded-md glass text-[10px]">Nagad</span>
            <span className="px-2 py-1 rounded-md glass text-[10px]">VISA</span>
            <span className="px-2 py-1 rounded-md glass text-[10px]">Mastercard</span>
            <span className="px-2 py-1 rounded-md glass text-[10px]">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
