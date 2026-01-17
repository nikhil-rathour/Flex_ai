import { toast } from 'react-toastify';

export const handleApiError = (error) => {
  const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
  
  // Check for specific Gemini API errors
  if (errorMessage.includes('overloaded') || errorMessage.includes('503') || errorMessage.includes('Service Unavailable')) {
    toast.error('Due to many requests, Gemini model is unavailable right now. Please try after 2-3 minutes.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    return;
  }

  // Handle other API errors
  if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
    toast.error('Too many requests. Please wait a moment and try again.', {
      position: "top-right",
      autoClose: 4000,
    });
    return;
  }

  // Generic error
  toast.error(errorMessage, {
    position: "top-right",
    autoClose: 4000,
  });
};

export const handleApiSuccess = (message = 'Operation completed successfully!') => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};