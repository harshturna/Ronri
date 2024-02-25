import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className={`${inter.className}`}>{children}</div>;
};

export default layout;
