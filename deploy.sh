#!/bin/bash

echo "🔐 Vercel Deployment Script"
echo "================================"
echo ""
echo "Passo 1: Fazer login no Vercel"
echo "Execute o comando abaixo:"
echo ""
echo "  vercel login"
echo ""
echo "Isso abrirá seu navegador para autenticação."
echo ""
echo "Passo 2: Depois de autenticar, execute:"
echo ""
echo "  # Deploy do Backend"
echo "  cd /workspaces/DREEVES/backend && vercel --prod"
echo ""
echo "  # Copie a URL retornada e salve-a"
echo ""
echo "Passo 3: Configure o Frontend com a URL do Backend"
echo ""
echo "  cd /workspaces/DREEVES/frontend"
echo "  echo 'REACT_APP_API_URL=https://seu-backend-url/api' > .env.local"
echo ""
echo "Passo 4: Deploy do Frontend"
echo ""
echo "  vercel --prod"
echo ""
echo "================================"
echo "Vou abrir seu navegador para login..."
echo ""

# Tentar abrir navegador
if command -v x-www-browser &> /dev/null; then
    x-www-browser "https://vercel.com/login" &
elif command -v sensible-browser &> /dev/null; then
    sensible-browser "https://vercel.com/login" &
fi

echo "Abra seu navegador em: https://vercel.com/login"
echo ""
echo "Após fazer login, execute:"
echo "  cd /workspaces/DREEVES/backend && vercel --prod"
