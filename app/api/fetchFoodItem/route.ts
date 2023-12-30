import { NextResponse } from "next/server";

export async function GET(req, res) {
  const { query } = req.query || {};

  if (query) {
    let newQuery = query;
    newQuery = query.replace(/ /g, "%20");
  } else {
    console.error("Query is undefined");
  }

  // console.log(newQuery);

  try {
    const response = await fetch(
      "https://api.calorieninjas.com/v1/nutrition?query=" + newQuery,
      {
        headers: {
          "X-Api-Key": "TByYBljJw3LknfD25GSpoA==T1XqX3zvPnVPADLH",
          contentType: "application/json",
        },
      }
    );

    const result = await response.json();
    console.log(result);
    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new NextResponse("Something went wrong!", { status: 500 });
  }
}
