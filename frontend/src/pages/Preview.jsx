import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import GeminiGenCodeRendering from '../components/GeminiGenCodeRendering';
import { codeService } from '../services/codeService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Preview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const generatedCodeRef = useRef(location.state?.generatedCode);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  
  if (location.state?.generatedCode && !generatedCodeRef.current) {
    generatedCodeRef.current = location.state.generatedCode;
  }
  
  useEffect(() => {
    if (!document.getElementById('tailwind-cdn')) {
      const script = document.createElement('script');
      script.id = 'tailwind-cdn';
      script.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(script);
    }
  }, []);

  const handlePublishClick = () => {
    setShowUsernameModal(true);
  };

  const handleUsernameSubmit = async () => {
    if (!username.trim()) {
      toast.error('Please enter a username');
      return;
    }

    setLoading(true);
    try {
      const { exists } = await codeService.checkUsername(username);
      if (exists) {
        toast.error('Username already exists. Please choose another one.');
      } else {
        setShowUsernameModal(false);
        setShowConfirmModal(true);
      }
    } catch (error) {
      toast.error('Failed to check username');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPublish = async () => {
    setLoading(true);
    try {
      await codeService.publishCode(username, generatedCodeRef.current);
      toast.success('Portfolio published successfully!');
      navigate("/deployments")
      setShowConfirmModal(false);
      setUsername('');
    } catch (error) {
      
      toast.error('Failed to publish portfolio');
      navigate("/deployments")

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="fixed top-4 right-4 z-[9999]">
        <button
          onClick={handlePublishClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-lg transition-colors"
        >
          Publish
        </button>
      </div>

      <GeminiGenCodeRendering 
        generatedCode={generatedCodeRef.current}
        formData={location.state}
      />

      {showUsernameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Enter Username</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowUsernameModal(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleUsernameSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Checking...' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Publication</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to publish this portfolio? It will be live and anyone can see it.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setUsername('');
                }}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPublish}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Preview;