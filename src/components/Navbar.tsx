import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between sm:px-12 px-2 md:px-24">
      <Link
        href="/"
        className="flex items-center justify-center h-20 text-white"
      >
        LOGO
      </Link>
      <div className="flex items-center">
        {/* <button className="bg-brand-red text-white py-2 sm:px-6 rounded-md text-sm hover:bg-brand-red-s">
          Sign in
        </button> */}
      </div>
    </div>
  );
};

export default Navbar;
