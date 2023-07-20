"use client"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { LessonType } from "@/common.types"
import axiosInstance from "@/axios.config"
import { toast } from "react-toastify"

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

  const router = useRouter()

  const onSubmit: SubmitHandler<LessonType> = async (data) => {
    const formData = new FormData()
    formData.append("video", data.file[0])
    try {
      if (isSubmitting) {
        return
      }
      try {
        const response = await axiosInstance.post(
          `/lesson/${sectionId}/addlesson`,
          formData
        )
        if (response?.data) {
          toast.success(response.data.message)
          router.push(`/admin/manage-course/${courseId}}`)
          onClose() // Close the modal
        } else {
          throw errors
        }
      } catch (error: any) {
        console.error(error)
        toast.error(error.response?.data?.message || "An error occurred")
      }
    } catch (error) {
      console.error(error)
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
            <label htmlFor="video">Video:</label>
            <input
              type="file"
              id="video"
              className="input input-bordered"
              placeholder="Video"
              disabled={isSubmitting}
              {...register("video", { required: true })}
            />
            {errors.video && <span>This field is required</span>}
            {/* Display error message if the "name" field is not filled */}
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
