"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const session = useSession();
  return (
    <div className="navbar bg-sky-200 mt-15">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">
          {session?.status === "authenticated" ? (
            <Link href="/dashboard">Kevin's Calorie Tracker</Link>
          ) : (
            <Link href="/">Kevin's Calorie Tracker</Link>
          )}
        </a>
      </div>
      <div className="navbar-end">
        {session?.status === "authenticated" ? (
          <button
            onClick={() => signOut()}
            className="bg-red-500 font-semibold text-white px-7 py-3 rounded-xl hover:bg-red-700"
          >
            Sign Out
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navbar;
