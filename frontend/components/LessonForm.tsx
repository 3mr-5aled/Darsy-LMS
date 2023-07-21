"use client"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { LessonType } from "@/common.types"
import axiosInstance from "@/axios.config"
import { toast } from "react-toastify"
import { useState } from "react"

type VideoType = "normal" | "youtube"

type Props = {
  title: string
  type: "create" | "edit"
  lesson?: LessonType
  sectionId: string | undefined
  courseId: string | undefined
  onClose: () => void // Function to close the modal
}

const LessonForm = ({
  title,
  type,
  lesson,
  sectionId,
  courseId,
  onClose,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LessonType>() // Specify the generic type for useForm

  const [videoType, setVideoType] = useState<VideoType>("normal")
  const [file, setFile] = useState<File | null>(null)
  const router = useRouter()

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]) // Set the selected file to the state
    }
  }

  const onSubmit: SubmitHandler<LessonType> = async (data) => {
    try {
      if (isSubmitting) {
        return
      }
      const formData = new FormData()
      formData.append("title", data.title)
      formData.append("description", data.description)
      formData.append("duration", data.duration.toString())
      formData.append("material.name", data.material?.name || "")
      formData.append("material.link", data.material?.link || "")
      formData.append("videoType", videoType)
      if (videoType === "normal") {
        if (!file) {
          toast.error("Please select a file to upload.")
          return
        }

        formData.append("video", file) // Append the file to the formData

        // If it's a normal video, upload the file to /upload to get the URL
        const uploadResponse = await axiosInstance.post("/upload", formData)
        toast.info("Uploading....")
        const videoUrl = uploadResponse.data.url

        // Upload the lesson with the video URL to /lesson/${sectionId}/addlesson
        const lessonData = { ...data, video: videoUrl }
        const response = await axiosInstance.post(
          `/lesson/${sectionId}/addlesson`,
          lessonData
        )
        toast.success("Lesson added")
        router.push(`/admin/manage-course/${courseId}`)
        onClose() // Close the modal
      } else if (videoType === "youtube") {
        // If it's a YouTube video, directly upload the lesson to /lesson/${sectionId}/addlesson
        const response = await axiosInstance.post(
          `/lesson/${sectionId}/addlesson`,
          data
        )
        toast.success("Lesson added")
        router.push(`/admin/manage-course/${courseId}`)
        onClose() // Close the modal
      }
    } catch (error: any) {
      // ... (existing error handling code)
    }
  }

  return (
    <div className="flexCenter flex-col w-full p-5 prose">
      <h1>{title}</h1>
      <div className="flexCenter flex-col gap-5">
        <div className="flex justify-around flex-wrap gap-5 w-full">
          <div className="form-control">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              className="input input-bordered"
              placeholder="Title"
              disabled={isSubmitting}
              {...register("title", { required: true })}
            />
            {errors.title && <span>This field is required</span>}
            {/* Display error message if the "name" field is not filled */}
          </div>
          <div className="form-control">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              className="textarea textarea-bordered w-full min-w-[16rem] max-w-xs"
              {...register("description", { required: true })}
              placeholder="Description"
              disabled={isSubmitting}
            />
            {errors.description && <span>This field is required</span>}
            {/* Display error message if the "description" field is not filled */}
          </div>
          {/* <div className="form-control">
            <label htmlFor="video">Video:</label>
            <input
              type="text"
              id="video"
              className="input input-bordered"
              placeholder="Video"
              disabled={isSubmitting}
              {...register("video", { required: true })}
            />
            {errors.video && <span>This field is required</span>}
            // Display error message if the "name" field is not filled 
          </div> */}
          <div className="form-control">
            <label htmlFor="videoType">Video Type:</label>
            <select
              id="videoType"
              className="select select-bordered"
              value={videoType}
              onChange={(e) => setVideoType(e.target.value as VideoType)}
            >
              <option value="normal">Normal Video</option>
              <option value="youtube">YouTube Video</option>
            </select>
          </div>
          {videoType === "normal" ? (
            <div className="form-control">
              <label htmlFor="video">Video:</label>
              <input
                type="file"
                id="video"
                className="input input-bordered"
                placeholder="Video"
                disabled={isSubmitting}
                onChange={onFileChange}
                required={type == "create"}
                // {...register("file", { required: true })}
              />
              {errors.file && <span>This field is required</span>}
            </div>
          ) : (
            <div className="form-control">
              <label htmlFor="video">YouTube Video URL:</label>
              <input
                type="text"
                id="youtubeVideoUrl"
                className="input input-bordered"
                placeholder="YouTube Video URL"
                disabled={isSubmitting}
                {...register("video", { required: true })}
              />
              {errors.video && <span>This field is required</span>}
            </div>
          )}

          <div className="form-control">
            <label htmlFor="duration">Duration in minutes:</label>
            <input
              type="number"
              id="duration"
              placeholder="Duration in minutes"
              disabled={isSubmitting}
              className="input input-bordered"
              min={0}
              {...register("duration", { required: true })}
            />
            {errors.duration && <span>This field is required</span>}
            {/* Display error message if the "duration" field is not filled */}
          </div>

          <div>
            <label htmlFor="material">Material</label>
            <div className="mx-3">
              <div className="form-control">
                <label htmlFor="material">Name:</label>
                <input
                  type="text"
                  id="materialName"
                  className="input input-bordered"
                  placeholder="Material Name"
                  {...register("material.name", { required: true })}
                />
                {errors.material?.name && <span>This field is required</span>}
                {/* Display error message if the "name" field is not filled */}
              </div>
              <div className="form-control">
                <label htmlFor="MaterialUrl">Url:</label>
                <input
                  type="text"
                  id="materialUrl"
                  className="input input-bordered"
                  placeholder="Material Url"
                  {...register("material.link", { required: true })}
                />
                {errors.material?.link && <span>This field is required</span>}
                {/* Display error message if the "name" field is not filled */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flexCenter my-5">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit(onSubmit)}
        >
          {isSubmitting
            ? `${type === "create" ? "Creating" : "Editing"}`
            : `${type === "create" ? "Create" : "Edit"}`}
        </button>
      </div>
    </div>
  )
}

export default LessonForm
