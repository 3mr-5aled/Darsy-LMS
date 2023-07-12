"use client"
import Image from "next/image"
import Link from "next/link"

import { NavLinks, WebsiteDetails } from "@/constant"
import { useRouter } from "next/navigation"
// import { getCurrentUser } from "@/lib/session"

// import AuthProviders from "./AuthProviders"
// import Button from "./Button"
// import ProfileMenu from "./ProfileMenu"

const Navbar = async () => {
  // const session = await getCurrentUser()
  const router = useRouter()

  return (
    <nav className="flexBetween navbar">
      <div className="gap-10 flexStart">
        <Link href="/" className="prose">
          <Image
            src="/next.svg"
            width={115}
            height={38}
            alt={WebsiteDetails.name}
          />
        </Link>
      </div>
      <ul className="hidden xl:flex text-small gap-7">
        {NavLinks.map((link) => (
          <Link href={link.href} key={link.text}>
            {link.text}
          </Link>
        ))}
      </ul>

      <div className="gap-4 flexCenter">
        <button
          className="btn btn-primary"
          onClick={() => router.push("/login")}
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
