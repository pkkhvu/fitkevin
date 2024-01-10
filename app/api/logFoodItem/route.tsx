import { NextResponse } from "next/server";
import { parse } from "url";
import { parse as parseQuery } from "querystring";

export async function POST(req, res) {
  // const query = req.body.query || {};
  console.log(req);
  const { name } = req.body;
  console.log(name);
  // console.log(query);
  let url = new URL(req.url);
  console.log(url);
  let searchParams = new URLSearchParams(url.search);
  console.log(searchParams.get("query"));
  let newQuery = searchParams.get("query");
  console.log(newQuery);

  const { query: queryParams } = parse(req.url, true);
  console.log(queryParams.query);
  try {
    const response = await fetch(
      `https://api.calorieninjas.com/v1/nutrition?query=${newQuery}`,
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
