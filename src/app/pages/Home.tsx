import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Sparkles, Truck, ShieldCheck, RefreshCw, Headphones, Star, Quote, ChevronDown, Clock, Flame } from "lucide-react";
import { PRODUCTS, CATEGORIES, TESTIMONIALS, FAQS, PARTNERS, IMG, BRAND } from "../lib/data";
import { ProductCard } from "../components/ProductCard";
import { formatTk } from "../lib/store";

const HERO_SLIDES = [
  {
    eyebrow: "Heritage Couture · Vol. 07",
    title: "Drape the\nMidnight Bloom",
    sub: "A handwoven Rajshahi silk story spun from rose, violet & 24k thread.",
    cta: "Shop Saree",
    href: "/shop?category=saree",
    image: IMG.saree1,
  },
  {
    eyebrow: "Eid Festive Drop ’26",
    title: "Reign in\nIvory & Gold",
    sub: "Limited Noor Panjabi collection — embroidered by Dhanmondi atelier.",
    cta: "Shop Panjabi",
    href: "/shop?category=panjabi",
    image: IMG.panjabi1,
  },
  {
    eyebrow: "Charulata Maison",
    title: "Aurum\nObjects of Desire",
    sub: "Diamond, gold and sapphire — heirloom pieces for the modern bride.",
    cta: "Shop Jewelry",
    href: "/shop?category=jewelry",
    image: IMG.jewel1,
  },
];

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % HERO_SLIDES.length), 7000);
    return () => clearInterval(t);
  }, []);
  const slide = HERO_SLIDES[i];
  return (
    <section className="relative">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-6 md:pt-10">
        <div className="relative rounded-[28px] md:rounded-[40px] overflow-hidden h-[78vh] md:h-[88vh] min-h-[560px] glass-strong">
          <AnimatePresence mode="wait">
            <motion.img
              key={slide.image}
              src={slide.image}
              alt=""
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-[#14110f] via-[#14110f]/60 to-[#14110f]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14110f] via-transparent to-transparent" />

          <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-14">
            <div className="flex items-center justify-between">
              <motion.div key={"eye-"+i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-white/80">
                <Sparkles className="w-3 h-3 text-[#c9a96a]" /> {slide.eyebrow}
              </motion.div>
              <div className="hidden md:flex items-center gap-2 text-xs text-white/60">
                <span className="font-display text-white">{String(i+1).padStart(2,"0")}</span>
                <span className="w-12 h-px bg-white/30" />
                <span>{String(HERO_SLIDES.length).padStart(2,"0")}</span>
              </div>
            </div>

            <div className="max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={"t-"+i}
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.7 }}
                  className="font-display text-white whitespace-pre-line text-[44px] sm:text-6xl md:text-7xl lg:text-[88px] leading-[0.95] tracking-tight"
                >
                  {slide.title.split("\n").map((line, idx) => (
                    <span key={idx} className="block">
                      {idx === 1 ? <span className="gradient-text italic">{line}</span> : line}
                    </span>
                  ))}
                </motion.h1>
              </AnimatePresence>
              <motion.p key={"s-"+i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-white/70 mt-5 max-w-md">
                {slide.sub}
              </motion.p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link to={slide.href} className="group inline-flex items-center gap-2 px-6 h-12 rounded-full btn-gold glow-soft hover:brightness-110 transition">
                  {slide.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </Link>
                <Link to="/shop" className="inline-flex items-center gap-2 px-6 h-12 rounded-full glass text-white hover:bg-white/10">
                  Explore Collection
                </Link>
              </div>
            </div>

            {/* progress + thumbnails */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="flex gap-2">
                {HERO_SLIDES.map((_, idx) => (
                  <button key={idx} onClick={() => setI(idx)} className="relative h-1 w-12 rounded-full bg-white/20 overflow-hidden">
                    {idx === i && <motion.span key={i} initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 7, ease: "linear" }} className="absolute inset-y-0 left-0 btn-gold" />}
                  </button>
                ))}
              </div>
              <div className="hidden md:flex gap-3">
                {HERO_SLIDES.map((s, idx) => (
                  <button key={idx} onClick={() => setI(idx)} className={`relative w-20 h-24 rounded-2xl overflow-hidden transition ${idx === i ? "ring-2 ring-[#c9a96a]" : "opacity-60 hover:opacity-100"}`}>
                    <img src={s.image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { I: Truck, t: "Luxury Delivery", s: "24–48h Dhaka, 64 districts" },
            { I: ShieldCheck, t: "Authentic Craft", s: "Master weavers, certified pieces" },
            { I: RefreshCw, t: "7-Day Exchange", s: "No questions asked" },
            { I: Headphones, t: "Concierge Support", s: "Live 9 AM – 11 PM" },
          ].map((x) => (
            <div key={x.t} className="glass rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl btn-gold grid place-items-center text-[#14110f]"><x.I className="w-5 h-5" /></div>
              <div>
                <div className="text-white text-sm">{x.t}</div>
                <div className="text-white/50 text-xs">{x.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { v: "25,000+", l: "Happy Clients", bn: "সন্তুষ্ট ক্রেতা" },
    { v: "25+", l: "Years of Craft", bn: "বছরের অভিজ্ঞতা" },
    { v: "30+", l: "Services & Lines", bn: "সেবা" },
    { v: "5.0★", l: "Average Review", bn: "রেটিং" },
  ];
  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-6 mt-24">
      <div className="glass-strong rounded-3xl p-8 md:p-12 grid grid-cols-2 lg:grid-cols-4 gap-y-8">
        {items.map((x, idx) => (
          <motion.div key={x.l} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }} className="text-center">
            <div className="font-display text-4xl md:text-6xl gradient-text">{x.v}</div>
            <div className="text-white/80 mt-2">{x.l}</div>
            <div className="text-white/40 text-xs font-bengali">{x.bn}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, link }: { eyebrow: string; title: string; link?: string }) {
  return (
    <div className="flex items-end justify-between mb-8 md:mb-10">
      <div>
        <div className="text-xs uppercase tracking-[0.3em] text-[#c9a96a] mb-2">{eyebrow}</div>
        <h2 className="font-display text-3xl md:text-5xl text-white text-balance">{title}</h2>
      </div>
      {link && (
        <Link to={link} className="hidden md:inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
          View all <ArrowUpRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}

function Categories() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-6 mt-28">
      <SectionHeader eyebrow="The Collections" title="Curated Worlds of Luxury" link="/shop" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {CATEGORIES.map((c, i) => (
          <motion.div key={c.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
            <Link to={`/shop?category=${c.slug}`} className="group block relative h-[300px] md:h-[380px] rounded-3xl overflow-hidden glass">
              <img src={c.image} alt={c.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14110f] via-[#14110f]/30 to-transparent" />
              <div className="absolute top-3 right-3 w-9 h-9 rounded-full glass-strong grid place-items-center text-white opacity-0 group-hover:opacity-100 transition">
                <ArrowUpRight className="w-4 h-4" />
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                <div className="font-display text-white text-2xl">{c.name}</div>
                <div className="text-white/60 text-xs font-bengali">{c.bn} · {c.count} pieces</div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ProductRow({ eyebrow, title, link, items }: { eyebrow: string; title: string; link?: string; items: typeof PRODUCTS }) {
  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-6 mt-28">
      <SectionHeader eyebrow={eyebrow} title={title} link={link} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {items.slice(0, 4).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </section>
  );
}

function FlashSale() {
  const target = Date.now() + 1000 * 60 * 60 * 36;
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const d = Math.max(0, target - now);
  const hh = String(Math.floor(d / 3600000)).padStart(2, "0");
  const mm = String(Math.floor((d % 3600000) / 60000)).padStart(2, "0");
  const ss = String(Math.floor((d % 60000) / 1000)).padStart(2, "0");

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-6 mt-28">
      <div className="relative rounded-[32px] overflow-hidden p-8 md:p-14 glass-strong">
        <div className="absolute inset-0 bg-gradient-to-br from-[#c9a96a]/15 via-transparent to-[#c98a85]/15 pointer-events-none" />
        <div className="relative grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-white/80 mb-4">
              <Flame className="w-3 h-3 text-[#c9a96a]" /> Charulata Flash Hour
            </div>
            <h2 className="font-display text-4xl md:text-6xl text-white leading-[1.05]">
              Up to <span className="gradient-text italic">40% off</span> the<br /> Maison Archive.
            </h2>
            <p className="text-white/70 mt-4 max-w-md">Limited quantities from past collections, re-released for our private community. Sale ends in:</p>
            <div className="mt-6 flex items-center gap-3">
              {[["Hours", hh], ["Min", mm], ["Sec", ss]].map(([l, v]) => (
                <div key={l} className="glass rounded-2xl px-5 py-3 text-center min-w-[88px]">
                  <div className="font-display text-3xl gradient-text tabular-nums">{v}</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/50">{l}</div>
                </div>
              ))}
              <Link to="/shop" className="ml-2 inline-flex items-center gap-2 px-6 h-12 rounded-full btn-gold glow-soft">Shop Sale <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {PRODUCTS.filter(p => p.discount).slice(0, 4).map((p) => (
              <Link key={p.id} to={`/product/${p.slug}`} className="group relative aspect-square rounded-2xl overflow-hidden glass">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14110f] to-transparent" />
                <div className="absolute top-2 left-2 px-2 py-0.5 text-[10px] rounded-full btn-gold">−{p.discount}%</div>
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="text-white text-xs truncate">{p.name}</div>
                  <div className="text-[#c9a96a] text-xs">{formatTk(p.price)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-6 mt-28">
      <SectionHeader eyebrow="Voices" title="Loved by Bangladesh’s tastemakers" />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass rounded-3xl p-6 relative overflow-hidden">
            <Quote className="absolute -top-2 -right-2 w-20 h-20 text-white/5" />
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="w-4 h-4 fill-[#c9a96a] text-[#c9a96a]" />)}
            </div>
            <p className="text-white/85 text-sm leading-relaxed">“{t.text}”</p>
            <div className="flex items-center gap-3 mt-5 pt-5 border-t border-white/10">
              <div className="w-10 h-10 rounded-full btn-gold grid place-items-center text-[#14110f]">{t.avatar}</div>
              <div>
                <div className="text-white text-sm">{t.name}</div>
                <div className="text-white/50 text-xs">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Partners() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-6 mt-24">
      <div className="text-center text-xs uppercase tracking-[0.3em] text-white/50 mb-6">As featured in</div>
      <div className="glass rounded-3xl py-8 px-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-y-6 gap-x-4">
        {PARTNERS.map((p) => (
          <div key={p} className="text-center font-display text-white/60 hover:text-white transition tracking-wider">{p}</div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-6 mt-28">
      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-[#c9a96a] mb-2">FAQ</div>
          <h2 className="font-display text-4xl md:text-5xl text-white text-balance">Questions, beautifully answered.</h2>
          <p className="text-white/60 mt-4 max-w-sm">Can’t find what you need? Our concierge is on WhatsApp 9 AM – 11 PM daily.</p>
          <a href="https://wa.me/8801700000000" className="inline-flex items-center gap-2 mt-6 px-5 h-11 rounded-full glass text-white hover:bg-white/10">
            Chat with concierge <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <button key={i} onClick={() => setOpen(open === i ? -1 : i)} className="w-full text-left glass rounded-2xl p-5 hover:bg-white/[0.07] transition">
              <div className="flex items-start justify-between gap-4">
                <div className="font-display text-white text-lg">{f.q}</div>
                <ChevronDown className={`w-5 h-5 text-white/60 transition ${open === i ? "rotate-180" : ""}`} />
              </div>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="text-white/70 text-sm mt-3 leading-relaxed">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-6 mt-28">
      <div className="relative rounded-[32px] overflow-hidden glass-strong p-10 md:p-16 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#c9a96a]/12 via-transparent to-[#c98a85]/12" />
        <div className="relative max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-white/80 mb-5">
            <Sparkles className="w-3 h-3 text-[#c9a96a]" /> VIP Members Only
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-white leading-tight">
            Join the <span className="gradient-text italic">Charulata Maison</span>
          </h2>
          <p className="text-white/70 mt-4">Receive private previews, complimentary alterations, and 10% off your first order.</p>
          <form className="mt-7 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="your@email.com" className="flex-1 glass rounded-full px-5 h-12 text-white outline-none placeholder:text-white/40" />
            <button className="px-6 h-12 rounded-full btn-gold glow-soft">Join VIP</button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-6 mt-28">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass rounded-3xl p-10 relative overflow-hidden">
          <div className="text-xs uppercase tracking-[0.3em] text-[#c9a96a]">Visit the Maison</div>
          <h3 className="font-display text-3xl md:text-4xl text-white mt-2">Gulshan Flagship</h3>
          <p className="text-white/70 mt-3 max-w-md">House 42, Road 11, Gulshan 2, Dhaka 1212. Open daily 11 AM – 10 PM. Private appointments by request.</p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-white/80">
            <div className="glass rounded-2xl p-4"><Clock className="w-4 h-4 text-[#c9a96a] mb-2" /> Open today<br /><span className="text-white/50">11:00 – 22:00</span></div>
            <div className="glass rounded-2xl p-4"><Sparkles className="w-4 h-4 text-[#c9a96a] mb-2" /> Concierge<br /><span className="text-white/50">+880 1700 000 000</span></div>
          </div>
        </div>
        <div className="glass rounded-3xl p-10">
          <h3 className="font-display text-3xl md:text-4xl text-white">Send a note</h3>
          <p className="text-white/60 mt-2 text-sm">We reply within 2 hours during operating hours.</p>
          <form className="mt-6 space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <input placeholder="Your name" className="glass rounded-xl px-4 h-12 text-white outline-none placeholder:text-white/40" />
              <input placeholder="Email or WhatsApp" className="glass rounded-xl px-4 h-12 text-white outline-none placeholder:text-white/40" />
            </div>
            <textarea placeholder="How can we help?" rows={4} className="w-full glass rounded-xl px-4 py-3 text-white outline-none placeholder:text-white/40 resize-none" />
            <button type="button" className="w-full h-12 rounded-full btn-gold glow-soft">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Categories />
      <ProductRow eyebrow="Editor’s Picks" title="Featured Pieces" link="/shop" items={PRODUCTS} />
      <FlashSale />
      <ProductRow eyebrow="What everyone’s wearing" title="Best Sellers of the Season" link="/shop" items={PRODUCTS.filter(p => p.badge === "Bestseller").concat(PRODUCTS).slice(0, 4)} />
      <ProductRow eyebrow="Fresh from the Atelier" title="New Arrivals" link="/shop" items={PRODUCTS.filter(p => p.badge === "New").concat(PRODUCTS).slice(0, 4)} />
      <Testimonials />
      <Partners />
      <FAQ />
      <Newsletter />
      <Contact />
    </>
  );
}
