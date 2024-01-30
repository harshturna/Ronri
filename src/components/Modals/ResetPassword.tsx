"use client";

import { auth } from "@/firebase/firebase";
import { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const success = await sendPasswordResetEmail(email);
      if (success) {
        toast.success("Email sent successfully", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {}
  };

  return (
    <form className="space-y-6 px-6 py-4" onSubmit={handleReset}>
      <h3 className="text-xl font-medium text-white/70">Reset Password</h3>
      <p className="text-sm text-gray-600 !my-0">
        Forgot your password? Enter your e-mail below, and we&apos;ll send you a
        reset password link{" "}
      </p>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Email
        </label>
        <input
          required
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          id="email"
          className="border-1 outline-none sm:text-sm rounded-lg focus:ring-blue-500 foucus:border-blue-500 block w-full p-2 bg-neutral-800 border-neutral-500 placeholder-gray-600 text-white"
          placeholder="name@company.com"
        />
      </div>

      <button
        type="submit"
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center bg-brand-red hover:bg-brand-red-s"
      >
        {sending ? "Sending email..." : "Reset Password"}
      </button>
      {error && (
        <p className="text-red-500 text-sm text-center">{error.message}</p>
      )}
    </form>
  );
};

export default ResetPassword;
