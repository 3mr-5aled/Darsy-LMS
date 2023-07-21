"use client"

import axiosInstance from "@/axios.config"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import LessonForm from "./LessonForm"
import SectionForm from "./SectionForm"
import { BsPencilFill, BsTrashFill } from "react-icons/bs"

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
  const [filteredSections, setFilteredSections] = useState<Section[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isLessonModalOpen, setIsLessonModalOpen] = useState<boolean>(false)
  const [modalIndex, setModalIndex] = useState<number | null>(null)

  useEffect(() => {
    if (sections) {
      setFilteredSections(sections)
    }
  }, [sections])

  const fetchLessons = async (sectionId: string) => {
    setIsLoading(true)
    try {
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
    if (filteredSections.length > 0) {
      fetchLessons(filteredSections[0]._id)
    }
  }, [filteredSections])

  const handleSectionClick = (sectionId: string) => {
    fetchLessons(sectionId)
  }

  const deleteSection = async (sectionId: string) => {
    setIsLoading(true)
    try {
      await axiosInstance.delete(
        `/section/${courseId}/deletesection/${sectionId}`
      )
      toast.success("Section Deleted")
      setIsLoading(false)
      const updatedSections = filteredSections.filter(
        (section) => section._id !== sectionId
      )
      setFilteredSections(updatedSections)
    } catch (error: any) {
      setError(error.message)
      setIsLoading(false)
    }
  }

  const deleteLesson = async (lessonId: string, sectionId: string) => {
    try {
      if (window.confirm("Are you sure you want to delete this lesson?")) {
        setIsLoading(true)
        await axiosInstance.delete(
          `/lesson/${sectionId}/deletelesson/${lessonId}`
        )
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

  const closeSectionEditModal = () => {
    setIsLessonModalOpen(false)
  }

  const closeLessonEditModal = () => {
    setIsLessonModalOpen(false)
  }

  const closeLessonModal = () => {
    setIsLessonModalOpen(false)
  }

  const showSectionEditModal = (index: number) => {
    const modalId = `edit_section_modal_${index}` // Generate a dynamic ID for the modal
    const modal = document.getElementById(modalId) as HTMLDialogElement | null
    if (modal) {
      modal.showModal() // Show the modal if it exists
    }
  }

  const showLessonEditModal = (index: number) => {
    const modalId = `edit_modal_${index}` // Generate a dynamic ID for the modal
    const modal = document.getElementById(modalId) as HTMLDialogElement | null
    if (modal) {
      modal.showModal() // Show the modal if it exists
    }
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
              title="add section"
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
      {filteredSections.map((section, index) => (
        <div key={index} className="join join-vertical w-full">
          <div
            className="collapse collapse-arrow join-item border border-base-300"
            onClick={() => handleSectionClick(section._id)}
          >
            <input
              title="section title"
              type="radio"
              name="my-accordion-4"
              readOnly
            />
            <div className="collapse-title text-xl font-medium flex flex-row justify-between">
              <p>{section.title}</p>
              <div className="flex flex-row items-center gap-4  z-20">
                {isAdmin && (
                  <>
                    <div
                      className="tooltip tooltip-left"
                      data-tip="Edit Section"
                    >
                      <button
                        title="edit"
                        type="button"
                        className="text-warning cursor-pointer"
                        onClick={() => showSectionEditModal(index)}
                      >
                        <BsPencilFill />
                      </button>
                    </div>
                    <dialog
                      id={`edit_section_modal_${index}`}
                      className="modal"
                    >
                      <form method="dialog" className="modal-box">
                        <button
                          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                          onClick={closeSectionEditModal}
                        >
                          ✕
                        </button>
                        <SectionForm
                          type="edit"
                          courseId={courseId}
                          title="Edit a section"
                          section={section}
                          onClose={closeModal}
                        />
                      </form>
                    </dialog>
                    <div
                      className="tooltip tooltip-right"
                      data-tip="Delete Section"
                    >
                      <button
                        title="delete"
                        type="button"
                        className="text-warning cursor-pointer "
                        onClick={() => deleteSection(section._id)}
                      >
                        <BsTrashFill />
                      </button>
                    </div>
                  </>
                )}

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
                  <button
                    className="bg-base-200 text-start p-3 flex flex-row justify-between items-center my-3 rounded-md"
                    key={lesson._id}
                  >
                    <div
                      onClick={() =>
                        router.push(`/lecture/lesson/${lesson._id}`)
                      }
                    >
                      {index + 1}. {lesson.title}
                    </div>

                    {isAdmin && (
                      <>
                        <div className="flex flex-row gap-4">
                          <div
                            className="tooltip tooltip-left"
                            data-tip="Edit Lesson"
                          >
                            <button
                              type="button"
                              className="text-warning cursor-pointer"
                              onClick={() => showLessonEditModal(index)}
                            >
                              <BsPencilFill />
                            </button>
                          </div>
                          <div
                            className="tooltip tooltip-left"
                            data-tip="Delete Lesson"
                          >
                            <button
                              title="delete"
                              type="button"
                              className="text-error cursor-pointer "
                              onClick={() =>
                                deleteLesson(lesson._id, section._id)
                              }
                            >
                              <BsTrashFill />
                            </button>
                          </div>
                        </div>
                        <dialog id={`edit_modal_${index}`} className="modal">
                          <form method="dialog" className="modal-box">
                            <button
                              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                              onClick={closeLessonEditModal}
                            >
                              ✕
                            </button>
                            <LessonForm
                              title="Edit Lesson"
                              sectionId={section._id}
                              courseId={courseId}
                              lesson={lesson}
                              type="edit"
                              onClose={closeLessonEditModal}
                            />
                          </form>
                        </dialog>
                      </>
                    )}
                  </button>
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
