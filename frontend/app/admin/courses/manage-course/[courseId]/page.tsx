"use client"

import Loading from "@/app/loading"
import axiosInstance from "@/axios.config"
import { CourseType } from "@/common.types"
import CourseSections from "@/components/CourseSections"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import CourseStudentsPage from "./students/page"

const Course = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [course, setCourse] = useState<CourseType | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { courseId } = useParams()
  const fetchCourse = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get(`/course/get-course/${courseId}`)
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
        await axiosInstance.delete(`/course/delete-course/${courseId}`)
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
      <div className="flex flex-col p-5 m-5 bg-base-300 card ">
        <div className="flex flex-row flex-wrap gap-5">
          <img
            className="rounded-lg"
            src={course.courseImg.src || "https://picsum.photos/350/350"}
            alt={course.name}
            width={400}
            height={400}
          />
          <div className="flex flex-col justify-center">
            <h1 className="my-5 text-2xl font-bold">{course.name}</h1>
            <p>Description: {course.description}</p>
            <p>Duration: {course.duration} hours</p>
            <p>Price: {course.price}$</p>
            <p>Discount: {course.discount}%</p>
            <p>Grade: {course.grade}</p>

            <button
              className="mt-5 mb-3 btn btn-primary btn-outline"
              onClick={() => router.push(`/courses/view-course/${course._id}`)}
            >
              View Course
            </button>
            <button
              className="mt-5 mb-3 btn btn-secondary btn-outline"
              onClick={() =>
                router.push(`/admin/courses/manage-course/${course._id}/edit-course`)
              }
            >
              Edit Course
            </button>
            <button
              className="mt-3 mb-5 btn btn-error btn-outline"
              onClick={deleteCourse}
            >
              Delete course
            </button>
            <button
              className="mt-3 mb-5 btn btn-accent btn-outline"
              onClick={() =>
                router.push(
                  `/admin/courses/manage-course/${course._id}/students`
                )
              }
            >
              Manage course students
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
