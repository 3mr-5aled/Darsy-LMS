"use client"

import CourseForm from "@/components/Forms/CourseForm"
import axiosInstance from "@/axios.config"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Loading from "@/app/loading"
import { CourseType } from "@/common.types"

export default function EditCourse() {
  const { courseId } = useParams()
  const [course, setCourse] = useState<CourseType | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axiosInstance.get<CourseType>(
          `/course/get-course/${courseId}`
        )
        setCourse(response.data)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }

    fetchCourse()
  }, [courseId])

  if (isLoading) {
    return <Loading />
  }

  return <CourseForm title="Edit Course" type="edit" course={course} />
}
