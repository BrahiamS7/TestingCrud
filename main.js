import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import os from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // <-- aquí
      nodeIntegration: false,    // importante
      contextIsolation: true,    // importante
    },
  });

  win.loadFile(path.join(__dirname, "frontend", "dist", "index.html"));
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  if (os.platform() !== "darwin") app.quit();
});