"use client"
import { useEffect, useState } from "react"
import axiosInstance from "@/axios.config"
import { toast } from "react-toastify"
import { useParams } from "next/navigation"
import Loading from "@/app/loading"
const ExamResults = () => {
  const { id } = useParams()
  const [exam, setExam] = useState<any[] | null>(null)
  const [data, setData] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  useEffect(() => {
    // Fetch quiz questions from the API based on the id
    const fetchQuizQuestions = async () => {
      try {
        const response = await axiosInstance.get(`/exam/${id}/get-exam-results`)
        setData(response.data)
        setExam(response.data.examAnswer)
        console.log(response.data)
        console.log(response.data.examAnswer)
        setIsLoading(false)
      } catch (error: any) {
        setIsLoading(false)
        toast.error("Error fetching quiz results.")
      }
    }

    fetchQuizQuestions()
  }, [id])
  if (isLoading) {
    return <Loading />
  }

  return (
    <div className=" p-10 container mx-auto">
      <h1 className="mb-4 mt-4 underline text-4xl font-semibold text-center">
        Quiz Result
      </h1>
      <h3
        className={`${
          parseInt(data?.degree) > 50 ? "text-success" : " text-error"
        } mb-4 mt-4  text-xl text-center`}
      >
        {" "}
        your degree : {data?.degree}%
      </h3>
      {exam?.map((q, questionIndex) => (
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
            <label className="font-semibold">Answers</label>
            <div className="flex flex-col gap-3">
              {q.answers.map((answer: any, answerIndex: number) => (
                <div
                  key={answerIndex}
                  className={`flex flex-row gap-3 items-center card p-5 ${
                    q.selectedAnswer.includes(answer.text) &&
                    q.correctAnswer.includes(answer.text)
                      ? "border-2 border-success"
                      : q.selectedAnswer.includes(answer.text) &&
                        !q.correctAnswer.includes(answer.text)
                      ? "border-2 border-error"
                      : !q.selectedAnswer.includes(answer.text) &&
                        q.correctAnswer.includes(answer.text)
                      ? "border-2 border-success"
                      : "border-2" // Default border
                  }`}
                >
                  {q.isCheckBoxQuiz ? (
                    <input
                      title="answer"
                      type="checkbox"
                      className={`disabled:cursor-default disabled:opacity-100 checkbox ${
                        q.selectedAnswer.includes(answer.text) &&
                        q.correctAnswer.includes(answer.text)
                          ? " checkbox-success"
                          : q.selectedAnswer.includes(answer.text) &&
                            !q.correctAnswer.includes(answer.text)
                          ? " checkbox-error"
                          : !q.selectedAnswer.includes(answer.text) &&
                            q.correctAnswer.includes(answer.text) &&
                            " checkbox-warning"
                      }`}
                      checked={q.selectedAnswer.includes(answer.text)}
                      disabled={true}
                    />
                  ) : (
                    <input
                      title="answer"
                      type="radio"
                      className={`disabled:cursor-default disabled:opacity-100 radio ${
                        q.selectedAnswer.includes(answer.text) &&
                        q.correctAnswer.includes(answer.text)
                          ? " radio-success"
                          : q.selectedAnswer.includes(answer.text) &&
                            !q.correctAnswer.includes(answer.text)
                          ? " radio-error"
                          : !q.selectedAnswer.includes(answer.text) &&
                            q.correctAnswer.includes(answer.text) &&
                            " radio-warning"
                      }`}
                      name={`correctAnswer-${questionIndex}`}
                      value={answerIndex}
                      checked={q.selectedAnswer.includes(answer.text)}
                      disabled={true}
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
    </div>
  )
}

export default ExamResults
