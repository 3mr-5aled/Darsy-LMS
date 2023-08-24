"use client"
import React, { useEffect, useState } from "react"
import axiosInstance from "@/axios.config"
import Link from "next/link"
import Image from "next/image"
import NotFoundComponent from "@/components/Features/NotFoundComponent"
import { useRouter } from "next/navigation"
import { useUserContext } from "@/contexts/userContext"

const MyCourses = () => {
  const { state } = useUserContext()
  const { user } = state
  const router = useRouter()

  if (!user) {
    return <NotFoundComponent message="you are not enrolled in courses" />
  }

  const handleContinueCourse = async (courseId: string) => {
    try {
      const response = await axiosInstance.get(
        `/lesson/${courseId}/continue-lesson`
      )
      router.push(`/app/lesson/${response.data.nextLesson}`)
    } catch (error) {}
  }

  return (
    <div className="h-full w-full flexCenter flex-col bg-base-300 card">
      <h1 className="text-2xl font-bold py-5">My Courses</h1>
      <div className="p-5 pt-0 card bg-base-300 min-w-1/2">
        {user.enrolledCourse.length > 0 ? (
          <ul className="list-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {user.enrolledCourse.map((course) => (
              <li key={course.courseId}>
                <button
                  className=" p-5 card min-h-80 bg-base-100 my-5 hover:bg-base-200"
                  onClick={() => handleContinueCourse(course.courseId)}
                >
                  <Image
                    className="rounded-md"
                    src={course.courseImg || "/images/no-course-image.png"}
                    alt={course.name}
                    width={250}
                    height={250}
                  />
                  <p className="mt-3">
                    <strong>{course.name}</strong> - <strong>Progress</strong> :{" "}
                    {course.lessonsDone.length}/{course.lessonTotal}
                  </p>
                  <div className="my-3 w-full rounded-full h-2.5 bg-base-content">
                    <div
                      className="bg-secondary h-2.5 rounded-full"
                      style={{
                        width: `${
                          (course.lessonsDone.length / course.lessonTotal) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center">
            <NotFoundComponent message="You have not enrolled in any courses yet." />
            <Link href="/courses">
              <button className="btn btn-primary">Browse Courses</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyCourses
