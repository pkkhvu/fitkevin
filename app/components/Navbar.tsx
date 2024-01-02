"use client";

import React from "react";
import Link from "next/link";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session?.status === "authenticated" && router.pathname === "/") {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <nav className="bg-sky-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <Link
            href="/"
            className="text-3xl font-bold text-white hover:text-gray-200"
          >
            Kevin's Calorie Tracker
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {session?.status === "authenticated" && router.pathname !== "/" && (
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-bold"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
