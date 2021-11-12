const electron = require('electron');
const { app, globalShortcut } = require('electron')
const BrowserWindow = electron.BrowserWindow;
const tasklist = require('win-tasklist');

var check = true;



const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;
app.on('ready', ()=>{

  tasklist().then((list)=>{
  
    Object.entries(list).forEach(item=>{
      let name = item[1].process
      if(name=='Discord.exe')
      console.log(name)
      check = false;
    })
  
    
    if(check)
    createWindow()
    else
    console.log("sssssnoooo")
  }).catch((err)=>{
    console.error(err);
  });
  });

app.on('browser-window-blur',()=>{
  console.log("ssssS")
})

app.on('browser-window-focus',()=>{
  console.log("yeess")
})


function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680, fullscreen:true, focusable:true});
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
}

app.whenReady().then(() => {
  // Register a 'CommandOrControl+X' shortcut listener.
  let ret = globalShortcut.register('ALT+TAB', () => {
    console.log('CommandOrControl+X is pressed')
  })

  if (!ret) {
    console.log('registration failed')
  }

  ret = globalShortcut.register('F11', () => {
    console.log('CommandOrControl+X222 is pressed')
  })

  if (!ret) {
    console.log('registration failed alt tab')
  }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered('CommandOrControl+X'))
})
  app.on('blur',()=>console.log("sssss"))
app.on('will-quit', () => {
  // Unregister a shortcut.
  globalShortcut.unregister('CommandOrControl+X')

  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})


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
