const keywordService = require('../services/keywordService');

class KeywordController {
  async addKeyword(req, res) {
    try {
      const keyword = await keywordService.addKeyword(req.body);
      res.status(201).json({
        success: true,
        message: 'Palavra-chave adicionada com sucesso',
        data: keyword
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  async getAllKeywords(req, res) {
    try {
      const keywords = await keywordService.getAllKeywords();
      res.json({
        success: true,
        count: keywords.length,
        data: keywords
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getKeywordsByCategory(req, res) {
    try {
      const { category } = req.params;
      const keywords = await keywordService.getKeywordsByCategory(category);
      res.json({
        success: true,
        count: keywords.length,
        data: keywords
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async updateKeywordWeight(req, res) {
    try {
      const { id } = req.params;
      const { risk_weight } = req.body;
      const keyword = await keywordService.updateKeywordWeight(id, risk_weight);
      res.json({
        success: true,
        message: 'Peso atualizado com sucesso',
        data: keyword
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async deleteKeyword(req, res) {
    try {
      await keywordService.deleteKeyword(req.params.id);
      res.json({
        success: true,
        message: 'Palavra-chave deletada com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async addKeywordsBatch(req, res) {
    try {
      const { keywords } = req.body;
      const results = await keywordService.addKeywordsBatch(keywords);
      res.status(201).json({
        success: true,
        message: 'Palavras-chave processadas',
        data: results
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getStatistics(req, res) {
    try {
      const stats = await keywordService.getKeywordStatistics();
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = new KeywordController();
