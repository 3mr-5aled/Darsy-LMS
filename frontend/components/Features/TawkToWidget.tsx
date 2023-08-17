"use client"
import { useEffect } from "react"

const TawkToWidget: React.FC = () => {
  useEffect(() => {
    console.log("Adding Tawk.to script...")

    const script = document.createElement("script")
    script.async = true
    script.src = "https://embed.tawk.to/64dca6e894cf5d49dc6ab457/1h7uunv78"
    script.charset = "UTF-8"
    script.setAttribute("crossorigin", "*")
    document.getElementsByTagName("head")[0].appendChild(script)

    return () => {
      console.log("Removing Tawk.to script...")
      document.getElementsByTagName("head")[0].removeChild(script)
    }
  }, [])

  return null
}

export default TawkToWidget
