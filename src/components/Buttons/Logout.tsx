import { LogOut } from "lucide-react";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";

const Logout = () => {
  const [signOut, loading, error] = useSignOut(auth);

  const handleLogout = () => {
    signOut();
  };

  return (
    <button
      className="bg-stone-500/10 py-1.5 px-3 cursor-pointer rounded text-brand-red hover:bg-stone-500/15"
      onClick={handleLogout}
    >
      <LogOut width="18" fontSize="18" />
    </button>
  );
};

export default Logout;
