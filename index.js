const remote = require("electron").remote
const main = remote.require("./main.js")
const { ipcRenderer } = require('electron');

vid = document.getElementById("my_video");      
vid.muted = true;

main.mostrar()

ipcRenderer.on('action-update-canvas-video', (event, arg) => {
        eval(arg.funcion)(arg.valor);
});

function playPause(ponerPlay){
        if(ponerPlay){
                vid.play();
        } else {
                vid.pause();
        }
}

function vidSeek(seekto){
        vid.currentTime = seekto;
}