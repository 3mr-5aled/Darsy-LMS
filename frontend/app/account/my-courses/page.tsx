"use client"
import React, { useEffect, useState } from "react"
import Loading from "@/app/loading"
import axiosInstance from "@/axios.config"
import { UserType } from "@/common.types"
import Link from "next/link"
import Image from "next/image"

const MyCoursesPage = () => {
  const [user, setUser] = useState<UserType | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/auth/profile`) // Replace with the actual API endpoint to get the user data
        setUser(response.data)
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUserData()
  }, [])

  if (!user) {
    return <Loading />
  }

  return (
    <div className="h-[calc(100vh-250px)] w-full flexCenter flex-col">
      <div className="p-5 prose card bg-base-300 min-w-1/2">
        <h1>My Courses</h1>
        <h2>Your Enrolled Courses:</h2>
        {user.enrolledCourse.length > 0 ? (
          <ul>
            {user.enrolledCourse.map((course) => (
              <li key={course.courseId}>
                <Link href={`/courses/view-course/${course.courseId}`}>
                  <Image src={course.courseImg} alt={course.name} />
                  <strong>{course.name}</strong> - Duration: {course.duration}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <p>You have not enrolled in any courses yet.</p>
            <Link href="/courses">
              <button className="btn btn-primary">Browse Courses</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyCoursesPage
