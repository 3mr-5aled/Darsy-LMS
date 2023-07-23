import { useState, useEffect } from "react"
import axiosInstance from "@/axios.config"
import { toast } from "react-toastify"
import { CourseType, CoursesType } from "@/common.types"

const useCourses = (): [CoursesType | null, boolean, string | null] => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [courses, setCourses] = useState<CoursesType | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchCourse = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get("/course/get-all-courses")
      setCourses(response.data)
      setIsLoading(false)
    } catch (error: any) {
      setError(error)
      toast.error(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCourse()
  }, [])

  return [courses, isLoading, error]
}

export default useCourses
