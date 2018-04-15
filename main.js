const electron = require ('electron')
const {app, BrowserWindow} = electron
const { ipcMain } = require('electron');

const path = require("path")
const url = require("url")

let ventanaPresentacion
let ventanaControles

function getPantallaPresentacion() {
        let electronScreen = electron.screen;
        let pantallas = electronScreen.getAllDisplays();
        let pantallaExterna = null;
        for (var i in pantallas) {
          if (pantallas[i].bounds.x != 0 || pantallas[i].bounds.y != 0) {
            pantallaExterna = pantallas[i];
          }
        }
        return pantallaExterna;
}

function configurarVentanaPresentacion(pantallaExterna) {
        let ventanaPresentacion = new BrowserWindow ( {
                x: pantallaExterna.bounds.x + 50,
                y: pantallaExterna.bounds.y + 50,
                width: 800,
                height: 800,
                show: false
        } )
        ventanaPresentacion.loadURL(url.format({
                pathname: path.join(__dirname, 'index.html'),
                protocol: 'file',
                slashes: true
        }))
        ventanaPresentacion.setFullScreen(true)
        ventanaPresentacion.setMenu(null)
        return ventanaPresentacion
}

function cargarVentanaPresentacion() {
        let pantallaExterna = getPantallaPresentacion()
        ventanaPresentacion = configurarVentanaPresentacion(pantallaExterna)
        crearVentanaControles()
}

exports.mostrar = () => {
        ventanaPresentacion.show()
}

exports.openWindow = () => {
        ventanaControles = new BrowserWindow ( { width: 400, height: 600} )
        ventanaControles.loadURL(url.format({
                pathname: path.join(__dirname, 'controles.html'),
                protocol: 'file',
                slashes: true
        }))

        ipcMain.on('request-update-canvas-video', (event, arg) => {
                // Request to update the label in the renderer process of the second window
                secondWindow.webContents.send('action-update-canvas-video', arg);
            });

}

function crearVentanaControles() {
        ventanaControles = new BrowserWindow ( { width: 400, height: 600} )
        ventanaControles.loadURL(url.format({
                pathname: path.join(__dirname, 'controles.html'),
                protocol: 'file',
                slashes: true
        }))

        ipcMain.on('request-update-canvas-video', (event, arg) => {
                // Request to update the label in the renderer process of the second window
                ventanaPresentacion.webContents.send('action-update-canvas-video', arg);
            });
}

app.on('ready', cargarVentanaPresentacion)

//https://codepen.io/caraya/pen/JbsGe
//https://ourcodeworld.com/articles/read/536/how-to-send-information-from-one-window-to-another-in-electron-framework
