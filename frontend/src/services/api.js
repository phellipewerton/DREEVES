import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const rumorAPI = {
  // Criar novo rumor
  createRumor: (data) => api.post('/rumors', data),
  
  // Obter todos os rumores
  getAllRumors: (filters = {}) => api.get('/rumors', { params: filters }),
  
  // Obter rumor por ID
  getRumorById: (id) => api.get(`/rumors/${id}`),
  
  // Obter rumores por área geográfica
  getRumorsByArea: (latitude, longitude, radius) => 
    api.get('/rumors/area', { params: { latitude, longitude, radius } }),
  
  // Atualizar status do rumor
  updateRumorStatus: (id, status) => api.patch(`/rumors/${id}/status`, { status }),
  
  // Deletar rumor
  deleteRumor: (id) => api.delete(`/rumors/${id}`),
};

export const keywordAPI = {
  // Adicionar palavra-chave
  addKeyword: (data) => api.post('/keywords', data),
  
  // Obter todas as palavras-chave
  getAllKeywords: () => api.get('/keywords'),
  
  // Obter palavras-chave por categoria
  getByCategory: (category) => api.get(`/keywords/category/${category}`),
  
  // Atualizar peso de risco
  updateWeight: (id, risk_weight) => api.patch(`/keywords/${id}/weight`, { risk_weight }),
  
  // Deletar palavra-chave
  deleteKeyword: (id) => api.delete(`/keywords/${id}`),
  
  // Adicionar múltiplas palavras-chave
  addBatch: (keywords) => api.post('/keywords/batch', { keywords }),
  
  // Obter estatísticas
  getStatistics: () => api.get('/keywords/stats/all'),
};

export const riskAPI = {
  // Calcular risco de um texto
  calculateRisk: (text) => api.post('/risk/calculate', { text }),
  
  // Analisar risco de um rumor
  analyzeRumor: (id) => api.get(`/risk/analyze/${id}`),
  
  // Obter estatísticas de risco
  getStatistics: () => api.get('/risk/stats'),
};

export default api;
