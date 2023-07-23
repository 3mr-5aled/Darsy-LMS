"use client"
import { useEffect } from "react"
import useCourses from "@/lib/FetchCourses"
import Loading from "@/app/loading"
import { CourseType } from "@/common.types"
import Link from "next/link"
import { useRouter } from "next/navigation"
import NotFoundComponent from "@/components/NotFoundComponent"

const CoursesAdminView = () => {
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

  if (!Array.isArray(courses) || courses.length === 0) {
    return <NotFoundComponent message="No Courses available" />
  }

  return (
    <div className="grid grid-flow-col gap-5 m-5 overflow-x-hidden md:grid-cols-4">
      {courses.map((item: CourseType, index: number) => (
        <div key={index} className="p-5 card bg-base-300">
          <Link href={`/admin/courses/manage-course/${item._id}`}>
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
              <div className="flex flex-row justify-between gap-5 mx-1">
                <span className="block">{item.price}$</span>
                <span className="block">{item.duration}h</span>
              </div>
              <button
                className="btn btn-primary"
                onClick={() =>
                  router.push(`/admin/courses/manage-course/${item._id}`)
                }
              >
                Manage course
              </button>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default CoursesAdminView
