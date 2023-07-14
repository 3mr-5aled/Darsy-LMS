"use client"
import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import axiosInstance from "@/axios.config"
import { useRouter } from "next/navigation"

interface IFormInput {
  email: string
  resetcode: string
  newpassword: string
  confirmPassword: string
}

const Reset = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>()

  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onSubmitEmail: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true) // Start loading state
    try {
      await axiosInstance.post("/auth/forgetpassword", data)
      setCurrentStep(2)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false) // End loading state
    }
  }

  const onSubmitVerification: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true) // Start loading state
    try {
      await axiosInstance.post("/auth/verifycode", data)
      setCurrentStep(3)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false) // End loading state
    }
  }

  const onSubmitPassword: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true) // Start loading state
    try {
      await axiosInstance.put("/auth/resetpassword", data)
      console.log("Password reset successful")
      router.push("/auth/login")
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false) // End loading state
    }
  }

  const newpassword = React.useRef({})
  newpassword.current = watch("newpassword", "")

  return (
    <form
      className="flexCenter flex-col p-8 min-h-[calc(100dvh-100px)]"
      onSubmit={handleSubmit(() => {})} // Prevent automatic form submission
    >
      {currentStep === 1 && (
        <div className="card flexCenter w-96 bg-base-300 shadow-xl prose py-5">
          <h1>إعادة تعيين كلمة المرور</h1>
          <div className="w-2/3">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="البريد الإلكتروني "
              {...register("email", {
                required: true,
                pattern: {
                  value: /^(?:[\w-.]+@([\w-]+\.)+[\w-]{2,4})$/,
                  message: "البريد الإلكتروني غير صالح",
                },
              })}
              className="input input-bordered"
            />
            {errors.email && (
              <p className="text-error">{errors.email.message}</p>
            )}
            <button
              type="submit"
              className="btn btn-primary w-full my-4"
              onClick={handleSubmit(onSubmitEmail)}
              disabled={isLoading} // Disable the button during loading state
            >
              إرسال
            </button>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="card flexCenter w-96 bg-base-300 shadow-xl prose py-5">
          <h1>التحقق من رمز التحقق</h1>
          <div className="w-2/3">
            <label htmlFor="VerificationCode" className="label">
              Verification Code
            </label>
            <input
              id="VerificationCode"
              type="text"
              placeholder="رمز التحقق"
              {...register("resetcode", { required: true })}
              className="input input-bordered"
            />
            {errors.resetcode && (
              <p className="text-error">يرجى إدخال رمز التحقق</p>
            )}
            <button
              type="submit"
              className="btn btn-primary w-full my-4"
              onClick={handleSubmit(onSubmitVerification)}
            >
              التحقق
            </button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="card flexCenter w-96 bg-base-300 shadow-xl prose py-5">
          <h1>إعادة تعيين كلمة المرور</h1>
          <div className="w-2/3">
            <label htmlFor="NewPassword" className="label">
              New Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="كلمة المرور الجديدة"
              {...register("newpassword", { required: true })}
              className="input input-bordered"
            />
            {errors.newpassword && (
              <p className="text-error">يرجى إدخال كلمة المرور الجديدة</p>
            )}

            <label htmlFor="ConfirmPassword" className="label">
              Confirm Password
            </label>
            <input
              id="ConfirmPassword"
              type="password"
              placeholder="تأكيد كلمة المرور"
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === newpassword.current || "كلمتا المرور غير متطابقتين",
              })}
              className="input input-bordered"
            />

            {errors.confirmPassword && (
              <p className="text-error">{errors.confirmPassword.message}</p>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full my-4"
              onClick={handleSubmit(onSubmitPassword)}
            >
              تأكيد
            </button>
          </div>
        </div>
      )}
    </form>
  )
}

export default Reset
