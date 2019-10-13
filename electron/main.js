const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const moment = require('moment');
const mime = require('mime-types');
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
      nodeIntegration: true,
      webSecurity: false
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

      // update history info
      fs.readFile(historyPath, 'utf-8', (err, data) => {
        if (err) throw err;
        let logs = data.split("\n");
        logs.splice(logs.length - 1, 1);
        const existingLogIndex = logs.findIndex((item) => item.indexOf(savePath) >= 0);
        const today = moment(new Date()).format('MM/DD/YYYY');
        const newLog = `${savePath},${today},${arg.isDraft}`;
        if (existingLogIndex >= 0) {
          logs[existingLogIndex] = newLog;
        } else {
          logs.push(newLog);
        }
        logs.push("");
        fs.writeFile(historyPath, logs.join("\n"), (err) => {
          if (err) throw err;
        });
      });
      event.sender.send(channels.SAVE_FILE, {
        success: true
      });
    })
  } catch(err) {
    event.sender.send(channels.SAVE_FILE, {
      message: err.message,
      success: false
    });
  }
});

ipcMain.on(channels.GET_HISTORY, function (event) {
  try {
    fs.readFile(historyPath, 'utf-8', (err, data) => {
      if (err) throw err;
      const newData = keepRecent(data).join("\n");
      event.sender.send(channels.GET_HISTORY, {
        success: true,
        data: newData
      });
      if (newData !== data) {
        fs.writeFile(historyPath, newData, function (err) {
          if (err) throw err;
        });
      }
    });
  } catch (err) {
    event.sender.send(channels.GET_HISTORY, {
      message: err.message,
      success: false
    });
  }
});

ipcMain.on(channels.OPEN_FILE, function (event, arg) {
  let openPath = '';
  if (arg && arg.path) {
    openPath = arg.path;
  } else {
    openPath = dialog.showOpenDialog();
    if (openPath) {
      openPath = openPath[0];
    }
  }
  if (!openPath) {
    event.sender.send(channels.OPEN_FILE, {
      message: 'not selected',
      success: false
    });
    return;
  }
  try {
    fs.readFile(openPath, 'utf-8', (err, data) => {
      try {
        if (err) throw err;

        // document validation
        if (!isJson(data)) throw Error("Invalid document");
        const fileInfo = JSON.parse(data);
        if (fileInfo.sign !== 'council-document') {
          throw Error('Invalid document');
        }

        // update last opened date
        fs.readFile(historyPath, 'utf-8', (err, data) => {
          if (err) throw err;
          let logs = data.split("\n");
          logs.splice(logs.length - 1, 1);
          let existingLog = logs.find((item) => item.split(",")[0] === openPath.replace("\\\\", "\\"));
          let newData = '';
          if (existingLog) {
            let newInfo = existingLog.split(",");
            newInfo[1] = moment(new Date()).format('MM/DD/YYYY');
            newInfo = newInfo.join(",");
            newData = data.replace(existingLog, newInfo);
          } else {
            const today = moment(new Date()).format('MM/DD/YYYY');
            const newLog = `${openPath},${today},1`;
            logs.push(newLog);
            logs.push("");
            newData = logs.join("\n");
          }
          fs.writeFile(historyPath, newData, function (err) {
            if (err) throw err;
          });
        });

        event.sender.send(channels.OPEN_FILE, {
          success: true,
          data: fileInfo
        });
      } catch (err) {
        event.sender.send(channels.OPEN_FILE, {
          message: err.message,
          success: false
        });
      }
    });
  } catch (err) {
    event.sender.send(channels.OPEN_FILE, {
      message: err.message,
      success: false
    });
  }
});

ipcMain.on(channels.GET_FILE_TYPE, function (event, arg) {
  if (!arg) return;
  try {
    const type = mime.extension(mime.lookup(arg));
    event.sender.send(channels.GET_FILE_TYPE, {
      success: true,
      data: type
    });
  } catch (err) {
    event.sender.send(channels.GET_FILE_TYPE, {
      message: err.message,
      success: false
    });
  }
});

const keepRecent = (data) => {
  const rows = data.split("\n");
  const newData = [];
  rows.forEach((item) => {
    if (!item) return;
    const date1 = moment(new Date(item.split(",")[1]));
    const date2 = moment(new Date());
    const diff = date2.diff(date1, 'days');
    if (diff <= 7) {
      newData.push(item);
    }
  });
  newData.push("");
  return newData;
};

const isJson = (data) => {
  try {
    JSON.parse(data);
    return true;
  } catch (err) {
    return false;
  }
};
