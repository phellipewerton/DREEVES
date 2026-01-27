const database = require('../db/database');

class RiskService {
  /**
   * Calcula o score de risco baseado em palavras-chave
   * @param {string} text - Texto do rumor
   * @returns {Promise<Object>} - Score de risco e informações
   */
  async calculateRiskScore(text) {
    try {
      const keywords = await database.all(
        'SELECT * FROM keywords ORDER BY risk_weight DESC'
      );

      let totalScore = 0;
      const foundKeywords = [];
      const textLower = text.toLowerCase();

      for (const keyword of keywords) {
        const regex = new RegExp(`\\b${keyword.keyword}\\b`, 'gi');
        const matches = (textLower.match(regex) || []).length;

        if (matches > 0) {
          const points = matches * keyword.risk_weight;
          totalScore += points;
          foundKeywords.push({
            keyword: keyword.keyword,
            weight: keyword.risk_weight,
            count: matches,
            category: keyword.category
          });
        }
      }

      const riskLevel = this.getRiskLevel(totalScore);

      return {
        score: totalScore,
        level: riskLevel,
        foundKeywords,
        calculation: `Score: ${totalScore} - Nível: ${riskLevel}`
      };
    } catch (error) {
      console.error('Erro ao calcular score de risco:', error);
      throw error;
    }
  }

  /**
   * Determina o nível de risco baseado no score
   * @param {number} score - Score numérico
   * @returns {string} - Nível de risco
   */
  getRiskLevel(score) {
    if (score === 0) return 'NENHUM';
    if (score < 10) return 'BAIXO';
    if (score < 25) return 'MÉDIO';
    if (score < 50) return 'ALTO';
    return 'CRÍTICO';
  }

  /**
   * Obtém análise detalhada de risco para um rumor
   * @param {string} rumorId - ID do rumor
   * @returns {Promise<Object>} - Análise completa
   */
  async analyzeRumor(rumorId) {
    try {
      const rumor = await database.get(
        'SELECT * FROM rumors WHERE id = ?',
        [rumorId]
      );

      if (!rumor) {
        throw new Error('Rumor não encontrado');
      }

      const text = `${rumor.title} ${rumor.description || ''}`;
      const riskAnalysis = await this.calculateRiskScore(text);

      return {
        rumorId,
        title: rumor.title,
        location: rumor.location_name,
        ...riskAnalysis
      };
    } catch (error) {
      console.error('Erro ao analisar rumor:', error);
      throw error;
    }
  }

  /**
   * Obtém estatísticas de risco
   * @returns {Promise<Object>} - Estatísticas gerais
   */
  async getRiskStatistics() {
    try {
      const stats = await database.get(`
        SELECT 
          COUNT(*) as total_rumors,
          SUM(CASE WHEN risk_level = 'CRÍTICO' THEN 1 ELSE 0 END) as critical,
          SUM(CASE WHEN risk_level = 'ALTO' THEN 1 ELSE 0 END) as high,
          SUM(CASE WHEN risk_level = 'MÉDIO' THEN 1 ELSE 0 END) as medium,
          SUM(CASE WHEN risk_level = 'BAIXO' THEN 1 ELSE 0 END) as low,
          SUM(CASE WHEN risk_level = 'NENHUM' THEN 1 ELSE 0 END) as none
        FROM rumors
      `);

      const topKeywords = await database.all(`
        SELECT keyword, risk_weight, category
        FROM keywords
        ORDER BY risk_weight DESC
        LIMIT 10
      `);

      return {
        statistics: stats,
        topKeywords
      };
    } catch (error) {
      console.error('Erro ao obter estatísticas:', error);
      throw error;
    }
  }
}

module.exports = new RiskService();
