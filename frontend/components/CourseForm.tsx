"use client"
import React, { ChangeEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { CourseType } from "@/common.types"
import axiosInstance from "@/axios.config"
import { toast } from "react-toastify"
import { GradeOption } from "@/constant"

type Props = {
  title: string
  type: string
  course?: CourseType | null
}

type FormValues = {
  name: string
  description: string
  duration: number
  price: number
  grade: string
  discount: number
  // expiredTime?: Date
}

const CourseForm = ({ title, type, course }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormValues>() // Specify the generic type for useForm

  const [imageBase64, setImageBase64] = useState<string | null | undefined>(
    null
  )
  const [minDate, setMinDate] = useState<string | number | undefined>(undefined)

  useEffect(() => {
    // Get tomorrow's date and set it as the minimum date for the date picker
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1) // Add one day to today's date
    setMinDate(tomorrow.toISOString().split("T")[0])
  }, [])

  const router = useRouter()

  useEffect(() => {
    if (course) {
      setValue("name", course?.name)
      setValue("description", course?.description)
      setValue("duration", course?.duration)
      setValue("price", course?.price)
      setValue("discount", course?.discount)
      // setValue("expiredTime", course?.expiredTime)
      setImageBase64(course?.courseImg || null) // Handle undefined case here
    }
  }, [course, setValue])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData: CourseType = {
      name: data.name,
      description: data.description,
      grade: data.grade,
      image: imageBase64!,
      duration: data.duration,
      price: data.price,
      discount: data?.discount,
      // expiredTime: data?.expiredTime,
    }
    try {
      if (isSubmitting) {
        return
      }

      try {
        await handleSubmit(async () => {
          if (type === "create") {
            const response = await axiosInstance.post(
              "/course/create-course",
              formData
            )
            if (response?.data) {
              toast.success("Course Created")
              router.push(`/admin/courses/manage-course/${response.data._id}`)
            } else {
              toast.error("An error occurred during course creation")
            }
          } else if (type === "edit" && course?._id) {
            await axiosInstance.put(
              `/course/update-course/${course._id}`,
              formData
            )
            toast.success("Course updated successfully")
            router.push(`/admin/courses/manage-course/${course._id}`)
          }
        })()
      } catch (error: any) {
        console.error(error)
        toast.error(error.response?.data?.message || "An error occurred")
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const file = e.target.files?.[0]

    if (!file) return

    if (!file.type.includes("image")) {
      alert("Please upload an image!")
      return
    }

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = () => {
      const result = reader.result as string
      setImageBase64(result)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full p-5 m-5 prose flexCenter card bg-base-300"
    >
      <h1>{title}</h1>
      <div className="flex-col gap-5 flexCenter">
        <div className="flexStart form_image-container">
          {!imageBase64 && (
            <label htmlFor="image" className="flexCenter form_image-label">
              {!imageBase64 && "Choose a poster for your project"}
            </label>
          )}
          <input
            id="image"
            type="file"
            accept="image/*"
            required={type === "create" ? true : false}
            className="form_image-input"
            onChange={(e) => handleChangeImage(e)}
          />
          {imageBase64 && (
            <img
              src={imageBase64}
              className="z-20 object-contain p-3 border-2 border-gray-500 border-dashed sm:p-10"
              alt="image"
            />
          )}
        </div>
        <div className="flex flex-wrap justify-around w-full gap-5">
          <div className="form-control">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              className="input input-bordered"
              placeholder="Name"
              disabled={isSubmitting}
              {...register("name", { required: true })}
            />
            {errors.name && <span>This field is required</span>}
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
          <div className="form-control">
            <label htmlFor="duration">Duration in hours:</label>
            <input
              type="number"
              id="duration"
              placeholder="Duration in hours"
              disabled={isSubmitting}
              className="input input-bordered"
              min={0}
              {...register("duration", { required: true })}
            />
            {errors.duration && <span>This field is required</span>}
            {/* Display error message if the "duration" field is not filled */}
          </div>
          <div className="form-control">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              className="input input-bordered"
              placeholder="Price"
              min={0}
              disabled={isSubmitting}
              {...register("price", { required: true })}
            />
            {errors.price && <span>This field is required</span>}
            {/* Display error message if the "price" field is not filled */}
          </div>
          <div className="form-control w-full">
            <label htmlFor="discount">discount:</label>
            <input
              type="number"
              id="discount"
              className="input input-bordered w-1/2"
              placeholder="Default value zero %"
              min={0}
              max={100}
              disabled={isSubmitting}
              {...register("discount", { required: true })}
            />
            {errors.discount && <span>This field is required</span>}
            {/* Display error message if the "discount" field is not filled */}
          </div>
          <div className="w-full py-3 form-control">
            <label htmlFor="grade">Grade</label>
            <select
              className="w-full max-w-xs select select-bordered"
              id="grade"
              {...register("grade", { required: true })}
            >
              <option value="">Choose Grade</option>
              {GradeOption.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.title}
                </option>
              ))}
            </select>
            {errors.grade && (
              <p className="text-sm text-error">Grade is required</p>
            )}
          </div>
          {/* <div className="form-control w-full">
            <label htmlFor="expiredTime">Date of expire</label>
            <input
              className="w-full input input-bordered"
              id="expiredTime"
              type="date"
              min={minDate}
              max="2050-01-01"
              placeholder="Expiry Date"
              {...register("expiredTime")}
            />
            {errors.expiredTime && (
              <p className="text-sm text-error">Error in Date of expire</p>
            )}
          </div> */}
        </div>
      </div>

      <div className="w-full my-5 flexCenter">
        <button type="submit" className="btn btn-primary">
          {isSubmitting
            ? `${type === "create" ? "Creating" : "Editing"}`
            : `${type === "create" ? "Create" : "Edit"}`}
        </button>
      </div>
    </form>
  )
}

export default CourseForm
