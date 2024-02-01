import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { RecoilRoot } from "recoil";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} mx-auto max-w-[2400px] text-white`}>
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
