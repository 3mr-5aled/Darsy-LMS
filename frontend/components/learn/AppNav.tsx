"use client"
import Link from "next/link"
import React from "react"
import { BsHouseDoorFill, BsViewStacked } from "react-icons/bs"
import DarkModeButton from "../Nav/DarkModeButton"
import { usePathname } from "next/navigation"
import { useUserContext } from "@/contexts/userContext"

const AppNav = () => {
  const { state } = useUserContext()
  const { user, loading: isLoading } = state
  const pathname = usePathname()

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
    <div className="absolute w-full transition-all bottom-1 md:hidden flexCenter">
      <div className="btm-nav">
        <Link
          className={
            pathname === "/app" ? "active" : "" + `hover:text-secondary`
          }
          href="/app"
        >
          <BsHouseDoorFill size={20} />
        </Link>
        <Link
          className={
            pathname === "/courses" ? "active" : "" + `hover:text-secondary`
          }
          href="/courses"
        >
          <BsViewStacked size={20} />
        </Link>
        <DarkModeButton />
        <Link
          className={
            pathname === "/account" ? "active" : "" + `hover:text-secondary`
          }
          href="/account"
        >
          <div className="avatar placeholder">
            <div className="w-8 transition-all border-2 border-gray-800 rounded-full cursor-pointer bg-neutral-focus text-neutral-content hover:border-2 hover:border-secondary">
              {" "}
              <span className="text-sm font-bold">
                {getUserInitials(user?.name)}
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default AppNav
