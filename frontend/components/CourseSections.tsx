"use client"
import axiosInstance from "@/axios.config"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import LessonForm from "./LessonForm"

type Section = {
  _id: string
  title: string
  duration: string
}

type Props = {
  sections: Section[] | undefined
  courseId: string | undefined
  isAdmin: boolean
}

const CourseSections = ({ courseId, sections, isAdmin }: Props) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [lessons, setLessons] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  const fetchLessons = async (sectionId: string) => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get(
        `/lesson/${courseId}/${sectionId}/getalllesson`
      )
      setLessons(response.data)
      setIsLoading(false)
    } catch (error: any) {
      setError(error.message)
      toast.error(error.message)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (sections && sections.length > 0) {
      fetchLessons(sections[0]._id)
    }
  }, [sections])

  const handleSectionClick = (sectionId: string) => {
    fetchLessons(sectionId)
  }

  if (!sections || sections.length === 0) {
    return <p>There are no sections found</p>
  }

  return (
    <div>
      {sections.map((section, index) => (
        <div key={index} className="join join-vertical w-full">
          <div
            className="collapse collapse-arrow join-item border border-base-300"
            onClick={() => handleSectionClick(section._id)}
          >
            <input
              title="section title"
              type="radio"
              name="my-accordion-4"
              checked={true}
            />
            <div className="collapse-title text-xl font-medium flex flex-row justify-between">
              <p>{section.title}</p>
              <p>{section.duration} min</p>
            </div>
            <div className="collapse-content flex flex-col">
              {isAdmin && (
                <LessonForm
                  title="Add Lesson"
                  sectionId={section._id}
                  type="create"
                />
              )}
              {lessons.map((lesson) => (
                <button
                  onClick={() => router.push(`/lecture/lesson/${lesson._id}`)}
                  key={lesson._id}
                >
                  {lesson.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CourseSections
