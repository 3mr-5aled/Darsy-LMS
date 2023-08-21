"use client"
import React, { ChangeEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { CourseType } from "@/common.types"
import axiosInstance from "@/axios.config"
import { toast } from "react-toastify"
import { Options } from "@/constant"
import UploadImageButton from "./UploadImageButton"
import Image from "next/image"

type Props = {
  title: string
  type: string
  course?: CourseType | null
}

type FormValues = {
  name: string
  appearenceDate: number
  description: string
  duration: number
  price: number
  grade: string
  discount: number
  courseImg: {
    src: string
    publicId: string
    fileName: string
  }
  // expiredTime?: Date
}

const CourseForm = ({ title, type, course }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormValues>() // Specify the generic type for useForm

  const [imageURL, setImageURL] = useState("")
  const [publicId, setPublicId] = useState("")
  const [fileName, setFileName] = useState("")

  const handleImageUpload = (url: string, Id: string, file: string) => {
    setValue("courseImg.src", url)
    setValue("courseImg.publicId", Id)
    setValue("courseImg.fileName", file)

    setImageURL(url)
    setPublicId(Id)
    setFileName(file)
  }

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
      setValue("appearenceDate", course?.appearenceDate)
      setValue("description", course?.description)
      setValue("duration", course?.duration)
      setValue("price", course?.price)
      setValue("discount", course?.discount)
      setValue("courseImg.src", course?.courseImg.src)
      setValue("courseImg.publicId", course?.courseImg.publicId)
      setValue("courseImg.fileName", course?.courseImg.fileName)
      // setValue("expiredTime", course?.expiredTime)
      setImageURL(course?.courseImg.src || "/no-course-image.png") // Handle undefined case here
    }
  }, [course, setValue])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData: CourseType = {
      name: data.name,
      appearenceDate: data.appearenceDate,
      description: data.description,
      grade: data.grade,
      isShown: false,
      courseImg: {
        src: imageURL!,
        publicId: publicId,
        fileName: fileName!,
      },
      duration: data.duration,
      price: data.price,
      discount: data?.discount,
      // expiredTime: data?.expiredTime,
    }
    console.log(formData.appearenceDate)
    try {
      if (isSubmitting) {
        return
      }

      try {
        if (!imageURL) {
          // If the image URL is empty, display an error message or take appropriate action
          toast.error("Please upload an image")
          return
        }
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full p-5 m-5 prose flexCenter card bg-base-300"
    >
      <h1>{title}</h1>
      <div className="flex-col gap-5 flexCenter">
        <div className="flex-col flexCenter form_image-container">
          {!imageURL && (
            <label htmlFor="image" className="flexCenter form_image-label">
              {!imageURL && "Choose a poster for your project"}
            </label>
          )}
          {imageURL && (
            <Image
              src={imageURL}
              alt="Uploaded"
              width={300}
              height={300}
              className="z-20 object-contain p-3 border-2 border-gray-500 border-dashed sm:p-10"
            />
          )}
          <div className="my-3">
            <UploadImageButton onImageUpload={handleImageUpload} />
          </div>
        </div>
        <div className="flex flex-wrap justify-around w-full gap-5">
          <div className="form-control w-full">
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
          <div className="form-control w-full">
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
          <div className="form-control w-full">
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
          <div className="form-control w-full">
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
          <div className="w-full md:w-2/6 form-control">
            <label htmlFor="discount">discount:</label>
            <input
              type="number"
              id="discount"
              className="input input-bordered"
              placeholder="Default value zero %"
              min={0}
              max={100}
              disabled={isSubmitting}
              {...register("discount", { required: true })}
            />
            {errors.discount && <span>This field is required</span>}
            {/* Display error message if the "discount" field is not filled */}
          </div>
          <div className="w-full md:w-2/6 form-control">
            <label htmlFor="appearenceDate">Launch Date:</label>
            <input
              type="datetime-local"
              id="appearenceDate"
              className="input input-bordered"
              placeholder="Default value zero %"
              disabled={isSubmitting}
              {...register("appearenceDate", { required: true })}
            />
            {errors.appearenceDate && <span>This field is required</span>}
            {/* Display error message if the "discount" field is not filled */}
          </div>
          <div className="w-full form-control">
            <label htmlFor="grade">Grade</label>
            <select
              className="select select-bordered"
              id="grade"
              {...register("grade", { required: true })}
            >
              <option value="">Choose Grade</option>
              {Options.GradeOption.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.title}
                </option>
              ))}
            </select>
            {errors.grade && (
              <p className="text-sm text-error">Grade is required</p>
            )}
          </div>
          {/* <div className="w-full form-control">
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
