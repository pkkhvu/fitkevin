"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { DatePickerDemo } from "../../components/DatePicker";

export default function DailyTrackYourCalories() {
  const session = useSession();
  const router = useRouter();
  const [resetDate, setResetDate] = useState(new Date());
  const [foodItem, setFoodItem] = useState(null);
  const [loggedItems, setLoggedItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState({
    name: "",
  });

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/trackYourCalories");
    } else {
      router.push("/login");
    }
  }, [session, router]);

  useEffect(() => {
    const fetchLoggedItems = async () => {
      try {
        const response = await axios.get("/api/foodItems", {
          params: { date: selectedDate.toISOString() },
        });

        setLoggedItems(response.data);
      } catch (error) {
        console.error("Error fetching logged items:", error);
      }
    };

    fetchLoggedItems();
  }, [selectedDate]);

  const handleDateChange = (daysToAdd) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + daysToAdd);
    setSelectedDate(newDate);
    setResetDate(newDate);
  };

  const handleDatePickerSelect = (selectedDate) => {
    setSelectedDate(selectedDate);
  };

  const logFoodItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/api/foodItem", {
        params: { query: data.name },
      });

      const newFoodItem = response.data.items[0];
      setLoggedItems((prevItems) => [...prevItems, newFoodItem]);

      toast.success("Food logged successfully!");
    } catch (error) {
      console.error("Error fetching food item:", error);
      toast.error("Food not found!");
    }

    setData({ name: "" });
  };

  return (
    <div className="flex flex-row">
      <div className="flex-auto min-h-full flex-col justify-center px-6 py-12 lg:px-8">
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

      <div className="flex-auto min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-600">
          Your Food Diary for: <br />
          {selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>
        <div className="flex justify-center space-x-4 mt-4 mx-5">
          <button
            className="text-sky-600 font-semibold hover:underline hover:font-bold"
            onClick={() => handleDateChange(-1)}
          >
            Yesterday
          </button>
          <button
            className="text-sky-600 font-semibold hover:underline hover:font-bold"
            onClick={() => handleDateChange(1)}
          >
            Tomorrow
          </button>
        </div>
        <div className="ml-4 text-center mt-3">
          <DatePickerDemo
            onSelectDate={handleDatePickerSelect}
            resetDate={resetDate}
          />
        </div>
        <div className="mt-4">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Food Name</th>
                <th className="px-4 py-2 border">Calories</th>
                <th className="px-4 py-2 border">Serving Size (g)</th>
                <th className="px-4 py-2 border">Total Fat (g)</th>
                <th className="px-4 py-2 border">Protein (g)</th>
                <th className="px-4 py-2 border">Carbohydrates (g)</th>
              </tr>
            </thead>
            <tbody>
              {loggedItems.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{item.name}</td>
                  <td className="px-4 py-2 border">{item.calories}</td>
                  <td className="px-4 py-2 border">{item.serving_size_g}</td>
                  <td className="px-4 py-2 border">{item.fat_total_g}</td>
                  <td className="px-4 py-2 border">{item.protein_g}</td>
                  <td className="px-4 py-2 border">
                    {item.carbohydrates_total_g}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    // ...
  );
}
