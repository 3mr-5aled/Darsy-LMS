import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"

interface TimerProps {
  initialTime: number
  onTimeout: () => void
}

const Timer: React.FC<TimerProps> = ({ initialTime, onTimeout }) => {
  const [time, setTime] = useState<number>(initialTime)

  useEffect(() => {
    if (time === 0) {
      onTimeout()
    } else if (time === 300) {
      toast.warning("Warning: Only 5 minutes remaining")
    } else if (time === 600) {
      toast.warning("Warning: Only 10 minutes remaining")
    }
    const timerInterval = setTimeout(() => {
      if (time === 0) {
        return
      }else{  
        setTime((prevTime) => prevTime - 1)
      }
    }, 1000)

    return () => {
      clearTimeout(timerInterval)
    }
  }, [time])

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  return <div>Time Remaining: {formatTime(time)}</div>
}

export default Timer
