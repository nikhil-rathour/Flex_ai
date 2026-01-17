import { useEffect, useState } from 'react';
import { codeService } from '../services/codeService';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const MyDeployments = () => {
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDeployments();
  }, []);

  const fetchDeployments = async () => {
    try {
      const data = await codeService.getUserDeployments();
      setDeployments(data);
    } catch (error) {
      toast.error('Failed to fetch deployments');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this deployment?')) return;
    try {
      await codeService.deleteDeployment(id);
      toast.success('Deployment deleted');
      fetchDeployments();
    } catch (error) {
      toast.error('Failed to delete deployment');
    }
  };

  const handleEdit = (deployment) => {
    navigate(`/edit-deployment/${deployment._id}`);
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
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Deployments</h1>
        
        {deployments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">No deployments yet</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {deployments.map((deployment) => (
              <div key={deployment._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2">{deployment.username}</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Published: {new Date(deployment.createdAt).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => window.open(`/${deployment.username}`, '_blank')}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => handleEdit(deployment)}
                    className="flex-1 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(deployment._id)}
                    className="flex-1 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default MyDeployments;
