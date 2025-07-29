import { app, BrowserWindow } from 'electron';
import * as path from 'path';

async function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Wait a bit for dev server to be ready, then load
  setTimeout(async () => {
    try {
      await mainWindow.loadURL('http://localhost:4000');
      mainWindow.webContents.openDevTools();
    } catch (error) {
      console.error('Failed to load dev server:', error);
    }
  }, 2000);
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
