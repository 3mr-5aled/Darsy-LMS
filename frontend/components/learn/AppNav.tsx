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
    <>
      {/* desktop nav */}
      <div className="hidden md:block">
        <ul className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-[99999] menu menu-horizontal  bg-base-200 bg-opacity-80 rounded-box mt-6 p-4 flex items-center justify-center">
          <li>
            <Link
              data-tip="Home"
              className={
                pathname === "/app"
                  ? "active"
                  : "" + `hover:text-secondary tooltip`
              }
              href="/app"
            >
              <BsHouseDoorFill size={20} />
            </Link>
          </li>
          <li>
            <Link
              data-tip="courses"
              className={
                pathname === "/courses"
                  ? "active"
                  : "" + `hover:text-secondary tooltip`
              }
              href="/courses"
            >
              <BsViewStacked size={20} />
            </Link>
          </li>
          <li>
            <div className="tooltip mt-1" data-tip="DarkMode">
              <DarkModeButton />
            </div>
          </li>
          <li>
            <Link
              data-tip="Account"
              className={
                pathname === "/account"
                  ? "active"
                  : "" + `hover:text-secondary tooltip`
              }
              href="/account"
            >
              <div className="avatar placeholder">
                <div className="w-8 transition-all border-2 border-gray-800 rounded-full cursor-pointer bg-neutral-focus text-neutral-content hover:border-2 hover:border-secondary">
                  <span className="text-sm font-bold">
                    {getUserInitials(user?.name)}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      {/* Mobile Navbar */}
      <div className="absolute w-full z-[99999] transition-all bottom-1 md:hidden flexCenter">
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
    </>
  )
}

export default AppNav
