"use client";

import Link from "next/link";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [inputs, setInputs] = useState({ email: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!user) return;
      router.push("/");
    } catch (error: any) {}
  };

  const handleGuestLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        "guest@email.com",
        "guest@email.com"
      );
      if (!user) return;
      router.push("/");
    } catch (error: any) {}
  };

  return (
    <form className="space-y-6 px-6 py-4" onSubmit={handleLogin}>
      <h3 className="text-xl font-medium text-white/70">
        Login to <span className="text-brand-red">ronri</span>
      </h3>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Email
        </label>
        <input
          required
          onChange={handleInputChange}
          type="email"
          name="email"
          id="email"
          className="border-1 outline-none sm:text-sm rounded-lg focus:ring-blue-500 foucus:border-blue-500 block w-full p-2 bg-neutral-800 border-neutral-500 placeholder-gray-600 text-white"
          placeholder="name@company.com"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Password
        </label>
        <input
          required
          onChange={handleInputChange}
          type="password"
          name="password"
          id="password"
          className="border-1 outline-none sm:text-sm rounded-lg focus:ring-blue-500 foucus:border-blue-500 block w-full p-2 bg-neutral-800 border-neutral-500 placeholder-gray-600 text-white"
          placeholder="****"
        />
      </div>
      <button
        type="submit"
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center bg-brand-red hover:bg-brand-red-s"
      >
        {loading ? "Logging you in..." : "Login"}
      </button>
      {error && (
        <p className="text-red-500 text-sm text-center">{error.message}</p>
      )}
      <button className="flex w-full justify-end" type="submit">
        <Link
          href="/auth/reset-password"
          className="text-sm block text-gray-500 hover:underline w-full text-right"
        >
          Forgot Password?
        </Link>
      </button>
      <div className=" text-center text-sm font-medium text-gray-500">
        Not Registered?{" "}
        <Link href="/auth/register" className="text-brand-red hover:underline">
          Create an account
        </Link>
      </div>
      <h4 className="text-center">OR</h4>
      <button
        className="bg-gray-200/10 py-2 px-2 text-sm cursor-pointer rounded hover:bg-gray-200/15 block w-[100%]"
        onClick={handleGuestLogin}
      >
        Explore the app as guest
      </button>
    </form>
  );
};

export default Login;
