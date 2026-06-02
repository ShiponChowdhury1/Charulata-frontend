import { Link, useParams } from "react-router";
import { Mail, Lock, User, Eye, EyeOff, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { IMG, BRAND } from "../lib/data";

export default function Auth() {
  const { mode } = useParams();
  const m = (mode || "login") as "login" | "register" | "forgot" | "otp";
  const [show, setShow] = useState(false);

  const titles: Record<string, { t: string; s: string; cta: string; alt: string; altLink: string; altLabel: string }> = {
    login: { t: "Welcome back", s: "Sign in to the Maison.", cta: "Sign In", alt: "New here?", altLink: "/auth/register", altLabel: "Create account" },
    register: { t: "Join the Maison", s: "Create your Charulata account.", cta: "Create Account", alt: "Already a member?", altLink: "/auth/login", altLabel: "Sign in" },
    forgot: { t: "Reset password", s: "We’ll email you a secure link.", cta: "Send Reset Link", alt: "Remembered?", altLink: "/auth/login", altLabel: "Sign in" },
    otp: { t: "Verify your number", s: "Enter the 6-digit code we sent to +880 17••••0000.", cta: "Verify", alt: "Didn’t get it?", altLink: "/auth/login", altLabel: "Resend" },
  };
  const cfg = titles[m];

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-10">
      <div className="grid lg:grid-cols-2 gap-10 items-stretch">
        <div className="relative rounded-3xl overflow-hidden glass min-h-[500px] hidden lg:block">
          <img src={IMG.saree2} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#14110f] via-[#14110f]/30 to-transparent" />
          <div className="absolute bottom-10 left-10 right-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-white/80 mb-4">
              <Sparkles className="w-3 h-3 text-[#c9a96a]" /> VIP Club
            </div>
            <h2 className="font-display text-white text-4xl leading-tight">
              Step inside <span className="gradient-text italic">{BRAND.name}.</span>
            </h2>
            <p className="text-white/70 mt-3 max-w-md">Private previews, complimentary alterations, and concierge styling — reserved for our community.</p>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-strong rounded-3xl p-8 md:p-12 flex flex-col justify-center">
          <h1 className="font-display text-white text-4xl">{cfg.t}</h1>
          <p className="text-white/60 mt-2">{cfg.s}</p>

          <div className="mt-8 space-y-3">
            {m === "register" && (
              <Input icon={<User className="w-4 h-4" />} placeholder="Full name" />
            )}
            {m !== "otp" && (
              <Input icon={<Mail className="w-4 h-4" />} placeholder="Email or phone" />
            )}
            {(m === "login" || m === "register") && (
              <Input
                icon={<Lock className="w-4 h-4" />}
                placeholder="Password"
                type={show ? "text" : "password"}
                right={<button onClick={() => setShow(!show)} className="text-white/50 hover:text-white">{show ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}</button>}
              />
            )}
            {m === "otp" && (
              <div className="flex justify-center gap-2">
                {Array.from({length:6}).map((_,i) => <input key={i} maxLength={1} className="w-12 h-14 text-center glass rounded-xl text-white outline-none focus:ring-2 focus:ring-[#c9a96a]" />)}
              </div>
            )}

            {m === "login" && (
              <div className="flex items-center justify-between text-sm text-white/70">
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-[#f0a8d0]" /> Keep me signed in</label>
                <Link to="/auth/forgot" className="text-[#c9a96a]">Forgot password?</Link>
              </div>
            )}

            <button className="w-full h-12 rounded-full btn-gold glow-soft flex items-center justify-center gap-2">
              {cfg.cta} <ArrowRight className="w-4 h-4" />
            </button>

            {(m === "login" || m === "register") && (
              <>
                <div className="flex items-center gap-3 my-2">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-xs text-white/40 uppercase tracking-widest">Or continue with</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="h-12 rounded-full glass text-white flex items-center justify-center gap-2 text-sm hover:bg-white/10">
                    <span className="w-5 h-5 rounded-full bg-white grid place-items-center text-xs text-[#14110f]">G</span> Google
                  </button>
                  <button className="h-12 rounded-full glass text-white flex items-center justify-center gap-2 text-sm hover:bg-white/10">
                    <span className="w-5 h-5 rounded-full bg-[#1877f2] grid place-items-center text-xs text-white">f</span> Facebook
                  </button>
                </div>
              </>
            )}

            <div className="text-center text-sm text-white/60 mt-4">
              {cfg.alt} <Link to={cfg.altLink} className="text-[#c9a96a] hover:underline">{cfg.altLabel}</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Input({ icon, right, ...rest }: { icon: React.ReactNode; right?: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="glass rounded-xl flex items-center gap-3 px-4 h-12">
      <span className="text-white/50">{icon}</span>
      <input {...rest} className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40 text-sm" />
      {right}
    </div>
  );
}
