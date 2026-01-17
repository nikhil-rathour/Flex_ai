import { useAuthState } from "../hooks/useAuthState";
import Login from "../pages/Login";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthState();

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <Login />;

  return children;
};

export default ProtectedRoute;