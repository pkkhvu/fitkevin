"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Footer from "./../../components/Footer";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="mt-10">
        <main className="text-lg text-center p-5">
          <div className="my-10 font-bold text-5xl text-slate-700">
            WELCOME!
          </div>
          <div className="text-xl">
            Start tracking your weight or calories now!
          </div>
          <div className="mt-10 flex justify-center">
            <div>
              <button className="bg-blue-500 p-5 rounded-xl text-white hover:bg-blue-700 shadow-2xl font-semibold mx-7">
                <Link href="/trackYourWeight">Track Your Weight</Link>
              </button>
            </div>
            <div>
              <button className="bg-slate-700 p-5 rounded-xl text-white hover:bg-slate-500 shadow-2xl font-semibold mx-7">
                <Link href="/trackYourCalories">Track Your Calories</Link>
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  } else {
    redirect("/login");
  }
}
