import { signOut } from "firebase/auth";
import { auth } from "../configs/firebase.js";
import { useAuthState } from "../hooks/useAuthState";
import { useNavigate } from "react-router-dom";
import { PillButton, SecondaryButton } from "./ui.jsx";

const Navbar = () => {
  const { user } = useAuthState();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50">
      <div className="border-b border-white/50 bg-white/70 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold tracking-tight text-slate-900">
              Flex AI Studio
            </span>
            <span className="rounded-full bg-slate-900/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
              AI
            </span>
          </div>

          <div className="flex items-center gap-3">
            <PillButton onClick={() => navigate("/deployments")}>
              My Deployments
            </PillButton>
            <span className="hidden text-sm text-slate-600 sm:inline">
              Hi, {user?.displayName || "Creator"}
            </span>
            <SecondaryButton
              onClick={handleLogout}
              className="border-rose-200 text-rose-600 hover:bg-rose-50"
            >
              Logout
            </SecondaryButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
