const express = require('express');
const riskController = require('../controllers/riskController');

const router = express.Router();

// Calcular risco de um texto
router.post('/calculate', riskController.calculateRisk);

// Analisar risco de um rumor específico
router.get('/analyze/:id', riskController.analyzeRumor);

// Obter estatísticas de risco
router.get('/stats', riskController.getStatistics);

module.exports = router;
