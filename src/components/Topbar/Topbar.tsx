"use client";

import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import Logout from "../Buttons/Logout";
import { ChevronRight, ChevronLeft, LayoutList } from "lucide-react";
import Timer from "../Timer/Timer";
import { usePathname, useRouter } from "next/navigation";
import { problems } from "@/constants/code-problems";
import { Problem } from "@/constants/types/problems";

interface TopbarProps {
  isProblemsPage?: boolean;
}

const Topbar = ({ isProblemsPage }: TopbarProps) => {
  const [user] = useAuthState(auth);
  const pathName = usePathname();
  const router = useRouter();

  const isHome = pathName.split("/").at(-1) === "";

  const handleProblemChange = (isForward: boolean) => {
    const pId = pathName?.split("/").at(-1);
    const { order } = problems[pId as string] as Problem;
    const direction = isForward ? 1 : -1;
    const nextProblemOrder = order + direction;
    const nextProblemKey = Object.keys(problems).find(
      (key) => problems[key].order === nextProblemOrder
    );

    if (isForward && !nextProblemKey) {
      const firstProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === 1
      );
      router.push(`/problems/${firstProblemKey}`);
    } else if (!isForward && !nextProblemKey) {
      const lastProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === Object.keys(problems).length
      );
      router.push(`/problems/${lastProblemKey}`);
    } else {
      router.push(`/problems/${nextProblemKey}`);
    }
  };

  return (
    <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 py-8 bg-stone-900/30 border-b-2 border-stone-900">
      <div
        className={`flex w-full items-center justify-between ${
          isProblemsPage ? "" : "max-w-[1200px] mx-auto"
        }`}
      >
        <Link href="/" className="h-[22px] flex-1">
          {/* LOGO */}
          LOGO
        </Link>

        {isProblemsPage && (
          <div className="flex items-center gap-4 flex-1 justify-center">
            <div
              className="flex items-center justify-center rounded bg-gray-200/10 hover:bg-gray-200/15 h-5 w-5 sm:h-8 sm:w-8 cursor-pointer"
              onClick={() => handleProblemChange(false)}
            >
              <ChevronLeft />
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 font-sm sm:font-medium max-w-[170px] text-gray-300 cursor-pointer"
            >
              <div>
                <LayoutList />
              </div>
              <p className="text-xs sm:text-base">Problems List</p>
            </Link>
            <div
              className="flex items-center justify-center rounded bg-gray-200/10 hover:bg-gray-200/15 h-5 w-5 sm:h-8 sm:w-8 cursor-pointer"
              onClick={() => handleProblemChange(true)}
            >
              <ChevronRight />
            </div>
          </div>
        )}

        <div className="flex items-center space-x-4 flex-1 justify-end">
          {/* TODO: Remove the problms link from the problems page once homepage is added  */}
          {isHome && (
            <div>
              <Link href="/problems">
                <button className="bg-dark-fill-3 py-2 px-2 cursor-pointer rounded bg-brand-red hover:bg-brand-red-s text-xs sm:text-sm sm:py-2 sm:px-3">
                  Problems
                </button>
              </Link>
            </div>
          )}
          {user && isProblemsPage && <Timer />}
          {!user && (
            <Link href="/auth/login">
              <button className="bg-gray-200/10 py-2 px-2 text-xs cursor-pointer rounded hover:bg-gray-200/15 sm:py-2 sm:px-3 sm:text-sm">
                Get Started
              </button>
            </Link>
          )}
          {/* {user && (
            <div className="cursor-pointer group relative">USER IMAGE</div>
          )} */}
          {user && <Logout />}
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
