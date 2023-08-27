"use client"
import React, { useEffect, useState } from "react"

interface Props {
  children: React.ReactElement
}

const DownloadManagerDetectionWrapper = ({ children }: Props) => {
  const [isIDMDetected, setIsIDMDetected] = useState<boolean>(false)

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase()

    // Check if the User Agent string contains keywords related to IDM or download managers
    if (
      userAgent.includes("idm") ||
      userAgent.includes("internet download manager") ||
      userAgent.includes("idman") ||
      userAgent.includes("download master") ||
      userAgent.includes("getright") ||
      userAgent.includes("fdm") || // Free Download Manager (FDM)
      userAgent.includes("free download manager") || // Free Download Manager (FDM)
      userAgent.includes("flashget") || // FlashGet
      userAgent.includes("jdownloader") || // JDownloader
      userAgent.includes("d4x") || // Downloader for X (d4x)
      userAgent.includes("downthemall") || // DownThemAll!
      userAgent.includes("wget") // GNU Wget
    ) {
      setIsIDMDetected(true)
    }
  }, [])

  return (
    <div>
      {isIDMDetected ? (
        <p>
          It appears that you are using a download manager. Please use this
          website responsibly.
        </p>
      ) : (
        children
      )}
    </div>
  )
}

export default DownloadManagerDetectionWrapper
