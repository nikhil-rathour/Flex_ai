import React, { useEffect, useMemo, useState } from 'react';
import api from '../services/authService';

class GeneratedComponentErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    if (this.props.onError) {
      this.props.onError(error);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

const extractCodeString = (code) => {
  const fromObject =
    code?.output?.output?.code ||
    code?.output?.code ||
    code?.code;

  const rawCode = typeof fromObject === 'string' && fromObject.trim()
    ? fromObject
    : typeof code === 'string'
      ? code
      : '';

  if (!rawCode) return '';

  let cleaned = rawCode.trim();

  if (cleaned.startsWith('{') && cleaned.includes('"code"')) {
    try {
      const parsed = JSON.parse(cleaned);
      const parsedCode = parsed?.output?.output?.code || parsed?.output?.code || parsed?.code;
      if (typeof parsedCode === 'string' && parsedCode.trim()) {
        cleaned = parsedCode.trim();
      }
    } catch {
      // Ignore invalid JSON and treat value as raw executable code.
    }
  }

  cleaned = cleaned.replace(/^```(?:javascript|js|jsx|json)?\s*/i, '');
  cleaned = cleaned.replace(/\s*```$/i, '').trim();

  if (!/\breturn\s+GeneratedSPA\s*;?\s*$/.test(cleaned) && /\bfunction\s+GeneratedSPA\b/.test(cleaned)) {
    cleaned = `${cleaned}\nreturn GeneratedSPA;`;
  }

  return cleaned;
};

const getErrorMessage = (err) =>
  err?.response?.data?.message || err?.message || 'Unknown error while rendering generated component.';

const GeminiGenCodeRendering = ({ generatedCode, formData }) => {
  const [code, setCode] = useState(generatedCode);
  const [retrying, setRetrying] = useState(false);
  const [error, setError] = useState(null);
  const [runtimeError, setRuntimeError] = useState(null);
  const codeString = extractCodeString(code);

  useEffect(() => {
    setCode(generatedCode);
    setError(null);
    setRuntimeError(null);
  }, [generatedCode]);

  const retryPayload = useMemo(() => {
    const websiteType = formData?.websiteType?.trim?.() || formData?.websiteType || '';
    const rawSections = formData?.sections;
    const sections = Array.isArray(rawSections) ? rawSections.join(',') : (rawSections || '');
    const context = formData?.context?.trim?.() || formData?.context || '';
    const palette = formData?.palette;
    const layout = formData?.layout;

    return { websiteType, sections, context, palette, layout };
  }, [formData]);

  const canRetry = Boolean(retryPayload.websiteType && retryPayload.sections && retryPayload.context);
  
  const retryGeneration = async () => {
    if (!canRetry) {
      setError(new Error('Retry is unavailable because website type, sections, or context is missing.'));
      return;
    }

    setRetrying(true);
    setError(null);
    setRuntimeError(null);
    try {
      const response = await api.post('/gemini/generate', retryPayload);
      setCode(response.data?.output || response.data);
    } catch (err) {
      console.error('Retry failed:', err);
      setError(err);
    } finally {
      setRetrying(false);
    }
  };

  const { CompiledComponent, compileError } = useMemo(() => {
    if (!codeString) {
      return { CompiledComponent: null, compileError: null };
    }

    try {
      const compiled = new Function('React', `"use strict";\n${codeString}`)(React);

      if (typeof compiled !== 'function') {
        throw new Error('Generated code did not return a valid component');
      }

      return { CompiledComponent: compiled, compileError: null };
    } catch (err) {
      return { CompiledComponent: null, compileError: err };
    }
  }, [codeString]);

  
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
  const activeError = error || compileError || runtimeError;
  if (activeError) {
    return (
      <div className="p-8 text-center text-red-600">
        <h2 className="text-xl font-bold mb-2">Error Rendering Component</h2>
        <p>{getErrorMessage(activeError)}</p>
        {!canRetry && (
          <p className="mt-2 text-sm text-gray-600">
            Retry is unavailable because the original generation form data is missing.
          </p>
        )}
        <button
          onClick={retryGeneration}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!canRetry || retrying}
        >
          Retry Generation
        </button>
      </div>
    );
  }

  return (
    <div>
      <GeneratedComponentErrorBoundary
        resetKey={codeString}
        onError={(err) => {
          console.error('Runtime error in generated component:', err);
          setRuntimeError(err);
        }}
      >
        <CompiledComponent />
      </GeneratedComponentErrorBoundary>
    </div>
  );
};

export default GeminiGenCodeRendering;
