"use client"
import React, { ChangeEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { CourseType } from "@/common.types"
import axiosInstance from "@/axios.config"
import { toast } from "react-toastify"

type Props = {
  title: string
  type: string
  course?: CourseType
}

const CourseForm = ({ title, type, course }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CourseType>() // Specify the generic type for useForm

  const [imageBase64, setImageBase64] = useState<string | null>(null)

  const router = useRouter()

  const onSubmit: SubmitHandler<CourseType> = async (data) => {
    const formData: CourseType = {
      name: data.name,
      description: data.description,
      image: imageBase64!,
      duration: data.duration,
      price: data.price,
    }
    try {
      if (isSubmitting) {
        return
      }

      try {
        await handleSubmit(async () => {
          const response = await axiosInstance.post(
            "/course/createcourse",
            formData
          )
          if (response?.data) {
            toast.success("course Created")
            router.push(`/admin/manage-course/${response.data._id}`)
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
      className="flexCenter card w-full p-5 m-5 bg-base-300 prose"
    >
      <h1>{title}</h1>
      <div className="flexCenter flex-col gap-5">
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
              className="z-20 object-contain sm:p-10 p-3 border-2 border-dashed border-gray-500"
              alt="image"
            />
          )}
        </div>
        <div className="flex justify-around flex-wrap gap-5 w-full">
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
              disabled={isSubmitting}
              {...register("price", { required: true })}
            />
            {errors.price && <span>This field is required</span>}
            {/* Display error message if the "price" field is not filled */}
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

export default CourseForm
