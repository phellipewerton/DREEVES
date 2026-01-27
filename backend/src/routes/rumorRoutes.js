const express = require('express');
const rumorController = require('../controllers/rumorController');

const router = express.Router();

// Criar novo rumor
router.post('/', rumorController.createRumor);

// Obter todos os rumores com filtros
router.get('/', rumorController.getAllRumors);

// Obter rumores por área geográfica
router.get('/area', rumorController.getRumorsByArea);

// Obter rumor específico
router.get('/:id', rumorController.getRumorById);

// Atualizar status do rumor
router.patch('/:id/status', rumorController.updateRumorStatus);

// Deletar rumor
router.delete('/:id', rumorController.deleteRumor);

module.exports = router;
