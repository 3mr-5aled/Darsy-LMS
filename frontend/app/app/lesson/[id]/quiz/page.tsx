"use client"
import React, { useEffect, useState } from "react"
import axiosInstance from "@/axios.config"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useParams, useRouter } from "next/navigation"
import Loading from "@/app/loading"
import { useUserContext } from "@/contexts/userContext"
import Timer from "@/components/course/quizes/Timer"
import StartQuiz from "@/components/course/quizes/StartQuiz"
import QuizGuard from "@/components/course/quizes/QuizGuard" // Import the QuizGuard component

const StudentQuizPage = () => {
  const { setUser } = useUserContext()
  const { id } = useParams()
  const router = useRouter()
  const [questions, setQuestions] = useState<any[]>([])
  const [title, setTitle] = useState<string | null>(null)
  const [timer, setTimer] = useState<number>(30)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const [selectedAnswers, setSelectedAnswers] = useState<any[]>([])
  const [timerFinished, setTimerFinished] = useState<boolean>(false)
  const [quizStarted, setQuizStarted] = useState<boolean>(false)

  useEffect(() => {
    // Fetch quiz questions from the API based on the id
    if (timerFinished) {
      handleSubmit()
      return
    }
    const fetchQuizQuestions = async () => {
      try {
        const response = await axiosInstance.get(`/exam/${id}/get-exam`)
        setQuestions(response.data.exam)
        setTitle(response.data.title)
        setTimer(response.data.timer)
        // Initialize selectedAnswers array with null values for each question
        const exam = response.data.exam.map((e: any) => ({
          id: e._id,
          correctAnswer: e.correctAnswer,
          isCheckBoxQuiz: e.isCheckBoxQuiz,
          selectedAnswer: [],
        }))
        setSelectedAnswers(exam)
        setIsLoading(false)
      } catch (error: any) {
        console.log(error)
        setIsLoading(false)
        if (error.response.data.errCode === 6342) {
          setError("you have already submitted this exam")
          return
        }
        toast.error("Error fetching quiz questions.")
      }
    }

    fetchQuizQuestions()
  }, [id, timerFinished])

  if (isLoading) {
    return <Loading />
  }

  const handleAnswerChange = (
    questionIndex: number,
    answerText: string,
    isCheckBoxQuiz: Boolean,
    correctAnswer: [],
    id: string
  ) => {
    if (timerFinished) {
      return
    }
    const updatedSelectedAnswers = [...selectedAnswers]
    let selectedAnswer: string[] =
      updatedSelectedAnswers[questionIndex]?.selectedAnswer || []

    if (!isCheckBoxQuiz) {
      selectedAnswer = [answerText]
    } else {
      if (selectedAnswer.includes(answerText)) {
        selectedAnswer =
          selectedAnswer.length > 0 ? [...selectedAnswer] : [answerText]
      } else {
        if (selectedAnswer.length === correctAnswer.length) {
          selectedAnswer.splice(0, 1)
          selectedAnswer = [...selectedAnswer, answerText]
        } else {
          selectedAnswer = [...selectedAnswer, answerText]
        }
      }
    }
    updatedSelectedAnswers[questionIndex] = {
      correctAnswer,
      isCheckBoxQuiz,
      selectedAnswer,
      id,
    }
    setSelectedAnswers(updatedSelectedAnswers)
  }

  const handleSubmit = async () => {
    // Check if all questions have been answered
    console.log(timerFinished)
    let empty = false
    if (!timerFinished) {
      selectedAnswers.forEach((selectedAnswer) => {
        if (!selectedAnswer?.selectedAnswer) {
          toast.error("you must select answers for each question")
          empty = true
          return
        }
        if (
          selectedAnswers.some((selectedAnswer) =>
            selectedAnswer.isCheckBoxQuiz
              ? selectedAnswer.selectedAnswer.length < 2
              : selectedAnswer.selectedAnswer.length === 0
          )
        ) {
          toast.error("Please answer all questions before submitting.")
          empty = true
          return
        }
      })
    }
    if (empty) {
      return
    }

    console.log(selectedAnswers)
    try {
      console.log(selectedAnswers)
      // Make the POST request to the API endpoint using axiosInstance.post()
      const response = await axiosInstance.put(`/exam/${id}/submit-exam`, {
        exam: selectedAnswers,
      })

      console.log(selectedAnswers)
      // Handle the response from the API
      if (response.status === 200) {
        console.log(response.data)

        const { data } = await axiosInstance.get(`/auth/profile`)
        setUser(data)
        // Redirect the user to the exam page with the results
        router.push(`/app/lesson/${id}/exam-results`)
      } else {
        toast.error("Error submitting the quiz. Please try again.")
      }
    } catch (error: any) {
      toast.error("Error submitting the quiz. Please try again.")
      console.error(error)
    }
  }
  // commented by abdelrhman
  // if (error) {
  //   return router.push(`/app/lesson/${id}/exam-results`)
  // }

  const handleTimeout = () => {
    console.log('in');
    toast.error("Time is up! The quiz will be submitted.")
    setTimerFinished(true)
  }

  const handleStartQuiz = () => {
    setQuizStarted(true)
  }

  return (
    <div className="container p-4 mx-auto">
      {title && (
        <h1 className="mb-4 mt-4 underline text-4xl font-semibold text-center">
          {title}
        </h1>
      )}
      <QuizGuard
        quizStarted={quizStarted}
        timerFinished={timerFinished}
        handleSubmit={handleSubmit}
        quizDurationMinutes={timer}
      >
        {!quizStarted ? (
          <StartQuiz
            title={title}
            timer={timer}
            handleStartQuiz={handleStartQuiz}
          />
        ) : (
          <>
            <h1 className="mb-4 mt-4 underline text-3xl font-semibold text-center">
              Quiz
            </h1>
            <Timer initialTime={timer} onTimeout={handleTimeout} />
            {questions.map((q, questionIndex) => (
              <div key={questionIndex} className="mb-6">
                <p className="block mb-2 font-semibold">
                  Question {questionIndex + 1}: {q.question}
                </p>
                {q.questionImage && (
                  <img
                    alt={`Question ${questionIndex + 1} Image`}
                    src={q.questionImage}
                    className="max-w-md mt-2"
                  />
                )}
                <div className="divider"></div>
                <div className="mt-3 mb-4">
                  <label className="font-semibold">
                    Select {q.correctAnswer.length} Answer
                    {q.correctAnswer.length > 1 && "s"}:
                  </label>
                  <div className="flex flex-col gap-3">
                    {q.answers.map((answer: any, answerIndex: number) => (
                      <div
                        key={answerIndex}
                        className={`flex flex-row gap-3 items-center bg-base-200 ${
                          selectedAnswers[
                            questionIndex
                          ]?.selectedAnswer?.includes(answer.text)
                            ? "bg-primary text-white"
                            : "bg-base-200"
                        } card p-5`}
                      >
                        {q.isCheckBoxQuiz ? (
                          <input
                            title="Correct answer"
                            type="checkbox"
                            className="checkbox"
                            checked={selectedAnswers[
                              questionIndex
                            ]?.selectedAnswer?.includes(answer.text)}
                            onChange={() =>
                              handleAnswerChange(
                                questionIndex,
                                answer.text,
                                q.isCheckBoxQuiz,
                                q.correctAnswer,
                                q._id
                              )
                            }
                          />
                        ) : (
                          <input
                            title="Correct answer"
                            type="radio"
                            className="radio"
                            name={`correctAnswer-${questionIndex}`}
                            value={answerIndex}
                            checked={selectedAnswers[
                              questionIndex
                            ]?.selectedAnswer?.includes(answer.text)}
                            onChange={() =>
                              handleAnswerChange(
                                questionIndex,
                                answer.text,
                                q.isCheckBoxQuiz,
                                q.correctAnswer,
                                q._id
                              )
                            }
                          />
                        )}
                        <span>{answer.text}</span>
                        {answer.image && (
                          <img
                            src={answer.image}
                            alt={`Question ${questionIndex + 1} Answer ${
                              answerIndex + 1
                            } Image`}
                            className="max-w-xs rounded-md mt-2"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit Quiz
            </button>
          </>
        )}
      </QuizGuard>
    </div>
  )
}

export default StudentQuizPage
