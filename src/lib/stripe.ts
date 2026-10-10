import { z } from "zod";

export const generateRecipeSchema = z.object({
  ingredients: z.string().min(1),
  mealType: z.string().default("dinner"),
  cuisine: z.string().default("international")
});

export type GenerateRecipeInput = z.infer<typeof generateRecipeSchema>;

function parseIngredients(input: string) {
  return input
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 8);
}

export async function generateRecipe(input: GenerateRecipeInput) {
  if (process.env.OPENAI_API_KEY) {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0.8,
          messages: [
            {
              role: "system",
              content: "You are a helpful culinary assistant. Return valid JSON with title, summary, ingredients, steps, cuisine, mealType, tags."
            },
            {
              role: "user",
              content: `Create a ${input.cuisine} ${input.mealType} recipe using these ingredients: ${input.ingredients}. Keep it practical and tasty.`
            }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content ?? "";
        const payload = content.match(/\{[\s\S]*\}/)?.[0] ?? null;

        if (payload) {
          const parsed = JSON.parse(payload);
          if (parsed.title && parsed.summary && Array.isArray(parsed.ingredients) && Array.isArray(parsed.steps)) {
            return parsed;
          }
        }
      }
    } catch (error) {
      console.error("AI generation failed; using fallback.", error);
    }
  }

  const list = parseIngredients(input.ingredients);
  const baseTitle =
    list.length > 3 ? `${capitalize(list[0])} ${capitalize(list[1])} Bowl` : `${capitalize(input.cuisine)} Kitchen Feast`;

  const summary = `A ${input.mealType} recipe built around ${list.join(", ")}, designed to be flavorful, easy, and comforting.`;

  return {
    title: baseTitle,
    summary,
    ingredients: list.length > 0 ? list : ["onion", "garlic", "olive oil", "seasoning"],
    steps: [
      `Warm a skillet and cook the aromatics like ${list[0] || "onion"} and garlic until fragrant.`,
      `Add the remaining ingredients and stir-fry or simmer until everything is tender and well combined.`,
      `Season to taste, finish with a squeeze of citrus or herbs, and serve hot.`,
      `Optional: top with fresh herbs, chili crisp, or a crunchy crunchy garnish.`
    ],
    cuisine: input.cuisine || "global",
    mealType: input.mealType || "dinner",
    tags: [input.cuisine, input.mealType, "weeknight"].filter(Boolean)
  };
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
