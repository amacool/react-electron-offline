const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const moment = require('moment');
const { dialog } = require('electron');
const { channels } = require('../src/shared/constants');

let mainWindow;

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
  const savePath = dialog.showSaveDialog('data.json');
  if (!savePath) return;

  try {
    fs.writeFile(savePath, arg.content, function(err) {
      if (err)  throw err;

      const historyPath = path.join(__dirname, '../documents/history.txt');
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