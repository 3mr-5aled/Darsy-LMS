"use client"
import QuizForm from "@/components/QuizForm"
import { useParams } from "next/navigation"

const CreateQuiz = () => {
  const { courseId, sectionId, lessonId } = useParams()

  return (
    <QuizForm
      lessonId={lessonId as string}
      courseId={courseId as string}
      sectionId={sectionId as string}
      type="create"
    />
  )
}

export default CreateQuiz
