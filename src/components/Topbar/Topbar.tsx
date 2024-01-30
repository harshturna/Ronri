"use client";

import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import Logout from "../Buttons/Logout";

const Topbar = () => {
  const [user] = useAuthState(auth);
  return (
    <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 py-8 bg-stone-900/30 border-b-2 border-stone-900">
      <div
        className={`flex w-full items-center justify-between max-w-[1200px] mx-auto`}
      >
        <Link href="/" className="h-[22px] flex-1">
          {/* LOGO */}
          LOGO
        </Link>

        <div className="flex items-center space-x-4 flex-1 justify-end">
          <div>
            <a
              href="https://www.buymeacoffee.com/burakorkmezz"
              target="_blank"
              rel="noreferrer"
              className="bg-dark-fill-3 py-2 px-2 cursor-pointer rounded bg-brand-red hover:bg-brand-red-s text-xs sm:text-sm sm:py-2 sm:px-3"
            >
              Problems
            </a>
          </div>
          {!user && (
            <Link href="/auth/login">
              <button className="bg-gray-200/10 py-2 px-2 text-xs cursor-pointer rounded hover:bg-gray-200/15 sm:py-1.5 sm:px-3 sm:text-sm">
                Get Started
              </button>
            </Link>
          )}
          {user && (
            <div className="cursor-pointer group relative">USER IMAGE</div>
          )}
          {user && <Logout />}
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
