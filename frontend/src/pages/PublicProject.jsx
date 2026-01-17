import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GeminiGenCodeRendering from '../components/GeminiGenCodeRendering';
import { codeService } from '../services/codeService';

const PublicProject = () => {
  const { username } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'tailwind-cdn';
    script.src = 'https://cdn.tailwindcss.com';
    if (!document.getElementById('tailwind-cdn')) {
      document.head.appendChild(script);
    }

    fetchProject();
  }, [username]);

  const fetchProject = async () => {
    try {
      const data = await codeService.getProjectByUsername(username);
      setProject(data);
    } catch (error) {
      setError('Project not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <GeminiGenCodeRendering 
        generatedCode={project?.code}
        formData={{}}
      />
    </div>
  );
};

export default PublicProject;
