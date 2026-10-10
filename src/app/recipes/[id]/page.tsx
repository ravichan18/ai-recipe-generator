import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    features: ["5 recipe generations/month", "Basic history", "Community ideas"],
    cta: "Start free",
    highlighted: false
  },
  {
    name: "Pro",
    price: "$9",
    features: ["Unlimited recipe generations", "Smart pantry suggestions", "Priority kitchen notes", "Saved favorites"],
    cta: "Upgrade to Pro",
    highlighted: true
  }
];

export default function PricingPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-12">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-200">Simple pricing</p>
        <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">Ready when you are</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <div key={plan.name} className={`rounded-[2rem] border p-8 ${plan.highlighted ? "border-brand-500/50 bg-brand-500/10 shadow-glow" : "border-white/10 bg-slate-900/80"}`}>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-xl font-semibold text-white">{plan.name}</p>
              {plan.highlighted && <span className="rounded-full bg-brand-500/15 px-2 py-1 text-xs uppercase tracking-[0.2em] text-brand-200">Popular</span>}
            </div>
            <div className="mb-5 flex items-end gap-2">
              <span className="text-4xl font-black text-white">{plan.price}</span>
              <span className="pb-1 text-slate-400">/ month</span>
            </div>
            <ul className="space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-slate-200">
                  <span className="mt-0.5 rounded-full bg-brand-500/15 p-1 text-brand-200"><Check className="h-3.5 w-3.5" /></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href={plan.highlighted ? "/api/stripe/checkout" : "/signup"}
              className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 font-semibold ${plan.highlighted ? "bg-brand-500 text-slate-950 hover:bg-brand-400" : "border border-white/10 bg-white/5 text-white hover:border-brand-400/50"}`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
