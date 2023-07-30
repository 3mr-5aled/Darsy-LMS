"use client"
import QuizForm from "@/components/QuizForm"
import { useParams } from "next/navigation"

const CreateQuiz = () => {
  const { courseId, sectionId, lessonId } = useParams()

  return (
    <QuizForm
      lessonId={lessonId}
      courseId={courseId}
      sectionId={sectionId}
      type="create"
    />
  )
}

export default CreateQuiz
