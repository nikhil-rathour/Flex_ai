import { signOut } from "firebase/auth";
import { auth } from "../configs/firebase.js";
import { useAuthState } from "../hooks/useAuthState";
import { useNavigate } from "react-router-dom";

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
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">AI Website Builder</h1>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/deployments")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
          >
            My Deployments
          </button>
          <span className="text-gray-600">Welcome, {user?.displayName}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;