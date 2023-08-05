"use client"
import Loading from "@/app/loading"
import axiosInstance from "@/axios.config"
import { LessonType } from "@/common.types"
import LessonForm from "@/components/LessonForm"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"

const EditLesson = () => {
  const { courseId, sectionId, lessonId } = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [lesson, setLesson] = useState<LessonType | null>(null)

  const fetchLesson = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get(`/lesson/get-lesson/${lessonId}`)
      setLesson(response.data.lesson)

      setIsLoading(false)
    } catch (error: any) {
      toast.error(error.message)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLesson()
  }, [])

  if (!lesson) {
    return <Loading />
  }

  return (
    <LessonForm
      PageTitle="Edit Lesson"
      type="edit"
      lesson={lesson}
      sectionId={sectionId as string}
      courseId={courseId as string}
    />
  )
}

export default EditLesson
