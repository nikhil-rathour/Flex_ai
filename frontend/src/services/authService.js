import axios from 'axios';
import { auth } from '../configs/firebase.js';

const API_BASE_URL = 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    console.log("token " , token);
    
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async loginUser() {
    const response = await api.post('/users/login');
    return response.data;
  }
};

export default api;