import React from 'react';
import './RumorDetails.css';

function RumorDetails({ rumor, onStatusChange, isLoading }) {
  if (!rumor) {
    return (
      <div className="rumor-details empty">
        <p>Selecione um rumor no mapa para ver os detalhes</p>
      </div>
    );
  }

  const getRiskBadgeClass = (level) => {
    return `badge badge-${level.toLowerCase()}`;
  };

  return (
    <div className="rumor-details">
      <h3>{rumor.title}</h3>

      <div className="detail-section">
        <h4>Informações Básicas</h4>
        <div className="detail-item">
          <span className="label">Local:</span>
          <span className="value">{rumor.location_name}</span>
        </div>
        <div className="detail-item">
          <span className="label">Coordenadas:</span>
          <span className="value">{rumor.latitude.toFixed(4)}, {rumor.longitude.toFixed(4)}</span>
        </div>
        <div className="detail-item">
          <span className="label">Fonte:</span>
          <span className="value">{rumor.source}</span>
        </div>
        <div className="detail-item">
          <span className="label">Data:</span>
          <span className="value">{new Date(rumor.created_at).toLocaleDateString('pt-BR')}</span>
        </div>
      </div>

      {rumor.description && (
        <div className="detail-section">
          <h4>Descrição</h4>
          <p className="description">{rumor.description}</p>
        </div>
      )}

      <div className="detail-section">
        <h4>Avaliação de Risco</h4>
        <div className="detail-item">
          <span className="label">Nível:</span>
          <span className={getRiskBadgeClass(rumor.risk_level)}>
            {rumor.risk_level}
          </span>
        </div>
        <div className="detail-item">
          <span className="label">Score:</span>
          <span className="value">{rumor.risk_score}</span>
        </div>
        
        {rumor.keywords_found && rumor.keywords_found.length > 0 && (
          <div className="keywords-list">
            <h5>Palavras-chave Detectadas:</h5>
            <div className="keywords">
              {rumor.keywords_found.map((kw, idx) => (
                <div key={idx} className="keyword-item">
                  <span className="keyword-text">{kw.keyword}</span>
                  <span className="keyword-meta">
                    {kw.count}x • Peso: {kw.weight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="detail-section">
        <h4>Status</h4>
        <div className="status-control">
          <select 
            value={rumor.status} 
            onChange={(e) => onStatusChange(rumor.id, e.target.value)}
            disabled={isLoading}
            className="status-select"
          >
            <option value="PENDENTE">Pendente</option>
            <option value="VERIFICADO">Verificado</option>
            <option value="FALSO">Falso</option>
            <option value="VERDADEIRO">Verdadeiro</option>
            <option value="ARQUIVADO">Arquivado</option>
          </select>
          <span className={`status-badge badge-${rumor.status.toLowerCase()}`}>
            {rumor.status}
          </span>
        </div>
      </div>
    </div>
  );
}

export default RumorDetails;
