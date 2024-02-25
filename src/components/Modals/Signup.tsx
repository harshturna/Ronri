"use client";

import Link from "next/link";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const router = useRouter();

  const [inputs, setInputs] = useState({
    email: "",
    displayName: "",
    password: "",
  });

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      if (!newUser) return;

      const userData = {
        uid: newUser.user.uid,
        email: newUser.user.email,
        displayName: inputs.displayName,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        likedProblems: [],
        solvedProblems: [],
        starredProblems: [],
      };
      await setDoc(doc(firestore, "users", newUser.user.uid), userData);

      router.push("/");
    } catch (error: any) {}
  };

  return (
    <form className="space-y-6 px-6 py-4" onSubmit={handleRegister}>
      <h3 className="text-xl font-medium text-white/70">
        Register to <span className="text-brand-red">ronri</span>
      </h3>
      <div>
        <label
          htmlFor="displayName"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Display Name
        </label>
        <input
          required
          onChange={handleChangeInput}
          type="text"
          name="displayName"
          id="displayName"
          className="border-1 outline-none sm:text-sm rounded-lg focus:ring-blue-500 foucus:border-blue-500 block w-full p-2 bg-neutral-800 border-neutral-500 placeholder-gray-600 text-white"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Email
        </label>
        <input
          required
          onChange={handleChangeInput}
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
          onChange={handleChangeInput}
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
        {loading ? "Registering..." : "Register"}
      </button>
      {error && (
        <p className="text-red-500 text-sm text-center">{error.message}</p>
      )}
      <div className=" text-center text-sm font-medium text-gray-500">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-brand-red hover:underline">
          Login
        </Link>
      </div>
    </form>
  );
};

export default Signup;
