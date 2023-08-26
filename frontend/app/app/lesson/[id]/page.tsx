import LessonItem from "@/components/lesson/LessonItem"
import { baseUrl } from "@/constant"
import { log } from "console"
import { Metadata } from "next"

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id

  // fetch data
  const data = await fetch(baseUrl + `/lesson/get-lesson/${id}`).then((res) =>
    res.json()
  )
  console.log("data:", data)
  const lessonTitle = data?.lesson?.title
  console.log("lessonTitle:", lessonTitle)
  return {
    title: lessonTitle || "Lesson Page",
  }
}

const LessonPage = () => {
  return <LessonItem />
}

export default LessonPage
