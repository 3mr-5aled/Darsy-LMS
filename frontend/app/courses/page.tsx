"use client"
import { useState, useEffect } from "react"
import useCourses from "@/lib/FetchCourses"
import Loading from "../loading"
import { CourseType } from "@/common.types"
import { useRouter } from "next/navigation"
import NotFoundComponent from "@/components/NotFoundComponent"
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
  const getLaunchDate = (date: number) => {
    const time = new Date(date)
    return time.toLocaleString().replace(",", " ")
  }
  return (
    <DataLoading data={courses} loadingTime={10000} message="Courses Not Found">
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-hidden">
        {courses && courses.length > 0 ? (
          courses.map((item: CourseType, index: number) => (
            <div
              key={index}
              className="card w-fit mx-auto bg-base-300 p-5 shadow-xl"
            >
              <div
                onClick={() =>
                  item.isShown &&
                  router.push(`/courses/view-course/${item._id}`)
                }
                id={item._id}
              >
                <div>
                  <Image
                    className="rounded-lg"
                    src={item.courseImg.src || "/no-course-image.png"}
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
                  {item.isShown ? (
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        item.isShown
                          ? router.push(`/courses/view-course/${item._id}`)
                          : null
                      }
                    >
                      Enroll Now
                    </button>
                  ) : (
                    <p>
                      release in :{" "}
                      <span className=" font-medium text-white">
                        {getLaunchDate(item.appearenceDate)}
                      </span>
                    </p>
                  )}
                </div>
              </div>
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
