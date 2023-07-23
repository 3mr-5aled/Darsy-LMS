"use client"

import Loading from "@/app/loading"
import axiosInstance from "@/axios.config"
import { CourseType } from "@/common.types"
import CourseSections from "@/components/CourseSections"
import { useUserContext } from "@/contexts/userContext"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const Course = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [course, setCourse] = useState<CourseType | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { state, setUser, clearUser } = useUserContext()
  const { user } = state

  const { id } = useParams()
  const fetchCourse = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get(`/course/get-course/${id}`)
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

  if (!course) {
    return <Loading />
  }

  const handleEnrollCourse = async () => {
    try {
      if (!user) {
        // User is not logged in, navigate to the login page
        router.push("/login")
        return
      }
      if (course.price === 0) {
        // Course price is 0, add the course to the user
        const response = await axiosInstance.put(
          `/user/add-course-to-user/${user?._id}`,
          {
            courseId: course._id,
            amount: 0,
          }
        )
        // const { order } = response.data
        toast.success("Course enrolled successfully")
        // Navigate to the Learn page passing the courseId as a query parameter
        router.push(`/account/my-courses`)
      } else if (
        !user?.enrolledCourse.some(
          (enrolledCourse) => enrolledCourse.courseId === course._id
        )
      ) {
        // Course has a price and the user is not enrolled, call payment API
        // You should replace the payment API endpoint below with your actual endpoint
        const paymentResponse = await axiosInstance.post("/payment/pay", {
          courseId: course._id,
          // amount: course.price,
        })
        // Handle the payment response and navigation accordingly
        // For example, you can redirect to the payment gateway or show a payment form
      } else {
        // User is already enrolled in the course
        // Redirect to the course learning page
        router.push(`/courses/view-course/${course._id}`)
      }
    } catch (error) {
      console.error(error)
      // Handle errors if necessary
    }
  }

  return (
    <div className="flex flex-col p-5 m-5 bg-base-300 card ">
      <div className="flex flex-row flex-wrap gap-5">
        {course.courseImg ? (
          <Image
            className="rounded-lg"
            src={course.courseImg}
            alt={course.name}
            width={350}
            height={350}
          />
        ) : (
          <div
            className="rounded-lg bg-gray-300"
            style={{ width: "350px", height: "350px" }}
          >
            Course Image
          </div>
        )}
        <div className="flex flex-col justify-center">
          <h1 className="my-5 text-2xl font-bold">{course.name}</h1>
          <p>Description: {course.description}</p>
          <p>Duration: {course.duration} hours</p>
          <p>Price: {course.price}$</p>
          {user?.enrolledCourse.some(
            (enrolledCourse) => enrolledCourse.courseId === course._id
          ) ? (
            <button
              className="my-5 btn btn-primary"
              onClick={() =>
                router.push(`/learn/lesson/${course.sections?.[0]?.lessons[0]}`)
              }
            >
              Continue Learning
            </button>
          ) : (
            <button
              className="my-5 btn btn-primary"
              onClick={handleEnrollCourse}
            >
              Enroll Now
            </button>
          )}
        </div>
      </div>
      <CourseSections
        courseId={course._id}
        sections={course.sections}
        isAdmin={false}
      />
    </div>
  )
}

export default Course
