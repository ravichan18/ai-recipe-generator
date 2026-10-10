import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const name = String(body.name || "KitchenPilot User").trim();

  if (!email || !password || password.length < 6) {
    return NextResponse.json({ error: "Email and a password with at least 6 characters are required." }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    return NextResponse.json({ error: "A user with this email already exists." }, { status: 409 });
  }

  const hashed = await hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashed,
      plan: "free"
    }
  });

  return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name, plan: user.plan } });
}
