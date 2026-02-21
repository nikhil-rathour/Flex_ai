import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";

const HeroSecton = lazy(() => import("./pages/HeroSecton"));
const ColorPalettePage = lazy(() => import("./pages/ColorPalettePage"));
const Ai = lazy(() => import("./components/Ai"));
const Preview = lazy(() => import("./pages/Preview"));
const MyDeployments = lazy(() => import("./pages/MyDeployments"));
const PublicProject = lazy(() => import("./pages/PublicProject"));
const EditDeployment = lazy(() => import("./pages/EditDeployment"));
const PremiumDashboard = lazy(() => import("./pages/PremiumDashboard"));

const RouteLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 px-4">
    <div className="text-center">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-sky-200 border-t-sky-500" />
      <p className="mt-3 text-sm font-medium text-slate-600">Loading...</p>
    </div>
  </div>
);

const App = () => {
  return (
    <>
      <Router>
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HeroSecton />
                </ProtectedRoute>
              }
            />

            <Route
              path="/colors"
              element={
                <ProtectedRoute>
                  <ColorPalettePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/form"
              element={
                <ProtectedRoute>
                  <Ai />
                </ProtectedRoute>
              }
            />

            <Route path="/preview" element={<Preview />} />

            <Route
              path="/deployments"
              element={
                <ProtectedRoute>
                  <MyDeployments />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit-deployment/:id"
              element={
                <ProtectedRoute>
                  <EditDeployment />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <PremiumDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="/:username" element={<PublicProject />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>

      <ToastContainer position="top-right" newestOnTop closeOnClick pauseOnHover />
    </>
  );
};

export default App;
