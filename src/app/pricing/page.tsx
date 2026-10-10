import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import DashboardShell, { type Recipe } from "@/components/dashboard-shell";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const recipes = await prisma.recipe.findMany({
    where: {
      userEmail: session.user.email
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  const normalizedRecipes: Recipe[] = recipes.map((recipe) => ({
    id: recipe.id,
    title: recipe.title,
    summary: recipe.summary,
    ingredients: JSON.parse(recipe.ingredients || "[]"),
    steps: JSON.parse(recipe.steps || "[]"),
    cuisine: recipe.cuisine,
    mealType: recipe.mealType || "dinner",
    tags: JSON.parse(recipe.tags || "[]"),
    createdAt: recipe.createdAt.toISOString()
  }));

  return <DashboardShell initialRecipes={normalizedRecipes} />;
}
