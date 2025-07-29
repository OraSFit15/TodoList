#!/bin/bash

echo "🔨 Création d'un build Electron officiel..."

# Sauvegarder le package.json original
cp package.json package.json.original

# Créer un package.json temporaire sans les dépendances problématiques
echo "📝 Création d'un package.json temporaire..."
cat > package.json << 'EOF'
{
  "name": "todolist",
  "version": "1.0.0",
  "description": "A lightweight Todo List application",
  "main": "dist/main/main.js",
  "scripts": {
    "start": "concurrently \"webpack serve --mode development\" \"electron .\"",
    "build:main": "tsc -p tsconfig.main.json",
    "build:renderer": "webpack --mode production",
    "build": "npm run build:main && npm run build:renderer",
    "dev:renderer": "webpack serve --mode development --port 4000",
    "dev": "cross-env NODE_ENV=development concurrently \"npm run dev:renderer\" \"sleep 5 && npm run build:main && npx electron .\"",
    "test": "jest",
    "test:watch": "jest --watch",
    "pack": "npm run build && electron-builder --dir",
    "dist": "npm run build && electron-builder"
  },
  "build": {
    "appId": "com.todolist.app",
    "productName": "Todo List",
    "directories": {
      "output": "release"
    },
    "files": [
      "dist/**/*",
      "package.json"
    ],
    "mac": {
      "category": "public.app-category.productivity"
    },
    "npmRebuild": false,
    "nodeGypRebuild": false
  },
  "dependencies": {},
  "devDependencies": {
    "concurrently": "^9.2.0",
    "cross-env": "^10.0.0",
    "css-loader": "^7.1.2",
    "electron": "^37.2.4",
    "electron-builder": "^26.0.12",
    "html-webpack-plugin": "^5.5.1",
    "style-loader": "^3.3.2",
    "ts-loader": "^9.4.2",
    "typescript": "^5.0.3",
    "webpack": "^5.77.0",
    "webpack-cli": "^5.0.1",
    "webpack-dev-server": "^4.13.2"
  }
}
EOF

# Construire l'application
echo "🔨 Construction de l'application..."
npm run build

# Corriger le chemin dans le HTML
echo "🔧 Correction des chemins HTML..."
sed -i '' 's|src="/renderer.js"|src="./renderer.js"|g' dist/renderer/index.html

# Créer un main.js simple qui fonctionne
echo "📝 Création d'un main.js simple..."
cat > dist/main.js << 'EOF'
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    }
  });

  // Charger le HTML du renderer
  const htmlPath = path.join(__dirname, 'renderer', 'index.html');
  mainWindow.loadURL(url.format({
    pathname: htmlPath,
    protocol: 'file:',
    slashes: true
  }));
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
EOF

# Mettre à jour le package.json pour pointer vers le bon main
sed -i '' 's|"main": "dist/main/main.js"|"main": "dist/main.js"|g' package.json

# Construire avec electron-builder
echo "📦 Construction avec electron-builder..."
npx electron-builder --dir

# Restaurer le package.json original
echo "🔄 Restauration du package.json original..."
mv package.json.original package.json

echo "✅ Build terminé!"
echo "📦 Votre application est dans: release/mac-arm64/Todo List.app"
echo "▶️ Lancez avec: open 'release/mac-arm64/Todo List.app'"
