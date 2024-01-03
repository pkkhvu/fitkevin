import prisma from "../../../lib/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  try {
    const savedFoodItem = await prisma.food.create({
      data: {
        name: body.name,
        calories: body.calories,
        serving_size_g: body.serving_size_g,
        fat_total_g: body.fat_total_g,
        protein_g: body.protein_g,
        carbohydrates_total_g: body.carbohydrates_total_g,
        date: body.date,
        userId: body.userId,
      },
    });

    return NextResponse.json(savedFoodItem);
  } catch (error) {
    console.error("Error saving food item:", error);
    return new NextResponse("Something went wrong!", { status: 500 });
  }
}
