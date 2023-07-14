"use client"

import { WebsiteDetails } from "@/constant"
import Link from "next/link"
import { GetServerSideProps, NextPage } from "next"
import { UserType } from "@/common.types"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import useUser from "@/lib/FetchUser"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [user, isLoading] = useUser()

  useEffect(() => {
    if (user?.role !== "tutor") {
      if (typeof window !== "undefined") {
        router.push("/")
      }
    }
  }, [user?.role, router])

  return (
    <html lang="ar">
      <body>
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            {children}
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open drawer
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <li>
                <Link href="/admin/create-course">Create a Course</Link>
              </li>
              <li>
                <Link href="#">Sidebar Item 2</Link>
              </li>
            </ul>
          </div>
        </div>
      </body>
    </html>
  )
}
