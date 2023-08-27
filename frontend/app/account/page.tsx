"use client"
import { BsCircleFill, BsDiamondFill, BsStars } from "react-icons/bs"
import { useState, useEffect } from "react"
import DataLoading from "@/components/Features/DataLoading"
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
import axiosInstance from "@/axios.config"
import { UserType, userCourses, userDegrees, userOrders } from "@/common.types"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import OrdersList from "@/components/orders/OrdersList"
import { useUserContext } from "@/contexts/userContext"
import PremiumOnlyRoute, {
  PremiumOnlyComponent,
} from "@/components/Routes/PremiumOnlyRoute"
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
import { Metadata } from "next"
import { Owner } from "@/constant"

// export const metadata: Metadata = {
//   title: `Account - ${Owner.WebsiteDetails.name}`,
// }

const Profile = () => {
  const router = useRouter()

  const { state } = useUserContext()
  const { user: student, loading } = state

  const [user, setUser] = useState<UserType | null>(null)
  const [degrees, setDegrees] = useState<userDegrees[] | null>(null)
  const [orders, setOrders] = useState<userOrders[] | null>(null)
  const [userEnrolledCourses, setUserEnrolledCourses] = useState<
    userCourses[] | null
  >(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [daysLeft, setDaysLeft] = useState<number | null>(null)
  const [formattedExpireTime, setFormattedExpireTime] = useState<string | null>(
    null
  )
  useEffect(() => {
    if (!student?._id) {
      return
    }
    // Fetch user from the API
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(
          `/user/get-user/${student._id}`
        )
        setUser(response.data.userDetails)
        setDegrees(response.data.userDegrees)
        setUserEnrolledCourses(response.data.userCourses)
        setOrders(response.data.userOrders)
        setIsLoading(false)
      } catch (error: any) {
        console.error(error)
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
  }, [student?._id])

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

    return <p className="font-bold text-gray-500">No current subscription</p> // Render nothing if the membership is not gold, platinum, or diamond
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

  return (
    <DataLoading
      data={user}
      loadingTime={10000}
      message="User Not Found, please login or register"
    >
      <div className="flex flex-col items-start justify-start my-12 mx-5 md:mx-24">
        <h1 className="text-4xl font-bold my-5">My Profile</h1>
        <ul className="list-disc mx-5">
          <li className="mb-3">
            <span className="font-bold">Name:</span> {user?.name}
          </li>
          <li className="mb-3">
            <span className="font-bold">Email:</span> {user?.email}
          </li>
          <li className="mb-3">
            <span className="font-bold">Phone:</span> {user?.phone}
          </li>
          <li className="mb-3">
            <div className="flex flex-row items-center gap-1">
              <span className="font-bold">Credit:</span>
              {"  "}
              <div className="text-success">{user?.credit}</div>
            </div>
          </li>
          <PremiumOnlyComponent feature="membership">
            <li className="mb-3 list-item">
              <div className="flex flex-row items-center gap-1">
                <span className="font-bold mr-2">Membership:</span>
                {renderMembershipIcon()}
              </div>
            </li>
            <li className="mb-3 flex flex-row items-center gap-3">
              <span className="font-bold">Membership expireTime:</span>{" "}
              {user?.membership?.expireTime ? (
                `${formattedExpireTime} (in ${daysLeft} days) from now`
              ) : (
                <div className="font-bold text-gray-500">
                  No current subscription
                </div>
              )}
            </li>
          </PremiumOnlyComponent>

          <li className="mb-3">
            <span className="font-bold">Parent Phone:</span>{" "}
            {user?.parentsPhone}
          </li>
          <li className="mb-3">
            <span className="font-bold">City:</span> {user?.city}
          </li>
          <li className="mb-3">
            <span className="font-bold">Grade:</span> {user?.grade}
          </li>
          <li className="mb-3">
            <span className="font-bold">Gender:</span> {user?.gender}
          </li>
          <li className="mb-3">
            <div className="flex flex-row items-center gap-1">
              <span className="font-bold">Role:</span>
              <div className="text-warning">{user?.role}</div>
            </div>
          </li>
        </ul>
        <div className="divider"></div>
        <div className="flexCenter w-full min-h-max h-full">
          <div className="w-10/12">
            <Line options={options} data={revenueChartDataUserDegree} />
          </div>
        </div>
        <div className="divider"></div>
        <div className="w-full">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold">Student Orders</h1>
          </div>
          {orders ? (
            <OrdersList orders={orders} admin={false} />
          ) : (
            <p>No Orders for current user</p>
          )}
        </div>
      </div>
    </DataLoading>
  )
}

export default Profile
