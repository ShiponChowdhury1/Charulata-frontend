import { Truck, MapPin, RefreshCw, ShieldCheck, Clock, Package } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "../lib/data";

const COURIERS = [
  { n: "Sundarban Express", c: "Premium · Dhaka & Metro", logo: "S" },
  { n: "Pathao", c: "Same-day Dhaka", logo: "P" },
  { n: "RedX", c: "All 64 Districts", logo: "R" },
  { n: "Steadfast", c: "Express Couriers", logo: "ST" },
];

const ZONES = [
  { z: "Dhaka Metro", t: "24 hours", c: "৳0 over ৳5K · ৳80 standard" },
  { z: "Inside Dhaka City", t: "24–48 hours", c: "৳0 over ৳5K · ৳100 standard" },
  { z: "Major Cities (Ctg, Sylhet, Khulna, Rajshahi)", t: "2–3 days", c: "৳130" },
  { z: "All Other Districts", t: "3–5 days", c: "৳150" },
];

export default function Delivery() {
  const [open, setOpen] = useState(0);
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-10">
      <div className="text-xs uppercase tracking-[0.3em] text-[#c9a96a]">Delivery Information</div>
      <h1 className="font-display text-white text-4xl md:text-6xl mt-2 max-w-3xl text-balance">From our atelier in Dhaka, to your door — beautifully.</h1>

      {/* Highlights */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        {[
          { I: Truck, t: "Free Luxury Delivery", s: "Complimentary on orders ৳5,000+" },
          { I: Clock, t: "24h Dhaka Delivery", s: "Order by 4 PM · same-day metro" },
          { I: RefreshCw, t: "7-Day Easy Returns", s: "No questions asked exchange" },
          { I: ShieldCheck, t: "Authenticity Sealed", s: "Charulata signature card included" },
        ].map((x) => (
          <div key={x.t} className="glass rounded-3xl p-6">
            <div className="w-11 h-11 rounded-xl btn-gold grid place-items-center text-[#14110f]"><x.I className="w-5 h-5" /></div>
            <div className="font-display text-white text-xl mt-4">{x.t}</div>
            <div className="text-white/60 text-sm mt-1">{x.s}</div>
          </div>
        ))}
      </div>

      {/* Zones */}
      <div className="mt-16">
        <h2 className="font-display text-white text-3xl md:text-4xl mb-6">Shipping zones & times</h2>
        <div className="glass rounded-3xl overflow-hidden">
          <div className="grid grid-cols-[1.6fr_1fr_1fr] px-6 py-4 text-xs uppercase tracking-widest text-white/50 border-b border-white/10">
            <span>Region</span><span>Delivery time</span><span>Charge</span>
          </div>
          {ZONES.map((z, i) => (
            <div key={i} className="grid grid-cols-[1.6fr_1fr_1fr] px-6 py-5 border-b border-white/5 last:border-0 items-center">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#c9a96a]" /> <span className="text-white">{z.z}</span></div>
              <span className="text-white/80 text-sm">{z.t}</span>
              <span className="text-white/80 text-sm">{z.c}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Couriers */}
      <div className="mt-16">
        <h2 className="font-display text-white text-3xl md:text-4xl mb-6">Our courier partners</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COURIERS.map((c) => (
            <div key={c.n} className="glass rounded-3xl p-6 text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl btn-gold grid place-items-center text-[#14110f] font-display text-xl">{c.logo}</div>
              <div className="font-display text-white text-lg mt-3">{c.n}</div>
              <div className="text-white/60 text-xs mt-1">{c.c}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Returns */}
      <div className="mt-16 grid lg:grid-cols-2 gap-6">
        <div className="glass-strong rounded-3xl p-8">
          <Package className="w-7 h-7 text-[#c9a96a]" />
          <h3 className="font-display text-white text-2xl mt-3">Shipping Policy</h3>
          <ul className="text-white/70 text-sm mt-4 space-y-2 list-disc list-inside">
            <li>Orders placed before 4 PM ship the same day from our Gulshan atelier.</li>
            <li>Each piece is wrapped in muslin, sealed with the Charulata wax stamp.</li>
            <li>Tracking is shared via SMS & WhatsApp the moment your order is dispatched.</li>
          </ul>
        </div>
        <div className="glass-strong rounded-3xl p-8">
          <RefreshCw className="w-7 h-7 text-[#c9a96a]" />
          <h3 className="font-display text-white text-2xl mt-3">Return Policy</h3>
          <ul className="text-white/70 text-sm mt-4 space-y-2 list-disc list-inside">
            <li>7-day no-questions exchange on unworn pieces with tags intact.</li>
            <li>Custom-stitched garments, intimates and beauty products are final sale.</li>
            <li>Refunds processed within 5 working days to the original payment method.</li>
          </ul>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-16 mb-8">
        <h2 className="font-display text-white text-3xl md:text-4xl mb-6">Frequently asked</h2>
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
    </div>
  );
}
