"use client"
import React, { useEffect, useState } from "react"
import Loading from "@/app/loading"
import axiosInstance from "@/axios.config"
import { UserType } from "@/common.types"
import Link from "next/link"
import Image from "next/image"
import NotFoundComponent from "@/components/NotFoundComponent"
import NoSSRWrapper from "@/components/NoSSRWrapper"
import { useRouter } from "next/navigation"

const MyCoursesPage = () => {
  const [user, setUser] = useState<UserType | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/auth/profile`) // Replace with the actual API endpoint to get the user data
        setUser(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUserData()
  }, [])

  if (!user) {
    return <Loading />
  }

  const handleContinueCourse = async (courseId: string) => {
    try {
      const response = await axiosInstance.get(
        `/lesson/${courseId}/continue-lesson`
      )
      router.push(`/learn/lesson/${response.data.nextLesson}`)
      // Replace with the actual API endpoint to get the user data
    } catch (error) {}
  }

  return (
    <NoSSRWrapper>
      <div className="h-full w-full flexCenter flex-col m-5">
        <div className="p-5 card bg-base-300 min-w-1/2">
          <h1 className="text-2xl font-bold py-2">My Courses</h1>
          <h2 className="text-lg font-bold py-2">Your Enrolled Courses:</h2>
          {user.enrolledCourse.length > 0 ? (
            <ul className="list-none">
              {user.enrolledCourse.map((course) => (
                <li key={course.courseId}>
                  <button
                    className=" p-5 card flexCenter bg-base-100 hover:bg-base-200"
                    onClick={() => handleContinueCourse(course.courseId)}
                  >
                    <Image
                      className="rounded-md"
                      src={course.courseImg}
                      alt={course.name}
                      width={150}
                      height={150}
                    />
                    <p className="mt-3">
                      <strong>{course.name}</strong> - <strong>Progress</strong>{" "}
                      : {course.lessonsDone.length}/{course.lessonTotal}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <NotFoundComponent message="You have not enrolled in any courses yet." />
              <Link href="/courses">
                <button className="btn btn-primary">Browse Courses</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </NoSSRWrapper>
  )
}

export default MyCoursesPage
