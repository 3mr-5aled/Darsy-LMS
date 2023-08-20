"use client"
import axiosInstance from "@/axios.config"
import { LessonType, SectionType, ApiResponseType } from "@/common.types"
import { useUserContext } from "@/contexts/userContext"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { BsCheckCircle, BsCheckCircleFill } from "react-icons/bs"
import { toast } from "react-toastify"

const LearnPageSideDrawer = ({ children }: { children: React.ReactNode }) => {
  const { id } = useParams()
  const [data, setData] = useState<any | null>(null)
  const [lesson, setLesson] = useState<LessonType | null>(null)
  const [sections, setSections] = useState<SectionType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0)

  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0)
  const [openSections, setOpenSections] = useState<boolean[]>([])
  const { state } = useUserContext()
  const { user } = state

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axiosInstance.get<ApiResponseType>(
          `/lesson/get-lesson/${id}`
        )
        setData(response.data)
        setLesson(response.data.lesson)
        setSections(response.data.sections)
        setIsLoading(false)
      } catch (error: any) {
        console.error(error)
        toast.error(error.response?.message)
        setIsLoading(false)
        return <p>{error.response?.message}</p>
        // Handle error, e.g., show an error message or redirect to an error page
      }
    }

    fetchLesson()
  }, [id])

  const handleSectionToggle = (index: number) => {
    // Toggle the accordion state for the clicked section
    setOpenSections((prevOpenSections) => {
      const newOpenSections = [...prevOpenSections]
      newOpenSections[index] = !newOpenSections[index]
      return newOpenSections
    })
  }

  useEffect(() => {
    // Find the current lesson index within the sections' lessons array
    if (lesson) {
      const sectionIndex = sections.findIndex((section) => {
        return section.lessons.some((item) => item._id === lesson._id)
      })

      if (sectionIndex !== -1) {
        const lessonIndex = sections[sectionIndex].lessons.findIndex(
          (item) => item._id === lesson._id
        )
        setCurrentLessonIndex(lessonIndex)
      }
    }
  }, [lesson, sections])

  useEffect(() => {
    // Find the active section index based on the current lesson
    if (lesson) {
      const activeIndex = sections.findIndex((section) =>
        section.lessons.some((item) => item._id === lesson._id)
      )
      setActiveSectionIndex(activeIndex)
    }
  }, [lesson, sections])

  useEffect(() => {
    // Initialize openSections state with closed states for all sections
    setOpenSections(new Array(sections.length).fill(false))
    // Open the active section by default
    if (activeSectionIndex !== -1) {
      setOpenSections((prevOpenSections) => {
        const newOpenSections = [...prevOpenSections]
        newOpenSections[activeSectionIndex] = true
        return newOpenSections
      })
    }
  }, [sections, activeSectionIndex])

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
  const examStatus = (id: string) => {
    let status = "border-gray-500"
    user?.exams?.forEach((exam) => {
      if (exam.lessonId.toString() === id) {
        status =
          parseInt(exam.degree) > 50
            ? "border-2 border-success border-opacity-50"
            : "border-2 border-error border-opacity-50"
      }
    })
    return status
  }

  const closeMobileSidebar = () => {
    const checkbox = document.getElementById("my-drawer-2") as HTMLInputElement
    if (window.innerWidth <= 768) {
      if (checkbox) {
        checkbox.checked = false
      }
    }
  }

  return (
    <>
      <div className="z-50 drawer lg:drawer-open">
        <input
          title="drawer-toggle"
          id="my-drawer-2"
          type="checkbox"
          className="drawer-toggle"
        />

        <div className="flex flex-col items-center drawer-content">
          {children}
        </div>

        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <div className="h-full p-4 menu w-80 bg-base-200 text-base-content">
            {/* Display related sections */}
            <div className="w-full join join-vertical">
              {sections.map((section, index) => (
                <div
                  className="border collapse collapse-arrow join-item border-base-300"
                  key={section._id}
                >
                  <input
                    title="accordion"
                    type="checkbox"
                    name={`my-accordion-${index}`}
                    checked={openSections[index]}
                    onChange={() => handleSectionToggle(index)}
                  />
                  <div className="text-lg font-medium collapse-title">
                    {index + 1}
                    {". "}
                    {section.title}
                    {section.duration}
                  </div>
                  <div className="flex flex-col gap-3 collapse-content">
                    {/* Display lessons in each section */}
                    {section.lessons.map((lessonItem, lessonIndex) => (
                      <div key={lessonItem._id}>
                        <Link
                          href={`/app/lesson/${lessonItem._id}`}
                          onClick={closeMobileSidebar}
                        >
                          <div
                            key={lessonItem._id}
                            className={`flex flex-row hover:bg-primary justify-between items-center rounded-lg p-2 ${
                              lessonItem._id === lesson?._id
                                ? "bg-base-100"
                                : ""
                            }`}
                          >
                            {lessonItem.index}. {lessonItem.title}
                            {renderDoneIcon(lessonItem._id)}
                          </div>
                        </Link>
                        {lessonItem?.exams && lessonItem.exams.length > 0 && (
                          <Link
                            className={`${examStatus(
                              lessonItem._id as string
                            )} flex flex-row py-3 px-3 rounded-lg border-2  hover:bg-neutral`}
                            href={`/app/lesson/${lessonItem._id}/quiz`}
                            onClick={closeMobileSidebar}
                          >
                            Quiz
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LearnPageSideDrawer
