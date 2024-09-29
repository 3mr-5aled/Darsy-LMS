"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import axiosInstance from "@/axios.config"
import { Navigation, Owner } from "@/constant"
import DarkModeButton from "./DarkModeButton"
import { toast } from "react-toastify"
import { useUserContext } from "@/contexts/userContext"
import { useEffect, useState } from "react"
import { AdminOnlyLink } from "../Routes/AdminOnlyRoutes"
import { BsList, BsXCircle } from "react-icons/bs"
import Logo from "../static/Logo"

const Navbar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false)
  const { state, clearUser } = useUserContext()
  const { user, loading: isLoading } = state
  const isMembershipEnabled = Owner.premium.membership // Check if membership feature is enabled

  // Filter out the "Membership" link if it's not enabled
  const filteredNavLinks = Navigation.NavLinks.filter(
    (link) => link.text !== "Membership" || isMembershipEnabled
  )

  const signOut = async () => {
    setIsSigningOut(true)
    try {
      await axiosInstance.get("/auth/signout")
      clearUser()
      toast.success("Signed out successfully")
      setIsSigningOut(false)
      router.push("/")
    } catch (error: any) {
      toast.error(error.message)
      setIsSigningOut(false)
    }
  }

  const getUserInitials = (userName: string | undefined) => {
    if (!userName) return "";

    const nameArray = userName.split(" ");
    const firstNameInitial = nameArray[0].charAt(0).toUpperCase();
    const lastNameInitial =
      nameArray.length > 1 ? nameArray[1].charAt(0).toUpperCase() : "";
    return firstNameInitial + lastNameInitial;
  };


  // Function to close the mobile sidebar
  const closeMobileSidebar = () => {
    const checkbox = document.getElementById("my-drawer-2") as HTMLInputElement
    if (checkbox) {
      checkbox.checked = false
    }
  }

  return (
    <nav className="relative z-50 navbar flexCenter w-full shadow-xl">
      <div className="w-full lg:container flexBetween">
        <div className="flexStart gap-1">
          <div className="drawer w-fit lg:hidden">
            <input
              title="toggler"
              id="my-drawer-2"
              type="checkbox"
              className="drawer-toggle"
            />
            <label
              htmlFor="my-drawer-2"
              className="lg:hidden btn btn-ghost btn-circle"
            >
              <BsList size={35} />
            </label>
            <div className="lg:hidden drawer-side z-50">
              <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
              <div className="z-50 m-2">
                <input
                  title="toggler2"
                  id="my-drawer-2"
                  type="checkbox"
                  className="drawer-toggle"
                />
                <label
                  htmlFor="my-drawer-2"
                  className="lg:hidden btn btn-ghost btn-circle"
                >
                  <BsXCircle size={25} />
                </label>
              </div>
              <ul className="h-full w-full flex flex-col justify-center gap-5 p-4 menu bg-base-200 bg-opacity-90 text-base-content">
                <li
                  key={`Home`}
                  className={`transition-colors flexCenter text-xl w-full hover:text-secondary-focus ${
                    pathname === "/" ? "text-secondary" : ""
                  }`}
                >
                  {/* Apply transition to the hover and active state */}
                  <Link href={`/`} onClick={closeMobileSidebar}>
                    Home
                  </Link>
                </li>
                {filteredNavLinks.map((link) => (
                  <li
                    key={link.text}
                    className={`transition-colors flexCenter text-xl w-full hover:text-secondary-focus ${
                      pathname === link.href ? "text-secondary" : ""
                    }`}
                  >
                    {/* Apply transition to the hover and active state */}
                    <Link href={link.href} onClick={closeMobileSidebar}>
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Logo />
        </div>
        <ul className="lg:items-center hidden space-x-4 font-bold lg:flex">
          <li
            key={`Home`}
            className={`transition-colors flexCenter text-xl w-full hover:text-secondary-focus ${
              pathname === "/" ? "text-secondary" : ""
            }`}
          >
            <Link href={`/`} onClick={closeMobileSidebar}>
              Home
            </Link>
          </li>
          {filteredNavLinks.map((link) => (
            <li
              key={link.text}
              className={`transition-colors hover:text-secondary-focus ${
                pathname === link.href ? "text-secondary" : ""
              }`}
            >
              {/* Apply transition to the hover state */}
              <Link href={link.href}>{link.text}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center space-x-4">
          {" "}
          {/* Container for the user avatar/sign-in button */}
          <DarkModeButton />
          {isLoading ? (
            <div className="avatar placeholder animate-pulse ">
              <div className="w-12 transition-all border-2 border-gray-800 rounded-full cursor-pointer bg-neutral-focus text-neutral-content hover:border-2 hover:border-secondary">
                {" "}
              </div>
            </div>
          ) : user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="">
                <div className="avatar placeholder">
                  <div className="w-12 transition-all border-2 border-gray-800 rounded-full cursor-pointer bg-neutral-focus text-neutral-content hover:border-2 hover:border-secondary">
                    {" "}
                    {/* Apply transition to the border color */}
                    <span className="font-bold">
                      {getUserInitials(user.name)}
                    </span>
                  </div>
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="/account">My Profile</Link>
                </li>
                <li>
                  <Link href="/app">My Learning Page</Link>
                </li>
                <AdminOnlyLink>
                  <li>
                    <Link
                      className="flex flex-row justify-between"
                      href="/admin/dashboard"
                    >
                      <span>Dashboard</span>{" "}
                      <div className="badge badge-accent badge-outline">
                        Admin
                      </div>
                    </Link>
                  </li>
                </AdminOnlyLink>
                <li>
                  <button onClick={signOut}>
                    {isSigningOut ? "Signing out..." : "Sign out"}
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => router.push("/auth/login")}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
