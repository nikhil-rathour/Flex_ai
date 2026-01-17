import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";

const HeroSecton = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <div className="text-center max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Create Your Custom Website
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Build a beautiful, personalized portfolio or website in minutes with AI
          </p>
          <button
            onClick={() => navigate('/colors')}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg shadow-lg transition"
          >
            Generate Your Website
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSecton;