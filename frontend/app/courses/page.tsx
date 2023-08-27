import CoursesList from "@/components/course/CoursesList"
import { Owner } from "@/constant"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `Courses - ${Owner.WebsiteDetails.name}`,
}

const Course = () => {
  return <CoursesList />
}

export default Course
