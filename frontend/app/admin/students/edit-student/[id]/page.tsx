"use client"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import axiosInstance from "@/axios.config"
import { UserType } from "@/common.types"
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify"
import Loading from "@/app/loading"
import { CityOption, GenderOption, GradeOption, RoleOption } from "@/constant"

const EditStudent = () => {
  const router = useRouter()
  const { id } = useParams()

  const [user, setUser] = useState<UserType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const goBack = () => {
    router.back()
  }

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<UserType>()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get<UserType>(
          `/user/get-user/${id}`
        )
        // @ts-ignore
        setUser(response.data.user)
        setIsLoading(false)

        // Pre-fill form fields with user data
        // @ts-ignore
        if (response.data.user) {
          const {
            name,
            email,
            phone,
            parentsPhone,
            dateOfBirth,
            role,
            gender,
            grade,
            city,
            // @ts-ignore
          } = response.data.user
          setValue("name", name)
          setValue("email", email)
          setValue("phone", phone)
          setValue("parentsPhone", parentsPhone)
          setValue("dateOfBirth", dateOfBirth)
          setValue("role", role)
          setValue("gender", gender)
          setValue("grade", grade)
          setValue("city", city)
        }
      } catch (error: any) {
        setError("An error occurred while fetching user.")
        setIsLoading(false)
      }
    }

    if (id) {
      fetchUser()
    }
  }, [id, setValue])

  const onSubmit: SubmitHandler<UserType> = async (data) => {
    try {
      await axiosInstance.put(`/user/update-user/${id}`, data)
      // Redirect to the user details page or show a success message
      toast.success("User updated successfully")
      router.push(`/admin/students/manage-student/${id}`)
    } catch (error) {
      setError("An error occurred while saving changes.")
    }
  }

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="p-5 m-5">
      <div className="mb-8 prose text-center">
        <h1>Edit Student</h1>
      </div>
      <form
        className="grid grid-cols-2 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="font-bold">Name:</div>
        <input
          className="input input-bordered"
          type="text"
          {...register("name", { required: true })}
        />
        {errors.name && <span className="text-red-600">Name is required</span>}

        <div className="font-bold">Email:</div>
        <input
          className="input input-bordered"
          type="text"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-red-600">Email is required</span>
        )}

        <div className="font-bold">Phone:</div>
        <input
          className="input input-bordered"
          type="text"
          {...register("phone", { required: true })}
        />
        {errors.phone && (
          <span className="text-red-600">Phone is required</span>
        )}

        <div className="font-bold">Parents Phone:</div>
        <input
          className="input input-bordered"
          type="text"
          {...register("parentsPhone", { required: true })}
        />
        {errors.parentsPhone && (
          <span className="text-red-600">Parents Phone is required</span>
        )}
        <div className="font-bold">Date Of Birth:</div>
        <input
          className="input input-bordered"
          type="text"
          {...register("dateOfBirth", { required: true })}
        />
        {errors.dateOfBirth && (
          <span className="text-red-600">Date Of Birth is required</span>
        )}
        <div className="w-full py-3 form-control">
          <label htmlFor="grade">Grade</label>
          <select
            className="w-full max-w-xs select select-bordered"
            id="grade"
            {...register("grade", { required: true })}
          >
            <option value="">Choose Grade</option>
            {GradeOption.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.grade && (
            <p className="text-sm text-error">Grade is required</p>
          )}
        </div>
        <div className="w-full py-3 form-control">
          <label htmlFor="gender">Gender</label>
          <select
            className="w-full max-w-xs select select-bordered"
            id="gender"
            {...register("gender", { required: true })}
          >
            <option value="">Choose Gender</option>
            {GenderOption.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.gender && (
            <p className="text-sm text-error">Gender is required</p>
          )}
        </div>
        <div className="w-full py-3 form-control">
          <label htmlFor="role">Role</label>
          <select
            className="w-full max-w-xs select select-bordered"
            id="role"
            {...register("role", { required: true })}
          >
            <option value="">Choose Role</option>
            {RoleOption.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.role && (
            <p className="text-sm text-error">Gender is required</p>
          )}
        </div>

        <div className="w-full py-3 form-control">
          <label htmlFor="city">City</label>
          <select
            className="w-full max-w-xs select select-bordered"
            id="city"
            {...register("city", { required: true })}
          >
            <option value="">Choose City</option>
            {CityOption.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.city && (
            <p className="text-sm text-error">City is required</p>
          )}
        </div>

        {/* Add other form fields here with appropriate validation */}

        <div className="flex justify-center col-span-2 mt-5 space-x-4">
          <button type="button" className="btn btn-secondary" onClick={goBack}>
            Back
          </button>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditStudent
