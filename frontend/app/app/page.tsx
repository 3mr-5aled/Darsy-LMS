"use client"
import React, { useEffect, useState } from "react"
import axiosInstance from "@/axios.config"
import MyCourses from "@/components/learn/account/MyCourses"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  BsHouseDoorFill,
  BsViewStacked,
  BsPlusCircleFill,
  BsDiamondFill,
  BsCircleFill,
  BsStars,
} from "react-icons/bs"
import { toast } from "react-toastify"
import DarkModeButton from "@/components/Nav/DarkModeButton"
import Loading from "../loading"
import { useUserContext } from "@/contexts/userContext"
import WalletComponent from "@/components/learn/WalletComponent"
import MembershipIcon from "@/components/learn/MembershipIcon"

const StudentMainPage = () => {
  const { state } = useUserContext()
  const { user, loading: isLoading } = state

  const router = useRouter()

  // Step 1: Define state variables

  if (isLoading) {
    return <Loading /> // Assuming you have a Loading component
  }

  // If user is not logged in, show a message and button to navigate to login page
  if (!user) {
    return (
      <div className="relative flex-col w-full m-5 md:p-5 h-96 flexCenter">
        <p className="text-xl font-semibold">You are not logged in.</p>
        <div>
          <Link href="/auth/login">
            <span className="mt-4 mr-3 btn btn-primary">Login</span>
          </Link>
          <Link href="/">
            <span className="mt-4 btn btn-primary">Back to Homepage</span>
          </Link>
        </div>
      </div>
    )
  }

  const handleContinueLearning = async () => {
    if (user) {
      router.push(`/app/lesson/${user.nextLesson}`)
    } else {
      toast.error("Something went wrong")
    }
  }

  // Step 2: Define functions to handle modal visibility and payment submission

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
    <div className="px-5 py-3 mx-5 flexCenter">
      <div className="w-screen p-4 ">
        <div className="grid w-full gap-3 md:grid-cols-3 ">
          <div className="order-2 w-full flexCenter max-md:pt-3 bg-base-200 card md:order-1">
            <Link
              href={"/membership"}
              className="flex flex-row items-center gap-3 cursor-pointer"
            >
              Membership:
              <span className="flex flex-row items-center gap-3 text-warning">
                <MembershipIcon membership={user?.membership} />
              </span>
            </Link>
            {user?.nextLesson || (user?.enrolledCourse?.length ?? 0) > 0 ? (
              <button
                className="w-full p-3 mt-4 text-lg font-bold text-white transition-all duration-500 rounded-md lg:text-2xl bg-secondary flexCenter md:w-auto hover:bg-primary"
                onClick={handleContinueLearning}
              >
                Continue Learning
              </button>
            ) : (
              <button
                className="w-full p-3 mt-4 text-lg font-bold text-white transition-all duration-500 rounded-md lg:text-2xl bg-secondary flexCenter md:w-auto hover:bg-primary"
                onClick={() => router.push("/courses")}
              >
                Enroll a course
              </button>
            )}
          </div>
          {/* my homepage with nav */}
          <div className="order-1 md:col-span-1 md:order-2 flexCenter flex-col gap-5">
            <h1 className="text-2xl font-bold text-center lg:text-4xl">
              My Homepage
            </h1>
            <div className="hidden md:flex w-full transition-all md:flexCenter">
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
          {/* wallet section */}
          <div className="relative flex-col order-2 p-5 bg-base-200 card flexCenter md:order-3">
            <WalletComponent credit={user?.credit || 0} />
          </div>
          <div className="order-8 w-full md:col-span-3">
            <MyCourses />
          </div>
        </div>
        {/* Step 4: Add the modal */}
      </div>
    </div>
  )
}

export default StudentMainPage
