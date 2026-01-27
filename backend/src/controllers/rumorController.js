const rumorService = require('../services/rumorService');

class RumorController {
  async createRumor(req, res) {
    try {
      const rumor = await rumorService.createRumor(req.body);
      res.status(201).json({
        success: true,
        message: 'Rumor criado com sucesso',
        data: rumor
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getAllRumors(req, res) {
    try {
      const filters = {
        risk_level: req.query.risk_level,
        status: req.query.status
      };

      const rumors = await rumorService.getAllRumors(filters);
      res.json({
        success: true,
        count: rumors.length,
        data: rumors
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getRumorById(req, res) {
    try {
      const rumor = await rumorService.getRumorById(req.params.id);
      res.json({
        success: true,
        data: rumor
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message
      });
    }
  }

  async updateRumorStatus(req, res) {
    try {
      const { status } = req.body;
      const rumor = await rumorService.updateRumorStatus(req.params.id, status);
      res.json({
        success: true,
        message: 'Status atualizado com sucesso',
        data: rumor
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async deleteRumor(req, res) {
    try {
      await rumorService.deleteRumor(req.params.id);
      res.json({
        success: true,
        message: 'Rumor deletado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getRumorsByArea(req, res) {
    try {
      const { latitude, longitude, radius = 10 } = req.query;
      
      if (!latitude || !longitude) {
        return res.status(400).json({
          success: false,
          error: 'Latitude e longitude são obrigatórias'
        });
      }

      const rumors = await rumorService.getRumorsByArea(
        parseFloat(latitude),
        parseFloat(longitude),
        parseFloat(radius)
      );

      res.json({
        success: true,
        count: rumors.length,
        data: rumors
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = new RumorController();
