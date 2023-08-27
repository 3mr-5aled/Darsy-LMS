"use client"
import { toast } from "react-toastify"
import axiosInstance from "@/axios.config"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useUserContext } from "@/contexts/userContext"
import { BsEye, BsEyeSlash } from "react-icons/bs"

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
  } = useForm<IFormInput>()

  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false)

  const { state, setUser, clearUser } = useUserContext()
  const { user } = state

  if (user) {
    const signOut = async () => {
      setIsSigningOut(true)
      try {
        await axiosInstance.get("/auth/signout")
        clearUser()
        toast.success("Signed out successfully")
        setIsSigningOut(false)
        router.push("/")
      } catch (error: any) {
        toast.error(error.message)
        setIsSigningOut(false)
      }
    }
    return (
      <div className="flexCenter flex-col p-8 h-screen">
        <div className="flexCenter flex-col w-full md:w-96 prose py-5">
          <p className="text-xl font-bold">You are already Signed in</p>
          <div className="space-x-4">
            <button className="btn btn-primary btn-outline" onClick={signOut}>
              Sign out
            </button>
            <Link href="/" className="btn btn-primary">
              Back to HomePage
            </Link>
          </div>
        </div>
      </div>
    )
  }

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
            <div className="relative">
              <input
                className="input input-bordered w-full pr-10"
                id="Password"
                type={showPassword ? "text" : "password"} // Use showPassword state to toggle input type
                placeholder="Password"
                {...register("password", {
                  required: true,
                  // pattern: {
                  //   value:
                  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  //   message:
                  //     "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character.",
                  // },
                })}
                disabled={isSubmitting}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-2 flex items-center"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility on button click
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}{" "}
                {/* Toggle button text */}
              </button>
            </div>
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
