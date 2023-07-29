"use client"
import React, { useState } from "react"
import axiosInstance from "@/axios.config"
import MyCourses from "@/components/MyCourses"
import useUser from "@/lib/FetchUser"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  BsHouseDoorFill,
  BsViewStacked,
  BsPersonCircle,
  BsPlusCircleFill,
  BsDiamondFill,
  BsCircleFill,
  BsStars,
} from "react-icons/bs"
import { toast } from "react-toastify"
import DarkModeButton from "@/components/DarkModeButton"

const StudentMainPage = () => {
  const [user] = useUser()
  const router = useRouter()

  // Step 1: Define state variables
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [amount, setAmount] = useState("")
  const [amountError, setAmountError] = useState("")

  const handleContinueLearning = async () => {
    if (user) {
      router.push(`/learn/${user.nextLesson}`)
    } else {
      toast.error("Something went wrong")
    }
  }

  // Step 2: Define functions to handle modal visibility and payment submission
  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handlePayment = async () => {
    const isValidAmount = /^[0-9]*(\.[0-9]{1,2})?$/.test(amount)

    if (!isValidAmount || parseFloat(amount) <= 0 || parseFloat(amount) > 250) {
      setAmountError(
        "Invalid amount. Please enter a valid value between 0 and 250."
      )
      return
    }

    try {
      const response = await axiosInstance.post(`/payment/add-credit/`, {
        amount: parseFloat(amount),
      })
      // Handle the payment response as needed
      router.push(response.data.url)
      setAmount("")
      handleCloseModal()
    } catch (error) {
      toast.error("Payment failed. Please try again.")
      console.log(error)
    }
  }
  const renderMembershipIcon = () => {
    if (user?.isMemberShip.name === "gold") {
      return (
        <div>
          <p className="font-bold text-amber-400">Gold</p>
          <BsCircleFill className="text-amber-400" />
        </div>
      )
    } else if (user?.isMemberShip.name === "platinum") {
      return (
        <div>
          <p className="font-bold text-cyan-500">Platinum</p>
          <BsStars className="text-cyan-500" />
        </div>
      )
    } else if (user?.isMemberShip.name === "diamond") {
      return (
        <div>
          <p className="font-bold text-blue-500">Diamond</p>
          <BsDiamondFill className="text-blue-500" />
        </div>
      )
    }
    return <p className="font-bold text-gray-500">No current subscription</p> // Render nothing if the membership is not gold, platinum, or diamond
  }

  const getUserInitials = (userName: string | undefined) => {
    if (!userName) {
      return null
    }
    const nameArray = userName.split(" ")
    const firstNameInitial = nameArray[0].charAt(0).toUpperCase()
    const lastNameInitial =
      nameArray.length > 1 ? nameArray[1].charAt(0).toUpperCase() : ""
    return firstNameInitial + lastNameInitial
  }

  return (
    <div className="p-5 m-5 flexCenter">
      <div className="w-screen p-4 ">
        <div className="grid w-full gap-3 md:grid-cols-3">
          <div className="w-full flexCenter bg-base-200 card">
            <Link
              href={"/membership"}
              className="flex flex-row items-center gap-3 cursor-pointer"
            >
              Membership:
              <span className="flex flex-row items-center gap-3 text-warning">
                {/* <p className="font-bold text-cyan-500">Platinum</p>
                <BsDiamondFill className="text-blue-500" /> */}
                {renderMembershipIcon()}
              </span>
            </Link>
            {user?.nextLesson || (user?.enrolledCourse?.length ?? 0) > 0 ? (
              <button
                className="w-full p-3 mt-4 text-2xl font-bold text-white transition-all duration-500 rounded-md bg-secondary flexCenter md:w-auto hover:bg-primary"
                onClick={handleContinueLearning}
              >
                Continue Learning
              </button>
            ) : (
              <button
                className="w-full p-3 mt-4 text-2xl font-bold text-white transition-all duration-500 rounded-md bg-secondary flexCenter md:w-auto hover:bg-primary"
                onClick={() => router.push("/courses")}
              >
                Enroll a course
              </button>
            )}
          </div>
          <div className="md:col-span-1">
            <h1 className="mb-5 text-4xl font-bold text-center">My Homepage</h1>
            <div className="w-full transition-all flexCenter">
              <div className="flex flex-row items-center justify-around w-2/3 gap-5 p-3 text-2xl rounded-full flex-nowrap bg-base-200">
                <div className="tooltip" data-tip="HomePage">
                  <Link
                    className="hover:text-secondary hover:rounded-full"
                    href="/"
                  >
                    <BsHouseDoorFill />
                  </Link>
                </div>
                <div className="tooltip" data-tip="Courses">
                  <Link
                    className="hover:text-secondary hover:rounded-full"
                    href="/courses"
                  >
                    <BsViewStacked />
                  </Link>
                </div>
                <div className="tooltip" data-tip="Dark Mode">
                  <DarkModeButton />
                </div>
                <div className="tooltip" data-tip="my account">
                  <Link
                    className="hover:text-secondary hover:rounded-full"
                    href="/account"
                  >
                    {/* <BsPersonCircle /> */}
                    <div className="avatar placeholder">
                      <div className="w-8 transition-all border-2 border-gray-800 rounded-full cursor-pointer bg-neutral-focus text-neutral-content hover:border-2 hover:border-secondary">
                        {" "}
                        {/* Apply transition to the border color */}
                        <span className="text-sm font-bold">
                          {getUserInitials(user?.name)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex-col p-5 bg-base-200 card flexCenter ">
            <span className="absolute top-0 left-0 p-3 opacity-80">
              My Wallet
            </span>
            <div className="p-3 text-5xl font-bold">
              {user?.credit}
              <span className="text-success">{" $"}</span>
            </div>
            {/* Step 3: Add modal trigger button */}
            <button
              className="flex flex-row items-center justify-center w-full gap-3 text-secondary"
              onClick={handleOpenModal}
            >
              <div>Charge your credit</div>{" "}
              <span className="rounded-full text-success">
                <BsPlusCircleFill />
              </span>
            </button>
          </div>
          <div className="w-full lg:col-span-3">
            <MyCourses />
          </div>
        </div>
        {/* Step 4: Add the modal */}
        {isModalOpen && (
          <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-70">
            <div className="p-4 bg-base-100 card">
              <h3 className="mb-2 text-xl font-bold">
                Enter the amount you want to charge
              </h3>
              <input
                type="text"
                placeholder="Amount"
                className={`w-full mb-4 input input-bordered ${
                  amountError ? "input-error" : ""
                }`}
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value)
                  setAmountError("")
                }}
                min="0"
                max="250"
                pattern="^[0-9]*(\.[0-9]{1,2})?$"
              />
              {amountError && <p className="text-error">{amountError}</p>}
              <div className="flex justify-end">
                <button
                  className="mr-2 btn btn-primary"
                  onClick={handlePayment}
                >
                  Pay
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentMainPage
