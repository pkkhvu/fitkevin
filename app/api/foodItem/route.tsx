import prisma from "../../../lib/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { name } = body;

  if (!name) {
    return new NextResponse("Missing Food Item", { status: 400 });
  }

  const exist = await prisma.user.findUnique({
    where: {
      name,
    },
  });

  if (exist) {
    throw new Error("Food item already exists");
  }

  const foodItem = await prisma.user.create({
    data: {
      name,
    },
  });

  return NextResponse.json(foodItem);
}
