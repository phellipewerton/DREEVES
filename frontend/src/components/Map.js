import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import './Map.css';

// Definir ícone padrão do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Cores baseadas no nível de risco
const getRiskColor = (riskLevel) => {
  const colors = {
    'CRÍTICO': '#d32f2f',
    'ALTO': '#f57c00',
    'MÉDIO': '#fbc02d',
    'BAIXO': '#7cb342',
    'NENHUM': '#1976d2',
  };
  return colors[riskLevel] || '#757575';
};

// Ícone customizado para cada nível de risco
const createCustomIcon = (riskLevel) => {
  const color = getRiskColor(riskLevel);
  return L.divIcon({
    html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><span style="color: white; font-weight: bold; font-size: 12px;">●</span></div>`,
    iconSize: [36, 36],
    className: 'custom-marker'
  });
};

function RumorMap({ rumors, selectedRumor, onRumorSelect }) {
  const [center, setCenter] = useState([-15.8267, -47.8711]); // Brasília, Brasil por padrão

  // Calcular centro do mapa baseado nos rumores
  useEffect(() => {
    if (rumors && rumors.length > 0) {
      const avgLat = rumors.reduce((sum, r) => sum + r.latitude, 0) / rumors.length;
      const avgLon = rumors.reduce((sum, r) => sum + r.longitude, 0) / rumors.length;
      setCenter([avgLat, avgLon]);
    }
  }, [rumors]);

  return (
    <div className="map-container">
      <MapContainer
        center={center}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Renderizar marcadores de rumores */}
        {rumors && rumors.map((rumor) => (
          <Marker
            key={rumor.id}
            position={[rumor.latitude, rumor.longitude]}
            icon={createCustomIcon(rumor.risk_level)}
            eventHandlers={{
              click: () => onRumorSelect(rumor),
            }}
          >
            <Popup>
              <div className="popup-content">
                <h4>{rumor.title}</h4>
                <p><strong>Local:</strong> {rumor.location_name}</p>
                <p><strong>Nível de Risco:</strong> <span style={{ color: getRiskColor(rumor.risk_level) }}>{rumor.risk_level}</span></p>
                <p><strong>Score:</strong> {rumor.risk_score}</p>
                <p><strong>Status:</strong> {rumor.status}</p>
                <p><strong>Data:</strong> {new Date(rumor.created_at).toLocaleDateString('pt-BR')}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Destacar rumor selecionado com círculo */}
        {selectedRumor && (
          <Circle
            center={[selectedRumor.latitude, selectedRumor.longitude]}
            radius={5000} // 5 km
            pathOptions={{ color: getRiskColor(selectedRumor.risk_level), fillOpacity: 0.1 }}
          />
        )}
      </MapContainer>
    </div>
  );
}

export default RumorMap;
