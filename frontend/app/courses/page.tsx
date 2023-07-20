"use client"
import { useEffect } from "react"
import useCourses from "@/lib/FetchCourses"
import Loading from "../loading"
import { CourseType } from "@/common.types"
import Link from "next/link"
import { useRouter } from "next/navigation"
import NotFoundComponent from "@/components/NotFoundComponent"

const Courses = () => {
  const [courses, isLoading, error] = useCourses()
  const router = useRouter()

  useEffect(() => {
    if (error) {
      console.log("Error fetching courses:", error)
    }
  }, [error])

  if (isLoading) {
    return <Loading />
  }

  if (!courses || !Array.isArray(courses)) {
    return <NotFoundComponent message="No Courses available" />
  }

  return (
    <div className="m-5 grid grid-flow-col md:grid-cols-4 gap-5 overflow-x-hidden">
      {courses.map((item: CourseType, index: number) => (
        <div key={index} className="card bg-base-300 p-5">
          <Link href={`/course/${item._id}`}>
            <div>
              <img
                className="rounded-lg"
                src={item.courseImg || "https://picsum.photos/350/350"}
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
                onClick={() => router.push(`/course/${item._id}`)}
              >
                Enroll Now
              </button>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Courses
