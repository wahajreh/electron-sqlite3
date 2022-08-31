// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')

const express = require('express')
const app1 = express()

const port = 3000
const sqlite3 = require('sqlite3')
app1.use('/as', require('./api/index'))
app1.get('/', (req, res) => {
  var db = new sqlite3.Database('mydb.db');
  db.serialize(function () {
    db.run("CREATE TABLE if not exists lorem (info TEXT)");
    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    var pdf = require("pdf-creator-node");

    // Read HTML Template
    var html = ``
    var row;
    db.all("SELECT rowid AS id, info FROM lorem", function (err, row) {
      // console.log(row.id + ": " + row.info);
      res.status(200).json({ code: 0, message: true, data: row })
    });
  });
  db.close();
})

app1.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})







function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
