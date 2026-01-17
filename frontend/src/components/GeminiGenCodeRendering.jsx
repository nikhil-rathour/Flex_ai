import React, { useState, useEffect } from 'react';
import api from '../services/authService';

const GeminiGenCodeRendering = ({ generatedCode, formData }) => {
  const [code, setCode] = useState(generatedCode);
  const [retrying, setRetrying] = useState(false);
  const [error, setError] = useState(null);
  const codeString = code?.output?.output?.code || code?.output?.code || code?.code;
  
  const retryGeneration = async () => {
    setRetrying(true);
    setError(null);
    try {
      const { websiteType, sections, context, palette, layout } = formData || {};
      const response = await api.post("/gemini/generate", {
        websiteType, sections, context, palette, layout
      });
      setCode(response.data.output);
    } catch (err) {
      console.error('Retry failed:', err);
      setError(err);
    } finally {
      setRetrying(false);
    }
  };

  useEffect(() => {
    if (error && !retrying) {
      retryGeneration();
    }
  }, [error]);
  
  if (!codeString) {
    return <div className="p-8 text-center">No code generated</div>;
  }
  
  if (retrying) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Regenerating code...</p>
      </div>
    );
  }
  
  try {
    const Component = new Function("React", `${codeString}`)(React);
    
    if (!Component || typeof Component !== 'function') {
      throw new Error('Generated code did not return a valid component');
    }
    
    return (
      <div>
        <Component />
      </div>
    );
  } catch (err) {
    console.error('Error rendering component:', err);
    if (!error) setError(err);
    
    return (
      <div className="p-8 text-center text-red-600">
        <h2 className="text-xl font-bold mb-2">Error Rendering Component</h2>
        <p>{err.message}</p>
        <button 
          onClick={retryGeneration} 
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry Generation
        </button>
      </div>
    );
  }
};

export default GeminiGenCodeRendering;