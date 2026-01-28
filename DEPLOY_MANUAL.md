# DREEVES - Sistema de Detecção de Rumores

## Sobre o Projeto

Sistema completo de detecção e análise de rumores com:
- **Avaliação de Risco**: Algoritmo baseado em palavras-chave configuráveis
- **Mapa Interativo**: Visualização de rumores em tempo real com Leaflet.js
- **Dashboard Inteligente**: Interface React com abas para gerenciamento
- **API RESTful**: Backend em Node.js/Express com banco de dados em memória

## Tecnologias

### Frontend
- React 18.2.0
- Leaflet.js para mapas
- Axios para requisições HTTP
- CSS Grid/Flexbox para layout

### Backend
- Node.js + Express.js
- Banco de dados em memória (otimizado para Vercel Serverless)
- UUID para IDs únicos
- CORS habilitado para requisições do frontend

## Estrutura do Projeto

```
DREEVES/
├── backend/
│   ├── src/
│   │   ├── index.js          # Express app principal
│   │   ├── db/database.js    # Banco em memória
│   │   ├── services/         # Lógica de negócios
│   │   ├── controllers/      # Handlers de rotas
│   │   └── routes/           # Definições de endpoints
│   ├── api/index.js          # Handler Vercel Serverless
│   ├── vercel.json           # Configuração Vercel
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/Dashboard.js        # Container principal
    │   ├── components/               # Componentes React
    │   ├── services/api.js           # Cliente HTTP
    │   └── index.js
    ├── vercel.json                   # Configuração Vercel
    ├── .env.production              # Variáveis para produção
    └── package.json
```

## Endpoints da API

### Rumores
- `GET /api/rumors` - Listar rumores
- `POST /api/rumors` - Criar novo rumor
- `GET /api/rumors/:id` - Obter detalhes
- `PUT /api/rumors/:id/status` - Atualizar status
- `DELETE /api/rumors/:id` - Deletar rumor

### Palavras-chave
- `GET /api/keywords` - Listar palavras-chave
- `POST /api/keywords` - Adicionar palavra-chave
- `PUT /api/keywords/:id` - Atualizar peso
- `DELETE /api/keywords/:id` - Deletar palavra-chave

### Análise de Risco
- `GET /api/risk/statistics` - Estatísticas gerais
- `POST /api/risk/analyze/:id` - Analisar rumor específico

## Níveis de Risco

- **NENHUM**: Score = 0
- **BAIXO**: Score 1-9
- **MÉDIO**: Score 10-24
- **ALTO**: Score 25-49
- **CRÍTICO**: Score ≥ 50

## Deploy no Vercel

### Backend
```bash
cd backend
vercel deploy
```

### Frontend
```bash
cd frontend
vercel deploy
```

Ou use as configurações em `vercel.json` de cada pasta.

## Desenvolvimento Local

### Backend
```bash
cd backend
npm install
npm start
# Servidor rodando em http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
REACT_APP_API_URL=http://localhost:5000/api npm start
# App rodando em http://localhost:3000
```

## Recursos Principais

### Mapa Interativo
- Visualização em tempo real de rumores
- Marcadores coloridos por nível de risco
- Círculo de 5km destacando rumor selecionado
- Zoom e pan automáticos

### Dashboard
- **Aba 1: Mapa de Rumores** - Visualização geográfica
- **Aba 2: Novo Rumor** - Formulário com validação
- **Aba 3: Palavras-chave** - Gerenciar termos de risco

### Detalhes do Rumor
- Título, localização, fonte
- Nível de risco com badge colorida
- Palavras-chave detectadas com peso e categoria
- Status: PENDENTE, VERIFICADO, FALSO, VERDADEIRO, ARQUIVADO

## Configuração de Palavras-chave

As palavras-chave são categorizadas e possuem um peso de risco (1-100):

```json
{
  "keyword": "termo perigoso",
  "risk_weight": 50,
  "category": "Saúde"
}
```

Quanto maior o peso, maior o impacto no score de risco.

## Notas Técnicas

- **Banco em Memória**: Ideal para Vercel Serverless, mas não persiste entre reinicializações
- **Sem Banco Permanente**: Para produção robusta, considere MongoDB Atlas ou Supabase
- **CORS Habilitado**: Frontend pode fazer requisições de qualquer origem
- **API Stateless**: Cada requisição é independente

## Melhorias Futuras

1. [ ] Integração com banco de dados permanente (MongoDB/PostgreSQL)
2. [ ] Autenticação e autorização
3. [ ] Rate limiting para APIs
4. [ ] Cache com Redis
5. [ ] Notificações em tempo real (WebSocket)
6. [ ] Exportação de dados (PDF/CSV)
7. [ ] Analytics e gráficos avançados

## Contato

Para dúvidas ou sugestões sobre o sistema DREEVES.

---

**Status**: ✅ Pronto para deploy em Vercel
