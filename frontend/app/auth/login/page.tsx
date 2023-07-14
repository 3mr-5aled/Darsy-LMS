"use client"
import axiosInstance from "@/axios.config"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"

interface IFormInput {
  email: string
  password: string
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>()

  const router = useRouter()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      if (isSubmitting) {
        return
      }

      handleSubmit(async () => {
        try {
          const response = await axiosInstance.post(
            "http://localhost:3000/api/v1/auth/login",
            data
          )
          if (response?.data) {
            toast.success(response.data.message)
            router.push("/")
            router.refresh()
          } else {
            toast.error("An error occurred during login")
          }
        } catch (error: any) {
          console.error(error)
          toast.error(
            error.response?.data?.message || "An error occurred during login"
          )
        }
      })()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flexCenter flex-col p-8">
      <div className="card flexCenter w-96 bg-base-300 shadow-xl prose py-5">
        <h1>تسجيل دخول</h1>
        <div className="w-2/3">
          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text">Email or Phone</span>
            </label>
            <input
              className="input input-bordered w-full"
              id="email"
              type="text"
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^(?:[\w-.]+@([\w-]+\.)+[\w-]{2,4})$/,
                  message: "Invalid email",
                },
              })}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-error">{errors.email.message}</p>
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
            <label htmlFor="Password" className="label">
              <span></span>
              <Link
                href="/auth/reset"
                className="label-text-alt text-secondary"
              >
                هل نسيت كلمة المرور؟
              </Link>
            </label>
            {errors.password && (
              <p className="text-error">{errors.password.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
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
