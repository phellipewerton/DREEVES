const express = require('express');
const keywordController = require('../controllers/keywordController');

const router = express.Router();

// Adicionar nova palavra-chave
router.post('/', keywordController.addKeyword);

// Adicionar múltiplas palavras-chave em lote
router.post('/batch', keywordController.addKeywordsBatch);

// Obter todas as palavras-chave
router.get('/', keywordController.getAllKeywords);

// Obter palavras-chave por categoria
router.get('/category/:category', keywordController.getKeywordsByCategory);

// Obter estatísticas de palavras-chave
router.get('/stats/all', keywordController.getStatistics);

// Atualizar peso de risco
router.patch('/:id/weight', keywordController.updateKeywordWeight);

// Deletar palavra-chave
router.delete('/:id', keywordController.deleteKeyword);

module.exports = router;
