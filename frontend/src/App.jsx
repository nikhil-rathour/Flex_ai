import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import HeroSecton from "./pages/HeroSecton";
import ColorPalettePage from "./pages/ColorPalettePage";
import Ai from "./components/Ai";
import Preview from "./pages/Preview";
import MyDeployments from "./pages/MyDeployments";
import PublicProject from "./pages/PublicProject";
import EditDeployment from "./pages/EditDeployment";
const App = () => {
  return (
    <>
    <Router>
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
             <ColorPalettePage/>
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/form" 
          element={
            <ProtectedRoute>
             <Ai/>
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/preview" 
          element={
             <Preview/>
          } 
        />

        <Route 
          path="/deployments" 
          element={
            <ProtectedRoute>
              <MyDeployments/>
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/edit-deployment/:id" 
          element={
            <ProtectedRoute>
              <EditDeployment/>
            </ProtectedRoute>
          } 
        />

        <Route path="/:username" element={<PublicProject />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
    <ToastContainer />
    </>
  );
};

export default App;
