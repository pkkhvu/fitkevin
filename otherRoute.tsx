// import prisma from "../../../lib/auth";
// import { getSession } from "next-auth/react";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   const session = await getSession({ req: request });

//   if (!session) {
//     return new NextResponse("Unauthorized", { status: 401 });
//   }

//   const userId = session.user.id;
//   const body = await request.json();
//   const { foodName, calories, servingSize } = body;

//   if (!foodName || !calories || !servingSize) {
//     return new NextResponse("Missing Fields", { status: 400 });
//   }

//   try {
//     const user = await prisma.user.findUnique({
//       where: { id: userId },
//       include: { loggedFoods: true }, // Include the relationship to loggedFoods
//     });

//     // Create the logged food entry
//     const loggedFood = await prisma.food.create({
//       data: {
//         name: foodName,
//         calories,
//         serving_size_g: servingSize,

//         // Add other fields here
//       },
//     });

//     // Link the logged food entry to the user
//     await prisma.user.update({
//       where: { id: userId },
//       data: {
//         loggedFoods: [...user.loggedFoods, { connect: { id: loggedFood.id } }],
//       },
//     });

//     return NextResponse.json(loggedFood);
//   } catch (error) {
//     console.error("Error saving logged food:", error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }

// import { NextResponse } from "next/server";

// export async function GET(req, res) {
//   // const { query } = req.query || {};
//   // console.log(query);
//   console.log(req);
//   let url = new URL(req.url);
//   let searchParams = new URLSearchParams(url.search);
//   let newQuery = searchParams.get("query");
//   console.log(searchParams.get("query"));

//   // console.log(newQuery);

//   try {
//     const response = await fetch(
//       `https://api.calorieninjas.com/v1/nutrition?query=${newQuery}`,
//       {
//         headers: {
//           "X-Api-Key": "TByYBljJw3LknfD25GSpoA==T1XqX3zvPnVPADLH",
//           contentType: "application/json",
//         },
//       }
//     );

//     const result = await response.json();
//     console.log(result);
//     return new NextResponse(JSON.stringify(result), { status: 200 });
//   } catch (error) {
//     console.error("Error:", error.message);
//     return new NextResponse("Something went wrong!", { status: 500 });
//   }
// }

// backend/pages/api/logFood.js
// import prisma from "../../../lib/auth";
// import { getSession } from "next-auth/react";
// import { NextResponse } from "next/server";

// export async function POST(req, res) {
//   console.log(req.body);
//   const { query } = req.body;
//   console.log(query);
//   let url = new URL(req.url);
//   let searchParams = new URLSearchParams(url.search);
//   let newQuery = searchParams.get("query");
//   console.log(newQuery);

//   const session = await getSession({ req });

//   const userId = session?.user?.id;
//   const body = await req.json();
//   const { foodName, servingSize } = body;

//   try {
//     const response = await fetch(
//       `https://api.calorieninjas.com/v1/nutrition?query=${newQuery}`,
//       {
//         headers: {
//           "X-Api-Key": "TByYBljJw3LknfD25GSpoA==T1XqX3zvPnVPADLH",
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (response.ok) {
//       const result = await response.json();

//       if (result.items && result.items.length > 0) {
//         const { calories, fat_total_g, protein_g, carbohydrates_total_g } =
//           result.items[0];

//         const loggedFood = await prisma.food.create({
//           data: {
//             name: foodName,
//             calories,
//             serving_size_g: servingSize,
//             fat_total_g,
//             protein_g,
//             carbohydrates_total_g,
//           },
//         });

//         const user = await prisma.user.findUnique({
//           where: { id: userId },
//           include: { loggedFoods: true },
//         });

//         await prisma.user.update({
//           where: { id: userId },
//           data: {
//             loggedFoods: [
//               ...user.loggedFoods,
//               { connect: { id: loggedFood.id } },
//             ],
//           },
//         });

//         return new NextResponse(JSON.stringify(loggedFood), { status: 200 });
//       } else {
//         console.error("No items found in the result");
//         return new NextResponse(JSON.stringify({ error: "No items found" }), {
//           status: 404,
//         });
//       }
//     } else {
//       console.error(`External API returned an error: ${response.statusText}`);
//       return new NextResponse(JSON.stringify({ error: response.statusText }), {
//         status: response.status,
//       });
//     }
//   } catch (error) {
//     console.error("Error during fetch:", error);
//     return new NextResponse(
//       JSON.stringify({ error: "Internal Server Error" }),
//       { status: 500 }
//     );
//   }
// }
