"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, Search, Sparkles } from "lucide-react";

export type Recipe = {
  id: string;
  title: string;
  summary: string;
  ingredients: string[];
  steps: string[];
  cuisine: string;
  mealType: string;
  tags: string[];
  createdAt: string;
};

export default function DashboardPage({ initialRecipes }: { initialRecipes: Recipe[] }) {
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [ingredientInput, setIngredientInput] = useState("chicken, rice, spinach, garlic, soy sauce");
  const [mealType, setMealType] = useState("dinner");
  const [cuisine, setCuisine] = useState("asian");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const query = search.toLowerCase();
      if (!query) return true;
      return (
        recipe.title.toLowerCase().includes(query) ||
        recipe.summary.toLowerCase().includes(query) ||
        recipe.ingredients.join(" ").toLowerCase().includes(query)
      );
    });
  }, [recipes, search]);

  useEffect(() => {
    async function loadRecipes() {
      const response = await fetch(`/api/recipes?search=${encodeURIComponent(search)}`);
      if (!response.ok) return;
      const data = await response.json();
      setRecipes(data.recipes || []);
    }

    loadRecipes();
  }, [search]);

  async function handleGenerate(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredients: ingredientInput,
        mealType,
        cuisine
      })
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Could not generate recipe.");
      setLoading(false);
      return;
    }

    setRecipes((current) => [data.recipe, ...current]);
    setLoading(false);
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <nav className="mb-8 flex items-center justify-between rounded-full border border-white/10 bg-slate-900/80 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500/15 text-brand-300">K</span>
          <span className="font-semibold text-white">KitchenPilot</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-300">
          <Link href="/pricing" className="rounded-full border border-white/10 px-3 py-1.5 hover:border-brand-400/40">Pro</Link>
          <button onClick={() => router.push("/api/auth/signout")} className="rounded-full bg-white/5 px-3 py-1.5">Sign out</button>
        </div>
      </nav>

      <section className="mb-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-5 shadow-glow">
          <div className="mb-5 flex items-center gap-3">
            <span className="rounded-full bg-brand-500/15 p-2 text-brand-200"><Sparkles className="h-4 w-4" /></span>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-brand-200">Generate recipe</p>
              <h1 className="text-2xl font-bold text-white">What’s in your kitchen?</h1>
            </div>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Ingredients</label>
              <textarea
                value={ingredientInput}
                onChange={(event) => setIngredientInput(event.target.value)}
                className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-slate-950 px-3 py-3 text-white outline-none transition focus:border-brand-400"
                placeholder="e.g. chicken, rice, spinach, garlic, onion"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-slate-300">Meal type</label>
                <select
                  value={mealType}
                  onChange={(event) => setMealType(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-white outline-none focus:border-brand-400"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">Cuisine</label>
                <select
                  value={cuisine}
                  onChange={(event) => setCuisine(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-white outline-none focus:border-brand-400"
                >
                  <option value="asian">Asian</option>
                  <option value="mediterranean">Mediterranean</option>
                  <option value="american">American</option>
                  <option value="mexican">Mexican</option>
                  <option value="indian">Indian</option>
                  <option value="italian">Italian</option>
                </select>
              </div>
            </div>

            {error && <p className="text-sm text-rose-300">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-brand-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Cooking..." : "Generate recipe"}
            </button>
          </form>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Kitchen notes</h2>
            <span className="rounded-full bg-brand-500/10 px-2 py-1 text-sm text-brand-200">AI ready</span>
          </div>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">Lean, high-protein dinners are prioritized by default.</li>
            <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">The app avoids food waste by reusing pantry staples first.</li>
            <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">Every generated result can be revisited and re-used later.</li>
          </ul>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-5">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-brand-200">Recipe history</p>
            <h2 className="text-2xl font-bold text-white">Saved meals</h2>
          </div>

          <div className="relative min-w-[220px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search recipes"
              className="w-full rounded-xl border border-white/10 bg-slate-950 pl-10 pr-3 py-2.5 text-white outline-none focus:border-brand-400"
            />
          </div>
        </div>

        {filteredRecipes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/50 p-8 text-center">
            <p className="text-lg font-medium text-white">No recipes yet</p>
            <p className="mt-2 text-slate-400">Generate your first meal from the ingredients you already have.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredRecipes.map((recipe) => (
              <Link href={`/recipes/${recipe.id}`} key={recipe.id} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 transition hover:border-brand-400/40 hover:bg-slate-950">
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-brand-500/10 px-2 py-1 text-xs uppercase tracking-[0.12em] text-brand-200">
                    {recipe.cuisine}
                  </span>
                  <span className="text-xs text-slate-400">{recipe.mealType}</span>
                </div>
                <h3 className="text-xl font-semibold text-white">{recipe.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{recipe.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {recipe.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full bg-white/5 px-2 py-1 text-xs text-slate-300">#{tag}</span>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
                  <span>{new Date(recipe.createdAt).toLocaleDateString()}</span>
                  <span className="inline-flex items-center gap-1 text-brand-200">
                    View <ExternalLink className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
