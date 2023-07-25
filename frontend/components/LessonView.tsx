import { LessonType } from "@/common.types"
import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Use dynamic import for VideoPlayer to load it only on the client-side
const VideoPlayer = dynamic(() => import("./VideoPlayer"), { ssr: false })

const LessonView = ({ lesson }: { lesson: LessonType }) => {
  const [isBrowser, setIsBrowser] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsBrowser(typeof window !== "undefined")
  }, [])

  useEffect(() => {
    if (lesson.video?.provider && lesson.video?.src) {
      setIsLoading(false)
    }
  }, [lesson])

  return (
    <div className="m-5">
      <h1 className="text-center text-2xl font-bold">View Lesson</h1>
      <div className="space-y-4">
        <div>
          <strong>Title:</strong> {lesson.title}
        </div>
        <div>
          <strong>Description:</strong> {lesson.description}
        </div>
        <div>
          <strong>Duration:</strong> {lesson.duration}
        </div>
        <div>
          <strong>Material title:</strong> {lesson.material?.name}
        </div>
        <div>
          <strong>Material link:</strong> {lesson.material?.link}
        </div>
        <div>
          <strong>Video Provider:</strong> {lesson.video?.provider}
        </div>
        <div>
          <strong>Video Source:</strong> {lesson.video?.src}
        </div>
        {isLoading ? (
          <div>Loading video...</div>
        ) : (
          lesson.video?.provider &&
          lesson.video?.src &&
          isBrowser && (
            <div>
              <strong>Video:</strong>

              <div className="mt-3">
                <VideoPlayer
                  source={lesson.video.src}
                  provider={lesson.video.provider}
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default LessonView
