"use client"
import React, { ChangeEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { CourseType, SectionType } from "@/common.types"
import axiosInstance from "@/axios.config"
import { toast } from "react-toastify"

type Props = {
  title: string
  type: "create" | "edit"
  section?: SectionType
  courseId: string | undefined
  onClose: () => void // Function to close the modal
}

const SectionForm = ({ title, type, section, courseId, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<SectionType>() // Specify the generic type for useForm

  const router = useRouter()

  useEffect(() => {
    if (section) {
      setValue("title", section?.title)
      setValue("duration", section?.duration)
    }
  }, [section, setValue])

  const onSubmit: SubmitHandler<SectionType> = async (data) => {
    try {
      if (isSubmitting) {
        return
      }

      try {
        if (type === "create") {
          const response = await axiosInstance.post(
            `/section/${courseId}/addsection`,
            data
          )
          if (response?.data) {
            toast.success("Section created")
            router.push(`/admin/courses/manage-course/${courseId}`)
            onClose()
          } else {
            toast.error("An error occurred during section creation")
          }
        } else if (type === "edit" && section?._id) {
          await axiosInstance.put(`/section/updatesection/${section._id}`, data)
          toast.success("Section updated successfully")
          router.push(`/admin/courses/manage-course/${courseId}`)
          onClose()
        }
      } catch (error: any) {
        console.error(error)
        toast.error(
          error.response?.data?.message ||
            "An error occurred during section creation"
        )
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col items-center w-full p-5 prose">
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
        {/* {type === "edit" && (
          <button
            type="button"
            className="btn btn-error ml-3"
            onClick={() => deleteSection(section?._id)}
          >
            Delete
          </button>
        )} */}
      </div>
    </div>
  )
}

export default SectionForm
