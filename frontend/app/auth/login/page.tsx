"use client"
import Link from "next/link"
import React from "react"
import { useForm } from "react-hook-form"

interface IFormInput {
  EmailOrPhone: string
  Password: string
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit = (data: IFormInput) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flexCenter flex-col p-8">
      <div className="card flexCenter w-96 bg-base-300 shadow-xl prose py-5">
        <h1>تسجيل دخول</h1>
        <div className="w-2/3">
          <div className="form-control">
            <label htmlFor="EmailOrPhone" className="label">
              <span className="label-text">Email or Phone</span>
            </label>
            <input
              className="input input-bordered w-full"
              id="EmailOrPhone"
              type="text"
              placeholder="Email, Phone"
              {...register("EmailOrPhone", {
                required: "Email or phone is required",
                pattern: {
                  value: /^(?:[\w-.]+@([\w-]+\.)+[\w-]{2,4})$|^\d{11}$/,
                  message: "Invalid email or phone",
                },
              })}
            />
            {errors.EmailOrPhone && (
              <p className="text-error">{errors.EmailOrPhone.message}</p>
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
              {...register("Password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character.",
                },
              })}
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
            {errors.Password && (
              <p className="text-error">{errors.Password.message}</p>
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
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
