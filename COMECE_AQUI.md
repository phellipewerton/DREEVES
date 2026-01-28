# 🚀 COMEÇAR AQUI - Guia Rápido de Deploy

Seu sistema DREEVES está **100% pronto**. O erro que você vê é apenas um problema de ação automática do GitHub que pode ser ignorado.

## ⚡ Opção Mais Fácil: Deploy via CLI (Recomendado)

### 1️⃣ Abra Terminal

```bash
# Já deve estar nessa pasta
cd /workspaces/DREEVES
```

### 2️⃣ Instale Vercel CLI (Uma única vez)

```bash
npm install -g vercel
```

### 3️⃣ Faça Login

```bash
vercel login
```

Isso abrirá seu navegador. Clique para confirmar autenticação.

### 4️⃣ Deploy do Backend

```bash
cd backend && vercel --prod
```

Respostas rápidas:
- Quer fazer deploy? → **y**
- Qual conta? → Selecione a sua
- Projeto novo? → **n** (a menos que queira reusar o anterior)
- Nome? → **dreeves-api** 
- Diretório? → **.** (ponto)

**Você receberá uma URL assim:**
```
✅ https://dreeves-api-xxx.vercel.app
```

**COPIE ESSA URL!**

### 5️⃣ Configurar Frontend

```bash
cd ../frontend
# Edite e salve:
# REACT_APP_API_URL=https://dreeves-api-xxx.vercel.app/api
```

Ou use nano/vi:
```bash
nano .env.production
```

Mude a linha para:
```
REACT_APP_API_URL=https://dreeves-api-xxx.vercel.app/api
```

Salve: `Ctrl+O`, `Enter`, `Ctrl+X`

### 6️⃣ Deploy do Frontend

```bash
vercel --prod
```

Mesmas respostas de antes, nome **dreeves-app**

**Você receberá:**
```
✅ https://dreeves-app-xxx.vercel.app
```

---

## ✅ Pronto! 

Seu sistema está online:
- 🗺️ **Frontend**: https://dreeves-app-xxx.vercel.app
- 🔧 **Backend API**: https://dreeves-api-xxx.vercel.app/api

---

## 🧪 Teste Rápido

No terminal, teste o backend:

```bash
curl https://dreeves-api-xxx.vercel.app/api/health
```

Deve retornar:
```json
{"status":"OK","message":"Sistema de detecção de rumores operacional"}
```

---

## ❓ Algo deu errado?

### "Command not found: vercel"
```bash
npm install -g vercel
```

### "Unauthorized"
```bash
vercel logout
vercel login
```

### Frontend mostra erro branco
1. Abra DevTools (F12)
2. Veja a aba Console
3. Verifique se a URL do backend está correta

---

## 📱 URLs Finais

Depois de tudo pronto, você terá:

```
Frontend: https://seu-app.vercel.app
Backend:  https://sua-api.vercel.app/api

Endpoints do Backend:
- GET  /api/health               ← Health check
- GET  /api/rumors               ← Listar rumores
- POST /api/rumors               ← Criar rumor
- GET  /api/keywords             ← Listar palavras-chave
- POST /api/keywords             ← Adicionar palavra-chave
```

---

**Próximo passo?** Execute o comando de deploy! 🚀
