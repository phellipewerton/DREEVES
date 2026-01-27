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

      await database.run(
        `INSERT INTO keywords (id, keyword, risk_weight, category)
         VALUES (?, ?, ?, ?)`,
        [id, keyword.toLowerCase(), risk_weight, category]
      );

      return {
        id,
        keyword: keyword.toLowerCase(),
        risk_weight,
        category
      };
    } catch (error) {
      if (error.message.includes('UNIQUE constraint failed')) {
        throw new Error('Esta palavra-chave já existe');
      }
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
      const keywords = await database.all(
        'SELECT * FROM keywords ORDER BY category, keyword ASC'
      );
      return keywords;
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
      const keywords = await database.all(
        'SELECT * FROM keywords WHERE category = ? ORDER BY risk_weight DESC',
        [category]
      );
      return keywords;
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
      await database.run(
        'UPDATE keywords SET risk_weight = ? WHERE id = ?',
        [risk_weight, id]
      );

      return database.get('SELECT * FROM keywords WHERE id = ?', [id]);
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
      await database.run('DELETE FROM keywords WHERE id = ?', [id]);
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
      const stats = await database.get(`
        SELECT 
          COUNT(*) as total_keywords,
          COUNT(DISTINCT category) as total_categories,
          AVG(risk_weight) as average_weight,
          MAX(risk_weight) as max_weight
        FROM keywords
      `);

      const byCategory = await database.all(`
        SELECT category, COUNT(*) as count
        FROM keywords
        GROUP BY category
        ORDER BY count DESC
      `);

      return {
        general: stats,
        byCategory
      };
    } catch (error) {
      console.error('Erro ao obter estatísticas:', error);
      throw error;
    }
  }
}

module.exports = new KeywordService();
