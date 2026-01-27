const riskService = require('../services/riskService');

class RiskController {
  async calculateRisk(req, res) {
    try {
      const { text } = req.body;
      
      if (!text) {
        return res.status(400).json({
          success: false,
          error: 'Texto é obrigatório'
        });
      }

      const analysis = await riskService.calculateRiskScore(text);
      res.json({
        success: true,
        data: analysis
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async analyzeRumor(req, res) {
    try {
      const { id } = req.params;
      const analysis = await riskService.analyzeRumor(id);
      res.json({
        success: true,
        data: analysis
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
      const stats = await riskService.getRiskStatistics();
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

module.exports = new RiskController();
