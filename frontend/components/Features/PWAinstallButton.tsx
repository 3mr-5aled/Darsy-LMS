"use client"
import React, { useState, useEffect } from "react"
import { BsArrowDownCircleFill } from "react-icons/bs"

interface PWAInstallButtonProps {}

const PWAInstallButton: React.FC<PWAInstallButtonProps> = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)
  const [isAppInstalled, setIsAppInstalled] = useState(false)
  const [isButtonClicked, setIsButtonClicked] = useState(false)

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the browser's default install prompt
      e.preventDefault()

      // Stash the event so it can be triggered later.
      setDeferredPrompt(e)
    })
  }, [])

  useEffect(() => {
    // Check if the app is already installed
    window.addEventListener("appinstalled", () => {
      setIsAppInstalled(true)
    })

    // Check if the user previously dismissed the prompt
    const isDismissed = localStorage.getItem("pwaInstallDismissed")
    if (isDismissed) {
      setIsAppInstalled(true)
    }
  }, [])

  const handleInstallClick = () => {
    if (!isAppInstalled) {
      if (deferredPrompt) {
        // Show the install prompt
        const deferredPrompt1 = deferredPrompt as any
        deferredPrompt1.prompt()

        // Wait for the user to respond to the prompt
        // @ts-ignore
        deferredPrompt.userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the PWA installation")
          } else {
            console.log("User declined the PWA installation")
          }

          // Clear the deferred prompt
          setDeferredPrompt(null)

          // Mark the prompt as dismissed
          localStorage.setItem("pwaInstallDismissed", "true")

          // Hide the button
          setIsAppInstalled(true)

          // Mark the button as clicked
          setIsButtonClicked(true)
        })
      }
    }
  }

  // Don't show the button if the app is already installed or the button is clicked
  if (isAppInstalled || isButtonClicked) {
    return null
  }

  return (
    <button
      onClick={handleInstallClick}
      className="btn btn-primary flex flex-row gap-3 items-center"
    >
      <BsArrowDownCircleFill />
      <span>Install App</span>
    </button>
  )
}

export default PWAInstallButton
