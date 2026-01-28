const express = require('express');
const cors = require('cors');
require('dotenv').config();

const database = require('../src/db/database');
const rumorRoutes = require('../src/routes/rumorRoutes');
const keywordRoutes = require('../src/routes/keywordRoutes');
const riskRoutes = require('../src/routes/riskRoutes');

const app = express();

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

app.get('/', (req, res) => {
  res.json({ message: 'Sistema DREEVES - Detecção de Rumores' });
});

module.exports = app;
