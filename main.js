const electron = require ('electron')
const {app, BrowserWindow} = electron

const path = require("path")
const url = require("url")

let win

function createWindow() {
        var electronScreen = electron.screen;
        var displays = electronScreen.getAllDisplays();
        var externalDisplay = null;
        console.log (displays.length)
        for (var i in displays) {
          if (displays[i].bounds.x != 0 || displays[i].bounds.y != 0) {
            externalDisplay = displays[i];
            break;
          }
        }
        win = new BrowserWindow ( {
                x: externalDisplay.bounds.x + 50,
                y: externalDisplay.bounds.y + 50,
                width: 800,
                height: 800
        } )

        win.setFullScreen(true)
        win.setMenu(null)

        win.loadURL(url.format({
                pathname: path.join(__dirname, 'index.html'),
                protocol: 'file',
                slashes: true
        }))
}

exports.openWindow = () => {
        let newWin = new BrowserWindow ( { width: 400, height: 600} )
        newWin.webContents.openDevTools()
        newWin.loadURL(url.format({
                pathname: path.join(__dirname, 'controles.html'),
                protocol: 'file',
                slashes: true
        }))

}

app.on('ready', createWindow)