"use client"
import { useEffect, useState } from "react"
import axiosInstance from "@/axios.config"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useParams, useRouter } from "next/navigation"
import Loading from "@/app/loading"
import ExamResults from "@/components/course/quizes/ExamResults"
import LearnPageAppMenu from "@/components/learn/LearnPageAppMenu"
import LearnPageSideDrawer from "@/components/learn/LearnPageSideDrawer"
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
      <LearnPageAppMenu />
      <div className="z-50 drawer lg:drawer-open">
        <input
          title="drawer-toggle"
          id="my-drawer-2"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="flex flex-col items-center drawer-content">
          <ExamResults />
        </div>

        <div className="drawer-side">
          <LearnPageSideDrawer />
        </div>
      </div>
    </>
  )
}

export default ExamResult
