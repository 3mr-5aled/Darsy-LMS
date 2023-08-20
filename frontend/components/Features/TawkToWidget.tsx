"use client"
import { usePathname } from "next/navigation"
import React, { useEffect } from "react"

const TawkToWidget: React.FC = () => {
  const pathname = usePathname()
  useEffect(() => {
    console.log("Adding Tawk.to script...")

    const script = document.createElement("script")
    script.async = true
    script.src = "https://embed.tawk.to/64dca6e894cf5d49dc6ab457/1h7uunv78"
    script.charset = "UTF-8"
    script.setAttribute("crossorigin", "*")
    document.getElementsByTagName("head")[0].appendChild(script)

    const configScript = document.createElement("script")
    configScript.async = true
    if (pathname.includes("/app")) {
      configScript.textContent = `
        var Tawk_API = Tawk_API || {};
        Tawk_API.customStyle = {
          visibility: {
            desktop: {
              position: "br",
              xOffset: "20px",
              yOffset: 20,
            },
            mobile: {
              position: "br",
              xOffset: "20px",
              yOffset: "70px",
            },
            bubble: {
              rotate: "0deg",
              xOffset: 0,
              yOffset: "60px",
            },
          },
        };
      `
    } else {
      configScript.textContent = `
        var Tawk_API = Tawk_API || {};
        Tawk_API.customStyle = {
          visibility: {
            desktop: {
              position: "br",
              xOffset: "20px",
              yOffset: 20,
            },
            mobile: {
              position: "br",
              xOffset: "20px",
              yOffset: "20px",
            },
            bubble: {
              rotate: "0deg",
              xOffset: 0,
              yOffset: "60px",
            },
          },
        };
      `
    }
    document.getElementsByTagName("head")[0].appendChild(configScript)

    return () => {
      console.log("Removing Tawk.to script...")
      document.getElementsByTagName("head")[0].removeChild(script)
      document.getElementsByTagName("head")[0].removeChild(configScript)
    }
  }, [pathname])

  return null
}

export default TawkToWidget
