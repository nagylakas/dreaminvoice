const electron = require('electron')
// Module to control application life.
//const app = electron.app
const {app, Menu} = require('electron')
app.setName('DDO-DreamInvoice');
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
//Menu
const template = [
  {
    label: 'Főmenü',
    submenu: [
      {
        label: 'Visszavonás',
        role: 'undo'
      },
      {
        label: 'Ismét',
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        label: 'Kivágás',
        role: 'cut'
      },
      {
        label: 'Másolás',
        role: 'copy'
      },
      {
        label: 'Beillesztés',
        role: 'paste'
      },
      {
        label: 'Beillesztés formázással',
        role: 'pasteandmatchstyle'
      },
      {
        label: 'Törlés',
        role: 'delete'
      },
      {
        label: 'Mindet kijelöl',
        role: 'selectall'
      },
      {
        type: 'separator'
      },
      {
        label: 'Ablak bezárása',
        role: 'close'
      },
    ]
  },
  {
    label: 'Súgó',
    role: 'help',
    submenu: [
      {
        label: 'DDO Homepage',
        click () { require('electron').shell.openExternal('https://ddo.hu') }
      }
    ]
  }
]
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow(
    {
      width: 1024,
      height: 768,
      minWidth: 800,
      minHeight: 550,
      backgroundColor: '#444444'
    });
  mainWindow.maximize();

  //var mainmenu = new Menu();
  //Menu.setApplicationMenu(mainmenu);

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  //console.log(url);

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
