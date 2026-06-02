import { useState } from "react";
import { motion } from "motion/react";
import { Package, CheckCircle2, Truck, Box, Home, MapPin, Search } from "lucide-react";

const STEPS = [
  { I: Package, t: "Processing", s: "Your order is being prepared at our atelier", time: "May 28, 9:20 AM" },
  { I: Box, t: "Packed", s: "Sealed with the Charulata authenticity card", time: "May 28, 4:45 PM" },
  { I: Truck, t: "Shipped", s: "Picked up by Sundarban Express", time: "May 29, 10:12 AM" },
  { I: MapPin, t: "Out for Delivery", s: "Rider Karim is on the way · ETA 35 min", time: "May 30, 2:18 PM" },
  { I: Home, t: "Delivered", s: "Enjoy your piece — leave a review for 100 VIP points", time: "Pending" },
];

export default function Track() {
  const [active] = useState(3);
  const [byEmail, setByEmail] = useState(false);

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-10">
      <h1 className="font-display text-white text-4xl md:text-5xl">Track your order</h1>
      <p className="text-white/60 mt-1">Live updates from our atelier to your door.</p>

      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 mt-10">
        <div className="glass-strong rounded-3xl p-6 h-fit">
          <div className="flex glass rounded-full p-1 mb-5">
            <button onClick={() => setByEmail(false)} className={`flex-1 h-10 rounded-full text-sm transition ${!byEmail ? "btn-gold" : "text-white/70"}`}>Order ID</button>
            <button onClick={() => setByEmail(true)} className={`flex-1 h-10 rounded-full text-sm transition ${byEmail ? "btn-gold" : "text-white/70"}`}>Email</button>
          </div>
          <div className="space-y-3">
            <div className="glass rounded-xl flex items-center gap-3 px-4 h-12">
              <Search className="w-4 h-4 text-white/50" />
              <input defaultValue={byEmail ? "" : "CHARU-9821"} placeholder={byEmail ? "you@charulata.bd" : "Order ID (e.g. CHARU-9821)"} className="flex-1 bg-transparent outline-none text-white text-sm placeholder:text-white/40" />
            </div>
            <button className="w-full h-12 rounded-full btn-gold glow-soft">Track Order</button>
          </div>
          <div className="mt-6 glass rounded-2xl p-4 text-sm">
            <div className="text-white/60 text-xs uppercase tracking-widest">Current Order</div>
            <div className="font-display text-white text-xl mt-1">CHARU-9821</div>
            <div className="text-white/60">2 items · ৳24,990 · Cash on Delivery</div>
            <div className="text-white/60 mt-1">House 42, Gulshan 2, Dhaka</div>
          </div>
        </div>

        <div className="glass rounded-3xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/50">Estimated delivery</div>
              <div className="font-display text-white text-2xl">Today · 2:30 – 3:00 PM</div>
            </div>
            <div className="text-right text-sm">
              <div className="text-white/60">Courier</div>
              <div className="text-white">Sundarban Express</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative mb-10">
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${(active / (STEPS.length - 1)) * 100}%` }} transition={{ duration: 1.2, ease: "easeOut" }} className="h-full btn-gold" />
            </div>
          </div>

          <div className="space-y-5">
            {STEPS.map((s, i) => {
              const done = i < active;
              const current = i === active;
              return (
                <motion.div key={s.t} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex gap-4 items-start">
                  <div className={`relative w-12 h-12 rounded-full grid place-items-center shrink-0 ${done || current ? "btn-gold glow-soft" : "glass text-white/40"}`}>
                    {done ? <CheckCircle2 className="w-5 h-5" /> : <s.I className="w-5 h-5" />}
                    {current && <span className="absolute inset-0 rounded-full ring-2 ring-[#c9a96a] animate-ping" />}
                  </div>
                  <div className="flex-1 pb-2 border-b border-white/5 last:border-0">
                    <div className="flex items-center justify-between">
                      <div className={`font-display text-lg ${done || current ? "text-white" : "text-white/50"}`}>{s.t}</div>
                      <div className="text-xs text-white/50">{s.time}</div>
                    </div>
                    <div className="text-sm text-white/60 mt-0.5">{s.s}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
