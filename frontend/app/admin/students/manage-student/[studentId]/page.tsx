"use client"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import axiosInstance from "@/axios.config"
import { UserType } from "@/common.types"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import Loading from "@/app/loading"
import CreditModal from "@/components/AddCredit" // Import the CreditModal component
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import Image from "next/image"
import { BsCircleFill, BsDiamondFill, BsStars } from "react-icons/bs"
import PreviousPageButton from "@/components/PreviousPageButton"
import OrdersList from "@/components/orders/OrdersList"
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
const StudentPage = () => {
  interface userDegrees {
    degree: number
    lessonTitle: string
    examDate: Date
    lessonId: string
  }
  interface userCourses {
    name: string
    courseId: string
    courseImg: string
    progress: number
  }
  interface userOrders {
    userId: {
      _id: string
      name: string
    }
    createdAt: string
    _id: string
    adminId?: {
      _id: string
      name: string
    }
    amount: string
    courseId?: {
      _id: string
      name: string
    }
    tran_ref?: string
    status: string
    type: string
  }
  const router = useRouter()
  const { studentId } = useParams()
  const [user, setUser] = useState<UserType | null>(null)
  const [degrees, setDegrees] = useState<userDegrees[] | null>(null)
  const [orders, setOrders] = useState<userOrders[] | null>(null)
  const [userEnrolledCourses, setUserEnrolledCourses] = useState<
    userCourses[] | null
  >(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreditModalOpen, setIsCreditModalOpen] = useState<boolean>(false)
  const [daysLeft, setDaysLeft] = useState<number | null>(null)
  const [formattedExpireTime, setFormattedExpireTime] = useState<string | null>(
    null
  )

  useEffect(() => {
    // Fetch user from the API
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/user/get-user/${studentId}`)
        console.log(response.data)
        setUser(response.data.userDetails)
        setDegrees(response.data.userDegrees)
        setUserEnrolledCourses(response.data.userCourses)
        setOrders(response.data.userOrders)
        setIsLoading(false)
      } catch (error: any) {
        setError("An error occurred while fetching user.")
        toast.error("An error occurred while fetching user")
        setIsLoading(false)
      }
    }

    if (user && user.membership?.expireTime) {
      const currentDate = new Date()
      const expireTime = new Date(user.membership.expireTime)

      // Calculate the time difference in milliseconds
      const timeDifference = expireTime.getTime() - currentDate.getTime()

      // Calculate the number of days left
      const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))

      // Format the expiration time in "yyyy-mm-dd" format
      const year = expireTime.getFullYear()
      const month = String(expireTime.getMonth() + 1).padStart(2, "0")
      const day = String(expireTime.getDate()).padStart(2, "0")
      const formattedExpireTime = `${year}-${month}-${day}`

      setDaysLeft(daysLeft)
      setFormattedExpireTime(formattedExpireTime)
    }

    fetchUser()
  }, [studentId])
  const handleDelete = async () => {
    try {
      setIsLoading(true)
      // Make an API call to delete the user based on the ID
      await axiosInstance.delete(`/user/delete-user/${studentId}`)
      toast.success("User deleted successfully")
      router.push("/admin/students")
    } catch (error) {
      setError("An error occurred while deleting the user.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddCredit = async (amount: number) => {
    try {
      setIsLoading(true)
      // Make an API call to add credit to the user based on the ID
      await axiosInstance.post(`/user/edit-credit/${studentId}`, { amount })
      const response = await axiosInstance.get(`/user/get-user/${studentId}`)
      setIsCreditModalOpen(false)
      setUser(response.data.userDetails)
    } catch (error) {
      toast.error("An error occurred while adding credit.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <Loading />
  }

  const viewCoursePage = (courseId: string | null) => {
    if (courseId) {
      router.push("/courses/view-course/" + courseId)
    }
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Student Degrees`,
        font: {
          size: 36, // Increase the font size for the chart title
        },
      },
    },
  }
  const revenueChartDataUserDegree = {
    labels: degrees?.map((degree) => degree.lessonTitle),
    datasets: [
      {
        label: `exam degree`,
        data: degrees?.map((degree) => degree.degree),
        borderColor: "rgba(192, 192, 75, 1)",
      },
    ],
  }
  const getOrderTime = (createdAt: string) => {
    return new Date(createdAt).toLocaleDateString()
  }

  const renderMembershipIcon = () => {
    const membershipName = user?.membership?.name?.toLowerCase()
    if (membershipName) {
      if (membershipName.includes("gold")) {
        return (
          <>
            <p className="font-bold text-amber-400">Gold</p>
            <BsCircleFill className="text-amber-400" />
          </>
        )
      } else if (membershipName.includes("platinum")) {
        return (
          <>
            <p className="font-bold text-cyan-500">Platinum</p>
            <BsStars className="text-cyan-500" />
          </>
        )
      } else if (membershipName.includes("diamond")) {
        return (
          <>
            <p className="font-bold text-blue-500">Diamond</p>
            <BsDiamondFill className="text-blue-500" />
          </>
        )
      }
    }

    // return <p className="font-bold text-gray-500">No current subscription</p> // Render nothing if the membership is not gold, platinum, or diamond
  }
  return (
    <div className="px-5">
      <div className="my-3">
        <PreviousPageButton />
      </div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Student Details</h1>
      </div>
      <div className="grid items-center truncate justify-center w-full grid-cols-2 gap-3 md:gap-4">
        <div className="font-bold">Name:</div>
        <div>{user?.name}</div>

        <div className="font-bold">Email:</div>
        <div>{user?.email}</div>

        <div className="font-bold">Phone:</div>
        <div>{user?.phone}</div>

        <div className="font-bold">Credit:</div>
        <div>{user?.credit.toFixed(0)}</div>

        {/* // TODO */}
        <div className="flex flex-row items-center gap-1">
          <span className="font-bold mr-2">Membership:</span>
          {renderMembershipIcon()}
        </div>
        {user?.membership?.expireTime ? (
          <div className="mb-3">
            <span className="font-bold">Membership expireTime:</span>{" "}
            {formattedExpireTime} (in {daysLeft} days) from now
          </div>
        ) : (
          <div className="mb-3 font-bold">No current subscription</div>
        )}

        <div className="font-bold">Parents' Phone:</div>
        <div>{user?.parentsPhone}</div>

        <div className="font-bold">Date of Birth:</div>
        <div>{user?.dateOfBirth}</div>

        <div className="font-bold">Role:</div>
        <div>{user?.role}</div>

        <div className="font-bold">Gender:</div>
        <div>{user?.gender}</div>

        <div className="font-bold">Grade:</div>
        <div>{user?.grade}</div>
        <div className="font-bold">City:</div>
        <div>{user?.city}</div>
      </div>
      <div className="flex justify-center mt-5 space-x-4">
        <Link href={`/admin/students/edit-student/${studentId}`} passHref>
          <button className="btn btn-primary">Edit</button>
        </Link>
        <button className="btn btn-error" onClick={handleDelete}>
          Delete
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setIsCreditModalOpen(true)}
        >
          Edit Credit
        </button>
      </div>
      <div className="my-8 text-center">
        <h1 className="text-4xl font-bold">Enrolled Courses</h1>
      </div>
      <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {userEnrolledCourses &&
          userEnrolledCourses.map((course) => (
            <div
              onClick={() => viewCoursePage(course.courseId as string)}
              key={course.courseId}
              className=" bg-neutral overflow-hidden cursor-pointer hover:bg-base-100 hover:shadow-base-100 hover:shadow-lg transition-all duration-300  rounded-xl pb-3"
            >
              <div className="px-0">
                <Image
                  className="w-full"
                  src={course.courseImg}
                  alt={course.name}
                  height={50}
                  width={100}
                />
                <div className=" card-title my-2 px-3">{course.name}</div>

                <div className="mt-1 text-xl px-3">
                  progress:
                  <span
                    className={
                      course.progress > 50 ? "text-success" : "text-error"
                    }
                  >
                    {course.progress}%
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="mt-10">
        <Line options={options} data={revenueChartDataUserDegree} />
      </div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Student Orders</h1>
      </div>
      <div className="w-80 md:w-full">
        {orders ? (
          <OrdersList orders={orders} admin={true} />
        ) : (
          <p>No Orders for current user</p>
        )}
      </div>
      {/* Render the credit modal */}
      <CreditModal
        isOpen={isCreditModalOpen}
        onClose={() => setIsCreditModalOpen(false)}
        onAddCredit={handleAddCredit}
        studentId={studentId as string}
      />
    </div>
  )
}

export default StudentPage
