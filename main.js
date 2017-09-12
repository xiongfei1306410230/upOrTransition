const path = require('path')
const electron = require('electron')
const app = electron.app
const ipc = electron.ipcMain
const dialog = electron.dialog
const Menu = electron.Menu
const Tray = electron.Tray
console.log(Menu)
console.log(Tray)

const BrowserWindow = electron.BrowserWindow

if (process.env.NODE_ENV === 'development') {
    require('electron-reload')(__dirname)
}
let mainWindow;
let mainWindow1;
function createWindow () {
    mainWindow = new BrowserWindow({
        width: 760, 
        height: 600, 
        autoHideMenuBar:true,
        resizable:false,
        frame: false,
        webPreferences:{
        }
    })
    console.log(process.env.NODE_ENV);
    // and load the index.html of the app.
    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL(`http://localhost:3000`)
    } else {
        mainWindow.loadURL(`file://${__dirname}/index.html`)
    }
    // Open the DevTools.
    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools()
    }
    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

// 当electron启动的时候就会运行
app.on('ready', createWindow)

//当渲染页面触发了put-in-tray事件则执行下面的函数
ipc.on('put-in-tray', function (event) {
    mainWindow.hide();
    const iconName = process.platform === 'win32' ? 'assets/img/p.png' : 'assets/img/p.png'
    const iconPath = path.join(__dirname, iconName)
    mainWindow1 = new Tray(iconPath)
    const contextMenu = Menu.buildFromTemplate([{
        label: '恢复',
        click: function () {
            mainWindow.show();
            event.sender.send('tray-removed')
        }
    }])
    mainWindow1.setToolTip('在托盘中的 Electron 示例.')
    mainWindow1.setContextMenu(contextMenu)
})
//当点击恢复的时候 删除托盘里面的小图标
ipc.on('remove-tray', function () {
    mainWindow1.destroy();
})
//上传文件
ipc.on('open-file-dialog', function (event) {
    dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory']
    }, function (files) {
        if (files) event.sender.send('selected-directory', files)
    })
})




// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})

