import React, { useEffect, useState } from "react"
import Cookies from "js-cookie"

interface QuizGuardProps {
  children: React.ReactNode
  quizStarted: boolean
  timerFinished: boolean
  handleSubmit: () => void
  quizDurationMinutes: number
}

const QuizGuard: React.FC<QuizGuardProps> = ({
  children,
  quizStarted,
  timerFinished,
  handleSubmit,
  quizDurationMinutes,
}) => {
  const [blocked, setBlocked] = useState(false)
  const QUIZ_COOKIE = "quiz_running"

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    if (quizStarted && !timerFinished) {
      e.preventDefault()
      e.returnValue =
        "Are you sure you want to leave this page? Your quiz progress will be lost."
    } else if (quizStarted && timerFinished) {
      handleSubmit()
    }
  }

  const handleVisibilityChange = () => {
    if (quizStarted && !timerFinished && document.hidden) {
      setBlocked(true)
    }
  }

  useEffect(() => {
    if (quizStarted && !timerFinished) {
      const expirationMinutes = new Date(
        new Date().getTime() + quizDurationMinutes * 60000
      )

      Cookies.set(QUIZ_COOKIE, "true", {
        expires: expirationMinutes,
      })

      window.addEventListener("beforeunload", handleBeforeUnload)
      document.addEventListener("visibilitychange", handleVisibilityChange)

      return () => {
        Cookies.remove(QUIZ_COOKIE)
        window.removeEventListener("beforeunload", handleBeforeUnload)
        document.removeEventListener("visibilitychange", handleVisibilityChange)
      }
    }
  }, [quizStarted, timerFinished, quizDurationMinutes])

  useEffect(() => {
    const quizRunningInAnotherTab = Cookies.get(QUIZ_COOKIE) === "true"
    if (blocked || quizRunningInAnotherTab) {
      alert(
        "The quiz is already running in another tab or window. Please complete the quiz in one session."
      )
      window.location.reload()
    }
  }, [blocked])

  return <>{children}</>
}

export default QuizGuard
