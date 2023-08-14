"use client"
import Loading from "@/app/loading"
import axiosInstance from "@/axios.config"
import { Question } from "@/common.types"
import QuizForm from "@/components/Forms/QuizForm"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"

const EditLesson = () => {
  const { courseId, sectionId, lessonId } = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [exam, setExam] = useState<Question[] | null>(null)

  const fetchLesson = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get(`/lesson/get-lesson/${lessonId}`)
      setExam(response.data.lesson.exams)
      console.log(response.data.lesson.exams)

      setIsLoading(false)
    } catch (error: any) {
      toast.error(error.message)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLesson()
  }, [])

  if (!exam) {
    return <Loading />
  }

  return (
    <QuizForm
      courseId={courseId as string}
      sectionId={sectionId as string}
      lessonId={lessonId as string}
      exam={exam}
      type="edit"
    />
  )
}

export default EditLesson
