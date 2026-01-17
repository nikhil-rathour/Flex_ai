import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { codeService } from '../services/codeService';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

const EditDeployment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [username, setUsername] = useState('');
  const [updateRequirements, setUpdateRequirements] = useState('');
  const [existingCode, setExistingCode] = useState(null);

  useEffect(() => {
    fetchCode();
  }, [id]);

  const fetchCode = async () => {
    try {
      const data = await codeService.getCodeForEdit(id);
      setUsername(data.username);
      setExistingCode(data.code);
    } catch (error) {
      toast.error('Failed to fetch deployment');
      navigate('/deployments');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      toast.error('Username is required');
      return;
    }

    setUpdating(true);
    try {
      let updatedCode = existingCode;

      if (updateRequirements.trim()) {
        const result = await codeService.updateCodeWithGemini(existingCode, updateRequirements);
        updatedCode = result.output;
      }

      await codeService.updateDeployment(id, username, updatedCode);
      toast.success('Deployment updated successfully');
      navigate('/deployments');
    } catch (error) {
      toast.error('Failed to update deployment');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Edit Deployment</h1>
          
          <form onSubmit={handleUpdate} className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Update Requirements (Optional)
              </label>
              <textarea
                value={updateRequirements}
                onChange={(e) => setUpdateRequirements(e.target.value)}
                placeholder="Describe the changes you want to make to your code (e.g., 'Change the header color to blue', 'Add a contact form section')"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                Leave empty if you only want to update the username
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate('/deployments')}
                className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition"
                disabled={updating}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                disabled={updating}
              >
                {updating ? 'Updating...' : 'Update Deployment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditDeployment;
