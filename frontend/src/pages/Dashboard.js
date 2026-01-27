import React, { useState, useEffect } from 'react';
import { rumorAPI, keywordAPI, riskAPI } from '../services/api';
import RumorMap from '../components/Map';
import RumorForm from '../components/RumorForm';
import RumorDetails from '../components/RumorDetails';
import KeywordManager from '../components/KeywordManager';
import './Dashboard.css';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('mapa');
  const [rumors, setRumors] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [selectedRumor, setSelectedRumor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({
    risk_level: '',
    status: ''
  });

  // Carregar dados iniciais
  useEffect(() => {
    loadData();
  }, []);

  // Recarregar quando filtros mudam
  useEffect(() => {
    loadRumors();
  }, [filters]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([
        loadRumors(),
        loadKeywords(),
        loadStatistics()
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadRumors = async () => {
    try {
      const response = await rumorAPI.getAllRumors(filters);
      setRumors(response.data.data);
    } catch (err) {
      console.error('Erro ao carregar rumores:', err);
      throw err;
    }
  };

  const loadKeywords = async () => {
    try {
      const response = await keywordAPI.getAllKeywords();
      setKeywords(response.data.data);
    } catch (err) {
      console.error('Erro ao carregar palavras-chave:', err);
      throw err;
    }
  };

  const loadStatistics = async () => {
    try {
      const response = await riskAPI.getStatistics();
      setStats(response.data.data);
    } catch (err) {
      console.error('Erro ao carregar estatísticas:', err);
    }
  };

  const handleAddRumor = async (data) => {
    setLoading(true);
    try {
      await rumorAPI.createRumor(data);
      setError(null);
      await loadRumors();
      await loadStatistics();
      alert('Rumor reportado com sucesso!');
    } catch (err) {
      setError('Erro ao reportar rumor: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    setLoading(true);
    try {
      await rumorAPI.updateRumorStatus(id, status);
      setSelectedRumor(prev => ({...prev, status}));
      await loadRumors();
      await loadStatistics();
    } catch (err) {
      setError('Erro ao atualizar status: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddKeyword = async (data) => {
    setLoading(true);
    try {
      await keywordAPI.addKeyword(data);
      await loadKeywords();
      await loadStatistics();
    } catch (err) {
      setError('Erro ao adicionar palavra-chave: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteKeyword = async (id) => {
    if (window.confirm('Deseja deletar esta palavra-chave?')) {
      setLoading(true);
      try {
        await keywordAPI.deleteKeyword(id);
        await loadKeywords();
        await loadStatistics();
      } catch (err) {
        setError('Erro ao deletar palavra-chave: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdateKeywordWeight = async (id, weight) => {
    setLoading(true);
    try {
      await keywordAPI.updateWeight(id, weight);
      await loadKeywords();
      await loadStatistics();
    } catch (err) {
      setError('Erro ao atualizar peso: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRiskStats = () => {
    if (!stats || !stats.statistics) return { total: 0, critical: 0, high: 0 };
    return {
      total: stats.statistics.total_rumors || 0,
      critical: stats.statistics.critical || 0,
      high: stats.statistics.high || 0
    };
  };

  const riskStats = getRiskStats();

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🔍 Sistema de Detecção de Rumores</h1>
          <p>Análise inteligente de boatos com avaliação de risco</p>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-number">{riskStats.total}</span>
            <span className="stat-label">Total de Rumores</span>
          </div>
          <div className="stat-card critical">
            <span className="stat-number">{riskStats.critical}</span>
            <span className="stat-label">Críticos</span>
          </div>
          <div className="stat-card high">
            <span className="stat-number">{riskStats.high}</span>
            <span className="stat-label">Altos</span>
          </div>
        </div>
      </header>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'mapa' ? 'active' : ''}`}
          onClick={() => setActiveTab('mapa')}
        >
          📍 Mapa de Rumores
        </button>
        <button 
          className={`tab ${activeTab === 'novo' ? 'active' : ''}`}
          onClick={() => setActiveTab('novo')}
        >
          ➕ Novo Rumor
        </button>
        <button 
          className={`tab ${activeTab === 'palavras' ? 'active' : ''}`}
          onClick={() => setActiveTab('palavras')}
        >
          🔑 Palavras-chave
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'mapa' && (
          <div className="mapa-section">
            <div className="filters">
              <select 
                value={filters.risk_level}
                onChange={(e) => setFilters({...filters, risk_level: e.target.value})}
              >
                <option value="">Todos os Níveis de Risco</option>
                <option value="CRÍTICO">Crítico</option>
                <option value="ALTO">Alto</option>
                <option value="MÉDIO">Médio</option>
                <option value="BAIXO">Baixo</option>
                <option value="NENHUM">Nenhum</option>
              </select>
              <select 
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="">Todos os Status</option>
                <option value="PENDENTE">Pendente</option>
                <option value="VERIFICADO">Verificado</option>
                <option value="FALSO">Falso</option>
                <option value="VERDADEIRO">Verdadeiro</option>
                <option value="ARQUIVADO">Arquivado</option>
              </select>
            </div>
            
            <div className="mapa-container">
              <div className="map-area">
                <RumorMap 
                  rumors={rumors}
                  selectedRumor={selectedRumor}
                  onRumorSelect={setSelectedRumor}
                />
              </div>
              <div className="details-area">
                <RumorDetails 
                  rumor={selectedRumor}
                  onStatusChange={handleStatusChange}
                  isLoading={loading}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'novo' && (
          <div className="novo-section">
            <RumorForm 
              onSubmit={handleAddRumor}
              isLoading={loading}
            />
          </div>
        )}

        {activeTab === 'palavras' && (
          <div className="palavras-section">
            <KeywordManager 
              keywords={keywords}
              onAddKeyword={handleAddKeyword}
              onDeleteKeyword={handleDeleteKeyword}
              onUpdateWeight={handleUpdateKeywordWeight}
              isLoading={loading}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
