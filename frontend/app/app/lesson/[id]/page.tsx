"use client"
import { useEffect, useMemo, useState } from "react"
import axiosInstance from "@/axios.config"
import { useParams, useRouter } from "next/navigation"
import { toast } from "react-toastify"
import dynamic from "next/dynamic"
import Loading from "@/app/loading"
import Link from "next/link"
import {
  BsBoxArrowUpRight,
  BsCheckCircle,
  BsCheckCircleFill,
} from "react-icons/bs"
import { useUserContext } from "@/contexts/userContext"
import { ApiResponseType, LessonType, SectionType } from "@/common.types"
const VideoPlayer = dynamic(
  () => import("../../../../components/Features/VideoPlayer"),
  { ssr: false }
)

const LessonPage = () => {
  const { id } = useParams()
  const [data, setData] = useState<any | null>(null)
  const [lesson, setLesson] = useState<LessonType | null>(null)
  const [sections, setSections] = useState<SectionType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0)

  const { state } = useUserContext()
  const { user } = state

  // useEffect(() => {
  //   // Find the active section index based on the current lesson
  //   if (lesson) {
  //     const activeIndex = sections.findIndex((section) =>
  //       section.lessons.some((item) => item._id === lesson._id)
  //     )
  //     setActiveSectionIndex(activeIndex)
  //   }
  // }, [lesson, sections])

  // useEffect(() => {
  //   // Initialize openSections state with closed states for all sections
  //   setOpenSections(new Array(sections.length).fill(false))
  //   // Open the active section by default
  //   if (activeSectionIndex !== -1) {
  //     setOpenSections((prevOpenSections) => {
  //       const newOpenSections = [...prevOpenSections]
  //       newOpenSections[activeSectionIndex] = true
  //       return newOpenSections
  //     })
  //   }
  // }, [sections, activeSectionIndex])

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
        toast.error(error.response.data.message)
        setIsLoading(false)
        // Handle error, e.g., show an error message or redirect to an error page
      }
    }

    fetchLesson()
  }, [id])

  const percentage = () => {
    if (data && user && user.enrolledCourse.length > 0) {
      const courseWithProgress = user.enrolledCourse.find(
        (enrolledCourse) => enrolledCourse.courseId === data.course._id
      )

      if (courseWithProgress) {
        const lessonsDone = courseWithProgress.lessonsDone.length
        const progress: number = (lessonsDone / data.totalLessons) * 100

        return {
          progress: progress,
          lessonsDone: lessonsDone,
        }
      }
    }

    return {
      progress: 0,
      lessonsDone: 0,
    }
  }

  const { progress, lessonsDone } = percentage()

  // next lesson logic

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

  // next lesson logic
  const handleNextLesson = async () => {
    try {
      const response = await axiosInstance.put(
        `/lesson/complete-lesson/${lesson?._id}`
      )
      toast.success("Lesson Completed")
      router.push(`/app/lesson/${response.data.newLessonId}`)
    } catch (error: any) {
      if (error.response.data.errCode === 5241) {
        if (lessonsDone === data.totalLessons) {
          toast.info("you Have finished the course")
        } else {
          toast.info("this the last lesson in the course")
        }
      }
      console.log(error)
      // toast.error(error)
    }
  }

  const handlePreviousLesson = async () => {
    try {
      const response = await axiosInstance.get(
        `/lesson/previous-lesson/${lesson?._id}`
      )
      router.push(`/app/lesson/${response.data.previousLessonId}`)
    } catch (error: any) {
      if (error.response.data.errCode === 5241) {
        toast.info("you are currently in the first lesson")
      }
      console.log(error)
      // toast.error(error)
    }
  }

  const [userCheckTimeout, setUserCheckTimeout] = useState<boolean>(false)

  useEffect(() => {
    // Set a timeout to simulate loading user data
    const timeout = setTimeout(() => {
      setUserCheckTimeout(true)
    }, 2000) // Adjust the timeout duration as needed

    return () => clearTimeout(timeout)
  }, [])

  const isBrowser = typeof window !== "undefined"

  if (!userCheckTimeout) {
    return <Loading />
  }

  if (!user) {
    return (
      <div className="flexCenter flex-col gap-5 h-[calc(100vh-250px)] font-bold w-full">
        <p>Please sign in to access this lesson.</p>
        <Link className="btn btn-primary" href="/auth/login">
          Sign in
        </Link>
      </div>
    )
  }

  if (!data) {
    // Add a loading state or a message while the data is being fetched
    return <Loading /> // Assuming you have a Loading component to display loading state
  }
  if (!data.course) {
    // Handle the case where data.courseId is null or undefined
    return <p>No Course data found</p>
  }

  if (
    !user.enrolledCourse.some(
      (course) => course.courseId === data.course?._id
    ) &&
    user.role !== "tutor"
  ) {
    return (
      <div className="flexCenter h-[calc(100vh-250px)] font-bold w-full">
        <p>Please enroll in the course first to access the lesson.</p>
        <Link
          className="btn btn-primary"
          href={`/courses/view-course/${data.course._id}`}
        >
          Enroll the course
        </Link>
      </div>
    )
  }

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

  const doc = new DOMParser().parseFromString(
    lesson ? lesson.description : "<p>description of lesson</p>",
    "text/html"
  )

  return (
    <>
      {isLoading ? (
        // Render a loading state while the data is being fetched
        <Loading />
      ) : (
        <>
          {lesson && isBrowser && (
            <>
              <VideoPlayer video={lesson.video} />
              <div className="flex flex-row justify-between w-full paddings ">
                <h1 className="flex flex-row items-center text-2xl font-bold gap-x-3">
                  <span>{lesson.title}</span>
                  {renderDoneIcon(lesson._id)}
                </h1>
                <p className="text-start">Duration: {lesson.duration}min</p>
              </div>
              <div className="bg-base-300 w-full h-full flexCenter flex-col">
                <div className="flex flex-col justify-start w-full p-5">
                  <h3 className="text-2xl">Description: </h3>
                  <div className="p-3 my-3 rounded-lg bg-base-200 w-full ">
                    <div
                      dangerouslySetInnerHTML={{ __html: doc.body.innerHTML }}
                    />
                  </div>
                </div>
                {lesson.material && (
                  <Link
                    href={lesson.material.link}
                    type="button"
                    className="my-3"
                  >
                    Material Link:{" "}
                    <span className="btn btn-primary btn-outline">
                      {lesson.material.name} <BsBoxArrowUpRight />
                    </span>
                  </Link>
                )}
                <div className="flex flex-row justify-around mb-16 w-full">
                  <div>
                    <button
                      className="my-8 mr-2 btn btn-primary"
                      onClick={handlePreviousLesson}
                    >
                      Previous Lesson
                    </button>
                    <button
                      className="my-8 btn btn-primary"
                      onClick={handleNextLesson}
                    >
                      Next Lesson
                    </button>
                  </div>
                </div>
              </div>
              {/* Add more elements to display other lesson details as needed */}
            </>
          )}
        </>
      )}
    </>
  )
}

export default LessonPage
