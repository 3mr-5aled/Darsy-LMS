"use client"
import QuizForm from "@/components/QuizForm"
import { useParams } from "next/navigation"

type ParamType = {
  lessonId: string
}

const CreateLesson = () => {
  const { lessonId } = useParams<ParamType>()

  return <QuizForm lessonId={lessonId} />
}

export default CreateLesson
