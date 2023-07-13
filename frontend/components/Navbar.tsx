"use client"
import Image from "next/image"
import Link from "next/link"

import { NavLinks, WebsiteDetails } from "@/constant"
import { useRouter } from "next/navigation"
import DarkModeButton from "./DarkModeButton"
import { useEffect } from "react"
import axiosInstance from "@/axios.config"
// import { getCurrentUser } from "@/lib/session"

// import AuthProviders from "./AuthProviders"
// import Button from "./Button"
// import ProfileMenu from "./ProfileMenu"

const Navbar = async () => {
  // const session = await getCurrentUser()
  const router = useRouter()
  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get("/auth/profile")
      console.log(response.data)
      router.push("/")
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchUser()
  }, [])

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
      <ul className="hidden xl:flex text-small font-bold gap-7">
        {NavLinks.map((link) => (
          <Link href={link.href} key={link.text}>
            {link.text}
          </Link>
        ))}
      </ul>

      <div className="gap-4 flexCenter">
        <div>
          <DarkModeButton />
        </div>
        <button
          className="btn btn-primary"
          onClick={() => router.push("/auth/login")}
        >
          Sign in
        </button>
        {/* {session?.user ? (
          <>
            <ProfileMenu session={session} />

            <Link href="/create-project">
              <Button title="Share work" />
            </Link>
          </>
        ) : (
          <AuthProviders />
        )} */}
      </div>
    </nav>
  )
}

export default Navbar
