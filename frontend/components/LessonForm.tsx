"use client"
import React, { ChangeEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { CourseType, LessonType } from "@/common.types"
import axiosInstance from "@/axios.config"
import { toast } from "react-toastify"

type Props = {
  title: string
  type: "create" | "edit"
  lesson?: LessonType
  sectionId: string | undefined
}

const LessonForm = ({ title, type, lesson, sectionId }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LessonType>() // Specify the generic type for useForm

  const [form, setForm] = useState<LessonType>({
    title: "",
    duration: "",
    material: "",
    video: "",
  })

  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const onSubmit: SubmitHandler<LessonType> = async (data) => {
    try {
      if (isSubmitting) {
        return
      }

      try {
        await handleSubmit(async () => {
          const response = await axiosInstance.post(
            `/lesson/${sectionId}/addlesson`,
            data
          )
          if (response?.data) {
            toast.success(response.data.message)
            router.push("/admin/manage-course")
          } else {
            toast.error("An error occurred during login")
          }
        })()
      } catch (error: any) {
        console.error(error)
        toast.error(
          error.response?.data?.message || "An error occurred during login"
        )
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flexCenter card w-full p-5 m-5 bg-base-300 prose"
    >
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
              {...register("title", { required: true })}
            />
            {errors.title && <span>This field is required</span>}
            {/* Display error message if the "name" field is not filled */}
          </div>

          <div className="form-control">
            <label htmlFor="duration">Duration in hours:</label>
            <input
              type="number"
              id="duration"
              placeholder="Duration in hours"
              className="input input-bordered"
              min={0}
              {...register("duration", { required: true })}
            />
            {errors.duration && <span>This field is required</span>}
            {/* Display error message if the "duration" field is not filled */}
          </div>
        </div>
      </div>

      <div className="w-full flexCenter my-5">
        <button type="submit" className="btn btn-primary">
          {isSubmitting
            ? `${type === "create" ? "Creating" : "Editing"}`
            : `${type === "create" ? "Create" : "Edit"}`}
        </button>
      </div>
    </form>
  )
}

export default LessonForm
