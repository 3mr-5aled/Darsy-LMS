"use client"

import Loading from "@/app/loading"
import axiosInstance from "@/axios.config"
import { CourseType } from "@/common.types"
import CourseSections from "@/components/CourseSections"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const Course = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [course, setCourse] = useState<CourseType | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { id } = useParams()
  const fetchCourse = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get(`/course/getcourse/${id}`)
      setCourse(response.data)
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

  const deleteCourse = async () => {
    try {
      if (window.confirm("Are you sure you want to delete this course?")) {
        setIsLoading(true)
        await axiosInstance.delete(`/course/deletecourse/${id}`)
        toast.success("Course deleted successfully")
        router.push("/admin/courses") // Redirect to the courses page after deletion
      }
    } catch (error: any) {
      setError(error)
      toast.error(error)
      setIsLoading(false)
    }
  }

  if (!course) {
    return <Loading />
  }

  return (
    <>
      <div className="flex flex-col m-5 bg-base-300 card p-5 ">
        <div className="flex flex-row flex-wrap gap-5">
          <img
            className="rounded-lg"
            src={course.courseImg || "https://picsum.photos/350/350"}
            alt={course.name}
            width={350}
            height={350}
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-bold my-5">{course.name}</h1>
            <p>Description: {course.description}</p>
            <p>Duration: {course.duration} hours</p>
            <p>Price: {course.price}$</p>

            <button
              className="btn btn-primary btn-outline mt-5 mb-3"
              onClick={() => router.push(`/course/${course._id}`)}
            >
              View Course
            </button>
            <button
              className="btn btn-error btn-outline mb-5 mt-3"
              onClick={deleteCourse}
            >
              Delete course
            </button>
          </div>
        </div>
        <CourseSections
          courseId={course._id}
          sections={course.sections}
          isAdmin={true}
        />
      </div>
    </>
  )
}

export default Course
