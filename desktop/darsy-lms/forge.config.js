module.exports = {
  packagerConfig: {
    asar: true,
    icon: "/images/icon",
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        // iconUrl: "https://darsy-lms-beta.vercel.app/images/logo.svg",
        // The ICO file to use as the icon for the generated Setup.exe
        // setupIcon: "/images/app-icon.ico",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          icon: "/images/icon.png",
        },
      },
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {
        icon: "/images/icon.png",
      },
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
  ],
}
