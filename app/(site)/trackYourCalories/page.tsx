"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function TrackYourCalories() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/trackYourCalories");
    } else {
      router.push("/login");
    }
  }, []);

  const [data, setData] = useState({
    name: "",
  });

  const logFoodItem = async (e) => {
    e.preventDefault();
    try {
      console.log("Query:", data.name);
      const response = await axios.get("/api/fetchFoodItem", {
        params: { query: data.name },
      });
      console.log("Response:", response);
      console.log("Response:", response.data);
      const foodItem = response.data;

      toast.success("Food logged successfully!");
    } catch (error) {
      console.error("Error fetching food item:", error);
      toast.error("Food not found!");
    }

    setData({ name: "" });
  };

  const registerFoodItem = async (e) => {
    e.preventDefault();
    axios
      .get("/api/foodItem", data)
      .then(() => toast.success("Your food has been added!"))
      .catch(() => toast.error("Something went wrong!"));
    setData({ name: "" });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-30 w-auto"
            src="/food.png"
            alt="logo"
            width={100}
            height={100}
          />
          <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-600">
            Search for a food item!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={logFoodItem}>
            <div>
              <label
                htmlFor="name"
                className="text-center block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  required
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="flex w-6/12 justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                Log Food
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
