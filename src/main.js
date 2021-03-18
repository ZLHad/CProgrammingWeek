const { app, BrowserWindow } = require('electron');
const electron = require('electron');
// 引入node的 path 和url模块
const path = require('path');
const url = require('url');
// 获取在 package.json 中的命令脚本传入的参数，来判断是开发还是生产环境
const mode = process.argv[2];
const Menu = electron.Menu;
const { ipcMain } = require('electron');
function createWindow() {
    // 隐藏菜单栏
    Menu.setApplicationMenu(null);
    // 创建窗口
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    // 开发者工具
    mainWindow.webContents.openDevTools();
    // 窗口最小化、最大化、关闭
    ipcMain.on('minScreen', e => mainWindow.minimize());
    ipcMain.on('maxScreen', e => {
        if (mainWindow.isMaximized() || mainWindow.isFullScreen()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
    });
    ipcMain.on('closeScreen', e => mainWindow.close());
    // 判断是否是开发模式 
    if (mode === 'dev') {
        mainWindow.loadURL("http://localhost:3000/")
    } else {
        mainWindow.loadURL(url.format({
            // 如果是生产模式，则定位到build
            pathname: path.join(__dirname, './build/index.html'),
            protocol: 'file:',
            slashes: true
        }))
    }
}
app.whenReady().then(() => {
    createWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    })
})
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
})
