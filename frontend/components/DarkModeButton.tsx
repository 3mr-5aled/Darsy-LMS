import React, { useEffect, useState } from "react"
import { BsFillSunFill, BsMoonFill } from "react-icons/bs"
import "@/app/globals.css" // Import the CSS file for styling

const DarkModeButton = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    setIsDarkMode(savedTheme === "dark")
  }, [])

  const toggleDarkMode = () => {
    const theme = isDarkMode ? "mytheme" : "dark"
    setIsDarkMode(!isDarkMode)
    localStorage.setItem("theme", theme)
    document.documentElement.setAttribute("data-theme", theme)
  }

  return (
    <label className={`swap swap-rotate ${isDarkMode ? "dark" : ""}`}>
      <button onClick={toggleDarkMode}>
        {/* sun icon */}
        <div className={`swap-on text-gray-500 ${isDarkMode ? "hidden" : ""}`}>
          <BsFillSunFill />
        </div>
        {/* moon icon */}
        <div className={`swap-off ${isDarkMode ? "" : "hidden"}`}>
          <BsMoonFill />
        </div>
      </button>
    </label>
  )
}

export default DarkModeButton
