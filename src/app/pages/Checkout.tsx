import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Check, CreditCard, Wallet, Banknote, MapPin, ShieldCheck } from "lucide-react";
import { useShop, formatTk } from "../lib/store";
import { toast } from "sonner";

const DISTRICTS = ["Dhaka","Chattogram","Sylhet","Rajshahi","Khulna","Barishal","Rangpur","Mymensingh","Cumilla","Cox's Bazar","Narayanganj","Gazipur"];
const STEPS = ["Contact", "Shipping", "Payment", "Review"];

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useShop();
  const [step, setStep] = useState(0);
  const [pay, setPay] = useState<"cod" | "bkash" | "card">("cod");
  const nav = useNavigate();

  const shipping = cartTotal > 5000 ? 0 : 120;
  const total = cartTotal + shipping;

  const placeOrder = () => {
    toast.success("Order placed! Order #CHARU-9821");
    clearCart();
    setTimeout(() => nav("/track"), 800);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-10">
      <h1 className="font-display text-white text-4xl md:text-5xl">Checkout</h1>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 mt-10">
        <div>
          {/* Stepper */}
          <div className="flex items-center mb-8">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div className={`flex items-center gap-2 ${i <= step ? "text-white" : "text-white/40"}`}>
                  <div className={`w-8 h-8 rounded-full grid place-items-center text-xs ${i < step ? "btn-gold" : i === step ? "glass-strong text-white ring-2 ring-[#c9a96a]" : "glass text-white/60"}`}>
                    {i < step ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className="text-sm hidden sm:inline">{s}</span>
                </div>
                {i < STEPS.length - 1 && <div className={`flex-1 h-px mx-3 ${i < step ? "bg-[#c9a96a]" : "bg-white/10"}`} />}
              </div>
            ))}
          </div>

          <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-6 md:p-8 space-y-5">
            {step === 0 && (
              <>
                <h2 className="font-display text-white text-2xl">Contact Information</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="Full Name" placeholder="Mahdi Hasan" />
                  <Field label="Phone" placeholder="01XXXXXXXXX" />
                </div>
                <Field label="Email" placeholder="you@charulata.bd" />
                <label className="flex items-center gap-2 text-white/70 text-sm"><input type="checkbox" defaultChecked className="accent-[#f0a8d0]" /> Send me order updates on WhatsApp</label>
              </>
            )}
            {step === 1 && (
              <>
                <h2 className="font-display text-white text-2xl">Shipping Address</h2>
                <Field label="Address Line" placeholder="House 42, Road 11" />
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="City / Area" placeholder="Gulshan, Dhaka" />
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">District</label>
                    <select className="w-full glass rounded-xl px-4 h-12 text-white bg-transparent outline-none">
                      {DISTRICTS.map(d => <option key={d} className="bg-[#1c1916]">{d}</option>)}
                    </select>
                  </div>
                </div>
                <Field label="Order Notes (optional)" placeholder="Leave at security desk if not home" textarea />
              </>
            )}
            {step === 2 && (
              <>
                <h2 className="font-display text-white text-2xl">Payment Method</h2>
                <div className="grid gap-3">
                  {[
                    { id: "cod", I: Banknote, t: "Cash on Delivery", s: "Pay in cash when your order arrives" },
                    { id: "bkash", I: Wallet, t: "bKash / Nagad", s: "Mobile financial services" },
                    { id: "card", I: CreditCard, t: "Card", s: "Visa, Mastercard, Amex" },
                  ].map((p) => (
                    <button key={p.id} onClick={() => setPay(p.id as any)} className={`text-left rounded-2xl p-4 flex items-center gap-4 transition ${pay === p.id ? "glass-strong ring-1 ring-[#c9a96a]" : "glass hover:bg-white/[0.07]"}`}>
                      <div className="w-11 h-11 rounded-xl btn-gold grid place-items-center text-[#14110f]"><p.I className="w-5 h-5" /></div>
                      <div className="flex-1">
                        <div className="text-white">{p.t}</div>
                        <div className="text-white/50 text-sm">{p.s}</div>
                      </div>
                      <div className={`w-5 h-5 rounded-full grid place-items-center ${pay === p.id ? "btn-gold" : "border border-white/30"}`}>
                        {pay === p.id && <Check className="w-3 h-3 text-[#14110f]" />}
                      </div>
                    </button>
                  ))}
                </div>
                {pay === "card" && (
                  <div className="grid sm:grid-cols-2 gap-3 mt-2">
                    <Field label="Card Number" placeholder="•••• •••• •••• ••••" />
                    <Field label="Name on card" placeholder="Mahdi Hasan" />
                    <Field label="Expiry" placeholder="MM / YY" />
                    <Field label="CVV" placeholder="•••" />
                  </div>
                )}
              </>
            )}
            {step === 3 && (
              <>
                <h2 className="font-display text-white text-2xl">Review & Place Order</h2>
                <div className="space-y-2 text-sm text-white/80">
                  <Row icon={<MapPin className="w-4 h-4 text-[#c9a96a]"/>} t="Mahdi Hasan · 01700000000 · House 42, Gulshan 2, Dhaka" />
                  <Row icon={<Wallet className="w-4 h-4 text-[#c9a96a]"/>} t={`Payment: ${pay.toUpperCase()}`} />
                  <Row icon={<ShieldCheck className="w-4 h-4 text-[#c9a96a]"/>} t="Charulata authenticity guaranteed · 7-day exchange" />
                </div>
                <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
                  {cart.map((i) => (
                    <div key={i.product.id} className="flex justify-between text-white/80">
                      <span>{i.product.name} × {i.qty}</span><span>{formatTk(i.product.price * i.qty)}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="flex justify-between pt-4">
              <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="px-5 h-11 rounded-full glass text-white disabled:opacity-30">Back</button>
              {step < 3 ? (
                <button onClick={() => setStep(step + 1)} className="px-7 h-11 rounded-full btn-gold glow-soft">Continue</button>
              ) : (
                <button onClick={placeOrder} className="px-7 h-11 rounded-full btn-gold glow-soft">Place Order · {formatTk(total)}</button>
              )}
            </div>
          </motion.div>
        </div>

        <aside className="lg:sticky lg:top-28 h-fit">
          <div className="glass-strong rounded-3xl p-6">
            <div className="font-display text-white text-xl mb-4">Order Summary</div>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.length === 0 ? (
                <div className="text-white/50 text-sm">Your bag is empty. <Link to="/shop" className="text-[#c9a96a]">Shop now</Link></div>
              ) : cart.map((i) => (
                <div key={i.product.id} className="flex gap-3">
                  <img src={i.product.image} className="w-14 h-16 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm truncate">{i.product.name}</div>
                    <div className="text-white/50 text-xs">Qty {i.qty}</div>
                  </div>
                  <div className="text-[#c9a96a] text-sm">{formatTk(i.product.price * i.qty)}</div>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 mt-4 pt-4 text-sm space-y-2">
              <div className="flex justify-between text-white/70"><span>Subtotal</span><span>{formatTk(cartTotal)}</span></div>
              <div className="flex justify-between text-white/70"><span>Shipping</span><span>{shipping === 0 ? "Free" : formatTk(shipping)}</span></div>
              <div className="flex justify-between text-white font-display text-lg pt-2"><span>Total</span><span className="gradient-text">{formatTk(total)}</span></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, placeholder, textarea }: { label: string; placeholder?: string; textarea?: boolean }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">{label}</label>
      {textarea ? (
        <textarea rows={3} placeholder={placeholder} className="w-full glass rounded-xl px-4 py-3 text-white outline-none placeholder:text-white/40 resize-none" />
      ) : (
        <input placeholder={placeholder} className="w-full glass rounded-xl px-4 h-12 text-white outline-none placeholder:text-white/40" />
      )}
    </div>
  );
}
function Row({ icon, t }: { icon: React.ReactNode; t: string }) {
  return <div className="flex items-center gap-2 glass rounded-xl px-4 py-3">{icon} <span>{t}</span></div>;
}
