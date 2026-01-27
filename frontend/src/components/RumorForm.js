import React, { useState } from 'react';
import './RumorForm.css';

function RumorForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    latitude: '',
    longitude: '',
    location_name: '',
    source: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar erro do campo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    }
    if (!formData.latitude || isNaN(formData.latitude)) {
      newErrors.latitude = 'Latitude válida é obrigatória';
    }
    if (!formData.longitude || isNaN(formData.longitude)) {
      newErrors.longitude = 'Longitude válida é obrigatória';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      ...formData,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude)
    });

    // Limpar formulário
    setFormData({
      title: '',
      description: '',
      latitude: '',
      longitude: '',
      location_name: '',
      source: ''
    });
  };

  return (
    <form className="rumor-form" onSubmit={handleSubmit}>
      <h3>Reportar Novo Rumor</h3>
      
      <div className="form-group">
        <label htmlFor="title">Título do Rumor *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Ex: Boato sobre construção"
          className={errors.title ? 'input-error' : ''}
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Detalhes sobre o rumor..."
          rows="4"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="latitude">Latitude *</label>
          <input
            type="number"
            id="latitude"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            step="0.0001"
            placeholder="-15.8267"
            className={errors.latitude ? 'input-error' : ''}
          />
          {errors.latitude && <span className="error">{errors.latitude}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="longitude">Longitude *</label>
          <input
            type="number"
            id="longitude"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            step="0.0001"
            placeholder="-47.8711"
            className={errors.longitude ? 'input-error' : ''}
          />
          {errors.longitude && <span className="error">{errors.longitude}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="location_name">Nome do Local</label>
        <input
          type="text"
          id="location_name"
          name="location_name"
          value={formData.location_name}
          onChange={handleChange}
          placeholder="Ex: Centro de Brasília"
        />
      </div>

      <div className="form-group">
        <label htmlFor="source">Fonte</label>
        <input
          type="text"
          id="source"
          name="source"
          value={formData.source}
          onChange={handleChange}
          placeholder="Ex: Redes Sociais, Anônimo"
        />
      </div>

      <button 
        type="submit" 
        className="btn btn-primary"
        disabled={isLoading}
      >
        {isLoading ? 'Enviando...' : 'Reportar Rumor'}
      </button>
    </form>
  );
}

export default RumorForm;
