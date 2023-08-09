"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import axiosInstance from "@/axios.config"
import { NavLinks, WebsiteDetails } from "@/constant"
import DarkModeButton from "./DarkModeButton"
import { toast } from "react-toastify"
import { useUserContext } from "@/contexts/userContext"
import { useEffect, useState } from "react"
import { AdminOnlyLink } from "./AdminOnlyRoutes"

const Navbar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false)
  const { state, setUser, clearUser } = useUserContext()
  const { user } = state
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true)

  const signOut = async () => {
    setIsSigningOut(true)
    try {
      await axiosInstance.get("/auth/signout")
      setUser(null)
      toast.success("Signed out successfully")
      setIsSigningOut(false)
      router.push("/")
    } catch (error: any) {
      toast.error(error.message)
      setIsSigningOut(false)
    }
  }

  useEffect(() => {
    const fetchUserOnLoad = async () => {
      if (!user) {
        try {
          const response = await axiosInstance.get("/auth/profile")
          const userData = response.data
          setUser(userData)
        } catch (error: any) {
          console.error(error.message)
        }
      }
      setIsLoadingUser(false)
    }

    fetchUserOnLoad()
  }, [])

  const getUserInitials = (userName: string) => {
    const nameArray = userName.split(" ")
    const firstNameInitial = nameArray[0].charAt(0).toUpperCase()
    const lastNameInitial =
      nameArray.length > 1 ? nameArray[1].charAt(0).toUpperCase() : ""
    return firstNameInitial + lastNameInitial
  }

  return (
    <nav
      className="relative z-20 flexBetween navbar shadow-xl
    "
    >
      <div className="container gap-10 flexStart">
        {" "}
        {/* Container for the logo */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {NavLinks.map((link) => (
              <li
                key={link.text}
                className={`transition-colors hover:text-secondary-focus ${
                  pathname === link.href ? "text-secondary" : ""
                }`}
              >
                {/* Apply transition to the hover and active state */}
                <Link href={link.href}>{link.text}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href="/" className="p-3 prose bg-white rounded-md">
          <Image
            src="/next.svg"
            width={115}
            height={38}
            alt={WebsiteDetails.name}
          />
        </Link>
      </div>
      <ul className="container items-center justify-center hidden space-x-4 font-bold lg:flex">
        {" "}
        {/* Container for the links */}
        {NavLinks.map((link) => (
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
      <div className="container flex items-center justify-end space-x-4">
        {" "}
        {/* Container for the user avatar/sign-in button */}
        <DarkModeButton />
        {isLoadingUser ? (
          <div>Loading ...</div> // Placeholder skeleton for username
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
              className="dropdown-content z-[20] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/account">My Profile</Link>
              </li>
              <li>
                <Link href="/learn">My Learning Page</Link>
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
    </nav>
  )
}

export default Navbar
