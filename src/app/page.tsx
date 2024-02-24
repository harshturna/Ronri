import Features from "@/components/Features/Features";
import Topbar from "@/components/Topbar/Topbar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen text-white">
      <Topbar />
      <div className="my-10">
        <h1 className="text-4xl md:text-6xl text-center font-medium mt-10 mb-5">
          <span className="text-brand-red">Greatness</span> is <br />
          just one step away
        </h1>

        <div className="flex items-center justify-center">
          <Link
            href="/auth/login"
            className="text-center bg-brand-red px-3 py-2 md:px-4 md:py-3 rounded-sm hover:bg-brand-red-s"
          >
            Get Started
          </Link>
        </div>
      </div>
      <Features />
    </main>
  );
}
