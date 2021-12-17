const electron = require('electron');
const {ipcMain, app, globalShortcut } = require('electron')
const BrowserWindow = electron.BrowserWindow;
const tasklist = require('win-tasklist');

var check = true;



const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;
app.on('ready', ()=>{
    createWindow()
  });


ipcMain.on("exam-started",(e)=>{
  tasklist().then((list)=>{
  
    Object.entries(list).forEach(item=>{
      let name = item[1].process
      if(name=='steam.exe'){
        console.log(name)
        check = false;}
    })
  
    
   
    if(check){
      e.reply("ok")
      app.once('browser-window-blur',()=>{
        console.log("Window has been force minimized Exam will be locked")
        e.reply("exam-locked")
      })
      
    
      globalShortcut.register('F11', () => {
        console.log('Fullscreen toggle has been disabled')
      })
    
    }
  }).catch((err)=>{
    console.error(err);
  });

})


function createWindow() {
  mainWindow = new BrowserWindow({width: 900, 
    height: 680, 
    focusable:true,
    webPreferences:{
      nodeIntegration:true,
      enableRemoteModule:true,
      contextIsolation: false
    }
    
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('close', (e) => {
    // Do your control here
    
        e.preventDefault();
  
  })
  mainWindow.on('alt+tab',(e)=>{
    e.preventDefault();
  })
  mainWindow.on('closed', () => mainWindow = null);
}



app.on('will-quit', () => {
  // Unregister a shortcut.
  globalShortcut.unregister('CommandOrControl+X')

  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
  console.log("sdsds")
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
