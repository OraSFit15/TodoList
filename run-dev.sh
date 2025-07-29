#!/bin/bash

echo "🚀 Lancement de l'application en mode développement..."
echo "Cette méthode utilise le serveur webpack et devrait fonctionner correctement."

# Arrêter les processus existants qui pourraient interférer
pkill -f "electron" || true
pkill -f "webpack" || true

# Lancer le serveur webpack en arrière-plan
echo "📡 Démarrage du serveur webpack..."
cd /Users/ora/CascadeProjects/TodoList
npx webpack serve --mode development --port 4000 &
WEBPACK_PID=$!

# Attendre que webpack démarre
echo "⏳ Attente du démarrage de webpack (5 secondes)..."
sleep 5

# Compiler le processus principal
echo "🔨 Compilation du processus principal..."
npm run build:main

# Lancer Electron
echo "🚀 Lancement d'Electron..."
NODE_ENV=development npx electron .

# Nettoyage
echo "🧹 Nettoyage des processus..."
kill $WEBPACK_PID || true
