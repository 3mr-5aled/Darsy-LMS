"use client"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { LessonType, VideoType } from "@/common.types"
import axiosInstance from "@/axios.config"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"

type Props = {
  PageTitle: string
  type: "create" | "edit"
  lesson?: LessonType
  sectionId: string | undefined
  courseId: string | undefined
  onClose: () => void // Function to close the modal
}

const LessonForm = ({
  PageTitle,
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
    setValue,
  } = useForm<LessonType>() // Specify the generic type for useForm

  const [videoType, setVideoType] = useState<VideoType>("normal")
  const [file, setFile] = useState<File | null>(null)
  const router = useRouter()

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]) // Set the selected file to the state
    }
  }

  const VideoTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "youtube") {
      setValue("video.provider", "youtube")
    } else {
      setValue("video.provider", "normal")
    }
    setVideoType(e.target.value as VideoType)
  }

  //  const [videoSrc , seVideoSrc] = useState("");
  //     const handleChange = ({file}) => {
  //       var reader = new FileReader();
  //       console.log(file)
  //       var url = URL.createObjectURL(file.originFileObj);
  //       seVideoSrc(url);
  //   };

  useEffect(() => {
    if (lesson) {
      setValue("title", lesson.title)
      setValue("description", lesson.description)
      setValue("duration", lesson.duration)
      setValue("material.name", lesson.material?.name || "")
      setValue("material.link", lesson.material?.link || "")
      if (lesson.video) {
        setValue("video.provider", lesson.video?.provider || "")
        setValue("video.src", lesson.video?.src || "") // Use "video.src" instead of "video"
        setVideoType(lesson.video?.provider || "normal")
      }
    }
  }, [])

  const uploadVideo = async () => {
    if (videoType === "normal" && file) {
      const uploadResponse = await axiosInstance.post("/upload", file)
      return uploadResponse.data.url
    }
    return null
  }

  const onSubmit: SubmitHandler<LessonType> = async (data) => {
    try {
      var videoUrl
      if (isSubmitting) {
        return
      }
      if (videoType === "normal") {
        videoUrl = await uploadVideo()

        if (videoUrl === null) {
          if (videoType === "normal" && type === "create") {
            toast.error("Please select a file to upload.")
            return
          }
        }
      }
      console.log(data)

      setValue("title", data.title)
      setValue("description", data.description)
      setValue("duration", data.duration.toString())
      setValue("material.name", data.material?.name || "")
      setValue("material.link", data.material?.link || "")
      setValue("courseId", courseId || "")
      setValue("sectionId", sectionId || "")
      setValue("video.provider", videoType)
      setValue("video.src", videoUrl)

      console.log(data)

      if (videoType === "normal") {
        if (type === "create") {
          const response = await axiosInstance.post(
            `/lesson/${sectionId}/add-lesson`,
            data
          )
          toast.success("Lesson added")
          router.push(`/admin/courses/manage-course/${courseId}`)
        } else if (type === "edit" && lesson?._id) {
          await axiosInstance.put(`/lesson/update-lesson/${lesson._id}`, data)
          toast.success("Lesson updated successfully")
          router.push(`/admin/courses/manage-course/${courseId}`)
        }
      } else if (videoType === "youtube") {
        if (type === "create") {
          const response = await axiosInstance.post(
            `/lesson/${sectionId}/add-lesson`,
            data
          )
          toast.success("Lesson added")
          router.push(`/admin/courses/manage-course/${courseId}`)
        } else if (type === "edit" && lesson?._id) {
          await axiosInstance.put(`/lesson/update-lesson/${lesson._id}`, data)
          toast.success("Lesson updated successfully")
          router.push(`/admin/courses/manage-course/${courseId}`)
        }
      }

      onClose() // Close the modal
    } catch (error: any) {
      console.error(error)
      toast.error(error.response?.data?.message || "An error occurred")
    }
  }

  return (
    <div className="flexCenter flex-col w-full p-5 prose">
      <h1>{PageTitle}</h1>
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
          </div>
          <div className="form-control">
            <label htmlFor="videoType">Video Type:</label>
            <select
              id="videoType"
              className="select select-bordered"
              value={videoType}
              onChange={VideoTypeChange}
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
                className="file-input file-input-bordered w-full max-w-xs"
                placeholder="Video"
                disabled={isSubmitting}
                onChange={onFileChange}
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
                {...register("video.src")}
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flexCenter my-5">
        <button
          type="button"
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
