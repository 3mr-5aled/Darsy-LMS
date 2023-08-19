"use client"
import { useEffect, useState } from "react"
import axiosInstance from "@/axios.config"
import { toast } from "react-toastify"
import { useParams, useRouter } from "next/navigation"
import Loading from "@/app/loading"
import ExamResults from "@/components/course/quizes/ExamResults"
const ExamResult = () => {
  const { id } = useParams()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
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
    <>
      <ExamResults />
    </>
  )
}

export default ExamResult
