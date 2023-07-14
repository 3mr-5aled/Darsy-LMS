"use client"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import axiosInstance from "@/axios.config"
import { NavLinks, WebsiteDetails } from "@/constant"
import DarkModeButton from "./DarkModeButton"
import { toast } from "react-toastify"
import useUser from "@/lib/FetchUser"

const Navbar = () => {
  const router = useRouter()
  const [user, isLoading, setUser] = useUser()

  const signOut = async () => {
    try {
      await axiosInstance.get("/auth/signout")
      setUser(null)
      toast.success("Signed out successfully")
      router.push("/")
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <nav className="flexBetween navbar">
      <div className="gap-10 flexStart">
        <Link href="/" className="prose bg-white rounded-md p-3">
          <Image
            src="/next.svg"
            width={115}
            height={38}
            alt={WebsiteDetails.name}
          />
        </Link>
      </div>
      <ul className="hidden xl:flex items-center space-x-4 font-bold">
        {NavLinks.map((link) => (
          <li key={link.text}>
            <Link href={link.href}>{link.text}</Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center space-x-4">
        <DarkModeButton />
        {user ? (
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1">
              {user?.name}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/profile">My Profile</Link>
              </li>
              <li>
                <button onClick={signOut}>
                  {isLoading ? "Signing out..." : "Sign out"}
                </button>
              </li>
              {user.role && (
                <li>
                  <Link href="/admin/dashboard">Dashboard</Link>
                </li>
              )}
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
