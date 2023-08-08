import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"

interface TimerProps {
  initialTime: number
  onTimeout: () => void
}

const Timer: React.FC<TimerProps> = ({ initialTime, onTimeout }) => {
  const [time, setTime] = useState<number>(initialTime)

  useEffect(() => {
    if (time <= 0) {
      onTimeout()
    } else if (time === 300) {
      toast.warning("Warning: Only 5 minutes remaining")
    } else if (time === 600) {
      toast.warning("Warning: Only 10 minutes remaining")
    }

    const timerInterval = setInterval(() => {
      setTime((prevTime) => prevTime - 1)
    }, 1000)

    return () => {
      clearInterval(timerInterval)
    }
  }, [time, onTimeout])

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400) // 1 day = 86400 seconds
    const hours = Math.floor((seconds % 86400) / 3600) // 1 hour = 3600 seconds
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return { days, hours, minutes, secs }
  }

  const { days, hours, minutes, secs } = formatTime(time)

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      {/* <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": days } as React.CSSProperties}></span>
        </span>
        days
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": hours } as React.CSSProperties}></span>
        </span>
        hours
      </div> */}
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": minutes } as React.CSSProperties}></span>
        </span>
        min
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": secs } as React.CSSProperties}></span>
        </span>
        sec
      </div>
    </div>
  )
}

export default Timer
