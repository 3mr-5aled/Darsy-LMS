"use client"

import React, { useState } from "react"
import { LoginFormState } from "@/common.types"
import FormField from "@/components/FormField"
import Link from "next/link"

const Login = () => {
  const [form, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
  })

  const handleStateChange = (
    fieldName: keyof LoginFormState,
    value: string
  ) => {
    setForm((prevForm) => ({ ...prevForm, [fieldName]: value }))
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Proceed with the registration logic
    console.log("Registration data:", form)
  }

  return (
    <div className="flexCenter paddings py-10 text-center">
      <div className="card w-96 bg-base-100 flexCenter shadow-xl py-8">
        <div className="prose">
          <h2>تسجيل دخول</h2>
        </div>
        <form onSubmit={handleFormSubmit}>
          <FormField
            title="Email"
            state={form.email}
            placeholder="الإيميل"
            regex={/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/} // Updated regex pattern for email validation
            setState={(value) => handleStateChange("email", value)}
            errorMessage="Invalid Email."
            required={true}
          />

          <FormField
            title="Password"
            state={form.password}
            type="password"
            placeholder="كلمة المرور"
            regex={
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            }
            errorMessage="Invalid Password."
            setState={(value) => handleStateChange("password", value)}
            required={true}
          />
          <button className="btn btn-primary mt-4" type="submit">
            Login
          </button>
        </form>
        <p className="text-center w-full text-gray-500 py-2">
          ليس لديك حساب؟
          <Link href="/register" className="text-gray-700 px-2">
            سجل الأن
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
