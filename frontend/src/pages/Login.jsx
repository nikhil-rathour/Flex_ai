import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../configs/firebase.js";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../hooks/useAuthState";
import { authService } from "../services/authService";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuthState();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      await authService.loginUser();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80 text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome 👋</h1>
        <p className="text-gray-600 mb-6">
          Sign in to build your AI website
        </p>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
