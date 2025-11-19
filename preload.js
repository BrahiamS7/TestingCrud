// preload.js
import { contextBridge } from "electron";

// Puedes exponer funciones, React ya tendrá window.myApp env
contextBridge.exposeInMainWorld("electronAPI", {
  showMessage: (msg) => alert(msg),
});