"use client"
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"

interface IFormInput {
  EmailOrPhone: string
}

const Reset = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/reset",
        data
      )
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flexCenter flex-col p-8">
      <div className="card flexCenter w-96 bg-base-300 shadow-xl prose py-5">
        <h1>إعادة تعيين كلمة المرور</h1>
        <div className="w-2/3">
          <label htmlFor="EmailOrPhone" className="label">
            Email or Phone number{" "}
          </label>
          <input
            id="EmailOrPhone"
            type="text"
            placeholder="البريد الإلكتروني أو رقم الهاتف"
            {...register("EmailOrPhone", {
              required: "true",
              pattern: {
                value: /^(?:[\w-.]+@([\w-]+\.)+[\w-]{2,4})$|^\d{11}$/,
                message: "البريد الإلكتروني أو رقم الهاتف غير صالح",
              },
            })}
            className="input input-bordered"
          />
          {errors.EmailOrPhone && (
            <p className="text-error">{errors.EmailOrPhone.message}</p>
          )}
          <button type="submit" className="btn btn-primary w-full my-4">
            إرسال
          </button>
          <p className="text-center">
            ليس لديك حساب؟{" "}
            <Link href="/auth/login" className="text-secondary">
              سجل الأن
            </Link>
          </p>
        </div>
      </div>
    </form>
  )
}

export default Reset
