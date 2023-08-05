import React, { useState, useEffect } from "react"
import Loading from "@/app/loading"

interface DataLoadingProps {
  data: any // Data to be checked for existence
  loadingTime: number
  message: string
  children: React.ReactNode // Add children prop of type React.ReactNode
}
const DataLoading: React.FC<DataLoadingProps> = ({
  data,
  loadingTime,
  message,
  children,
}) => {
  const [showNotFound, setShowNotFound] = useState(false)

  useEffect(() => {
    // Show "Data not found" after the specified loading time if data is not available
    const timer = setTimeout(() => {
      if (!data) {
        setShowNotFound(true)
      }
    }, loadingTime)

    return () => clearTimeout(timer) // Cleanup the timer on unmount
  }, [data, loadingTime])

  if (!data) {
    if (!showNotFound) {
      return <Loading />
    } else {
      return <p className=" mx-auto my-6  text-center">{message}</p>
    }
  }

  // Render the component content if data is available
  return <>{children}</>
}

export default DataLoading
