"use client"
import NotFoundComponent from "@/components/NotFoundComponent"
import useUser from "@/lib/FetchUser"
import { BsCircleFill, BsDiamondFill, BsStars } from "react-icons/bs"
import Loading from "../loading"
import { useState, useEffect } from "react"
import DataLoading from "@/components/DataLoading"

const Profile = () => {
  const [user, isLoading] = useUser()
  const [daysLeft, setDaysLeft] = useState<number | null>(null)
  const [formattedExpireTime, setFormattedExpireTime] = useState<string | null>(
    null
  )
  useEffect(() => {
    // Calculate the days left and format the expiration time when the user data is available
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
  }, [user])

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

  return (
    <DataLoading data={user} loadingTime={10000} message="User Not Found, please login or register">
      <div className="flex flex-col items-start justify-start h-screen my-12 mx-24">
        <h1 className="text-4xl font-bold my-5">My Profile</h1>
        <ul className="list-disc">
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
          <li className="mb-3 list-item">
            <div className="flex flex-row items-center gap-1">
              <span className="font-bold mr-2">Membership:</span>
              {renderMembershipIcon()}
            </div>
          </li>
          {user?.membership?.expireTime ? (
            <li className="mb-3">
              <span className="font-bold">Membership expireTime:</span>{" "}
              {formattedExpireTime} (in {daysLeft} days) from now
            </li>
          ) : (
            <li className="mb-3 font-bold">No current subscription</li>
          )}
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
        <div className="text-center text-3xl font-bold">Students analytics</div>
      </div>
    </DataLoading>
  )
}

export default Profile
