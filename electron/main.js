const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;


const isDev = process.env.NODE_ENV === 'development' || 
              process.argv.includes('--dev') ||
              !process.argv[1].includes('app.asar');

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    }
  });


  if (isDev) {
    
    mainWindow.loadURL('http://localhost:5173');
    console.log('✅ Loading from dev server: http://localhost:5173');
  } else {
    
    mainWindow.loadFile(path.join(__dirname, '../react-ui/dist/index.html'));
    console.log('✅ Loading from production build');
  }

  
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}


const { initializeDatabase } = require('./database/db');


require('./handlers/authHandler')(ipcMain);

app.on('ready', () => {
  initializeDatabase();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});