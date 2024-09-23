"use client";

import Features from "@/components/Features/Features";
import Topbar from "@/components/Topbar/Topbar";
import Link from "next/link";
import Image from "next/image";
import bg from "../../public/bg.png";

export default function Home() {
  return (
    <main className="relative  text-white overflow-hidden">
      <Topbar />
      <div className="my-10 z-10">
        <div className="absolute left-[50%] top-[30%] translate-x-[-50%] translate-y-[-50%]	 z-[-1] opacity-[60%] overflow-hidden">
          <Image
            src={bg}
            alt="background"
            width={2000}
            height={1200}
            style={{ maxWidth: "unset", height: "unset", filter: "blur(40px)" }}
          />
        </div>
        <div className="mb-20 mt-40 relative">
          <h1 className="mt-5 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-5xl font-medium tracking-tight text-transparent md:text-7xl">
            <span className="text-brand-red">Greatness</span> is <br /> just one
            step away
          </h1>
          <div className="flex items-center justify-center mt-6">
            <Link
              href="/problems"
              className="text-center bg-brand-red px-3 py-2 md:px-4 md:py-3 rounded-sm hover:bg-brand-red-s"
            >
              Explore Problems
            </Link>
          </div>
        </div>
        <Features />
      </div>
      <footer className="mb-6">
        <hr className="mt-6 mb-6 mx-2 text-muted-foreground lg:my-8 border-t border-stone-800" />
        <div className="block text-stone-400 text-center">
          <div className ="flex items-center gap-1 mr-1">
            <Image width={40} height={40} src={Logo} alt="Ronri Logo" />
            Ronri
            </div>
          <a className="text-sm text-stone-600" href="https://harshturna.com" targe="_blank">by harsh</a>
        </span>
      </footer>
    </main>
  );
}
