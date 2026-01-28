const database = require('../db/database');

class RiskService {
  /**
   * Calcula o score de risco baseado em palavras-chave
   * @param {string} text - Texto do rumor
   * @returns {Promise<Object>} - Score de risco e informações
   */
  async calculateRiskScore(text) {
    try {
      const keywords = database.getKeywords();

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
      const rumors = database.getRumors();
      const rumor = rumors.find(r => r.id === rumorId);

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
      const rumors = database.getRumors();
      const keywords = database.getKeywords();

      const stats = {
        total_rumors: rumors.length,
        critical: rumors.filter(r => r.risk_level === 'CRÍTICO').length,
        high: rumors.filter(r => r.risk_level === 'ALTO').length,
        medium: rumors.filter(r => r.risk_level === 'MÉDIO').length,
        low: rumors.filter(r => r.risk_level === 'BAIXO').length,
        none: rumors.filter(r => r.risk_level === 'NENHUM').length
      };

      const topKeywords = keywords
        .sort((a, b) => b.risk_weight - a.risk_weight)
        .slice(0, 10)
        .map(k => ({
          keyword: k.keyword,
          risk_weight: k.risk_weight,
          category: k.category
        }));

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
