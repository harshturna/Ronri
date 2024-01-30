import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import ResetPassword from "./ResetPassword";

interface AuthModalProps {
  page: string;
}

const AuthModal = ({ page }: AuthModalProps) => {
  return (
    <>
      <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]"></div>
      <div className="w-full sm:w-[600px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  flex justify-center items-center">
        <div className="relative w-full h-full mx-auto flex items-center justify-center">
          <div className=" rounded-lg shadow relative w-full bg-content-background mx-6">
            {page === "login" ? (
              <Login />
            ) : page === "register" ? (
              <Signup />
            ) : (
              <ResetPassword />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthModal;
