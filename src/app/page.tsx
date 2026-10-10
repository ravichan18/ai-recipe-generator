import Link from "next/link";
import { ChefHat, Sparkles, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-16 pt-8">
      <nav className="mb-12 flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
        <Link href="/" className="flex items-center gap-3 font-semibold text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500/15 text-brand-300">
            <ChefHat className="h-4 w-4" />
          </span>
          KitchenPilot
        </Link>
        <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <Link href="#features">Features</Link>
          <Link href="#how-it-works">How it works</Link>
          <Link href="/pricing">Pricing</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="rounded-full px-4 py-2 text-sm text-slate-200 hover:text-white">Log in</Link>
          <Link href="/signup" className="rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-brand-400">
            Start cooking
          </Link>
        </div>
      </nav>

      <section className="grid items-center gap-10 pb-16 pt-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-brand-200">
            <Sparkles className="h-3.5 w-3.5" /> AI-powered meal planning
          </span>
          <h1 className="max-w-xl text-5xl font-black tracking-tight text-white md:text-6xl">
            Turn what’s in your kitchen into a meal worth repeating.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-300">
            KitchenPilot turns ingredients, pantry staples, and a few cooking preferences into smart, delicious recipes in under a minute.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/signup" className="rounded-full bg-brand-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-brand-400">
              Create free account
            </Link>
            <Link href="/dashboard" className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-slate-100 transition hover:border-brand-400/40 hover:text-white">
              Try the dashboard
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm text-slate-400">
            <div>
              <span className="block text-2xl font-bold text-white">24k+</span>
              recipes generated
            </div>
            <div>
              <span className="block text-2xl font-bold text-white">4.9/5</span>
              average taste rating
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-5 shadow-glow backdrop-blur">
          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-4">
            <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400">
              <span>Today’s idea</span>
              <span className="rounded-full bg-brand-500/10 px-2 py-1 text-brand-200">30 min</span>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-brand-500/10 via-slate-900 to-slate-900 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Ingredients</p>
                  <h3 className="mt-1 text-2xl font-bold text-white">Chicken + rice + greens</h3>
                </div>
                <span className="rounded-full bg-white/5 p-2 text-brand-300">
                  <Zap className="h-4 w-4" />
                </span>
              </div>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="rounded-xl bg-white/5 px-3 py-2">1. Pan-sear chicken with garlic and soy.</div>
                <div className="rounded-xl bg-white/5 px-3 py-2">2. Fold in rice, spinach, and scallions.</div>
                <div className="rounded-xl bg-white/5 px-3 py-2">3. Finish with chili crisp and lime.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-200">Why it works</p>
          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Built around the single core loop</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: "1. Add what you have",
              text: "Paste ingredients, pantry staples, or leftovers. The AI suggests realistic meal combinations immediately."
            },
            {
              title: "2. Generate a recipe",
              text: "Get a tailored plan with steps, timing, flavor profile, and easy substitutions for your taste."
            },
            {
              title: "3. Save and iterate",
              text: "Keep a clean recipe history, filter your favorites, and make the best meals again without thinking twice."
            }
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15 text-lg font-bold text-brand-200">
                {item.title.split(".")[0]}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">{item.title}</h3>
              <p className="text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="py-16">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 md:p-12">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-200">How it works</p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Simple enough for everyday use</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              "Write ingredients you already have.",
              "Choose meal type, cuisine, and effort level.",
              "Get a recipe and save it to your recipe history."
            ].map((text, index) => (
              <div key={text} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center text-slate-200">
                <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-500/15 text-brand-200">
                  {index + 1}
                </div>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
