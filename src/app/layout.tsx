import type { Metadata } from "next";
import { Inter, Palanquin } from "next/font/google";
import "./globals.css";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const palanquin = Palanquin({
  subsets: ["latin"],
  weight: ["100", "300", "700"],
});

export const metadata: Metadata = {
  title: "Ronri",
  description: "Coding Platform for Everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${palanquin.className} mx-auto max-w-[2400px] text-white`}
      >
        <ToastContainer
          theme="dark"
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={true}
          transition={Bounce}
        />
        {children}
      </body>
    </html>
  );
}
