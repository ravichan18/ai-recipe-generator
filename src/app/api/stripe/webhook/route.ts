import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_PRO_PRICE_ID) {
    return NextResponse.json({
      ok: true,
      checkoutUrl: "/pricing",
      message: "Stripe checkout is ready. Add your live price and webhook config in production."
    });
  }

  await prisma.user.update({
    where: { email: session.user.email },
    data: { plan: "pro" }
  });

  return NextResponse.redirect(new URL("/dashboard?checkout=success", process.env.NEXTAUTH_URL || "http://localhost:3000"));
}
