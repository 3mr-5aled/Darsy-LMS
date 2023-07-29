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
const VideoPlayer = dynamic(
  () => import("../../../../components/VideoPlayer"),
  { ssr: false }
)

interface RadialProgressStyle {
  "--value": number
  "--size": string
}

type CourseType = {
  _id: string
  name: string
  description: string
  courseImg: string
  lessonDone: string[] // Change this to an array of strings
  duration: string
  price: string
  total: number
  sections: string[]
  createdAt: string
  updatedAt: string
  __v: number
  discount: number
  expiredTime: number
}

type LessonType = {
  _id: string
  title: string
  duration: string
  material: {
    name: string
    link: string
  }
  video: {
    publicId: string
    fileName: string
    src: string
    provider: "normal" | "youtube"
  } // Add specific type if needed
  exams: {
    question: string
    answers: string[]
    correctAnswer: string
    _id: string
  }[]
  description: string
  courseId: CourseType
}

type SectionType = {
  _id: string
  title: string
  duration: string
  total: number
  lessons: {
    _id: string
    title: string
  }[]
}

type ApiResponseType = {
  lesson: LessonType
  sections: SectionType[]
  sectionTitle: string
  sectionDuration: string
  courseTitle: string
  course: CourseType
  totalLessons: number
}

const LessonPage = () => {
  const { id } = useParams()
  // const [course, setCourse] = useState<CourseType | null>(null)
  const [data, setData] = useState<any | null>(null)
  const [lesson, setLesson] = useState<LessonType | null>(null)
  const [sections, setSections] = useState<SectionType[]>([])
  const [progressed, setProgressed] = useState<number>(2)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0)

  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0)
  const [openSections, setOpenSections] = useState<boolean[]>([])
  const { state, setUser, clearUser } = useUserContext()
  const { user } = state

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

  const handleSectionToggle = (index: number) => {
    // Toggle the accordion state for the clicked section
    setOpenSections((prevOpenSections) => {
      const newOpenSections = [...prevOpenSections]
      newOpenSections[index] = !newOpenSections[index]
      return newOpenSections
    })
  }

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
        toast.error(error.response.message)
        setIsLoading(false)
        return <p>{error.response.message}</p>
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
      router.push(`/learn/lesson/${response.data.newLessonId}`)
    } catch (error: any) {
      if (error.response.data.errCode === 5241) {
        if (lessonsDone === data.totalLessons) {
          toast.info("you Have finished the course")
        } else {
          toast.info("this the last lesson in the course")
        }
      }
      // console.log(error)
      // toast.error(error)
    }
  }

  const handlePreviousLesson = async () => {
    try {
      const response = await axiosInstance.get(
        `/lesson/previous-lesson/${lesson?._id}`
      )
      router.push(`/learn/lesson/${response.data.previousLessonId}`)
    } catch (error: any) {
      if (error.response.data.errCode === 5241) {
        toast.info("you are currently in the first lesson")
      }
      // console.log(error)
      // toast.error(error)
    }
  }

  const isBrowser = typeof window !== "undefined"
  if (!user) {
    return <p>Check if you are logged in</p>
  }

  if (!data) {
    // Add a loading state or a message while the data is being fetched
    return <Loading /> // Assuming you have a Loading component to display loading state
  }
  if (!data.course) {
    // Handle the case where data.courseId is null or undefined
    return <p>No course data found</p>
  }

  if (
    !user.enrolledCourse.some(
      (course) => course.courseId === data.course?._id
    ) &&
    user.role !== "tutor"
  ) {
    return <p>Please enroll in the course first to access the lesson</p>
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

  const radialProgressStyle: RadialProgressStyle = {
    "--value": progress,
    "--size": "4rem",
  }

  const doc = new DOMParser().parseFromString(lesson.description, "text/html")

  return (
    <>
      {isLoading ? (
        // Render a loading state while the data is being fetched
        <Loading />
      ) : (
        <>
          {data && (
            <div className="flex flex-row items-center justify-between w-full h-20 p-5 bg-base-300">
              <div className="flex flex-row gap-5">
                <label
                  htmlFor="my-drawer-2"
                  className="btn btn-primary drawer-button lg:hidden"
                >
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                  >
                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                  </svg>
                </label>
                <Link href={`/courses/view-course/${data.course._id}`}>
                  <h1 className="text-2xl font-extrabold">
                    {data.courseTitle}
                  </h1>
                  <span>
                    {lessonsDone}/{data.totalLessons} Lesson Done
                  </span>
                </Link>
              </div>
              <div className="m-3">
                <div
                  className="radial-progress"
                  // @ts-ignore
                  style={radialProgressStyle as CSSProperties}
                >
                  {progress.toFixed(0)}%
                </div>
              </div>
            </div>
          )}
          <div className="z-50 drawer lg:drawer-open">
            <input
              title="drawer-toggle"
              id="my-drawer-2"
              type="checkbox"
              className="drawer-toggle"
            />

            <div className="flex flex-col items-center drawer-content">
              {lesson && isBrowser && (
                <>
                  <VideoPlayer video={lesson.video} />
                  {/* <VideoPlayer videoId="LH7LPMXv8Lg" /> */}
                  {/* Only render Plyr in the browser environment */}
                  <div
                    className={`flex flex-row justify-between w-full paddings `}
                  >
                    <h1 className="flex flex-row items-center text-2xl font-bold gap-x-3">
                      <span>{lesson.title}</span>
                      {renderDoneIcon(lesson._id)}
                    </h1>
                    <p className="text-start">Duration: {lesson.duration}min</p>
                  </div>
                  <div className="flex flex-col justify-start w-full p-5 bg-base-300">
                    <h3 className="text-2xl">Description: </h3>
                    <div className="p-3 prose bg-base-200 card">
                      <div
                        dangerouslySetInnerHTML={{ __html: doc.body.innerHTML }}
                      />
                    </div>
                  </div>
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
                  {/* Add more elements to display other lesson details as needed */}
                </>
              )}

              <div className="flex flex-row">
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
                          <div
                            key={lessonItem._id}
                            className={`flex flex-row justify-between items-center rounded-lg p-3 ${
                              lessonItem._id === lesson?._id
                                ? "bg-base-100"
                                : ""
                            }`}
                          >
                            <Link href={`/learn/lesson/${lessonItem._id}`}>
                              {lessonIndex + 1}. {lessonItem.title}
                            </Link>
                            {renderDoneIcon(lessonItem._id)}
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
      )}
    </>
  )
}

export default LessonPage
