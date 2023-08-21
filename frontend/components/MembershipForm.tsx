"use client"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { MembershipType } from "@/common.types" // Make sure to import MembershipType from the correct path
import axiosInstance from "@/axios.config"
import { toast } from "react-toastify"
import { GradeOption } from "@/constant"
import { useRouter } from "next/navigation"

type MembershipFormProps = {
  title: string
  type: string
  membership?: MembershipType | null
}

type FormValues = {
  name: string
  grade: string
  expiredTime: number
  discount: number
  description: string
  price: number
  disabled: boolean
}

const MembershipForm: React.FC<MembershipFormProps> = ({
  title,
  type,
  membership,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormValues>()
  const router = useRouter()

  React.useEffect(() => {
    if (membership) {
      setValue("name", membership.name)
      setValue("grade", membership.grade)
      setValue("expiredTime", membership.expiredTime)
      setValue("discount", membership.discount)
      setValue("description", membership.description)
      setValue("price", membership.price)
      setValue("disabled", membership.disabled)
    }
  }, [membership, setValue])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData: MembershipType = {
      name: data.name,
      grade: data.grade,
      expiredTime: data.expiredTime,
      discount: data.discount,
      description: data.description,
      price: data.price,
      disabled: data.disabled, // Step 3: Include the isDisabled value in the form data
    }
    try {
      if (isSubmitting) {
        return
      }

      try {
        await handleSubmit(async () => {
          if (!membership) {
            const response = await axiosInstance.post(
              "/member/create-member",
              formData
            )
            if (response?.data) {
              toast.success("Membership Created")
              // Handle the appropriate redirection here
            } else {
              toast.error("An error occurred during membership creation")
            }
          } else {
            await axiosInstance.put(
              `/member/update-member/${membership._id}`,
              formData
            )
            toast.success("Membership updated successfully")
            // Handle the appropriate redirection here
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
      className="w-full p-5 m-5 flexCenter card bg-base-300"
    >
      <h1 className="mt-3 mb-5 text-4xl font-bold">{title}</h1>
      <div className="flex-col gap-5 flexCenter">
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
        </div>

        <div className="w-full form-control">
          <label htmlFor="grade">Grade</label>
          <select
            className="select select-bordered"
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

        <div className="form-control">
          <label htmlFor="expiredTime">Expired Time (in days):</label>
          <input
            type="number"
            id="expiredTime"
            className="input input-bordered"
            placeholder="Expired Time"
            disabled={isSubmitting}
            {...register("expiredTime", { required: true })}
          />
          {errors.expiredTime && <span>This field is required</span>}
        </div>

        <div className="form-control">
          <label htmlFor="discount">Discount:</label>
          <input
            type="number"
            id="discount"
            className="input input-bordered"
            placeholder="Discount ( 0 No Discount )"
            disabled={isSubmitting}
            {...register("discount", { required: true })}
          />
          {errors.discount && <span>This field is required</span>}
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
        </div>

        <div className="flex-row gap-3 form-control">
          <label htmlFor="disabled">Disabled:</label>
          <input
            className="toggle"
            type="checkbox"
            id="disabled"
            disabled={isSubmitting}
            {...register("disabled")}
          />
        </div>

        <div className="w-full gap-3 my-5 flexCenter">
          <button
            type="button"
            className="btn btn-primary btn-outline"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isSubmitting
              ? membership
                ? "Editing Membership"
                : "Creating Membership"
              : membership
              ? "Edit Membership"
              : "Create Membership"}
          </button>
        </div>
      </div>
    </form>
  )
}

export default MembershipForm
