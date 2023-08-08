"use client"
import React from "react"
import Link from "next/link"
import useUser from "@/lib/FetchUser"

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
        <section style={{ height: "80vh" }} className="flexCenter">
          <div className="p-5 bg-base-300 card prose">
            <h2>Permission Denied.</h2>
            <p>This page can only be view by an Admin user.</p>
            <br />
            <Link href="/">
              <button className="btn btn-primary">&larr; Back To Home</button>
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
