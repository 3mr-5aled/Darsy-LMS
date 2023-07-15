import React, { useEffect, useState } from "react"
import { BsFillSunFill, BsMoonFill } from "react-icons/bs"
import "@/app/globals.css" // Import the CSS file for styling

const DarkModeButton = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setIsDarkMode(true)
      document.documentElement.setAttribute("data-theme", "dark")
    } else {
      setIsDarkMode(false)
      document.documentElement.setAttribute("data-theme", "mytheme")
    }
  }, [])

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? "mytheme" : "dark"
    setIsDarkMode(!isDarkMode)
    localStorage.setItem("theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  return (
    <label className={`swap swap-rotate ${isDarkMode ? "switch" : ""}`}>
      <button onClick={toggleDarkMode}>
        {/* sun icon */}
        <div className={`${isDarkMode ? "hidden" : "block"}`}>
          <BsFillSunFill size={20} />
        </div>
        {/* moon icon */}
        <div className={`${isDarkMode ? "block" : "hidden"}`}>
          <BsMoonFill size={20} />
        </div>
      </button>
    </label>
  )
}

export default DarkModeButton
