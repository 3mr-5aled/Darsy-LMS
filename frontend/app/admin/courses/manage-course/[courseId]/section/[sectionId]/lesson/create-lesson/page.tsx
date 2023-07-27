"use client"
import LessonForm from "@/components/LessonForm"
import { useParams } from "next/navigation"

type ParamType = {
  courseId: string
  sectionId: string
}

const CreateLesson = () => {
  const { courseId, sectionId } = useParams<ParamType>()

  return (
    <LessonForm
      PageTitle="Add Lesson"
      sectionId={sectionId}
      courseId={courseId}
      type="create"
    />
  )
}

export default CreateLesson
