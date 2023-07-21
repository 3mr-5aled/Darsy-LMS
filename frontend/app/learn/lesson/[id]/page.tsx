"use client"
import { useEffect, useState } from "react"
import axiosInstance from "@/axios.config"
import { useParams, useRouter } from "next/navigation"
import { toast } from "react-toastify"
import Plyr from "plyr-react"
import "plyr-react/plyr.css"
import dynamic from "next/dynamic"
import Loading from "@/app/loading"
import Link from "next/link"
const VideoPlayer = dynamic(
  () => import("../../../../components/VideoPlayer"),
  { ssr: false }
)

type LessonType = {
  _id: string
  title: string
  description: string
  duration: string
  video: string
  completed: boolean
  // Add any other properties you have in the LessonType
}

type SectionType = {
  _id: string
  title: string
  duration: string
  lessons: LessonType[] // Assuming lessons property contains an array of LessonType
  // Add any other properties you have in the SectionType
}

// type DataType = {
//   // Define the CourseType according to your API response
//   // Replace with the actual properties you have
//   courseTitle: string
//   totalLessons: number
// }

type ApiResponse = {
  // course: CourseType
  data: any
  lesson: LessonType
  sections: SectionType[]
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

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axiosInstance.get<ApiResponse>(
          `/lesson/getlesson/${id}`
        )
        setData(response.data)
        setLesson(response.data.lesson)
        setIsLoading(false)
        setSections(response.data.sections)
      } catch (error: any) {
        console.error(error)
        toast.error(error.response.message)
        setIsLoading(false)
        // Handle error, e.g., show an error message or redirect to an error page
      }
    }

    fetchLesson()
  }, [id])

  const percentage = () => {
    if (data) {
      const percent: number = Math.floor(progressed / data.totalLessons) * 100
      return percent
    }
    return 0
  }

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

  const handleNextLesson = () => {
    // Check if there's a next lesson available
    if (currentLessonIndex + 1 < sections.length) {
      const nextLesson = sections[currentLessonIndex + 1].lessons[0]
      // Navigate to the next lesson
      router.push(`/learn/lesson/${nextLesson._id}`)
    } else {
      // You may handle the case where there's no next lesson (e.g., show a message or redirect to a different page)
      toast.info("Congratulations! You've completed all the lessons.")
    }
  }

  const handlePreviousLesson = () => {
    // Check if there's a previous lesson available
    if (currentLessonIndex - 1 >= 0) {
      const previousLesson = sections[currentLessonIndex - 1].lessons[0]
      // Navigate to the previous lesson
      router.push(`/learn/lesson/${previousLesson._id}`)
    } else {
      // You may handle the case where there's no previous lesson (e.g., show a message or redirect to a different page)
      toast.info("You're already at the first lesson.")
    }
  }

  const isBrowser = typeof window !== "undefined"

  return (
    <>
      {isLoading ? (
        // Render a loading state while the data is being fetched
        <Loading />
      ) : (
        <>
          {data && (
            <div className="w-full h-20 bg-base-300 flex flex-row justify-between items-center p-5">
              <div>
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
                <h1 className="text-2xl font-extrabold">{data.courseTitle}</h1>
              </div>
              <div className="m-3">
                <div
                  className="radial-progress"
                  style={{ "--value": percentage(), "--size": "4rem" }}
                >
                  {percentage()}%
                </div>
              </div>
            </div>
          )}
          <div className="drawer lg:drawer-open">
            <input
              title="drawer-toggle"
              id="my-drawer-2"
              type="checkbox"
              className="drawer-toggle"
            />

            <div className="drawer-content flex flex-col items-center justify-center">
              {lesson && isBrowser && (
                <>
                  <VideoPlayer videoId="LH7LPMXv8Lg" />
                  {/* Only render Plyr in the browser environment */}
                  <div className="flex flex-row w-full paddings justify-between">
                    <h1 className="text-2xl font-bold">{lesson.title}</h1>
                    <p className="text-start">Duration: {lesson.duration}min</p>
                  </div>
                  <p className="">Description: {lesson.description}</p>
                  {/* Add more elements to display other lesson details as needed */}
                </>
              )}

              <div className="flex flex-row">
                <button
                  className="btn btn-primary my-8 mr-2"
                  onClick={handlePreviousLesson}
                >
                  Previous Lesson
                </button>
                <button
                  className="btn btn-primary my-8"
                  onClick={handleNextLesson}
                >
                  Next Lesson
                </button>
              </div>
            </div>

            <div className="drawer-side">
              <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

              <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                {/* Display related sections */}
                <div className="join join-vertical w-full">
                  {sections.map((section, index) => (
                    <div
                      className="collapse collapse-arrow join-item border border-base-300"
                      key={section._id}
                    >
                      <input
                        title="accordion"
                        type="checkbox"
                        name={`my-accordion-${index}`}
                      />
                      <div className="collapse-title text-lg font-medium">
                        {index + 1}
                        {". "}
                        {section.title}
                        {section.duration}
                      </div>
                      <div className="collapse-content flex flex-col gap-3">
                        {/* Display lessons in each section */}
                        {section.lessons.map((lesson, index) => (
                          <Link
                            href={`/learn/lesson/${lesson._id}`}
                            key={lesson._id}
                          >
                            {index + 1}
                            {". "}
                            {lesson.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default LessonPage
