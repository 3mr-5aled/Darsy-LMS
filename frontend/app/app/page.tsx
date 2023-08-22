"use client"
import React from "react"
import MyCourses from "@/components/learn/account/MyCourses"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import Loading from "../loading"
import { useUserContext } from "@/contexts/userContext"
import WalletComponent from "@/components/learn/WalletComponent"
import MembershipIcon from "@/components/learn/MembershipIcon"
import { Owner } from "@/constant"
import PremiumOnlyRoute, {
  PremiumOnlyComponent,
} from "@/components/Routes/PremiumOnlyRoute"

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

  return (
    <div className="px-5 py-3 mx-5 flexCenter">
      <div className="w-screen p-4 ">
        <div className="grid w-full gap-3 md:grid-cols-3 ">
          <div className="order-2 w-full flexCenter max-md:pt-3 bg-base-200 card md:order-1">
            <PremiumOnlyComponent feature="membership">
              <Link
                href={"/membership"}
                className="flex flex-row items-center gap-3 cursor-pointer"
              >
                Membership:
                <span className="flex flex-row items-center gap-3 text-warning">
                  <MembershipIcon membership={user?.membership} />
                </span>
              </Link>
            </PremiumOnlyComponent>

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
