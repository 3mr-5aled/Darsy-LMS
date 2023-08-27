import axiosInstance from "@/axios.config"
import { CourseType } from "@/common.types"
import { cache } from "react"

export const revalidate = 3600 // revalidate the data at most every hour

export const getCourse = cache(async (id: string) => {
  const course: CourseType = await axiosInstance.get(`/course/get-course/${id}`)
  return course
})
