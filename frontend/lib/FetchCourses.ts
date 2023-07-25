import { useState, useEffect } from "react"
import axiosInstance from "@/axios.config"
import { toast } from "react-toastify"
import { CourseType, CoursesType } from "@/common.types"
import { useUserContext } from "@/contexts/userContext"

const useCourses = (): [CoursesType | null, boolean, string | null] => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [courses, setCourses] = useState<CoursesType | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { state, setUser, clearUser } = useUserContext()
  const { user } = state
  const [filter, setFilter] = useState<string>("all")

  const fetchCourses = async (filter: string) => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get(
        `/course/get-all-courses/${filter}`
      )
      setCourses(response.data)
      setIsLoading(false)
    } catch (error: any) {
      setError(error)
      toast.error(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      setFilter(user.grade)
    } else {
      setFilter("all")
    }
    fetchCourses(filter)
  }, [user, filter])

  return [courses, isLoading, error]
}

export default useCourses
