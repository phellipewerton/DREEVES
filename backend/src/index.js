const express = require('express');
const cors = require('cors');
require('dotenv').config();

const database = require('./db/database');
const rumorRoutes = require('./routes/rumorRoutes');
const keywordRoutes = require('./routes/keywordRoutes');
const riskRoutes = require('./routes/riskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Inicializar banco de dados
database.initialize();

// Rotas
app.use('/api/rumors', rumorRoutes);
app.use('/api/keywords', keywordRoutes);
app.use('/api/risk', riskRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Sistema de detecção de rumores operacional' });
});

// Para desenvolvimento local
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

module.exports = app;
