const database = require('../db/database');
const riskService = require('./riskService');
const { v4: uuidv4 } = require('uuid');

class RumorService {
  /**
   * Cria um novo rumor
   * @param {Object} rumorData - Dados do rumor
   * @returns {Promise<Object>} - Rumor criado
   */
  async createRumor(rumorData) {
    try {
      const id = uuidv4();
      const { title, description, latitude, longitude, location_name, source } = rumorData;

      // Calcular risco
      const text = `${title} ${description || ''}`;
      const riskAnalysis = await riskService.calculateRiskScore(text);

      const rumor = {
        id,
        title,
        description: description || null,
        latitude,
        longitude,
        location_name: location_name || 'Desconhecida',
        risk_level: riskAnalysis.level,
        risk_score: riskAnalysis.score,
        keywords_found: JSON.stringify(riskAnalysis.foundKeywords),
        source: source || 'Anônimo',
        status: 'PENDENTE',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      database.addRumor(rumor);

      return {
        ...rumor,
        keywords_found: riskAnalysis.foundKeywords
      };
    } catch (error) {
      console.error('Erro ao criar rumor:', error);
      throw error;
    }
  }

  /**
   * Obtém todos os rumores
   * @param {Object} filters - Filtros opcionais
   * @returns {Promise<Array>} - Lista de rumores
   */
  async getAllRumors(filters = {}) {
    try {
      let rumors = database.getRumors();

      if (filters.risk_level) {
        rumors = rumors.filter(r => r.risk_level === filters.risk_level);
      }

      if (filters.status) {
        rumors = rumors.filter(r => r.status === filters.status);
      }

      // Parsear keywords_found
      return rumors.map(rumor => ({
        ...rumor,
        keywords_found: rumor.keywords_found ? JSON.parse(rumor.keywords_found) : []
      }));
    } catch (error) {
      console.error('Erro ao obter rumores:', error);
      throw error;
    }
  }

  /**
   * Obtém um rumor por ID
   * @param {string} id - ID do rumor
   * @returns {Promise<Object>} - Rumor encontrado
   */
  async getRumorById(id) {
    try {
      const rumor = await database.get(
        'SELECT * FROM rumors WHERE id = ?',
        [id]
      );

      if (!rumor) {
        throw new Error('Rumor não encontrado');
      }

      return {
        ...rumor,
        keywords_found: rumor.keywords_found ? JSON.parse(rumor.keywords_found) : []
      };
    } catch (error) {
      console.error('Erro ao obter rumor:', error);
      throw error;
    }
  }

  /**
   * Atualiza o status de um rumor
   * @param {string} id - ID do rumor
   * @param {string} status - Novo status
   * @returns {Promise<Object>} - Rumor atualizado
   */
  async updateRumorStatus(id, status) {
    try {
      await database.run(
        'UPDATE rumors SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [status, id]
      );

      return this.getRumorById(id);
    } catch (error) {
      console.error('Erro ao atualizar status do rumor:', error);
      throw error;
    }
  }

  /**
   * Deleta um rumor
   * @param {string} id - ID do rumor
   * @returns {Promise<void>}
   */
  async deleteRumor(id) {
    try {
      await database.run('DELETE FROM rumors WHERE id = ?', [id]);
    } catch (error) {
      console.error('Erro ao deletar rumor:', error);
      throw error;
    }
  }

  /**
   * Obtém rumores dentro de uma área geográfica
   * @param {number} latitude - Latitude central
   * @param {number} longitude - Longitude central
   * @param {number} radius - Raio em km
   * @returns {Promise<Array>} - Rumores encontrados
   */
  async getRumorsByArea(latitude, longitude, radius = 10) {
    try {
      // Cálculo aproximado: 1 grau ≈ 111 km
      const latOffset = radius / 111;
      const lonOffset = radius / (111 * Math.cos(latitude * Math.PI / 180));

      const rumors = await database.all(
        `SELECT * FROM rumors 
         WHERE latitude BETWEEN ? AND ? 
         AND longitude BETWEEN ? AND ? 
         ORDER BY created_at DESC`,
        [
          latitude - latOffset,
          latitude + latOffset,
          longitude - lonOffset,
          longitude + lonOffset
        ]
      );

      return rumors.map(rumor => ({
        ...rumor,
        keywords_found: rumor.keywords_found ? JSON.parse(rumor.keywords_found) : []
      }));
    } catch (error) {
      console.error('Erro ao obter rumores por área:', error);
      throw error;
    }
  }
}

module.exports = new RumorService();
