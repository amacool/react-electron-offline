const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const moment = require('moment');
const { dialog } = require('electron');
const { channels } = require('../src/shared/constants');

let mainWindow;
const historyPath = path.join(__dirname, '../documents/history.txt');

function createWindow () {
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true,
  });
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    },
  });
  mainWindow.loadURL(startUrl);
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on(channels.APP_INFO, (event) => {
  event.sender.send(channels.APP_INFO, {
    appName: app.getName(),
    appVersion: app.getVersion(),
  });
});

ipcMain.on(channels.SAVE_FILE, function (event, arg) {
  const savePath = dialog.showSaveDialog();
  if (!savePath) return;
  try {
    fs.writeFile(savePath, arg.content, function(err) {
      if (err)  throw err;

      const today = moment(new Date()).format('MM/DD/YYYY');
      const dataToAppend = `${savePath},${today},${arg.isDraft}\n`;
      fs.open(historyPath, 'a+', (err, fd) => {
        if (err) throw err;
        fs.appendFile(fd, dataToAppend, 'utf8', (err) => {
          fs.close(fd, (err) => {
            if (err) throw err;
          });
          if (err) throw err;
        });
      });
      event.sender.send(channels.SAVE_FILE, {
        success: true
      });
    })
  } catch(err) {
    console.log(err);
    event.sender.send(channels.SAVE_FILE, {
      message: err,
      success: false
    });
  }
});

ipcMain.on(channels.GET_HISTORY, function (event) {
  try {
    fs.readFile(historyPath, 'utf-8', (err, data) => {
      if (err) throw err;
      event.sender.send(channels.GET_HISTORY, {
        success: true,
        data
      });
    });
  } catch (err) {
    console.log(err);
    event.sender.send(channels.GET_HISTORY, {
      message: err,
      success: false
    });
  }
});

ipcMain.on(channels.OPEN_FILE, function (event) {
  const openPath = dialog.showOpenDialog();
  if (!openPath) return;
  console.log(openPath);
  try {
    fs.readFile(openPath[0], 'utf-8', (err, data) => {
      if (err) throw err;
      event.sender.send(channels.OPEN_FILE, {
        success: true,
        data
      });
    });
  } catch (err) {
    console.log(err);
    event.sender.send(channels.OPEN_FILE, {
      message: err,
      success: false
    });
  }
});
