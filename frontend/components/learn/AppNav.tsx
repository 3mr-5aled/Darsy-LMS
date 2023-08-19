"use client"
import Link from "next/link"
import React, { useState } from "react"
import {
  BsArrowDownCircleFill,
  BsArrowUpCircleFill,
  BsHouseDoorFill,
  BsViewStacked,
} from "react-icons/bs"
import DarkModeButton from "../Nav/DarkModeButton"
import { usePathname } from "next/navigation"
import { useUserContext } from "@/contexts/userContext"

const AppNav = () => {
  const { state } = useUserContext()
  const { user, loading: isLoading } = state
  const pathname = usePathname()
  const [isNavVisible, setIsNavVisible] = useState(true)
  const toggleNavVisibility = () => {
    setIsNavVisible((prevVisible) => !prevVisible) // Toggle the visibility
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
    <>
      {/* desktop nav */}
      <div className="hidden md:block">
        <div
          className={`fixed left-1/2 bottom-2 transform -translate-x-1/2 z-[99999] transition-transform duration-300 shadow-xl ${
            isNavVisible ? "" : "translate-y-3/4"
          }`}
        >
          <button
            title="toggle navbar"
            type="button"
            className={`ml-[6.5rem] rounded-full text-primary bg-white transition-transform duration-300 ${
              isNavVisible ? "" : "rotate-180"
            }`}
            onClick={toggleNavVisibility}
          >
            <BsArrowDownCircleFill size={30} />
          </button>
          <ul
            className={`menu menu-horizontal bg-base-200 bg-opacity-80 rounded-box mt-0 p-4 flex items-center justify-center transition-opacity duration-300 ${
              isNavVisible ? "opacity-100" : "opacity-0"
            }`}
          >
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
      </div>
      {/* Mobile Navbar */}
      <div className="absolute w-full z-[99999] transition-all bottom-1 md:hidden flexCenter shadow-xl">
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
          <div className="w-fit h-fit">
            <DarkModeButton />
          </div>
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
