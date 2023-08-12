"use client"
import React from "react"
import Link from "next/link"
import useUser from "@/lib/FetchUser"
import { BsArrowLeft } from "react-icons/bs"

const AdminOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const [user, isLoading] = useUser()
  if (user?.role === "tutor") {
    return children
  }

  return (
    <>
      {isLoading && (
        <section style={{ height: "80vh" }} className="flexCenter">
          <div className="p-5 bg-base-300 card prose">
            <h2>checking if you are admin</h2>
            <div className=" mx-auto loading loading-spinner loading-lg"></div>
          </div>
        </section>
      )}
      {!isLoading && user?.role !== "tutor" && (
        <section style={{ height: "80vh" }} className="flexCenter w-full">
          <div className="p-5 bg-base-300 card prose w-11/12 md:w-auto">
            <h2>Permission Denied.</h2>
            <p>This page can only be view by an Admin user.</p>
            <br />
            <Link href="/">
              <button className="btn btn-primary flex flex-row">
                <BsArrowLeft size={20} />
                Back To Home
              </button>
            </Link>
          </div>
        </section>
      )}
    </>
  )
}

export const AdminOnlyLink = ({ children }: { children: React.ReactNode }) => {
  const [user, isLoading] = useUser()

  if (user?.role === "tutor") {
    return children
  }
  return null
}

export default AdminOnlyRoute
