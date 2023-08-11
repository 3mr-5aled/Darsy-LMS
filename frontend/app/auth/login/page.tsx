"use client"
import { toast } from "react-toastify"
import axiosInstance from "@/axios.config"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useUserContext } from "@/contexts/userContext"
import { headers } from "next/dist/client/components/headers"

interface IFormInput {
  email?: string
  phone?: string
  emailOrPhone: string
  password: string
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<IFormInput>()

  const router = useRouter()
  const { setUser } = useUserContext()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      // const {data} = await axiosInstance.get("/auth/csrf")
      // document.cookie=`_csrf=${data}`
      const value = data.emailOrPhone
      const isEmail = /^(?:[\w-.]+@([\w-]+\.)+[\w-]{2,4})$/i.test(value)
      const formData: IFormInput = {
        email: isEmail ? value : undefined,
        phone: !isEmail ? value : undefined,
        emailOrPhone: value,
        password: data.password,
      }

      if (isSubmitting) {
        return
      }

      try {
        await handleSubmit(async () => {
          const response = await axiosInstance.post("/auth/login", formData)
          if (response?.data) {
            toast.success(response.data.message)
            setUser(response.data)
            router.push("/")
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
    <form onSubmit={handleSubmit(onSubmit)} className="flexCenter flex-col p-8">
      <div className="card flexCenter w-full md:w-96 bg-base-300 shadow-xl prose py-5">
        <h1>تسجيل دخول</h1>
        <div className="w-2/3">
          <div className="form-control">
            <label htmlFor="emailOrPhone" className="label">
              <span className="label-text">Email or Phone</span>
            </label>
            <input
              className="input input-bordered w-full"
              id="emailOrPhone"
              type="text"
              placeholder="Email or Phone"
              {...register("emailOrPhone", {
                required: true,
                pattern: {
                  value: /^(?:[\w-.]+@([\w-]+\.)+[\w-]{2,4})$|^\d{11}$/,
                  message: "Invalid email or phone number",
                },
              })}
              disabled={isSubmitting}
            />
            {errors.emailOrPhone && (
              <p className="text-error">{errors.emailOrPhone.message}</p>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="Password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              className="input input-bordered w-full"
              id="Password"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: true,
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character.",
                },
              })}
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="text-error">{errors.password.message}</p>
            )}
          </div>
        </div>
        <p>
          هل نسيت كلمة المرور؟{" "}
          <Link href="/auth/reset" className="text-secondary">
            استعدها الأن
          </Link>
        </p>

        <button
          type="submit"
          className="btn btn-primary mt-5"
          disabled={isSubmitting}
        >
          Log in
        </button>
        <p>
          ليس لديك حساب؟{" "}
          <Link href="/auth/register" className="text-secondary">
            سجل الأن
          </Link>
        </p>
      </div>
    </form>
  )
}

export default Login
