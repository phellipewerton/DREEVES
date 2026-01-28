// Banco de dados em memória para Vercel Serverless
let keywords = [];
let rumors = [];

const initialize = () => {
  console.log('Banco de dados em memória inicializado');
};

const run = async (query, params = []) => {
  return { id: null, changes: 1 };
};

const get = async (query, params = []) => {
  if (query.includes('FROM keywords WHERE id')) {
    return keywords.find(k => k.id === params[0]);
  }
  if (query.includes('FROM keywords')) {
    return keywords[0];
  }
  if (query.includes('FROM rumors WHERE id')) {
    return rumors.find(r => r.id === params[0]);
  }
  return null;
};

const all = async (query, params = []) => {
  if (query.includes('FROM keywords')) {
    return keywords.sort((a, b) => a.keyword.localeCompare(b.keyword));
  }
  if (query.includes('FROM rumors')) {
    return rumors.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }
  return [];
};

// Métodos auxiliares para CRUD
const addKeyword = (keyword) => {
  keywords.push(keyword);
  return keyword;
};

const getKeywords = () => keywords;

const addRumor = (rumor) => {
  rumors.push(rumor);
  return rumor;
};

const getRumors = () => rumors;

const updateRumor = (id, updates) => {
  const idx = rumors.findIndex(r => r.id === id);
  if (idx !== -1) {
    rumors[idx] = { ...rumors[idx], ...updates, updated_at: new Date().toISOString() };
    return rumors[idx];
  }
  return null;
};

const deleteRumor = (id) => {
  const idx = rumors.findIndex(r => r.id === id);
  if (idx !== -1) {
    rumors.splice(idx, 1);
    return true;
  }
  return false;
};

const deleteKeyword = (id) => {
  const idx = keywords.findIndex(k => k.id === id);
  if (idx !== -1) {
    keywords.splice(idx, 1);
    return true;
  }
  return false;
};

module.exports = {
  initialize,
  run,
  get,
  all,
  addKeyword,
  getKeywords,
  addRumor,
  getRumors,
  updateRumor,
  deleteRumor,
  deleteKeyword
};
