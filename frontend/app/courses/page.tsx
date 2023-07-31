"use client"
import { useState, useEffect } from "react"
import useCourses from "@/lib/FetchCourses"
import Loading from "../loading"
import { CourseType } from "@/common.types"
import Link from "next/link"
import { useRouter } from "next/navigation"
import NotFoundComponent from "@/components/NotFoundComponent"
import { useUserContext } from "@/contexts/userContext"
import DataLoading from "@/components/DataLoading"
import Image from "next/image"

const Courses = () => {
  const [courses, isLoading, error] = useCourses()
  const router = useRouter()

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <NotFoundComponent message="Error loading courses." />
  }

  return (
    <DataLoading data={courses} loadingTime={10000} message="Courses Not Found">
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-hidden">
        {courses && courses.length > 0 ? (
          courses.map((item: CourseType, index: number) => (
            <div key={index} className="card bg-base-300 p-5">
              <Link href={`/courses/view-course/${item._id}`}>
                <div>
                  <Image
                    className="rounded-lg"
                    src={item.courseImg}
                    alt={item.name}
                    width={350}
                    height={350}
                  />
                </div>
                <div className="flex flex-col gap-3 my-3">
                  <h3 className="text-2xl font-bold">{item.name}</h3>
                  <div className="flex flex-row gap-5 justify-between mx-1">
                    <span className="block">{item.price}$</span>
                    <span className="block">{item.duration}h</span>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      router.push(`/courses/view-course/${item._id}`)
                    }
                  >
                    Enroll Now
                  </button>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div>No courses found.</div>
        )}
      </div>
    </DataLoading>
  )
}

export default Courses
