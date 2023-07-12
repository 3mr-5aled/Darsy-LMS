"use client"

import React, { useState } from "react"
import { RegisterFormState } from "@/common.types"
import FormField from "@/components/FormField"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { CityOption, GenderOption } from "@/constant"
import SelectMenu from "@/components/SelectMenu"
import Link from "next/link"

const Register = () => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [passwordNotEqual, setPasswordNotEqual] = useState<boolean | null>(null)
  const [form, setForm] = useState<RegisterFormState>({
    name: "",
    avatar: "",
    gender: "",
    phone: "",
    dateOfBirth: selectedDate || "",
    city: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleStateChange = (
    fieldName: keyof RegisterFormState,
    value: string
  ) => {
    setForm((prevForm) => ({ ...prevForm, [fieldName]: value }))
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Check if the password and confirm password match
    if (form.password !== form.confirmPassword) {
      console.log("Passwords do not match")
      setPasswordNotEqual(true)
      console.log(form)

      // You can display an error message or take appropriate action here
      return
    }
    setPasswordNotEqual(false)
    // Proceed with the registration logic
    console.log("Registration data:", form)
  }

  return (
    <div className="flexCenter paddings py-10 text-center">
      <div className="card w-96 bg-base-100 flexCenter shadow-xl py-8">
        <div className="prose">
          <h2>تسجيل حساب جديد</h2>
        </div>
        <form onSubmit={handleFormSubmit}>
          <FormField
            title="Name"
            state={form.name}
            placeholder="اسمك ثلاثي"
            regex={/^(?:\b[a-zA-Z]{3,20}\b\s){2}\b[a-zA-Z]{3,20}\b$/}
            errorMessage="Invalid name. Please enter a full name with three words, each between 3 and 20 characters."
            setState={(value) => handleStateChange("name", value)}
            required={true}
          />
          <FormField
            title="Email"
            state={form.email}
            placeholder="الإيميل"
            regex={/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/} // Updated regex pattern for email validation
            setState={(value) => handleStateChange("email", value)}
            errorMessage="Invalid Email."
            required={true}
          />
          <div className="form-control w-full max-w-xs my-3">
            <label htmlFor="" className="label">
              <span className="label-text">النوع</span>
            </label>
            <SelectMenu
              title={GenderOption.title}
              options={GenderOption.options}
              setState={(value) => handleStateChange("gender", value)}
            />
          </div>
          <div className="form-control w-full max-w-xs my-3">
            <label htmlFor="" className="label">
              <span className="label-text">يوم ميلادك</span>
            </label>
            <DatePicker
              className="w-full p-2 bg-base-100 border-2 input-bordered rounded-md"
              selected={selectedDate}
              onChange={(date: any) => setSelectedDate(date)}
              placeholderText={"dd/mm/yyyy"}
              filterDate={(date: any) =>
                date.getDay() !== 6 && date.getDay() !== 0
              } // weekends cancel
              showYearDropdown // year show and scrolldown alos
              scrollableYearDropdown
            />
          </div>
          <FormField
            title="Phone"
            state={form.phone}
            placeholder="رقم الهائف"
            regex={/^\d{11}$/} // Regex pattern for a 10-digit phone number
            errorMessage="Invalid phone number must be like 01012345678" // Error message to display for an invalid phone number
            setState={(value) => handleStateChange("phone", value)}
            required={true}
          />
          <div className="form-control w-full max-w-xs my-3">
            <label htmlFor="" className="label">
              <span className="label-text">مدينتك</span>
            </label>
            <SelectMenu
              title={CityOption.title}
              options={CityOption.options}
              setState={(value) => handleStateChange("city", value)}
            />
          </div>
          <FormField
            title="Password"
            state={form.password}
            type="password"
            placeholder="كلمة المرور"
            regex={
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            }
            errorMessage="Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character."
            setState={(value) => handleStateChange("password", value)}
            required={true}
          />
          <FormField
            title="Confirm Password"
            state={form.confirmPassword}
            type="password"
            placeholder="تأكيد كلمة المرور"
            setState={(value) => handleStateChange("confirmPassword", value)}
            required={true}
          />
          {passwordNotEqual && (
            <p className="text-xs text-error">Passwords don't match</p>
          )}
          <button className="btn btn-primary mt-4" type="submit">
            Register
          </button>
        </form>
        <p className="text-center w-full text-gray-500 py-2">
          لديك حساب؟
          <Link href="/login" className="text-gray-700 px-2">
            سجل دخولك
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
