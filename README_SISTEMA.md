# Sistema de Detecção de Rumores

Um sistema completo para detectar, analisar e mapear rumores com avaliação inteligente de risco.

## 🎯 Características

- **Mapa Interativo**: Visualização geográfica de todos os rumores detectados
- **Avaliação de Risco**: Sistema automático de análise baseado em palavras-chave
- **Gerenciamento de Palavras-chave**: Adicionar e configurar palavras-chave com pesos personalizáveis
- **Dashboard Estatístico**: Estatísticas em tempo real sobre rumores e níveis de risco
- **Sistema de Status**: Rastreamento de investigação de rumores
- **API RESTful**: Backend completo com Express.js
- **Interface Moderna**: Frontend responsivo com React e Leaflet

## 📁 Estrutura do Projeto

```
DREEVES/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Controladores da API
│   │   ├── services/         # Lógica de negócio
│   │   ├── routes/           # Definição de rotas
│   │   ├── db/               # Configuração do banco de dados
│   │   └── index.js          # Entrada principal
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   ├── pages/            # Páginas da aplicação
│   │   ├── services/         # Serviços de API
│   │   └── index.js          # Entrada principal
│   └── package.json
└── README.md
```

## 🚀 Instalação e Uso

### Backend

1. Navegue até a pasta backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor:
```bash
npm start
```

O servidor rodará em `http://localhost:5000`

### Frontend

1. Navegue até a pasta frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie a aplicação:
```bash
npm start
```

A aplicação abrirá em `http://localhost:3000`

## 📊 Como Usar

### 1. Adicionar Palavras-chave

1. Vá para a aba "Palavras-chave"
2. Clique em "+ Nova Palavra-chave"
3. Preencha:
   - **Palavra-chave**: O termo a ser detectado
   - **Peso de Risco**: Valor numérico (1-100) indicando o risco
   - **Categoria**: Categorize a palavra-chave (ex: Saúde, Política)
4. Clique em "Adicionar Palavra-chave"

### 2. Reportar Novo Rumor

1. Vá para a aba "Novo Rumor"
2. Preencha o formulário:
   - **Título**: Resumo do rumor
   - **Descrição**: Detalhes completos
   - **Latitude/Longitude**: Localização (ex: -15.8267, -47.8711)
   - **Local**: Nome do lugar
   - **Fonte**: De onde veio a informação
3. O sistema calculará automaticamente o risco
4. Clique em "Reportar Rumor"

### 3. Visualizar no Mapa

1. Vá para a aba "Mapa de Rumores"
2. Veja todos os rumores como bolinhas coloridas:
   - 🔴 Vermelho = Crítico
   - 🟠 Laranja = Alto
   - 🟡 Amarelo = Médio
   - 🟢 Verde = Baixo
   - 🔵 Azul = Nenhum
3. Clique em qualquer bolinha para ver detalhes
4. Use os filtros para ver apenas rumores específicos

### 4. Gerenciar Status

Selecione um rumor no mapa e mude o status:
- **Pendente**: Ainda sendo investigado
- **Verificado**: Foi investigado
- **Falso**: Confirmado como falso
- **Verdadeiro**: Confirmado como verdadeiro
- **Arquivado**: Encerrado

## 🔌 API Endpoints

### Rumores
- `GET /api/rumors` - Listar todos os rumores
- `POST /api/rumors` - Criar novo rumor
- `GET /api/rumors/:id` - Obter rumor específico
- `PATCH /api/rumors/:id/status` - Atualizar status
- `DELETE /api/rumors/:id` - Deletar rumor
- `GET /api/rumors/area?latitude=X&longitude=Y&radius=Z` - Rumores por área

### Palavras-chave
- `GET /api/keywords` - Listar todas
- `POST /api/keywords` - Adicionar nova
- `POST /api/keywords/batch` - Adicionar múltiplas
- `DELETE /api/keywords/:id` - Deletar
- `PATCH /api/keywords/:id/weight` - Atualizar peso

### Risco
- `POST /api/risk/calculate` - Calcular risco de um texto
- `GET /api/risk/analyze/:id` - Analisar risco de um rumor
- `GET /api/risk/stats` - Obter estatísticas

## 📈 Cálculo de Risco

O sistema calcula o score de risco da seguinte forma:

1. **Análise de Texto**: Procura por palavras-chave no título e descrição
2. **Peso Multiplicativo**: Cada palavra encontrada multiplica seu peso de risco
3. **Score Total**: Soma de todos os pesos encontrados
4. **Nível**: Convertido em nível visual

### Escala de Risco
- **Score 0**: NENHUM
- **Score 1-9**: BAIXO
- **Score 10-24**: MÉDIO
- **Score 25-49**: ALTO
- **Score 50+**: CRÍTICO

## 🔒 Banco de Dados

O sistema usa SQLite com as seguintes tabelas:

### Tabela: keywords
- `id` (TEXT, PK)
- `keyword` (TEXT, UNIQUE)
- `risk_weight` (INTEGER)
- `category` (TEXT)
- `created_at` (DATETIME)

### Tabela: rumors
- `id` (TEXT, PK)
- `title` (TEXT)
- `description` (TEXT)
- `latitude` (REAL)
- `longitude` (REAL)
- `location_name` (TEXT)
- `risk_level` (TEXT)
- `risk_score` (INTEGER)
- `keywords_found` (TEXT, JSON)
- `source` (TEXT)
- `status` (TEXT)
- `created_at` (DATETIME)
- `updated_at` (DATETIME)

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **SQLite** - Banco de dados
- **UUID** - Geração de IDs únicos
- **CORS** - Compartilhamento de recursos

### Frontend
- **React** - Biblioteca UI
- **Leaflet** - Mapa interativo
- **Axios** - Cliente HTTP
- **CSS3** - Estilização responsiva

## 📝 Exemplos de Palavras-chave

Algumas sugestões de palavras-chave por categoria:

### Saúde
- vírus, pandemia, vacina, epidemia, contaminação

### Política
- golpe, fraude, conspiração, manipulação, corrupção

### Emergência
- calamidade, desastre, crise, destruição, colapso

### Desinformação
- fake news, boato, mentira, enganador, falso

## 🤝 Contribuindo

Sinta-se livre para adicionar novas funcionalidades ou melhorias!

## 📄 Licença

MIT
