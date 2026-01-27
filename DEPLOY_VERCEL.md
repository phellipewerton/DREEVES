# Sistema de Detecção de Rumores - Guia de Deploy no Vercel

## 🚀 Deployment do Backend

### Pré-requisitos
- Conta no [Vercel](https://vercel.com)
- [Vercel CLI](https://vercel.com/docs/cli) instalado

### Passo 1: Deploy do Backend

1. Instale o Vercel CLI:
```bash
npm install -g vercel
```

2. Entre na pasta do backend:
```bash
cd backend
```

3. Deploy:
```bash
vercel
```

4. Siga as instruções e escolha:
   - **Qual projeto?** → Create a new project
   - **Nome do projeto** → dreeves-backend
   - **Diretório** → ./

5. Após o deploy, você receberá uma URL como:
```
https://dreeves-backend.vercel.app
```

**Salve essa URL!** Você usará para conectar o frontend.

### Passo 2: Configurar Variáveis de Ambiente

1. No painel do Vercel, acesse seu projeto
2. Vá para **Settings** → **Environment Variables**
3. Adicione:
   - `NODE_ENV` = `production`
   - `PORT` = `5000`

## 🎨 Deployment do Frontend

### Passo 1: Configurar URL da API

1. Crie um arquivo `.env.local` na raiz do frontend:

```bash
cd frontend
echo 'REACT_APP_API_URL=https://dreeves-backend.vercel.app/api' > .env.local
```

**Substitua `https://dreeves-backend.vercel.app` pela URL do seu backend!**

### Passo 2: Deploy do Frontend

1. Entre na pasta do frontend:
```bash
cd frontend
```

2. Deploy:
```bash
vercel
```

3. Siga as instruções:
   - **Qual projeto?** → Create a new project
   - **Nome do projeto** → dreeves-frontend
   - **Diretório** → ./
   - **Deseja fazer override de configurações?** → N

4. Após o deploy, você receberá uma URL como:
```
https://dreeves-frontend.vercel.app
```

## ✅ URLs Finais

Após o deployment, você terá:

- **Frontend**: `https://dreeves-frontend.vercel.app`
- **Backend API**: `https://dreeves-backend.vercel.app/api`

## 🔄 Atualizações Futuras

Para fazer deploy novamente após alterações:

```bash
# Backend
cd backend
vercel --prod

# Frontend
cd frontend
vercel --prod
```

## ⚙️ Configurações Avançadas

### Banco de Dados

Por padrão, o SQLite é salvo localmente. Para um banco de dados persistente no Vercel:

1. **Opção 1**: Usar MongoDB Atlas (gratuito)
   - Criar conta em https://www.mongodb.com/cloud/atlas
   - Modificar `backend/src/db/database.js` para usar MongoDB

2. **Opção 2**: Usar PostgreSQL no Vercel
   - Usar extensão de banco de dados do Vercel

### Variáveis Secretas

Se precisar de credenciais:

1. No painel do Vercel
2. **Settings** → **Environment Variables**
3. Adicione as variáveis necessárias
4. Redeploy

## 🐛 Troubleshooting

### "Cannot find module"
- Verifique se todas as dependências estão em `package.json`
- Execute `npm install` novamente
- Redeploy

### "API não conecta"
- Verifique a URL do backend no `.env.local` do frontend
- Certifique-se de que o backend está rodando
- Verifique CORS no backend

### Erro 500 no Backend
- Verifique os logs no painel do Vercel
- Confirme que o `vercel.json` está correto

## 📱 Acessar a Aplicação

1. Abra seu navegador
2. Vá para: `https://dreeves-frontend.vercel.app`
3. Comece a usar o sistema!

---

**Pronto!** Seu sistema está rodando na nuvem! 🎉
