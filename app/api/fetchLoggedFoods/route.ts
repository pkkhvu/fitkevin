import prisma from "../../../lib/auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  let url = new URL(request.url);
  let searchParams = new URLSearchParams(url.search);
  let foundUserId = searchParams.get("userId");
  let foundDate = searchParams.get("date");
  let newFoundDate = foundDate.split("T")[0];
  console.log("FOUND DATE:", newFoundDate);

  try {
    if (!foundUserId || !newFoundDate) {
      throw new Error("userId or date is undefined");
    }

    const existingFoodItem = await prisma.food.findMany({
      where: {
        userId: foundUserId,
        date: newFoundDate,
      },
    });

    console.log("Existing Food Items:", existingFoodItem);

    return NextResponse.json(existingFoodItem, { status: 200 });
  } catch (error) {
    console.error("Error fetching:", error);

    return new NextResponse("Error fetching food items: " + error.message, {
      status: 500,
    });
  }
}
