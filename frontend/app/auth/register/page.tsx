"use client"

import axiosInstance from "@/axios.config"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"

type FormValues = {
  name: string
  email: string
  phone: string
  parentsPhone: string
  gender: string
  city: string
  grade: string
  password: string
  confirmPassword: string
  dateOfBirth: string
}

export default function Register() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/register", data)
      console.log(response.data)
      router.push("/")
    } catch (error) {
      console.error(error)
    }
  }

  const password = React.useRef({})
  password.current = watch("password", "")

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flexCenter flex-col p-8">
      <div className="card flexCenter w-96 bg-base-300 shadow-xl prose py-5">
        <h1>تسجيل دخول</h1>
        <div className="w-2/3">
          <div className="form-control py-3">
            <label htmlFor="Name">Name</label>
            <input
              className="input input-bordered w-full"
              id="Name"
              type="text"
              placeholder="Name"
              {...register("name", {
                required: true,
                maxLength: { value: 80, message: "Name is too long" },
                minLength: { value: 3, message: "Name is too short" },
                pattern: {
                  value: /^(?:\b[a-zA-Z]{3,20}\b\s){2}\b[a-zA-Z]{3,20}\b$/i,
                  message:
                    "Invalid name. Please enter a full name with three words, each between 3 and 20 characters.",
                },
              })}
            />
            {errors.name && (
              <p className="text-error text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="form-control py-3 w-full">
            <label htmlFor="Email">Email</label>
            <input
              className="input input-bordered w-full"
              id="Email"
              type="text"
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                  message: "Invalid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-error text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="form-control py-3 w-full">
            <label htmlFor="MobileNumber">Mobile number</label>
            <input
              className="input input-bordered w-full"
              id="MobileNumber"
              type="tel"
              placeholder="Mobile number"
              {...register("phone", {
                required: true,
                minLength: { value: 10, message: "Mobile number is too short" },
                maxLength: { value: 11, message: "Mobile number is too long" },
                pattern: {
                  value: /^\d{11}$/i,
                  message: "Invalid mobile number",
                },
                validate: (value) =>
                  value !== watch("parentsPhone") ||
                  "Mobile number should not be the same as parent number",
              })}
            />
            {errors.phone && (
              <p className="text-error text-sm">{errors.phone.message}</p>
            )}
          </div>
          <div className="form-control py-3 w-full">
            <label htmlFor="ParentNumber">Parent number</label>
            <input
              className="input input-bordered w-full"
              id="ParentNumber"
              type="tel"
              placeholder="Parent number"
              {...register("parentsPhone", {
                required: true,
                pattern: {
                  value: /^\d{11}$/i,
                  message: "Invalid parent number",
                },
                validate: (value) =>
                  value !== watch("phone") ||
                  "Parent number should not be the same as mobile number",
              })}
            />
            {errors.parentsPhone && (
              <p className="text-error text-sm">
                {errors.parentsPhone.message}
              </p>
            )}
          </div>
          <div className="form-control py-3 w-full">
            <label htmlFor="gender">Gender</label>
            <select
              className="select select-bordered w-full max-w-xs"
              id="gender"
              {...register("gender", { required: true })}
            >
              <option value="">Choose Gender</option>
              <option value="ذكر">ذكر</option>
              <option value="أنثي">أنثي</option>
            </select>
            {errors.gender && (
              <p className="text-error text-sm">Gender is required</p>
            )}
          </div>
          <div className="form-control py-3 w-full">
            <label htmlFor="city">City</label>
            <select
              className="select select-bordered w-full max-w-xs"
              id="city"
              {...register("city", { required: true })}
            >
              <option value="">Choose City</option>
              <option value="القاهرة">القاهرة</option>
              <option value="الجيزة">الجيزة</option>
            </select>
            {errors.city && (
              <p className="text-error text-sm">City is required</p>
            )}
          </div>
          <div className="form-control py-3 w-full">
            <label htmlFor="grade">Grade</label>
            <select
              className="select select-bordered w-full max-w-xs"
              id="grade"
              {...register("grade", { required: true })}
            >
              <option value="">Choose Grade</option>
              <option value="أولى ثانوي">أولى ثانوي</option>
              <option value="تانية ثانوي">تانية ثانوي</option>
              <option value="تالتة ثانوي">تالتة ثانوي</option>
            </select>
            {errors.grade && (
              <p className="text-error text-sm">Grade is required</p>
            )}
          </div>
          <div className="form-control py-3 w-full">
            <label htmlFor="Password">Password</label>
            <input
              className="input input-bordered w-full"
              id="Password"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: true,
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
                  message:
                    "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character.",
                },
              })}
            />
            {errors.password && (
              <p className="text-error text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="form-control py-3 w-full">
            <label htmlFor="ConfirmPassword">Confirm Password</label>
            <input
              className="input input-bordered w-full"
              id="ConfirmPassword"
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: true,
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
                  message: "Passwords do not match",
                },
                validate: (value) =>
                  value === password.current ||
                  "The confirm password does not match the password",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-error text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="form-control py-3 w-full">
            <label htmlFor="DateOfBirth">Date of Birth</label>
            <input
              className="input input-bordered w-full"
              id="DateOfBirth"
              type="date"
              min="2000-01-01"
              max="2020-01-01"
              placeholder="Date of Birth"
              {...register("dateOfBirth", { required: true })}
            />
            {errors.dateOfBirth && (
              <p className="text-error text-sm">Date of Birth is required</p>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-full my-3">
            Submit
          </button>
        </div>
        <p>
          لديك حساب بالفعل؟{" "}
          <Link href="/auth/login" className="text-secondary">
            سجل دخولك
          </Link>
        </p>
      </div>
    </form>
  )
}
