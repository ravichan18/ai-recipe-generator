import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronLeft, Clock3, UtensilsCrossed } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function RecipePage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const recipe = await prisma.recipe.findFirst({
    where: {
      id: params.id,
      userEmail: session.user.email
    }
  });

  if (!recipe) {
    redirect("/dashboard");
  }

  const ingredients = JSON.parse(recipe.ingredients || "[]");
  const steps = JSON.parse(recipe.steps || "[]");

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 md:px-6">
      <Link href="/dashboard" className="mb-6 inline-flex items-center gap-2 text-sm text-brand-200">
        <ChevronLeft className="h-4 w-4" /> Back to dashboard
      </Link>

      <article className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-glow">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-brand-200">{recipe.cuisine}</p>
            <h1 className="mt-2 text-4xl font-bold text-white">{recipe.title}</h1>
          </div>
          <span className="rounded-full bg-brand-500/10 px-3 py-1 text-sm text-brand-200">{recipe.mealType || "dinner"}</span>
        </div>

        <p className="mb-8 text-lg text-slate-300">{recipe.summary}</p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
            <div className="mb-4 flex items-center gap-2 text-white">
              <UtensilsCrossed className="h-5 w-5 text-brand-200" />
              <h2 className="text-xl font-semibold">Ingredients</h2>
            </div>
            <ul className="space-y-3 text-slate-300">
              {ingredients.map((ingredient: string) => (
                <li key={ingredient} className="flex gap-2">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-brand-400" />
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
            <div className="mb-4 flex items-center gap-2 text-white">
              <Clock3 className="h-5 w-5 text-brand-200" />
              <h2 className="text-xl font-semibold">Method</h2>
            </div>
            <ol className="space-y-3 text-slate-300">
              {steps.map((step: string, index: number) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-sm font-semibold text-brand-200">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </article>
    </main>
  );
}
