import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const recipe = await prisma.recipe.findFirst({
    where: {
      id: params.id,
      userEmail: session.user.email
    }
  });

  if (!recipe) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    recipe: {
      id: recipe.id,
      title: recipe.title,
      summary: recipe.summary,
      ingredients: JSON.parse(recipe.ingredients || "[]"),
      steps: JSON.parse(recipe.steps || "[]"),
      cuisine: recipe.cuisine,
      mealType: recipe.mealType || "dinner",
      tags: JSON.parse(recipe.tags || "[]"),
      createdAt: recipe.createdAt.toISOString()
    }
  });
}
