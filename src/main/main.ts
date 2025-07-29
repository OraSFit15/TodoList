import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

async function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    }
  });

  const isDev = process.env.NODE_ENV === 'development';
  console.log('Running in', isDev ? 'development' : 'production', 'mode');
  
  if (isDev) {
    // Development - load from webpack dev server
    const loadDevServer = async (retryCount = 0) => {
      try {
        console.log('Attempting to connect to dev server at http://localhost:4000');
        await mainWindow.loadURL('http://localhost:4000');
        console.log('Successfully connected to dev server');
        mainWindow.webContents.openDevTools();
      } catch (error) {
        console.error(`Failed to load dev server (attempt ${retryCount + 1}):`, error);
        if (retryCount < 5) {
          console.log(`Retrying in 2 seconds... (${retryCount + 1}/5)`);
          setTimeout(() => loadDevServer(retryCount + 1), 2000);
        } else {
          console.error('Max retry attempts reached. Could not connect to dev server.');
          // Fallback to loading from file system
          mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, '../renderer/index.html'),
            protocol: 'file:',
            slashes: true
          }));
        }
      }
    };
    
    // Give webpack dev server time to start up
    setTimeout(() => loadDevServer(), 2000);
  } else {
    // Production - load from built files
    const rendererPath = path.resolve(__dirname, '../../dist/renderer/index.html');
    console.log('Loading production HTML from:', rendererPath);
    mainWindow.loadURL(url.format({
      pathname: rendererPath,
      protocol: 'file:',
      slashes: true
    }));
  }
}

app.whenReady().then(createWindow);

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
