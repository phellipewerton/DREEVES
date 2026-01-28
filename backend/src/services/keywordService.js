const database = require('../db/database');
const { v4: uuidv4 } = require('uuid');

class KeywordService {
  /**
   * Adiciona uma nova palavra-chave
   * @param {Object} keywordData - Dados da palavra-chave
   * @returns {Promise<Object>} - Palavra-chave criada
   */
  async addKeyword(keywordData) {
    try {
      const id = uuidv4();
      const { keyword, risk_weight = 1, category = 'Geral' } = keywordData;

      const keywordObj = {
        id,
        keyword: keyword.toLowerCase(),
        risk_weight: parseInt(risk_weight) || 1,
        category: category || 'Geral'
      };

      database.addKeyword(keywordObj);
      return keywordObj;
    } catch (error) {
      console.error('Erro ao adicionar palavra-chave:', error);
      throw error;
    }
  }

  /**
   * Obtém todas as palavras-chave
   * @returns {Promise<Array>} - Lista de palavras-chave
   */
  async getAllKeywords() {
    try {
      const keywords = database.getKeywords();
      return keywords.sort((a, b) => {
        if (a.category !== b.category) {
          return a.category.localeCompare(b.category);
        }
        return a.keyword.localeCompare(b.keyword);
      });
    } catch (error) {
      console.error('Erro ao obter palavras-chave:', error);
      throw error;
    }
  }

  /**
   * Obtém palavras-chave por categoria
   * @param {string} category - Categoria
   * @returns {Promise<Array>} - Palavras-chave da categoria
   */
  async getKeywordsByCategory(category) {
    try {
      const keywords = database.getKeywords();
      return keywords
        .filter(k => k.category === category)
        .sort((a, b) => b.risk_weight - a.risk_weight);
    } catch (error) {
      console.error('Erro ao obter palavras-chave por categoria:', error);
      throw error;
    }
  }

  /**
   * Atualiza o peso de risco de uma palavra-chave
   * @param {string} id - ID da palavra-chave
   * @param {number} risk_weight - Novo peso
   * @returns {Promise<Object>} - Palavra-chave atualizada
   */
  async updateKeywordWeight(id, risk_weight) {
    try {
      const updated = database.updateKeyword(id, { risk_weight: parseInt(risk_weight) || 1 });
      if (!updated) {
        throw new Error('Palavra-chave não encontrada');
      }
      return updated;
    } catch (error) {
      console.error('Erro ao atualizar peso da palavra-chave:', error);
      throw error;
    }
  }

  /**
   * Deleta uma palavra-chave
   * @param {string} id - ID da palavra-chave
   * @returns {Promise<void>}
   */
  async deleteKeyword(id) {
    try {
      const deleted = database.deleteKeyword(id);
      if (!deleted) {
        throw new Error('Palavra-chave não encontrada');
      }
    } catch (error) {
      console.error('Erro ao deletar palavra-chave:', error);
      throw error;
    }
  }

  /**
   * Adiciona múltiplas palavras-chave em lote
   * @param {Array} keywords - Array de palavras-chave
   * @returns {Promise<Array>} - Palavras-chave adicionadas
   */
  async addKeywordsBatch(keywords) {
    try {
      const results = [];
      for (const kw of keywords) {
        try {
          const result = await this.addKeyword(kw);
          results.push(result);
        } catch (error) {
          // Continua se alguma palavra-chave já existe
          results.push({ error: error.message, keyword: kw.keyword });
        }
      }
      return results;
    } catch (error) {
      console.error('Erro ao adicionar lote de palavras-chave:', error);
      throw error;
    }
  }

  /**
   * Obtém estatísticas de palavras-chave
   * @returns {Promise<Object>} - Estatísticas
   */
  async getKeywordStatistics() {
    try {
      const allKeywords = database.getKeywords();
      
      if (allKeywords.length === 0) {
        return {
          general: {
            total_keywords: 0,
            total_categories: 0,
            average_weight: 0,
            max_weight: 0
          },
          byCategory: []
        };
      }

      const categories = {};
      let totalWeight = 0;
      let maxWeight = 0;

      for (const kw of allKeywords) {
        totalWeight += kw.risk_weight;
        if (kw.risk_weight > maxWeight) maxWeight = kw.risk_weight;
        if (!categories[kw.category]) {
          categories[kw.category] = 0;
        }
        categories[kw.category]++;
      }

      const byCategory = Object.entries(categories)
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count);

      return {
        general: {
          total_keywords: allKeywords.length,
          total_categories: Object.keys(categories).length,
          average_weight: Math.round(totalWeight / allKeywords.length),
          max_weight: maxWeight
        },
        byCategory
      };
    } catch (error) {
      console.error('Erro ao obter estatísticas:', error);
      throw error;
    }
  }
}

module.exports = new KeywordService();
