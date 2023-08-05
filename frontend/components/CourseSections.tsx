"use client"

import axiosInstance from "@/axios.config"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import LessonForm from "./LessonForm"
import SectionForm from "./SectionForm"
import {
  BsCheckCircle,
  BsCheckCircleFill,
  BsEye,
  BsPencilFill,
  BsTrashFill,
} from "react-icons/bs"
import { useUserContext } from "@/contexts/userContext"
import LessonView from "./LessonView"
import Link from "next/link"
import Loading from "@/app/loading"
import { SectionType } from "@/common.types"

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
  const { state, setUser, clearUser } = useUserContext()
  const { user } = state

  useEffect(() => {
    if (sections) {
      setFilteredSections(sections)
    }
  }, [sections])

  const fetchLessons = async (sectionId: string) => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get(
        `/lesson/${sectionId}/get-all-lessons`
      )

      if (Array.isArray(response.data)) {
        setLessons(response.data)
      } else {
        setLessons([])
      }
      setIsLoading(false)
    } catch (error: any) {
      setError(error.message)
      setLessons([]) // Set lessons to an empty array in case of an error
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (filteredSections.length > 0) {
      fetchLessons(filteredSections[0]._id)
    }
  }, [filteredSections])

  const handleSectionClick = (sectionId: string) => {
    setIsLoading(true)
    setLessons([])
    setTimeout(() => {
      fetchLessons(sectionId)
    }, 1000);
  }

  const deleteSection = async (sectionId: string) => {
    setIsLoading(true)
    try {
      await axiosInstance.delete(
        `/section/${courseId}/delete-section/${sectionId}`
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
          `/lesson/${sectionId}/delete-lesson/${lessonId}`
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

  // const closeLessonEditModal = () => {
  //   setIsLessonModalOpen(false)
  // }
  const closeLessonViewModal = () => {
    setIsLessonModalOpen(false)
  }

  // const closeLessonModal = () => {
  //   setIsLessonModalOpen(false)
  // }

  const showSectionEditModal = (index: number) => {
    const modalId = `edit_section_modal_${index}` // Generate a dynamic ID for the modal
    const modal = document.getElementById(modalId) as HTMLDialogElement | null
    if (modal) {
      modal.showModal() // Show the modal if it exists
      modal.onclose = closeSectionEditModal // Set the onclose event to call closeSectionEditModal when the modal is closed
    }
  }

  // const showLessonEditModal = (index: number) => {
  //   const modalId = `edit_modal_${index}` // Generate a dynamic ID for the modal
  //   const modal = document.getElementById(modalId) as HTMLDialogElement | null
  //   if (modal) {
  //     modal.showModal() // Show the modal if it exists
  //     modal.onclose = closeLessonEditModal // Set the onclose event to call closeLessonEditModal when the modal is closed
  //   }
  // }
  const showLessonViewModal = (index: number) => {
    const modalId = `view_modal_${index}` // Generate a dynamic ID for the modal
    const modal = document.getElementById(modalId) as HTMLDialogElement | null
    if (modal) {
      modal.showModal() // Show the modal if it exists
      modal.onclose = closeLessonViewModal // Set the onclose event to call closeLessonEditModal when the modal is closed
    }
  }

  // const showLessonModal = (index: number) => {
  //   const modalId = `modal_${index}` // Generate a dynamic ID for the modal
  //   const modal = document.getElementById(modalId) as HTMLDialogElement | null
  //   if (modal) {
  //     modal.showModal() // Show the modal if it exists
  //     modal.onclose = closeLessonModal // Set the onclose event to call closeLessonModal when the modal is closed
  //   }
  // }

  const isLessonDone = (lessonId: string) => {
    return user?.enrolledCourse[0]?.lessonsDone?.includes(lessonId) ?? false
  }
  const renderDoneIcon = (lessonId: string) => {
    const isDone = isLessonDone(lessonId)
    return isDone ? (
      <span className="text-green-500">
        <BsCheckCircleFill />
      </span>
    ) : (
      <span className="text-gray-500">
        <BsCheckCircle />
      </span>
    )
  }

  return (
    <div className="rounded-md bg-base-200">
      <div className="flex flex-row items-center justify-between p-3 my-3 bg-base-200">
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
                  title="close"
                  className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
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
        <div key={index} className="w-full join join-vertical">
          <div
            className="border collapse collapse-arrow join-item border-base-300"
            onClick={() => handleSectionClick(section._id)}
          >
            <input
              title="section title"
              type="radio"
              name="my-accordion-4"
              readOnly
            />
            <div className="flex flex-row justify-between text-xl font-medium collapse-title">
              <p>{section.title}</p>
              <div className="z-20 flex flex-row items-center gap-4">
                {isAdmin && (
                  <>
                    <div
                      className="tooltip tooltip-left"
                      data-tip="Edit Section"
                    >
                      <button
                        title="edit"
                        type="button"
                        className="cursor-pointer text-warning"
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
                          title="close"
                          className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
                          onClick={closeSectionEditModal}
                        >
                          ✕
                        </button>
                        <SectionForm
                          type="edit"
                          courseId={courseId}
                          title="Edit a section"
                          section={section as SectionType}
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
                        className="cursor-pointer text-warning "
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
            <div className="flex flex-col collapse-content bg-base-100">
              <div className="flex flex-row items-center justify-between p-3 my-3 rounded-md ">
                {isLoading ? (
                  <div className=" my-2 mx-auto loading loading-lg loading-spinner"></div>
                ):
                (
                  <>
                <h2 className="text-xl font-bold">Lessons</h2>
                {isAdmin && (
                  <>
                    <button
                      title="add lesson"
                      className="btn btn-primary"
                      // onClick={() => showLessonModal(index)}
                      onClick={() =>
                        router.push(
                          `/admin/courses/manage-course/${courseId}/section/${section._id}/lesson/create-lesson`
                        )
                      }
                    >
                      Add Lesson
                    </button>

                    {/* <dialog id={`modal_${index}`} className="z-0 modal">
                      <form method="dialog" className="modal-box">
                        <button
                        title="close"
                          className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
                          onClick={closeLessonModal}
                          >
                          ✕
                          </button>
                          <LessonForm
                          PageTitle="Add Lesson"
                          sectionId={section._id}
                          courseId={courseId}
                          type="create"
                          onClose={closeLessonModal}
                          />
                          </form>
                        </dialog> */}
                  </>
                )}
                </>
                )}
              </div>
              {/* Check if lessons array is empty */}
               {!isLoading && lessons.length === 0 ? (
                <p>No Lessons available</p>
              ) : (
                lessons.map((lesson, index) => (
                  <>
                    <div
                      className="flex flex-row items-center justify-between p-3 my-3 rounded-md bg-base-200 text-start"
                      key={lesson._id}
                    >
                      <div
                        onClick={() =>
                          router.push(`/learn/lesson/${lesson._id}`)
                        }
                        className="flex flex-row items-center cursor-pointer gap-x-3"
                      >
                        {index + 1}. {lesson.title}
                        {!isAdmin && renderDoneIcon(lesson._id)}
                      </div>

                      {isAdmin && (
                        <>
                          <div className="flex flex-row items-center gap-4 text-xl">
                            <div
                              className="tooltip tooltip-left"
                              data-tip="View Lesson"
                            >
                              <button
                                title="View"
                                type="button"
                                className="cursor-pointer text-warning"
                                onClick={() => showLessonViewModal(index)}
                              >
                                <BsEye />
                              </button>
                            </div>
                            <div
                              className="tooltip tooltip-left"
                              data-tip="Edit Lesson"
                            >
                              <button
                                title="edit"
                                type="button"
                                className="cursor-pointer text-warning"
                                onClick={() =>
                                  router.push(
                                    `/admin/courses/manage-course/${courseId}/section/${section._id}/lesson/${lesson._id}/edit-lesson`
                                  )
                                }
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
                                className="cursor-pointer text-error "
                                onClick={() =>
                                  deleteLesson(lesson._id, section._id)
                                }
                              >
                                <BsTrashFill />
                              </button>
                            </div>
                          </div>
                          <dialog id={`view_modal_${index}`} className="modal">
                            <form method="dialog" className="modal-box">
                              <button
                                title="close"
                                className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
                                onClick={closeLessonViewModal}
                              >
                                ✕
                              </button>
                              <LessonView lesson={lesson} />
                            </form>
                          </dialog>
                        </>
                      )}
                    </div>

                   {isAdmin ? (<div>
                      {lesson.exams?.length > 0 ? (
                        <button
                          title="edit quiz"
                          className="btn btn-primary btn-outline"
                          onClick={() =>
                            router.push(
                              `/admin/courses/manage-course/${courseId}/section/${section._id}/lesson/${lesson._id}/edit-quiz`
                            )
                          }
                        >
                          Edit Quiz
                        </button>
                      ) : (
                        <button
                          title="add quiz"
                          className="btn btn-secondary"
                          onClick={() =>
                            router.push(
                              `/admin/courses/manage-course/${courseId}/section/${section._id}/lesson/${lesson._id}/create-quiz`
                            )
                          }
                        >
                          Add Quiz
                        </button>
                      )}
                    </div>) : 
                   (
                    <div>
                    {lesson.exams?.length ? (
                      <button className="btn btn-secondary btn-md"> exam is available </button>
                    ):(
                      <button className="btn btn-secondary btn-md"> no exam is available </button>
                    )}
                    </div>
                    )
                    } 
                   
                  </>
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
