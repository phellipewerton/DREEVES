import React, { useState } from 'react';
import './KeywordManager.css';

function KeywordManager({ keywords, onAddKeyword, onDeleteKeyword, onUpdateWeight, isLoading }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    keyword: '',
    risk_weight: 1,
    category: 'Geral'
  });
  const [editingId, setEditingId] = useState(null);
  const [editWeight, setEditWeight] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.keyword.trim()) {
      onAddKeyword(formData);
      setFormData({ keyword: '', risk_weight: 1, category: 'Geral' });
      setShowForm(false);
    }
  };

  const handleStartEdit = (kw) => {
    setEditingId(kw.id);
    setEditWeight(kw.risk_weight);
  };

  const handleSaveWeight = (id) => {
    onUpdateWeight(id, parseInt(editWeight));
    setEditingId(null);
  };

  const groupedKeywords = keywords.reduce((acc, kw) => {
    if (!acc[kw.category]) {
      acc[kw.category] = [];
    }
    acc[kw.category].push(kw);
    return acc;
  }, {});

  return (
    <div className="keyword-manager">
      <div className="manager-header">
        <h3>Gerenciar Palavras-chave</h3>
        <button 
          className="btn btn-secondary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancelar' : '+ Nova Palavra-chave'}
        </button>
      </div>

      {showForm && (
        <form className="keyword-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Palavra-chave</label>
              <input
                type="text"
                value={formData.keyword}
                onChange={(e) => setFormData({...formData, keyword: e.target.value})}
                placeholder="Ex: vírus, conspiração"
                required
              />
            </div>
            <div className="form-group">
              <label>Peso de Risco</label>
              <input
                type="number"
                min="1"
                max="100"
                value={formData.risk_weight}
                onChange={(e) => setFormData({...formData, risk_weight: parseInt(e.target.value)})}
              />
            </div>
            <div className="form-group">
              <label>Categoria</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                placeholder="Ex: Saúde, Política"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            Adicionar Palavra-chave
          </button>
        </form>
      )}

      <div className="keywords-container">
        {Object.entries(groupedKeywords).map(([category, kws]) => (
          <div key={category} className="category-section">
            <h4>{category}</h4>
            <div className="keywords-grid">
              {kws.map((kw) => (
                <div key={kw.id} className="keyword-card">
                  <div className="keyword-header">
                    <span className="keyword-name">{kw.keyword}</span>
                    <button
                      className="btn-delete"
                      onClick={() => onDeleteKeyword(kw.id)}
                      disabled={isLoading}
                      title="Deletar"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="keyword-weight">
                    {editingId === kw.id ? (
                      <div className="weight-edit">
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={editWeight}
                          onChange={(e) => setEditWeight(e.target.value)}
                          autoFocus
                        />
                        <button
                          className="btn-save"
                          onClick={() => handleSaveWeight(kw.id)}
                        >
                          ✓
                        </button>
                      </div>
                    ) : (
                      <span 
                        className="weight-value"
                        onClick={() => handleStartEdit(kw)}
                        title="Clique para editar"
                      >
                        Peso: <strong>{kw.risk_weight}</strong>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {keywords.length === 0 && (
          <div className="empty-state">
            <p>Nenhuma palavra-chave adicionada ainda.</p>
            <p className="hint">Adicione palavras-chave para que o sistema detecte rumores com risco elevado.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default KeywordManager;
