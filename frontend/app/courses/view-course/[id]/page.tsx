import CourseView from "@/components/course/CourseView"
import { baseUrl } from "@/constant"
import { Metadata } from "next"

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id

  // fetch data
  const course = await fetch(baseUrl + `/course/get-course/${id}`).then((res) =>
    res.json()
  )
  return {
    title: course.name,
  }
}

export default function CoursePage() {
  return <CourseView />
}
