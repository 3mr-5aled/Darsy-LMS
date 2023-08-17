"use client"
import React, { useEffect, useState } from "react"
import { BsFillSunFill, BsMoonFill } from "react-icons/bs"
import "@/app/globals.css" // Import the CSS file for styling

const DarkModeButton = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null) // Change initial state to null
  const [isLoading, setIsLoading] = useState(true) // Add isLoading state

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setIsDarkMode(true)
      document.documentElement.setAttribute("data-theme", "dark")
    } else {
      setIsDarkMode(false)
      document.documentElement.setAttribute("data-theme", "mytheme")
    }
    setIsLoading(false) // Set isLoading to false after theme is set
  }, [])

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? "mytheme" : "dark"
    setIsDarkMode(!isDarkMode)
    localStorage.setItem("theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  return (
    <label
      className={`swap swap-rotate h-fit hover:text-secondary ${
        isDarkMode === null ? "loading" : isDarkMode ? "switch" : ""
      }`}
    >
      <button onClick={toggleDarkMode} disabled={isLoading}>
        {/* loading or sun/moon icon */}
        {isLoading ? (
          <div className="animate-spin">
            <svg
              className=" md:w-6 md:h-6 text-gray-600 dark:text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v.01M12 8v.01M12 12v.01M12 16v.01M4.93 4.93l.02.02M7.76 7.76l.02.02M4.93 19.07l.02-.02M7.76 16.24l.02-.02M16.24 16.24l-.02-.02M19.07 19.07l-.02-.02M16.24 7.76l-.02.02M19.07 4.93l-.02.02"
              />
            </svg>
          </div>
        ) : (
          <>
            {/* sun icon */}
            <div className={`${isDarkMode ? "hidden" : "block"}`}>
              <BsFillSunFill size={20} />
            </div>
            {/* moon icon */}
            <div className={`${isDarkMode ? "block" : "hidden"}`}>
              <BsMoonFill size={20} />
            </div>
          </>
        )}
      </button>
    </label>
  )
}

export default DarkModeButton
