"use client"
import LessonForm from "@/components/LessonForm"
import { useParams } from "next/navigation"

type ParamType = {
  courseId: string
  sectionId: string
}

const CreateLesson = () => {
  const { courseId, sectionId } = useParams() as ParamType
  return (
    <LessonForm
      PageTitle="Add Lesson"
      sectionId={sectionId as string}
      courseId={courseId as string}
      type="create"
    />
  )
}

export default CreateLesson
