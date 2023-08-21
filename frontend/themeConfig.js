// themeConfig.js
const {
  primaryColor: lightPrimaryColor,
  secondaryColor: lightSecondaryColor,
  accentColor: lightAccentColor,
} = require("./constant").Owner.WebsiteDetails.theme.light

const {
  primaryColor: darkPrimaryColor,
  secondaryColor: darkSecondaryColor,
  accentColor: darkAccentColor,
} = require("./constant").Owner.WebsiteDetails.theme.dark

module.exports = {
  lightPrimaryColor,
  lightSecondaryColor,
  lightAccentColor,
  darkPrimaryColor,
  darkSecondaryColor,
  darkAccentColor,
}
