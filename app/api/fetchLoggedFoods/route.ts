import prisma from "../../../lib/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  try {
    // Check if the food item for the given user and date already exists
    const existingFoodItem = await prisma.food.findUnique({
      where: {
        userId_date: {
          userId: body.userId,
          date: body.date,
        },
      },
    });

    // If the food item already exists, update it
    if (existingFoodItem) {
      const updatedFoodItem = await prisma.food.update({
        where: {
          id: existingFoodItem.id,
        },
        data: {
          // Update any fields you want here
          // For example:
          calories: body.calories,
          serving_size_g: body.serving_size_g,
          fat_total_g: body.fat_total_g,
          protein_g: body.protein_g,
          carbohydrates_total_g: body.carbohydrates_total_g,
        },
      });

      return NextResponse.json(updatedFoodItem);
    } else {
      // If the food item doesn't exist, create a new one
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
    }
  } catch (error) {
    console.error("Error saving or updating food item:", error);
    return new NextResponse("Something went wrong!", { status: 500 });
  }
}
