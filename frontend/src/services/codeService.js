import api from './authService.js';

export const codeService = {
  async checkUsername(username) {
    const response = await api.post('/codes/check-username', { username });
    return response.data;
  },

  async publishCode(username, code) {
    const response = await api.post('/codes/codes', { username, code });
    return response.data;
  },

  async getUserDeployments() {
    const response = await api.get('/codes/get-codes');
    return response.data;
  },

  async getProjectByUsername(username) {
    const response = await api.get(`/codes/${username}`);
    return response.data;
  },

  async deleteDeployment(id) {
    const response = await api.delete(`/codes/delete-codes/${id}`);
    return response.data;
  },

  async updateDeployment(id, username, code) {
    const response = await api.put(`/codes/update-codes/${id}`, { username, code });
    return response.data;
  },

  async getCodeForEdit(id) {
    const response = await api.get(`/codes/edit-code/${id}`);
    return response.data;
  },

  async updateCodeWithGemini(existingCode, updateRequirements) {
    const response = await api.post('/gemini/update-code', { existingCode, updateRequirements });
    return response.data;
  }
};
