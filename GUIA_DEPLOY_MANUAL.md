# 🚀 Guia de Deploy - DREEVES

## Status Atual

✅ **Backend**: Funcional localmente  
✅ **Frontend**: Pronto para deploy  
⚠️ **Vercel**: Ação automática com erro (será desabilitada)

---

## Solução Imediata

O erro que você está vendo é de uma ação automática do Vercel que está falhando. **A solução é fazer o deploy manualmente via CLI do Vercel**, que é mais simples e confiável.

### Passo 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Passo 2: Fazer Login

```bash
vercel login
```

Isso abrirá seu navegador para autenticar. Clique para confirmar.

### Passo 3: Deploy do Backend

```bash
cd /workspaces/DREEVES/backend
vercel --prod
```

**Respostas esperadas:**
- `? Set up and deploy "/workspaces/DREEVES/backend"?` → `y`
- `? Which scope do you want to deploy to?` → Selecione sua conta
- `? Link to existing project?` → `n` (ou `y` se quiser usar projeto existente)
- `? What's your project's name?` → `dreeves-backend`
- `? In which directory is your code located?` → `.`

**Resultado**: Você receberá uma URL como `https://dreeves-backend.vercel.app`

### Passo 4: Salvar URL do Backend

Copie a URL que você recebeu. Você vai usar na próxima etapa.

### Passo 5: Configurar Frontend

```bash
# Edite o arquivo .env.production
cd /workspaces/DREEVES/frontend
```

Abra o arquivo `frontend/.env.production` e altere a URL:

```
REACT_APP_API_URL=https://dreeves-backend.vercel.app/api
```

(Substitua `dreeves-backend` pela URL correta se tiver um nome diferente)

### Passo 6: Deploy do Frontend

```bash
cd /workspaces/DREEVES/frontend
vercel --prod
```

**Respostas esperadas:**
- `? Set up and deploy...` → `y`
- `? Which scope...` → Selecione sua conta
- `? Link to existing project?` → `n` (ou `y` se preferir)
- `? Project's name?` → `dreeves-frontend`
- `? In which directory...` → `.`

**Resultado**: URL do frontend, algo como `https://dreeves-frontend.vercel.app`

---

## Testando Após Deploy

### Backend
```bash
curl https://dreeves-backend.vercel.app/api/health
```

Deve retornar:
```json
{"status":"OK","message":"Sistema de detecção de rumores operacional"}
```

### Frontend
Acesse: https://dreeves-frontend.vercel.app

Deve abrir o dashboard com o mapa.

---

## Se Algo Não Funcionar

### Backend retorna erro 500/502

**Causa**: Vercel pode ter problema com o cold start. Tente:
```bash
# Redeployar
cd backend
vercel --prod --force
```

### Frontend não conecta ao backend

**Causa**: URL do API errada no `.env.production`

**Solução**:
1. Verifique a URL correta do seu backend no Vercel
2. Atualize `.env.production`
3. Faça push para GitHub:
```bash
git add frontend/.env.production
git commit -m "fix: Atualizar URL do backend"
git push origin main
```
4. Redeploy:
```bash
cd frontend
vercel --prod --force
```

### Erro "Command not found: vercel"

**Solução**:
```bash
npm install -g vercel
vercel login
```

---

## Resumo Visual

```
┌─────────────────────────────────────────┐
│         DREEVES - Arquitetura           │
├─────────────────────────────────────────┤
│                                         │
│  Frontend (React)                       │
│  https://dreeves-frontend.vercel.app    │
│           │                             │
│           └─── HTTP/HTTPS ─────┐        │
│                                │        │
│                          Backend (Node) │
│                          https://dreev..│
│                                         │
│  Banco de Dados (Em Memória)            │
│  ✅ Funcional                          │
│  ⚠️ Não persiste entre reinicializações│
│                                         │
└─────────────────────────────────────────┘
```

---

## Próximos Passos (Produção)

Para um sistema com dados persistentes:

1. **Integrar MongoDB Atlas**
   ```
   Substituir banco em memória por MongoDB
   ```

2. **Adicionar Autenticação**
   ```
   JWT tokens para segurança
   ```

3. **Cache com Redis**
   ```
   Melhorar performance
   ```

---

**Dúvidas?** Retorne após fazer o deploy manual!
