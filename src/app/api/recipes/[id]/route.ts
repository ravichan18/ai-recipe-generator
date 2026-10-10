import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateRecipe, generateRecipeSchema } from "@/lib/recipe-generator";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const search = url.searchParams.get("search") || "";

  const recipes = await prisma.recipe.findMany({
    where: {
      userEmail: session.user.email,
      OR: search
        ? [
            { title: { contains: search } },
            { summary: { contains: search } },
            { ingredients: { contains: search } }
          ]
        : undefined
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  const normalizedRecipes = recipes.map((recipe) => ({
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

  return NextResponse.json({ recipes: normalizedRecipes });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parseResult = generateRecipeSchema.safeParse(body);

  if (!parseResult.success) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const generated = await generateRecipe(parseResult.data);

  const recipe = await prisma.recipe.create({
    data: {
      userEmail: session.user.email,
      title: generated.title,
      summary: generated.summary,
      ingredients: JSON.stringify(generated.ingredients || []),
      steps: JSON.stringify(generated.steps || []),
      cuisine: generated.cuisine || "global",
      mealType: generated.mealType || "dinner",
      tags: JSON.stringify(generated.tags || [])
    }
  });

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
