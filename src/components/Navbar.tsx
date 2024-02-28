import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.png";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between sm:px-12 px-2 md:px-24">
      <Link
        href="/"
        className="flex items-center justify-center h-20 text-white"
      >
        <Image src={Logo} alt="ronri logo" width={40} height={40} />
      </Link>
      <div className="flex items-center"></div>
    </div>
  );
};

export default Navbar;
