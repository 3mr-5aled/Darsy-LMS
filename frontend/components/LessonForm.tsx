"use client"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm, useWatch } from "react-hook-form"
import { LessonType } from "@/common.types"
import axiosInstance from "@/axios.config"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import UploadVideoButton from "./UploadVideoButton"

type Props = {
  PageTitle: string
  type: "create" | "edit"
  lesson?: LessonType
  sectionId: string | undefined
  courseId: string | undefined
  // onClose: () => void // Function to close the modal
}

const LessonForm = ({
  PageTitle,
  type,
  lesson,
  sectionId,
  courseId,
}: // onClose,
Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    control,
  } = useForm<LessonType>() // Specify the generic type for useForm

  // const [file, setFile] = useState<File | null>(null)
  const router = useRouter()

  const [videoURL, setVideoURL] = useState("")
  const [publicId, setPublicId] = useState("")
  const [fileName, setFileName] = useState("")

  const handleVideoUpload = (url: string, Id: string, file: string) => {
    setValue("video.src", url)
    setValue("video.publicId", Id)
    setValue("video.fileName", file)

    setVideoURL(url)
    setPublicId(Id)
    setFileName(file)
  }

  // const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     setFile(e.target.files[0]) // Set the selected file to the state
  //   }
  // }
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
        setValue("video.publicId", lesson.video?.publicId || "")
        setValue("video.fileName", lesson.video?.fileName || "")
        setValue("video.provider", lesson.video?.provider || "")
        setValue("video.src", lesson.video?.src || "") // Use "video.src" instead of "video"
      }
    }
  }, [])

  const videoType = useWatch({
    control,
    name: "video.provider",
    defaultValue: "normal",
  })

  // const uploadVideo = async () => {
  //   if (videoType === "normal" && file) {
  //     try {
  //       const formData = new FormData()
  //       formData.append("file", file)
  //       const response = await axiosInstance.post("/upload", formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data", // Set the correct content type for file uploads
  //         },
  //       })
  //       toast.success("Video uploaded")
  //       setValue("video.src", response.data.secure_url)

  //       console.log(response.data.secure_url)
  //       return response.data.secure_url
  //     } catch (error) {
  //       console.error(error)
  //       toast.error("Error uploading video")
  //       return null
  //     }
  //   }
  //   return null
  // }

  const onSubmit: SubmitHandler<LessonType> = async (data) => {
    try {
      if (isSubmitting) {
        return
      }

      setValue("title", data.title)
      setValue("description", data.description)
      setValue("duration", data.duration.toString())
      setValue("material.name", data.material?.name || "")
      setValue("material.link", data.material?.link || "")
      setValue("courseId", courseId || "")
      setValue("sectionId", sectionId || "")
      setValue("video.provider", videoType)
      setValue("video.src", videoURL)
      setValue("video.publicId", publicId) // Use "video.src" instead of "video"
      setValue("video.fileName", fileName) // Use "video.src" instead of "video"

      if (videoType === "normal") {
        // if (videoType === "normal" && file) {
        //   try {
        //     const formData = new FormData()
        //     formData.append("file", file)
        //     const response = await axiosInstance.post("/upload", formData, {
        //       headers: {
        //         "Content-Type": "multipart/form-data", // Set the correct content type for file uploads
        //       },
        //     })
        //     toast.success("Video uploaded")
        //     setValue("video.src", response.data.secure_url)
        //     setValue("video.provider", "normal")
        //     setValue("video.public_id", response.data.public_id)
        //   } catch (error) {
        //     console.error(error)
        //     toast.error("Error uploading video")
        //     return null
        //   }
        // }

        // if (videoUrl === null) {
        //   if (videoType === "normal" && type === "create") {
        //     toast.error("Please select a file to upload.")
        //     return
        //   }
        // }
        if (type === "create") {
          const response = await axiosInstance.post(
            `/lesson/${sectionId}/add-lesson`,
            data
          )
          reset()

          toast.success("Lesson added")
          router.push(`/admin/courses/manage-course/${courseId}`)
        } else if (type === "edit" && lesson?._id) {
          await axiosInstance.put(`/lesson/update-lesson/${lesson._id}`, data)
          reset()

          toast.success("Lesson updated successfully")
          router.push(`/admin/courses/manage-course/${courseId}`)
        }
      } else if (videoType === "youtube") {
        // Check if data.video exists and has a valid src property
        if (data.video?.src) {
          setValue("video.src", data.video.src)
        } else {
          toast.error("Please provide a valid YouTube video URL.")
          return
        }
        if (type === "create") {
          const response = await axiosInstance.post(
            `/lesson/${sectionId}/add-lesson`,
            data
          )
          reset()
          toast.success("Lesson added")
          router.push(`/admin/courses/manage-course/${courseId}`)
        } else if (type === "edit" && lesson?._id) {
          await axiosInstance.put(`/lesson/update-lesson/${lesson._id}`, data)
          reset()
          toast.success("Lesson updated successfully")
          router.push(`/admin/courses/manage-course/${courseId}`)
        }
      }
    } catch (error: any) {
      console.error(error)
      toast.error(error.response?.data?.message || "An error occurred")
    } finally {
      // onClose() // Call onClose in the finally block to ensure it gets executed even in case of errors
    }
  }

  return (
    <div className="flexCenter flex-col w-full p-5 ">
      <h1 className="text-4xl font-bold my-5">{PageTitle}</h1>
      <div className="flexCenter flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="lg:col-span-2 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="lg:col-span-1 space-y-2">
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
            </div>
            <div className="lg:col-span-1">
              <div className="form-control">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  className="textarea textarea-bordered w-full min-w-[16rem] max-w-xs"
                  rows={4}
                  {...register("description", { required: true })}
                  placeholder="Description"
                  disabled={isSubmitting}
                />
                {errors.description && <span>This field is required</span>}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="form-control">
              <label htmlFor="videoType">Video Type:</label>
              <select
                id="videoType"
                className="select select-bordered"
                disabled={isSubmitting}
                {...register("video.provider")}
              >
                <option value="normal">Normal Video</option>
                <option value="youtube">YouTube Video</option>
              </select>
            </div>
            {videoType === "normal" ? (
              <div className="form-control space-y-4">
                <input
                  type="text"
                  id="youtubeVideoUrl"
                  className="input input-bordered"
                  placeholder="uploaded video url"
                  disabled={true}
                  {...register("video.src")}
                />
                <UploadVideoButton onVideoUpload={handleVideoUpload} />

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
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="material" className="text-xl font-bold mb-2">
              Material:
            </label>
            <div className="flex flex-row flex-wrap">
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
              </div>
              <div className="lg:col-span-1">
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
