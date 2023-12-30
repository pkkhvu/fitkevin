import Link from "next/link";
import Footer from "./components/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div>
      <div className="mt-10">
        <main className="text-lg text-center p-5">
          <div className="my-10 font-bold text-7xl text-slate-700">HELLO!</div>
          <div>
            Enjoy using my calorie tracker because I'm not willing to buy a
            MyFitnessPal subscription anymore.
            <p className="mt-5">
              Click
              <a className="text-red-500 font-bold"> sign up </a>
              or <a className="text-sky-600 font-bold">sign in </a>
              to get started!
            </p>
          </div>
          <div className="mt-10 flex justify-center">
            <div>
              <button className="bg-red-500 py-5 px-10 rounded-xl text-white hover:bg-red-700 shadow-2xl font-semibold mx-7">
                <Link href="/register">SIGN UP</Link>
              </button>
            </div>
            <div>
              <button className="bg-sky-700 py-5 px-10 rounded-xl text-white hover:bg-sky-500 shadow-2xl font-semibold mx-7">
                <Link href="/login">SIGN IN</Link>
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
