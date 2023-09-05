const electron = require("electron")
const { app, BrowserWindow, Menu } = electron
const path = require("path")

let mainWindow
let splash

app.on("ready", () => {
  // Create the main window
  mainWindow = new BrowserWindow({
    show: false,
    width: 1080,
    height: 700,
    webPreferences: {
      contentProtection: true,
    },
    icon: path.join(__dirname, "/images/app-icon.ico"),
  })
  // Create an empty menu and set it as the application menu
  const emptyMenu = Menu.buildFromTemplate([])
  Menu.setApplicationMenu(emptyMenu)

  mainWindow.loadURL("https://darsy-lms-beta.vercel.app/")

  splash = new BrowserWindow({
    width: 500,
    height: 300,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    icon: path.join(__dirname, "/images/app-icon.ico"),
  })

  splash.loadFile("loading.html")
  splash.center()
  setTimeout(function () {
    splash.close()
    mainWindow.center()
    mainWindow.show()
  }, 5000)

  mainWindow.on("closed", () => {
    mainWindow = null
  })
})

app.on(
  "certificate-error",
  (event, webContents, url, error, certificate, callback) => {
    // Ignore certificate errors for a specific URL or host in development
    if (url.startsWith("https://darsy-lms-beta.vercel.app/")) {
      event.preventDefault()
      callback(true)
    } else {
      callback(false)
    }
  }
)
