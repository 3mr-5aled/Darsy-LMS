"use client"
import axiosInstance from "@/axios.config"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import LessonForm from "./LessonForm"
import SectionForm from "./SectionForm"
import Link from "next/link"
import Loading from "@/app/loading"

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
  const [filteredLessons, setFilteredSections] = useState<Section[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isLessonModalOpen, setIsLessonModalOpen] = useState<boolean>(false)

  useEffect(() => {
    if (sections) {
      setFilteredSections(sections)
    }
  }, [sections])

  const fetchLessons = async (sectionId: string) => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.get(
        `/lesson/${sectionId}/getalllesson`
      )
      setLessons(response.data)
      setIsLoading(false)
    } catch (error: any) {
      setError(error.message)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (filteredLessons.length > 0) {
      fetchLessons(filteredLessons[0]._id)
    }
  }, [filteredLessons])

  const handleSectionClick = (sectionId: string) => {
    fetchLessons(sectionId)
  }

  const deleteSection = async (sectionId: string) => {
    try {
      if (window.confirm("Are you sure you want to delete this course?")) {
        setIsLoading(true)
        await axiosInstance.delete(
          `/section/${courseId}/deletesection/${sectionId}`
        )
        toast.success("Section Deleted")
        setIsLoading(false)
        const updatedSections = filteredLessons.filter(
          (section) => section._id !== sectionId
        )
        setFilteredSections(updatedSections)
      }
    } catch (error: any) {
      setError(error.message)
      setIsLoading(false)
    }
  }
  const deleteLesson = async (lessonId: string, sectionId: string) => {
    try {
      if (window.confirm("Are you sure you want to delete this course?")) {
        setIsLoading(true)
        await axiosInstance.delete(
          `/lesson/${sectionId}/deletelesson/${lessonId}`
        ) // Fix the endpoint to include '/lesson/'
        toast.success("Lesson Deleted")
        setIsLoading(false)
        const updatedLessons = lessons.filter(
          (lesson) => lesson._id !== lessonId
        )
        setLessons(updatedLessons)
      }
    } catch (error: any) {
      setError(error.message)
      setIsLoading(false)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const closeLessonModal = () => {
    setIsLessonModalOpen(false)
  }

  const showLessonModal = (index: number) => {
    const modalId = `modal_${index}` // Generate a dynamic ID for the modal
    const modal = document.getElementById(modalId) as HTMLDialogElement | null
    if (modal) {
      modal.showModal() // Show the modal if it exists
    }
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-between bg-base-200 p-3 my-3">
        <h2 className="text-xl font-bold">Sections</h2>
        {isAdmin && (
          <>
            <button
              className="btn btn-primary"
              // @ts-ignore
              onClick={() => window.my_modal_3.showModal()}
            >
              Add section
            </button>
            <dialog id="my_modal_3" className="modal">
              <form method="dialog" className="modal-box">
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={closeModal}
                >
                  ✕
                </button>
                <SectionForm
                  type="create"
                  courseId={courseId}
                  title="create a section"
                  onClose={closeModal}
                />
              </form>
            </dialog>
          </>
        )}
      </div>
      {filteredLessons.map((section, index) => (
        <div key={index} className="join join-vertical w-full">
          <div
            className="collapse collapse-arrow join-item border border-base-300"
            onClick={() => handleSectionClick(section._id)}
          >
            <input title="section title" type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium flex flex-row justify-between">
              <p>{section.title}</p>
              <div className="flex flex-row gap-4  z-20">
                <div className="tooltip" data-tip="Delete Section">
                  <button
                    className="text-warning cursor-pointer "
                    onClick={() => deleteSection(section._id)}
                  >
                    Delete
                  </button>
                </div>
                <p>{section.duration} min</p>
              </div>
            </div>
            <div className="collapse-content flex flex-col">
              <div className="flex flex-row justify-between items-center bg-base-100 p-3 my-3 rounded-md">
                <h2 className="text-xl font-bold">Lessons</h2>
                {isAdmin && (
                  <>
                    <button
                      className="btn btn-primary"
                      onClick={() => showLessonModal(index)}
                    >
                      Add Lesson
                    </button>
                    <dialog id={`modal_${index}`} className="modal">
                      <form method="dialog" className="modal-box">
                        <button
                          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                          onClick={closeLessonModal}
                        >
                          ✕
                        </button>
                        <LessonForm
                          title="Add Lesson"
                          sectionId={section._id}
                          courseId={courseId}
                          type="create"
                          onClose={closeLessonModal}
                        />
                      </form>
                    </dialog>
                  </>
                )}
              </div>
              {lessons.length === 0 ? (
                <p>No Lessons available</p>
              ) : (
                lessons.map((lesson, index) => (
                  <div
                    key={lesson._id}
                    className="flex flex-row justify-between bg-base-200 text-start p-3"
                  >
                    <Link href={`/learn/lesson/${lesson._id}`}>
                      {index + 1}
                      {". "}
                      {lesson.title}
                    </Link>
                    <div>
                      <button
                        className="text-warning cursor-pointer "
                        onClick={() => deleteLesson(lesson._id, section._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CourseSections
